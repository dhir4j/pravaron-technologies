"use client";

import { motion } from "motion/react";

export function RevealText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, index) => (
        <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]" key={`${word}-${index}`}>
          <motion.span
            aria-hidden="true"
            className="inline-block pr-[0.18em]"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.52, delay: index * 0.045, ease: [0.23, 1, 0.32, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
