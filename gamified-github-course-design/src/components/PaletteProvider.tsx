"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultPalette, palettes, type PaletteKey } from "@/lib/palettes";

const STORAGE_KEY = "gq-palette";

type Ctx = {
  palette: PaletteKey;
  setPalette: (key: PaletteKey) => void;
  cycle: () => void;
};

const PaletteContext = createContext<Ctx | null>(null);

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside <PaletteProvider>");
  return ctx;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteKey>(defaultPalette);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as PaletteKey | null;
    const initial = stored && palettes.some((p) => p.key === stored) ? stored : defaultPalette;
    setPaletteState(initial);
    document.documentElement.dataset.palette = initial;
  }, []);

  const setPalette = useCallback((key: PaletteKey) => {
    setPaletteState(key);
    document.documentElement.dataset.palette = key;
    window.localStorage.setItem(STORAGE_KEY, key);
  }, []);

  const cycle = useCallback(() => {
    setPaletteState((current) => {
      const i = palettes.findIndex((p) => p.key === current);
      const next = palettes[(i + 1) % palettes.length].key;
      document.documentElement.dataset.palette = next;
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <PaletteContext.Provider value={{ palette, setPalette, cycle }}>{children}</PaletteContext.Provider>
  );
}

/** Inline script: sets the palette before first paint so there is no flash. */
export const paletteBootstrapScript = `(function(){try{var k=localStorage.getItem('${STORAGE_KEY}');var ok=['${palettes
  .map((p) => p.key)
  .join("','")}'];document.documentElement.dataset.palette=ok.indexOf(k)>-1?k:'${defaultPalette}';}catch(e){document.documentElement.dataset.palette='${defaultPalette}';}})();`;

/** Compact dot switcher used in the rail and the mobile drawer. */
export function PaletteDots({ stacked = false }: { stacked?: boolean }) {
  const { palette, setPalette } = usePalette();
  return (
    <div className={stacked ? "grid gap-1" : "flex flex-wrap items-center gap-1.5"}>
      {palettes.map((p) => {
        const active = p.key === palette;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => setPalette(p.key)}
            title={`${p.name} — ${p.tagline}`}
            aria-label={`${p.name} palette`}
            aria-pressed={active}
            className={`group flex items-center gap-2 rounded-[3px] border px-2 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition ${
              active
                ? "border-phos/70 bg-phos/12 text-ink"
                : "border-phos/20 text-dim2 hover:border-phos/50 hover:text-body"
            }`}
          >
            <span className="flex shrink-0 overflow-hidden rounded-full border border-black/30">
              {p.swatches.slice(0, 3).map((c) => (
                <span key={c} style={{ backgroundColor: c }} className="h-2.5 w-2.5" />
              ))}
            </span>
            <span>{p.name}</span>
            {active ? <span className="text-phos">✓</span> : null}
          </button>
        );
      })}
    </div>
  );
}
