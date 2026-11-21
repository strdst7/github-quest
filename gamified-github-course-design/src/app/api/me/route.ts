import { ensurePlayer } from "@/lib/session";
import { getSnapshot, getWorldStats, getLeaderboard } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const player = await ensurePlayer();
  const [snapshot, world, leaderboard] = await Promise.all([
    getSnapshot(player.id),
    getWorldStats(),
    getLeaderboard(),
  ]);
  return Response.json({ ok: true, snapshot, world, leaderboard });
}
