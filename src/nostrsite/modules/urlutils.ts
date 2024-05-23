import UrlUtils from "../../ghost/shared/url-utils/url-utils"

export class NostrSiteUrlUtils extends UrlUtils {
  constructor(config: any) {
    super({
      getSubdir: config.getSubdir,
      getSiteUrl: config.getSiteUrl,
      getAdminUrl: config.getAdminUrl,
      slugs: config.get('slugs').protected,
      redirectCacheMaxAge: config.get('caching:301:maxAge'),    
    })
  }

  public STATIC_IMAGE_URL_PREFIX = '';
};