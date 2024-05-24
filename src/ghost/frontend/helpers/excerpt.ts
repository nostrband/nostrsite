// # Excerpt Helper
// Usage: `{{excerpt}}`, `{{excerpt words="50"}}`, `{{excerpt characters="256"}}`
//
// Attempts to remove all HTML from the string, and then shortens the result according to the provided option.
//
// Defaults to words="50"

import escape from "lodash/escape";
import { getRenderer } from "../services/renderer";
import reduce from "lodash/reduce";
import isEmpty from "lodash/isEmpty";

export default function excerpt(options: any) {
  const { SafeString, metaData } = getRenderer(options);
 const getMetaDataExcerpt = metaData.getMetaDataExcerpt;

  let truncateOptions: any = (options || {}).hash || {};

  let excerptText;

  // @ts-ignore
  const self: any = this;

  if (self.custom_excerpt) {
    excerptText = String(self.custom_excerpt);
  } else if (self.excerpt) {
    excerptText = String(self.excerpt);
  } else {
    excerptText = "";
  }

  excerptText = escape(excerptText);

  truncateOptions = reduce(
    truncateOptions,
    (_truncateOptions: any, value, key) => {
      if (["words", "characters"].includes(key)) {
        _truncateOptions[key] = parseInt(value, 10);
      }
      return _truncateOptions;
    },
    {}
  );

  // For custom excerpts, make sure we truncate them only based on length
  if (!isEmpty(self.custom_excerpt)) {
    truncateOptions.characters = excerptText.length; // length is expanded by use of escaped characters
    if (truncateOptions.words) {
      delete truncateOptions.words;
    }
  }

  return new SafeString(getMetaDataExcerpt(excerptText, truncateOptions));
}
