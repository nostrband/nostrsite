import NDK, { NDKFilter, NDKRelaySet } from "@nostr-dev-kit/ndk";

// @ts-ignore FIXME ADD TYPES
import BrowserHbs from "browser-hbs";

// FIXME get rid of it when we start loading settings from the nostr event
// @ts-ignore
import loader from "./ghost/shared/config/loader";

import { Site, SiteAddr } from "./nostrsite/types/site";
import { NostrSiteEngine } from "./nostrsite/nostr-site-engine";
import { Theme } from "./nostrsite/types/theme";
import { NostrStore } from "./store/nostr-store";
import { KIND_PACKAGE, KIND_PROFILE, KIND_SITE } from "./consts";
import { NostrParser } from "./parser/parser";
import { theme, theme1, theme2, theme3 } from "./sample-themes";

export class Renderer {
  readonly addr: SiteAddr;
  private ndk?: NDK;
  private engine?: NostrSiteEngine;

  constructor(addr: SiteAddr) {
    this.addr = addr;
  }

  private async connect() {
    this.ndk = new NDK({
      // FIXME also add some seed relays?
      explicitRelayUrls: this.addr.relays,
    });

    await this.ndk.connect();
  }

  private async fetchSite() {
    // fetch site object and it's author's profile in parallel
    const [site, profile] = await Promise.all([
      this.ndk!.fetchEvent({
        // @ts-ignore
        kinds: [KIND_SITE],
        authors: [this.addr.pubkey],
        "#d": [this.addr.name],
      }),
      this.ndk!.fetchEvent({
        // @ts-ignore
        kinds: [KIND_PROFILE],
        authors: [this.addr.pubkey],
      }),
    ]);

    return {
      site,
      profile,
    };
  }

  // @ts-ignore
  private async fetchSampleThemes(_: Site, __: NostrParser): Promise<Theme[]> {
    console.warn("SAMPLE THEMES!");
    return Promise.resolve([theme, theme1, theme2, theme3]);
  }

  private async fetchThemes(
    settings: Site,
    parser: NostrParser
  ): Promise<Theme[]> {
    const filter: NDKFilter = {
      // @ts-ignore
      kinds: [KIND_PACKAGE],
      ids: settings.extensions.map((x) => x.event_id),
    };
    console.log("fetch themes", filter);
    const events = await this.ndk!.fetchEvents(
      filter,
      {},
      NDKRelaySet.fromRelayUrls(
        settings.extensions.map((x) => x.relay),
        this.ndk!
      )
    );
    if (!events) throw new Error("Theme not found");

    const themeEvents = [...events].filter((e) =>
      e.tags.find((t) => t.length >= 2 && t[0] === "l" && t[1] === "theme")
    );
    if (!themeEvents.length) throw new Error("No theme assigned");

    // themes must be sorted by their order in the list of extensions
    themeEvents.sort((a, b) => {
      const ai = settings.extensions.findIndex((x) => x.event_id === a.id);
      const bi = settings.extensions.findIndex((x) => x.event_id === b.id);
      return ai - bi;
    });

    console.log(
      "fetched themes",
      themeEvents.map((e) => e.rawEvent())
    );

    const themes: Theme[] = [];
    for (const e of themeEvents) {
      const theme = await parser.parseTheme(e);
      themes.push(theme);
    }

    console.log("parsed themes", themes);
    return themes;
  }

  public async start() {
    // ndk connect to site relays
    await this.connect();

    // site event by the website admin
    const { site, profile } = await this.fetchSite();
    console.log("site", { site, profile });
    if (!site) throw new Error("Nostr site event not found");

    const parser = new NostrParser();

    // site settings from the database (settingsCache)
    const settings = parser.parseSite(this.addr, site, profile);
    console.log("settings", settings);

    // kinda server-side settings,
    // FIXME must also come from site event!
    const config = loader.loadNconf();

    const store = new NostrStore(this.ndk!, settings, parser);

    this.engine = new NostrSiteEngine(store);

    // FIXME get from settings
    settings.comments_enabled = false;
    settings.recommendations_enabled = false;

    // do it in parallel to save some latency
    const [themes] = await Promise.all([
      await this.fetchThemes(settings, parser),
      await store.load(),
    ]);

    // now we have everything needed to init the engine
    await this.engine.init(settings, themes, config);

    // after data is loaded and engine is initialized,
    // prepare using the engine (assign urls etc)
    await store.prepare(this.engine);

    // some defaults
    if (!settings.cover_image && settings.contributor_pubkeys) {
      for (const pubkey of settings.contributor_pubkeys) {
        const profile = store.getProfile(pubkey);
        if (profile?.profile?.banner) {
          settings.cover_image = profile?.profile?.banner;
          break;
        }
      }
    }
    // FIXME somehow derive from profile etc
    if (!settings.accent_color) {
      settings.accent_color = "rgb(255, 0, 149)";
    }

    console.log("updated settings", settings);
  }

  public async render(path: string) {
    return await this.engine!.render(path);
  }
}
