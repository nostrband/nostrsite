// # URL helper
// Usage: `{{url}}`, `{{url absolute="true"}}`
//
// Returns the URL for the current object scope i.e. If inside a post scope will return post permalink
// `absolute` flag outputs absolute URL, else URL is relative

import errors from "@tryghost/errors";
import { getRenderer } from "../services/renderer";

export default function url(options: any) {
  const { metaData, SafeString } = getRenderer(options);
  const { getMetaDataUrl } = metaData;

  // @ts-ignore
  const self: any = this;

  const absolute =
    options && options.hash.absolute && options.hash.absolute !== "false";
  let outputUrl = getMetaDataUrl(self, absolute);

  try {
    outputUrl = encodeURI(decodeURI(outputUrl))
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]");
  } catch (err: any) {
    // Happens when the outputURL contains an invalid URI character like "%%" or "%80"

    // Send the error not to be blind to these
    const error = new errors.IncorrectUsageError({
      message: `The url "${outputUrl}" couldn't be escaped correctly`,
      err: err,
    });
    console.error(error);

    return new SafeString("");
  }

  return new SafeString(outputUrl);
}
