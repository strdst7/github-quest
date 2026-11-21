import { ensurePlayer } from "@/lib/session";
import { saveFinalProject } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    projectTitle?: string;
    repoUrl?: string;
    highlights?: string;
    rubric?: Record<string, number>;
    submitted?: boolean;
  } | null;

  if (!body) {
    return Response.json({ ok: false, error: "Body is required" }, { status: 400 });
  }

  const player = await ensurePlayer();
  const result = await saveFinalProject(player.id, body);
  return Response.json({ ok: true, selfScore: result.selfScore, snapshot: result.snapshot });
}
