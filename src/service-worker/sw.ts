/// <reference lib="webworker" />
import { GlobalNostrSite } from "libnostrsite";

// reuse the same script as the frontend
importScripts("/index.js");

// @ts-ignore
(self.nostrSite as GlobalNostrSite).startSW();