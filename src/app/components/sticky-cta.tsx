import { motion, useScroll, useTransform } from "motion/react";
import { CampaignButton } from "./campaign-button";

export function StickyCTA() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 200], [0, 1]);
  const y = useTransform(scrollY, [100, 200], [-50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed top-0 left-0 right-0 z-40 bg-[var(--deep-pine)]/95 backdrop-blur-lg border-b border-[var(--warm-sand)]/20"
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <div
          className="text-xl"
          style={{
            fontFamily: "var(--font-headline)",
            color: "var(--cream)",
          }}
        >
          Join the Movement
        </div>
        <div className="flex gap-4">
          <CampaignButton variant="ghost" className="!py-2 !px-6">
            Volunteer
          </CampaignButton>
          <CampaignButton variant="solid" className="!py-2 !px-6">
            Donate Now
          </CampaignButton>
        </div>
      </div>
    </motion.div>
  );
}
