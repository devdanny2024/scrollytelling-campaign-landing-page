import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function GrowthVine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const leaves = [0.15, 0.28, 0.42, 0.56, 0.7, 0.84];

  return (
    <div
      ref={ref}
      className="fixed left-8 top-0 h-screen w-1 z-50 pointer-events-none"
    >
      {/* Main vine stem */}
      <motion.div
        style={{ height }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[var(--core-green)] via-[var(--leaf-green)] to-[var(--leaf-green)] origin-top"
      />

      {/* Leaf nodes */}
      {leaves.map((position, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${position * 100}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: scrollYProgress.get() >= position ? 1 : 0,
            opacity: scrollYProgress.get() >= position ? 1 : 0,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2C10 2 6 6 6 10C6 12.21 7.79 14 10 14C12.21 14 14 12.21 14 10C14 6 10 2 10 2Z"
              fill="var(--leaf-green)"
              stroke="var(--core-green)"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
