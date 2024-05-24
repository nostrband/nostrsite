import { Author } from "./author";
import { Post } from "./post";
import { Tag } from "./tag";
import { StoreObject } from "./store";
import { Pagination } from "./pagination";

export interface Context {
  context: string[];
  object?: StoreObject;
  posts?: Post[];
  post?: Post;
  page?: any;
  tag?: Tag;
  author?: Author;
  pagination?: Pagination;
  blossomAssets: string[];
}