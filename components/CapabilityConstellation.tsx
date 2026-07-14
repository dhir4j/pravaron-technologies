/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";

const buildShowcase = [
  {
    title: "Agentic AI Products",
    label: "Flagship build lane",
    image: "/images/generated/build-agentic-ai-products-card.webp",
    body: "Multi-agent workflows that plan, reason, execute, and keep humans in the right review points.",
    href: "/services#agentic-ai-products",
    size: "hero"
  },
  {
    title: "Automation Platforms",
    label: "Operations into motion",
    image: "/images/generated/build-automation-platforms-card.webp",
    body: "Reliable routes across APIs, approvals, alerts, dashboards, and recurring operational work.",
    href: "/services#automation-platforms",
    size: "wide"
  },
  {
    title: "Decision Intelligence",
    label: "Signals to action",
    image: "/images/generated/build-decision-intelligence-card.webp",
    body: "Context layers that collect signals, reason through options, and surface recommended action.",
    href: "/services#decision-intelligence",
    size: "compact"
  },
  {
    title: "Internal AI Tools",
    label: "Domain-specific AI",
    image: "/images/generated/build-internal-ai-tools-card.webp",
    body: "Secure internal products with AI interfaces, data access, permissions, and traceable workflows.",
    href: "/services#internal-ai-tools",
    size: "compact"
  }
];

export function CapabilityConstellation() {
  const reduce = useReducedMotion();

  return (
    <section id="builds" className="section-pad builds-upgrade">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="builds-heading">
          <p className="system-label">What Pravaron Builds</p>
          <h2>Systems that make intelligence operational.</h2>
          <p>
            Pravaron builds products and platforms where software, automation, and AI reasoning work as one connected operating layer.
          </p>
        </AnimatedSection>

        <div className="builds-masonry">
          {buildShowcase.map((item, index) => (
            <motion.article
              className={`build-card build-card-${item.size}`}
              initial={reduce ? false : { opacity: 0.86, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.24 }}
              transition={{ duration: 0.34, delay: index * 0.055, ease: [0.23, 1, 0.32, 1] }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              key={item.title}
            >
              <Link href={item.href} className="build-card-link" aria-label={`Explore ${item.title}`}>
                <div className="build-media">
                  <img className="build-card-image" src={item.image} alt={`${item.title} visual`} loading="lazy" />
                  <span>{item.label}</span>
                </div>
                <div className="build-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <strong>Explore -&gt;</strong>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
