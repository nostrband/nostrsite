import { NDKEvent } from "@nostr-dev-kit/ndk";

export interface Tag {
  id: string;
  slug: string;
  url: string;
  name: string;
  description: string | null;
  meta_title: string | null;
  meta_description: string | null;
  feature_image: string | null;
  visibility: "public";

  images: string[];
  postIds: string[];

  event?: NDKEvent;
}

