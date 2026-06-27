import { motion } from "motion/react";
import photo1 from "../../imports/photo_1_2026-06-17_21-13-04-1.jpg";

export function RipplePortrait() {
  const arcs = [
    { radius: 320, mobileRadius: 220, opacity: 0.06, color: "var(--deep-pine)", delay: 0 },
    { radius: 275, mobileRadius: 188, opacity: 0.10, color: "var(--core-green)", delay: 0.2 },
    { radius: 230, mobileRadius: 158, opacity: 0.14, color: "var(--core-green)", delay: 0.4 },
    { radius: 185, mobileRadius: 128, opacity: 0.20, color: "var(--leaf-green)", delay: 0.6 },
  ];

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px]">
      <div className="absolute inset-0 flex items-center justify-center">
        {arcs.map((arc, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2"
            style={{ width: arc.radius * 0.67, height: arc.radius * 0.67, borderColor: arc.color, opacity: arc.opacity }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: arc.opacity }}
            transition={{ duration: 1.8, delay: arc.delay, ease: "easeOut" }}
          />
        ))}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "80%", height: "80%",
            background: "radial-gradient(circle, var(--leaf-green) 0%, transparent 70%)",
            opacity: 0.06,
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
      >
        <div
          className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden shadow-2xl"
          style={{ border: "4px solid var(--leaf-green)", boxShadow: "0 0 60px rgba(74,158,74,0.25), 0 20px 60px rgba(0,0,0,0.3)" }}
        >
          <img src={photo1} alt="Barr. Ikeh El-Shaddai" className="w-full h-full object-cover object-top" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap"
        style={{ background: "rgba(10,40,20,0.8)", border: "1px solid var(--leaf-green)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span className="text-[9px] sm:text-[11px]" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-bright)", letterSpacing: "0.07em" }}>
          BARR. IKEH EL-SHADDAI · NDC · #IkeNkanu2027
        </span>
      </motion.div>
    </div>
  );
}
