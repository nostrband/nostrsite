export interface Recommendation {
  id: string,
  url: string,
  title: string | null,
  favicon: string | null,
  description: string | null,

  // for compat with other store objects
  slug: string,
}
