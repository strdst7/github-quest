"use client";

import Link from "next/link";
import { useGame } from "@/components/GameProvider";
import { ACCENTS, Bar, Kicker, Panel, Pill, SectionTitle, SimpleTable, Stat } from "@/components/ui";
import { badgeCatalog, glossary, levels, modules, storyline } from "@/lib/course";

export default function BadgesPage() {
  const { snapshot } = useGame();
  const earned = new Set(snapshot.badges);
  const secret = badgeCatalog.filter((b) => b.rarity === "Secret");
  const foundSecret = secret.filter((b) => earned.has(b.key)).length;

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <SectionTitle
          kicker="patches.log"
          title={<>$ tail -f <span className="text-amber glow-amber">./patches.log</span></>}
          sub="Patches are derived from what you actually did, so they can never be lost, faked, or awarded by accident. Locked patches print the exact condition to unlock them."
          accent="gold"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={`${earned.size}/${badgeCatalog.length}`} label="patches earned" emoji="🏅" accent="gold" />
          <Stat value={`${snapshot.level.level}/8`} label="level" emoji={snapshot.level.emoji} accent="violet" />
          <Stat value={snapshot.xp} label="total xp" emoji="✦" accent="lime" />
          <Stat value={`${foundSecret}/${secret.length}`} label="secret found" emoji="◈" accent="coral" />
        </div>
      </section>

      {/* ── patch wall ─────────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <Kicker accent="lime">▾ the wall</Kicker>
          <span className="h-px flex-1 border-t border-dashed border-phos/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
            {earned.size} earned · {badgeCatalog.length - earned.size} locked
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {badgeCatalog.map((b) => {
            const has = earned.has(b.key);
            const source = modules.find((m) => m.achievement.badgeKey === b.key);
            const color =
              b.rarity === "Secret" ? "magenta" : b.rarity === "Epic" ? "amber" : b.rarity === "Rare" ? "violet" : "phos";
            return (
              <div
                key={b.key}
                className={`term term-hover relative overflow-hidden p-4 ${has ? "" : "opacity-80"}`}
                style={has ? { borderColor: `${color}88`, boxShadow: `0 0 26px ${color}22, inset 0 0 40px ${color}0d` } : undefined}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="grid h-[70px] w-[70px] -rotate-6 place-items-center rounded-[3px] border-2 border-dashed text-center"
                    style={{ borderColor: has ? color : "var(--p-glow-dim)" }}
                  >
                    <span className="grid place-items-center leading-tight">
                      <span className={`text-[24px] ${has ? "" : "opacity-40 grayscale"}`}>{has ? b.emoji : "🔒"}</span>
                      <span
                        className="mt-0.5 font-mono text-[8.5px] font-bold uppercase tracking-[0.1em]"
                        style={{ color: has ? color : "dim" }}
                      >
                        {has ? "earned" : "locked"}
                      </span>
                    </span>
                  </span>
                  <Pill
                    className={
                      b.rarity === "Secret"
                        ? "border-magenta/50 text-magenta2"
                        : b.rarity === "Epic"
                          ? "border-amber/50 text-amber2"
                          : b.rarity === "Rare"
                            ? "border-violet/50 text-violet2"
                            : ""
                    }
                  >
                    {b.rarity}
                  </Pill>
                </div>

                <h3
                  className="font-display mt-3 text-[24px] leading-none"
                  style={{ color: has ? "ink" : "dim2", textShadow: has ? `0 0 14px ${color}55` : undefined }}
                >
                  {b.title}
                </h3>
                <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-dim">{b.blurb}</p>

                <div className="mt-3 border-t border-dashed border-phos/18 pt-3">
                  {has ? (
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
                      [x] written to db · src: {b.from}
                    </p>
                  ) : (
                    <>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">
                        unlock_if: {b.from}
                      </p>
                      {source ? (
                        <Link
                          href={`/learn/${source.key}`}
                          className="btn-term mt-2 inline-block rounded-[3px] border border-phos/35 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-phos2 hover:border-phos"
                        >
                          ▶ cd {source.key} {source.title}
                        </Link>
                      ) : (
                        <p className="mt-2 font-mono text-[11px] leading-relaxed text-dim">
                          {b.key === "cartographer"
                            ? "# complete every step of every level — the 100% run."
                            : "# earned by behaviour, not by a checklist. keep playing."}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ladder ─────────────────────────────────────────────────────── */}
      <section>
        <SectionTitle
          kicker="rank"
          title="the ladder to legend"
          accent="violet"
          sub={
            snapshot.level.next
              ? `you are lvl_${snapshot.level.level} — ${snapshot.level.name}. ${snapshot.level.xpToNext} xp until lvl_${snapshot.level.next.level} ${snapshot.level.next.name}.`
              : "you are lvl_8 — Octoverse Legend. top of the ladder. go teach someone else level 01."
          }
        />
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {levels.map((l) => {
            const reached = snapshot.xp >= l.minXp;
            const isCurrent = snapshot.level.level === l.level;
            return (
              <div
                key={l.level}
                className={`relative rounded-[3px] border p-4 ${
                  isCurrent
                    ? "border-phos bg-phos/8 shadow-[0_0_26px_var(--p-glow)]"
                    : reached
                      ? "border-phos/30 bg-screen/70"
                      : "border-dashed border-phos/18 bg-screen2/50"
                }`}
              >
                {isCurrent ? (
                  <span className="absolute -top-2 right-2 rounded-[2px] border border-phos bg-ondark px-2 py-[1px] font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-phos2">
                    ◀ you are here
                  </span>
                ) : null}
                <div className="flex items-center gap-2">
                  <span className={`text-[20px] ${reached ? "" : "opacity-40 grayscale"}`}>{l.emoji}</span>
                  <p className={`font-display text-[22px] leading-none ${reached ? "text-ink" : "text-dim"}`}>
                    lvl_{String(l.level).padStart(2, "0")}
                  </p>
                </div>
                <p className={`mt-1 font-mono text-[11.5px] uppercase tracking-[0.1em] ${reached ? "text-phos2" : "text-dim"}`}>
                  {l.name}
                </p>
                <p className="mt-2 font-mono text-[11.5px] leading-relaxed text-dim">{l.note}</p>
                <div className="mt-3">
                  <Bar percent={Math.min(100, (snapshot.xp / l.minXp) * 100)} accent={reached ? "lime" : "violet"} blocks={12} showValue={false} />
                  <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">
                    {reached ? "[x] reached" : `requires ${l.minXp}xp`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── appendices ─────────────────────────────────────────────────── */}
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title={<span><span className="text-phos">$</span> man github</span>} right="appendix a">
          <div className="p-4">
            <p className="font-mono text-[12px] text-dim">
              # every word this course uses, one sentence each, plain english. print it. stick it beside
              # your screen. nothing else is required vocabulary.
            </p>
            <div className="mt-4">
              <SimpleTable
                head={["term", "what it actually means"]}
                rows={glossary.map((g) => [
                  <span key={g.term} className="whitespace-nowrap font-bold text-phos2">
                    {g.term}
                  </span>,
                  g.say,
                ])}
              />
            </div>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title={<span><span className="text-cyan">$</span> cat ./story.txt</span>} accent="aqua" right="appendix b">
            <div className="p-4">
              <p className="font-mono text-[12.5px] leading-relaxed text-body">{storyline.premise}</p>
              <div className="mt-4 grid gap-2">
                {storyline.mechanics.map((m) => (
                  <div key={m.name} className="term-flat p-3">
                    <p className="font-mono text-[12px] font-bold text-amber2">{m.name}</p>
                    <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-dim">{m.how}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title={<span><span className="text-amber">$</span> ./status --levels</span>} accent="gold" right="appendix c">
            <div className="space-y-3 p-4">
              {modules.map((m) => {
                const p = snapshot.modules.find((x) => x.key === m.key);
                const a = ACCENTS[m.accent];
                return (
                  <div key={m.key}>
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/learn/${m.key}`}
                        className="font-mono text-[12.5px] text-ink hover:text-phos hover:underline"
                      >
                        {m.emoji} {String(m.index).padStart(2, "0")}_{m.key} · {m.title.toLowerCase()}
                      </Link>
                      <span
                        className={`shrink-0 font-mono text-[10px] font-bold ${
                          p?.complete ? "text-phos2" : "text-dim"
                        }`}
                      >
                        {p?.percent ?? 0}%
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <Bar percent={p?.percent ?? 0} accent={m.accent} blocks={26} showValue={false} />
                    </div>
                    <p className={`mt-1 font-mono text-[9.5px] uppercase tracking-[0.1em] ${a.text}`}>
                      {p?.complete ? `[x] ${m.achievement.title} written` : `reward: ${m.mission.reward}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      </section>
    </div>
  );
}
