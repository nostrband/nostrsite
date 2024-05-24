// # link_class helper

import errors from "@tryghost/errors";
// @ts-ignore
import tpl from "@tryghost/tpl";

import { getRenderer } from "../services/renderer";
import has from "lodash/has";

const messages = {
  forIsRequired: 'The {{link_class}} helper requires a for="" attribute.',
};

export default function link_class(options: any) {
  const { SafeString, localUtils, config } = getRenderer(options);
  const { buildLinkClasses } = localUtils;

  // eslint-disable-line camelcase
  options = options || {};
  options.hash = options.hash || {};
  options.data = options.data || {};

  // If there is no for provided, this is theme dev error, so we throw an error to make this clear.
  if (!has(options.hash, "for")) {
    throw new errors.IncorrectUsageError({
      message: tpl(messages.forIsRequired),
    });
  }

  // If the for attribute is present but empty, this is probably a dynamic data problem, hard for theme devs to track down
  // E.g. {{link_class for=slug}} in a context where slug returns an empty string
  // Error's here aren't useful (same as with empty get helper filters) so we fallback gracefully
  if (!options.hash.for || options.hash.for.string === "") {
    options.hash.for = "";
  }

  let href = options.hash.for.string || options.hash.for;
  let classes = buildLinkClasses(config.get("url"), href, options);

  return new SafeString(classes.join(" "));
}
