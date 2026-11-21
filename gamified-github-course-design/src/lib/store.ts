import { and, count, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { badges, finalProjects, learners, quizAttempts, stepProgress } from "@/db/schema";
import { branding, modules } from "@/lib/course";
import {
  allSteps,
  deriveBadges,
  levelFor,
  moduleStats,
  quizKey,
  xpForStep,
} from "@/lib/game";
import { xp as XP } from "@/lib/course";

export type Snapshot = Awaited<ReturnType<typeof getSnapshot>>;

export async function getOrCreateLearner(idFromCookie: string | null) {
  let learner = null;
  if (idFromCookie) {
    const rows = await db.select().from(learners).where(eq(learners.id, idFromCookie)).limit(1);
    learner = rows[0] ?? null;
  }
  if (!learner) {
    const created = await db
      .insert(learners)
      .values({
        name: branding.learner,
        githubHandle: branding.handle,
        guild: branding.school,
      })
      .returning();
    learner = created[0];
  }
  return learner;
}

export async function getSnapshot(learnerId: string) {
  const [learnerRow, stepRows, badgeRows, quizRows, projectRow] = await Promise.all([
    db.select().from(learners).where(eq(learners.id, learnerId)).limit(1),
    db
      .select()
      .from(stepProgress)
      .where(eq(stepProgress.learnerId, learnerId))
      .orderBy(desc(stepProgress.completedAt)),
    db.select().from(badges).where(eq(badges.learnerId, learnerId)),
    db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.learnerId, learnerId))
      .orderBy(desc(quizAttempts.createdAt)),
    db.select().from(finalProjects).where(eq(finalProjects.learnerId, learnerId)).limit(1),
  ]);

  const learner = learnerRow[0];
  const completed = new Set(stepRows.map((s) => s.stepKey));
  const totalXp = computeXp(completed);
  const mods = modules.map((m) => moduleStats(m, completed));
  const earnedBadges = deriveBadges(completed).map((b) => b.key);

  await db
    .update(learners)
    .set({ xp: totalXp })
    .where(eq(learners.id, learnerId));

  const bestQuizzes: Record<string, { score: number; total: number; passed: boolean }> = {};
  for (const q of quizRows) {
    const existing = bestQuizzes[q.moduleKey];
    if (!existing || q.score > existing.score) {
      bestQuizzes[q.moduleKey] = { score: q.score, total: q.total, passed: q.passed };
    }
  }

  return {
    learner,
    completed: [...completed],
    badges: earnedBadges,
    xp: totalXp,
    level: levelFor(totalXp),
    modules: mods.map((s) => ({
      key: s.module.key,
      done: s.done,
      total: s.total,
      percent: s.percent,
      earnedXp: s.earnedXp,
      maxXp: s.maxXp,
      complete: s.complete,
      badgeEarned: s.badgeEarned,
      quizDone: s.quizDone,
    })),
    quizzes: bestQuizzes,
    finalProject: projectRow[0] ?? null,
    coursePercent: Math.round(
      (mods.reduce((s, m) => s + m.done, 0) / mods.reduce((s, m) => s + m.total, 0)) * 100,
    ),
  };
}

function computeXp(completed: Set<string>) {
  let total = 0;
  for (const m of modules) {
    total += moduleStats(m, completed).earnedXp;
  }
  if (completed.has("phoenix-feather")) total += XP.phoenix;
  if (completed.has("boss:submitted")) total += XP.boss;
  return total;
}

export async function toggleStep(
  learnerId: string,
  stepKey: string,
  action: "complete" | "undo",
) {
  const meta = xpForStep(stepKey);
  if (!meta) return { ok: false as const, error: "Unknown step" };

  const existing = await db
    .select()
    .from(stepProgress)
    .where(and(eq(stepProgress.learnerId, learnerId), eq(stepProgress.stepKey, stepKey)))
    .limit(1);

  let added = false;
  if (action === "undo") {
    if (existing.length) await db.delete(stepProgress).where(eq(stepProgress.id, existing[0].id));
  } else if (!existing.length) {
    await db
      .insert(stepProgress)
      .values({ learnerId, stepKey, kind: meta.kind, xp: meta.xp });
    added = true;
  }

  await db.update(learners).set({ updatedAt: new Date() }).where(eq(learners.id, learnerId));

  const newBadges = await syncBadges(learnerId);
  const snapshot = await getSnapshot(learnerId);

  return { ok: true as const, added, newBadges, snapshot };
}

async function completedKeys(learnerId: string) {
  const rows = await db
    .select({ key: stepProgress.stepKey })
    .from(stepProgress)
    .where(eq(stepProgress.learnerId, learnerId));
  return new Set(rows.map((r) => r.key));
}

/** Badges are derived from progress, then persisted so they can never be lost. */
async function syncBadges(learnerId: string) {
  const earnedKeys = deriveBadges(await completedKeys(learnerId)).map((b) => b.key);
  const rows = await db.select().from(badges).where(eq(badges.learnerId, learnerId));
  const have = new Set(rows.map((r) => r.badgeKey));
  const toAdd = earnedKeys.filter((k) => !have.has(k));
  if (toAdd.length) {
    await db
      .insert(badges)
      .values(toAdd.map((badgeKey) => ({ learnerId, badgeKey })))
      .onConflictDoNothing();
  }
  return toAdd;
}

export async function submitQuiz(
  learnerId: string,
  moduleKey: string,
  answers: Record<string, number>,
) {
  const mod = modules.find((m) => m.key === moduleKey);
  if (!mod) return { ok: false as const, error: "Unknown module" };

  let score = 0;
  const results = mod.quiz.map((q) => {
    const given = answers[q.id];
    const correct = given === q.answer;
    if (correct) score += 1;
    return { id: q.id, correct, correctAnswer: q.answer, why: q.why };
  });

  const total = mod.quiz.length;
  const passed = score >= Math.ceil(total * 0.75);

  await db.insert(quizAttempts).values({ learnerId, moduleKey, score, total, answers, passed });

  const qk = quizKey(moduleKey);
  const existing = await db
    .select()
    .from(stepProgress)
    .where(and(eq(stepProgress.learnerId, learnerId), eq(stepProgress.stepKey, qk)))
    .limit(1);

  if (passed && !existing.length) {
    await db.insert(stepProgress).values({ learnerId, stepKey: qk, kind: "quiz", xp: XP.quizPass });
  }

  await syncBadges(learnerId);
  const snapshot = await getSnapshot(learnerId);

  return { ok: true as const, score, total, passed, results, snapshot };
}

export async function saveFinalProject(
  learnerId: string,
  input: {
    projectTitle?: string;
    repoUrl?: string;
    highlights?: string;
    rubric?: Record<string, number>;
    submitted?: boolean;
  },
) {
  const rubricScores = input.rubric ?? {};
  const selfScore = Object.values(rubricScores).reduce((s, v) => s + (Number(v) || 0), 0);

  const existing = await db
    .select()
    .from(finalProjects)
    .where(eq(finalProjects.learnerId, learnerId))
    .limit(1);

  const payload = {
    projectTitle: input.projectTitle ?? "My Octoverse Passport",
    repoUrl: input.repoUrl ?? null,
    highlights: input.highlights ?? null,
    rubric: rubricScores,
    selfScore,
    submitted: Boolean(input.submitted),
    submittedAt: input.submitted ? new Date() : null,
    updatedAt: new Date(),
  };

  if (existing.length) {
    await db.update(finalProjects).set(payload).where(eq(finalProjects.id, existing[0].id));
  } else {
    await db.insert(finalProjects).values({ ...payload, learnerId });
  }

  if (input.submitted) {
    const already = await db
      .select()
      .from(stepProgress)
      .where(and(eq(stepProgress.learnerId, learnerId), eq(stepProgress.stepKey, "boss:submitted")))
      .limit(1);
    if (!already.length) {
      await db
        .insert(stepProgress)
        .values({ learnerId, stepKey: "boss:submitted", kind: "boss", xp: XP.boss });
    }
  }

  await syncBadges(learnerId);
  const snapshot = await getSnapshot(learnerId);

  return { ok: true as const, selfScore, snapshot };
}

export async function updateProfile(learnerId: string, input: { name?: string; githubHandle?: string; guild?: string }) {
  await db
    .update(learners)
    .set({
      name: input.name ?? undefined,
      githubHandle: input.githubHandle ?? undefined,
      guild: input.guild ?? undefined,
      updatedAt: new Date(),
    })
    .where(eq(learners.id, learnerId));
  return getSnapshot(learnerId);
}

export async function awardPhoenix(learnerId: string) {
  const existing = await db
    .select()
    .from(stepProgress)
    .where(and(eq(stepProgress.learnerId, learnerId), eq(stepProgress.stepKey, "phoenix-feather")))
    .limit(1);
  if (!existing.length) {
    await db.insert(stepProgress).values({
      learnerId,
      stepKey: "phoenix-feather",
      kind: "phoenix",
      xp: XP.phoenix,
    });
    await db
      .update(learners)
      .set({ phoenixFeathers: sql`${learners.phoenixFeathers} + 1` })
      .where(eq(learners.id, learnerId));
  }
  await syncBadges(learnerId);
  return { ok: true as const, snapshot: await getSnapshot(learnerId) };
}

export async function resetProgress(learnerId: string) {
  await db.delete(stepProgress).where(eq(stepProgress.learnerId, learnerId));
  await db.delete(badges).where(eq(badges.learnerId, learnerId));
  await db.delete(quizAttempts).where(eq(quizAttempts.learnerId, learnerId));
  await db.delete(finalProjects).where(eq(finalProjects.learnerId, learnerId));
  await db
    .update(learners)
    .set({ xp: 0, phoenixFeathers: 0, updatedAt: new Date() })
    .where(eq(learners.id, learnerId));
  return getSnapshot(learnerId);
}

export async function getWorldStats() {
  const [playerRows, stepRows, badgeRows] = await Promise.all([
    db.select({ value: count() }).from(learners),
    db.select({ value: count() }).from(stepProgress),
    db.select({ value: count() }).from(badges),
  ]);
  const xpRow = await db
    .select({ value: sql<number>`coalesce(sum(${learners.xp}), 0)` })
    .from(learners);
  return {
    players: playerRows[0]?.value ?? 0,
    stepsCompleted: stepRows[0]?.value ?? 0,
    badgesAwarded: badgeRows[0]?.value ?? 0,
    xpBanked: Number(xpRow[0]?.value ?? 0),
    totalSteps: allSteps().length,
  };
}

export async function getLeaderboard() {
  const rows = await db
    .select({
      name: learners.name,
      handle: learners.githubHandle,
      xp: learners.xp,
      guild: learners.guild,
      id: learners.id,
    })
    .from(learners)
    .orderBy(desc(learners.xp))
    .limit(8);
  return rows.map((r) => ({ ...r, level: levelFor(r.xp) }));
}
