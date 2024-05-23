import { NostrSiteEngine } from "../nostr-site-engine";
import errors, { utils } from "@tryghost/errors";

import get from "../../ghost/frontend/helpers/get";
import asset from "../../ghost/frontend/helpers/asset";
import match from "../../ghost/frontend/helpers/match";
import is from "../../ghost/frontend/helpers/is";
import foreach from "../../ghost/frontend/helpers/foreach";
import date from "../../ghost/frontend/helpers/date";
import img_url from "../../ghost/frontend/helpers/img_url";
import ghost_head from "../../ghost/frontend/helpers/ghost_head";
import ghost_foot from "../../ghost/frontend/helpers/ghost_foot";
import navigation from "../../ghost/frontend/helpers/navigation";
import concat from "../../ghost/frontend/helpers/concat";
import url from "../../ghost/frontend/helpers/url";
import link_class from "../../ghost/frontend/helpers/link_class";
import post_class from "../../ghost/frontend/helpers/post_class";
import content from "../../ghost/frontend/helpers/content";
import reading_time from "../../ghost/frontend/helpers/reading_time";
import excerpt from "../../ghost/frontend/helpers/excerpt";
import recommendations from "../../ghost/frontend/helpers/recommendations";
import readable_url from "../../ghost/frontend/helpers/readable_url";
import body_class from "../../ghost/frontend/helpers/body_class";
import authors from "../../ghost/frontend/helpers/authors";
import plural from "../../ghost/frontend/helpers/plural";
import meta_title from "../../ghost/frontend/helpers/meta_title";
import meta_description from "../../ghost/frontend/helpers/meta_description";

function registerAsyncHelper(hbs: any, name: string, fn: any) {
  hbs.registerAsyncHelper(
    name,
    async function returnAsync(context: any, options: any, cb: any) {
      // Handle the case where we only get context and cb
      if (!cb) {
        cb = options;
        options = undefined;
      }

      // @ts-ignore
      const self = this;
      try {
        const response = await fn.call(self, context, options);
        cb(response);
      } catch (error: any) {
        const wrappedErr = utils.isGhostError(error)
          ? error
          : new errors.IncorrectUsageError({
              err: error,
              context: "registerAsyncThemeHelper: " + name,
              errorDetails: {
                originalError: error,
              },
            });

        const response =
          process.env.NODE_ENV === "development" ? wrappedErr : "";

        console.log("error", wrappedErr);

        cb(new hbs.SafeString(response));
      }
    }
  );
}

function registerHelper(hbs: any, name: string, helperFn: any) {
  if (helperFn.async) {
    registerAsyncHelper(hbs, name, helperFn);
  } else {
    hbs.registerHelper(name, helperFn);
  }  
}

// Initialise Ghost's own helpers
// This is a weird place for this to live!
export const initHelpers = (hbs: NostrSiteEngine) => {
  registerHelper(hbs, "get", get);
  registerHelper(hbs, "asset", asset);
  registerHelper(hbs, "match", match);
  registerHelper(hbs, "is", is);
  registerHelper(hbs, "foreach", foreach);
  registerHelper(hbs, "date", date);
  registerHelper(hbs, "img_url", img_url);
  registerHelper(hbs, "ghost_head", ghost_head);
  registerHelper(hbs, "ghost_foot", ghost_foot);
  registerHelper(hbs, "navigation", navigation);
  registerHelper(hbs, "concat", concat);
  registerHelper(hbs, "url", url);
  registerHelper(hbs, "link_class", link_class);
  registerHelper(hbs, "post_class", post_class);
  registerHelper(hbs, "content", content);
  registerHelper(hbs, "reading_time", reading_time);
  registerHelper(hbs, "excerpt", excerpt);
  registerHelper(hbs, "recommendations", recommendations);
  registerHelper(hbs, "readable_url", readable_url);
  registerHelper(hbs, "body_class", body_class);
  registerHelper(hbs, "authors", authors);
  registerHelper(hbs, "plural", plural);
  registerHelper(hbs, "meta_title", meta_title);
  registerHelper(hbs, "meta_description", meta_description);
};
