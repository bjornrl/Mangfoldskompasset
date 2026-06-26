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
      className={`group flex h-full flex-col border border-t-[3px] p-5 text-left transition-colors ${CARD_BG[accent]} ${CARD_BORDER[accent]} ${ACCENT_BORDER[accent]} focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean`}
      aria-label={`Åpne detaljer for ${grant.title}`}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-ink/55">
        {grant.year}
      </p>

      <h3 className="mt-2 font-heading text-base font-semibold leading-snug text-ink">
        {truncate(grant.title, 90)}
      </h3>

      <p className="mt-1 text-xs text-muted">{grant.applicant}</p>
    </button>
  );
}
