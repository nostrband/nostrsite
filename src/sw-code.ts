import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
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
import {
  SiteAddr,
  Renderer,
  GlobalNostrSite,
  isBlossomUrl,
  getPwaSiteAddr,
  PRECACHE_ENTRIES,
  // @ts-ignore
} from "libnostrsite";
import { WorkboxError } from "workbox-core/_private";

declare let self: ServiceWorkerGlobalScope;

export function startSW(options: {
  index: string;
  precacheEntries?: string[];
}) {
  let { index, precacheEntries } = options;

  // back compat
  if (Array.isArray(options)) {
    index = "/index.js";
    precacheEntries = options;
  }

  // NOTE: this causes root / path to always be
  // fetched from network, figure out why and maybe get this back.
  // self.__WB_MANIFEST is the default injection point
  // if (self.__WB_MANIFEST) precacheAndRoute(self.__WB_MANIFEST);
  console.log("precacheEntries", PRECACHE_ENTRIES);
  precacheAndRoute(
    PRECACHE_ENTRIES.map((url: string) => ({ url, revision: null }))
  );
  if (precacheEntries) precacheAndRoute(precacheEntries);

  // clean old assets
  cleanupOutdatedCaches();

  let renderer: Renderer | undefined;
  let nextAddr: SiteAddr | undefined;

  function ns(): GlobalNostrSite | undefined {
    // @ts-ignore
    return self.nostrSite;
  }

  async function createSetRenderer(addr: SiteAddr) {
    console.log(Date.now(), "sw creating new renderer", addr, "old", renderer);

    // already starting w/ same addr
    if (nextAddr && isEqual(nextAddr, addr)) {
      console.log("sw next renderer already started", addr);
      return;
    }

    // working on new renderer
    nextAddr = addr;

    // create - may take long time
    const newRenderer = await createRenderer(addr);
    console.log("sw created renderer", newRenderer);

    // a concurrent createSetRenderer started already?
    if (nextAddr !== addr) {
      console.log("sw concurrent renderer starting", nextAddr, addr);
      newRenderer.destroy();
      return;
    }

    // release old one
    if (renderer) renderer.destroy();

    // ok we're ready
    renderer = newRenderer;
    nextAddr = undefined;
    console.log("sw started renderer", renderer);
  }

  async function startRenderer(addr: SiteAddr) {
    if (renderer && isEqual(renderer.getAddr(), addr)) {
      console.log("sw renderer already started", addr);
    } else {
      await createSetRenderer(addr);
    }
  }

  // async function notifyClients(clients?: readonly Client[]) {
  //   clients = clients || await (
  //     globalThis as unknown as ServiceWorkerGlobalScope
  //   ).clients.matchAll({
  //     includeUncontrolled: true,
  //   });
  //   console.log("sw notify clients", clients.length);
  //   for (const client of clients) {
  //     client.postMessage("rendererReady");
  //   }
  // }

  async function createRenderer(addr: SiteAddr) {
    console.log("sw starting renderer", addr);
    const r = ns()!.newRenderer();

    const themeCache = await caches.open("themes");
    const blossomCache = await caches.open("blossom");
    const mediaCache = await caches.open("media");
    r.setCaches({
      themeCache,
      blossomCache,
      mediaCache,
    });

    // takes long to load all posts
    await r.start({
      addr,
      mode: "sw",
      ssrIndexScriptUrl: index,
      origin: globalThis.location.origin,
    });

    // copy, we must have a new addr refs
    const updateAddr = { ...addr };
    r.onUpdate().then(async () => {
      createSetRenderer(updateAddr);
    });

    return r;
  }

  async function renderHandler(options: RouteHandlerCallbackOptions) {
    console.log("sw fetch options", options, renderer);
    if (!renderer || !renderer.started())
      return new NetworkOnly().handle(options);

    try {
      const { url } = options;

      // rss makes no sense on the client
      if (renderer.isRss(url.pathname))
        return new NetworkOnly().handle(options);

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

  // blossom other except audio/video
  registerRoute(({ request }) => {
    if (
      isBlossomUrl(request.url) &&
      !["image", "audio", "video"].includes(request.destination)
    ) {
      console.log("sw other blossom request", request);
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

  // offline-mode launch from db
  getPwaSiteAddr().then((addr: SiteAddr | undefined) => {
    if (addr) startRenderer(addr);
  });
}
