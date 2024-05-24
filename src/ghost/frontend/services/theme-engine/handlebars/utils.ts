import has from "lodash/has";
import isEmpty from "lodash/isEmpty";
import reduceRight from "lodash/reduceRight";

function findKey(key: any /* ...objects... */) {
  let objects = Array.prototype.slice.call(arguments, 1);

  return reduceRight(
    objects,
    function (result, object) {
      if (object && has(object, key) && !isEmpty(object[key])) {
        result = object[key];
      }

      return result;
    },
    null
  );
}

function _urlClean(url: string) {
  // Strips anchors and leading and trailing slashes
  return url.replace(/#.*?$/, "").replace(/^\/|\/$/g, "");
}

// strips trailing slashes and compares urls
function _urlMatch(href: string, location: string) {
  if (!location) {
    return false;
  }

  const strippedHref = _urlClean(href);
  const strippedLocation = _urlClean(location);

  return strippedHref === strippedLocation;
}

// We want to check if the first part of the current url is a match for href
function _urlParentMatch(href: string, location: string) {
  if (!location) {
    return false;
  }

  let parent = false;
  let locParts = _urlClean(location).split("/");
  let hrefParts = _urlClean(href).split("/");

  if (locParts.length <= hrefParts.length) {
    return false;
  }

  for (let i = 0; i < hrefParts.length; i += 1) {
    parent = hrefParts[i] === locParts[i];
  }

  return parent;
}

function buildLinkClasses(siteUrl: string, href: string, options: any) {
  let relativeHref = href.replace(siteUrl, "");
  let location = options.data.root.relativeUrl;
  let classes = options.hash.class
    ? options.hash.class.toString().split(" ")
    : [];
  let activeClass = has(options.hash, "activeClass")
    ? options.hash.activeClass
    : "nav-current";
  let parentActiveClass = has(options.hash, "parentActiveClass")
    ? options.hash.parentActiveClass
    : `${activeClass || "nav-current"}-parent`;

  // Calculate dynamic properties
  if (_urlMatch(relativeHref, location) && activeClass) {
    classes.push(activeClass);
  } else if (_urlParentMatch(relativeHref, location) && parentActiveClass) {
    classes.push(parentActiveClass);
  }

  return classes;
}

const localUtils = {
  findKey,
  buildLinkClasses,
};

export default localUtils;
