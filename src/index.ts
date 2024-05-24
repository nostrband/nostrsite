  import { SiteAddr } from "./nostrsite/types/site";
import { setHtml } from "./html";
import { nip19 } from "nostr-tools";
import { KIND_SITE } from "./consts";
import { Renderer } from "./renderer";
import { launchPwa } from "./pwa";
import { setScriptUrl } from "./pwa-code";

export const INDEX_SCRIPT_URL = import.meta.url;
setScriptUrl(INDEX_SCRIPT_URL);

async function getAddr(): Promise<SiteAddr | undefined> {
  // <link rel="manifest" href="manifest.json" />
  const metas = document.getElementsByTagName("meta");
  for (const meta of metas) {
    if (meta.getAttribute("property") !== "nostr:site") continue;

    const content = meta.getAttribute("content");
    if (!content || !content.startsWith("naddr1")) {
      console.log("Bad meta nostr:site value: ", content);
      continue;
    }

    const { type, data } = nip19.decode(content);
    if (type !== "naddr" || data.kind !== KIND_SITE || !data.pubkey.trim()) {
      console.log("Bad meta nostr:site addr: ", type, data);
      continue;
    }

    return {
      name: data.identifier,
      pubkey: data.pubkey,
      relays: data.relays,
    };
  }

  return undefined;
}

async function render() {
  // read-only thing, but SW should re-fetch
  // it and update HBS object if something changes
  const addr = await getAddr();
  console.log("addr", addr);
  if (!addr) throw new Error("No nostr site addr");

  const renderer = new Renderer(addr);
  await renderer.start();

  // render using hbs and replace document.html
  const { result } = await renderer.render(document.location.pathname);
  setHtml(result);
}

async function startPwa() {
  const addr = await getAddr();
  console.log("addr", addr);
  if (!addr) throw new Error("No nostr site addr");

  // sw is registered and popup shown
  launchPwa();

  // when sw is active, notify it about our site address
  navigator.serviceWorker.ready.then(async (r: ServiceWorkerRegistration) => {
    console.log("sw ready", JSON.stringify(addr));
    r.active?.postMessage({ method: "setSiteAddr", addr });
  });
}

console.log("INDEX_SCRIPT_URL", INDEX_SCRIPT_URL);
const pwa = new URL(INDEX_SCRIPT_URL).searchParams.get("pwa") === "true";
console.log("start pwa", pwa);
if (pwa) {
  // we're injected into the rendered html code and
  // must now launch the service worker
  console.log("start pwa");
  startPwa();
} else {
  // we're called by the bootstrap html to render
  // the first page
  console.log("start render");
  render();
}
