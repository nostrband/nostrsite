// # Has Helper
// Usage: `{{#has tag="video, music"}}`, `{{#has author="sam, pat"}}`
//        `{{#has author="count:1"}}`, `{{#has tag="count:>1"}}`
//
// Checks if a post has a particular property

// @ts-ignore
import tpl from "@tryghost/tpl";
import ldHas from "lodash/has";
import filter from "lodash/filter"
import findIndex from "lodash/findIndex";
import get from "lodash/get";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import pick from "lodash/pick";
import some from "lodash/some";


const validAttrs = [
  "tag",
  "author",
  "slug",
  "visibility",
  "id",
  "number",
  "index",
  "any",
  "all",
];

const messages = {
  invalidAttribute: "Invalid or no attribute given to has helper",
};

function handleCount(ctxAttr: string, data: any[]) {
  if (!data || !isFinite(data.length)) {
    return false;
  }
  let count;

  if (ctxAttr.match(/count:\d+/)) {
    count = Number(ctxAttr.match(/count:(\d+)/)?.[1]);
    return count === data.length;
  } else if (ctxAttr.match(/count:>\d/)) {
    count = Number(ctxAttr.match(/count:>(\d+)/)?.[1]);
    return count < data.length;
  } else if (ctxAttr.match(/count:<\d/)) {
    count = Number(ctxAttr.match(/count:<(\d+)/)?.[1]);
    return count > data.length;
  }

  return false;
}

function evaluateTagList(expr: string, tags: string[]) {
  return expr
    .split(",")
    .map(function (v) {
      return v.trim();
    })
    .reduce(function (p, c) {
      return (
        p ||
        findIndex(tags, function (item: string) {
          // Escape regex special characters
          item = item.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
          const rx = new RegExp("^" + item + "$", "i");
          return rx.test(c);
        }) !== -1
      );
    }, false);
}

function handleTag(data: any, attrs: any) {
  if (!attrs.tag) {
    return false;
  }

  if (attrs.tag.match(/count:/)) {
    return handleCount(attrs.tag, data.tags);
  }

  return evaluateTagList(attrs.tag, map(data.tags, "name")) || false;
}

function evaluateAuthorList(expr: string, authors: any) {
  const authorList = expr.split(",").map(function (v) {
    return v.trim().toLocaleLowerCase();
  });

  return filter(authors, (author) => {
    return includes(authorList, author.name.toLocaleLowerCase());
  }).length;
}

function handleAuthor(data: any, attrs: any) {
  if (!attrs.author) {
    return false;
  }

  if (attrs.author.match(/count:/)) {
    return handleCount(attrs.author, data.authors);
  }

  return evaluateAuthorList(attrs.author, data.authors) || false;
}

function evaluateIntegerMatch(expr: string, integer: number) {
  const nthMatch = expr.match(/^nth:(\d+)/);
  if (nthMatch) {
    return integer % parseInt(nthMatch[1], 10) === 0;
  }

  return expr.split(",").reduce(function (bool, _integer) {
    return bool || parseInt(_integer, 10) === integer;
  }, false);
}

function evaluateStringMatch(expr: string, str: string, ci: boolean) {
  if (ci) {
    return expr && str && expr.toLocaleLowerCase() === str.toLocaleLowerCase();
  }

  return expr === str;
}

/**
 *
 * @param {String} type - either some or every - the lodash function to use
 * @param {String} expr - the attribute value passed into {{#has}}
 * @param {Object} obj - "this" context from the helper
 * @param {Object} data - global params
 */
function evaluateList(type: string, expr: string, obj: any, data: any) {
  return (
    expr
      .split(",")
      .map(function (prop) {
        return prop.trim().toLocaleLowerCase();
      })
      // this is some lodash trickery
      // @ts-ignore
      [type](function (prop) {
        if (prop.match(/^@/)) {
          return (
            ldHas(data, prop.replace(/@/, "")) &&
            !isEmpty(get(data, prop.replace(/@/, "")))
          );
        } else {
          return ldHas(obj, prop) && !isEmpty(get(obj, prop));
        }
      })
  );
}

export default function has(options: any) {
  options = options || {};
  options.hash = options.hash || {};
  options.data = options.data || {};

  // @ts-ignore
  const self: any = this;
  const attrs = pick(options.hash, validAttrs);
  const data = pick(options.data, ["site", "config", "labs"]);

  const checks: any = {
    tag: function () {
      return handleTag(self, attrs);
    },
    author: function () {
      return handleAuthor(self, attrs);
    },
    number: function () {
      return (
        (attrs.number &&
          evaluateIntegerMatch(attrs.number, options.data.number)) ||
        false
      );
    },
    index: function () {
      return (
        (attrs.index &&
          evaluateIntegerMatch(attrs.index, options.data.index)) ||
        false
      );
    },
    visibility: function () {
      return (
        (attrs.visibility &&
          evaluateStringMatch(attrs.visibility, self.visibility, true)) ||
        false
      );
    },
    slug: function () {
      return (
        (attrs.slug && evaluateStringMatch(attrs.slug, self.slug, true)) ||
        false
      );
    },
    id: function () {
      return (
        (attrs.id && evaluateStringMatch(attrs.id, self.id, true)) || false
      );
    },
    any: function () {
      return (
        (attrs.any && evaluateList("some", attrs.any, self, data)) || false
      );
    },
    all: function () {
      return (
        (attrs.all && evaluateList("every", attrs.all, self, data)) || false
      );
    },
  };

  let result;

  if (isEmpty(attrs)) {
    console.warn(tpl(messages.invalidAttribute));
    return;
  }

  result = some(attrs, function (_, attr) {
    return checks[attr]();
  });

  if (result) {
    return options.fn(self);
  }

  return options.inverse(self);
}
