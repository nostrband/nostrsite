export interface SiteAddr {
  pubkey: string,
  name: string,
  relays: string[] | undefined
}

export interface SiteNavigationItem {
  label: string,
  url: string
}

export interface SiteExtension {
  event_id: string;
  relay: string;
  package_hash: string;
  petname: string;
}

export interface Site {
  id: string;

  name: string,
  admin_pubkey: string,
  admin_relays?: string[],

  origin: string;

  contributor_pubkeys?: string[],
  include_tags?: { tag: string, value: string }[],
  include_all?: boolean;
  include_manual?: boolean;
  include_kinds?: string[],
  include_relays?: string[];

  engine?: string;
  themes?: string[];
  plugins?: string[];

  title: string | null,
  url: string | null
  timezone: string | null,
  description: string | null,
  logo: string | null,
  icon: string | null,
  accent_color: string | null,
  cover_image: string | null,
  facebook: string | null,
  twitter: string | null,
  lang: string | null,
  codeinjection_head: null,
  codeinjection_foot: null,
  navigation: SiteNavigationItem[] | null,
  secondary_navigation: SiteNavigationItem[] | null,
  meta_title: string | null,
  meta_description: string | null,
  og_image: string | null,
  og_title: string | null,
  og_description: string | null,
  twitter_image: string | null,
  twitter_title: string | null,
  twitter_description: string | null,
  members_support_address: string | null,

  hashtags: string[],

  comments_enabled?: boolean;
  recommendations_enabled?: boolean;

  extensions: SiteExtension[];
}

