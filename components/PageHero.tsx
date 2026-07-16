import type { ReactNode } from "react";
import { RevealText } from "./RevealText";
import Image from "next/image";

export function PageHero({
  label,
  title,
  copy,
  children,
  bannerImage = "/assets/Banner.png"
}: {
  label: string;
  title: string;
  copy: string;
  children?: ReactNode;
  bannerImage?: string;
}) {
  return (
    <section className="page-hero">
      {/* Background Banner Image - Full Visibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt="Page Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="page-hero-shell">
        <p className="system-label">{label}</p>
        <RevealText text={title} className="page-hero-title text-balance" />
        <p className="page-hero-copy">{copy}</p>
        {children}
      </div>
    </section>
  );
}
