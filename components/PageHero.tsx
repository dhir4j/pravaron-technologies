import type { ReactNode } from "react";
import { RevealText } from "./RevealText";

export function PageHero({
  label,
  title,
  copy,
  children
}: {
  label: string;
  title: string;
  copy: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-shell">
        <p className="system-label">{label}</p>
        <RevealText text={title} className="page-hero-title text-balance" />
        <p className="page-hero-copy">{copy}</p>
        {children}
      </div>
    </section>
  );
}
