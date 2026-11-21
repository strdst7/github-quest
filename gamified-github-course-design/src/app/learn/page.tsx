"use client";

import Link from "next/link";
import { useGame } from "@/components/GameProvider";
import { PlayerCard } from "@/components/quest";
import { ACCENTS, Bar, Kicker, Panel, Pill, SectionTitle, SimpleTable, Stamp, Stat } from "@/components/ui";
import { badgeCatalog, guildQuests, modules } from "@/lib/course";

export default function LearnPage() {
  const { snapshot, world, leaderboard } = useGame();
  const byKey = Object.fromEntries(snapshot.modules.map((m) => [m.key, m]));

  return (
    <div className="space-y-12">
      {/* ── status ─────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionTitle
          kicker="quest-map"
          title={<>$ ./map <span className="text-phos glow-phos">--status</span></>}
          sub="Tick things off as you do them. Progress is written straight to your traveller record, so you can kill the session mid-mission and resume exactly where you left off."
          accent="lime"
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Stat value={`${snapshot.coursePercent}%`} label="expedition" emoji="▤" accent="lime" />
          <Stat value={snapshot.xp} label="xp banked" emoji="✦" accent="gold" />
          <Stat value={`${snapshot.level.level}/8`} label="level" emoji={snapshot.level.emoji} accent="violet" />
          <Stat value={`${snapshot.badges.length}/${badgeCatalog.length}`} label="patches" emoji="🏅" accent="coral" />
          <Stat value={snapshot.modules.filter((m) => m.complete).length} label="cleared" emoji="✓" accent="aqua" />
        </div>

        <Panel
          title={<span><span className="text-phos">$</span> cat /proc/self/rank</span>}
          right={<span className="text-dim">pid {snapshot.learner.id.slice(0, 6)}</span>}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">current rank</p>
              <p className="font-display mt-1 text-[34px] leading-none text-ink glow-phos">
                {snapshot.level.emoji} lvl_{snapshot.level.level} — {snapshot.level.name}
              </p>
              <p className="mt-1 font-mono text-[12.5px] text-dim">{snapshot.level.note}</p>
            </div>
            <div className="w-full max-w-xs">
              <Bar percent={snapshot.level.progress} accent="gold" blocks={22} />
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-dim">
                {snapshot.level.next
                  ? `next: ${snapshot.level.xpToNext}xp → lvl_${snapshot.level.next.level} ${snapshot.level.next.name}`
                  : "max_level_reached 👑"}
              </p>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── the trail ──────────────────────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <Kicker accent="coral">▾ follow the trail</Kicker>
          <span className="h-px flex-1 border-t border-dashed border-phos/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
            {modules.length} nodes
          </span>
        </div>

        <div className="space-y-3">
          {modules.map((m, i) => {
            const a = ACCENTS[m.accent];
            const p = byKey[m.key];
            const percent = p?.percent ?? 0;
            const done = p?.complete ?? false;
            const isBoss = m.key === "m8";
            const last = i === modules.length - 1;

            return (
              <div key={m.key} className="relative pl-6 sm:pl-9">
                <span
                  className="absolute left-0 top-0 hidden font-mono text-[13px] leading-[1.6] text-dim3 sm:block"
                  aria-hidden
                >
                  {last ? "└─" : "├─"}
                </span>
                {!last ? (
                  <span
                    className="absolute left-[5px] top-6 hidden h-[calc(100%+0.4rem)] w-px bg-line sm:block"
                    aria-hidden
                  />
                ) : null}

                <Panel
                  tone="raised"
                  className={done ? a.border : ""}
                  title={
                    <span>
                      <span className={done ? "text-phos" : a.text}>
                        [{String(m.index).padStart(2, "0")}]
                      </span>
                      <span className="ml-2 text-ink">
                        {m.key}_{m.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}
                      </span>
                      <span className="ml-2 text-dim">{m.subtitle}</span>
                    </span>
                  }
                  right={
                    <span className={done ? "text-phos2" : "text-dim"}>
                      {done ? "✓ cleared" : percent > 0 ? `${percent}%` : "not started"}
                    </span>
                  }
                >
                  <div className="flex flex-wrap items-start gap-4 p-4">
                    <span
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-[3px] border text-[26px]"
                      style={{
                        borderColor: a.hex,
                        color: a.hex,
                        textShadow: `0 0 14px ${a.hex}`,
                        boxShadow: done ? `0 0 22px ${a.hex}44` : undefined,
                      }}
                    >
                      {m.emoji}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`font-display text-[28px] leading-none ${a.text} ${a.glowClass}`}>
                          {m.title}
                        </h3>
                        {isBoss ? <Pill className={a.chip}>boss</Pill> : null}
                        <Pill>{m.minutes}m</Pill>
                        {percent > 0 && !done ? (
                          <Pill className="border-amber/50 text-amber2">running</Pill>
                        ) : null}
                      </div>
                      <p className="mt-2 max-w-2xl border-l-2 border-dashed border-phos/25 pl-3 font-mono text-[12px] italic leading-relaxed text-dim">
                        “{m.hook}”
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                        <span>🔤 {m.concepts.length} man pages</span>
                        <span>🛠 {m.activities.length} tasks</span>
                        <span>🎯 {m.mission.items.length} checks</span>
                        <span>🧠 {m.quiz.length} questions</span>
                        <span style={{ color: a.hex }}>🏅 {m.achievement.title}</span>
                      </div>
                    </div>

                    <div className="w-full shrink-0 sm:w-52">
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                          steps {p?.done ?? 0}/{p?.total ?? 0}
                        </span>
                        <span className="font-display text-[19px] leading-none text-ink">{percent}%</span>
                      </div>
                      <div className="mt-2">
                        <Bar percent={percent} accent={m.accent} blocks={14} showValue={false} />
                      </div>
                      <Link
                        href={`/learn/${m.key}`}
                        className={`btn-term mt-3 block rounded-[3px] border px-4 py-2.5 text-center font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] ${
                          done
                            ? a.chip
                            : "border-phos bg-phos text-ondark shadow-[0_0_22px_var(--p-glow)]"
                        }`}
                      >
                        {done ? "↺ replay" : percent > 0 ? "▶ continue" : isBoss ? "▶ enter boss" : "▶ start"}
                      </Link>
                    </div>
                  </div>
                </Panel>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── records ────────────────────────────────────────────────────── */}
      <section className="grid gap-5 lg:grid-cols-3">
        <PlayerCard />

        <Panel title={<span><span className="text-cyan">$</span> cat /proc/octoverse</span>} accent="aqua">
          <div className="p-4">
            <p className="font-mono text-[12px] text-dim">
              # live numbers from every traveller on this instance
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat value={world.players} label="travellers" emoji="◉" accent="violet" />
              <Stat value={world.stepsCompleted} label="steps ticked" emoji="✓" accent="lime" />
              <Stat value={world.badgesAwarded} label="patches" emoji="🏅" accent="gold" />
              <Stat value={world.xpBanked} label="xp worldwide" emoji="✦" accent="coral" />
            </div>
            <div className="mt-4">
              <Bar
                percent={world.totalSteps ? (world.stepsCompleted / (world.totalSteps * Math.max(1, world.players))) * 100 : 0}
                accent="aqua"
                blocks={20}
              />
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                global completion index
              </p>
            </div>
          </div>
        </Panel>

        <Panel title={<span><span className="text-amber">$</span> top -o xp -n 8</span>} accent="gold">
          <div className="p-4">
            {leaderboard.length === 0 ? (
              <p className="font-mono text-[12.5px] text-dim">
                # no processes running. tick your first man page and you'll be pid 1.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <SimpleTable
                  head={["pid", "user", "xp"]}
                  rows={leaderboard.map((row, i) => [
                    String(i + 1).padStart(2, "0"),
                    <span key={row.id}>
                      <span className="text-ink">
                        {row.level.emoji} {(row.name || "rookie").toLowerCase().replace(/\s+/g, "_")}
                      </span>
                      <span className="block text-[10.5px] text-dim">
                        {row.handle ? `@${row.handle} · ` : ""}lvl_{row.level.level} {row.level.name}
                      </span>
                    </span>,
                    <span key={`${row.id}-xp`} className="font-display text-[18px] text-phos2">
                      {row.xp}
                    </span>,
                  ])}
                />
              </div>
            )}
          </div>
        </Panel>
      </section>

      {/* ── guild quests ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionTitle
          kicker="optional · team play"
          title="$ ./guild --quests"
          sub="Five short team challenges. Brilliant in a classroom or with a study buddy; entirely skippable if you're travelling solo."
          accent="violet"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guildQuests.map((g) => (
            <Panel
              key={g.key}
              tone="raised"
              title={<span><span className="text-violet">▸</span> {g.key}</span>}
              accent="violet"
              right={<span className="text-dim">{g.time}</span>}
            >
              <div className="p-4">
                <p className="text-[26px]">{g.emoji}</p>
                <h3 className="font-display mt-1 text-[24px] leading-none text-ink">{g.title}</h3>
                <p className="mt-2 font-mono text-[12px] leading-relaxed text-dim">{g.brief}</p>
                <p className="mt-3 rounded-[3px] border border-cyan/30 bg-cyan/8 p-2.5 font-mono text-[11.5px] text-cyan2">
                  <span className="text-[10px] uppercase tracking-[0.12em] text-cyan2">win: </span>
                  {g.win}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>👥 {g.people}</Pill>
                  <Pill className="border-violet/40 text-violet2">{g.skills}</Pill>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </section>

      {/* ── legend ─────────────────────────────────────────────────────── */}
      <section>
        <Panel title={<span><span className="text-phos">$</span> ./map --legend</span>}>
          <div className="grid gap-4 p-5 md:grid-cols-4">
            {[
              { k: "[ ]", v: "step not yet ticked", c: "text-dim" },
              { k: "[x]", v: "step ticked, xp banked", c: "text-phos" },
              { k: "✓ cleared", v: "every step in the level done", c: "text-cyan2" },
              { k: "🏅 patch", v: "achievement written to your record", c: "text-amber2" },
            ].map((l) => (
              <div key={l.k} className="term-flat p-3">
                <p className={`font-mono text-[15px] font-bold ${l.c}`}>{l.k}</p>
                <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-dim">{l.v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-dashed border-phos/20 px-5 py-4">
            <p className="font-mono text-[11.5px] text-dim">
              # stuck? every level prints its own <span className="text-violet2">!! recover</span> box.
            </p>
            <Stamp size="sm" className="border-phos/60 text-phos2">
              go
            </Stamp>
          </div>
        </Panel>
      </section>
    </div>
  );
}
