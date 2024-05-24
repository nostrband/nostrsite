import { NDKEvent } from "@nostr-dev-kit/ndk";
import { Site, SiteAddr } from "../nostrsite/types/site";
import { tags, tv } from "./utlis";
import { nip19 } from "nostr-tools";
import { Post } from "../nostrsite/types/post";
import { marked } from "marked";
// import moment from "moment-timezone";
import { KIND_LONG_NOTE, KIND_NOTE, KIND_PACKAGE, KIND_SITE } from "../consts";
import { Profile } from "../nostrsite/types/profile";
import { Author } from "../nostrsite/types/author";
import { Theme } from "../nostrsite/types/theme";
import { DateTime } from "luxon";
// @ts-ignore
import downsize from "downsize";

function fromUNIX(ts: number | undefined) {
  return DateTime.fromMillis((ts || 0) * 1000).toISO() || "";
}

export class NostrParser {
  private config: Map<string, string> | undefined;

  public setConfig(config: Map<string, string>) {
    this.config = config;
  }

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

      extensions: tags(event, "x", 5).map((x) => ({
        event_id: x[1],
        relay: x[2],
        package_hash: x[3],
        petname: x[4],
      })),

      config: new Map(),
      custom: new Map(),
    };

    for (const c of tags(event, "config", 3)) {
      settings.config.set(c[1], c[2]);
    }

    for (const c of tags(event, "custom", 3)) {
      settings.custom.set(c[1], c[2]);
    }

    if (!settings.url?.endsWith("/")) settings.url += "/";

    settings.comments_enabled = this.config?.get("comments_enabled") === "true";
    settings.recommendations_enabled =
      this.config?.get("recommendations_enabled") === "true";

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
      slug: tv(e, "slug") || tv(e, "d") || id,
      uuid: e.id,
      url: "",
      title: tv(e, "title"),
      html: await marked.parse(e.content),
      comment_id: e.id,
      feature_image: tv(e, "image"),
      feature_image_alt: null,
      feature_image_caption: null,
      featured: false,
      visibility: "public",
      created_at: fromUNIX(e.created_at),
      updated_at: fromUNIX(e.created_at),
      published_at: fromUNIX(
        parseInt(tv(e, "published_at") || "" + e.created_at)
      ),
      custom_excerpt: null,
      codeinjection_head: null,
      codeinjection_foot: null,
      custom_template: null,
      canonical_url: null,
      excerpt: tv(e, "summary") || downsize(e.content, { words: 50 }),
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
      links: this.parseTextLinks(e.content),
      event: e,
      show_title_and_feature_image: true,
    };

    post.images = this.parseImages(post);
    if (post.feature_image) post.images.push(post.feature_image);

    // FIXME config
    post.og_description = post.links.find((u) => this.isVideoUrl(u)) || null;

    return post;
  }

  public async parseNote(e: NDKEvent) {
    if (e.kind !== KIND_NOTE) throw new Error("Bad kind: " + e.kind);

    const id = this.getId(e);
    const post: Post = {
      id,
      slug: tv(e, "slug") || id,
      uuid: e.id,
      url: "",
      title: downsize(e.content.trim().split("\n")[0], { words: 20 }),
      html: await marked.parse(e.content),
      comment_id: e.id,
      feature_image: "",
      feature_image_alt: null,
      feature_image_caption: null,
      featured: false,
      visibility: "public",
      created_at: fromUNIX(e.created_at),
      updated_at: fromUNIX(e.created_at),
      published_at: fromUNIX(
        parseInt(tv(e, "published_at") || "" + e.created_at)
      ),
      custom_excerpt: null,
      codeinjection_head: null,
      codeinjection_foot: null,
      custom_template: null,
      canonical_url: null,
      excerpt: downsize(e.content, { words: 50 }),
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
      links: this.parseTextLinks(e.content),
      event: e,
      show_title_and_feature_image: true,
    };

    post.images = this.parseImages(post);
    if (post.feature_image) post.images.push(post.feature_image);

    post.title = downsize(e.content.trim().split("\n")[0], { words: 20 });

    if (this.getConf("podcast_media_in_og_description") === "true") {
      post.og_description =
        post.links.find((u) => this.isVideoUrl(u) || this.isAudioUrl(u)) ||
        null;
    }

    return post;
  }

  private getConf(name: string): string | undefined {
    if (!this.config) return "";
    return this.config.get(name);
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
      created_at: fromUNIX(profile.event.created_at),
      updated_at: fromUNIX(profile.event.created_at),
      permissions: [],
      roles: [],
      count: { posts: 0 },
      url: "",
      event: profile.event,
    };
  }

  private parseMarkdownImages(markdown: string | undefined): string[] {
    if (!markdown) return [];

    const IMAGE_MD_RX = /!\[(.*)\]\((.+)\)/g;
    return [
      ...new Set(
        [...markdown.matchAll(IMAGE_MD_RX)]
          .filter((m) => m?.[2])
          .map((m) => m[2])
      ),
    ];
  }

  private parseTextLinks(text: string): string[] {
    if (!text) return [];
    const IMAGE_RX =
      /(?:(?:https?):\/\/)(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:([-A-Z0-9+&@#/%=~_|$?!:,.]*)|[A-Z0-9+&@#/%=~_|$])/gi;
    return [...new Set([...text.matchAll(IMAGE_RX)].map((m) => m[0]))];
  }

  private isImageUrl(u: string) {
    try {
      const url = new URL(u);
      const ext = url.pathname.split(".").pop();
      switch (ext?.toLowerCase()) {
        case "png":
        case "svg":
        case "jpg":
        case "jpeg":
        case "gif":
        case "tif":
        case "tiff":
        case "webp":
          return true;
      }
    } catch {}
    return false;
  }

  private isVideoUrl(u: string) {
    try {
      const url = new URL(u);
      const ext = url.pathname.split(".").pop();
      switch (ext?.toLowerCase()) {
        case "mp4":
        case "avi":
        case "mpeg":
        case "mkv":
        case "webm":
        case "ogv":
          return true;
      }
    } catch {}
    return false;
  }

  private isAudioUrl(u: string) {
    try {
      const url = new URL(u);
      const ext = url.pathname.split(".").pop();
      switch (ext?.toLowerCase()) {
        case "mp3":
        case "aac":
        case "ogg":
        case "wav":
        case "weba":
          return true;
      }
    } catch {}
    return false;
  }

  private parseImages(post: Post): string[] {
    const images: string[] = [];
    if (post.feature_image) images.push(post.feature_image);

    // collect images from markdown
    images.push(...this.parseMarkdownImages(post.markdown));

    // extract from string content
    const urls = this.parseTextLinks(post.event.content);
    images.push(...urls.filter((u) => this.isImageUrl(u)));

    // unique
    return [...new Set(images)];
  }
}
