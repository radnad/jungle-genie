export function formatEGP(amount: number): string {
  return amount.toLocaleString('en-US');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .trim();
}
