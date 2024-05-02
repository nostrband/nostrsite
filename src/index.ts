console.log("starting")
import NDK from "@nostr-dev-kit/ndk";
console.log("got ndk")

// @ts-ignore FIXME ADD TYPES
import BrowserHbs from "browser-hbs";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { SiteInfo } from "./types/siteinfo";
import { HBS } from "./hbs/hbs";

// https://www.w3.org/Proposal.html
// WWW was proposed as a separate project on Nov 12 1990,
// I particularly like their plan to have "automatic notification of a reader when
// new material of interest to him/her has become available" within 6 months.
// We're 34 years in, and this is still not a core part of the web. Nostr
// will fix this. Nov + 6 months = May 12 = 0512.
const KIND_SITE = 30512;

const dir = "/views/";

let ndk;

async function fetchManifest() {
  // <link rel="manifest" href="manifest.json" />
  const links = document.getElementsByTagName("link");
  for (const l of links) {
    const rel = l.getAttribute("rel");
    if (l.getAttribute("rel") !== "manifest") continue;

    const href = l.getAttribute("href");
    if (!href) continue;

    const r = await fetch(href);
    return await r.json();
  }

  return undefined;
}

async function fetchSite(info: SiteInfo) {
  // FIXME fetch from cache

  ndk = new NDK({
    explicitRelayUrls: info.relays,
  });

  await ndk.connect();

  const site = await ndk.fetchEvent({
    // @ts-ignore
    kinds: [KIND_SITE],
    authors: [info.admin_pubkey],
    "#d": [info.name],
  });

  return site;
}

async function render() {
  const manifest = await fetchManifest();
  console.log("manifest", manifest);
  const site = await fetchSite(manifest.nostr_site);
  console.log("site", site);

  const hbs = new HBS(dir, manifest.nostr_site);
  console.log("hbs", hbs);

  const html = await hbs.render(document.location.pathname);
  document.write(html);
}

console.log("start");
render();

serviceWorkerRegistration.register();
