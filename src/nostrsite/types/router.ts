export interface Route {
  path: string;
  context: string[];
  param?: string; // slugId, pageNumber
}

export interface Router {
  route(path: string): Route;
}

