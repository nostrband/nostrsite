import {
  cleanupOutdatedCaches,
  //  precacheAndRoute,
} from "workbox-precaching";
import { RouteHandlerCallbackOptions, clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import {
  CacheFirst,
  NetworkOnly,
  Strategy,
  StrategyHandler,
  StrategyOptions,
} from "workbox-strategies";
import isEqual from "lodash-es/isEqual";
import { SiteAddr, Renderer, GlobalNostrSite, isBlossomUrl } from "libnostrsite";
import { WorkboxError } from "workbox-core/_private";

declare let self: ServiceWorkerGlobalScope;

export function startSW() {
  // NOTE: this causes root / path to always be
  // fetched from network, figure out why and maybe get this back.
  // self.__WB_MANIFEST is the default injection point
  //precacheAndRoute(self.__WB_MANIFEST);

  // clean old assets
  cleanupOutdatedCaches();

  let renderer: Renderer | undefined;

  function ns(): GlobalNostrSite | undefined {
    // @ts-ignore
    return self.nostrSite;
  }

  async function startRenderer(addr: SiteAddr) {
    if (renderer && isEqual(renderer.getAddr(), addr)) {
      console.log("sw renderer already started", addr);
      return;
    }

    const newRenderer = await createRenderer(addr);
    if (renderer) renderer.destroy();
    renderer = newRenderer;
  }

  async function createRenderer(addr: SiteAddr) {
    console.log("sw starting renderer", addr);
    const r = ns()!.newRenderer(addr);

    const themeCache = await caches.open("themes");
    const blossomCache = await caches.open("blossom");
    const mediaCache = await caches.open("media");
    r.setCaches({
      themeCache,
      blossomCache,
      mediaCache,
    });

    await r.start({ ssr: true, loadAll: true });

    r.onUpdate().then(async () => {
      console.log(Date.now(), "sw creating new renderer", addr);
      const newRenderer = await createRenderer(addr);
      console.log(Date.now(), "sw created new renderer", addr);
      renderer!.destroy();
      renderer = newRenderer;
    });

    return r;
  }

  async function renderHandler(options: RouteHandlerCallbackOptions) {
    console.log("sw fetch options", options, renderer);
    if (!renderer) return new NetworkOnly().handle(options);

    try {
      const { url } = options;
      const { result } = await renderer.render(url.pathname);
      console.log("sw rendered", url.pathname);

      return new Response(result, {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    } catch (e) {
      console.error("Failed to render in sw", e);
      return new NetworkOnly().handle(options);
    }
  }

  // sw-side rendering
  registerRoute(new NavigationRoute(renderHandler));

  // ghost infinite scrolling
  registerRoute(({ request }) => {
    const url = new URL(request.url);
    if (
      request.destination === "" &&
      request.mode === "cors" &&
      url.origin === self.location.origin
    ) {
      console.log("sw pagination request", request);
      return true;
    }
    return false;
  }, renderHandler);

  class CacheFirstCors extends Strategy {
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(
      request: Request,
      handler: StrategyHandler
    ): Promise<Response> {
      // check original req first
      let response = await handler.cacheMatch(request);

      let converted: Request | undefined;
      if (
        !response &&
        request.mode === "no-cors" &&
        request.destination === "image"
      ) {
        converted = new Request(request, { mode: "cors" });
        console.debug("converted to CORS request", converted);

        // check converted
        response = await handler.cacheMatch(converted);
      }

      let error: Error | undefined = undefined;
      if (!response) {
        console.debug(
          `No response found in the '${this.cacheName}' cache. ` +
            `Will respond with a network request.`
        );
        try {
          response = await handler.fetchAndCachePut(converted || request);
        } catch (err) {
          try {
            if (converted) {
              response = await handler.fetchAndCachePut(request);
            } else throw err;
          } catch (err) {
            if (err instanceof Error) {
              error = err;
            }
          }
        }

        if (response) {
          console.debug(`Got response from network.`);
        } else {
          console.debug(`Unable to get a response from the network.`);
        }
      } else {
        console.debug(
          `Found a cached response in the '${this.cacheName}' cache.`
        );
      }

      if (!response) {
        throw new WorkboxError("no-response", { url: request.url, error });
      }
      return response;
    }
  }

  function fromCache(cacheName: string, media: boolean = true) {
    const options: StrategyOptions = {
      cacheName,
      matchOptions: {
        ignoreVary: true,
      },
      fetchOptions: {
        // some blossom servers don't implement etag etc, but
        // since we know files are read-only we can be sure to
        // force the use of cache here.
        cache: "force-cache",
      },
    };
    return media ? new CacheFirstCors(options) : new CacheFirst(options);
  }

  // theme assets
  registerRoute(({ request }) => {
    if (
      isBlossomUrl(request.url) &&
      (request.destination === "style" || request.destination === "script")
    ) {
      console.log("sw theme request", request.url);
      return true;
    }
  }, fromCache("themes", false));

  // blossom images
  registerRoute(({ request }) => {
    if (isBlossomUrl(request.url) && request.destination === "image") {
      console.log("sw image request", request.url);
      return true;
    }
  }, fromCache("blossom"));

  // blossom other
  registerRoute(({ request }) => {
    if (isBlossomUrl(request.url)) {
      console.log("sw blossom request", request);
      return true;
    }
  }, fromCache("blossom"));

  // media
  registerRoute(({ request }) => {
    if (!isBlossomUrl(request.url) && request.destination === "image") {
      console.log("sw media request", request);
      return true;
    }
  }, fromCache("media"));

  // other other
  registerRoute(({ request }) => {
    console.log("sw other request", request);
  }, new CacheFirst({ cacheName: "main" }));

  // accept tab messages
  self.addEventListener("message", (event) => {
    console.log("sw on message", event.data);
    if (event.data && event.data.method === "setSiteAddr") {
      event.waitUntil(startRenderer(event.data.addr));
    }
  });

  // attach to all client tabs
  self.skipWaiting();
  clientsClaim();

  // HAHA browser-hbs and probably others assume this
  // @ts-ignore
  self.window = self;
}
