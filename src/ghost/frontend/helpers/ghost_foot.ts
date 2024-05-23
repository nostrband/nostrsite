// # Ghost Foot Helper
// Usage: `{{ghost_foot}}`
//
// Outputs scripts and other assets at the bottom of a Ghost theme
import _ from "lodash";
import { getRenderer } from "../services/renderer";
import { PWA_CODE } from "../../../pwa-code";

// We use the name ghost_foot to match the helper for consistency:
export default function ghost_foot(options: any) {
  const { SafeString } = getRenderer(options);

  // eslint-disable-line camelcase
  const foot: string[] = [];

  // const globalCodeinjection = settingsCache.get("codeinjection_foot");
  // const postCodeinjection =
  //   options.data.root && options.data.root.post
  //     ? options.data.root.post.codeinjection_foot
  //     : null;
  // const tagCodeinjection =
  //   options.data.root && options.data.root.tag
  //     ? options.data.root.tag.codeinjection_foot
  //     : null;

  // if (!_.isEmpty(globalCodeinjection)) {
  //   foot.push(globalCodeinjection);
  // }

  // if (!_.isEmpty(postCodeinjection)) {
  //   foot.push(postCodeinjection);
  // }

  // if (!_.isEmpty(tagCodeinjection)) {
  //   foot.push(tagCodeinjection);
  // }

  foot.push(PWA_CODE);

  return new SafeString(foot.join(" ").trim());
};
