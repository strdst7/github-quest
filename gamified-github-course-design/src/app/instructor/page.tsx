import Link from "next/link";
import {
  Callout,
  FieldNote,
  Kicker,
  Panel,
  Pill,
  SectionTitle,
  SimpleTable,
  Stat,
} from "@/components/ui";
import {
  branding,
  course,
  glossary,
  gradingBands,
  guildQuests,
  modules,
  resources,
  rubric,
  schedule,
  totalMinutes,
} from "@/lib/course";

const failurePoints = [
  {
    moment: "email verification code never arrives (level 01)",
    fix: "Have the inbox open in a second tab before you start. Check spam, hit resend, try another address. Never let this stall the room for more than 3 minutes — pair the learner with a neighbour while it resolves.",
  },
  {
    moment: "handle regret (level 01)",
    fix: "Handles can be changed in Settings → Account, but the old URL breaks. Suggest firstname-lastname or a durable nickname; warn against numbers and inside jokes.",
  },
  {
    moment: "“where is the new folder button?” (level 02)",
    fix: "There isn't one. Demo the slash trick slowly: type notes/ and the folder appears when you name the file. This is the single most common stuck-point in the course.",
  },
  {
    moment: "repo created private by accident (level 02)",
    fix: "Settings → General → Danger Zone → Change visibility. It's reversible, so make the recovery part of the lesson rather than a rescue.",
  },
  {
    moment: "commit messages like “update” (level 03)",
    fix: "Write five terrible messages on the board, let the room improve them out loud, then have learners rewrite their own worst one with a fresh commit.",
  },
  {
    moment: "“my file disappeared!” after switching to main (level 04)",
    fix: "Do not rescue it. Let the panic land for ten seconds, then have them switch back with the dropdown. That moment IS the lesson on branches.",
  },
  {
    moment: "editing on main by accident (levels 04–05)",
    fix: "Teach the habit: read the branch dropdown out loud before every edit. Recover by creating a branch from the current state and restoring main from an older commit's content.",
  },
  {
    moment: "base vs compare confusion on the PR screen (level 05)",
    fix: "Chant it: “base is where I'm going, compare is where I'm coming from.” If the arrows look wrong, they can flip it with the swap icon.",
  },
  {
    moment: "merge conflict panic (level 05)",
    fix: "Show one live before they meet one. Say the line out loud: “this is a question, not an error.” Worst case is a messy file fixed by another commit.",
  },
  {
    moment: "learners think “issue” means “problem” (level 06)",
    fix: "Open a healthy repo with 400 open issues and call it a sign of life. Have them file an idea and a question before any bug.",
  },
  {
    moment: "sharing passwords to collaborate (level 06)",
    fix: "Hard stop. Settings → Collaborators → Add people. Explain that a shared login destroys history attribution, which is the entire point of the tool.",
  },
  {
    moment: "endless browsing rabbit hole (level 07)",
    fix: "Set a visible 5-minute timer on Explore. Give a hunt list: one project about food, one in a language you speak, one with a README you'd copy.",
  },
  {
    moment: "spammy “great project!!!” comments (level 07)",
    fix: "Ban them explicitly. Every comment must contain something a maintainer can act on. Show a good typo report as the model.",
  },
  {
    moment: "final projects all look identical (level 08)",
    fix: "Show three example Passports at different quality levels so learners calibrate against the rubric rather than against each other.",
  },
];

const prep = [
  "A projector, and your own GitHub logged in on a browser profile learners can't accidentally inherit.",
  "Three example repos prepared in advance: one terrible README, one great README, one with a merged PR and closed issues to click through.",
  "A demo repo where you will deliberately create a merge conflict live.",
  "Learners bring: an email they can open now, and three files they'd happily publish (a photo, a note, a recipe).",
  "A shared channel (class group, Discord, shared doc) for the launch wall of repo links.",
  "Printed or bookmarked man-page glossary — one per learner.",
  "Optional: printed patches or stickers. Physical stamps beat digital ones in a live room.",
];

const differentiation = [
  {
    who: "finishers flying ahead",
    what: "Side quests: turn on GitHub Pages for their Passport, add a licence, pin the repo to their profile, then attempt a real 'good first issue' pull request. Finally, ask them to teach the next table level 03.",
  },
  {
    who: "learners who are stuck",
    what: "Never take over the mouse. Point at the screen, name the button, let them click. Fall back to the mission checklist — it is the minimum viable path through each level.",
  },
  {
    who: "anxious / perfectionist learners",
    what: "Send them straight to the Phoenix Feather quest. Deleting your own README on purpose and restoring it cures more anxiety than any amount of reassurance.",
  },
  {
    who: "learners who already use git",
    what: "Give them the peer-review role and the guild quests to run. Ask them to explain merging without using the words HEAD, index, or reflog.",
  },
  {
    who: "non-english-first classrooms",
    what: "Keep the interface in English (GitHub is English-first) but allow commit messages and READMEs in the learner's own language. The mechanics transfer perfectly and the README becomes a bilingual showcase.",
  },
  {
    who: "low-bandwidth / shared-device rooms",
    what: "Pairs on one machine work beautifully: one drives, one reads the mission checklist aloud and calls out which branch you're on. Swap every task.",
  },
];

export default function InstructorPage() {
  return (
    <div className="space-y-12">
      {/* ── man header ─────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Kicker accent="violet">🎒 {branding.school} · operator manual</Kicker>
          <Pill>printable</Pill>
          <Pill>room-ready</Pill>
        </div>

        <SectionTitle
          number="A"
          kicker="man gitquest --operator"
          title={<>how to run gitquest <span className="text-violet">in a real room</span></>}
          sub="Timings, prep, the fourteen places beginners actually get stuck, and how to grade without killing the fun."
          accent="violet"
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={`${(totalMinutes / 60).toFixed(1)}h`} label="contact time" emoji="⏱" accent="lime" />
          <Stat value={modules.length} label="levels to run" emoji="▤" accent="coral" />
          <Stat value={failurePoints.length} label="known stuck points" emoji="!!" accent="gold" />
          <Stat value="20pt" label="assessment surface" emoji="▣" accent="aqua" />
        </div>

        <Panel title={<span><span className="text-phos">$</span> cat ./philosophy</span>}>
          <div className="p-5">
            <div className="grid gap-3 md:grid-cols-2">
              {course.format.rules.map((r, i) => (
                <FieldNote key={r} n={String(i + 1)} title={`rule_${i + 1}`} accent="violet">
                  {r}
                </FieldNote>
              ))}
            </div>
            <div className="mt-5">
              <Callout emoji="🗣" title="the one-line pitch to open with" accent="lime">
                “GitHub is a website that keeps every version of your work forever and lets you invite
                people in. We're going to use it like a game, and you are not going to type a single
                command.”
              </Callout>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── B run of show ──────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionTitle number="B" kicker="timings" title="crontab -l ./workshop" accent="lime" />
        <Panel title={<span><span className="text-phos">$</span> crontab -l</span>}>
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
                At the session break everyone should hold level 4 and four patches. Anyone behind gets a
                buddy, not a lecture.
              </FieldNote>
              <FieldNote n="iii" title="close" accent="gold">
                End with the launch wall: three volunteers demo their Passport in two minutes each, then
                everybody posts their link in the shared channel.
              </FieldNote>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── C per level ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionTitle
          number="C"
          kicker="level by level"
          title="./facilitate --all --notes"
          sub="Everything you need per level in one row: how long it takes, what learners produce, and what to watch for."
          accent="coral"
        />
        <Panel title={<span><span className="text-magenta">$</span> ./facilitate --all</span>} accent="coral">
          <div className="p-4">
            <SimpleTable
              head={["level", "time", "expected student output", "operator notes"]}
              rows={modules.map((m) => [
                <span key={m.key}>
                  <Link href={`/learn/${m.key}`} className="text-phos2 hover:underline">
                    {m.emoji} {String(m.index).padStart(2, "0")}_{m.key}
                  </Link>
                  <span className="block text-[11px] text-dim">{m.title} — {m.subtitle}</span>
                </span>,
                <span key={`${m.key}-t`} className="whitespace-nowrap font-mono text-[11.5px]">
                  {m.minutes}m
                </span>,
                <span key={`${m.key}-d`}>
                  {m.activities.map((act) => act.deliverable).join(" · ")}
                  <span className="mt-1 block text-[11px] text-dim">
                    mission: {m.mission.items.length} checks → {m.mission.reward}
                  </span>
                </span>,
                <ul key={`${m.key}-n`} className="space-y-1 text-[11.5px]">
                  {m.instructorNotes.map((n) => (
                    <li key={n}># {n}</li>
                  ))}
                </ul>,
              ])}
            />
          </div>
        </Panel>
      </section>

      {/* ── D stuck points ─────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionTitle
          number="D"
          kicker="troubleshooting"
          title="dmesg | grep stuck"
          accent="gold"
        />
        <Panel title={<span><span className="text-amber">!!</span> dmesg --level=warn</span>} accent="gold">
          <div className="p-4">
            <SimpleTable
              head={["the moment", "what you do"]}
              rows={failurePoints.map((f) => [
                <span key={f.moment} className="text-amber2">
                  {f.moment}
                </span>,
                f.fix,
              ])}
            />
          </div>
        </Panel>
      </section>

      {/* ── E differentiation + prep ───────────────────────────────────── */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title={<span><span className="text-violet">$</span> ./differentiate --profiles</span>} accent="violet">
          <div className="space-y-2.5 p-4">
            {differentiation.map((d) => (
              <div key={d.who} className="rounded-[3px] border-l-2 border-violet/60 bg-violet/6 p-3.5">
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-violet2">
                  {d.who}
                </p>
                <p className="mt-1 font-mono text-[12px] leading-relaxed text-dim">{d.what}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title={<span><span className="text-phos">$</span> ./prep --checklist</span>}>
            <ul className="space-y-1.5 p-4">
              {prep.map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-[3px] border border-dashed border-phos/22 bg-phos/4 px-3.5 py-2.5">
                  <span className="mt-[1px] font-mono text-[12.5px] font-bold text-phos">[ ]</span>
                  <span className="font-mono text-[12px] leading-relaxed text-body">{p}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title={<span><span className="text-cyan">$</span> cat ./assessment.policy</span>} accent="aqua">
            <div className="p-5">
              <ul className="space-y-2.5 font-mono text-[12.5px] leading-relaxed text-dim">
                <li>
                  <span className="text-cyan2">diagnostics:</span> 4 questions per level, 75% to
                  pass, unlimited retakes, reasons always printed. Never grade a diagnostic — it's a
                  feedback device.
                </li>
                <li>
                  <span className="text-cyan2">patches:</span> written automatically when every man
                  page, task, mission step and diagnostic in a level is complete. No partial patches, no
                  expiry.
                </li>
                <li>
                  <span className="text-cyan2">final project:</span> the only formally graded item.
                  Five rubric rows × 4 points = 20. Pass at 12. Self-score first, peer/operator verifies.
                </li>
                <li>
                  <span className="text-cyan2">mistakes:</span> never penalised. The Phoenix Feather
                  actively rewards breaking and repairing something.
                </li>
              </ul>
              <div className="mt-4">
                <SimpleTable
                  head={["score", "rank", "feedback to give"]}
                  rows={gradingBands.map((b) => [
                    <span key={b.band} className="font-mono font-bold text-ink">
                      {b.band}
                    </span>,
                    b.label,
                    b.note,
                  ])}
                />
              </div>
              <p className="mt-4 font-mono text-[12px] text-dim">
                # full rubric wording and the interactive scorer:{" "}
                <Link href="/final-mission" className="text-cyan2 underline decoration-dotted">
                  ./deploy.sh
                </Link>
              </p>
            </div>
          </Panel>
        </div>
      </section>

      {/* ── F scope ────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionTitle
          number="E"
          kicker="scope control"
          title="must-know vs defer, level by level"
          sub="If a learner only remembers the left column, the course still worked. The right column is explicitly deferred — mention it once, then move on."
          accent="lime"
        />
        <Panel title={<span><span className="text-phos">$</span> diff must-know.txt defer.txt</span>}>
          <div className="p-4">
            <SimpleTable
              head={["level", "[+] must know", "[~] defer"]}
              rows={modules.map((m) => [
                `${m.emoji} ${m.title}`,
                <ul key={`${m.key}-must`} className="space-y-1 text-[11.5px] text-phos2">
                  {m.mustKnow.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>,
                <ul key={`${m.key}-nice`} className="space-y-1 text-[11.5px] text-amber2">
                  {m.niceToKnow.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>,
              ])}
            />
            <div className="mt-5 rounded-[3px] border border-magenta/55 bg-magenta/8 p-4">
              <p className="font-display text-[24px] leading-none text-magenta2 glow-magenta">
                ⛔ blacklisted
              </p>
              <p className="mt-2 font-mono text-[12.5px] leading-relaxed text-magenta2">
                Terminal commands, installing git, SSH keys and tokens, cloning and pushing from a
                computer, rebase / squash / cherry-pick, hooks, CI/CD, and git internals (
                {glossary[glossary.length - 1].term.toLowerCase()}). Introduce these only after the boss
                mission, and only when a learner asks.
              </p>
            </div>
          </div>
        </Panel>
      </section>

      {/* ── G guild + resources ────────────────────────────────────────── */}
      <section className="grid gap-5 lg:grid-cols-2">
        <Panel title={<span><span className="text-violet">$</span> ./guild --how-to-run</span>} accent="violet">
          <div className="space-y-2.5 p-4">
            <p className="font-mono text-[12px] text-dim">
              # slot these into breaks, or use them as the weekly challenge in a six-week classroom run.
            </p>
            {guildQuests.map((g) => (
              <div key={g.key} className="term-flat p-3.5">
                <p className="font-mono text-[12.5px] font-bold text-ink">
                  {g.emoji} {g.title}{" "}
                  <span className="ml-1 text-[10px] uppercase tracking-[0.1em] text-dim">
                    · {g.time} · {g.people}
                  </span>
                </p>
                <p className="mt-1 font-mono text-[11.5px] leading-relaxed text-dim">{g.brief}</p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan2">
                  win: {g.win}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title={<span><span className="text-cyan">$</span> cat ./resources.pack</span>} accent="aqua">
          <div className="p-4">
            <SimpleTable
              head={["resource", "use it for"]}
              rows={resources.links.map((l) => [
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-cyan2 underline decoration-dotted hover:text-cyan"
                >
                  {l.name} ↗
                </a>,
                l.note,
              ])}
            />
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-phos2">
              # rubric rows to print
            </p>
            <div className="mt-2">
              <SimpleTable
                head={["criterion", "level 4 (top marks)"]}
                rows={rubric.map((r) => [r.criterion, r.levels[4]])}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill className="border-phos/45 text-phos2">6 hours total</Pill>
              <Pill className="border-amber/50 text-amber2">8 levels</Pill>
              <Pill className="border-violet/45 text-violet2">12 patches</Pill>
              <Pill className="border-magenta/50 text-magenta2">0 lines of code</Pill>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}
