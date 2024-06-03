// post-build helper that is a hack to inject dynamic SW that we can set
// at runtime, to support deployement at non-root paths

const fs = require("fs");

const index = fs.readFileSync("dist/index.js", { encoding: "utf-8" })
  .replace(/\"\/sw\.js\"\,\{scope\:\"\/\"\,/, `window.nostrSite.serviceWorkerScope+"sw.js",{scope:window.nostrSite.serviceWorkerScope,`);
fs.writeFileSync("dist/index.js", index);
console.log("injected serviceWorkerScope");