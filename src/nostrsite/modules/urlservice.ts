import { isPost, isTag, isUser } from "../../ghost/frontend/utils/checks";
import { Store } from "../types/store";
import { NostrSiteUrlUtils } from "./urlutils";

// stub for server/url-service
export class UrlService {
  private store: Store;
  private utils: NostrSiteUrlUtils;
  private origin: string;
  private subDir: string;

  constructor(store: Store, utils: NostrSiteUrlUtils, origin: string, subir: string) {
    this.store = store;
    this.utils = utils;
    this.origin = origin;
    this.subDir = subir;
  }

  public getUrlByResource(
    data: any,
    {
      absolute,
      withSubdirectory,
    }: {
      absolute?: boolean;
      withSubdirectory?: boolean;
    }
  ) {
    let prefix = "";

    // FIXME custom router here please!
    if (isPost(data)) prefix = "post/";
    else if (isTag(data)) prefix = "tag/";
    else if (isUser(data)) prefix = "author/";
    else throw new Error("Unknown data type");

    return (
      (absolute ? this.origin : "") +
      (withSubdirectory ? this.subDir : "") +
      prefix +
      (data.slug || data.id)
    );
  }

  public getUrlByResourceId(id: string, options: any = {}) {
    const slug = this.store.getUrl(id);
    if (slug) {
      if (options.absolute) {
        return this.utils.createUrl(slug, options.absolute);
      }

      if (options.withSubdirectory) {
        return this.utils.createUrl(slug, false, true);
      }

      return slug;
    }

    if (options.absolute) {
      return this.utils.createUrl("/404/", options.absolute);
    }

    if (options.withSubdirectory) {
      return this.utils.createUrl("/404/", false);
    }

    return "/404/";
  }
}