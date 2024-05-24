// ### Navigation Helper
// `{{navigation}}`
// Outputs navigation menu of static urls

import errors from "@tryghost/errors";
// @ts-ignore
import tpl from "@tryghost/tpl";
// @ts-ignore
import { slugify } from "@tryghost/string";
import { getRenderer } from "../services/renderer";
import { templates } from "../services/theme-engine/handlebars/template";
import isFunction from "lodash/isFunction";
import isNull from "lodash/isNull";
import isObject from "lodash/isObject";
import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined";
import merge from "lodash/merge";

const messages = {
  invalidData: "navigation data is not an object or is a function",
  valuesMustBeDefined: "All values must be defined for label, url and current",
  valuesMustBeString: "Invalid value, Url and Label must be strings",
};

export default function navigation(options: any) {
  const { SafeString, hbs } = getRenderer(options);
  const createFrame = hbs.handlebars.createFrame;

  options = options || {};
  options.hash = options.hash || {};
  options.data = options.data || {};

  const key =
    options.hash.type && options.hash.type === "secondary"
      ? "secondary_navigation"
      : "navigation";
  // Set isSecondary so we can compare in the template
  options.hash.isSecondary = !!(
    options.hash.type && options.hash.type === "secondary"
  );
  // Remove type, so it's not accessible
  delete options.hash.type;

  const navigationData: any[] = options.data.site[key];
  const currentUrl = options.data.root.relativeUrl;
  let output;

  if (!isObject(navigationData) || isFunction(navigationData)) {
    throw new errors.IncorrectUsageError({
      message: tpl(messages.invalidData),
    });
  }

  if (
    navigationData.filter(function (e) {
      return isUndefined(e.label) || isUndefined(e.url);
    }).length > 0
  ) {
    throw new errors.IncorrectUsageError({
      message: tpl(messages.valuesMustBeDefined),
    });
  }

  // check for non-null string values
  if (
    navigationData.filter(function (e) {
      return (
        (!isNull(e.label) && !isString(e.label)) ||
        (!isNull(e.url) && !isString(e.url))
      );
    }).length > 0
  ) {
    throw new errors.IncorrectUsageError({
      message: tpl(messages.valuesMustBeString),
    });
  }

  // strips trailing slashes and compares urls
  function _isCurrentUrl(href: string, url: string) {
    if (!url) {
      return false;
    }

    const strippedHref = href.replace(/\/+$/, "");
    const strippedCurrentUrl = url.replace(/\/+$/, "");
    return strippedHref === strippedCurrentUrl;
  }

  // {{navigation}} should no-op if no data passed in
  if (navigationData.length === 0) {
    return new SafeString("");
  }

  output = navigationData.map(function (e) {
    const out: any = {};
    out.current = _isCurrentUrl(e.url, currentUrl);
    out.label = e.label;
    out.slug = slugify(e.label);
    out.url = e.url;
    return out;
  });

  // @ts-ignore
  const self: any = this;

  // CASE: The navigation helper should have access to the navigation items at the top level.
  self.navigation = output;
  // CASE: The navigation helper will forward attributes passed to it.
  merge(self, options.hash);
  const data = createFrame(options.data);

  console.log("navigation data", { data, options });
  return templates.execute("navigation", self, { data }, hbs);
}
