import { launchPwa } from "./pwa";
import {
  Renderer,
  GlobalNostrSite,
  NostrSiteRenderer,
  getMetaAddr,
  fetchNostrSite,
  renderCurrentPage,
} from "libnostrsite";
import { startSW } from "./sw-code";
import { nip19 } from "nostr-tools";

async function startPwa() {
  const addr = await getMetaAddr();
  console.log("addr", addr);
  if (!addr) throw new Error("No nostr site addr");

  const siteEvent = await fetchNostrSite(addr);
  if (!siteEvent) throw new Error("No nostr site fetched");

  let scope = "/";
  if (siteEvent) {
    const r = siteEvent.tags.find((t) => t.length >= 2 && t[0] === "r");
    if (r) {
      scope = new URL(r[1]).pathname;
      if (!scope.endsWith("/")) scope += "/";
    }
  }
  console.log("service worker scope", scope);

  // NOTE: vite only supports static scope printed in it's options,
  // so we can't inject this scope by passing as param to launchPwa,
  // instead we use post-build script inject-dynamic-scope.cjs to
  // replace static scope with window.nostrSite.serviceWorkerScope
  // inside dist/index.js. If you know a better way - send PR.
  // @ts-ignore
  window.nostrSite.serviceWorkerScope = scope;

  // sw is registered and popup shown
  try {
    launchPwa();
  } catch (e) {
    console.error("Failed to launch pwa", e);
  }

  // when sw is active, notify it about our site address
  navigator.serviceWorker.ready.then(async (r: ServiceWorkerRegistration) => {
    console.log("sw ready", JSON.stringify(addr));
    r.active?.postMessage({ method: "setSiteAddr", addr });
  });
}

function newRenderer(): Renderer {
  return new NostrSiteRenderer();
}

const nostrSite: GlobalNostrSite = {
  startPwa,
  renderCurrentPage,
  newRenderer,
  startSW,
  nostrTools: {
    nip19
  }
};
console.log("GlobalNostrSite", nostrSite);

// @ts-ignore
globalThis.nostrSite = nostrSite;
