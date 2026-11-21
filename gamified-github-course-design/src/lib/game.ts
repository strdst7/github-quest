import { badgeCatalog, levels, modules, xp, type Module } from "@/lib/course";

export const STEP_KINDS = {
  concept: { prefix: "concept", xp: xp.lesson, label: "Concept" },
  activity: { prefix: "activity", xp: xp.activity, label: "Activity" },
  mission: { prefix: "mission", xp: xp.missionItem, label: "Mission step" },
} as const;

export type StepKind = keyof typeof STEP_KINDS | "quiz" | "boss" | "phoenix";

export function conceptKey(moduleKey: string, id: string) {
  return `${moduleKey}:concept:${id}`;
}
export function activityKey(moduleKey: string, id: string) {
  return `${moduleKey}:activity:${id}`;
}
export function quizKey(moduleKey: string) {
  return `${moduleKey}:quiz`;
}

/** Every trackable step in the whole course, with its XP value. */
export function allSteps(): { key: string; moduleKey: string; kind: StepKind; xp: number }[] {
  const out: { key: string; moduleKey: string; kind: StepKind; xp: number }[] = [];
  for (const m of modules) {
    for (const c of m.concepts) out.push({ key: conceptKey(m.key, c.id), moduleKey: m.key, kind: "concept", xp: xp.lesson });
    for (const a of m.activities) out.push({ key: activityKey(m.key, a.id), moduleKey: m.key, kind: "activity", xp: xp.activity });
    for (const mi of m.mission.items) out.push({ key: mi.id, moduleKey: m.key, kind: "mission", xp: xp.missionItem });
    out.push({ key: quizKey(m.key), moduleKey: m.key, kind: "quiz", xp: xp.quizPass });
  }
  return out;
}

export function xpForStep(key: string): { kind: StepKind; xp: number; moduleKey: string } | null {
  const step = allSteps().find((s) => s.key === key);
  if (step) return { kind: step.kind, xp: step.xp, moduleKey: step.moduleKey };
  if (key === "phoenix-feather") return { kind: "phoenix", xp: xp.phoenix, moduleKey: "m3" };
  if (key.startsWith("boss:")) return { kind: "boss", xp: 0, moduleKey: "m8" };
  return null;
}

export function levelFor(totalXp: number) {
  let current = levels[0];
  let next: (typeof levels)[number] | null = null;
  for (let i = 0; i < levels.length; i += 1) {
    if (totalXp >= levels[i].minXp) {
      current = levels[i];
      next = levels[i + 1] ?? null;
    }
  }
  const span = next ? next.minXp - current.minXp : 1;
  const into = next ? totalXp - current.minXp : span;
  return {
    ...current,
    next,
    progress: next ? Math.max(0, Math.min(100, Math.round((into / span) * 100))) : 100,
    xpToNext: next ? Math.max(0, next.minXp - totalXp) : 0,
    maxXp: levels[levels.length - 1].minXp,
  };
}

export type ModuleStats = {
  module: Module;
  done: number;
  total: number;
  percent: number;
  earnedXp: number;
  maxXp: number;
  conceptsDone: number;
  activitiesDone: number;
  missionDone: number;
  quizDone: boolean;
  badgeEarned: boolean;
  complete: boolean;
};

export function moduleStats(m: Module, completed: Set<string>): ModuleStats {
  const conceptKeys = m.concepts.map((c) => conceptKey(m.key, c.id));
  const activityKeys = m.activities.map((a) => activityKey(m.key, a.id));
  const missionKeys = m.mission.items.map((i) => i.id);
  const qk = quizKey(m.key);

  const conceptsDone = conceptKeys.filter((k) => completed.has(k)).length;
  const activitiesDone = activityKeys.filter((k) => completed.has(k)).length;
  const missionDone = missionKeys.filter((k) => completed.has(k)).length;
  const quizDone = completed.has(qk);

  const done = conceptsDone + activitiesDone + missionDone + (quizDone ? 1 : 0);
  const total = conceptKeys.length + activityKeys.length + missionKeys.length + 1;
  const earnedXp =
    conceptsDone * xp.lesson +
    activitiesDone * xp.activity +
    missionDone * xp.missionItem +
    (quizDone ? xp.quizPass : 0) +
    (conceptsDone + activitiesDone + missionDone === conceptKeys.length + activityKeys.length + missionKeys.length && quizDone
      ? xp.missionBonus
      : 0);
  const maxXp =
    conceptKeys.length * xp.lesson +
    activityKeys.length * xp.activity +
    missionKeys.length * xp.missionItem +
    xp.quizPass +
    xp.missionBonus;

  const complete = done === total;

  return {
    module: m,
    done,
    total,
    percent: Math.round((done / total) * 100),
    earnedXp,
    maxXp,
    conceptsDone,
    activitiesDone,
    missionDone,
    quizDone,
    badgeEarned: complete,
    complete,
  };
}

/** Badge rules: derived from completed steps so nothing can ever be lost. */
export function deriveBadges(completed: Set<string>): { key: string; reason: string }[] {
  const earned: { key: string; reason: string }[] = [];
  const all = allSteps();

  for (const m of modules) {
    const stats = moduleStats(m, completed);
    if (stats.complete) earned.push({ key: m.achievement.badgeKey, reason: m.achievement.title });
  }

  if (completed.has(activityKey("m3", "phoenix"))) {
    earned.push({ key: "phoenix", reason: "Broke it, then fixed it." });
  }
  if (completed.has(activityKey("m1", "profile-readme"))) {
    earned.push({ key: "storyteller", reason: "Published a profile README." });
  }
  if (completed.has(activityKey("m7", "kindness"))) {
    earned.push({ key: "kindness-sprint", reason: "Left helpful comments in the wild." });
  }
  if (completed.has("boss:submitted")) {
    earned.push({ key: "octoverse-legend", reason: "Submitted the Boss Mission." });
  }
  if (all.every((s) => completed.has(s.key))) {
    earned.push({ key: "cartographer", reason: "100% of every step." });
  }

  return earned;
}

export function badgeByKey(key: string) {
  return badgeCatalog.find((b) => b.key === key) ?? null;
}

export const courseXpTotal = allSteps().reduce((s, step) => s + step.xp, 0) + xp.boss + xp.phoenix;
