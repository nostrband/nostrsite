import path from "path-browserify";
// @ts-ignore
import BrowserHbs from "browser-hbs";

import { Site } from "./types/site";

import { initHelpers } from "./modules/helpers";
import { MetaData } from "./modules/metadata";
import localUtils from "../ghost/frontend/services/theme-engine/handlebars/utils";
import { NostrSiteUrlUtils } from "./modules/urlutils";
import { ImageUtils } from "./modules/images";
import { urlHelpers } from "./modules/config-url-helpers";
import { Post } from "./types/post";
import { Tag } from "./types/tag";
import { Author } from "./types/author";
import { Theme } from "./types/theme";
import { UrlService } from "./modules/urlservice";
import { Context } from "./types/context";
import { Templater } from "./types/templater";
import { DefaultTemplater } from "./modules/default-templater";
import { Store } from "./types/store";
import { Route, Router } from "./types/router";
import { DefaultRouter } from "./modules/default-router";
import { AssetFetcher } from "./types/asset-fetcher";
import { DefaultAssetFetcher } from "./modules/default-asset-fetcher";
import {
  DEFAULT_PARTIALS,
  DEFAULT_PARTIALS_DIR_NAME,
} from "./partials/default-partials";
import merge from "lodash/merge";
import toNumber from "lodash/toNumber";

const DEFAULT_POSTS_PER_PAGE = 6;

function ensureNumber(v: any | undefined): number | undefined {
  if (v === undefined) return undefined;
  return toNumber(v);
}

export class NostrSiteEngine {
  private readonly hbs;

  private urlUtils?: NostrSiteUrlUtils;
  private store: Store;
  private settings?: Site;
  private theme?: Theme;
  private router?: Router;
  private templater?: Templater;
  private assetFetcher?: AssetFetcher;

  private urlService?: UrlService;
  private metaData?: MetaData;

  private config: any = {};
  private custom: any = {};

  constructor(store: Store) {
    this.store = store;

    this.hbs = new BrowserHbs();
    console.log("hbs", this.hbs);

    // FIXME read from localStorage.debug='hbs:N'
    this.hbs.handlebars.logger.level = 0;
  }

  private renderTemplate(template: string, data: any) {
    const filename = path.join(this.theme!.dir, template);

    this.setLocalOptions(data);

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

  public getMetaDataUrl(data: any, absolute?: boolean) {
    return this.metaData!.getMetaDataUrl(data, absolute);
  }

  public async init(
    settings: Site,
    themes: Theme[],
    cfg: any,
    router?: Router,
    templater?: Templater,
    assetFetcher?: AssetFetcher
  ) {
    this.settings = settings;
    this.theme = themes[0];
    if (!this.theme) throw new Error("No themes provided");

    this.router = router || new DefaultRouter(this.settings);
    this.templater = templater || new DefaultTemplater(this.theme);
    this.assetFetcher = assetFetcher || new DefaultAssetFetcher();
    this.urlUtils = new NostrSiteUrlUtils(cfg);
    this.urlService = new UrlService(
      this.store,
      this.urlUtils,
      this.settings.origin,
      this.settings.url || ""
    );
    this.metaData = new MetaData(
      this.theme.dir,
      this.assetFetcher,
      this.urlUtils,
      this.urlService
    );

    // init fetcher and assign to hbs
    for (const theme of themes) this.assetFetcher.addTheme(theme);

    this.assetFetcher.load();

    this.hbs.fetcher = this.assetFetcher.fetchHbs.bind(this.assetFetcher);

    const partialsDir: any = {};

    // only include defaults if the theme doesn't provide them
    partialsDir[`/${DEFAULT_PARTIALS_DIR_NAME}/`] = Object.keys(
      DEFAULT_PARTIALS
    ).filter((p) => !this.theme!.partials.includes(p));

    // theme partials
    partialsDir[path.join(this.theme.dir, "partials/")] = this.theme.partials;

    // start hbs
    this.hbs.init({
      partialsDir,
      restrictLayoutsTo: this.theme.dir,
      viewsDir: this.theme.dir,
      cache: true,
    });

    // setup helpers
    initHelpers(this.hbs);

    urlHelpers.bindAll(cfg);

    this.config = {
      ...this.theme.config,
    };
    for (const [k, v] of settings.config.entries()) {
      this.config[k] = v;
    }
    console.log("config", this.config);

    this.custom = {
      ...this.theme.custom,
    };
    for (const [k, v] of settings.custom.entries()) {
      this.custom[k] = v;
    }
    console.log("custom", this.custom);

    const renderer = {
      SafeString: this.hbs.SafeString,
      escapeExpression: this.hbs.handlebars.Utils.escapeExpression,
      hbs: this.hbs,
      localUtils,
      config: cfg,
      store: this.store,
      metaData: this.metaData,
      imageUtils: new ImageUtils(this.urlUtils),
      urlUtils: this.urlUtils,
      urlService: this.urlService,
      prepareContextResource(data: any) {
        (Array.isArray(data) ? data : [data]).forEach((resource) => {
          // feature_image_caption contains HTML, making it a SafeString spares theme devs from triple-curlies
          if (resource.feature_image_caption) {
            resource.feature_image_caption = new this.hbs.SafeString(
              resource.feature_image_caption
            );
          }

          // some properties are extracted to local template data to force one way of using it
          delete resource.show_title_and_feature_image;
        });
      },
    };

    this.hbs.updateTemplateOptions({
      data: {
        site: this.settings,
        labs: {},
        config: this.config,
        custom: this.custom,
        renderer,
      },
    });
  }

  private setLocalOptions(locals: any) {
    const localTemplateOptions = this.hbs.getLocalTemplateOptions(locals);

    // adjust @site.url for http/https based on the incoming request
    const siteData = {
      url: this.urlUtils!.urlFor("home", { trailingSlash: false }, true),
    };

    // @TODO: it would be nicer if this was proper middleware somehow...
    // inject preview info, if any
    const previewData = {};

    // update site data with any preview values from the request
    Object.assign(siteData, previewData);

    // inject member info here
    // const member = req.member ? {
    //     uuid: req.member.uuid,
    //     email: req.member.email,
    //     name: req.member.name,
    //     firstname: req.member.name && req.member.name.split(' ')[0],
    //     avatar_image: req.member.avatar_image,
    //     subscriptions: req.member.subscriptions && req.member.subscriptions.map((sub) => {
    //         return Object.assign({}, sub, {
    //             default_payment_card_last4: sub.default_payment_card_last4 || '****'
    //         });
    //     }),
    //     paid: req.member.status !== 'free',
    //     status: req.member.status
    // } : null;
    const member = null;

    // take page
    const page = locals.page;
    delete locals.page;

    console.log("locals", { locals, localTemplateOptions });
    this.hbs.updateLocalTemplateOptions(
      locals,
      merge({}, localTemplateOptions, {
        data: {
          member: member,
          site: siteData,
          page,
        },
      })
    );
  }

  private async loadContextData(route: Route): Promise<Context> {
    const limit =
      ensureNumber(this.config.posts_per_page) || DEFAULT_POSTS_PER_PAGE;

    const data: Context = {
      context: route.context,
      blossomAssets: [],
    };

    if (route.context.includes("home")) {
      const list = await this.store.list({ type: "posts", limit });
      data.posts = list.posts;
      data.pagination = list.pagination;
    } else if (route.context.includes("paged")) {
      const pageNum = parseInt(route.param!);
      const list = await this.store.list({
        type: "posts",
        page: pageNum,
        limit,
      });
      data.posts = list.posts;
      data.pagination = list.pagination;
    } else if (route.context.includes("post")) {
      const slugId = route.param!;
      data.object = await this.store.get(slugId, "posts");
      data.post = data.object as Post;
      data.page = {
        show_title_and_feature_image: data.post?.show_title_and_feature_image,
      };
    } else if (route.context.includes("tag")) {
      const slugId = route.param!;
      data.object = await this.store.get(slugId, "tags");
      data.tag = data.object as Tag;
      if (data.tag) {
        const list = await this.store.list({ type: "posts", tag: data.tag.id });
        data.posts = list.posts;
        data.pagination = list.pagination;
      }
    } else if (route.context.includes("author")) {
      const slugId = route.param!;
      data.object = await this.store.get(slugId, "authors");
      data.author = data.object as Author;
      if (data.author) {
        const list = await this.store.list({
          type: "posts",
          author: data.author.id,
        });
        data.posts = list.posts;
        data.pagination = list.pagination;
      }
    } else {
      // FIXME find a static page matching the path
      console.log("bad path");
    }

    // FIXME assets from other objects?
    if (data.posts)
      data.blossomAssets.push(...data.posts.map((p) => p.images).flat());
    if (data.post) data.blossomAssets.push(...data.post.images);

    if (
      !route.context.includes("error") &&
      !route.context.includes("home") &&
      !route.context.includes("paged") &&
      !data.object
    ) {
      console.log("object not found", { route });
      data.context = ["error"];
    }

    return data;
  }

  public async render(
    path: string
  ): Promise<{ result: string; context: Context }> {
    const start = Date.now();
    console.log("render", path);

    // parse the url into "Ghost context" and param
    const route = this.router!.route(path);

    // NOTE: context.context might differ from route.context
    // due to 404 Not Found errors etc
    const context = await this.loadContextData(route);

    const template = this.templater!.template(context);

    console.log("context data", { route, context, template });

    const result = await this.renderTemplate(template, context);

    console.log("rendered", path, "in", Date.now() - start, "ms");

    return { result, context };
  }
}
