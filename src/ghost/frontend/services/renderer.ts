
export function getRenderer(options: any) {
  const r = options?.data?.renderer;
  if (r) return r;
  throw new Error("No renderer!");
}