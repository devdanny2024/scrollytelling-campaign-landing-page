import { motion } from "motion/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface CampaignButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost";
  children: ReactNode;
}

export function CampaignButton({
  variant = "solid",
  children,
  className = "",
  ...props
}: CampaignButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300
        ${
          variant === "solid"
            ? "bg-[var(--core-green)] text-white hover:shadow-lg hover:shadow-[var(--leaf-green)]/30"
            : "border-2 border-white text-white hover:bg-white/10"
        }
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </span>
      {variant === "solid" && (
        <motion.div
          className="absolute inset-0 bg-[var(--leaf-green)]"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
