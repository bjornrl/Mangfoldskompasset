export interface Activity {
  /** Unique id (string). Used as React key and modal target. */
  id: string;
  /** Activity title (tiltakets navn). */
  title: string;
  /** Full description — may contain several paragraphs separated by blank lines. */
  description: string;
  /** Organization or person responsible. */
  responsible: string;
  /** City / municipality. */
  location: string;
  /** Total cost in NOK (whole kroner, no decimals). */
  total_cost: number;
  /** Funding source, e.g. "Bufdir – tilskudd til X-ordningen 2024". */
  funding_source: string;
  /** Year the activity was funded / carried out. */
  year: number;
  /** Free-text tags for filtering. */
  tags: string[];
}
