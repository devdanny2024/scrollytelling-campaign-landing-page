import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface DonationThermometerProps {
  raised: number;
  goal: number;
}

export function DonationThermometer({ raised, goal }: DonationThermometerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      {/* Thermometer container */}
      <div className="relative h-80 w-32 mx-auto">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--deep-pine)]/30 rounded-full border-2 border-[var(--warm-sand)]/30" />

        {/* Organic fill with glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-full overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isInView ? `${percentage}%` : 0 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--leaf-green)] via-[var(--core-green)] to-[var(--leaf-green)]" />
          
          {/* Glow effect */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-[var(--leaf-green)] blur-xl opacity-70" />
          
          {/* Organic texture overlay */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-4 bg-white/30"
                style={{ top: `${i * 20}%` }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Leaf decorations at different heights */}
        {[25, 50, 75].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute -right-6"
            style={{ top: `${100 - pos}%` }}
            initial={{ scale: 0, x: -20 }}
            animate={{
              scale: isInView && percentage >= pos ? 1 : 0,
              x: isInView && percentage >= pos ? 0 : -20,
            }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1C8 1 5 4 5 7C5 8.66 6.34 10 8 10C9.66 10 11 8.66 11 7C11 4 8 1 8 1Z"
                fill="var(--leaf-green)"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Labels */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="text-3xl mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--leaf-green)" }}>
          ₦{raised.toLocaleString()}
        </div>
        <div className="text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)" }}>
          raised of ₦{goal.toLocaleString()} goal
        </div>
        <div className="mt-2 text-lg" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)" }}>
          {percentage.toFixed(0)}% funded
        </div>
      </motion.div>
    </div>
  );
}
