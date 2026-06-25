"use client";

import { useEffect, useRef } from "react";
import type { Activity } from "@/lib/types";
import { formatCost } from "@/lib/format";

interface Props {
  activity: Activity;
  onClose: () => void;
}

interface MetaRow {
  label: string;
  value: string;
}

export default function ActivityModal({ activity, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Esc and lock background scroll while the modal is open.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const paragraphs = activity.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const meta: MetaRow[] = [
    { label: "Ansvarlig", value: activity.responsible },
    { label: "Sted", value: activity.location },
    { label: "Totalkostnad", value: formatCost(activity.total_cost) },
    { label: "Finansieringskilde", value: activity.funding_source },
    { label: "År", value: String(activity.year) },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-ink/40"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-xl overflow-y-auto border-l border-line bg-background"
      >
        <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-line bg-background px-8 py-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              {activity.location} · {activity.year}
            </p>
            <h2
              id="modal-title"
              className="mt-2 text-2xl font-light leading-snug text-ink"
            >
              {activity.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Lukk"
            className="shrink-0 border border-line px-3 py-1.5 text-sm text-ink hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Lukk ✕
          </button>
        </div>

        <div className="px-8 py-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-line pb-8 sm:grid-cols-2">
            {meta.map((row) => (
              <div key={row.label}>
                <dt className="text-xs uppercase tracking-wider text-muted">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink/90">
                {p}
              </p>
            ))}
          </div>

          {activity.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {activity.tags.map((tag) => (
                <li key={tag} className="bg-card px-2.5 py-1 text-xs text-muted">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
