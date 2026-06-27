import { motion } from "motion/react";
import { BookOpen, CheckSquare, HelpCircle, Share2, Download, ExternalLink } from "lucide-react";

const tools = [
  { icon: <CheckSquare size={28} />, title: "Check Your Registration", description: "Verify your voter registration status and confirm your polling unit on the INEC portal. Takes 2 minutes.", cta: "Check Now", color: "var(--core-green)" },
  { icon: <BookOpen size={28} />, title: "Know Your Rights", description: "Download our plain-language guide to your rights as a voter — what accreditation means, what is and isn't allowed at the polls.", cta: "Download Guide", color: "var(--deep-pine)" },
  { icon: <HelpCircle size={28} />, title: "How to Vote — Step by Step", description: "A simple illustrated guide covering accreditation, thumb-printing, and what happens if you encounter problems.", cta: "View Guide", color: "var(--core-green)" },
  { icon: <Share2 size={28} />, title: "Bring a Friend", description: "Generate your personal referral link. Every registered supporter you bring earns the campaign a new pledge-to-vote commitment.", cta: "Get Your Link", color: "#e07b39" },
];

const faq = [
  { q: "Who is eligible to vote?", a: "Any Nigerian citizen aged 18 or above who is registered with INEC and has a valid Permanent Voter Card (PVC)." },
  { q: "What ID do I need on election day?", a: "Your PVC is the primary ID required for accreditation. Bring it — no PVC, no vote." },
  { q: "What time do polls open and close?", a: "Polling units open at 8:30am and close at 2:30pm. Anyone in the queue by 2:30pm has the right to vote." },
  { q: "What if my name isn't on the register?", a: "Contact our voter support line immediately. Our agents at every polling unit are trained to assist and escalate." },
  { q: "Can I report electoral malpractice?", a: "Yes. Use the INEC Voter Enrolment portal or call the campaign's 24-hr election integrity line (published on election day)." },
];

export function VoterToolkit() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--deep-pine)]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16">
          <div className="text-sm uppercase tracking-widest mb-3 flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>
            <BookOpen size={14} /> Voter Toolkit
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Your Vote, Your Power</h2>
          <p className="text-base md:text-xl max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.85 }}>
            Everything you need to register, understand the process, and make your vote count on election day.
          </p>
        </motion.div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          {tools.map((tool, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }} className="rounded-2xl p-5 md:p-7 flex flex-col"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${tool.color}30`, color: tool.color }}>
                {tool.icon}
              </div>
              <h3 className="text-base md:text-xl mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>{tool.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed mb-5 flex-1" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.8 }}>{tool.description}</p>
              <button className="flex items-center gap-2 text-xs md:text-sm transition-all hover:gap-4" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-bright)" }}>
                {tool.cta} <ExternalLink size={12} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="rounded-3xl p-6 md:p-10 lg:p-12"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 className="text-2xl md:text-4xl mb-8 text-center" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faq.map((item, i) => (
              <div key={i} className="p-4 md:p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                <p className="text-sm md:text-base mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--leaf-bright)" }}>{item.q}</p>
                <p className="text-xs md:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.8 }}>{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-3 px-6 md:px-10 py-3 md:py-4 rounded-full transition-all hover:scale-105"
              style={{ background: "var(--leaf-green)", color: "white", fontFamily: "var(--font-body)", fontSize: "14px" }}>
              <Download size={16} /> Download Full Voter Guide (PDF)
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
