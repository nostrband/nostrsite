/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  //  precacheAndRoute,
} from "workbox-precaching";
import { RouteHandlerCallbackOptions, clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { Renderer } from "../renderer";
import { SiteAddr } from "../nostrsite/types/site";
import { CacheFirst, NetworkOnly } from "workbox-strategies";
import isEqual from "lodash/isEqual";

declare let self: ServiceWorkerGlobalScope;

// NOTE: this causes root / path to always be
// fetched from network, figure out why and maybe get this back.
// self.__WB_MANIFEST is the default injection point
//precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let renderer: Renderer | undefined;

async function startRenderer(addr: SiteAddr) {
  if (renderer && isEqual(renderer.addr, addr)) {
    console.log("sw renderer already started", addr);
    return;
  }
  console.log("sw starting renderer", addr);
  renderer = new Renderer(addr);
  await renderer.start();

  if (renderer.theme) {
    console.log("sw caching theme", renderer.theme.id)
    const cache = await caches.open("themes");
    await cache.addAll(renderer.theme.entries.map(e => e.url));
  }
}

// sw-side rendering
registerRoute(
  new NavigationRoute(async (options: RouteHandlerCallbackOptions) => {
    console.log("sw fetch options", options, renderer);
    if (!renderer) return new NetworkOnly().handle(options);

    const { url } = options;
    const html = await renderer.render(url.pathname);
    console.log("sw rendered", url.pathname);
    return new Response(html, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  })
);

function isBlossom(u: string) {
  const url = new URL(u);
  const pathExt = url.pathname.split(".");
  const segments = pathExt[0].split("/");
  // path must be /sha256-hex(.ext)?
  if (pathExt.length > 2 || segments.length > 2 || segments[1].length != 64)
    return false;
  return true;
}

registerRoute(
  ({ request }) => {
    console.log("sw request", request);
    if (
      isBlossom(request.url) &&
      (request.destination === "style" || request.destination === "script")
    ) {
      console.log("sw cache first", request.url);
      return true;
    }
    return false;
  },
  new CacheFirst({
    cacheName: "themes",
    fetchOptions: {
      // some blossom servers don't implement etag etc, but
      // since we know files are read-only we can be sure to
      // force the use of cache here.
      cache: "force-cache",
    }
  })
);

self.addEventListener("message", (event) => {
  console.log("sw on message", event.data);
  if (event.data && event.data.method === "setSiteAddr") {
    event.waitUntil(startRenderer(event.data.addr));
  }
});

self.skipWaiting();
clientsClaim();

// HAHA
// @ts-ignore
self.window = self;
