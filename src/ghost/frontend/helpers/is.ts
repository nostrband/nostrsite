// # Is Helper
// Usage: `{{#is "paged"}}`, `{{#is "index, paged"}}`
// Checks whether we're in a given context.

// @ts-ignore
import tpl from "@tryghost/tpl";
import _ from "lodash";

const messages = {
  invalidAttribute: "Invalid or no attribute given to is helper",
};

export default function is(context: string, options: any) {
  options = options || {};

  const currentContext = options.data.root.context;

  if (!_.isString(context)) {
    console.warn(tpl(messages.invalidAttribute));
    return;
  }

  function evaluateContext(expr: string) {
    return expr
      .split(",")
      .map(function (v) {
        return v.trim();
      })
      .reduce(function (p, c) {
        return p || _.includes(currentContext, c);
      }, false);
  }

  // @ts-ignore
  const self: any = this;

  if (evaluateContext(context)) {
    return options.fn(self);
  }
  return options.inverse(self);
}
