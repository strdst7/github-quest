import { cookies } from "next/headers";
import { getOrCreateLearner } from "@/lib/store";
import type { Learner } from "@/db/schema";

export const SESSION_COOKIE = "gq_learner";

/**
 * No auth in the sandbox: the player row is remembered in an http-only cookie.
 *
 * `readPlayer` is render-safe (never writes cookies) and is used by layouts and
 * pages. `ensurePlayer` may create a player and set the cookie, so it is only
 * ever called from Route Handlers / Server Actions.
 */
export async function readPlayer(): Promise<Learner | null> {
  const jar = await cookies();
  const id = jar.get(SESSION_COOKIE)?.value ?? null;
  if (!id) return null;
  return getOrCreateLearner(id);
}

export async function ensurePlayer(): Promise<Learner> {
  const jar = await cookies();
  const id = jar.get(SESSION_COOKIE)?.value ?? null;
  const learner = await getOrCreateLearner(id);
  if (learner.id !== id) {
    jar.set(SESSION_COOKIE, learner.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return learner;
}
