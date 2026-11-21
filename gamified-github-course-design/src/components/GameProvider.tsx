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
import { badgeCatalog } from "@/lib/course";
import {
  buildLeaderboard,
  buildSnapshot,
  buildWorld,
  createEmptyState,
  loadState,
  resetProgress,
  saveProject,
  saveState,
  submitQuiz,
  toggleStep,
  updateProfile,
  type LocalState,
  type QuizResult,
} from "@/lib/local-store";

type Toast = {
  id: number;
  emoji: string;
  title: string;
  body?: string;
  tone: "xp" | "badge" | "info" | "level";
};

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

const INITIAL_STATE = createEmptyState();
const INITIAL_SNAPSHOT = buildSnapshot(INITIAL_STATE);
const INITIAL_WORLD = buildWorld(INITIAL_SNAPSHOT);

export function GameProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<LocalState>(INITIAL_STATE);
  const [snapshot, setSnapshot] = useState<Snapshot>(INITIAL_SNAPSHOT);
  const [world, setWorld] = useState<WorldStats>(INITIAL_WORLD);
  const [leaderboard, setLeaderboard] = useState<LeaderRow[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [busy, setBusy] = useState(false);
  const toastId = useRef(1);
  const prevLevel = useRef(INITIAL_SNAPSHOT.level.level);
  const prevBadges = useRef<Set<string>>(new Set());

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

  const commit = useCallback((next: LocalState) => {
    stateRef.current = next;
    saveState(next);
    const snap = buildSnapshot(next);
    setSnapshot(snap);
    setWorld(buildWorld(snap));
    setLeaderboard(buildLeaderboard(snap));
    return snap;
  }, []);

  const refresh = useCallback(async () => {
    commit(loadState());
  }, [commit]);

  useEffect(() => {
    const loaded = loadState();
    queueMicrotask(() => {
      stateRef.current = loaded;
      const snap = buildSnapshot(loaded);
      setSnapshot(snap);
      setWorld(buildWorld(snap));
      setLeaderboard(buildLeaderboard(snap));
      prevLevel.current = snap.level.level;
      prevBadges.current = new Set(snap.badges);
    });
  }, []);

  const toggle = useCallback<Ctx["toggle"]>(
    async (stepKey, action = "complete") => {
      const before = snapshot;
      setBusy(true);
      try {
        const next = toggleStep(stateRef.current, stepKey, action);
        if (!next) return;
        const snap = commit(next);
        celebrate(snap, before.xp, new Set(before.badges));
      } finally {
        setBusy(false);
      }
    },
    [snapshot, commit, celebrate],
  );

  const runQuiz = useCallback<Ctx["runQuiz"]>(
    async (moduleKey, answers) => {
      const before = snapshot;
      setBusy(true);
      try {
        const result = submitQuiz(stateRef.current, moduleKey, answers);
        if (!result) return null;
        const snap = commit(result.state);
        if (result.passed) {
          push({
            emoji: "✓",
            title: `DIAGNOSTIC PASSED ${result.score}/${result.total}`,
            body: "+25 xp saved locally",
            tone: "xp",
          });
        } else {
          push({
            emoji: "✗",
            title: `DIAGNOSTIC ${result.score}/${result.total} — below 75%`,
            body: "read the [fail] reasons, then re-run. no penalty, ever.",
            tone: "info",
          });
        }
        celebrate(snap, before.xp, new Set(before.badges));
        return result.results;
      } finally {
        setBusy(false);
      }
    },
    [snapshot, commit, celebrate, push],
  );

  const saveProjectAction = useCallback<Ctx["saveProject"]>(
    async (payload) => {
      const before = snapshot;
      setBusy(true);
      try {
        const result = saveProject(stateRef.current, payload);
        const snap = commit(result.state);
        celebrate(snap, before.xp, new Set(before.badges));
        return result.selfScore;
      } finally {
        setBusy(false);
      }
    },
    [snapshot, commit, celebrate],
  );

  const saveProfile = useCallback<Ctx["saveProfile"]>(
    async (payload) => {
      setBusy(true);
      try {
        const next = updateProfile(stateRef.current, payload);
        commit(next);
        push({ emoji: "✓", title: "RECORD COMMITTED", body: "whoami updated", tone: "info" });
      } finally {
        setBusy(false);
      }
    },
    [commit, push],
  );

  const resetAll = useCallback(async () => {
    const next = resetProgress(stateRef.current);
    commit(next);
    prevLevel.current = 1;
    prevBadges.current = new Set();
    push({ emoji: "↺", title: "HARD RESET COMPLETE", body: "back to level 1. the octoverse forgives everything.", tone: "info" });
  }, [commit, push]);

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
      saveProject: saveProjectAction,
      saveProfile,
      resetAll,
      dismiss,
    }),
    [snapshot, world, leaderboard, toasts, busy, refresh, toggle, runQuiz, saveProjectAction, saveProfile, resetAll, dismiss],
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
