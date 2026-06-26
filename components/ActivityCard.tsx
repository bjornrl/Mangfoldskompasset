import type { Activity } from "@/lib/types";
import { truncate, firstParagraph } from "@/lib/format";
import { ACCENT_BORDER, CARD_BG, CARD_BORDER, TAG_ON_CARD, paletteColorFor } from "@/lib/palette";

interface Props {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

export default function ActivityCard({ activity, onSelect }: Props) {
  const accent = paletteColorFor(activity.id);

  return (
    <button
      type="button"
      onClick={() => onSelect(activity)}
      className={`group flex h-full flex-col border border-t-[3px] p-7 text-left transition-colors ${CARD_BG[accent]} ${CARD_BORDER[accent]} ${ACCENT_BORDER[accent]} focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean`}
      aria-label={`Åpne detaljer for ${activity.title}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-ink/55">
        {activity.location} · {activity.year}
      </p>

      <h2 className="mt-3 font-heading text-xl font-semibold leading-snug text-ink">
        {activity.title}
      </h2>

      <p className="mt-1 text-sm text-muted">{activity.responsible}</p>

      <p className="mt-5 text-xs text-muted">
        {truncate(activity.funding_source, 64)}
      </p>

      <p className="mt-5 text-sm leading-relaxed text-ink/80">
        {truncate(firstParagraph(activity.description), 150)}
      </p>

      {activity.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2 pt-1">
          {activity.tags.map((tag) => {
            const color = paletteColorFor(tag);
            return (
              <li
                key={tag}
                className={`px-2.5 py-1 text-xs font-medium ${TAG_ON_CARD[color]}`}
              >
                {tag}
              </li>
            );
          })}
        </ul>
      )}
    </button>
  );
}
