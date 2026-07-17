import type { Metadata } from "next";
import { FinalCTA } from "@/components/FinalCTA";
import { Mark8botShowcase } from "@/components/Mark8botShowcase";
import { PageHero } from "@/components/PageHero";
import { ProductPrinciples } from "@/components/ProductPrinciples";

export const metadata: Metadata = {
  title: "Products",
  description: "Pravaron Technologies builds AI-native automation systems, campaign intelligence, and agent workflows proven in production.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        label="Pravaron Technologies Products"
        title="We build our own AI-native products."
        copy="Our products explore automation systems, campaign intelligence, and agent workflows that push businesses toward an autonomous future, proven in production first."
      />
      <Mark8botShowcase />
      <ProductPrinciples />
      <FinalCTA />
    </main>
  );
}
