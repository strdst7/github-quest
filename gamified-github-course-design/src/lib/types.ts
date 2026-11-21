export type LevelInfo = {
  level: number;
  name: string;
  minXp: number;
  emoji: string;
  note: string;
  next: { level: number; name: string; minXp: number; emoji: string; note: string } | null;
  progress: number;
  xpToNext: number;
  maxXp: number;
};

export type ModuleProgress = {
  key: string;
  done: number;
  total: number;
  percent: number;
  earnedXp: number;
  maxXp: number;
  complete: boolean;
  badgeEarned: boolean;
  quizDone: boolean;
};

export type PlayerRow = {
  id: string;
  name: string;
  githubHandle: string | null;
  guild: string | null;
  xp: number;
  phoenixFeathers: number;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type FinalProjectRow = {
  id: string;
  projectTitle: string;
  repoUrl: string | null;
  highlights: string | null;
  rubric: Record<string, number>;
  selfScore: number;
  submitted: boolean;
  submittedAt: string | Date | null;
  updatedAt?: string | Date;
};

export type Snapshot = {
  learner: PlayerRow;
  completed: string[];
  badges: string[];
  xp: number;
  level: LevelInfo;
  modules: ModuleProgress[];
  quizzes: Record<string, { score: number; total: number; passed: boolean }>;
  finalProject: FinalProjectRow | null;
  coursePercent: number;
};

export type WorldStats = {
  players: number;
  stepsCompleted: number;
  badgesAwarded: number;
  xpBanked: number;
  totalSteps: number;
};

export type LeaderRow = {
  id: string;
  name: string;
  handle: string | null;
  guild: string | null;
  xp: number;
  level: LevelInfo;
};
