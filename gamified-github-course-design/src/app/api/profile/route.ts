import { ensurePlayer } from "@/lib/session";
import { updateProfile } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    githubHandle?: string;
    guild?: string;
  } | null;

  const player = await ensurePlayer();
  const snapshot = await updateProfile(player.id, {
    name: body?.name?.trim().slice(0, 40) || undefined,
    githubHandle: body?.githubHandle?.trim().replace(/^@/, "").slice(0, 40) || undefined,
    guild: body?.guild?.slice(0, 40) || undefined,
  });

  return Response.json({ ok: true, snapshot });
}
