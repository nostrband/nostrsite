import { Context } from "./context";

export interface Templater {
  template(context: Context): string;
}
