import { Theme } from "./theme";

export interface AssetFetcher {

  addTheme(theme: Theme): void;

  // prefetch etc
  load(): Promise<void>;

  resolve(file: string): string;

  fetch(file: string): Promise<string>;

  fetchHbs(
    file: string,
    encoding: string,
    cb: (e: any | null, data?: string) => void
  ): void;
}
