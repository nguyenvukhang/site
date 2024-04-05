// this file must NOT depend on `fs` nor `path` in order to be usable
// everywhere

export function toAnchorId(text: string, prefix = ''): string {
  return prefix + text.toLowerCase().replace(/\s/g, '-')
}
