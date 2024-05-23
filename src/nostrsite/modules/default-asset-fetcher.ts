import {
  DEFAULT_PARTIALS,
  DEFAULT_PARTIALS_DIR_NAME,
} from "../partials/default-partials";
import { AssetFetcher } from "../types/asset-fetcher";
import { Theme } from "../types/theme";

export class DefaultAssetFetcher implements AssetFetcher {
  private themes: Theme[] = [];
  private cache = new Map<string, string>();

  public addTheme(theme: Theme) {
    this.themes.push(theme);
  }

  public async load() {
    if (!this.themes.length) return;

    // prefetch partials in parallel
    const promises: Promise<void>[] = [];
    const theme = this.themes[0];
    for (const e of theme.entries) {
      if (!e.path.endsWith(".hbs")) continue;
      const ext = e.path.split(".").pop();
      const url = `${e.url}.${ext}`;
      promises.push(
        fetch(url)
          .then((d) => d.text())
          .then((d) => {
            console.log("prefetched", url);
            this.cache.set(url, d);
          })
      );
    }
  }

  public resolve(file: string): string {
    if (!file.startsWith("/"))
      throw new Error("Only absolute asset files supported");

    const dir = file.split("/")[1];
    if (dir === DEFAULT_PARTIALS_DIR_NAME) return file;

    const path = file.substring(dir.length + 2); // 2 slashes
    const theme = this.themes.find((t) => t.id === dir);
    console.log("fetch from theme", dir, path, file, theme);

    if (theme) {
      if (theme.local) return file;

      const entry = theme.entries.find((e) => e.path === path);
      if (!entry) {
        console.error("Not found", file, path, theme.entries);
        throw new Error("Not found " + file);
      }

      const name = entry.url.split("/").pop()!;
      const ext = path.split(".").pop();
      console.log("asset ext", entry.url, name, ext);

      // return as is if it has extension
      if (!ext || name.includes(".")) {
        return entry.url;
      }

      return `${entry.url}.${ext}`;
    }

    return file;
  }

  private async fetchCached(url: string) {
    if (url.startsWith(`/${DEFAULT_PARTIALS_DIR_NAME}/`)) {
      const name = url.split("/")[2];
      if (name in DEFAULT_PARTIALS) return DEFAULT_PARTIALS[name];
      console.warn("Default partial not found", url);
      throw new Error("Default partial not found");
    }

    const c = this.cache.get(url);
    if (c) {
      console.log("fetch cached", url);
      return c;
    }
    return fetch(url).then((d) => d.text());
  }

  public async fetch(file: string) {
    const url = this.resolve(file);
    return this.fetchCached(url).then((d) => {
      console.log("fetched", { file, url, d });
      return d;
    });
  }

  public fetchHbs(
    file: string,
    _: string,
    cb: (e: any | null, data?: string) => void
  ) {
    this.fetch(file)
      .then((d) => cb(null, d))
      .catch((e) => cb(e));
  }
}
