// # Content Helper
// Usage: `{{content}}`, `{{content words="20"}}`, `{{content characters="256"}}`
//
// Turns content html into a safestring so that the user doesn't have to
// escape it or tell handlebars to leave it alone with a triple-brace.
//
// Shows default or custom CTA when trying to see content without access
//
// Enables tag-safe truncation of content by characters or words.
//
// Dev flag feature: In case of restricted content access for member-only posts, shows CTA box

// @ts-ignore
import downsize from "downsize";
import merge from "lodash/merge";
import isUndefined from "lodash/isUndefined";
import { getRenderer } from "../services/renderer";

function restrictedCta(options: any) {
  const { templates, hbs } = options.data.renderer;
  const createFrame = hbs.handlebars.createFrame;

  options = options || {};
  options.data = options.data || {};

  // @ts-ignore
  const self: any = this;

  merge(self, {
    // @deprecated in Ghost 5.16.1 - not documented & removed from core templates
    accentColor: options.data.site && options.data.site.accent_color,
  });

  const data = createFrame(options.data);
  return templates.execute("content-cta", self, { data });
}

export default function content(options: any = {}) {
  const { SafeString } = getRenderer(options);

  // @ts-ignore
  const self: any = this;

  const hash = options.hash || {};
  const truncateOptions: any = {};
  let runTruncate = false;

  for (const key of ["words", "characters"]) {
    if (Object.prototype.hasOwnProperty.call(hash, key)) {
      runTruncate = true;
      truncateOptions[key] = parseInt(hash[key], 10);
    }
  }

  if (self.html === null) {
    self.html = "";
  }

  if (!isUndefined(self.access) && !self.access) {
    return restrictedCta.apply(self, options);
  }

  if (runTruncate) {
    return new SafeString(downsize(self.html, truncateOptions));
  }

  return new SafeString(self.html);
}
