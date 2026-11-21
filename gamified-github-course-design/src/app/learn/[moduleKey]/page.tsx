import { ModuleView } from "@/components/ModuleView";
import { modules } from "@/lib/course";

export const dynamicParams = false;

export function generateStaticParams() {
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
