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
  await renderer.start(true); // load all notes in sw

  if (renderer.theme) {
    console.log("sw caching theme", renderer.theme.id);
    const cache = await caches.open("themes");
    await cache.addAll(renderer.theme.entries.map((e) => e.url));
  }
}

async function renderHandler(options: RouteHandlerCallbackOptions) {
  console.log("sw fetch options", options, renderer);
  if (!renderer) return new NetworkOnly().handle(options);

  const { url } = options;
  const { result, context } = await renderer.render(url.pathname);
  console.log("sw rendered", url.pathname);

  // put all blossom assets into the cache
  caches.open("blossom").then((cache) => {
    // caching blossom stuff
    console.log("sw cache blossom assets", context.blossomAssets);
    cache.addAll(context.blossomAssets);
  });

  return new Response(result, {
    status: 200,
    statusText: "OK",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
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

function isBlossom(u: string) {
  const url = new URL(u);
  const pathExt = url.pathname.split(".");
  const segments = pathExt[0].split("/");
  // path must be /sha256-hex(.ext)?
  if (pathExt.length > 2 || segments.length > 2 || segments[1].length != 64)
    return false;
  return true;
}

function fromBlossomCache(cacheName: string) {
  return new CacheFirst({
    cacheName,
    fetchOptions: {
      // some blossom servers don't implement etag etc, but
      // since we know files are read-only we can be sure to
      // force the use of cache here.
      cache: "force-cache",
    },
  });
}

// theme assets
registerRoute(({ request }) => {
  if (
    isBlossom(request.url) &&
    (request.destination === "style" || request.destination === "script")
  ) {
    console.log("sw theme request", request.url);
    return true;
  }
  return false;
}, fromBlossomCache("themes"));

// blossom images
registerRoute(({ request }) => {
  if (isBlossom(request.url) && request.destination === "image") {
    console.log("sw image request", request.url);
    return true;
  }
  return false;
}, fromBlossomCache("blossom"));

// blossom other
registerRoute(({ request }) => {
  if (isBlossom(request.url)) {
    console.log("sw blossom request", request);
  }
}, fromBlossomCache("blossom"));

// other other
registerRoute(({ request }) => {
  console.log("sw other request", request);
}, fromBlossomCache("main"));


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
