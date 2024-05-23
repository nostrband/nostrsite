/**
 * Remove duplicated directories from the start of a path or url's path
 *
 * @param {string} url URL or pathname with possible duplicate subdirectory
 * @param {string} rootUrl Root URL with an optional subdirectory
 * @returns {string} URL or pathname with any duplicated subdirectory removed
 */
export const deduplicateSubdirectory = function deduplicateSubdirectory(
  url: string,
  rootUrl: string
) {
  // force root url to always have a trailing-slash for consistent behaviour
  if (!rootUrl.endsWith("/")) {
    rootUrl = `${rootUrl}/`;
  }

  // Cleanup any extraneous slashes in url for consistent behaviour
  url = url.replace(/(^|[^:])\/\/+/g, "$1/");

  const parsedRoot = new URL(rootUrl);

  // do nothing if rootUrl does not have a subdirectory
  if (parsedRoot.pathname === "/") {
    return url;
  }

  const subdir = parsedRoot.pathname.replace(/(^\/|\/$)+/g, "");
  // we can have subdirs that match TLDs so we need to restrict matches to
  // duplicates that start with a / or the beginning of the url
  const subdirRegex = new RegExp(`(^|/)${subdir}/${subdir}(/|$)`);

  return url.replace(subdirRegex, `$1${subdir}/`);
};

/** urlJoin
 * Returns a URL/path for internal use in Ghost.
 * @param {string[]} parts takes parts and concats those to a valid path/URL.
 * @param {Object} options
 * @param {string} options.rootUrl used for deduplicating any subdirectories
 * @return {string} URL concatinated URL/path of arguments.
 */
export function urlJoin(parts: string[], options: { rootUrl: string }) {
  let prefixDoubleSlash = false;

  // Remove empty item at the beginning
  if (parts[0] === "") {
    parts.shift();
  }

  // Handle schemeless protocols
  if (parts[0].indexOf("//") === 0) {
    prefixDoubleSlash = true;
  }

  // join the elements using a slash
  let url = parts.join("/");

  // Fix multiple slashes
  url = url.replace(/(^|[^:])\/\/+/g, "$1/");

  // Put the double slash back at the beginning if this was a schemeless protocol
  if (prefixDoubleSlash) {
    url = url.replace(/^\//, "//");
  }

  return deduplicateSubdirectory(url, options.rootUrl);
}
