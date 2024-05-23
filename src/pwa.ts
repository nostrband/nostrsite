import { registerSW } from "virtual:pwa-register";

export function launchPwa() {
  console.log("launching pwa");
  const app = document.querySelector<Element>("body");
  if (!app) throw new Error("No body");
//   const pwaToast = app.querySelector<HTMLDivElement>("#pwa-toast")!;
//   const pwaToastMessage = pwaToast.querySelector<HTMLDivElement>(
//     ".message #toast-message"
//   )!;
//   const pwaCloseBtn = pwaToast.querySelector<HTMLButtonElement>("#pwa-close")!;
//   const pwaRefreshBtn =
//     pwaToast.querySelector<HTMLButtonElement>("#pwa-refresh")!;

   let refreshSW: (reloadPage?: boolean) => Promise<void> | undefined;

//   const refreshCallback = () => refreshSW?.(true);

  function hidePwaToast(raf: boolean) {
    if (raf) {
      requestAnimationFrame(() => hidePwaToast(false));
      return;
    }
    // if (pwaToast.classList.contains("refresh"))
    //   pwaRefreshBtn.removeEventListener("click", refreshCallback);

    // pwaToast.classList.remove("show", "refresh");
  }
  function showPwaToast(offline: boolean) {
    // if (!offline) pwaRefreshBtn.addEventListener("click", refreshCallback);
    offline;
    requestAnimationFrame(() => {
      hidePwaToast(false);
    //   if (!offline) pwaToast.classList.add("refresh");
    //   pwaToast.classList.add("show");
    });
  }

  let swActivated = false;
  // check for updates every hour
  const period = 60 * 60 * 1000;

  window.addEventListener("load", () => {
    // pwaCloseBtn.addEventListener("click", () => hidePwaToast(true));
    refreshSW = registerSW({
      immediate: true,
      onOfflineReady() {
        // pwaToastMessage.innerHTML = "App ready to work offline";
        showPwaToast(true);
      },
      onNeedRefresh() {
        console.log("onNeedRefresh");
        // pwaToastMessage.innerHTML =
        //   "New content available, click on reload button to update";
        showPwaToast(false);
      },
      onRegisteredSW(swUrl, r) {
        console.log("onRegisteredSW", swUrl);
        if (period <= 0) return;
        if (r?.active?.state === "activated") {
          swActivated = true;
          registerPeriodicSync(period, swUrl, r);
        } else if (r?.installing) {
          r.installing.addEventListener("statechange", (e) => {
            const sw = e.target as ServiceWorker;
            swActivated = sw.state === "activated";
            if (swActivated) registerPeriodicSync(period, swUrl, r);
          });
        }
      },
    });
    refreshSW; //FIXME remove when we implement proper pwa toast
  });
}

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        cache: "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
