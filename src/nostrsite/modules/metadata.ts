// @ts-ignore
import downsize from "downsize";

import { isNav, isPost, isTag, isUser } from "../../ghost/frontend/utils/checks";
import { NostrSiteUrlUtils } from "./urlutils";
import { UrlService } from "./urlservice";
import { AssetFetcher } from "../types/asset-fetcher";

// This cleans the url from any `/amp` postfixes, so we'll never
// output a url with `/amp` in the end, except for the needed `amphtml`
// canonical link, which is rendered by `getAmpUrl`.
function sanitizeAmpUrl(url: string) {
  if (url.indexOf("/amp/") !== -1) {
    url = url.replace(/\/amp\/$/i, "/");
  }
  return url;
}

export class MetaData {
  private themeDir: string;
  private urlUtils: NostrSiteUrlUtils;
  private assetFetcher: AssetFetcher;
  private urlService: UrlService;
  public getMetaDataUrl: (data: any, absolute?: boolean) => string;
  public getAssetUrl: (path: string, min: boolean) => string;
  public getMetaDataExcerpt: (excerpt: string, truncateOptions: any) => string;

  constructor(themeDir: string, assetFetcher: AssetFetcher, uu: NostrSiteUrlUtils, urlService: UrlService) {
    this.urlUtils = uu;
    this.themeDir = themeDir;
    this.assetFetcher = assetFetcher;
    this.urlService = urlService;
    this.getMetaDataUrl = this._getMetaDataUrl.bind(this);
    this.getAssetUrl = this._getAssetUrl.bind(this);
    this.getMetaDataExcerpt = this._getMetaDataExcerpt.bind(this);
  }

  private _getMetaDataUrl(data: any, absolute?: boolean) {
    if (isNav(data)) {
      return this.urlUtils.urlFor("nav", { nav: data }, absolute);
    }

    if (isPost(data) || isTag(data) || isUser(data)) {
      return this.urlService.getUrlByResource(data, {
        absolute: absolute,
        withSubdirectory: true,
      });
    }

    // sanitize any trailing `/amp` in the url
    return sanitizeAmpUrl(this.urlUtils.urlFor(data, {}, absolute));
  }

  private _getAssetUrl(path: string, min: boolean) {
    const asset = `${this.themeDir}assets/${path}`;
    console.log("asset", path, asset, min);
    return this.assetFetcher.resolve(asset);
  }

  private _getMetaDataExcerpt(excerpt: string, truncateOptions: any) {
    truncateOptions = truncateOptions || {};

    if (!truncateOptions.words && !truncateOptions.characters) {
      truncateOptions.words = 50;
    }

    // Just uses downsize to truncate, not format
    return downsize(excerpt, truncateOptions);
  }
}
