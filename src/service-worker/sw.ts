/// <reference lib="webworker" />
// @ts-ignore
import { GlobalNostrSite } from "libnostrsite";
// reuse the same script as the frontend
const index = "/index.js";
importScripts(index);
// @ts-ignore
(self.nostrSite as GlobalNostrSite).startSW({
  index,
  precacheEntries: [index, "/sw.js", "/manifest.webmanifest"],
});
