import type { Activity } from "@/lib/types";
import { truncate, firstParagraph } from "@/lib/format";

interface Props {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}

export default function ActivityCard({ activity, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(activity)}
      className="group flex h-full flex-col border border-line bg-card p-7 text-left transition-colors hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      aria-label={`Åpne detaljer for ${activity.title}`}
    >
      <p className="text-xs uppercase tracking-wider text-muted">
        {activity.location} · {activity.year}
      </p>

      <h2 className="mt-3 text-xl font-light leading-snug text-ink">
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
          {activity.tags.map((tag) => (
            <li
              key={tag}
              className="bg-background px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
