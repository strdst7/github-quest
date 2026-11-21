import { ensurePlayer } from "@/lib/session";
import { submitQuiz } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    moduleKey?: string;
    answers?: Record<string, number>;
  } | null;

  if (!body?.moduleKey || !body?.answers) {
    return Response.json({ ok: false, error: "moduleKey and answers are required" }, { status: 400 });
  }

  const player = await ensurePlayer();
  const result = await submitQuiz(player.id, body.moduleKey, body.answers);

  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 400 });
  }

  return Response.json({
    ok: true,
    score: result.score,
    total: result.total,
    passed: result.passed,
    results: result.results,
    snapshot: result.snapshot,
  });
}
