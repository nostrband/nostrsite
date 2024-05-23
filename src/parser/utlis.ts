import { NDKEvent } from "@nostr-dev-kit/ndk";

export function tags(
  event: NDKEvent,
  name: string,
  len: number = 2
): string[][] {
  return event.tags.filter((t) => t.length >= len && t[0] === name);
}

export function tag(event: NDKEvent, name: string): string[] | null {
  return tags(event, name)?.[0];
}

export function tvs(event: NDKEvent, name: string): string[] | null {
  return tag(event, name)?.slice(1) || null;
}

export function tv(event: NDKEvent, name: string): string | null {
  return tvs(event, name)?.[0] || null;
}
