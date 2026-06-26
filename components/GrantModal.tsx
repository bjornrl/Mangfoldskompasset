"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Grant } from "@/lib/types";
import { formatCost } from "@/lib/format";
import { ACCENT_LEFT, paletteColorFor } from "@/lib/palette";

interface Props {
  grant: Grant;
  onClose: () => void;
}

interface MetaRow {
  label: string;
  value: string;
  wide?: boolean;
}

const PANEL_MS = 300;

export default function GrantModal({ grant, onClose }: Props) {
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

  const meta: MetaRow[] = [
    { label: "Søker", value: grant.applicant },
    { label: "År", value: String(grant.year) },
    { label: "Innvilget beløp", value: formatCost(grant.granted_amount) },
    { label: "Søknadsbeløp", value: formatCost(grant.applied_amount) },
    {
      label: "Ubrukt beløp",
      value: grant.unused_amount > 0 ? formatCost(grant.unused_amount) : "",
    },
    { label: "Budsjettpost", value: grant.budget_post },
    { label: "Tilskuddsordning", value: grant.scheme, wide: true },
  ].filter((row) => row.value.trim() !== "");

  const accent = paletteColorFor(grant.id);

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
        aria-labelledby="grant-modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`h-full w-full max-w-xl overflow-y-auto border-l-4 bg-background transition-transform duration-300 ease-out ${ACCENT_LEFT[accent]} ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-line bg-background px-8 py-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate">
              {grant.applicant} · {grant.year}
            </p>
            <h2
              id="grant-modal-title"
              className="mt-2 font-heading text-2xl font-semibold leading-snug text-ink"
            >
              {grant.title}
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
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {meta.map((row) => (
              <div key={row.label} className={row.wide ? "sm:col-span-2" : ""}>
                <dt className="text-xs font-medium uppercase tracking-wider text-cyan">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
