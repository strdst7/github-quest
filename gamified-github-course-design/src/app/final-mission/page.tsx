"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/components/GameProvider";
import {
  ACCENTS,
  Bar,
  Callout,
  Checkbox,
  Kicker,
  Panel,
  Pill,
  SectionTitle,
  SimpleTable,
  Stamp,
  Stat,
} from "@/components/ui";
import { gradingBands, modules, rubric } from "@/lib/course";

const boss = modules[7];
const accent = boss.accent;
const a = ACCENTS[accent];

export default function FinalMissionPage() {
  const { snapshot, toggle, saveProject, busy } = useGame();
  const project = snapshot.finalProject;

  const [title, setTitle] = useState(project?.projectTitle ?? "My Octoverse Passport");
  const [repoUrl, setRepoUrl] = useState(project?.repoUrl ?? "");
  const [highlights, setHighlights] = useState(project?.highlights ?? "");
  const [scores, setScores] = useState<Record<string, number>>(project?.rubric ?? {});
  const [flash, setFlash] = useState<string | null>(null);

  const projectKey = project ? `${project.id}:${String(project.updatedAt ?? "")}` : "none";

  useEffect(() => {
    if (!project) return;
    setTitle(project.projectTitle);
    setRepoUrl(project.repoUrl ?? "");
    setHighlights(project.highlights ?? "");
    setScores(project.rubric ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectKey]);

  const total = useMemo(() => Object.values(scores).reduce((s, v) => s + (Number(v) || 0), 0), [scores]);
  const band = useMemo(() => {
    if (total >= 18) return gradingBands[0];
    if (total >= 14) return gradingBands[1];
    if (total >= 10) return gradingBands[2];
    return gradingBands[3];
  }, [total]);

  const missionDone = boss.mission.items.filter((i) => snapshot.completed.includes(i.id)).length;

  const save = async (submitted: boolean) => {
    await saveProject({ projectTitle: title, repoUrl, highlights, rubric: scores, submitted });
    setFlash(submitted ? "launched" : "saved");
    setTimeout(() => setFlash(null), 5000);
  };

  const field =
    "mt-1 w-full rounded-[3px] border border-phos/25 bg-screen2 px-3.5 py-2.5 font-mono text-[13px] text-body outline-none placeholder:text-dim focus:border-phos focus:shadow-[0_0_18px_var(--p-glow)]";

  return (
    <div className="space-y-12">
      {/* ── header ─────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Kicker accent="gold">▸ boss level</Kicker>
          <Pill>⏱ {boss.minutes}m</Pill>
          <Pill>✦ 100xp on deploy</Pill>
          <Pill>🧮 20-point rubric</Pill>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(2.6rem,7.5vw,4.6rem)] leading-[0.9] text-ink glow-phos">
              ./deploy.sh
              <span className="block text-amber glow-amber">octoverse-passport</span>
            </h1>
            <p className="mt-4 max-w-3xl border-l-2 border-dashed border-phos/30 pl-4 font-mono text-[13px] italic leading-relaxed text-dim">
              “{boss.hook}”
            </p>
          </div>
          <Stamp
            size="lg"
            className={project?.submitted ? "border-phos text-phos2 glow-phos" : "border-amber/70 text-amber2"}
          >
            <span className="grid place-items-center text-center leading-tight">
              <span className="text-[20px]">{project?.submitted ? "✓" : "…"}</span>
              <span className="mt-0.5">{project?.submitted ? "deployed" : "staging"}</span>
            </span>
          </Stamp>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={`${missionDone}/${boss.mission.items.length}`} label="checks passed" emoji="✓" accent="gold" />
          <Stat value={`${total}/20`} label="self score" emoji="▣" accent="lime" />
          <Stat value={band.label} label="band" emoji="◈" accent="violet" />
          <Stat value={project?.submitted ? "live" : "staging"} label="status" emoji={project?.submitted ? "🚀" : "⏳"} accent="coral" />
        </div>

        {project?.submitted ? (
          <div className="rounded-[3px] border border-phos/55 bg-phos/8 p-5">
            <p className="font-display text-[26px] leading-none text-phos2 glow-phos">
              [ok] deployment complete — you are an octoverse legend
            </p>
            <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-dim">
              timestamp {new Date(String(project.submittedAt ?? Date.now())).toLocaleString()} · self_score{" "}
              <span className="text-ink">{project.selfScore}/20</span> ·{" "}
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-cyan2 underline decoration-dotted"
                >
                  {repoUrl} ↗
                </a>
              ) : (
                "add your repo url below so a peer can review it"
              )}
              . keep editing and re-deploying as often as you like — the loop is the lesson.
            </p>
          </div>
        ) : null}
      </section>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* ── left ────────────────────────────────────────────────────── */}
        <div className="space-y-5">
          <Panel
            className={a.border}
            title={<span><span className="text-phos">$</span> cat acceptance_tests.txt</span>}
            right={<span className="text-dim">{missionDone}/{boss.mission.items.length}</span>}
          >
            <div className="p-4">
              <p className="font-mono text-[12.5px] leading-relaxed text-dim">
                # one <span className="text-ink">public repository</span> proving every skill from
                levels 01–07. either a fresh{" "}
                <code className="text-phos2">octoverse-passport</code> or your upgraded{" "}
                <code className="text-phos2">my-launchpad</code>. these checks are tracked:
              </p>
              <div className="mt-4 grid gap-2">
                {boss.mission.items.map((item) => (
                  <Checkbox
                    key={item.id}
                    accent={accent}
                    checked={snapshot.completed.includes(item.id)}
                    onChange={() =>
                      toggle(item.id, snapshot.completed.includes(item.id) ? "undo" : "complete")
                    }
                    label={
                      <>
                        {item.label} <span className="font-mono text-[10px] text-dim/70">+10xp</span>
                      </>
                    }
                  />
                ))}
              </div>
              <div className="mt-4">
                <Bar percent={(missionDone / boss.mission.items.length) * 100} accent={accent} blocks={20} />
              </div>
              <Link
                href={`/learn/${boss.key}`}
                className="btn-term mt-4 inline-block rounded-[3px] border border-phos/35 px-4 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-phos2 hover:border-phos"
              >
                ▸ open full level_08
              </Link>
            </div>
          </Panel>

          <Panel title={<span><span className="text-cyan">$</span> ./build --steps</span>} accent="aqua">
            <div className="p-4">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">build order · 45 min</p>
              <ol className="mt-3 space-y-1.5">
                {boss.activities[0].steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 term-flat px-3.5 py-2.5">
                    <span className="shrink-0 font-mono text-[11px] font-bold text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[12.5px] leading-relaxed text-body">{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 rounded-[3px] border border-phos/30 bg-phos/6 p-3 font-mono text-[12px] text-phos2">
                =&gt; {boss.activities[0].deliverable}
              </p>

              <p className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-dim">
                then peer review · 20 min
              </p>
              <ol className="mt-2 space-y-1.5">
                {boss.activities[1].steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-3 term-flat px-3.5 py-2.5">
                    <span className="shrink-0 font-mono text-[11px] font-bold text-violet">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[12.5px] leading-relaxed text-body">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Panel>

          <Callout emoji="🎒" title="man gitquest --operator (boss level)" accent="violet">
            <ul className="space-y-1.5">
              {boss.instructorNotes.map((n) => (
                <li key={n}># {n}</li>
              ))}
            </ul>
          </Callout>
        </div>

        {/* ── right ───────────────────────────────────────────────────── */}
        <div className="space-y-5">
          <Panel
            title={<span><span className="text-amber">$</span> ./rubric --score --interactive</span>}
            accent="gold"
            right={<span className="text-amber2">{total}/20</span>}
          >
            <div className="p-5">
              <p className="font-mono text-[12.5px] text-dim">
                # tap the assertion that matches your repo right now. this is your definition of done —
                # run it <em>while</em> building, not afterwards.
              </p>

              <div className="mt-4">
                <Bar percent={(total / 20) * 100} accent={total >= 12 ? "lime" : "coral"} blocks={24} />
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">
                  pass mark 12/20 · {total >= 12 ? "[ok] passing" : "[!!] below pass mark"}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {rubric.map((r, i) => {
                  const chosen = scores[r.key] ?? 0;
                  return (
                    <div key={r.key} className="rounded-[3px] border border-phos/18 bg-screen2/60 p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-mono text-[12.5px] font-bold text-ink">
                          <span className="text-amber">test_{String(i + 1).padStart(2, "0")}</span>{" "}
                          {r.criterion}
                        </p>
                        <span
                          className={`font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${
                            chosen >= 3 ? "text-phos2" : chosen ? "text-amber2" : "text-dim"
                          }`}
                        >
                          {chosen ? `[${chosen}/4]` : "[unscored]"}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[11.5px] text-dim"># {r.question}</p>
                      <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                        {[1, 2, 3, 4].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setScores((s) => ({ ...s, [r.key]: s[r.key] === n ? 0 : n }))}
                            className={`btn-term flex items-start gap-2 rounded-[3px] border px-3 py-2 text-left font-mono text-[11.5px] leading-relaxed ${
                              chosen === n
                                ? "border-phos bg-phos/14 text-phos2 shadow-[0_0_18px_var(--p-glow)]"
                                : "border-phos/15 text-dim hover:border-phos/45 hover:text-body"
                            }`}
                          >
                            <span className="shrink-0 font-bold">{chosen === n ? "[x]" : "[ ]"}</span>
                            <span>
                              <span className="text-amber">{n}</span> {r.levels[n as 1 | 2 | 3 | 4]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[3px] border border-amber bg-amber/12 p-4">
                <p className="font-display text-[26px] leading-none text-amber2 glow-amber">
                  {band.band} · {band.label}
                </p>
                <p className="mt-1.5 font-mono text-[12.5px] leading-relaxed text-amber2">{band.note}</p>
              </div>
            </div>
          </Panel>

          <Panel
            title={<span><span className="text-phos">$</span> vim ./manifest.yml</span>}
            right={<span className="text-dim">-- INSERT --</span>}
          >
            <div className="p-5">
              <div className="grid gap-3">
                <label className="block">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">
                    project_title:
                  </span>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
                </label>
                <label className="block">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">
                    repo_url:
                  </span>
                  <input
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/yourhandle/octoverse-passport"
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-phos2">
                    reviewer_notes:
                  </span>
                  <textarea
                    value={highlights}
                    onChange={(e) => setHighlights(e.target.value)}
                    rows={4}
                    placeholder="# e.g. readme explains the project in one line, merged a PR that added gallery/, issue #2 closed itself"
                    className={field}
                  />
                </label>
              </div>

              <div className="dash-rule my-5" />

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => save(false)}
                  className="btn-term rounded-[3px] border border-phos/35 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-phos2 hover:border-phos disabled:opacity-50"
                >
                  💾 ./save --draft
                </button>
                <button
                  type="button"
                  disabled={busy || !repoUrl.trim()}
                  onClick={() => save(true)}
                  className="btn-term rounded-[3px] border border-phos bg-phos px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ondark shadow-[0_0_28px_var(--p-glow)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  🚀 ./deploy --public → +100xp
                </button>
              </div>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-dim">
                # deploy requires repo_url — paste the link so a peer or operator can actually review it.
                # awards the <span className="text-amber2">Octoverse Legend</span> patch.
              </p>
              {flash ? (
                <p
                  className={`slide-in mt-4 rounded-[3px] border p-3 font-mono text-[12.5px] ${
                    flash === "launched"
                      ? "border-phos bg-phos/10 text-phos2"
                      : "border-cyan/60 bg-cyan/8 text-cyan2"
                  }`}
                >
                  {flash === "launched"
                    ? "[ok] deployed. patch written, +100xp banked. now go tell somebody about it."
                    : "[ok] draft saved in this browser. come back and finish when you're ready."}
                  <span className="caret" />
                </p>
              ) : null}
            </div>
          </Panel>

          <Panel title={<span><span className="text-violet">$</span> ./rubric --bands</span>} accent="violet">
            <div className="p-5">
              <SimpleTable
                head={["score", "rank", "what to do next"]}
                rows={gradingBands.map((b) => [
                  <span key={b.band} className="font-mono font-bold text-ink">
                    {b.band}
                  </span>,
                  b.label,
                  b.note,
                ])}
              />
              <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-dim">
                <span className="text-ink">assessment_policy:</span> self-score first, then a peer
                or operator verifies the same five rows. pass mark 12/20. nothing hidden, nothing
                curved, re-submission unlimited.
              </p>
            </div>
          </Panel>
        </div>
      </div>

      <section>
        <SectionTitle kicker="exit" title="$ what next?" accent="aqua" />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { href: "/badges", cmd: "tail -f ./patches.log", label: "see your patch wall" },
            { href: "/instructor", cmd: "man gitquest --operator", label: "read the operator manual" },
            { href: "/learn/m1", cmd: "./teach.sh level_01", label: "teach level 1 to someone" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="term term-hover flex items-center gap-3 p-4">
              <span className="min-w-0">
                <span className="block font-mono text-[11.5px] text-phos2">{c.cmd}</span>
                <span className="mt-0.5 block font-display text-[20px] leading-none text-ink">
                  {c.label}
                </span>
              </span>
              <span className="ml-auto shrink-0 font-mono text-[14px] text-phos">▸</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
