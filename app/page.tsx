"use client";

import { useEffect, useMemo, useState } from "react";
import type { Activity, Grant } from "@/lib/types";
import ActivityCard from "@/components/ActivityCard";
import FilterBar from "@/components/FilterBar";
import ActivityModal from "@/components/ActivityModal";
import GrantCard from "@/components/GrantCard";
import GrantModal from "@/components/GrantModal";

type LoadState = "loading" | "ready" | "error";

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [status, setStatus] = useState<LoadState>("loading");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [active, setActive] = useState<Activity | null>(null);
  const [activeGrant, setActiveGrant] = useState<Grant | null>(null);

  // Fetch the data fresh on every load — no rebuild needed to add activities.
  useEffect(() => {
    let cancelled = false;
    fetch("data/activities.json", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Activity[]) => {
        if (cancelled) return;
        setActivities(data);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Supplementary, less-detailed grant registry — loaded independently so a
  // failure here never blocks the curated activities above.
  useEffect(() => {
    let cancelled = false;
    fetch("data/grants.json", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Grant[]) => {
        if (!cancelled) setGrants(data);
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, []);

  // Unique, sorted lists for the filter controls.
  const locations = useMemo(
    () =>
      [...new Set(activities.map((a) => a.location))].sort((a, b) =>
        a.localeCompare(b, "nb"),
      ),
    [activities],
  );

  const tags = useMemo(
    () =>
      [...new Set(activities.flatMap((a) => a.tags))].sort((a, b) =>
        a.localeCompare(b, "nb"),
      ),
    [activities],
  );

  const filtered = useMemo(
    () =>
      activities.filter((a) => {
        const locationOk =
          !selectedLocation || a.location === selectedLocation;
        const tagsOk =
          selectedTags.length === 0 ||
          selectedTags.every((t) => a.tags.includes(t));
        return locationOk && tagsOk;
      }),
    [activities, selectedLocation, selectedTags],
  );

  const hasActiveFilters = selectedLocation !== "" || selectedTags.length > 0;

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function clearFilters() {
    setSelectedLocation("");
    setSelectedTags([]);
  }

  return (
    <main className="mx-auto max-w-content px-6 py-16 sm:px-8">
      <header className="max-w-2xl">
        <div
          className="h-1 w-20 rounded-full bg-gradient-to-r from-strawberry via-tuscan to-cerulean"
          aria-hidden
        />
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-cerulean">
          Gode tiltak for likestilling og inkludering
        </p>
        <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Mangfoldskompasset
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink/80">
          En kuratert samling av gode tiltak for likestilling og inkludering av skjeive.
          Hvert kort viser hva som ble gjort, hvem som sto
          bak, hvor det skjedde, hva det kostet og hvor pengene kom fra – til
          inspirasjon for andre kommuner.
        </p>
      </header>

      {status === "ready" && activities.length > 0 && (
        <FilterBar
          locations={locations}
          tags={tags}
          selectedLocation={selectedLocation}
          selectedTags={selectedTags}
          onLocationChange={setSelectedLocation}
          onToggleTag={toggleTag}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      )}

      {status === "loading" && (
        <p className="py-16 text-sm text-muted">Laster tiltak…</p>
      )}

      {status === "error" && (
        <p className="py-16 text-sm text-ink">
          Kunne ikke laste <code>data/activities.json</code>. Hvis du åpner
          filen direkte i nettleseren, kjør i stedet en lokal server (se
          README).
        </p>
      )}

      {status === "ready" && (
        <>
          <p className="py-6 text-sm text-slate">
            {filtered.length + grants.length} tiltak
          </p>

          {filtered.length + grants.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onSelect={setActive}
                />
              ))}
              {grants.map((grant) => (
                <GrantCard
                  key={grant.id}
                  grant={grant}
                  onSelect={setActiveGrant}
                />
              ))}
            </div>
          ) : (
            <p className="py-16 text-sm text-muted">
              Ingen tiltak matcher filtrene.
            </p>
          )}
        </>
      )}

      {active && (
        <ActivityModal activity={active} onClose={() => setActive(null)} />
      )}

      {activeGrant && (
        <GrantModal
          grant={activeGrant}
          onClose={() => setActiveGrant(null)}
        />
      )}

      <footer className="mt-20 border-t border-line pt-8 text-xs text-muted">
        Mangfoldskompasset · Data redigeres manuelt i{" "}
        <code>data/activities.json</code>
      </footer>
    </main>
  );
}
