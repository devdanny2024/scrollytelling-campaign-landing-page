import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface CountUpStatProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export function CountUpStat({
  value,
  label,
  prefix = "",
  suffix = "",
  delay = 0,
}: CountUpStatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 50,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center"
    >
      <div
        className="text-6xl mb-3"
        style={{
          fontFamily: "var(--font-headline)",
          color: "var(--leaf-green)",
        }}
      >
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <div
        className="text-sm uppercase tracking-widest"
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--warm-sand)",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}