/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  precacheAndRoute,
} from "workbox-precaching";
import { RouteHandlerCallbackOptions, clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { Renderer } from "../renderer";
import { SiteAddr } from "../nostrsite/types/site";
import { NetworkOnly } from "workbox-strategies";
import _ from "lodash"

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let renderer: Renderer | undefined;

async function startRenderer(addr: SiteAddr) {
  if (renderer && _.isEqual(renderer.addr, addr)) {
    console.log("sw renderer already started", addr);
    return;
  }
  console.log("sw starting renderer", addr);
  renderer = new Renderer(addr);
  await renderer.start();
}

// sw-side rendering
registerRoute(
  new NavigationRoute(async (options: RouteHandlerCallbackOptions) => {
    console.log("sw fetch options", options, renderer);
    if (!renderer) return new NetworkOnly().handle(options);

    const { url } = options;
    const html = await renderer.render(url.pathname)
    console.log("sw rendered", url.pathname);
    return new Response(html, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      }
    });
  })
);

self.addEventListener('message', (event) => {
  console.log("sw on message", event.data);
  if (event.data && event.data.method === 'setSiteAddr') {
    event.waitUntil(startRenderer(event.data.addr));
  }
})

self.skipWaiting();
clientsClaim();

// HAHA
// @ts-ignore
self.window = self;