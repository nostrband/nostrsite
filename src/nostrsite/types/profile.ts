import { NDKEvent } from "@nostr-dev-kit/ndk";

export interface Profile {
  id: string;
  profile?: {
    name?: string;
    display_name?: string;
    website?: string;
    banner?: string;
    picture?: string;
    about?: string;
  }
  pubkey: string;
  event: NDKEvent;
}

