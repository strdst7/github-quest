"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LeaderRow, Snapshot, WorldStats } from "@/lib/types";
import { badgeCatalog, branding } from "@/lib/course";
import { levelFor } from "@/lib/game";

const EMPTY_WORLD: WorldStats = { players: 0, stepsCompleted: 0, badgesAwarded: 0, xpBanked: 0, totalSteps: 0 };

const EMPTY_SNAPSHOT: Snapshot = {
  learner: {
    id: "",
    name: branding.learner,
    githubHandle: branding.handle,
    guild: branding.school,
    xp: 0,
    phoenixFeathers: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  completed: [],
  badges: [],
  xp: 0,
  level: levelFor(0),
  modules: [],
  quizzes: {},
  finalProject: null,
  coursePercent: 0,
};

type Toast = {
  id: number;
  emoji: string;
  title: string;
  body?: string;
  tone: "xp" | "badge" | "info" | "level";
};

type QuizResult = { id: string; correct: boolean; correctAnswer: number; why: string };

type Ctx = {
  snapshot: Snapshot;
  world: WorldStats;
  leaderboard: LeaderRow[];
  toasts: Toast[];
  busy: boolean;
  refresh: () => Promise<void>;
  toggle: (stepKey: string, action?: "complete" | "undo") => Promise<void>;
  runQuiz: (moduleKey: string, answers: Record<string, number>) => Promise<QuizResult[] | null>;
  saveProject: (payload: {
    projectTitle?: string;
    repoUrl?: string;
    highlights?: string;
    rubric?: Record<string, number>;
    submitted?: boolean;
  }) => Promise<number>;
  saveProfile: (payload: { name?: string; githubHandle?: string; guild?: string }) => Promise<void>;
  resetAll: () => Promise<void>;
  dismiss: (id: number) => void;
};

const GameContext = createContext<Ctx | null>(null);

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}

export function GameProvider({
  children,
  initialSnapshot,
  initialWorld,
  initialLeaderboard,
}: {
  children: ReactNode;
  initialSnapshot: Snapshot | null;
  initialWorld: WorldStats | null;
  initialLeaderboard: LeaderRow[] | null;
}) {
  const [snapshot, setSnapshot] = useState<Snapshot>(initialSnapshot ?? EMPTY_SNAPSHOT);
  const [world, setWorld] = useState<WorldStats>(initialWorld ?? EMPTY_WORLD);
  const [leaderboard, setLeaderboard] = useState<LeaderRow[]>(initialLeaderboard ?? []);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [busy, setBusy] = useState(false);
  const toastId = useRef(1);
  const prevLevel = useRef(initialSnapshot?.level.level ?? 1);
  const prevBadges = useRef<Set<string>>(new Set(initialSnapshot?.badges ?? []));

  const push = useCallback((toast: Omit<Toast, "id">) => {
    const id = toastId.current++;
    setToasts((t) => [...t, { ...toast, id }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4800);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const celebrate = useCallback(
    (next: Snapshot, xpBefore: number, badgesBefore: Set<string>) => {
      const gained = next.xp - xpBefore;
      if (gained > 0) {
        push({ emoji: "+", title: `${gained} XP COMMITTED`, body: `balance: ${next.xp} xp`, tone: "xp" });
      }
      for (const key of next.badges) {
        if (!badgesBefore.has(key)) {
          const b = badgeCatalog.find((x) => x.key === key);
          push({
            emoji: b?.emoji ?? "🏅",
            title: `PATCH UNLOCKED: ${b?.title ?? key}`,
            body: b?.blurb,
            tone: "badge",
          });
        }
      }
      if (next.level.level > prevLevel.current) {
        push({
          emoji: next.level.emoji,
          title: `LEVEL ${next.level.level} — ${next.level.name.toUpperCase()}`,
          body: next.level.note,
          tone: "level",
        });
      }
      prevLevel.current = next.level.level;
      prevBadges.current = new Set(next.badges);
    },
    [push],
  );

  const refresh = useCallback(async () => {
    const res = await fetch("/api/me", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setSnapshot(data.snapshot);
    setWorld(data.world);
    setLeaderboard(data.leaderboard);
  }, []);

  const toggle = useCallback<Ctx["toggle"]>(
    async (stepKey, action = "complete") => {
      const before = snapshot;
      setBusy(true);
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stepKey, action }),
        });
        const data = await res.json();
        if (data.ok) {
          setSnapshot(data.snapshot);
          celebrate(data.snapshot, before.xp, new Set(before.badges));
        }
      } finally {
        setBusy(false);
      }
    },
    [snapshot, celebrate],
  );

  const runQuiz = useCallback<Ctx["runQuiz"]>(
    async (moduleKey, answers) => {
      const before = snapshot;
      setBusy(true);
      try {
        const res = await fetch("/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleKey, answers }),
        });
        const data = await res.json();
        if (data.ok) {
          setSnapshot(data.snapshot);
          if (data.passed) {
            push({
              emoji: "✓",
              title: `DIAGNOSTIC PASSED ${data.score}/${data.total}`,
              body: "+25 xp written to db",
              tone: "xp",
            });
          } else {
            push({
              emoji: "✗",
              title: `DIAGNOSTIC ${data.score}/${data.total} — below 75%`,
              body: "read the [fail] reasons, then re-run. no penalty, ever.",
              tone: "info",
            });
          }
          celebrate(data.snapshot, before.xp, new Set(before.badges));
          return data.results as QuizResult[];
        }
        return null;
      } finally {
        setBusy(false);
      }
    },
    [snapshot, celebrate, push],
  );

  const saveProject = useCallback<Ctx["saveProject"]>(
    async (payload) => {
      const before = snapshot;
      setBusy(true);
      try {
        const res = await fetch("/api/final-project", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.ok) {
          setSnapshot(data.snapshot);
          celebrate(data.snapshot, before.xp, new Set(before.badges));
          return data.selfScore as number;
        }
        return 0;
      } finally {
        setBusy(false);
      }
    },
    [snapshot, celebrate],
  );

  const saveProfile = useCallback<Ctx["saveProfile"]>(
    async (payload) => {
      setBusy(true);
      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.ok) {
          setSnapshot(data.snapshot);
          push({ emoji: "✓", title: "RECORD COMMITTED", body: "whoami updated", tone: "info" });
        }
      } finally {
        setBusy(false);
      }
    },
    [push],
  );

  const resetAll = useCallback(async () => {
    const res = await fetch("/api/reset", { method: "POST" });
    const data = await res.json();
    if (data.ok) {
      setSnapshot(data.snapshot);
      prevLevel.current = 1;
      prevBadges.current = new Set();
      push({ emoji: "↺", title: "HARD RESET COMPLETE", body: "back to level 1. the octoverse forgives everything.", tone: "info" });
    }
  }, [push]);

  // A brand-new visitor has no player row yet: create one on first mount.
  useEffect(() => {
    if (!initialSnapshot) void refresh();
  }, [initialSnapshot, refresh]);

  useEffect(() => {
    if (!initialSnapshot) return;
    prevLevel.current = initialSnapshot.level.level;
    prevBadges.current = new Set(initialSnapshot.badges);
  }, [initialSnapshot]);

  const value = useMemo<Ctx>(
    () => ({
      snapshot,
      world,
      leaderboard,
      toasts,
      busy,
      refresh,
      toggle,
      runQuiz,
      saveProject,
      saveProfile,
      resetAll,
      dismiss,
    }),
    [snapshot, world, leaderboard, toasts, busy, refresh, toggle, runQuiz, saveProject, saveProfile, resetAll, dismiss],
  );

  return (
    <GameContext.Provider value={value}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </GameContext.Provider>
  );
}

function ToastStack({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  const tone: Record<Toast["tone"], { color: string; tag: string }> = {
    xp: { color: "phos", tag: "ok" },
    badge: { color: "amber", tag: "unlock" },
    level: { color: "violet", tag: "lvl" },
    info: { color: "cyan", tag: "info" },
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(23rem,calc(100vw-2rem))] flex-col gap-2">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => onDismiss(t.id)}
          className="slide-in pointer-events-auto relative w-full overflow-hidden rounded-[3px] border border-phos/35 bg-screen2/95 px-3.5 py-3 text-left font-mono shadow-[0_0_28px_rgba(0,0,0,0.7)] transition hover:border-phos/70"
        >
          <span
            className="absolute inset-y-0 left-0 w-[3px]"
            style={{ backgroundColor: tone[t.tone].color, boxShadow: `0 0 12px ${tone[t.tone].color}` }}
            aria-hidden
          />
          <span className="ml-1.5 flex items-baseline gap-2">
            <span
              className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{ color: tone[t.tone].color }}
            >
              [{tone[t.tone].tag}]
            </span>
            <span className="min-w-0">
              <span className="block text-[12.5px] font-bold leading-snug text-ink">
                {t.emoji} {t.title}
              </span>
              {t.body ? (
                <span className="mt-0.5 block text-[11.5px] lowercase leading-snug text-dim">{t.body}</span>
              ) : null}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
