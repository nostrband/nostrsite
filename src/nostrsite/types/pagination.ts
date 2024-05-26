export interface Pagination {
  total: number;
  page: number;
  pages: number;
  prev: number | null;
  next: number | null;
  limit: number,
  // next: string | null,
  // prev: string | null
}