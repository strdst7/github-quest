"use client";

import Link from "next/link";
import { usePalette } from "@/components/PaletteProvider";
import { PaletteDots } from "@/components/PaletteProvider";
import { Bar, Kicker, Panel, Pill, SectionTitle, SimpleTable } from "@/components/ui";
import { palettes } from "@/lib/palettes";

export default function PalettesPage() {
  const { palette, setPalette } = usePalette();

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Kicker accent="lime">▸ theme.conf</Kicker>
          <Pill>{palettes.length} palettes</Pill>
          <Pill>saved to localStorage</Pill>
          <Pill>one attribute swap</Pill>
        </div>

        <SectionTitle
          kicker="man gitquest --theme"
          title={<>explore the <span className="text-phos">palettes</span></>}
          sub="Every colour in the app resolves through a token (phos, cyan, amber, magenta, violet, ink, dim, line, screen…). Picking a palette rewrites those tokens — no page reload, no rebuild. Your choice is remembered on this device."
          accent="lime"
        />

        <Panel title={<span><span className="text-phos">$</span> ./theme --list --preview</span>} right={`active: ${palette}`}>
          <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
            {palettes.map((p) => {
              const active = p.key === palette;
              return (
                <div
                  key={p.key}
                  className={`relative overflow-hidden rounded-[3px] border p-4 transition ${
                    active ? "border-phos" : "border-phos/20 hover:border-phos/50"
                  }`}
                  style={{ backgroundColor: p.bg, boxShadow: active ? `0 0 26px ${p.fg}44` : undefined }}
                >
                  {active ? (
                    <span className="absolute right-2 top-2 rounded-[2px] border border-current px-2 py-[1px] font-mono text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: p.fg }}>
                      active
                    </span>
                  ) : null}

                  <p className="font-mono text-[9.5px] uppercase tracking-[0.16em]" style={{ color: p.fg, opacity: 0.75 }}>
                    {p.mode} · {p.key}
                  </p>
                  <p className="font-display text-[30px] leading-none" style={{ color: p.fg, textShadow: `0 0 14px ${p.fg}55` }}>
                    {p.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px]" style={{ color: p.fg, opacity: 0.8 }}>
                    {p.tagline}
                  </p>

                  {/* mini terminal preview */}
                  <div className="mt-3 rounded-[3px] border p-2.5" style={{ borderColor: `${p.fg}55`, backgroundColor: `${p.bg}` }}>
                    <p className="font-mono text-[10.5px]" style={{ color: p.fg }}>
                      ~/gitquest$ ./start.sh
                    </p>
                    <p className="mt-0.5 font-mono text-[10.5px]" style={{ color: p.swatches[1] }}>
                      [ok] level_01 unlocked
                    </p>
                    <p className="mt-0.5 font-mono text-[10.5px]" style={{ color: p.swatches[2] }}>
                      [warn] mistakes pay xp
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span
                          key={i}
                          className="h-2 flex-1 rounded-[1px]"
                          style={{ backgroundColor: i < 7 ? p.fg : `${p.fg}33` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex gap-1.5">
                    {p.swatches.map((c) => (
                      <span key={c} className="h-4 flex-1 rounded-[2px] border border-black/20" style={{ backgroundColor: c }} />
                    ))}
                  </div>

                  <p className="mt-3 font-mono text-[10.5px] leading-relaxed" style={{ color: p.fg, opacity: 0.7 }}>
                    vibe: {p.vibe}
                  </p>
                  <p className="mt-1 font-mono text-[10.5px] leading-relaxed" style={{ color: p.fg, opacity: 0.7 }}>
                    best: {p.bestFor}
                  </p>

                  <button
                    type="button"
                    onClick={() => setPalette(p.key)}
                    disabled={active}
                    className="mt-3 w-full rounded-[3px] border px-3 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] transition disabled:opacity-70"
                    style={
                      active
                        ? { borderColor: p.fg, color: p.fg, backgroundColor: `${p.fg}18` }
                        : { borderColor: `${p.fg}66`, color: p.fg }
                    }
                  >
                    {active ? "✓ in use" : "▸ apply palette"}
                  </button>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title={<span><span className="text-cyan">$</span> ./theme --current</span>} accent="aqua">
          <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">quick switch</p>
              <div className="mt-2">
                <PaletteDots />
              </div>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
                live components
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Pill className="border-phos/45 text-phos2">[+] phos</Pill>
                  <Pill className="border-cyan/45 text-cyan2">[+] cyan</Pill>
                  <Pill className="border-amber/50 text-amber2">[~] amber</Pill>
                  <Pill className="border-magenta/50 text-magenta2">!! magenta</Pill>
                  <Pill className="border-violet/45 text-violet2">▸ violet</Pill>
                </div>
                <Bar percent={68} accent="lime" />
                <Bar percent={42} accent="aqua" blocks={14} />
                <Bar percent={86} accent="gold" blocks={10} />
                <div className="term-flat p-3 font-mono text-[11.5px] leading-relaxed text-body">
                  <span className="text-phos">[ok]</span> this panel renders the active palette
                  <br />
                  <span className="text-amber">[warn]</span> tokens update instantly
                  <br />
                  <span className="text-magenta">[fail]</span> nothing here can break github
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
                how the trick works
              </p>
              <div className="mt-2">
                <SimpleTable
                  head={["token", "role"]}
                  rows={[
                    ["phos", "primary accent: progress, ticks, links, stamps"],
                    ["cyan / violet", "secondary: diagnostics, quotes, guild"],
                    ["amber", "warnings, rewards, boss level"],
                    ["magenta", "danger, restart, phoenix protocol"],
                    ["ink / body / dim", "three levels of text contrast"],
                    ["line / dim3", "hairlines, dashed rules, faint chrome"],
                    ["void / screen / panel", "page, terminal body, raised chrome"],
                  ]}
                />
              </div>
              <p className="mt-4 rounded-[3px] border border-dashed border-phos/25 bg-phos/5 p-3 font-mono text-[11.5px] leading-relaxed text-dim">
                # implementation: <span className="text-phos2">@theme</span> maps Tailwind colours to{" "}
                <span className="text-phos2">var(--p-*)</span>;
                <br /># each palette is a block of those vars on{" "}
                <span className="text-phos2">[data-palette=&quot;key&quot;]</span>.
                <br /># the switcher only flips one attribute on &lt;html&gt;.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/learn"
                  className="btn-term rounded-[3px] border border-phos bg-phos px-4 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-ondark"
                >
                  ▶ back to the quest map
                </Link>
                <Link
                  href="/"
                  className="btn-term rounded-[3px] border border-phos/35 px-4 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-phos2 hover:border-phos"
                >
                  ▸ course overview
                </Link>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title={<span><span className="text-amber">$</span> ./theme --recommend</span>} accent="gold">
          <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              { who: "dark classroom, projector", pick: "Phosphor or Cyber", why: "maximum glow and contrast on black; Cyber is the loudest." },
              { who: "long reading, low fatigue", pick: "Amber", why: "warm monochrome is the gentlest dark palette on the eyes." },
              { who: "accessibility first", pick: "Paper", why: "dark ink on white — highest contrast, no glow, prints clean." },
              { who: "bright room, printed hand-outs", pick: "Gameboy", why: "light LCD green reads well on paper and cheap projectors." },
              { who: "younger cohort / club", pick: "Synth or Gameboy", why: "playful without hurting legibility." },
              { who: "screenshots for social", pick: "Cyber or Synth", why: "the palettes that photograph best at small sizes." },
            ].map((r) => (
              <div key={r.who} className="term-flat p-3.5">
                <p className="font-mono text-[12px] font-bold text-ink">{r.who}</p>
                <p className="mt-1 font-mono text-[13px] text-phos2">→ {r.pick}</p>
                <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-dim">{r.why}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}
