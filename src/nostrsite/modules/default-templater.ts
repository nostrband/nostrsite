import { Theme } from "../types/theme";
import { Context } from "../types/context";
import { Templater } from "../types/templater";

export class DefaultTemplater implements Templater {
  private theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  template(context: Context): string {
    const objectTemplate = (prefix: string, def: string) => {
      const slugTemplate = `${prefix}-${context.object!.slug}`;
      if (this.theme?.templates.includes(slugTemplate)) return slugTemplate;
      const idTemplate = `${prefix}-${context.object!.id}`;
      if (this.theme?.templates.includes(idTemplate)) return idTemplate;
      return def;
    };

    if (context.context.includes("home")) {
      return this.theme?.templates.includes("home") ? "home" : "index";
    } else if (context.context.includes("paged")) {
      return "index";
    } else if (context.context.includes("post")) {
      // FIXME also support custom-{template-name} specified in post/page
      return objectTemplate("post", "post");
    } else if (context.context.includes("tag")) {
      const def = this.theme?.templates.includes("tag") ? "tag" : "index";
      return objectTemplate("tag", def);
    } else if (context.context.includes("author")) {
      const def = this.theme?.templates.includes("author") ? "author" : "index";
      return objectTemplate("author", def);
    } else {
      // FIXME find a static page matching the path
      console.log("no template for context", context);
      return "error";
    }
  }
}
