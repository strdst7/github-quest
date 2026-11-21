"use client";

import { useMemo, useState } from "react";
import { useGame } from "@/components/GameProvider";
import { ACCENTS, Bar, Checkbox, Panel, Pill, type Accent } from "@/components/ui";
import { activityKey, conceptKey, moduleStats } from "@/lib/game";
import type { Activity, Concept, Module, QuizQuestion } from "@/lib/course";

/* ── man pages ────────────────────────────────────────────────────────────── */

export function ConceptCard({
  moduleKey,
  concept,
  accent,
  n,
}: {
  moduleKey: string;
  concept: Concept;
  accent: Accent;
  n: number;
}) {
  const { snapshot, toggle, busy } = useGame();
  const key = conceptKey(moduleKey, concept.id);
  const done = snapshot.completed.includes(key);
  const a = ACCENTS[accent];

  return (
    <Panel
      className={`flex h-full flex-col ${done ? a.border : ""}`}
      title={
        <span>
          <span className="text-dim">man</span>{" "}
          <span className="text-ink">{concept.id}</span>
          <span className="ml-2 text-dim">#{n}</span>
        </span>
      }
      right={<span className={done ? a.text : "text-dim"}>{done ? "✓ 10xp" : "10xp"}</span>}
    >
      <div className="flex flex-1 flex-col p-4">
        <h4 className={`font-display text-[24px] leading-none ${a.text} ${a.glowClass}`}>
          {concept.emoji} {concept.term}
        </h4>
        <p className="mt-2.5 text-[13px] leading-relaxed text-body">{concept.plain}</p>

        <div className="mt-3 rounded-[3px] border border-dashed border-amber/40 bg-amber/8 p-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-amber2">
            # analogize
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-amber2">{concept.analogy}</p>
        </div>

        <div className="mt-2.5 rounded-[3px] border border-phos/22 bg-phos/6 p-3">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">
            $ echo &quot;say it out loud&quot;
          </p>
          <p className="mt-1 text-[12.5px] italic leading-relaxed text-phos2">{concept.say}</p>
        </div>

        <button
          type="button"
          disabled={busy}
          onClick={() => toggle(key, done ? "undo" : "complete")}
          className={`btn-term mt-4 w-full rounded-[3px] border px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] disabled:opacity-60 ${
            done
              ? "border-phos bg-phos text-ondark"
              : "border-phos/35 text-phos2 hover:border-phos"
          }`}
        >
          {done ? "[x] understood" : "[ ] understood → +10xp"}
        </button>
      </div>
    </Panel>
  );
}

/* ── run tasks ────────────────────────────────────────────────────────────── */

export function ActivityCard({
  moduleKey,
  activity,
  accent,
  number,
}: {
  moduleKey: string;
  activity: Activity;
  accent: Accent;
  number: number;
}) {
  const { snapshot, toggle, busy } = useGame();
  const key = activityKey(moduleKey, activity.id);
  const done = snapshot.completed.includes(key);
  const phoenixDone = snapshot.completed.includes("phoenix-feather");
  const [checked, setChecked] = useState<number[]>([]);
  const a = ACCENTS[accent];

  return (
    <Panel
      className={`flex h-full flex-col ${done ? a.border : ""}`}
      title={
        <span>
          <span className={a.text}>run</span> <span className="text-ink">{activity.id}</span>
          <span className="ml-2 text-dim">
            --mode={activity.mode.toLowerCase()} --min={activity.minutes} --step={number}
          </span>
        </span>
      }
      right={<span className={done ? a.text : "text-dim"}>{done ? "✓ 15xp" : "15xp"}</span>}
    >
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-display text-[22px] leading-tight text-ink">{activity.title}</h4>

        <ol className="mt-3 flex-1 space-y-0.5">
          {activity.steps.map((step, i) => {
            const on = checked.includes(i);
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setChecked((c) => (on ? c.filter((x) => x !== i) : [...c, i]))}
                  className="flex w-full items-start gap-2.5 rounded-[3px] px-1.5 py-1.5 text-left transition hover:bg-phos/6"
                >
                  <span
                    className={`mt-[1px] shrink-0 font-mono text-[12.5px] font-bold leading-none ${
                      on ? "text-phos" : "text-dim3"
                    }`}
                    style={on ? { textShadow: "0 0 10px var(--p-glow)" } : undefined}
                  >
                    {on ? "[x]" : "[ ]"}
                  </span>
                  <span
                    className={`text-[12.5px] leading-relaxed ${
                      on ? "text-dim2 line-through decoration-phos/40" : "text-body"
                    }`}
                  >
                    {step}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
          progress {checked.length}/{activity.steps.length}
          {checked.length === activity.steps.length && !done ? " · ready to bank 15xp" : ""}
        </p>

        <div className="mt-3 space-y-2">
          <div className="rounded-[3px] border border-cyan/35 bg-cyan/8 p-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-cyan2">
              =&gt; output
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-cyan2">{activity.deliverable}</p>
          </div>
          {activity.safety ? (
            <div className="rounded-[3px] border border-amber/40 bg-amber/8 p-3">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-amber2">
                !! recover
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-amber2">{activity.safety}</p>
            </div>
          ) : null}
        </div>

        {activity.id === "phoenix" ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => toggle("phoenix-feather", phoenixDone ? "undo" : "complete")}
            className={`btn-term mt-3 w-full rounded-[3px] border border-dashed px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] disabled:opacity-60 ${
              phoenixDone
                ? "border-magenta bg-magenta/15 text-magenta2"
                : "border-magenta/50 text-magenta2 hover:bg-magenta/12"
            }`}
          >
            {phoenixDone ? "[x] phoenix feather claimed · +20xp" : "[ ] i broke it & fixed it → claim feather +20xp"}
          </button>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={() => toggle(key, done ? "undo" : "complete")}
          className={`btn-term mt-2.5 w-full rounded-[3px] border px-3 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] disabled:opacity-60 ${
            done
              ? "border-phos bg-phos text-ondark"
              : "border-phos/35 text-phos2 hover:border-phos"
          }`}
        >
          {done ? "[x] task complete" : "[ ] mark task complete → +15xp"}
        </button>
      </div>
    </Panel>
  );
}

/* ── mission runner ───────────────────────────────────────────────────────── */

export function MissionBoard({ module, accent }: { module: Module; accent: Accent }) {
  const { snapshot, toggle, busy } = useGame();
  const a = ACCENTS[accent];
  const stats = useMemo(
    () => moduleStats(module, new Set(snapshot.completed)),
    [module, snapshot.completed],
  );
  const missionDone = module.mission.items.filter((i) => snapshot.completed.includes(i.id)).length;
  const allDone = missionDone === module.mission.items.length;
  const cleared = allDone && stats.complete;

  return (
    <Panel
      className={cleared ? a.border : ""}
      title={
        <span>
          <span className={a.text}>./</span>
          <span className="text-ink">mission_{String(module.index).padStart(2, "0")}</span>
          <span className="ml-2 text-dim">--verify --strict</span>
        </span>
      }
      right={<span className={a.text}>{module.minutes}m</span>}
    >
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className={`font-display text-[28px] leading-none ${a.text} ${a.glowClass}`}>
              {module.mission.title}
            </h3>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-dim">{module.mission.brief}</p>
          </div>
          <div className="shrink-0 rounded-[3px] border border-dashed border-phos/30 p-3 text-right">
            <p className="font-display text-[26px] leading-none text-ink">
              {missionDone}/{module.mission.items.length}
            </p>
            <div className="mt-2">
              <Bar
                percent={(missionDone / module.mission.items.length) * 100}
                accent={accent}
                blocks={12}
                showValue={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {module.mission.items.map((item) => (
            <Checkbox
              key={item.id}
              accent={accent}
              checked={snapshot.completed.includes(item.id)}
              onChange={() =>
                toggle(item.id, snapshot.completed.includes(item.id) ? "undo" : "complete")
              }
              label={
                <>
                  {item.label}{" "}
                  <span className="font-mono text-[10px] text-dim/70">+10xp</span>
                </>
              }
            />
          ))}
        </div>

        <div
          className={`mt-5 rounded-[3px] border border-dashed p-4 ${
            cleared ? "border-amber/60 bg-amber/10" : "border-phos/25 bg-phos/5"
          }`}
        >
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
            {cleared ? "[loot] achievement unlocked" : "[loot] reward on completion"}
          </p>
          <p className="font-display mt-1 text-[22px] leading-tight text-ink">
            {cleared ? `🏅 ${module.achievement.title}` : module.mission.reward}
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-dim">
            {cleared
              ? `${module.achievement.blurb} — every man page, task, mission step and diagnostic in this level is cleared. Next level unlocked.`
              : `unlock_condition: ${module.concepts.length} man pages + ${module.activities.length} tasks + ${module.mission.items.length} mission steps + diagnostic ≥ 75%.`}
          </p>
        </div>

        {busy ? (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
            writing to db<span className="caret" />
          </p>
        ) : null}
      </div>
    </Panel>
  );
}

/* ── diagnostic (quiz) ────────────────────────────────────────────────────── */

export function QuizBlock({ module, accent }: { module: Module; accent: Accent }) {
  const { snapshot, runQuiz, busy } = useGame();
  const a = ACCENTS[accent];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<
    { id: string; correct: boolean; correctAnswer: number; why: string }[] | null
  >(null);
  const passed = snapshot.quizzes[module.key]?.passed ?? false;
  const best = snapshot.quizzes[module.key];

  const submit = async () => {
    const r = await runQuiz(module.key, answers);
    setResults(r);
  };

  return (
    <Panel
      className={passed ? "border-phos/50" : ""}
      title={
        <span>
          <span className={a.text}>./</span>
          <span className="text-ink">diagnostic</span>
          <span className="ml-2 text-dim">
            --level={module.key} --questions={module.quiz.length} --pass=75%
          </span>
        </span>
      }
      right={
        <span className={passed ? "text-phos2" : "text-dim"}>
          {passed ? `✓ passed ${best?.score}/${best?.total}` : "not passed"} · 25xp
        </span>
      }
    >
      <div className="p-5">
        <p className="font-mono text-[12.5px] text-dim">
          # unlimited retakes, no penalties. every answer prints the reason.
        </p>

        <div className="mt-4 space-y-4">
          {module.quiz.map((q: QuizQuestion, qi) => {
            const result = results?.find((r) => r.id === q.id);
            return (
              <div key={q.id} className="rounded-[3px] border border-phos/18 bg-screen2/60 p-4">
                <p className="font-mono text-[13px] leading-relaxed text-ink">
                  <span className={a.text}>Q{qi + 1}&gt;</span> {q.q}
                </p>
                <div className="mt-3 grid gap-1.5">
                  {q.options.map((opt, oi) => {
                    const chosen = answers[q.id] === oi;
                    const isRight = result && oi === result.correctAnswer;
                    const isWrongPick = result && chosen && !result.correct;
                    return (
                      <button
                        key={oi}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                        className={`btn-term flex items-start gap-2.5 rounded-[3px] border px-3 py-2 text-left font-mono text-[12.5px] ${
                          isRight
                            ? "border-phos bg-phos/14 text-phos2"
                            : isWrongPick
                              ? "border-magenta bg-magenta/14 text-magenta2"
                              : chosen
                                ? "border-cyan/70 bg-cyan/10 text-cyan2"
                                : "border-phos/15 text-dim hover:border-phos/45 hover:text-body"
                        }`}
                      >
                        <span className="shrink-0 font-bold">
                          {chosen || isRight ? "[x]" : "[ ]"}
                        </span>
                        <span className="flex-1">
                          <span className="mr-1.5 text-dim">{String.fromCharCode(65 + oi)})</span>
                          {opt}
                        </span>
                        {isRight ? <span>✓</span> : null}
                        {isWrongPick ? <span>✗</span> : null}
                      </button>
                    );
                  })}
                </div>
                {result ? (
                  <p
                    className={`mt-3 rounded-[3px] border-l-2 px-3 py-2 font-mono text-[12px] leading-relaxed ${
                      result.correct
                        ? "border-phos bg-phos/8 text-phos2"
                        : "border-amber bg-amber/8 text-amber2"
                    }`}
                  >
                    <span className="font-bold">{result.correct ? "[ok] " : "[fail] "}</span>
                    {q.why}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={busy || Object.keys(answers).length < module.quiz.length}
            onClick={submit}
            className="btn-term rounded-[3px] border border-phos bg-phos px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ondark shadow-[0_0_24px_var(--p-glow)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ▶ {results ? "run diagnostic again" : "run diagnostic"} → +25xp
          </button>
          {results ? (
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setResults(null);
              }}
              className="btn-term rounded-[3px] border border-phos/35 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-phos2 hover:border-phos"
            >
              ↺ reset
            </button>
          ) : (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
              answered {Object.keys(answers).length}/{module.quiz.length}
            </span>
          )}
        </div>
      </div>
    </Panel>
  );
}

/* ── whoami ───────────────────────────────────────────────────────────────── */

export function PlayerCard() {
  const { snapshot, saveProfile, resetAll, busy } = useGame();
  const [name, setName] = useState(snapshot.learner.name);
  const [handle, setHandle] = useState(snapshot.learner.githubHandle ?? "");
  const [guild, setGuild] = useState(snapshot.learner.guild ?? "");
  const [confirmReset, setConfirmReset] = useState(false);

  const field =
    "mt-1 w-full rounded-[3px] border border-phos/25 bg-screen2 px-3 py-2.5 font-mono text-[13px] text-body outline-none placeholder:text-dim focus:border-phos focus:shadow-[0_0_18px_var(--p-glow)]";

  return (
    <Panel title={<span><span className="text-cyan">$</span> whoami <span className="text-dim">--edit</span></span>}>
      <div className="p-4">
        <p className="font-mono text-[12px] leading-relaxed text-dim">
          # your traveller record lives in postgres. stamps follow you between sessions.
        </p>

        <div className="mt-4 grid gap-3">
          <label className="block">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">user.name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. aimirah" className={field} />
          </label>
          <label className="block">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">github.handle</span>
            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="from level 01"
              className={field}
            />
          </label>
          <label className="block">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">guild</span>
            <input
              value={guild}
              onChange={(e) => setGuild(e.target.value)}
              placeholder="e.g. merge_wizards"
              className={field}
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => saveProfile({ name, githubHandle: handle, guild })}
              className="btn-term rounded-[3px] border border-phos bg-phos px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ondark"
            >
              ▶ commit record
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset((c) => !c)}
              className="btn-term rounded-[3px] border border-magenta/45 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-magenta2 hover:border-magenta"
            >
              ⚠ rm -rf progress
            </button>
          </div>

          {confirmReset ? (
            <div className="slide-in rounded-[3px] border border-magenta/60 bg-magenta/10 p-3 font-mono text-[12px] text-magenta2">
              <p>WARNING: this wipes xp, patches and the boss submission for this traveller.</p>
              <p className="mt-1 text-dim">continue? [y/N]</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await resetAll();
                    setConfirmReset(false);
                  }}
                  className="rounded-[3px] border border-magenta bg-magenta px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-ondark"
                >
                  y — hard reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-[3px] border border-phos/35 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-phos2"
                >
                  n — keep it
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}
