export function getColor(name: string): string {
  return getComputedStyle(document.body).getPropertyValue(`--color-${name}`);
}