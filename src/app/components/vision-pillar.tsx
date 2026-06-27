import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

interface VisionPillarProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

export function VisionPillar({ icon, title, description, index }: VisionPillarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="mb-32 last:mb-0"
    >
      <div className="flex items-start gap-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: isInView ? 1 : 0,
            rotate: isInView ? 0 : -180,
          }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-br from-[var(--leaf-green)] to-[var(--core-green)] flex items-center justify-center text-white shadow-lg"
        >
          {icon}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
            className="text-4xl mb-4"
            style={{
              fontFamily: "var(--font-headline)",
              color: "var(--ink)",
            }}
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
            className="text-lg leading-relaxed"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--ink)",
              opacity: 0.8,
            }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Organic divider */}
      {index < 4 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 1, delay: index * 0.2 + 0.7 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-[var(--warm-sand)] to-transparent origin-left"
        />
      )}
    </motion.div>
  );
}
