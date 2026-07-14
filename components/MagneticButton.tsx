"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
};

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function MagneticButton({ className = "", variant = "primary", children, href, ...props }: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [-5, 5]), { stiffness: 420, damping: 32 });
  const y = useSpring(useTransform(my, [-1, 1], [-3, 3]), { stiffness: 420, damping: 32 });
  const buttonClass = `button ${variant === "primary" ? "button-primary" : "button-secondary"} ${className}`;

  const content = isInternalHref(href) ? (
    <Link className={buttonClass} href={href} {...props}>
      {children}
    </Link>
  ) : (
    <a className={buttonClass} href={href} {...props}>
      {children}
    </a>
  );

  return (
    <motion.div
      style={reduce ? undefined : { x, y }}
      onPointerMove={(event) => {
        if (reduce) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
        my.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      {content}
    </motion.div>
  );
}
