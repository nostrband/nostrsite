import { Author } from "../nostrsite/types/author";
import { Post } from "../nostrsite/types/post";
import { Profile } from "../nostrsite/types/profile";
import { Recommendation } from "../nostrsite/types/recommendation";
import {
  Store,
  StoreListRequest,
  StoreListResponse,
  StoreObject,
} from "../nostrsite/types/store";
import { Tag } from "../nostrsite/types/tag";

export class RamStore implements Store {
  protected posts: Post[] = [];
  protected tags: Tag[] = [];
  protected authors: Author[] = [];
  protected profiles: Profile[] = [];
  protected recommendations: Recommendation[] = [];

  constructor() {}

  protected async fetchObject(
    slugId: string,
    type?: string
  ): Promise<StoreObject | undefined> {
    throw new Error("Store fetch not implemented " + slugId + " type " + type);
  }

  public async get(slugId: string, type?: string): Promise<StoreObject | undefined> {
    let object = this.getSync(slugId, type);
    if (!object) {
      await this.fetchObject(slugId, type);
      object = this.getSync(slugId, type);
    }
    return Promise.resolve(object);
  }

  public getUrl(id: string, type?: string) {
    return this.getSync(id, type)?.url;
  }

  private getSync(slugId: string, type?: string): StoreObject | undefined {
    if (!type) {
      return (
        this.posts.find((p) => p.id === slugId || p.slug === slugId) ||
        this.tags.find((p) => p.id === slugId || p.slug === slugId) ||
        this.authors.find((p) => p.id === slugId || p.slug === slugId)
      );
    }

    switch (type) {
      case "posts":
        return this.posts.find((p) => p.id === slugId || p.slug === slugId);
      case "tags":
        return this.tags.find((p) => p.id === slugId || p.slug === slugId);
      case "authors":
        return this.authors.find((p) => p.id === slugId || p.slug === slugId);
      case "recommendations":
        return this.recommendations.find((p) => p.id === slugId);
      default:
        throw new Error("Bad type " + type);
    }
  }

  public async list(req: StoreListRequest): Promise<StoreListResponse> {
    const { type } = req;
    const slugId = req.id || req.slug || undefined;
    console.log("list req", req);

    const relatedNoteId = req.filter?.match(/\+id\:\-(.*)+/)?.[1];
    console.log("relatedNoteId", relatedNoteId);

    const results = [];
    if (slugId) {
      const r = await this.get(slugId, type);
      if (r) results.push(r);
    } else {
      const parseFilter = (prefix: string) => {
        const filter: string[] = [];
        if (!req.filter) return filter;
        if (!req.filter.startsWith(prefix + ":")) return filter;

        const list = req.filter.split(":")[1];
        if (list.startsWith("[")) {
          filter.push(...list.substring(1, list.length - 1).split(","));
        } else {
          filter.push(list);
        }
        return filter;
      };

      const slugs = parseFilter("slug");
      const tags = parseFilter("tag");
      const authors = parseFilter("author");

      if (req.tag) tags.push(req.tag);
      if (req.author) authors.push(req.author);

      console.log("list filter", { filter: req.filter, slugs, tags, authors });

      switch (type) {
        case "posts":
          results.push(
            ...this.posts.filter(
              (p) =>
                (!slugs.length || slugs.includes(p.slug)) &&
                (!tags.length ||
                  p.tags.find(
                    (t) => tags.includes(t.slug) || tags.includes(t.id)
                  )) &&
                (!authors.length ||
                  p.authors.find(
                    (a) => authors.includes(a.slug) || authors.includes(a.id)
                  )) &&
                (!relatedNoteId || p.id !== relatedNoteId)
            )
          );
          break;
        case "tags":
          results.push(
            ...this.tags.filter((t) => !slugs.length || slugs.includes(t.slug))
          );
          results.sort(
            (a, b) => (a.feature_image ? 0 : 1) - (b.feature_image ? 0 : 1)
          );
          break;
        case "authors":
          results.push(...this.authors);
          break;
        case "recommendations":
          results.push(...this.recommendations);
          break;
        default:
          throw new Error("Not implemented");
      }
    }

    const total = results.length;
    const perPage = Math.min(total, req.limit || total);
    const page = req.page && req.page > 0 ? req.page : 1;
    const pages = Math.ceil(total / perPage);
    let start = (page - 1) * perPage;
    const count = Math.min(perPage, total - start);

    if (type === "posts" && relatedNoteId && count < total) {
      const relatedIndex = this.posts.findIndex((p) => p.id === relatedNoteId);
      start = Math.max(0, relatedIndex - Math.ceil(count / 2));
    }

    const end = start + count;

    const pageResults = results.slice(start, end);

    const response: StoreListResponse = {
      pagination: {
        total,
        page,
        pages,
        limit: perPage,
        prev: page > 1 ? page - 1 : null,
        next: end < total ? page + 1 : null,
      },
    };

    // @ts-ignore
    response[type] = pageResults;

    console.log("store list", { req, response });

    return response;
  }

  public isValidType(type: string): boolean {
    return (
      type === "posts" ||
      type === "tags" ||
      type === "authors" ||
      type === "pages" ||
      type === "tiers" ||
      type === "newsletters"
    );
  }
}
