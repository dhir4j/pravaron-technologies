import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { AboutVision } from "@/components/AboutVision";
import { AboutMission } from "@/components/AboutMission";
import { AboutValues } from "@/components/AboutValues";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Pravaron Technologies builds intelligent systems that turn manual operations into autonomous, self-running businesses through AI, automation, and strategic software development."
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="About Us"
        title="Building the autonomous operating layer for modern business."
        copy="We design and build agentic AI products, automation platforms, and intelligent systems that transform manual operations into autonomous workflows. From discovery to deployment, we help organizations move from software to intelligent systems."
        bannerImage="/assets/About_us_Banner.webp"
      />
      <AboutVision />
      <AboutMission />
      <AboutValues />
      <FinalCTA />
    </main>
  );
}
