import { ensurePlayer } from "@/lib/session";
import { resetProgress } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST() {
  const player = await ensurePlayer();
  const snapshot = await resetProgress(player.id);
  return Response.json({ ok: true, snapshot });
}
