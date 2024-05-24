import { NDKEvent } from "@nostr-dev-kit/ndk";
import { Author } from "./author";
import { Tag } from "./tag";

export interface Post {
  id: string;
  slug: string;
  uuid: string;
  url: string;
  title: string | null;
  html: string | null;
  comment_id: string | null;
  feature_image: string | null;
  feature_image_alt: null;
  feature_image_caption: null;
  featured: boolean;
  visibility: "public";
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
  custom_excerpt: string | null;
  codeinjection_head: null;
  codeinjection_foot: null;
  custom_template: null;
  canonical_url: null;
  excerpt: string | null;
  reading_time: number;
  access: true;
  og_image: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  email_subject: string | null;
  primary_tag: Tag | null;
  tags: Tag[];
  primary_author: Author | null;
  authors: Author[];

  // source content in markdown syntax
  markdown?: string;

  // all urls
  links: string[];

  // all image urls
  images: string[];

  // ghost's settings, default=true
  show_title_and_feature_image: boolean;

  // source nostr event
  event: NDKEvent
}
