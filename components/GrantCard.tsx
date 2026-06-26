import type { Grant } from "@/lib/types";
import { truncate } from "@/lib/format";
import { ACCENT_BORDER, CARD_BG, CARD_BORDER, paletteColorFor } from "@/lib/palette";

interface Props {
  grant: Grant;
  onSelect: (grant: Grant) => void;
}

export default function GrantCard({ grant, onSelect }: Props) {
  const accent = paletteColorFor(grant.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(grant)}
      className={`group flex h-full flex-col border border-t-[3px] p-7 text-left transition-colors ${CARD_BG[accent]} ${CARD_BORDER[accent]} ${ACCENT_BORDER[accent]} focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean`}
      aria-label={`Åpne detaljer for ${grant.title}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-ink/55">
        {grant.year}
      </p>

      <h2 className="mt-3 font-heading text-xl font-semibold leading-snug text-ink">
        {grant.title}
      </h2>

      <p className="mt-1 text-sm text-muted">{grant.applicant}</p>

      <p className="mt-5 text-sm leading-relaxed text-ink/80">
        {truncate(grant.scheme, 150)}
      </p>
    </button>
  );
}
