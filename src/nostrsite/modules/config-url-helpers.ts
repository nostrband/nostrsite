import { deduplicateSubdirectory } from "../../ghost/shared/url-utils/utils";

/**
 * Returns a subdirectory URL, if defined so in the config.
 * @callback getSubdirFn
 * @return {string} a subdirectory if configured.
 */
export function getSubdir() {
  // @ts-ignore
  const self: any = this;

  // Parse local path location
  let { pathname } = new URL(self.get("url"));
  let subdir;

  // Remove trailing slash
  if (pathname !== "/") {
    pathname = pathname.replace(/\/$/, "");
  }

  subdir = pathname === "/" ? "" : pathname;
  return subdir;
}

/**
 * Returns the base URL of the site as set in the config.
 *
 * Secure:
 * If the request is secure, we want to force returning the site url as https.
 * Imagine Ghost runs with http, but nginx allows SSL connections.
 *
 * @callback getSiteUrlFn
 * @return {string} returns the url as defined in config, but always with a trailing `/`
 */
export function getSiteUrl() {

  // @ts-ignore
  const self: any = this;

  let siteUrl = self.get("url");

  if (!siteUrl.match(/\/$/)) {
    siteUrl += "/";
  }

  return siteUrl;
}

/**
 *
 * @callback getAdminUrlFn
 * @returns {string} returns the url as defined in config, but always with a trailing `/`
 */
export function getAdminUrl() {

  // @ts-ignore
  const self: any = this;

  let adminUrl = self.get("admin:url");
  const subdir = self.getSubdir();

  if (!adminUrl) {
    return;
  }

  if (!adminUrl.match(/\/$/)) {
    adminUrl += "/";
  }

  adminUrl = `${adminUrl}${subdir}`;

  if (!adminUrl.match(/\/$/)) {
    adminUrl += "/";
  }

  adminUrl = deduplicateSubdirectory(adminUrl, self.getSiteUrl());
  return adminUrl;
}

export const urlHelpers: any = {
  bindAll: (conf: any) => {
    conf.getAdminUrl = getAdminUrl.bind(conf);
    conf.getSiteUrl = getSiteUrl.bind(conf);
    conf.getSubdir = getSubdir.bind(conf);
  },
};
