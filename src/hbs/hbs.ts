// @ts-ignore
import BrowserHbs from "browser-hbs";
import path from "path-browserify";
import { SiteInfo } from "../types/siteinfo";

export class HBS {
  private hbs = new BrowserHbs();

  private dir: string;

  constructor(dir: string, info: SiteInfo) {
    this.dir = dir;

    const partialsDir: any = {};
    partialsDir[path.join(dir, "partials/")] = [
      "scripts.hbs",
      "sub/comment.hbs",
    ];
    partialsDir[path.join(dir, "partials-other/")] = ["other.hbs"];

    // start hbs
    this.hbs.init({
      partialsDir,
      defaultLayout: path.join(dir, "layout/default.hbs"),
      restrictLayoutsTo: dir,
      viewsDir: dir,
      cache: true,
    });

    const self = this;

    // Register sync helper
    this.hbs.registerHelper("link", function (text: string, options: any) {
      var attrs = [];
      for (var prop in options.hash) {
        attrs.push(prop + '="' + options.hash[prop] + '"');
      }
      return new self.hbs.SafeString(
        "<a " + attrs.join(" ") + ">" + text + "</a>"
      );
    });

    // Register Async helpers
    this.hbs.registerAsyncHelper(
      "readFile",
      function (filename: string, cb: (s: string) => void) {
        self.hbs.fetcher(
          path.join(dir, filename),
          "utf8",
          function (err: string, content: string) {
            if (err) console.error(err);
            cb(new self.hbs.SafeString(content));
          }
        );
      }
    );
  }

  private renderTemplate(template: string, data: any) {
    const filename = path.join(this.dir, template);

    return new Promise<string>((ok, err) =>
      this.hbs.render(
        filename,
        {
          ...data,
        },
        (e: any, d: string) => {
          if (e) err(e);
          else ok(d);
        }
      )
    );
  }

  public async render(path: string) {
    const start = Date.now();
    console.log("render", path);

    var fruits = [{ name: "apple" }, { name: "orange" }, { name: "pear" }];

    var veggies = [
      { name: "asparagus" },
      { name: "carrot" },
      { name: "spinach" },
    ];

    let result: string = "";
    if (path === "/") {
      result = await this.renderTemplate("index", {
        title: "express-hbs example",
      });
    } else if (path === "replace") {
      result = await this.renderTemplate("replace", {
        title: "express-hbs example",
      });
    } else if (path.match("/fruits/apple")) {
      result = await this.renderTemplate("fruits/details", {
        fruit: "apple", // fruit name from url
      });
    } else if (path === "/fruits") {
      result = await this.renderTemplate("fruits/index", {
        title: "My favorite fruits",
        fruits: fruits,
      });
    } else if (path === "/veggies") {
      result = await this.renderTemplate("veggies", {
        title: "My favorite veggies",
        veggies: veggies,
        layout: "layout/veggie",
      });
    } else if (path === "/veggies/carrot") {
      result = await this.renderTemplate("veggies/details", {
        veggie: "carrot", // veggie name from url
        layout: "layout/veggie-details",
      });
    } else {
      console.log("bad path");
    }

    console.log("rendered", path, "in", Date.now() - start, "ms");

    return result;
  }
}
