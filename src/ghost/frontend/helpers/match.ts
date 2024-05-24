// @ts-ignore
import tpl from "@tryghost/tpl";

import { getRenderer } from "../services/renderer";
import has from "lodash/has";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";

const messages = {
  invalidAttribute: "Invalid or no attribute given to match helper",
};

/**
 * This is identical to the built-in if helper, except inverse/fn calls are replaced with false/true
 * https://github.com/handlebars-lang/handlebars.js/blob/19bdace85a8d0bc5ed3a4dec4071cb08c8d003f2/lib/handlebars/helpers/if.js#L9-L20
 */
function isEmptyValue(value: any) {
  if (!value && value !== 0) {
    return true;
  } else if (Array.isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

const handleConditional = (conditional: any, options: any) => {
  if (isFunction(conditional)) {
    conditional = conditional.call(this);
  }

  // Default behavior is to render the positive path if the value is truthy and not empty.
  // The `includeZero` option may be set to treat the condtional as purely not empty based on the
  // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
  if (
    (!options.hash.includeZero && !conditional) ||
    isEmptyValue(conditional)
  ) {
    return false;
  } else {
    return true;
  }
};

const handleMatch = (data: any, operator: string, value: any) => {
  let result;

  switch (operator) {
    case "!=":
      result = data !== value;
      break;
    case "<":
      result = data < value;
      break;
    case ">":
      result = data > value;
      break;
    case ">=":
      result = data >= value;
      break;
    case "<=":
      result = data <= value;
      break;
    default:
      result = data === value;
  }

  return result;
};

export default function match(...attrs: any[]) {
  // options = options || {};
  // options.hash = options.hash || {};
  // options.data = options.data || {};

  const options = attrs.pop();

  const { SafeString } = getRenderer(options);

  const isBlock = has(options, "fn");
  let result;

  if (isEmpty(attrs)) {
    console.warn(tpl(messages.invalidAttribute));
    return;
  }

  // If any of the attributes are safe strings, change them back to their original value
  attrs = attrs.map((attr) => {
    if (attr instanceof SafeString) {
      return attr.string;
    }

    return attr;
  });
console.log("match", { options, attrs })
  if (attrs.length === 1) {
    // CASE: single attribute, treat it as simple true/false (like the if helper)
    result = handleConditional(attrs[0], options);
  } else if (attrs.length === 2) {
    // CASE: two attributes, assume the operator is "="
    result = handleMatch(attrs[0], "=", attrs[1]);
  } else if (attrs.length === 3) {
    // CASE: three attributes, handle the match exactly
    result = handleMatch(attrs[0], attrs[1], attrs[2]);
  } else {
    console.warn(tpl(messages.invalidAttribute));
    return;
  }

  // @ts-ignore
  const self: any = this;

  // If we're in block mode, return the outcome from the fn/inverse functions
  if (isBlock) {
    if (result) {
      return options.fn(self);
    }

    return options.inverse(self);
  }

  // Else return the result as a SafeString Eg.{string: false} || {string: true}
  return new SafeString(result);
};
