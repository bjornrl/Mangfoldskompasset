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
  /** Collaboration partners (Samarbeidspartnere). Empty string if none stated. */
  partners: string;
  /** Contact person (Kontaktperson) — name and role/organisation. */
  contact: string;
  /** Free-text tags for filtering. */
  tags: string[];
}

/**
 * A lighter-weight grant record from the Bufdir grant registry export.
 * Less detailed than {@link Activity} — no free-text description — and shown
 * as smaller cards beneath the curated activities.
 */
export interface Grant {
  /** Unique id (string). Used as React key and modal target. */
  id: string;
  /** Project title (tiltakets navn / Tittel). */
  title: string;
  /** Applicant organisation (Søker). */
  applicant: string;
  /** Funding scheme (Tilskuddsordning). */
  scheme: string;
  /** Year the grant applies to (Periode). */
  year: number;
  /** Amount applied for in NOK (Søknadsbeløp). */
  applied_amount: number;
  /** Amount granted in NOK (Innvilget beløp). */
  granted_amount: number;
  /** Unused amount in NOK (Sum ubrukt). 0 if none. */
  unused_amount: number;
  /** Budget chapter/post code (KapittelPostListe), e.g. "0765.71". */
  budget_post: string;
}
