import { Theme } from "./nostrsite/types/theme";

export const theme: Theme = {
  local: true,

  id: 'theme',

  name: "theme",

  dir: "/theme/",

  config: {
    posts_per_page: 5,
    image_sizes: [],
  },

  custom: {
    show_author: true,
    show_related_posts: true,
  },

  entries: [],

  templates: ["tag", "page", "author"],

  partials: [
    "author-box.hbs",
    "loop.hbs",
    "post-header.hbs",
    "pswp.hbs",
    "related-posts.hbs",
    "side-menu.hbs",
    "icons/arrow-right.hbs",
    "icons/avatar.hbs",
    "icons/close.hbs",
    "icons/facebook.hbs",
    "icons/search.hbs",
    "icons/star.hbs",
    "icons/twitter.hbs",
  ],
};

export const theme1: Theme = {
  local: true,

  id: "theme1",

  name: "theme1",

  dir: "/theme1/",

  config: {
    posts_per_page: 12,
    image_sizes: [],
  },

  custom: {
    style: "Elegant",
    background_color: "#FAF6E9",
    enter_tag_slugs_for_homepage_sections: "nostr,Bitcoin",
  },

  entries: [],

  templates: ["tag", "page", "author"],

  partials: [
    "pswp.hbs",
    "icons/search.hbs",
    "icons/facebook.hbs",
    "icons/twitter.hbs",
    "components/header-content.hbs",
    "components/tag-header.hbs",
    "components/author-header.hbs",
    "components/footer.hbs",
    "components/cta.hbs",
    "components/list-item.hbs",
    "components/article.hbs",
    "components/navbar.hbs",
    "components/list.hbs",
    "components/header.hbs",
  ],
};

export const theme2: Theme = {
  local: true,

  id: "theme2",

  name: "theme2",

  dir: "/theme2/",

  config: {
    posts_per_page: 16,
    image_sizes: [],
  },

  custom: {
    site_background_color: "#ffffff",
    show_featured_posts: true,
    header_style: "Highlight",
    show_post_metadata: true,
    show_publication_info_sidebar: true,
  },

  entries: [],

  templates: ["home", "tag", "page", "author"],

  partials: [
    "icons/checkmark.hbs",
    "icons/arrow.hbs",
    "icons/search.hbs",
    "icons/close.hbs",
    "icons/rss.hbs",
    "icons/avatar.hbs",
    "icons/burger.hbs",
    "icons/fire.hbs",
    "icons/lock.hbs",
    "icons/loader.hbs",
    "icons/facebook.hbs",
    "icons/twitter.hbs",
    "email-subscription.hbs",
    "feature-image.hbs",
    "lightbox.hbs",
    "search-toggle.hbs",
    "post-card.hbs",
    "components/featured.hbs",
    "components/header-content.hbs",
    "components/footer.hbs",
    "components/cta.hbs",
    "components/post-list.hbs",
    "components/navigation.hbs",
    "components/header.hbs",
  ],
};

export const theme3: Theme = {
  local: true,

  id: "theme3",

  name: "theme3",

  dir: "/theme3/",

  config: {
    posts_per_page: 25,
    image_sizes: [],
  },

  custom: {
    navigation_layout: "Logo on cover",
    title_font: "Modern sans-serif",
    body_font: "Elegant serif",
    show_publication_cover: true,
    header_style: "Center aligned",
    feed_layout: "Classic",
    color_scheme: "Light",
    post_image_style: "Wide",
    email_signup_text: "Sign up for more like this.",
    show_recent_posts_footer: true,
  },

  entries: [],

  templates: ["tag", "page", "author", "error", "error-404"],

  partials: [
    "post-card.hbs",
    "icons/search.hbs",
    "icons/rss.hbs",
    "icons/avatar.hbs",
    "icons/fire.hbs",
    "icons/lock.hbs",
    "icons/loader.hbs",
    "icons/facebook.hbs",
    "icons/twitter.hbs",
    "lightbox.hbs",
  ],
};

