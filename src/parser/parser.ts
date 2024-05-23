import { NDKEvent } from "@nostr-dev-kit/ndk";
import { Site, SiteAddr } from "../nostrsite/types/site";
import { tags, tv } from "./utlis";
import { nip19 } from "nostr-tools";
import { Post } from "../nostrsite/types/post";
import { marked } from "marked";
import moment from "moment-timezone";
import { KIND_LONG_NOTE, KIND_PACKAGE, KIND_SITE } from "../consts";
import { Profile } from "../nostrsite/types/profile";
import { Author } from "../nostrsite/types/author";
import { Theme } from "../nostrsite/types/theme";

export class NostrParser {
  public getId(e: NDKEvent) {
    if (e.kind === undefined) return "";
    const isMeta = e.kind === 0 || e.kind === 3;
    const isReplaceable = e.kind >= 10000 && e.kind < 20000;
    const isPRE = e.kind >= 30000 && e.kind < 40000;
    if (isMeta || isReplaceable || isPRE) {
      return nip19.naddrEncode({
        identifier: tv(e, "d") || "",
        kind: e.kind,
        pubkey: e.pubkey,
      });
    } else {
      return nip19.noteEncode(e.id);
    }
  }

  public getAuthorId(e: NDKEvent) {
    return nip19.npubEncode(e.pubkey);
  }

  public parseSite(
    addr: SiteAddr,
    event: NDKEvent | null,
    profileEvent: NDKEvent | null
  ): Site {
    if (!event) throw new Error("Site not found");

    const profile = profileEvent ? this.parseProfile(profileEvent) : undefined;

    const id = nip19.naddrEncode({
      identifier: addr.name,
      kind: KIND_SITE,
      pubkey: addr.pubkey,
      relays: addr.relays,
    });

    const settings: Site = {
      id,

      name: tv(event, "d") || "",
      admin_pubkey: event.pubkey,
      admin_relays: addr.relays,

      url: new URL(tv(event, "r") || "").pathname,
      origin: window.location.origin,

      contributor_pubkeys: tags(event, "p").map((t) => t[1]),
      include_tags: tags(event, "include", 3).map((t) => ({
        tag: t[1],
        value: t[2],
      })),
      include_all: !!tags(event, "include", 2).find((t) => t[1] === "*"),
      include_manual: !!tags(event, "include", 2).find((t) => t[1] === "?"),
      include_kinds: tags(event, "kind").map((t) => t[1]),
      include_relays: tags(event, "relay").map((t) => t[1]),

      engine: tv(event, "x") || undefined,
      themes: tags(event, "y").map((t) => t[1]),
      plugins: tags(event, "z").map((t) => t[1]),

      title: tv(event, "title"),
      timezone: "UTC",
      description: tv(event, "summary"),
      logo: tv(event, "logo"),
      icon: tv(event, "icon"),
      accent_color: null,
      cover_image: profile?.profile?.banner || null,
      facebook: null,
      twitter: null,
      lang: tv(event, "lang"),

      codeinjection_head: null,
      codeinjection_foot: null,
      navigation: tags(event, "nav", 3).map((t) => ({
        label: t[2],
        url: t[1],
      })),
      secondary_navigation: [],
      meta_title: tv(event, "meta_title"),
      meta_description: tv(event, "meta_description"),
      og_image: tv(event, "og_image"),
      og_title: tv(event, "og_title"),
      og_description: tv(event, "og_description"),
      twitter_image: tv(event, "twitter_image"),
      twitter_title: tv(event, "twitter_title"),
      twitter_description: tv(event, "twitter_description"),
      members_support_address: null,

      hashtags: tags(event, "hashtag").map((t) => t[1]),

      extensions: tags(event, "x", 5).map((x) => ({
        event_id: x[1],
        relay: x[2],
        package_hash: x[3],
        petname: x[4],
      })),
    };

    if (!settings.url?.endsWith("/")) settings.url += "/";

    // FIXME for testing
    // settings.secondary_navigation = settings.navigation;

    return settings;
  }

  public async parseTheme(e: NDKEvent) {
    if (e.kind !== KIND_PACKAGE) throw new Error("Bad kind: " + e.kind);
    const id = this.getId(e);
    const theme: Theme = {
      id,

      name: tv(e, "title") || id,

      dir: `/${id}/`,

      config: {},
      custom: {},

      entries: tags(e, "f", 4).map((f) => ({
        hash: f[1],
        path: f[2],
        url: f[3],
      })),

      templates: tags(e, "f", 4)
        .filter((f) => !f[2].includes("/") && f[2].endsWith(".hbs"))
        .map((f) => f[2].split(".hbs")[0]),

      partials: tags(e, "f", 4)
        .filter((f) => f[2].startsWith("partials/") && f[2].endsWith(".hbs"))
        .map((f) => f[2].split("partials/")[1]),
    };

    const packageJsonUrl = theme.entries.find(
      (f) => f.path === "package.json"
    )!.url;
    const packageJson = await fetch(packageJsonUrl).then((r) => r.json());
    console.log("packageJson", packageJson);
    if (packageJson.config) {
      if (packageJson.config.custom) {
        for (const name in packageJson.config.custom) {
          theme.custom[name] = packageJson.config.custom[name]["default"];
        }
      }
      theme.config = packageJson.config;
    }
    console.log("parsed theme", theme);
    return theme;
  }

  public async parseLongNote(e: NDKEvent) {
    if (e.kind !== KIND_LONG_NOTE) throw new Error("Bad kind: " + e.kind);

    const id = this.getId(e);
    const post: Post = {
      id,
      slug: tv(e, "d") || id,
      uuid: e.id,
      url: "",
      title: tv(e, "title"),
      html: await marked.parse(e.content),
      commend_id: null,
      feature_image: tv(e, "image"),
      feature_image_alt: null,
      feature_image_caption: null,
      featured: false,
      visibility: "public",
      created_at: moment.unix(e.created_at || 0).format(),
      updated_at: moment.unix(e.created_at || 0).format(),
      published_at: moment
        .unix(parseInt(tv(e, "published_at") || "" + e.created_at))
        .format(),
      custom_excerpt: null,
      codeinjection_head: null,
      codeinjection_foot: null,
      custom_template: null,
      canonical_url: null,
      excerpt: tv(e, "summary"),
      reading_time: 0,
      access: true,
      og_image: null,
      og_title: null,
      og_description: null,
      twitter_image: null,
      twitter_title: null,
      twitter_description: null,
      meta_title: null,
      meta_description: null,
      email_subject: null,
      primary_tag: null,
      tags: [],
      primary_author: null,
      authors: [],
      markdown: e.content,
      images: [],
      event: e,
      show_title_and_feature_image: true,
    };

    return post;
  }

  public parseHashtags(e: NDKEvent): string[] {
    return tags(e, "t").map((tv) => tv[1]);
  }

  public parseProfile(e: NDKEvent): Profile {
    return {
      id: this.getAuthorId(e),
      pubkey: e.pubkey,
      profile: JSON.parse(e.content),
      event: e,
    };
  }

  public parseAuthor(profile: Profile): Author {
    return {
      id: profile.id,
      slug: profile.id,
      name:
        profile.profile?.display_name || profile.profile?.name || profile.id,
      email: null,
      profile_image: profile.profile?.picture || null,
      cover_image: profile.profile?.banner || null,
      bio: profile.profile?.about || null,
      website: profile.profile?.website || null,
      location: null,
      facebook: null,
      twitter: null,
      accessibility: null,
      status: "active",
      meta_title: null,
      meta_description: null,
      tour: null,
      last_seen: null,
      created_at: moment.unix(profile.event.created_at || 0).format(),
      updated_at: moment.unix(profile.event.created_at || 0).format(),
      permissions: [],
      roles: [],
      count: { posts: 0 },
      url: "",
      event: profile.event,
    };
  }
}
