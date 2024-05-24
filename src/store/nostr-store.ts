import NDK, { NDKEvent, NDKFilter, NDKRelaySet } from "@nostr-dev-kit/ndk";
import { NostrSiteEngine } from "../nostrsite/nostr-site-engine";
import { Site } from "../nostrsite/types/site";
import { RamStore } from "./ram-store";
import {
  KIND_LONG_NOTE,
  KIND_NOTE,
  KIND_PROFILE,
  SUPPORTED_KINDS,
} from "../consts";
import { NostrParser } from "../parser/parser";
import { Tag } from "../nostrsite/types/tag";
import { recommendations } from "./sample-recommendations";
import { Profile } from "../nostrsite/types/profile";
import { Post } from "../nostrsite/types/post";
import { StoreObject } from "../nostrsite/types/store";
import { nip19 } from "nostr-tools";

export class NostrStore extends RamStore {
  private ndk: NDK;
  private settings: Site;
  private parser: NostrParser;

  constructor(ndk: NDK, settings: Site, parser: NostrParser) {
    super();
    this.ndk = ndk;
    this.settings = settings;
    this.parser = parser;
  }

  public async load(full: boolean = false) {
    this.recommendations = recommendations;

    const promises: Promise<void>[] = [];

    if (this.settings.include_all || !!this.settings.include_tags?.length) {
      promises.push(this.fetchByFilter(full));
    }

    if (this.settings.include_manual) {
      promises.push(this.fetchManual(full));
    }

    // FIXME
    // - also fetch tags and pages and recomms

    await Promise.all(promises);

    await this.fetchAuthors();

    await this.postProcess();

    console.log("store posts", this.posts);
    console.log("store tags", this.tags);
    console.log("store authors", this.authors);
    console.log("store profiles", this.profiles);
    console.log("store recommendations", this.recommendations);
  }

  public async prepare(engine: NostrSiteEngine) {
    this.posts.forEach((post) => {
      post.url = engine.getMetaDataUrl(post);
    });
    this.tags.forEach((tag) => {
      tag.url = engine.getMetaDataUrl(tag);
    });
    this.authors.forEach((author) => {
      author.url = engine.getMetaDataUrl(author);
    });
  }

  private async parsePostTags(post: Post, e: NDKEvent) {
    const allowed = (this.settings.config.get("hashtags") || "").split(",");

    // ensure tags
    for (const tagName of this.parser.parseHashtags(e)) {
      if (allowed.length && !allowed.includes(tagName)) continue;

      const existingTag = this.tags.find((t) => t.id === tagName);
      const tag: Tag = existingTag || {
        id: tagName,
        url: "",
        slug: tagName,
        name: tagName,
        description: null,
        meta_title: null,
        meta_description: null,
        feature_image: null,
        visibility: "public",
        images: [],
        postIds: [],
      };

      if (!existingTag) this.tags.push(tag);

      tag.postIds.push(post.id);

      post.tags.push(tag);
      if (!post.primary_tag) post.primary_tag = tag;
    }
  }

  private async parseEvents(events: NDKEvent[]) {
    for (const e of events) {
      let post: Post | undefined;
      switch (e.kind) {
        case KIND_LONG_NOTE:
          post = await this.parser.parseLongNote(e);
          break;
        case KIND_NOTE:
          if (e.tags.find((t) => t.length >= 2 && t[0] === "e")) {
            console.log("skip reply event", e);
          } else {
            post = await this.parser.parseNote(e);
          }
          break;
        default:
          console.warn("invalid kind", e);
      }
      if (!post) continue;

      // make sure it has unique slug
      if (this.posts.find((p) => p.slug === post!.slug)) post.slug = post.id;

      // hashtags
      this.parsePostTags(post, e);

      // put to local storage
      this.posts.push(post);

      console.log("post", post);
    }
  }

  private async postProcess() {
    // attach images to tags
    for (const tag of this.tags) {
      for (const post of this.posts.filter((p) =>
        p.tags.find((t) => t.id === tag.id)
      )) {
        tag.images.push(...post.images);
      }
      // dedup
      tag.images = [...new Set(tag.images)];
    }

    // get tags without images, sorted by number of images asc
    const sortedTags = [...this.tags.filter((t) => !t.feature_image)].sort(
      (a, b) => a.images.length - b.images.length
    );

    for (const tag of sortedTags) {
      for (const image of tag.images) {
        // if image not already used, use it
        if (!this.tags.find((t) => t.feature_image === image)) {
          const t = this.tags.find((t) => t.id === tag.id);
          t!.feature_image = image;
          break;
        }
      }
    }

    // now sort tags from most used to least used
    this.tags.sort((a, b) => b.postIds.length - a.postIds.length);
  }

  private async fetchAuthors() {
    // fetch authors
    const pubkeys = [
      ...(this.settings.contributor_pubkeys || []),
      this.settings.admin_pubkey,
    ];
    for (const p of this.posts) {
      pubkeys.push(p.event.pubkey);
    }

    await this.fetchProfiles(pubkeys);

    // assign authors
    for (const post of this.posts) {
      const id = this.parser.getAuthorId(post.event);
      let author = this.authors.find((a) => a.id === id);
      if (!author) {
        const profile = this.profiles.find((p) => p.id === id);
        if (profile) {
          author = this.parser.parseAuthor(profile);
          this.authors.push(author);
        }
      }
      if (author) {
        author.count.posts++;
        post.primary_author = author;
        post.authors.push(author);
      }
    }
  }

  protected async fetchObject(
    slugId: string,
    objectType?: string
  ): Promise<StoreObject | undefined> {
    console.log("fetchObject", slugId, objectType);

    const f: NDKFilter = {
      authors: this.settings.contributor_pubkeys,
      limit: 1,
    };

    switch (objectType) {
      case "posts":
        f.kinds = SUPPORTED_KINDS;
        break;
      case "tags":
        // FIXME fetch tag object?
        return undefined;
      case "authors":
        // FIXME fetch profile object?
        return undefined;
    }

    try {
      const { type, data } = nip19.decode(slugId);
      switch (type) {
        case "naddr":
          if (this.settings.contributor_pubkeys!.includes(data.pubkey))
            return undefined;
          f["#d"] = [data.identifier];
          break;
        case "nevent":
          f.ids = [data.id];
          break;
        case "note":
          f.ids = [data];
          break;
        case "nprofile":
        case "npub":
          return undefined;
      }
    } catch {
      f["#d"] = [slugId];
    }

    const event = await this.ndk.fetchEvent(f);
    console.log("fetchObject got", slugId, objectType, event);
    if (!event) return undefined;

    await this.parseEvents([event]);
  }

  private async fetchProfiles(pubkeys: string[]) {
    const relays = [
      ...(this.settings.include_relays || []),
      ...(this.settings.admin_relays || []),
      "wss://relay.nostr.band",
      "wss://purplepag.es",
    ];

    const events = await this.ndk.fetchEvents(
      {
        kinds: [KIND_PROFILE],
        authors: pubkeys,
      },
      {},
      NDKRelaySet.fromRelayUrls(relays, this.ndk)
    );
    console.log("profiles", { events, relays });
    if (!events) return;

    await this.parseProfiles([...events]);
  }

  private async parseProfiles(events: NDKEvent[]) {
    for (const e of events) {
      const p = this.parser.parseProfile(e);
      this.profiles.push(p);
    }
  }

  private async fetchByFilter(full: boolean) {
    const filters: NDKFilter[] = [];
    const add = (kind: number, tag?: { tag: string; value: string }) => {
      const f: NDKFilter = {
        authors: this.settings.contributor_pubkeys,
        kinds: [kind],
        limit: full ? 1000 : 50,
      };
      if (tag) {
        // @ts-ignore
        f["#" + tag.tag] = [tag.value];
      }

      filters.push(f);
    };

    let kinds = SUPPORTED_KINDS;
    if (this.settings.include_kinds?.length)
      kinds = this.settings.include_kinds
        .map((k) => parseInt(k))
        .filter((k) => SUPPORTED_KINDS.includes(k));

    const addAll = (tag?: { tag: string; value: string }) => {
      for (const k of kinds) add(k, tag);
    };

    if (this.settings.include_all) {
      addAll();
    } else if (this.settings.include_tags?.length) {
      for (const tag of this.settings.include_tags) {
        if (tag.tag.length !== 1 || tag.tag < "a" || tag.tag > "z") {
          console.log("Invalid include tag", tag);
          continue;
        }

        addAll(tag);
      }
    }
    if (!filters.length) {
      console.warn("Empty filters for 'include' tags");
      return;
    }

    // FIXME implement proper relay selection logic
    const relays = this.settings.include_relays ||
      this.settings.admin_relays || ["wss://relay.nostr.band"];

    const events = await this.ndk.fetchEvents(
      filters,
      {},
      NDKRelaySet.fromRelayUrls(relays, this.ndk)
    );
    console.log("events", { events, filters, relays });
    if (!events) return;

    await this.parseEvents([...events]);
  }

  private async fetchManual(_: boolean) {
    // FIXME implement
  }

  public getProfile(pubkey: string): Profile | undefined {
    return this.profiles.find((p) => p.pubkey === pubkey);
  }
}
