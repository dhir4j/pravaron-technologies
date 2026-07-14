import { CorporateHome } from '@/components/CorporateHome';
import { Mark8botShowcase } from "@/components/Mark8botShowcase";
import { VisionSection } from "@/components/VisionSection";
import { CapabilityConstellation } from "@/components/CapabilityConstellation";
import { ServicesIndex } from "@/components/ServicesIndex";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      {/* Video hero section */}
      <CorporateHome />
      {/* Vision/Operating model section - REDESIGNED */}
      <VisionSection />
      {/* Capabilities constellation */}
      <CapabilityConstellation />
      {/* Services index */}
      <ServicesIndex />
      {/* Mark8bot from Labs - SAME AS LABS PAGE */}
      <Mark8botShowcase />
      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}
