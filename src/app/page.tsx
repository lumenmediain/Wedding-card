import { Invitation } from "@/components/Invitation";
import { wedding } from "@/config/wedding.config";
export default function Home() {
  return <Invitation wedding={wedding} />;
}
