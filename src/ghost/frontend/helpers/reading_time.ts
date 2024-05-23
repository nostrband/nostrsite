// # Reading Time Helper
//
// Usage:  `{{reading_time}}`
// or for translatable themes, with (t) translation helper's subexpressions:
// `{{reading_time seconds=(t "< 1 min read") minute=(t "1 min read") minutes=(t "% min read")}}`
// and in the theme translation file, for example Spanish es.json:
// "< 1 min read": "< 1 min de lectura",
// "1 min read": "1 min de lectura",
// "% min read": "% min de lectura",
//
// Returns estimated reading time for post

import { isPost } from "../utils/checks";

// @ts-ignore
import { readingTime as calculateReadingTime } from "@tryghost/helpers";
import { getRenderer } from "../services/renderer";

export default function reading_time(options: any) {
  const { SafeString } = getRenderer(options);

  options = options || {};
  options.hash = options.hash || {};

  // @ts-ignore
  const self: any = this;

  // only calculate reading time for posts
  if (!isPost(self)) {
    return null;
  }

  let readingTime = calculateReadingTime(self, options.hash);

  return new SafeString(readingTime);
}
