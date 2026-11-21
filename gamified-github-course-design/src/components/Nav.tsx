"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useGame } from "@/components/GameProvider";
import { Bar } from "@/components/ui";
import { badgeCatalog, branding, modules } from "@/lib/course";
import { PaletteDots } from "@/components/PaletteProvider";
import { BASE_PATH } from "@/lib/site";

function usePath() {
  const pathname = usePathname();
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || "/";
  }
  return pathname;
}

const tabs = [
  { href: "/", label: "overview", file: "README.md", emoji: "▸" },
  { href: "/learn", label: "quest-map", file: "quest-map/", emoji: "▸" },
  { href: "/badges", label: "patches", file: "patches.log", emoji: "▸" },
  { href: "/final-mission", label: "boss", file: "deploy.sh", emoji: "▸" },
  { href: "/instructor", label: "operator", file: "MANUAL", emoji: "▸" },
  { href: "/palettes", label: "palettes", file: "theme.conf", emoji: "▸" },
];

function Readout({ compact = false }: { compact?: boolean }) {
  const { snapshot } = useGame();
  const lvl = snapshot.level;
  return (
    <div className="flex w-full items-center gap-3 rounded-[3px] border border-phos/25 bg-screen2/80 px-3 py-2">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[3px] border border-dashed text-[15px]"
        style={{ borderColor: "var(--p-glow)", color: "phos", textShadow: "0 0 10px var(--p-glow)" }}
      >
        {lvl.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-phos2">
            lvl_{lvl.level} {lvl.name.replace(/\s+/g, "_").toLowerCase()}
          </p>
          <p className="shrink-0 font-display text-[17px] leading-none text-cyan glow-cyan">
            {snapshot.xp}xp
          </p>
        </div>
        <div className="mt-1">
          <Bar percent={lvl.progress} accent="lime" blocks={compact ? 12 : 16} showValue={!compact} />
        </div>
        {!compact ? (
          <p className="mt-1 truncate font-mono text-[9.5px] uppercase tracking-[0.1em] text-dim">
            {lvl.next ? `next: ${lvl.xpToNext}xp → ${lvl.next.name}` : "max_level_reached"} · patches{" "}
            {snapshot.badges.length}/{badgeCatalog.length} · {snapshot.coursePercent}%
          </p>
        ) : null}
      </div>
    </div>
  );
}

function TabRow({ onNavigate, stacked }: { onNavigate?: () => void; stacked?: boolean }) {
  const pathname = usePath();
  return (
    <nav className={stacked ? "grid gap-1" : "flex flex-wrap items-center gap-1"}>
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            onClick={onNavigate}
            className={`btn-term rounded-[3px] border px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] ${
              active
                ? "border-phos bg-phos text-ondark shadow-[0_0_18px_var(--p-glow)]"
                : "border-phos/25 text-dim hover:border-phos/60 hover:text-phos2"
            }`}
          >
            {t.emoji} {t.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Tree({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePath();
  const active = (href: string) => pathname === href;

  return (
    <div className="font-mono text-[12px] leading-[1.9]">
      <Link href="/" onClick={onNavigate} className="block text-phos2 hover:text-phos">
        <span className="text-dim">~/</span>gitquest<span className="caret" />
      </Link>
      {tabs.map((t, i) => {
        const last = i === tabs.length - 1;
        const isMap = t.href === "/learn";
        return (
          <div key={t.href}>
            <Link
              href={t.href}
              onClick={onNavigate}
              className={`flex items-baseline gap-1 hover:text-phos ${
                active(t.href) ? "text-phos" : "text-dim"
              }`}
            >
              <span className="text-dim3">{last ? "└──" : "├──"}</span>
              <span className={active(t.href) ? "glow-phos" : ""}>{t.file}</span>
              {active(t.href) ? <span className="text-[10px] text-cyan">◀ open</span> : null}
            </Link>
            {isMap ? (
              <div className="pl-3">
                {modules.map((m, mi) => {
                  const lastM = mi === modules.length - 1;
                  const on = pathname === `/learn/${m.key}`;
                  return (
                    <Link
                      key={m.key}
                      href={`/learn/${m.key}`}
                      onClick={onNavigate}
                      className={`flex items-baseline gap-1 hover:text-cyan2 ${
                        on ? "text-cyan" : "text-dim"
                      }`}
                    >
                      <span className="text-dim3">
                        {last && lastM ? "    └──" : last ? "    ├──" : "│   ├──"}
                      </span>
                      <span className="truncate">
                        {String(m.index).padStart(2, "0")}.{m.key}_{m.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function SideRail() {
  const { snapshot } = useGame();
  return (
    <aside className="sticky top-0 hidden h-screen w-[268px] shrink-0 flex-col justify-between border-r border-phos/18 bg-panel/85 px-4 py-5 lg:flex">
      <div className="min-h-0 overflow-y-auto pr-1">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="pulse-glow grid h-10 w-10 place-items-center rounded-[3px] border border-phos/50 bg-phos/10 text-[18px]">
            🐙
          </span>
          <span className="leading-none">
            <span className="font-display block text-[24px] leading-none text-ink glow-phos">
              git<span className="text-phos">quest</span>
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
              github_101 · @kdmirah
            </span>
          </span>
        </Link>

        <div className="mt-5">
          <Tree />
        </div>

        <div className="mt-5">
          <Readout />
        </div>

        <div className="mt-4 rounded-[3px] border border-dashed border-phos/22 p-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-dim">
            /etc/theme.conf
          </p>
          <div className="mt-2">
            <PaletteDots stacked />
          </div>
        </div>

        <div className="mt-4 rounded-[3px] border border-dashed border-phos/22 p-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-dim">/etc/house-rules</p>
          <ul className="mt-1.5 space-y-1 font-mono text-[11.5px] leading-snug text-dim2">
            <li># nothing here can break github</li>
            <li># mistakes pay xp (phoenix)</li>
            <li># two new words per level</li>
            <li># hands on keys &gt; eyes on slides</li>
          </ul>
        </div>
      </div>

      <p className="mt-4 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.12em] text-dim">
        user: <span className="text-phos2">{(snapshot.learner.name || branding.learner).toLowerCase().replace(/\s+/g, "_")}</span>
        {snapshot.learner.githubHandle ? (
          <>
            <br />
            handle: <span className="text-cyan2">@{snapshot.learner.githubHandle}</span>
          </>
        ) : null}
      </p>
    </aside>
  );
}

export function TopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePath();
  const current = tabs.find((t) => t.href === pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-phos/20 bg-deep/94 backdrop-blur-sm">
      <div className="flex items-center gap-3 px-3 py-2.5 lg:px-6">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="btn-term rounded-[3px] border border-phos/35 px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-phos2 lg:hidden"
        >
          {open ? "[x] close" : "[ ] tree"}
        </button>

        <p className="hidden min-w-0 items-center gap-2 font-mono text-[11px] lg:flex">
          <span className="text-dim">gitquest@octoverse</span>
          <span className="text-phos glow-phos">:</span>
          <span className="truncate text-cyan2">~/{current ? current.label : "gitquest"}</span>
          <span className="text-phos glow-phos">$</span>
          <span className="caret text-phos" />
        </p>

        <div className="hidden lg:block">
          <TabRow />
        </div>

        <div className="ml-auto w-full max-w-[19rem] lg:ml-0">
          <Readout compact />
        </div>
      </div>

      {open ? (
        <div className="slide-in border-t border-dashed border-phos/25 bg-panel px-4 py-4 lg:hidden">
          <TabRow stacked onNavigate={() => setOpen(false)} />
          <div className="mt-4 rounded-[3px] border border-phos/18 p-3">
            <Tree onNavigate={() => setOpen(false)} />
          </div>
          <div className="mt-3">
            <Readout />
          </div>
          <div className="mt-3 rounded-[3px] border border-dashed border-phos/22 p-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-dim">/etc/theme.conf</p>
            <div className="mt-2">
              <PaletteDots />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-phos/20 bg-deep/80">
      <div className="overflow-hidden border-b border-phos/15 bg-phos/6 py-1.5">
        <div className="ticker-track gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim2">
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup} className="flex gap-6">
              <span>[info] zero_code</span>
              <span>[info] zero_terminal_required</span>
              <span>[ok] 8_levels</span>
              <span>[ok] 12_patches</span>
              <span>[ok] ~1500_xp_available</span>
              <span>[warn] mistakes_pay_xp</span>
              <span>[ok] one_public_repo_by_eof</span>
              <span>[info] browser_only</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-8 px-4 py-9 font-mono text-[12.5px] md:grid-cols-3 lg:px-6">
        <div>
          <p className="font-display text-[26px] leading-none text-ink glow-phos">
            git<span className="text-phos">quest</span>
          </p>
          <p className="mt-3 leading-relaxed text-dim">
            # {branding.edition}
            # A gamified GitHub 101 for people who have
            <br /># never opened a code editor. Six hours
            <br /># of guided play. One browser tab.
            <br /># One published repo at the end.
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-phos2">ls ./levels</p>
          <ul className="mt-2 space-y-1 text-dim">
            {modules.map((m) => (
              <li key={m.key}>
                <Link href={`/learn/${m.key}`} className="hover:text-phos">
                  <span className="text-dim3">├──</span> {String(m.index).padStart(2, "0")}_{m.key} ·{" "}
                  {m.title.toLowerCase()} <span className="text-dim">({m.minutes}m)</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-phos2">cat ./colophon</p>
          <p className="mt-2 leading-relaxed text-dim">
            Built for {branding.school}. Rendered on a simulated CRT: VT323 + IBM Plex Mono. Progress
            is saved in this browser, so you can kill the session mid-mission and resume exactly where
            you left off.
          </p>
          <Link
            href="/instructor"
            className="btn-term mt-4 inline-block rounded-[3px] border border-phos/40 px-3 py-2 text-[10.5px] font-bold uppercase tracking-[0.12em] text-phos2 hover:border-phos"
          >
            ▸ man gitquest --operator
          </Link>
        </div>
      </div>
      <p className="border-t border-dashed border-phos/18 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-dim3 lg:px-6">
        ── {branding.school} · process exited with code 0 · thanks for playing ──
      </p>
    </footer>
  );
}
