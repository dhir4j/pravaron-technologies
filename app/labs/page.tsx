import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { LabsPrinciples } from "@/components/LabsPrinciples";
import { Mark8botShowcase } from "@/components/Mark8botShowcase";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Pravaron Labs builds its own AI-native products — automation systems, campaign intelligence, and agent workflows proven in production."
};

export default function LabsPage() {
  return (
    <main>
      <PageHero
        label="Pravaron Labs"
        title="We build our own AI-native products."
        copy="Labs explores automation systems, campaign intelligence, agent workflows, and product experiments that push businesses toward an autonomous future — proven on our own products first."
      />
      <Mark8botShowcase />
      <LabsPrinciples />
      <FinalCTA />
    </main>
  );
}
