import { getRenderer } from "../services/renderer";

export default function concat(...args: any[]) {
  const options = args.pop();
  const { SafeString } = getRenderer(options);
  const separator = options.hash.separator || "";
  return new SafeString(args.join(separator));
}
