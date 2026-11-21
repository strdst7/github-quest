import { branding, modules, xp } from "@/lib/course";
import { allSteps, deriveBadges, levelFor, moduleStats, quizKey, xpForStep } from "@/lib/game";
import type {
  FinalProjectRow,
  LeaderRow,
  ModuleProgress,
  PlayerRow,
  Snapshot,
  WorldStats,
} from "@/lib/types";

const STORAGE_KEY = "gq:state:v1";
const PROJECT_ID = "local-project";

export type QuizBest = { score: number; total: number; passed: boolean };

export type LocalState = {
  learner: PlayerRow;
  completed: string[];
  quizzes: Record<string, QuizBest>;
  finalProject: FinalProjectRow | null;
  phoenixFeathers: number;
};

export type QuizResult = {
  id: string;
  correct: boolean;
  correctAnswer: number;
  why: string;
};

export function createEmptyState(): LocalState {
  const now = new Date().toISOString();
  return {
    learner: {
      id: "local-player",
      name: branding.learner,
      githubHandle: branding.handle,
      guild: branding.school,
      xp: 0,
      phoenixFeathers: 0,
      createdAt: now,
      updatedAt: now,
    },
    completed: [],
    quizzes: {},
    finalProject: null,
    phoenixFeathers: 0,
  };
}

export function loadState(): LocalState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw) as Partial<LocalState>;
    const base = createEmptyState();
    return {
      ...base,
      ...parsed,
      learner: { ...base.learner, ...parsed.learner },
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      quizzes: parsed.quizzes ?? {},
      finalProject: parsed.finalProject ?? null,
      phoenixFeathers: parsed.phoenixFeathers ?? 0,
    };
  } catch {
    return createEmptyState();
  }
}

export function saveState(state: LocalState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable in private browsing; the session still works in memory.
  }
}

function computeXp(completed: Set<string>) {
  let total = 0;
  for (const m of modules) {
    total += moduleStats(m, completed).earnedXp;
  }
  if (completed.has("phoenix-feather")) total += xp.phoenix;
  if (completed.has("boss:submitted")) total += xp.boss;
  return total;
}

export function buildSnapshot(state: LocalState): Snapshot {
  const completed = new Set(state.completed);
  const totalXp = computeXp(completed);
  const mods = modules.map((m) => moduleStats(m, completed));

  const snapshotModules: ModuleProgress[] = mods.map((s) => ({
    key: s.module.key,
    done: s.done,
    total: s.total,
    percent: s.percent,
    earnedXp: s.earnedXp,
    maxXp: s.maxXp,
    complete: s.complete,
    badgeEarned: s.badgeEarned,
    quizDone: s.quizDone,
  }));

  return {
    learner: {
      ...state.learner,
      xp: totalXp,
      phoenixFeathers: state.phoenixFeathers,
    },
    completed: [...completed],
    badges: deriveBadges(completed).map((b) => b.key),
    xp: totalXp,
    level: levelFor(totalXp),
    modules: snapshotModules,
    quizzes: state.quizzes,
    finalProject: state.finalProject,
    coursePercent: Math.round(
      (mods.reduce((s, m) => s + m.done, 0) / mods.reduce((s, m) => s + m.total, 0)) * 100,
    ),
  };
}

export function buildWorld(snapshot: Snapshot): WorldStats {
  return {
    players: snapshot.completed.length > 0 ? 1 : 0,
    stepsCompleted: snapshot.completed.length,
    badgesAwarded: snapshot.badges.length,
    xpBanked: snapshot.xp,
    totalSteps: allSteps().length,
  };
}

export function buildLeaderboard(snapshot: Snapshot): LeaderRow[] {
  if (snapshot.xp <= 0) return [];
  return [
    {
      id: snapshot.learner.id,
      name: snapshot.learner.name,
      handle: snapshot.learner.githubHandle,
      guild: snapshot.learner.guild,
      xp: snapshot.xp,
      level: snapshot.level,
    },
  ];
}

export function toggleStep(
  state: LocalState,
  stepKey: string,
  action: "complete" | "undo",
): LocalState | null {
  if (!xpForStep(stepKey)) return null;
  const completed = new Set(state.completed);
  if (action === "undo") completed.delete(stepKey);
  else completed.add(stepKey);

  return {
    ...state,
    completed: [...completed],
    phoenixFeathers: completed.has("phoenix-feather") ? 1 : 0,
    learner: { ...state.learner, updatedAt: new Date().toISOString() },
  };
}

export function submitQuiz(
  state: LocalState,
  moduleKey: string,
  answers: Record<string, number>,
): {
  state: LocalState;
  score: number;
  total: number;
  passed: boolean;
  results: QuizResult[];
} | null {
  const mod = modules.find((m) => m.key === moduleKey);
  if (!mod) return null;

  let score = 0;
  const results = mod.quiz.map((q) => {
    const given = answers[q.id];
    const correct = given === q.answer;
    if (correct) score += 1;
    return { id: q.id, correct, correctAnswer: q.answer, why: q.why };
  });

  const total = mod.quiz.length;
  const passed = score >= Math.ceil(total * 0.75);
  const previous = state.quizzes[moduleKey];
  const best = !previous || score > previous.score ? { score, total, passed } : previous;

  const completed = new Set(state.completed);
  if (passed) completed.add(quizKey(moduleKey));

  return {
    state: {
      ...state,
      completed: [...completed],
      quizzes: { ...state.quizzes, [moduleKey]: best },
      learner: { ...state.learner, updatedAt: new Date().toISOString() },
    },
    score,
    total,
    passed,
    results,
  };
}

export function saveProject(
  state: LocalState,
  input: {
    projectTitle?: string;
    repoUrl?: string;
    highlights?: string;
    rubric?: Record<string, number>;
    submitted?: boolean;
  },
): { state: LocalState; selfScore: number } {
  const rubric = input.rubric ?? {};
  const selfScore = Object.values(rubric).reduce((s, v) => s + (Number(v) || 0), 0);
  const now = new Date().toISOString();
  const existing = state.finalProject;

  const project: FinalProjectRow = {
    id: existing?.id ?? PROJECT_ID,
    projectTitle: input.projectTitle ?? "My Octoverse Passport",
    repoUrl: input.repoUrl ?? null,
    highlights: input.highlights ?? null,
    rubric,
    selfScore,
    submitted: Boolean(input.submitted),
    submittedAt: input.submitted ? now : (existing?.submittedAt ?? null),
    updatedAt: now,
  };

  const completed = new Set(state.completed);
  if (input.submitted) completed.add("boss:submitted");

  return {
    state: {
      ...state,
      completed: [...completed],
      finalProject: project,
      learner: { ...state.learner, updatedAt: now },
    },
    selfScore,
  };
}

export function updateProfile(
  state: LocalState,
  input: { name?: string; githubHandle?: string; guild?: string },
): LocalState {
  return {
    ...state,
    learner: {
      ...state.learner,
      name: input.name?.trim().slice(0, 40) || state.learner.name,
      githubHandle:
        input.githubHandle?.trim().replace(/^@/, "").slice(0, 40) ??
        state.learner.githubHandle,
      guild: input.guild?.slice(0, 40) ?? state.learner.guild,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function resetProgress(state: LocalState): LocalState {
  const empty = createEmptyState();
  return {
    ...empty,
    learner: {
      ...state.learner,
      xp: 0,
      phoenixFeathers: 0,
      updatedAt: new Date().toISOString(),
    },
  };
}
