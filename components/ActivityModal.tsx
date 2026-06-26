"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Activity } from "@/lib/types";
import { formatCost } from "@/lib/format";
import { ACCENT_LEFT, TAG_BG, paletteColorFor } from "@/lib/palette";

interface Props {
  activity: Activity;
  onClose: () => void;
}

interface MetaRow {
  label: string;
  value: string;
}

const PANEL_MS = 300;

export default function ActivityModal({ activity, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(onClose, PANEL_MS);
  }, [onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Close on Esc and lock background scroll while the modal is open.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close]);

  const paragraphs = activity.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const meta: MetaRow[] = [
    { label: "Ansvarlig", value: activity.responsible },
    { label: "Sted", value: activity.location },
    { label: "Totalt budsjett", value: formatCost(activity.total_cost) },
    { label: "Finansieringskilde", value: activity.funding_source },
    { label: "År", value: String(activity.year) },
    { label: "Kontaktperson", value: activity.contact },
    { label: "Samarbeidspartnere", value: activity.partners },
  ].filter((row) => row.value.trim() !== "");

  const accent = paletteColorFor(activity.id);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end bg-ink/40 transition-opacity duration-300 ease-out ${
        open ? "opacity-100" : "opacity-0"
      }`}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`h-full w-full max-w-xl overflow-y-auto border-l-4 bg-background transition-transform duration-300 ease-out ${ACCENT_LEFT[accent]} ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-line bg-background px-8 py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate">
              {activity.location} · {activity.year}
            </p>
            <h2
              id="modal-title"
              className="mt-2 font-heading text-2xl font-semibold leading-snug text-ink"
            >
              {activity.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Lukk"
            className="shrink-0 border border-line px-3 py-1.5 text-sm text-ink hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            Lukk ✕
          </button>
        </div>

        <div className="px-8 py-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-line pb-8 sm:grid-cols-2">
            {meta.map((row) => {
              const wide =
                row.label === "Finansieringskilde" ||
                row.label === "Samarbeidspartnere";
              return (
                <div key={row.label} className={wide ? "sm:col-span-2" : ""}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-cyan">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{row.value}</dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wider text-cyan">
              Finansiert av
            </p>
            <span className="mt-2 inline-flex items-center bg-cerulean/12 px-2.5 py-1 text-xs font-medium text-cerulean">
              Bufdir
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink/90">
                {p}
              </p>
            ))}
          </div>

          {activity.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {activity.tags.map((tag) => {
                const color = paletteColorFor(tag);
                return (
                  <li
                    key={tag}
                    className={`px-2.5 py-1 text-xs font-medium ${TAG_BG[color]}`}
                  >
                    {tag}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
