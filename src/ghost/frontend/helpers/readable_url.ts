// # Readable URL helper
// Usage: `{{readable_url "https://google.com"}}`
//
// Returns a human readable URL for the given URL, e.g. google.com for https://www.google.com?query=1#section

import errors from "@tryghost/errors";
import { getRenderer } from "../services/renderer";

function captureError(message: string) {
  const error = new errors.IncorrectUsageError({ message });
  console.error(error);
}

export default function readable_url(inputUrl: any, options: any) {
  const { SafeString } = getRenderer(options);

  if (!inputUrl || typeof inputUrl !== "string") {
    captureError(`Expected a string, received ${inputUrl}.`);
    return new SafeString("");
  }

  try {
    const url = new URL(inputUrl);
    const readable =
      url.hostname.replace(/^www\./, "") + url.pathname.replace(/\/$/, "");

    return new SafeString(readable);
  } catch (e) {
    captureError(`The string "${inputUrl}" could not be parsed as URL.`);
    return new SafeString(inputUrl);
  }
}
