import { Site } from "../types/site";
import { Route, Router } from "../types/router";

export class DefaultRouter implements Router {
  private settings: Site;

  constructor(settings: Site) {
    this.settings = settings;
  }

  route(path: string): Route {
    const match = (prefix: string) => {
      if (prefix.startsWith("/")) prefix = prefix.substring(1);

      prefix = (this.settings!.url || "") + prefix;
      console.log("match?", { path, prefix });
      if (prefix.endsWith("*")) {
        return path.startsWith(prefix.substring(0, prefix.length - 1));
      } else {
        return path === prefix;
      }
    };

    const param = (prefix: string) => {
      return path.split(`/${prefix}/`)[1].split("/")[0].split("?")[0];
    };

    const route: Route = {
      path,
      context: [],
    };
    if (match("/")) {
      route.context = ["home", "index"];
    } else if (match("/page/*")) {
      route.context = ["paged", "index"];
      route.param = param("page");
    } else if (match("/post/*")) {
      route.context = ["post"];
      route.param = param("post");
    } else if (match("/tag/*")) {
      route.context = ["tag"];
      route.param = param("tag");
    } else if (match("/author/*")) {
      route.context = ["author"];
      route.param = param("author");
    } else {
      // FIXME find a static page matching the path
      console.log("bad path");
      route.context = ["error"];
    }

    if (
      !route.context.includes("home") &&
      !route.context.includes("error") &&
      !route.param
    ) {
      console.log("No param for contexts", route.context);
      route.context = ["error"];
    }

    return route;
  }
}

