import { ensurePlayer } from "@/lib/session";
import { toggleStep } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    stepKey?: string;
    action?: "complete" | "undo";
  } | null;

  if (!body?.stepKey) {
    return Response.json({ ok: false, error: "stepKey is required" }, { status: 400 });
  }

  const player = await ensurePlayer();
  const result = await toggleStep(player.id, body.stepKey, body.action ?? "complete");

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }

  return Response.json({
    ok: true,
    added: result.added,
    newBadges: result.newBadges,
    snapshot: result.snapshot,
  });
}
