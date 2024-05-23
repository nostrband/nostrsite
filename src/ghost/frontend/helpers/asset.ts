// # Asset helper
// Usage: `{{asset "css/screen.css"}}`
//
// Returns the path to the specified asset.

import errors from "@tryghost/errors";
// @ts-ignore
import tpl from "@tryghost/tpl";
import get from "lodash/get";
import { getRenderer } from "../services/renderer";

const messages = {
  pathIsRequired: "The {{asset}} helper must be passed a path",
};

export default function asset(path: string, options: any) {
  const { urlUtils, metaData, SafeString } = getRenderer(options);
  const { getAssetUrl } = metaData;

  const hasMinFile = get(options, "hash.hasMinFile");

  if (!path) {
    throw new errors.IncorrectUsageError({
      message: tpl(messages.pathIsRequired),
    });
  }
  if (
    typeof urlUtils.getSiteUrl() !== "undefined" &&
    typeof urlUtils.getAdminUrl() !== "undefined" &&
    urlUtils.getSiteUrl() !== urlUtils.getAdminUrl()
  ) {
    const target = new URL(
      getAssetUrl(path, hasMinFile),
      urlUtils.getSiteUrl()
    );
    return new SafeString(target.href);
  }

  return new SafeString(getAssetUrl(path, hasMinFile));
}
