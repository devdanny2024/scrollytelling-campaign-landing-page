import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface TimelineEventProps {
  year: string;
  title: string;
  description: string;
  side: "left" | "right";
}

export function TimelineEvent({ year, title, description, side }: TimelineEventProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative py-12">
      <motion.div
        style={{ y, opacity }}
        className={`flex items-center gap-8 ${
          side === "right" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* Content card */}
        <div className={`flex-1 ${side === "left" ? "text-right" : "text-left"}`}>
          <motion.div
            initial={{ opacity: 0, x: side === "left" ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-white rounded-2xl p-6 shadow-lg border border-[var(--warm-sand)]/30 max-w-md"
          >
            <div
              className="text-sm uppercase tracking-widest mb-2"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--core-green)",
              }}
            >
              {year}
            </div>
            <h4
              className="text-2xl mb-2"
              style={{
                fontFamily: "var(--font-headline)",
                color: "var(--ink)",
              }}
            >
              {title}
            </h4>
            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--ink)",
                opacity: 0.7,
              }}
            >
              {description}
            </p>
          </motion.div>
        </div>

        {/* Center node */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 w-4 h-4 rounded-full bg-[var(--leaf-green)] border-4 border-white shadow-lg z-10"
        />

        {/* Spacer for other side */}
        <div className="flex-1" />
      </motion.div>
    </div>
  );
}
