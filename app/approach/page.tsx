import type { Metadata } from "next";
import { AgenticAIExplainer } from "@/components/AgenticAIExplainer";
import { FinalCTA } from "@/components/FinalCTA";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { WhyPravaron } from "@/components/WhyPravaron";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Pravaron builds intelligent systems: agentic AI explained, an eight-step build process, and the thinking behind future-ready architecture."
};

export default function ApproachPage() {
  return (
    <main>
      <PageHero
        label="Approach"
        title="A build method for intelligent operations."
        copy="From workflow reality into architecture, shipped software, integration, security, deployment, and continuous improvement — with agents and people in the right places."
      />
      <AgenticAIExplainer />
      <ProcessTimeline />
      <WhyPravaron />
      <FinalCTA />
    </main>
  );
}
