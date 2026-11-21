import Link from "next/link";
import { BootLog } from "@/components/Type";
import {
  ACCENTS,
  Bar,
  Callout,
  FieldNote,
  Kicker,
  Panel,
  Pill,
  SectionTitle,
  SimpleTable,
  Stamp,
  Stat,
} from "@/components/ui";
import {
  badgeCatalog,
  branding,
  course,
  gradingBands,
  guildQuests,
  levels,
  modules,
  resources,
  rubric,
  schedule,
  storyline,
  totalMinutes,
  totalXpAvailable,
} from "@/lib/course";
import { allSteps } from "@/lib/game";

export const dynamic = "force-dynamic";

const bootLines = [
  { text: "[boot]  gitquest kernel 1.0 .................. ok", tone: "dim" as const },
  { text: "[boot]  mounting the octoverse ................. ok", tone: "dim" as const },
  { text: "[check] prior_knowledge required ............... none", tone: "phos" as const },
  { text: "[check] terminal on your own machine ........... not needed", tone: "phos" as const },
  { text: "[check] lines of code you must write ........... 0", tone: "phos" as const },
  { text: "[warn]  mistakes are a scoring mechanic here", tone: "amber" as const },
  { text: "[ready] 8 levels · 12 patches · ~1500 xp · 1 public repo", tone: "cyan" as const },
];

const contents = [
  { id: "identity", n: "01", label: "course_identity.md", desc: "objective · audience · format", page: "4.1k" },
  { id: "syllabus", n: "02", label: "journey/", desc: "eight levels, zero to shipped", page: "12k" },
  { id: "breakdown", n: "03", label: "levels/*.md", desc: "full breakdown, fold-out per level", page: "88k" },
  { id: "game", n: "04", label: "game.conf", desc: "xp · levels · patches · guild quests", page: "9.2k" },
  { id: "practice", n: "05", label: "exercises.log", desc: "what your hands actually do", page: "21k" },
  { id: "resources", n: "06", label: "tools.conf", desc: "essential vs later vs banned", page: "7.7k" },
  { id: "final", n: "07", label: "deploy.sh", desc: "boss mission + 20-point rubric", page: "5.4k" },
  { id: "schedule", n: "08", label: "run_of_show.txt", desc: "timings for a live workshop", page: "3.1k" },
];

export default function HomePage() {
  const hours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="space-y-16">
      {/* ── BOOT / HERO ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <Panel
          title={
            <span>
              <span className="text-phos">●</span>
              <span className="text-dim">●</span>
              <span className="text-magenta/70">●</span>
              <span className="ml-2 text-ink">gitquest — /bin/bash — 96×28</span>
            </span>
          }
          right={<span className="text-dim">tty1</span>}
          className="overflow-hidden"
        >
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <BootLog lines={bootLines} />
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber2 glow-amber">
                ▶ {branding.edition} · operator: @{branding.handle}
              </p>

              <h1 className="font-display mt-6 text-[clamp(3.4rem,11vw,7rem)] leading-[0.84] text-ink glow-phos flicker">
                git<span className="text-phos">quest</span>
              </h1>
              <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.34em] text-cyan2 glow-cyan">
                the octoverse chronicles
              </p>

              <p className="mt-6 border-l-2 border-amber pl-4 font-display text-[clamp(1.5rem,3.4vw,2.2rem)] leading-tight text-amber2 glow-amber">
                {course.tagline}
              </p>
              <p className="mt-4 max-w-2xl font-mono text-[13px] leading-relaxed text-dim">
                {course.promise}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <Link
                  href="/learn/m1"
                  className="btn-term rounded-[3px] border border-phos bg-phos px-5 py-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-ondark shadow-[0_0_28px_var(--p-glow)]"
                >
                  ▶ ./start.sh level_01
                </Link>
                <Link
                  href="/learn"
                  className="btn-term rounded-[3px] border border-cyan/60 px-5 py-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-cyan2 hover:border-cyan"
                >
                  ▸ cd ~/quest-map
                </Link>
                <Link
                  href="#breakdown"
                  className="btn-term rounded-[3px] border border-dashed border-phos/35 px-5 py-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-dim hover:border-phos/70 hover:text-phos2"
                >
                  ▸ less ./syllabus
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat value={`${hours}h`} label="guided play" emoji="⏱" accent="lime" />
                <Stat value={modules.length} label="levels + boss" emoji="▤" accent="coral" />
                <Stat value={badgeCatalog.length} label="patches" emoji="🏅" accent="gold" />
                <Stat value={totalXpAvailable} label="xp available" emoji="✦" accent="aqua" />
              </div>
            </div>

            <div className="space-y-4">
              <Panel
                title={<span><span className="text-cyan">$</span> cat ./brief.txt</span>}
                accent="aqua"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                      expedition brief
                    </p>
                    <Stamp size="sm" className="border-phos/70 text-phos2">
                      approved
                    </Stamp>
                  </div>
                  <p className="mt-3 font-mono text-[12.5px] leading-relaxed text-body">
                    {storyline.premise}
                  </p>
                  <div className="mt-4 space-y-1.5">
                    {storyline.characters.map((c) => (
                      <div key={c.name} className="term-flat flex items-start gap-2.5 px-3 py-2">
                        <span className="text-[15px]">{c.emoji}</span>
                        <p className="font-mono text-[12px] leading-relaxed text-dim">
                          <span className="text-phos2">{c.name}</span> — {c.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>

              <Panel title={<span><span className="text-amber">$</span> ls ./you_will_own</span>} accent="gold">
                <ul className="space-y-1 p-4 font-mono text-[12.5px] leading-relaxed text-amber2">
                  <li>├── profile_readme.md</li>
                  <li>├── my-launchpad/ (public)</li>
                  <li>├── one_merged_pull_request</li>
                  <li>├── issues_filed_labelled_closed</li>
                  <li>├── a_fork_with_your_edit</li>
                  <li>└── real-life_private_repo</li>
                </ul>
              </Panel>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── CONTENTS ───────────────────────────────────────────────────── */}
      <Panel title={<span><span className="text-phos">$</span> ls -l ./handbook</span>} right="8 entries">
        <div className="p-4">
          <ol className="grid gap-x-8 gap-y-0.5 md:grid-cols-2">
            {contents.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="group flex items-baseline gap-2 py-1.5 font-mono text-[12.5px]">
                  <span className="text-magenta">{c.n}</span>
                  <span className="text-phos2 group-hover:text-phos group-hover:underline">
                    {c.label}
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-phos/20" />
                  <span className="hidden text-dim sm:inline">{c.desc}</span>
                  <span className="text-dim">{c.page}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </Panel>

      {/* ── 01 IDENTITY ────────────────────────────────────────────────── */}
      <section className="space-y-5" id="identity">
        <SectionTitle
          number="01"
          kicker="course_identity"
          title={<>one objective, five kinds of human, <span className="text-phos glow-phos">zero prerequisites</span></>}
          sub="If you can use a web browser and open your own email, you are over-qualified for this course."
          accent="coral"
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel title={<span><span className="text-phos">$</span> cat ./objective.md</span>}>
            <div className="p-5">
              <p className="font-mono text-[13px] leading-relaxed text-body">{course.objective}</p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-phos2">
                # on completion the learner can:
              </p>
              <ol className="mt-3 space-y-1.5">
                {course.outcomes.map((o, i) => (
                  <li key={o} className="flex items-start gap-3 term-flat px-3.5 py-2.5">
                    <span className="shrink-0 font-mono text-[11px] font-bold text-phos">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[12.5px] leading-relaxed text-body">{o}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Panel>

          <div className="space-y-5">
            <Panel title={<span><span className="text-cyan">$</span> grep -r "audience" ./</span>} accent="aqua">
              <div className="p-5">
                <p className="font-mono text-[12.5px] text-cyan2">{course.audience.headline}</p>
                <ul className="mt-4 space-y-3">
                  {course.audience.groups.map((g) => (
                    <li key={g.who} className="border-l-2 border-cyan/50 pl-3">
                      <p className="font-mono text-[12.5px] font-bold text-ink">{g.who}</p>
                      <p className="font-mono text-[12px] leading-relaxed text-dim">{g.why}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>

            <div className="grid gap-4 sm:grid-cols-2">
              <Panel title={<span className="text-phos2">requires()</span>} accent="lime">
                <ul className="space-y-1 p-4 font-mono text-[12px] leading-relaxed text-phos2">
                  {course.audience.prerequisites.map((p) => (
                    <li key={p}>
                      <span className="text-phos">[+]</span> {p}
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title={<span className="text-magenta2">!requires()</span>} accent="coral">
                <ul className="space-y-1 p-4 font-mono text-[12px] leading-relaxed text-magenta2">
                  {course.audience.notRequired.map((p) => (
                    <li key={p}>
                      <span className="text-magenta">[-]</span> {p}
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>
        </div>

        <Panel title={<span><span className="text-violet">$</span> cat ./format.conf</span>} accent="violet">
          <div className="p-5">
            <div className="grid gap-3 md:grid-cols-3">
              <FieldNote n="a" title="duration" accent="lime">
                {course.format.duration} Every level is a single 45–75 minute sitting, so you can kill
                the session anywhere and resume without losing the thread.
              </FieldNote>
              <FieldNote n="b" title="structure" accent="aqua">
                {course.format.modules} Same shape every time: story beat → man pages → tasks → one
                mission → one patch → one diagnostic.
              </FieldNote>
              <FieldNote n="c" title="difficulty" accent="coral">
                Deliberately very low. One or two new words per level, always taught with an everyday
                analogy before the technical term is named.
              </FieldNote>
            </div>
            <div className="mt-5">
              <SimpleTable
                head={["delivery format", "how it runs", "total time"]}
                rows={course.format.delivery.map((d) => [d.name, d.detail, d.length])}
              />
            </div>
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              {course.format.rules.map((r, i) => (
                <p key={r} className="term-flat px-3.5 py-2.5 font-mono text-[12.5px] leading-relaxed text-body">
                  <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.12em] text-magenta">
                    rule_{i + 1}
                  </span>
                  {r}
                </p>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      {/* ── 02 JOURNEY ─────────────────────────────────────────────────── */}
      <section className="space-y-5" id="syllabus">
        <SectionTitle
          number="02"
          kicker="the journey"
          title={<>eight levels, from <span className="text-cyan glow-cyan">“what is a repo?”</span> to “I shipped a thing”</>}
          sub="Each level unlocks the next. Open one for the story beat, man pages, tasks, mission, patch and diagnostic — with progress written to the database as you go."
          accent="aqua"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((m) => {
            const a = ACCENTS[m.accent];
            return (
              <Link key={m.key} href={`/learn/${m.key}`} className="group block">
                <Panel
                  tone="raised"
                  className={`h-full ${a.border}`}
                  title={
                    <span>
                      <span className={a.text}>level_{String(m.index).padStart(2, "0")}</span>
                      <span className="ml-2 text-dim">{m.key}</span>
                    </span>
                  }
                  right={<span className="text-phos2">{m.minutes}m</span>}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] border text-[20px]"
                        style={{ borderColor: a.hex, color: a.hex, textShadow: `0 0 12px ${a.hex}` }}
                      >
                        {m.emoji}
                      </span>
                      <div className="min-w-0">
                        <h3 className={`font-display text-[26px] leading-none ${a.text} ${a.glowClass}`}>
                          {m.title}
                        </h3>
                        <p className="mt-1 font-mono text-[11.5px] uppercase tracking-[0.12em] text-dim">
                          {m.subtitle} · {m.level}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 border-l-2 border-dashed border-phos/30 pl-3 font-mono text-[12px] italic leading-relaxed text-dim">
                      “{m.hook}”
                    </p>

                    <dl className="mt-3 space-y-1 font-mono text-[11.5px]">
                      <div className="flex gap-2">
                        <dt className="w-16 shrink-0 text-dim">output:</dt>
                        <dd className="flex-1 text-body">{m.activities[m.activities.length - 1].deliverable}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-16 shrink-0 text-dim">mission:</dt>
                        <dd className="flex-1 text-body">{m.mission.title}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-16 shrink-0 text-dim">patch:</dt>
                        <dd className={`flex-1 ${a.text}`}>🏅 {m.achievement.title}</dd>
                      </div>
                    </dl>

                    <span
                      className={`btn-term mt-4 inline-flex items-center gap-2 rounded-[3px] border px-3.5 py-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] ${a.chip}`}
                    >
                      ▶ open level_{String(m.index).padStart(2, "0")}
                    </span>
                  </div>
                </Panel>
              </Link>
            );
          })}
        </div>

        <Panel title={<span><span className="text-phos">$</span> ./syllabus --table</span>}>
          <div className="p-4">
            <SimpleTable
              head={["lvl", "level", "new words (that's all)", "you will make", "time", "patch"]}
              rows={modules.map((m) => [
                String(m.index).padStart(2, "0"),
                <span key={m.key}>
                  <Link href={`/learn/${m.key}`} className={`hover:underline ${ACCENTS[m.accent].text}`}>
                    {m.emoji} {m.title}
                  </Link>
                  <span className="block text-[11px] text-dim">{m.subtitle}</span>
                </span>,
                m.concepts.map((c) => c.term).join(" · "),
                m.activities[m.activities.length - 1].deliverable,
                `${m.minutes}m`,
                m.achievement.title,
              ])}
            />
          </div>
        </Panel>
      </section>

      {/* ── 03 BREAKDOWN ───────────────────────────────────────────────── */}
      <section className="space-y-5" id="breakdown">
        <SectionTitle
          number="03"
          kicker="level by level"
          title="the full breakdown — [+] expand any level"
          sub="Story beat, learning objectives, plain-English concepts with analogies, field tasks, the mission checklist, the patch you earn, and the must-know / defer split."
          accent="violet"
        />

        <div className="space-y-3">
          {modules.map((m) => {
            const a = ACCENTS[m.accent];
            return (
              <details key={m.key} className="term group overflow-hidden open:border-phos/50">
                <summary className="flex cursor-pointer items-center gap-4 bg-phos/5 p-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] border text-[19px]"
                    style={{ borderColor: a.hex, color: a.hex, textShadow: `0 0 12px ${a.hex}` }}
                  >
                    {m.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-mono block text-[9.5px] uppercase tracking-[0.16em] text-dim">
                      level_{String(m.index).padStart(2, "0")} · {m.minutes}m · {m.level}
                    </span>
                    <span className={`font-display block text-[26px] leading-none ${a.text} ${a.glowClass}`}>
                      {m.title} <span className="text-[16px] text-dim">— {m.subtitle}</span>
                    </span>
                    <span className="mt-1 block font-mono text-[11px] text-dim">
                      {m.concepts.length} man pages · {m.activities.length} tasks · {m.mission.items.length}{" "}
                      checks · {m.quiz.length} questions · 🏅 {m.achievement.title}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-[3px] border border-phos/30 px-3 py-2 font-mono text-[11px] font-bold text-phos2 transition group-open:bg-phos group-open:text-ondark">
                    [+]
                  </span>
                </summary>

                <div className="space-y-6 border-t border-dashed border-phos/25 p-5">
                  <p
                    className="rounded-[3px] border-l-2 bg-phos/5 p-4 font-mono text-[12.5px] italic leading-relaxed text-body"
                    style={{ borderColor: a.hex }}
                  >
                    <span className={a.text}>»</span> {m.hook}
                  </p>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-phos2">
                      # objectives
                    </p>
                    <ul className="mt-2 grid gap-1.5 md:grid-cols-2">
                      {m.objectives.map((o) => (
                        <li key={o} className="flex items-start gap-2 font-mono text-[12.5px] leading-relaxed text-dim">
                          <span className={a.text}>◆</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-phos2">
                      # concepts in plain english
                    </p>
                    <div className="mt-3">
                      <SimpleTable
                        head={["term", "plain english", "analogy", "say it out loud"]}
                        rows={m.concepts.map((c) => [
                          <span key={c.id} className="whitespace-nowrap">
                            {c.emoji} {c.term}
                          </span>,
                          c.plain,
                          c.analogy,
                          <span key={`${c.id}-say`} className="italic text-phos2">
                            {c.say}
                          </span>,
                        ])}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-phos2">
                      # field tasks
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {m.activities.map((act, i) => (
                        <div key={act.id} className="term-flat p-4">
                          <p className="font-mono text-[12.5px] font-bold text-ink">
                            <span className={a.text}>{String(i + 1).padStart(2, "0")}</span> {act.title}
                          </p>
                          <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">
                            ⏱ {act.minutes}m · {act.mode}
                          </p>
                          <ol className="mt-2 space-y-1 font-mono text-[11.5px] leading-relaxed text-dim">
                            {act.steps.map((s, si) => (
                              <li key={s}>
                                <span className="text-dim">{si + 1}.</span> {s}
                              </li>
                            ))}
                          </ol>
                          <p className="mt-2 rounded-[3px] border border-cyan/30 bg-cyan/8 p-2 font-mono text-[11.5px] text-cyan2">
                            =&gt; {act.deliverable}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="term-flat p-4">
                      <p className="font-display text-[22px] leading-none text-ink">🎯 {m.mission.title}</p>
                      <p className="mt-2 font-mono text-[12px] leading-relaxed text-dim">{m.mission.brief}</p>
                      <ul className="mt-3 space-y-1.5">
                        {m.mission.items.map((it) => (
                          <li key={it.id} className="flex items-start gap-2 font-mono text-[11.5px] leading-relaxed text-dim">
                            <span className={a.text}>[ ]</span>
                            {it.label}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-amber2">
                        🏅 {m.mission.reward}
                      </p>
                      <p className="mt-1 font-mono text-[11.5px] text-dim">
                        <span className="text-ink">patch:</span> {m.achievement.title} — {m.achievement.blurb}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-[3px] border border-phos/30 bg-phos/6 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-phos2">
                          [+] must know
                        </p>
                        <ul className="mt-2 space-y-1 font-mono text-[11.5px] leading-relaxed text-phos2">
                          {m.mustKnow.map((x) => (
                            <li key={x}>· {x}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[3px] border border-dashed border-amber/45 bg-amber/6 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-amber2">
                          [~] defer / nice to know
                        </p>
                        <ul className="mt-2 space-y-1 font-mono text-[11.5px] leading-relaxed text-amber2">
                          {m.niceToKnow.map((x) => (
                            <li key={x}>· {x}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/learn/${m.key}`}
                      className={`btn-term rounded-[3px] border px-4 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] shadow-[0_0_22px_rgba(0,0,0,0.4)] ${a.solid}`}
                    >
                      ▶ run level_{String(m.index).padStart(2, "0")} & track xp
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                      diagnostic: {m.quiz.length} questions · pass 75% · unlimited retakes · +25xp
                    </span>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* ── 04 GAME ────────────────────────────────────────────────────── */}
      <section className="space-y-5" id="game">
        <SectionTitle
          number="04"
          kicker="gamification design"
          title="the game loop under the screen"
          sub="One loop, repeated eight times: read a man page → run a task → tick a step → bank xp → earn a patch → level up. Mistakes pay out too."
          accent="gold"
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <Panel
            className="lg:col-span-2"
            title={<span><span className="text-amber">$</span> cat ./game.conf</span>}
            accent="gold"
          >
            <div className="p-5">
              <p className="font-mono text-[12.5px] text-dim">
                # {allSteps().length} tickable steps · ~{totalXpAvailable} xp available including bonuses
              </p>
              <div className="mt-4">
                <SimpleTable
                  head={["lvl", "rank", "xp", "what it means"]}
                  rows={levels.map((l) => [
                    <span key={l.level} className="whitespace-nowrap">
                      {l.emoji} {String(l.level).padStart(2, "0")}
                    </span>,
                    l.name,
                    l.minXp,
                    l.note,
                  ])}
                />
              </div>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {storyline.mechanics.map((mech) => (
                  <FieldNote key={mech.name} title={mech.name} accent="gold">
                    {mech.how}
                  </FieldNote>
                ))}
              </div>
            </div>
          </Panel>

          <div className="space-y-5">
            <Panel
              title={<span><span className="text-magenta">!!</span> phoenix_protocol</span>}
              accent="coral"
              className="overflow-hidden"
            >
              <div className="p-5">
                <p className="font-mono text-[12.5px] leading-relaxed text-magenta2">
                  The <span className="text-ink">Phoenix Feather</span> pays more xp than most
                  tasks. You earn it by <em>deliberately</em> deleting your README, committing the
                  disaster, feeling the panic, then restoring the file from history.
                </p>
                <p className="mt-3 font-mono text-[12.5px] leading-relaxed text-dim">
                  House rule of the octoverse:{" "}
                  <span className="text-amber2 glow-amber">
                    you cannot break github from a browser.
                  </span>{" "}
                  Every change is a commit, and every commit can be undone by making a new one. Fear
                  is the only real blocker, so we farm it for points.
                </p>
              </div>
            </Panel>

            <Panel title={<span><span className="text-violet">$</span> ./guild --list</span>} accent="violet">
              <div className="space-y-2.5 p-4">
                {guildQuests.map((g) => (
                  <div key={g.key} className="term-flat p-3">
                    <p className="font-mono text-[12.5px] font-bold text-ink">
                      {g.emoji} {g.title}
                    </p>
                    <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-dim">{g.brief}</p>
                    <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-cyan2">
                      {g.time} · {g.people} · {g.skills}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>

        <Panel title={<span><span className="text-phos">$</span> ls ./patches --all</span>} right={`${badgeCatalog.length} total`}>
          <div className="p-5">
            <p className="font-mono text-[12.5px] text-dim">
              # eight level patches plus four secret ones earned by being brave, kind or thorough.
              # yours live in{" "}
              <Link href="/badges" className="text-cyan2 underline decoration-dotted">
                ./patches.log
              </Link>
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {badgeCatalog.map((b) => (
                <div
                  key={b.key}
                  className={`rounded-[3px] border p-4 ${
                    b.rarity === "Secret"
                      ? "border-dashed border-magenta/50 bg-magenta/6"
                      : b.rarity === "Epic"
                        ? "border-amber/55 bg-amber/8"
                        : b.rarity === "Rare"
                          ? "border-violet/45 bg-violet/6"
                          : "border-phos/22 bg-phos/4"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[26px]">{b.emoji}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                      {b.rarity}
                    </span>
                  </div>
                  <p className="font-display mt-2 text-[21px] leading-none text-ink">{b.title}</p>
                  <p className="mt-1.5 font-mono text-[11.5px] leading-relaxed text-dim">{b.blurb}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                    src: {b.from}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </section>

      {/* ── 05 PRACTICE ────────────────────────────────────────────────── */}
      <section className="space-y-5" id="practice">
        <SectionTitle
          number="05"
          kicker="learning by doing"
          title="what your hands will actually do"
          sub="No level has more reading than doing. Every one ends with something real, public, and yours."
          accent="lime"
        />

        <Panel title={<span><span className="text-phos">$</span> tail -f ./exercises.log</span>}>
          <div className="p-4">
            <SimpleTable
              head={["level", "field tasks", "you finish with"]}
              rows={modules.map((m) => [
                `${m.emoji} ${m.title}`,
                m.activities.map((a) => `${a.title} (${a.minutes}m, ${a.mode})`).join(" → "),
                <span key={m.key}>
                  {m.mission.reward}
                  <span className="mt-1 block text-[11px] text-dim">
                    mission: {m.mission.items.length} checks · diagnostic: {m.quiz.length} questions
                  </span>
                </span>,
              ])}
            />
          </div>
        </Panel>

        <div className="grid gap-4 md:grid-cols-3">
          <Callout emoji="🧪" title="diagnostics" accent="aqua">
            Four questions per level, pass mark 75%, unlimited retakes, and the reason printed for
            every answer — right or wrong. A failed attempt costs nothing but a keystroke.
          </Callout>
          <Callout emoji="🎭" title="realistic scenarios" accent="violet">
            “your teammate edited the same line”, “you deleted the README”, “a stranger asks what your
            repo is for”, “you spotted a typo in a project you love”. Every scenario is run in your own
            repo, never described on a slide.
          </Callout>
          <Callout emoji="🎁" title="artefacts you keep" accent="coral">
            A profile README, the <code className="text-ink">my-launchpad</code> repo, one private
            real-life repo, a fork with your own edit, and the final{" "}
            <code className="text-ink">octoverse-passport</code> — all still live after the course
            ends.
          </Callout>
        </div>
      </section>

      {/* ── 06 RESOURCES ───────────────────────────────────────────────── */}
      <section className="space-y-5" id="resources">
        <SectionTitle
          number="06"
          kicker="tools & resources"
          title="essential now · optional later · banned entirely"
          sub="A hard line between what a beginner must know and what would only overwhelm them. The right-hand column is out of scope until the boss mission is done."
          accent="violet"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title={<span><span className="text-phos">$</span> cat essential.conf</span>} accent="lime">
            <div className="space-y-2 p-4">
              {resources.essential.map((r) => (
                <div key={r.name} className="rounded-[3px] border border-phos/25 bg-phos/5 p-3">
                  <p className="font-mono text-[12.5px] font-bold text-phos2">{r.name}</p>
                  <p className="mt-0.5 font-mono text-[11.5px] leading-relaxed text-dim">{r.what}</p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-5">
            <Panel title={<span><span className="text-amber">$</span> cat later.conf</span>} accent="gold">
              <div className="space-y-2 p-4">
                {resources.optional.map((r) => (
                  <div key={r.name} className="rounded-[3px] border border-dashed border-amber/40 bg-amber/6 p-3">
                    <p className="font-mono text-[12.5px] font-bold text-amber2">{r.name}</p>
                    <p className="mt-0.5 font-mono text-[11.5px] leading-relaxed text-dim">
                      <span className="uppercase tracking-[0.1em] text-amberdim">when: </span>
                      {r.when}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>

            <div className="rounded-[3px] border border-magenta/55 bg-magenta/8 p-5">
              <p className="font-display text-[24px] leading-none text-magenta2 glow-magenta">
                ⛔ blacklisted for this course
              </p>
              <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-magenta2">
                The terminal, <code>git clone / push / pull / rebase / stash</code>, SSH keys, git
                config, installing Git or VS Code, merge strategies (squash vs rebase), CI/CD, and
                anything with the word “hook” in it. Learn the website first; the commands make sense
                later and not one minute sooner.
              </p>
            </div>
          </div>
        </div>

        <Panel title={<span><span className="text-cyan">$</span> cat ./bookmarks</span>} accent="aqua">
          <div className="p-4">
            <SimpleTable
              head={["resource", "why it matters", "link"]}
              rows={resources.links.map((l) => [
                l.name,
                l.note,
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-cyan2 underline decoration-dotted hover:text-cyan"
                >
                  open ↗
                </a>,
              ])}
            />
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-phos2">
              # optional next steps
            </p>
            <ol className="mt-3 grid gap-2 md:grid-cols-2">
              {resources.nextSteps.map((n, i) => (
                <li key={n} className="flex items-start gap-3 term-flat p-3">
                  <span className="shrink-0 font-mono text-[11px] font-bold text-violet">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[12px] leading-relaxed text-dim">{n}</span>
                </li>
              ))}
            </ol>
          </div>
        </Panel>
      </section>

      {/* ── 07 FINAL ───────────────────────────────────────────────────── */}
      <section className="space-y-5" id="final">
        <SectionTitle
          number="07"
          kicker="final mission"
          title={<>boss level: <span className="text-amber glow-amber">./deploy.sh octoverse-passport</span></>}
          sub="One public repository that proves every skill in the course, graded against a 20-point rubric you can read before you start."
          accent="gold"
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Panel title={<span><span className="text-phos">$</span> cat acceptance_tests.txt</span>}>
            <ul className="space-y-1.5 p-5">
              {modules[7].mission.items.map((i, idx) => (
                <li key={i.id} className="flex items-start gap-3 term-flat px-3.5 py-2.5">
                  <span className="font-mono text-[11px] font-bold text-magenta">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[12.5px] leading-relaxed text-body">{i.label}</span>
                </li>
              ))}
            </ul>
            <div className="px-5 pb-5">
              <Link
                href="/final-mission"
                className="btn-term inline-block rounded-[3px] border border-amber bg-amber px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ondark shadow-[0_0_26px_var(--p-glow-amber)]"
              >
                ▶ open boss mission & rubric scorer
              </Link>
            </div>
          </Panel>

          <Panel title={<span><span className="text-cyan">$</span> ./rubric --explain</span>} accent="aqua">
            <div className="p-5">
              <p className="font-mono text-[12.5px] text-dim">
                # five criteria × four points. self-score while you build, then a peer or the operator
                # verifies the same five rows.
              </p>
              <div className="mt-4">
                <SimpleTable
                  head={["criterion", "what we look at", "pts"]}
                  rows={rubric.map((r) => [r.criterion, r.question, r.weight])}
                />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {gradingBands.map((b) => (
                  <div key={b.band} className="term-flat p-3">
                    <p className="font-display text-[20px] leading-none text-phos2">
                      {b.band} · {b.label}
                    </p>
                    <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-dim">{b.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
      </section>

      {/* ── 08 SCHEDULE ────────────────────────────────────────────────── */}
      <section className="space-y-5" id="schedule">
        <SectionTitle
          number="08"
          kicker="run of show"
          title="suggested timings for a live workshop"
          sub="Built for two 3-hour sessions with a break, or six 50-minute classes. Self-paced travellers can ignore the clock entirely."
          accent="coral"
        />
        <Panel title={<span><span className="text-magenta">$</span> crontab -l ./workshop</span>} accent="coral">
          <div className="p-5">
            <SimpleTable
              head={["clock", "what happens", "who's driving"]}
              rows={schedule.map((s) => [
                <span key={s.slot} className="whitespace-nowrap font-mono text-[11.5px] text-ink">
                  {s.slot}
                </span>,
                s.what,
                s.who || "—",
              ])}
            />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <FieldNote n="i" title="pacing" accent="lime">
                Talk for at most 8 minutes, then hands on keyboards. Still explaining at minute 10? Cut
                to the demo.
              </FieldNote>
              <FieldNote n="ii" title="checkpoint" accent="coral">
                At the break everyone should hold Level 4 and four patches. Anyone behind gets a buddy,
                not a lecture.
              </FieldNote>
              <FieldNote n="iii" title="close" accent="gold">
                End with the launch wall: three volunteers demo their Passport in two minutes each, then
                everybody posts their link.
              </FieldNote>
            </div>
            <p className="mt-5 font-mono text-[12.5px] text-dim">
              # full operator notes, the fourteen known stuck-points and differentiation tips:{" "}
              <Link href="/instructor" className="text-cyan2 underline decoration-dotted">
                man gitquest --operator
              </Link>
            </p>
          </div>
        </Panel>
      </section>

      {/* ── EXIT ───────────────────────────────────────────────────────── */}
      <section className="pb-4">
        <Panel className="overflow-hidden p-8 text-center sm:p-12" accent="lime">
          <span className="pulse-glow mx-auto grid h-16 w-16 place-items-center rounded-[3px] border border-phos/50 bg-phos/10 text-[30px]">
            🐙
          </span>
          <h2 className="font-display mt-5 text-[clamp(2rem,5.5vw,3.4rem)] leading-none text-ink glow-phos">
            ready to spawn?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-[13px] leading-relaxed text-dim">
            Level 1 takes 45 minutes and ends with your name on a profile the whole internet can visit.
            Everything after that is bonus levels.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <Link
              href="/learn/m1"
              className="btn-term rounded-[3px] border border-phos bg-phos px-6 py-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-ondark shadow-[0_0_30px_var(--p-glow)]"
            >
              ▶ ./start.sh
            </Link>
            <Link
              href="/learn"
              className="btn-term rounded-[3px] border border-phos/35 px-6 py-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-phos2 hover:border-phos"
            >
              ▸ view full map
            </Link>
          </div>
          <div className="mx-auto mt-8 flex max-w-sm justify-center">
            <Bar percent={0} accent="lime" blocks={24} />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            expedition_progress: 0% — let's fix that<span className="caret" />
          </p>
        </Panel>
      </section>
    </div>
  );
}
