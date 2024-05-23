import { NDKEvent } from "@nostr-dev-kit/ndk";

export interface Author {
  id: string;
  slug: string;
  name: string;
  email: string | null;
  profile_image: string | null;
  cover_image: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  facebook: string | null;
  twitter: string | null;
  accessibility: null;
  status: "active";
  meta_title: string | null;
  meta_description: string | null;
  tour: string | null;
  last_seen: null;
  created_at: string;
  updated_at: string | null;
  permissions: [];
  roles: [];
  count: {
    posts: number;
  };
  url: string;

  event: NDKEvent
}
