
export interface PackageEntry {
  path: string;
  hash: string;
  url: string;
}

export interface Theme {
  // package note id
  id: string;

  // assigned by site admin
  name: string;

  // virtual dir
  dir: string;

  // package files
  entries: PackageEntry[];

  // main templates
  templates: string[];

  // partial templates
  partials: string[];

  // from package.json
  config: any;

  // custom settings, list 
  // and defaults from package.json
  custom: any;

  // locally hosted theme for debugging
  local?: boolean;
}