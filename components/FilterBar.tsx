import { TAG_ACTIVE, TAG_BG, paletteColorFor } from "@/lib/palette";

interface Props {
  locations: string[];
  tags: string[];
  selectedLocation: string;
  selectedTags: string[];
  onLocationChange: (location: string) => void;
  onToggleTag: (tag: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export default function FilterBar({
  locations,
  tags,
  selectedLocation,
  selectedTags,
  onLocationChange,
  onToggleTag,
  onClear,
  hasActiveFilters,
}: Props) {
  return (
    <section className="border-b border-line py-8" aria-label="Filtrer tiltak">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <label
            htmlFor="location-filter"
            className="block text-xs font-medium uppercase tracking-wider text-seagrass"
          >
            Sted
          </label>
          <select
            id="location-filter"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="mt-2 w-full min-w-[14rem] border border-line bg-background px-3 py-2 text-sm text-ink focus:border-cerulean focus:outline-none focus:ring-1 focus:ring-cerulean sm:w-auto"
          >
            <option value="">Alle steder</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="self-start text-sm text-cerulean underline underline-offset-4 hover:text-seagrass"
          >
            Nullstill filtre
          </button>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-seagrass">
            Tema
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const active = selectedTags.includes(tag);
              const color = paletteColorFor(tag);
              return (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    aria-pressed={active}
                    className={
                      "px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cerulean " +
                      (active ? TAG_ACTIVE[color] : TAG_BG[color] + " hover:opacity-80")
                    }
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
