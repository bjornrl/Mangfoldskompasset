/** Palette color names — must match tailwind.config.ts */
export const PALETTE = [
  "strawberry",
  "tangerine",
  "carrot",
  "coral",
  "tuscan",
  "willow",
  "seagrass",
  "cyan",
  "slate",
  "cerulean",
] as const;

export type PaletteColor = (typeof PALETTE)[number];

/** Stable palette slot for a string (e.g. tag name or activity id). */
export function paletteColorFor(key: string): PaletteColor {
  if (/^\d+$/.test(key)) {
    return PALETTE[(parseInt(key, 10) - 1) % PALETTE.length];
  }

  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash + key.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export const TAG_BG: Record<PaletteColor, string> = {
  strawberry: "bg-strawberry/12 text-strawberry",
  tangerine: "bg-tangerine/12 text-tangerine",
  carrot: "bg-carrot/12 text-carrot",
  coral: "bg-coral/12 text-coral",
  tuscan: "bg-tuscan/20 text-carrot",
  willow: "bg-willow/15 text-willow",
  seagrass: "bg-seagrass/12 text-seagrass",
  cyan: "bg-cyan/12 text-cyan",
  slate: "bg-slate/12 text-slate",
  cerulean: "bg-cerulean/12 text-cerulean",
};

export const TAG_ACTIVE: Record<PaletteColor, string> = {
  strawberry: "bg-strawberry text-white",
  tangerine: "bg-tangerine text-white",
  carrot: "bg-carrot text-white",
  coral: "bg-coral text-white",
  tuscan: "bg-tuscan text-ink",
  willow: "bg-willow text-white",
  seagrass: "bg-seagrass text-white",
  cyan: "bg-cyan text-white",
  slate: "bg-slate text-white",
  cerulean: "bg-cerulean text-white",
};

export const ACCENT_BORDER: Record<PaletteColor, string> = {
  strawberry: "border-t-strawberry",
  tangerine: "border-t-tangerine",
  carrot: "border-t-carrot",
  coral: "border-t-coral",
  tuscan: "border-t-tuscan",
  willow: "border-t-willow",
  seagrass: "border-t-seagrass",
  cyan: "border-t-cyan",
  slate: "border-t-slate",
  cerulean: "border-t-cerulean",
};

export const ACCENT_LEFT: Record<PaletteColor, string> = {
  strawberry: "border-l-strawberry",
  tangerine: "border-l-tangerine",
  carrot: "border-l-carrot",
  coral: "border-l-coral",
  tuscan: "border-l-tuscan",
  willow: "border-l-willow",
  seagrass: "border-l-seagrass",
  cyan: "border-l-cyan",
  slate: "border-l-slate",
  cerulean: "border-l-cerulean",
};

export const CARD_BG: Record<PaletteColor, string> = {
  strawberry: "bg-card-red hover:bg-card-red-hover",
  tangerine: "bg-card-orange hover:bg-card-orange-hover",
  carrot: "bg-card-amber hover:bg-card-amber-hover",
  coral: "bg-card-orange hover:bg-card-orange-hover",
  tuscan: "bg-card-yellow hover:bg-card-yellow-hover",
  willow: "bg-card-green hover:bg-card-green-hover",
  seagrass: "bg-card-mint hover:bg-card-mint-hover",
  cyan: "bg-card-teal hover:bg-card-teal-hover",
  slate: "bg-card-blue-gray hover:bg-card-blue-gray-hover",
  cerulean: "bg-card-blue hover:bg-card-blue-hover",
};

export const CARD_BORDER: Record<PaletteColor, string> = {
  strawberry: "border-strawberry/50 hover:border-strawberry",
  tangerine: "border-tangerine/50 hover:border-tangerine",
  carrot: "border-carrot/50 hover:border-carrot",
  coral: "border-coral/50 hover:border-coral",
  tuscan: "border-carrot/50 hover:border-carrot",
  willow: "border-willow/55 hover:border-willow",
  seagrass: "border-seagrass/50 hover:border-seagrass",
  cyan: "border-cyan/50 hover:border-cyan",
  slate: "border-slate/45 hover:border-slate",
  cerulean: "border-cerulean/50 hover:border-cerulean",
};

export const TAG_ON_CARD: Record<PaletteColor, string> = {
  strawberry: "bg-white/80 text-strawberry",
  tangerine: "bg-white/80 text-tangerine",
  carrot: "bg-white/80 text-carrot",
  coral: "bg-white/80 text-coral",
  tuscan: "bg-white/80 text-carrot",
  willow: "bg-white/80 text-willow",
  seagrass: "bg-white/80 text-seagrass",
  cyan: "bg-white/80 text-cyan",
  slate: "bg-white/80 text-slate",
  cerulean: "bg-white/80 text-cerulean",
};
