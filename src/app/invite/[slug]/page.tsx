import { notFound } from "next/navigation";
import { Invitation } from "@/components/Invitation";
import { wedding } from "@/config/wedding.config";
export function generateStaticParams() {
  return [{ slug: wedding.slug }];
}
export default async function Invite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== wedding.slug) notFound();
  return <Invitation wedding={wedding} />;
}
