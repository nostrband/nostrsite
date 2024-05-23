// # Foreach Helper
// Usage: `{{#foreach data}}{{/foreach}}`
//
// Block helper designed for looping through posts

import _ from "lodash";
// @ts-ignore
import tpl from "@tryghost/tpl";
// @ts-ignore
import { filter } from "./utils/visibility";
import { getRenderer } from "../services/renderer";
import { isNewsletter, isPost } from "../utils/checks";

const messages = {
  iteratorNeeded: "Need to pass an iterator to {{#foreach}}",
};

export default function foreach(items: any, options: any) {
  if (!options) {
    console.warn(tpl(messages.iteratorNeeded));
  }

  const { hbs } = getRenderer(options || items);
  const {
    Utils: hbsUtils,
    handlebars: { createFrame },
  } = hbs;
  
  // @ts-ignore
  const self: any = this;

  if (hbsUtils.isFunction(items)) {
    items = items.call(self);
  }
  let visibility = options.hash.visibility;
  if (_.isArray(items) && items.length > 0 && isPost(items[0])) {
    visibility = visibility || "all";
  } else if (_.isObject(items) && _.isArray(Object.values(items))) {
    if (
      Object.values(items).length > 0 &&
      isPost(Object.values(items)[0])
    ) {
      visibility = visibility || "all";
    }
  }

  if (_.isArray(items) && items.length > 0 && isNewsletter(items[0])) {
    visibility = visibility || "all";
  } else if (_.isObject(items) && _.isArray(Object.values(items))) {
    if (
      Object.values(items).length > 0 &&
      isNewsletter(Object.values(items)[0])
    ) {
      visibility = visibility || "all";
    }
  }
  // Exclude items which should not be visible in the theme
  items = filter(items, visibility);

  // Initial values set based on parameters sent through. If nothing sent, set to defaults
  const { fn, inverse, hash, data, ids } = options;
  let { columns, limit, from, to } = hash;
  let length = _.size(items);
  let output = "";
  let frame: any;
  let contextPath: any;

  limit = parseInt(limit, 10) || length;
  from = parseInt(from, 10) || 1;
  to = parseInt(to, 10) || length;

  // If a limit option was sent through (aka not equal to default (length))
  // and from plus limit is less than the length, set to to the from + limit
  if (limit < length && from + limit <= length) {
    to = from - 1 + limit;
  }

  if (data && ids) {
    contextPath = hbsUtils.appendContextPath(data.contextPath, ids[0]) + ".";
  }

  if (data) {
    frame = createFrame(data);
  }

  function execIteration(field: string, index: number, last: boolean) {
    if (frame) {
      frame.key = field;
      frame.index = index;
      frame.number = index + 1;
      frame.first = index === from - 1; // From uses 1-indexed, but array uses 0-indexed
      frame.last = !!last;
      frame.even = index % 2 === 1;
      frame.odd = !frame.even;
      frame.rowStart = index % columns === 0;
      frame.rowEnd = index % columns === columns - 1;
      if (contextPath) {
        frame.contextPath = contextPath + field;
      }
    }

    output =
      output +
      fn(items[field], {
        data: frame,
        blockParams: hbsUtils.blockParams(
          [items[field], field],
          [contextPath + field, null]
        ),
      });
  }

  function iterateCollection(context: any) {
    // Context is all posts on the blog
    let current = 1;

    // For each post, if it is a post number that fits within the from and to
    // send the key to execIteration to set to be added to the page
    _.each(context, (_, key) => {
      if (current < from) {
        current += 1;
        return;
      }

      if (current <= to) {
        execIteration(key, current - 1, current === to);
      }

      current += 1;
    });
  }

  if (items && typeof items === "object") {
    iterateCollection(items);
  }

  if (length === 0) {
    output = inverse(self);
  }

  return output;
}
