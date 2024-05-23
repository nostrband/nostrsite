// # Body Class Helper
// Usage: `{{body_class}}`
//
// Output classes for the body element
import { getRenderer } from "../services/renderer";

// We use the name body_class to match the helper for consistency
export default function body_class(options: any) {
  // eslint-disable-line camelcase

  const { SafeString } = getRenderer(options);

  // @ts-ignore
  const self: any = this;

  let classes = [];
  const context = options.data.root.context || [];
  const obj = self.post || self.page;
  const tags = obj && obj.tags ? obj.tags : [];
  const isPage = !!self.page;

  if (context.includes("home")) {
    classes.push("home-template");
  } else if (context.includes("post") && obj && !isPage) {
    classes.push("post-template");
  } else if (context.includes("page") && obj && isPage) {
    classes.push("page-template");
    classes.push(`page-${obj.slug}`);
  } else if (context.includes("tag") && self.tag) {
    classes.push("tag-template");
    classes.push(`tag-${self.tag.slug}`);
  } else if (context.includes("author") && self.author) {
    classes.push("author-template");
    classes.push(`author-${self.author.slug}`);
  } else if (context.includes("private")) {
    classes.push("private-template");
  }

  if (tags) {
    classes = classes.concat(tags.map(({ slug }: any) => `tag-${slug}`));
  }

  if (context.includes("paged")) {
    classes.push("paged");
  }

  const allClasses = classes.join(" ").trim();

  return new SafeString(allClasses);
}
