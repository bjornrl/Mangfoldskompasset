"use client";

import { useEffect, useMemo, useState } from "react";
import type { Activity } from "@/lib/types";
import ActivityCard from "@/components/ActivityCard";
import FilterBar from "@/components/FilterBar";
import ActivityModal from "@/components/ActivityModal";

type LoadState = "loading" | "ready" | "error";

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [status, setStatus] = useState<LoadState>("loading");

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [active, setActive] = useState<Activity | null>(null);

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
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Tiltak finansiert av Bufdir
        </p>
        <h1 className="mt-4 text-4xl font-light leading-tight text-ink sm:text-5xl">
          Mangfoldskompasset
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink/80">
          En kuratert samling av kommunale tiltak finansiert gjennom Bufdirs
          tilskuddsordninger. Hvert kort viser hva som ble gjort, hvem som sto
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
          <p className="py-6 text-sm text-muted">
            Viser {filtered.length} av {activities.length} tiltak
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onSelect={setActive}
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

      <footer className="mt-20 border-t border-line pt-8 text-xs text-muted">
        Mangfoldskompasset · Data redigeres manuelt i{" "}
        <code>data/activities.json</code>
      </footer>
    </main>
  );
}
