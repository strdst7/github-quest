import { ModuleView } from "@/components/ModuleView";
import { modules } from "@/lib/course";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return modules.map((m) => ({ moduleKey: m.key }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleKey: string }>;
}) {
  const { moduleKey } = await params;
  return <ModuleView moduleKey={moduleKey} />;
}
