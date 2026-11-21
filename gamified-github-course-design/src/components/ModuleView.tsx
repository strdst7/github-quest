"use client";

import Link from "next/link";
import { useGame } from "@/components/GameProvider";
import { ActivityCard, ConceptCard, MissionBoard, QuizBlock } from "@/components/quest";
import { ACCENTS, Bar, Callout, Kicker, Panel, Pill, SimpleTable, Stamp } from "@/components/ui";
import { modules } from "@/lib/course";

export function ModuleView({ moduleKey }: { moduleKey: string }) {
  const { snapshot } = useGame();
  const index = modules.findIndex((m) => m.key === moduleKey);

  if (index === -1) {
    return (
      <Panel title="fatal" className="p-10 text-center">
        <p className="font-display text-[34px] text-magenta2 glow-magenta">
          ERR_PATH_NOT_FOUND
        </p>
        <p className="mt-2 font-mono text-[12.5px] text-dim">
          no such level: <span className="text-ink">{moduleKey}</span>
        </p>
        <Link
          href="/learn"
          className="btn-term mt-5 inline-block rounded-[3px] border border-phos/45 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-phos2 hover:border-phos"
        >
          ← cd ~/quest-map
        </Link>
      </Panel>
    );
  }

  const mod = modules[index];
  const prev = modules[index - 1];
  const next = modules[index + 1];
  const a = ACCENTS[mod.accent];
  const p = snapshot.modules.find((m) => m.key === mod.key);
  const percent = p?.percent ?? 0;

  return (
    <div className="space-y-10">
      {/* ── session header ─────────────────────────────────────────────── */}
      <header className="space-y-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]">
          <Link href="/learn" className="text-dim hover:text-phos">
            ~/quest-map
          </Link>
          <span className="text-dim3">/</span>
          <span className={a.text}>level_{String(mod.index).padStart(2, "0")}</span>
          <span className="h-px flex-1 border-t border-dashed border-phos/25" />
          <span className="text-dim">
            {mod.minutes}m · {mod.level}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Kicker accent={mod.accent}>
              {mod.emoji} {mod.subtitle}
            </Kicker>
            <h1
              className={`font-display mt-3 text-[clamp(2.6rem,7.5vw,4.8rem)] leading-[0.92] text-ink ${a.glowClass}`}
            >
              {mod.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Pill>🔤 {mod.concepts.length} man pages</Pill>
              <Pill>🛠 {mod.activities.length} tasks</Pill>
              <Pill>🎯 {mod.mission.items.length} checks</Pill>
              <Pill>🧠 {mod.quiz.length} questions</Pill>
              <Pill className={a.chip}>🏅 {mod.achievement.title}</Pill>
            </div>
          </div>

          <div className="flex items-end gap-4">
            <div className="w-48">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-dim">
                level_progress
              </p>
              <p className="font-display mt-1 text-[38px] leading-none text-ink">{percent}%</p>
              <div className="mt-2">
                <Bar percent={percent} accent={mod.accent} blocks={16} showValue={false} />
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                steps {p?.done ?? 0}/{p?.total ?? 0} · xp {p?.earnedXp ?? 0}/{p?.maxXp ?? 0}
              </p>
            </div>
            <Stamp size="lg" className={p?.complete ? "border-phos text-phos2 glow-phos" : "border-amber/70 text-amber2"}>
              <span className="grid place-items-center text-center leading-tight">
                <span className="text-[22px]">{p?.complete ? "✓" : "…"}</span>
                <span className="mt-0.5">{p?.complete ? "cleared" : "running"}</span>
              </span>
            </Stamp>
          </div>
        </div>
      </header>

      {/* ── story ──────────────────────────────────────────────────────── */}
      <Panel
        title={<span><span className="text-cyan">$</span> cat ./story.txt</span>}
        right={<span className="text-dim">{mod.key}.story</span>}
      >
        <p className="p-5 font-mono text-[14px] italic leading-relaxed text-body">
          <span className={a.text}>»</span> {mod.hook}
          <span className="caret ml-1" />
        </p>
      </Panel>

      {/* ── objectives ─────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em]">
          <span className={a.text}>┌─[</span>
          <span className={a.text}>objectives</span>
          <span className={a.text}>]</span>
          <span className="h-px flex-1 border-t border-dashed border-phos/25" />
        </div>
        <h2 className="font-display mt-2 text-[30px] leading-none text-ink">
          on exit you can…
        </h2>
        <ol className="mt-4 grid gap-2 md:grid-cols-2">
          {mod.objectives.map((o, i) => (
            <li key={o} className="term-flat flex items-start gap-3 px-3.5 py-2.5">
              <span
                className="mt-[1px] shrink-0 font-mono text-[11px] font-bold"
                style={{ color: a.hex, textShadow: `0 0 10px ${a.hex}66` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] leading-relaxed text-body">{o}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ── man pages ──────────────────────────────────────────────────── */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-dashed border-phos/25 pb-3">
          <div>
            <h2 className="font-display text-[30px] leading-none text-ink">
              $ man <span className={a.text}>--list</span>
            </h2>
            <p className="mt-2 max-w-2xl font-mono text-[12.5px] leading-relaxed text-dim">
              # read the plain-english line, then the analogy, then say the last one out loud.
              # tick it when it clicks — 10xp each.
            </p>
          </div>
          <Pill className={a.chip}>{mod.concepts.length * 10}xp available</Pill>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mod.concepts.map((c, i) => (
            <ConceptCard key={c.id} moduleKey={mod.key} concept={c} accent={mod.accent} n={i + 1} />
          ))}
        </div>
      </section>

      {/* ── tasks ──────────────────────────────────────────────────────── */}
      <section>
        <div className="border-b border-dashed border-phos/25 pb-3">
          <h2 className="font-display text-[30px] leading-none text-ink">
            $ run <span className={a.text}>./tasks</span> --hands-on
          </h2>
          <p className="mt-2 max-w-3xl font-mono text-[12.5px] leading-relaxed text-dim">
            # everything happens in your browser at github.com — no installs, no terminal on your own
            # machine. tick each step, then bank 15xp when the task finishes.
          </p>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {mod.activities.map((act, i) => (
            <ActivityCard
              key={act.id}
              moduleKey={mod.key}
              activity={act}
              accent={mod.accent}
              number={i + 1}
            />
          ))}
        </div>
      </section>

      {/* ── mission ────────────────────────────────────────────────────── */}
      <section>
        <MissionBoard module={mod} accent={mod.accent} />
      </section>

      {/* ── diagnostic ─────────────────────────────────────────────────── */}
      <section>
        <QuizBlock module={mod} accent={mod.accent} />
      </section>

      {/* ── packing list ───────────────────────────────────────────────── */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title={<span><span className="text-phos">$</span> cat must-know.txt</span>} accent="lime">
          <ul className="space-y-1.5 p-4">
            {mod.mustKnow.map((m) => (
              <li key={m} className="flex items-start gap-2.5 font-mono text-[12.5px] leading-relaxed text-phos2">
                <span className="text-phos">[+]</span>
                {m}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={<span><span className="text-amber">$</span> cat defer.txt</span>} accent="gold">
          <ul className="space-y-1.5 p-4">
            {mod.niceToKnow.map((m) => (
              <li key={m} className="flex items-start gap-2.5 font-mono text-[12.5px] leading-relaxed text-amber2">
                <span className="text-amber">[~]</span>
                {m}
              </li>
            ))}
          </ul>
        </Panel>
      </section>

      {/* ── deliverables ───────────────────────────────────────────────── */}
      <section>
        <h2 className="font-display text-[30px] leading-none text-ink">
          $ ls <span className={a.text}>./deliverables</span> -l
        </h2>
        <div className="mt-4">
          <SimpleTable
            head={["task", "mode", "time", "output"]}
            rows={mod.activities.map((act) => [
              act.title,
              act.mode.toLowerCase(),
              `${act.minutes}m`,
              act.deliverable,
            ])}
          />
        </div>
      </section>

      {/* ── operator notes ─────────────────────────────────────────────── */}
      <section>
        <Callout emoji="🎒" title="man gitquest --operator (this level)" accent="violet">
          <ul className="space-y-1.5">
            {mod.instructorNotes.map((n) => (
              <li key={n}># {n}</li>
            ))}
          </ul>
        </Callout>
      </section>

      {/* ── exit ───────────────────────────────────────────────────────── */}
      <section>
        <Panel
          className={p?.complete ? "border-amber/60" : ""}
          title={<span><span className="text-amber">$</span> ./unlock --achievement</span>}
          right={<span className="text-dim">exit {p?.complete ? 0 : 1}</span>}
        >
          <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{p?.complete ? mod.emoji : "🔒"}</span>
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
                  achievement
                </p>
                <h3
                  className={`font-display text-[30px] leading-none ${
                    p?.complete ? "text-amber2 glow-amber" : "text-ink"
                  }`}
                >
                  {mod.achievement.title}
                </h3>
                <p className="mt-1.5 max-w-lg font-mono text-[12.5px] leading-relaxed text-dim">
                  {mod.achievement.blurb}
                </p>
                <p
                  className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ color: p?.complete ? a.hex : "dim" }}
                >
                  {p?.complete ? `✓ stamped · ${mod.mission.reward}` : "locked · clear this level to unlock"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:flex-col md:items-stretch">
              {prev ? (
                <Link
                  href={`/learn/${prev.key}`}
                  className="btn-term rounded-[3px] border border-phos/30 px-4 py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-dim hover:border-phos/70 hover:text-phos2"
                >
                  ← {prev.key} {prev.title}
                </Link>
              ) : (
                <Link
                  href="/learn"
                  className="btn-term rounded-[3px] border border-phos/30 px-4 py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-dim hover:border-phos/70 hover:text-phos2"
                >
                  ← ~/quest-map
                </Link>
              )}
              {next ? (
                <Link
                  href={`/learn/${next.key}`}
                  className="btn-term rounded-[3px] border px-5 py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.1em] shadow-[0_0_24px_var(--p-glow)]"
                  style={{ backgroundColor: a.hex, borderColor: a.hex, color: "ondark" }}
                >
                  ▶ next: {next.key} {next.title}
                </Link>
              ) : (
                <Link
                  href="/final-mission"
                  className="btn-term rounded-[3px] border border-amber bg-amber px-5 py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ondark shadow-[0_0_24px_var(--p-glow-amber)]"
                >
                  ▶ ./deploy.sh boss scoreboard
                </Link>
              )}
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
