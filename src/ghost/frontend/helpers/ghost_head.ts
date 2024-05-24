// # Ghost Head Helper
// Usage: `{{ghost_head}}`
//
// Outputs scripts and other assets at the top of a Ghost theme

// BAD REQUIRE
// @TODO fix this require
// import cardAssetService from "../services/card-assets";

import { getRenderer } from "../services/renderer";
import findLastIndex from "lodash/findLastIndex";
import includes from "lodash/includes";

function getMime(url: string) {
  const path = new URL(url).pathname;
  const ext = path.split(".").pop();
  switch (ext) {
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "ico":
      return "image/vnd.microsoft.icon";
    case "jpg":
      return "image/jpeg";
    case "jpeg":
      return "image/jpeg";
  }
  return "";
}

//import templateStyles from "./tpl/styles";
// import {
//   getFrontendAppConfig,
//   getDataAttributes,
// } from "../utils/frontend-apps";

// const {
//   // get: getMetaData,
//   getAssetUrl,
// } = metaData;

// function writeMetaTag(property: string, content: string, type?: string) {
//   type = type || property.substring(0, 7) === "twitter" ? "name" : "property";
//   return "<meta " + type + '="' + property + '" content="' + content + '">';
// }

// function getMembersHelper(data) {
//   // Do not load Portal if both Memberships and Tips & Donations are disabled
//   if (
//     !settingsCache.get("members_enabled") &&
//     !(settingsCache.get("donations_enabled") && labs.isSet("tipsAndDonations"))
//   ) {
//     return "";
//   }

//   const { scriptUrl } = getFrontendAppConfig("portal");

//   const colorString =
//     _.has(data, "site._preview") && data.site.accent_color
//       ? data.site.accent_color
//       : "";
//   const attributes = {
//     i18n: labs.isSet("i18n"),
//     ghost: urlUtils.getSiteUrl(),
//     key: frontendKey,
//     api: urlUtils.urlFor("api", { type: "content" }, true),
//   };
//   if (colorString) {
//     attributes["accent-color"] = colorString;
//   }
//   const dataAttributes = getDataAttributes(attributes);

//   let membersHelper = `<script defer src="${scriptUrl}" ${dataAttributes} crossorigin="anonymous"></script>`;
//   membersHelper += `<style id="gh-members-styles">${templateStyles}</style>`;
//   if (settingsCache.get("paid_members_enabled")) {
//     // disable fraud detection for e2e tests to reduce waiting time
//     const isFraudSignalsEnabled =
//       process.env.NODE_ENV === "testing-browser"
//         ? "?advancedFraudSignals=false"
//         : "";

//     membersHelper += `<script async src="https://js.stripe.com/v3/${isFraudSignalsEnabled}"></script>`;
//   }
//   return membersHelper;
// }

// function getSearchHelper() {
//   const adminUrl = urlUtils.getAdminUrl() || urlUtils.getSiteUrl();
//   const { scriptUrl, stylesUrl } = getFrontendAppConfig("sodoSearch");

//   if (!scriptUrl) {
//     return "";
//   }

//   const attrs = {
//     key: frontendKey,
//     styles: stylesUrl,
//     "sodo-search": adminUrl,
//   };
//   const dataAttrs = getDataAttributes(attrs);
//   let helper = `<script defer src="${scriptUrl}" ${dataAttrs} crossorigin="anonymous"></script>`;

//   return helper;
// }

// function getAnnouncementBarHelper(data) {
//   const preview = data?.site?._preview;
//   const isFilled =
//     settingsCache.get("announcement_content") &&
//     settingsCache.get("announcement_visibility").length;

//   if (!isFilled && !preview) {
//     return "";
//   }

//   const { scriptUrl } = getFrontendAppConfig("announcementBar");
//   const siteUrl = urlUtils.getSiteUrl();
//   const announcementUrl = new URL("members/api/announcement/", siteUrl);
//   const attrs = {
//     "announcement-bar": siteUrl,
//     "api-url": announcementUrl,
//   };

//   if (preview) {
//     const searchParam = new URLSearchParams(preview);
//     const announcement = searchParam.get("announcement");
//     const announcementBackground = searchParam.has("announcement_bg")
//       ? searchParam.get("announcement_bg")
//       : "";
//     const announcementVisibility = searchParam.has("announcement_vis");

//     if (!announcement || !announcementVisibility) {
//       return;
//     }
//     attrs.announcement = escapeExpression(announcement);
//     attrs["announcement-background"] = escapeExpression(announcementBackground);
//     attrs.preview = true;
//   }

//   const dataAttrs = getDataAttributes(attrs);
//   let helper = `<script defer src="${scriptUrl}" ${dataAttrs} crossorigin="anonymous"></script>`;

//   return helper;
// }

// function getWebmentionDiscoveryLink() {
//   try {
//     const siteUrl = urlUtils.getSiteUrl();
//     const webmentionUrl = new URL("webmentions/receive/", siteUrl);
//     return `<link href="${webmentionUrl.href}" rel="webmention">`;
//   } catch (err) {
//     console.warn(err);
//     return "";
//   }
// }

/**
 * **NOTE**
 * Express adds `_locals`, see https://github.com/expressjs/express/blob/4.15.4/lib/response.js#L962.
 * But `options.data.root.context` is available next to `root._locals.context`, because
 * Express creates a `renderOptions` object, see https://github.com/expressjs/express/blob/4.15.4/lib/application.js#L554
 * and merges all locals to the root of the object. Very confusing, because the data is available in different layers.
 *
 * Express forwards the data like this to the hbs engine:
 * {
 *   post: {},             - res.render('view', databaseResponse)
 *   context: ['post'],    - from res.locals
 *   safeVersion: '1.x',   - from res.locals
 *   _locals: {
 *     context: ['post'],
 *     safeVersion: '1.x'
 *   }
 * }
 *
 * hbs forwards the data to any hbs helper like this
 * {
 *   data: {
 *     site: {},
 *     labs: {},
 *     config: {},
 *     root: {
 *       post: {},
 *       context: ['post'],
 *       locals: {...}
 *     }
 *  }
 *
 * `site`, `labs` and `config` are the templateOptions, search for `hbs.updateTemplateOptions` in the code base.
 *  Also see how the root object gets created, https://github.com/wycats/handlebars.js/blob/v4.0.6/lib/handlebars/runtime.js#L259
 */
// We use the name ghost_head to match the helper for consistency:
export default async function ghost_head(options: any) {
  // eslint-disable-line camelcase
  // debug('begin');

  const { escapeExpression, SafeString, urlUtils } = getRenderer(options);

  // FIXME if bad url - get that from root data and don't render the meta
  // if server error page do nothing
  if (options.data.root.statusCode >= 500) {
    return;
  }

  // function finaliseStructuredData(meta: any) {
  //   const head: any[] = [];

  //   _.each(meta.structuredData, function (content, property) {
  //     if (property === "article:tag") {
  //       _.each(meta.keywords, function (keyword) {
  //         if (keyword !== "") {
  //           keyword = escapeExpression(keyword);
  //           head.push(writeMetaTag(property, escapeExpression(keyword)));
  //         }
  //       });
  //       head.push("");
  //     } else if (content !== null && content !== undefined) {
  //       head.push(writeMetaTag(property, escapeExpression(content)));
  //     }
  //   });

  //   return head;
  // }

  console.log("ghost_head", options);
  const head = [];

  const site = options.data.site;
  const dataRoot = options.data.root;
  const context = dataRoot._locals?.context ? dataRoot._locals?.context : null;
  // const safeVersion = dataRoot._locals?.safeVersion;

  //   const globalCodeinjection = settingsCache.get("codeinjection_head");
  //   const useStructuredData = !config.isPrivacyDisabled("useStructuredData");
  //   const referrerPolicy = config.get("referrerPolicy")
  //     ? config.get("referrerPolicy")
  //     : "no-referrer-when-downgrade";
  //   const favicon = blogIcon.getIconUrl();
  //   const iconType = blogIcon.getIconType(favicon);

  // debug('preparation complete, begin fetch');

  try {
    /**
     * @TODO:
     *   - getMetaData(dataRoot, dataRoot) -> yes that looks confusing!
     *   - there is a very mixed usage of `data.context` vs. `root.context` vs `root._locals.context` vs. `this.context`
     *   - NOTE: getMetaData won't live here anymore soon, see https://github.com/TryGhost/Ghost/issues/8995
     *   - therefore we get rid of using `getMetaData(this, dataRoot)`
     *   - dataRoot has access to *ALL* locals, see function description
     *   - it should not break anything
     */
    // const meta = await getMetaData(dataRoot, dataRoot);
    // const frontendKey = await getFrontendKey();

    // site id for pwa code to function and for crawlers to see
    head.push(`<meta property="nostr:site" content="${site.id}" >`);

    // manifest
    head.push(`<link rel="manifest" href="/manifest.webmanifest"></head>`);

    // jquery is assumed by many themes
    head.push(`
    <script 
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous">
    </script>
  `);

    // debug('end fetch');
    if (site.icon) {
      head.push(
        `<link rel="icon" href="${site.icon}" type="${getMime(site.icon)}">
         <link rel="apple-touch-icon" href="${site.icon}">
         <meta name="theme-color" content="#ffffff">
         `
      );
    }

    const pagination = dataRoot.pagination;
    const paginationUrl = (next: boolean) => {
      return urlUtils.createUrl(`/page/${pagination.page + (next ? 1 : -1)}`);
    }
    if (pagination.prev) {
      head.push(
        '<link rel="prev" href="' + escapeExpression(paginationUrl(false)) + '">'
      );
    }
    if (pagination.next) {
      head.push(
        '<link rel="next" href="' + escapeExpression(paginationUrl(true)) + '">'
      );
    }

    if (context) {
      // head is our main array that holds our meta data
      //   if (meta.metaDescription && meta.metaDescription.length > 0) {
      //     head.push(
      //       '<meta name="description" content="' +
      //         escapeExpression(meta.metaDescription) +
      //         '">'
      //     );
      //   }
      // no output in head if a publication icon is not set
      //   if (settingsCache.get("icon")) {
      //     head.push(
      //       '<link rel="icon" href="' +
      //         favicon +
      //         '" type="image/' +
      //         iconType +
      //         '">'
      //     );
      //   }
      //   head.push(
      //     '<link rel="canonical" href="' +
      //       escapeExpression(meta.canonicalUrl) +
      //       '">'
      //   );
      //   if (_.includes(context, "preview")) {
      //     head.push(writeMetaTag("robots", "noindex,nofollow", "name"));
      //     head.push(writeMetaTag("referrer", "same-origin", "name"));
      //   } else {
      //     head.push(writeMetaTag("referrer", referrerPolicy, "name"));
      //   }
      // show amp link in post when 1. we are not on the amp page and 2. amp is enabled
      //   if (
      //     _.includes(context, "post") &&
      //     !_.includes(context, "amp") &&
      //     settingsCache.get("amp")
      //   ) {
      //     head.push(
      //       '<link rel="amphtml" href="' + escapeExpression(meta.ampUrl) + '">'
      //     );
      //   }
      //   if (meta.previousUrl) {
      //     head.push(
      //       '<link rel="prev" href="' + escapeExpression(meta.previousUrl) + '">'
      //     );
      //   }
      //   if (meta.nextUrl) {
      //     head.push(
      //       '<link rel="next" href="' + escapeExpression(meta.nextUrl) + '">'
      //     );
      //   }
      //   if (!_.includes(context, "paged") && useStructuredData) {
      //     head.push("");
      //     head.push.apply(head, finaliseStructuredData(meta));
      //     head.push("");
      //     if (meta.schema) {
      //       head.push(
      //         '<script type="application/ld+json">\n' +
      //           JSON.stringify(meta.schema, null, "    ") +
      //           "\n    </script>\n"
      //       );
      //     }
      //   }
    }

    // head.push(
    //   '<meta name="generator" content="Ghost ' +
    //     escapeExpression(safeVersion) +
    //     '">'
    // );

    // head.push(
    //   '<link rel="alternate" type="application/rss+xml" title="' +
    //     escapeExpression(meta.site.title) +
    //     '" href="' +
    //     escapeExpression(meta.rssUrl) +
    //     '">'
    // );

    // no code injection for amp context!!!
    if (!includes(context, "amp")) {
      //   head.push(getMembersHelper(options.data, frontendKey));
      //   head.push(getSearchHelper(frontendKey));
      //   head.push(getAnnouncementBarHelper(options.data));
      //   try {
      //     head.push(getWebmentionDiscoveryLink());
      //   } catch (err) {
      //     console.warn(err);
      //   }
      // @TODO do this in a more "frameworky" way
      //   if (cardAssetService.hasFile("js")) {
      //     head.push(
      //       `<script defer src="${getAssetUrl("public/cards.min.js")}"></script>`
      //     );
      //   }
      //   if (cardAssetService.hasFile("css")) {
      //     head.push(
      //       `<link rel="stylesheet" type="text/css" href="${getAssetUrl(
      //         "public/cards.min.css"
      //       )}">`
      //     );
      //   }
      //   if (settingsCache.get("comments_enabled") !== "off") {
      //     head.push(
      //       `<script defer src="${getAssetUrl(
      //         "public/comment-counts.min.js"
      //       )}" data-ghost-comments-counts-api="${urlUtils.getSiteUrl(
      //         true
      //       )}members/api/comments/counts/"></script>`
      //     );
      //   }
      //   if (
      //     settingsCache.get("members_enabled") &&
      //     settingsCache.get("members_track_sources")
      //   ) {
      //     head.push(
      //       `<script defer src="${getAssetUrl(
      //         "public/member-attribution.min.js"
      //       )}"></script>`
      //     );
      //   }
    }

    // AMP template has style injected directly because there can only be one <style amp-custom> tag
    if (options.data.site.accent_color && !includes(context, "amp")) {
      const accentColor = escapeExpression(options.data.site.accent_color);
      const styleTag = `<style>:root {--ghost-accent-color: ${accentColor};}</style>`;
      const existingScriptIndex = findLastIndex(
        head,
        (str) => !!str.match(/<\/(style|script)>/)
      );

      if (existingScriptIndex !== -1) {
        head[existingScriptIndex] = head[existingScriptIndex] + styleTag;
      } else {
        head.push(styleTag);
      }
    }

    // debug('end');
    return new SafeString(head.join("\n    ").trim());
  } catch (error) {
    console.error(error);

    // Return what we have so far (currently nothing)
    return new SafeString(head.join("\n    ").trim());
  }
}

ghost_head.async = true;
