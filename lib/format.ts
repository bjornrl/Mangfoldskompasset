/**
 * Format a NOK amount as "250 000 kr" using a non-breaking thin space as the
 * thousands separator (Norwegian convention).
 */
export function formatCost(amount: number): string {
  const grouped = new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${grouped} kr`;
}

/**
 * Truncate a string to `max` characters, appending an ellipsis if cut.
 */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

/**
 * Return the first paragraph of a (possibly multi-paragraph) description,
 * used as the card excerpt.
 */
export function firstParagraph(text: string): string {
  return text.split(/\n\s*\n/)[0]?.trim() ?? "";
}
