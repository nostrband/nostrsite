import { Author } from "./author";
import { Pagination } from "./pagination";
import { Post } from "./post";
import { Recommendation } from "./recommendation";
import { Tag } from "./tag";

export interface StoreListResponse {
  posts?: Post[];
  tags?: Tag[];
  authors?: Author[];
  recommendations?: Recommendation[];
  pagination: Pagination;
}

export type StoreObject = Post | Tag | Author | Recommendation;

export type StoreObjectType = "posts" | "tags" | "authors" | "recommendations";

export interface StoreListRequest {

  type: StoreObjectType;

  // for listing of a single object
  id?: string;
  slug?: string;

  // Ghost legacy filters
  filter?: string;

  // our filters
  tag?: string;
  author?: string;

  // per-page limit
  limit?: number;

  // current page
  page?: number;
}

export interface Store {
  isValidType(type: string): boolean;
  list: (request: StoreListRequest) => Promise<StoreListResponse>;
  get: (
    slugId: string,
    type?: string,
  ) => Promise<StoreObject | undefined>;
  getUrl: (id: string, type?: StoreObjectType) => string | undefined;
}

