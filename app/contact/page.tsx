import type { Metadata } from "next";
import { ContactLanes, ContactSteps } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project, book an AI strategy consultation, or ask about Pravaron Labs products. Direct line: contact@pravarontechnologies.com."
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact"
        title="Bring a workflow. Leave with a direction."
        copy="A project brief, a product idea, or an AI integration challenge — Pravaron helps shape the strategy, architecture, software, and automation path."
      />
      <ContactLanes />
      <ContactSteps />
    </main>
  );
}
