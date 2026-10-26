"use client";
import { motion, useReducedMotion } from "motion/react";
import { motionSettings } from "@/config/scenes.config";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduce ? false : { opacity: 0, y: motionSettings.revealDistance }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : motionSettings.revealDuration }}
    >
      {children}
    </motion.div>
  );
}
