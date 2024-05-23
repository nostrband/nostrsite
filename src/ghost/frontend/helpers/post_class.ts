// # Post Class Helper
// Usage: `{{post_class}}`
//
// Output classes for the body element

import { getRenderer } from "../services/renderer";

// We use the name post_class to match the helper for consistency:
export default function post_class(options: any) {
  const { SafeString } = getRenderer(options);

  // @ts-ignore
  const self: any = this;

  // eslint-disable-line camelcase
  let classes = ["post"];

  const tags = self.post && self.post.tags ? self.post.tags : self.tags || [];
  const featured =
    self.post && self.post.featured
      ? self.post.featured
      : self.featured || false;
  const image =
    self.post && self.post.feature_image
      ? self.post.feature_image
      : self.feature_image || false;
  const page =
    self.post && self.post.page ? self.post.page : self.page || false;

  if (tags) {
    classes = classes.concat(
      tags.map(function (tag: any) {
        return "tag-" + tag.slug;
      })
    );
  }

  if (featured) {
    classes.push("featured");
  }

  if (!image) {
    classes.push("no-image");
  }

  if (page) {
    classes.push("page");
  }

  const allClasses = classes.reduce(function (memo, item) {
    return memo + " " + item;
  }, "");

  return new SafeString(allClasses.trim());
}
