import type { Metadata } from "next";
import { BuildLanes } from "@/components/BuildLanes";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { ServicesSystemMap } from "@/components/ServicesSystemMap";
import { TechnologyLayers } from "@/components/TechnologyLayers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, AI integration, automation implementation, technology consulting, and AI strategy — delivered as one build path."
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Services"
        title="Every service is a layer of one system."
        copy="Consulting, engineering, AI integration, and automation implementation combined into a single delivery path — from the first architecture decision to the system running in production."
      />
      <ServicesSystemMap />
      <BuildLanes />
      <TechnologyLayers />
      <FinalCTA />
    </main>
  );
}
