import { launchPwa } from "./pwa";
import {
  Renderer,
  GlobalNostrSite,
  NostrSiteRenderer,
  getMetaAddr,
  fetchNostrSite,
  renderCurrentPage,
  setPwaSiteAddr,
  NostrStore,
  getCachedSite,
  getRelativeUrlPrefix,
  NostrParser,
  StoreObject,
  tv,
  // @ts-ignore
} from "libnostrsite";
import { startSW } from "./sw-code";
import { nip19 } from "nostr-tools";
import NDK, { NDKEvent } from "@nostr-dev-kit/ndk";

let tabPromiseOk = null;
let tabPromiseErr = null;
const tabPromise = new Promise<void>((ok, err) => {
  tabPromiseOk = ok;
  tabPromiseErr = err;
});

async function startPwa() {
  const addr = await getMetaAddr();
  console.log("addr", addr);
  if (!addr) throw new Error("No nostr site addr");

  // write to local db so that offline mode could
  // use this addr from db and not from meta tags which won't
  // be available
  await setPwaSiteAddr(addr);

  // get the site from local db or from relays
  let siteEvent = await getCachedSite(addr);
  if (siteEvent) siteEvent = await fetchNostrSite(addr);
  if (!siteEvent) throw new Error("No nostr site fetched");

  // parse the scope
  let scope = "/";
  const url = tv(siteEvent, "r");
  if (url) {
    try {
      scope = new URL(url[1]).pathname;
      if (!scope.endsWith("/")) scope += "/";
    } catch (e) {
      console.warn("bad scope in url", url);
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
    console.log("tab sw ready", JSON.stringify(addr));
    r.active?.postMessage({ method: "setSiteAddr", addr });
  });
}

function newRenderer(): Renderer {
  return new NostrSiteRenderer();
}

async function startTab() {
  try {
    const addr = await getMetaAddr();
    console.log("start tab addr", addr);
    if (!addr) throw new Error("No nostr site addr");

    // // FIXME implement proper interface to talk to sw
    // // make sure sw is ready
    // await new Promise(async (ok) => {
    //   // when sw is active, ask it about our site address
    //   navigator.serviceWorker.ready.then(async (r: ServiceWorkerRegistration) => {
    //     console.log("tab sw ready");
    //     r.active?.postMessage({ method: "isReady", addr });
    //   });

    //   // when sw finished loading we set swReady
    //   navigator.serviceWorker.addEventListener("message", (event) => {
    //     const { method, result } = event.data;
    //     if (method === "isReady") {
    //       console.log("tab sw ready for", addr, result);
    //       nostrSite.swReady = !!result;
    //       ok(result);
    //     } else {
    //       throw new Error("Unknown method");
    //     }
    //   });
    // });

    // site from db or relays
    let site = await getCachedSite(addr);
    if (site) site = await fetchNostrSite(addr);
    if (!site) throw new Error("No nostr site fetched");

    // parser to convert cached events to proper data structures
    nostrSite.parser = new NostrParser(
      window.location.origin,
      /*useCache*/ true
    );

    // ndk used by the store, don't connect anywhere
    // by default as everything might be in cache
    nostrSite.ndk = new NDK({});
    nostrSite.ndk.connect();

    // parse site event
    const settings = nostrSite.parser.parseSite(
      addr,
      new NDKEvent(nostrSite.ndk, site)
    );

    // init and load site data from local db
    const store = new NostrStore(
      "tab",
      nostrSite.ndk,
      settings,
      nostrSite.parser
    );
    nostrSite.store = store;

    // no more than 1k posts loaded from local cache
    await store.load(1000);

    // FIXME reimplemented here bcs it's too many
    // deps on old Ghost parts
    await store.prepare((o: StoreObject) => {
      return settings.url + getRelativeUrlPrefix(o) + (o.slug || o.id);
    });

    tabPromiseOk!();
  } catch (e) {
    console.warn("startTab error", e);
    tabPromiseErr!(e);
  }
}

const nostrSite: GlobalNostrSite = {
  startPwa,
  startTab,
  renderCurrentPage,
  newRenderer,
  startSW,
  tabReady: tabPromise,
  nostrTools: {
    nip19,
  },
};
console.log("GlobalNostrSite", nostrSite);

// @ts-ignore
globalThis.nostrSite = nostrSite;
