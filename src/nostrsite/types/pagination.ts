export interface Pagination {
  total: number;
  page: number;
  pages: number;
  prev: boolean;
  next: boolean;
  limit: number,
  // next: string | null,
  // prev: string | null
}