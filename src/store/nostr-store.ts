import NDK, { NDKEvent, NDKFilter, NDKRelaySet } from "@nostr-dev-kit/ndk";
import { NostrSiteEngine } from "../nostrsite/nostr-site-engine";
import { Site } from "../nostrsite/types/site";
import { RamStore } from "./ram-store";
import { KIND_LONG_NOTE, KIND_PROFILE, SUPPORTED_KINDS } from "../consts";
import { NostrParser } from "../parser/parser";
import { Tag } from "../nostrsite/types/tag";
import { recommendations } from "./sample-recommendations";
import { Profile } from "../nostrsite/types/profile";

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

  public async load() {

    this.recommendations = recommendations;

    const promises: Promise<void>[] = [];

    if (this.settings.include_all || !!this.settings.include_tags?.length) {
      promises.push(this.fetchByFilter());
    }

    if (this.settings.include_manual) {
      promises.push(this.fetchManual());
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
    this.posts.forEach(post => {
      post.url = engine.getMetaDataUrl(post);
    })
    this.tags.forEach(tag => {
      tag.url = engine.getMetaDataUrl(tag);
    });
    this.authors.forEach(author => {
      author.url = engine.getMetaDataUrl(author);
    });
  }

  private async parseLongNote(e: NDKEvent) {
    const post = await this.parser.parseLongNote(e);

    // make sure it has unique slug
    if (this.posts.find((p) => p.slug === post.slug)) post.slug = post.id;

    console.log("post", post);

    // ensure tags
    for (const tagName of this.parser.parseHashtags(e)) {
      if (
        this.settings.hashtags.length &&
        !this.settings.hashtags.includes(tagName)
      )
        continue;

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

    // collect images
    const IMAGE_RX = /!\[(.*)\]\((.+)\)/g;
    if (post.feature_image) post.images.push(post.feature_image);
    for (const m of post.markdown.matchAll(IMAGE_RX)) {
      if (m?.[2]) post.images.push(m[2]);
    }
    // unique
    post.images = [...new Set(post.images)];

    // put to local storage
    this.posts.push(post);
  }

  private async parseEvents(events: NDKEvent[]) {
    for (const e of events) {
      switch (e.kind) {
        case KIND_LONG_NOTE:
          await this.parseLongNote(e);
          break;
      }
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

  private async fetchByFilter() {
    const filters: NDKFilter[] = [];
    const add = (kind: number, tag?: { tag: string; value: string }) => {
      const f: NDKFilter = {
        authors: this.settings.contributor_pubkeys,
        kinds: [kind],
        limit: 100,
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
    if (!filters.length) return;

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

  private async fetchManual() {
    // FIXME implement
  }

  public getProfile(pubkey: string): Profile | undefined {
    return this.profiles.find(p => p.pubkey === pubkey);
  }
}
