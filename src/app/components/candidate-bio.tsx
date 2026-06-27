import { motion } from "motion/react";
import { Scale, Globe, Shield } from "lucide-react";
import photo2 from "../../imports/photo_2_2026-06-17_21-13-04-1.jpg";
import photo6 from "../../imports/photo_6_2026-06-17_21-13-04-1.jpg";

const credentials = [
  { icon: <Scale size={20} />, title: "Legal Practitioner", detail: "Distinguished barrister rooted in Nigerian law and constitutional rights" },
  { icon: <Globe size={20} />, title: "Governance Expert", detail: "Internationally recognized authority in privacy, data protection & AI governance" },
  { icon: <Shield size={20} />, title: "Public Policy Strategist", detail: "Career spanning law, technology, risk management & regulatory compliance" },
];

export function CandidateBio() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--cream)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16">
          <div className="text-sm uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>The Candidate</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Barr. Ikeh El-Shaddai</h2>
          <p className="text-sm md:text-xl" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}>
            House of Representatives · Nkanu East / Nkanu West · NDC
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start mb-10 md:mb-16">
          {/* Portrait */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "2px solid var(--warm-sand)" }}>
              <img src={photo2} alt="Barr. Ikeh El-Shaddai" className="w-full object-cover"
                style={{ height: "clamp(320px,50vw,620px)", objectPosition: "top" }} />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 lg:-bottom-8 lg:absolute lg:-right-8 p-5 md:p-7 rounded-2xl shadow-xl lg:max-w-xs"
              style={{ background: "var(--deep-pine)", border: "1px solid var(--core-green)" }}>
              <p className="italic text-sm md:text-base leading-relaxed mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--cream)" }}>
                "Public office is a sacred trust. Elected representatives must remain accountable to those they serve."
              </p>
              <span className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-bright)" }}>— Barr. Ikeh El-Shaddai</span>
            </motion.div>
          </motion.div>

          {/* Story */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="pt-0 lg:pt-4">
            {[
              { label: "Roots", text: "A distinguished son of Obe in Nkanu West Local Government Area of Enugu State. Born and raised in an environment that emphasized hard work, education, faith, discipline, and community responsibility — his life reflects the enduring values of the Nkanu people: resilience, excellence, honesty, and an unwavering commitment to the common good." },
              { label: "Professional Record", text: "A highly accomplished lawyer, governance expert, and internationally recognized authority in privacy, data protection, and artificial intelligence governance. His career spans law, corporate governance, technology, risk management, regulatory compliance, and institutional development — across local and international platforms." },
              { label: "Why Nkanu", text: "Despite his international achievements, his passion remains firmly focused on Nkanu. He believes the people deserve a representative who understands their realities, shares their aspirations, and possesses the expertise, network, and determination to attract opportunities and deliver meaningful results." },
              { label: "The Mission", text: "To provide effective representation, attract meaningful development, promote unity, and create lasting opportunities that will improve the lives of present and future generations across Nkanu East and Nkanu West. Proudly Nkanu." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="mb-6 pl-5" style={{ borderLeft: "3px solid var(--leaf-green)" }}>
                <div className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>{item.label}</div>
                <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.82 }}>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 md:mb-14">
          {credentials.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl p-5 flex gap-4 items-start" style={{ background: "white", border: "1.5px solid var(--warm-sand)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "var(--core-green)", color: "white" }}>{c.icon}</div>
              <div>
                <div className="text-sm md:text-base mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>{c.title}</div>
                <div className="text-xs md:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.65 }}>{c.detail}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cinematic strip */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ height: "clamp(240px,40vw,420px)" }}>
          <img src={photo6} alt="Barr. Ikeh El-Shaddai" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
          <div className="absolute inset-0 flex items-end p-6 md:p-12" style={{ background: "linear-gradient(to top, rgba(10,40,20,0.88) 0%, transparent 55%)" }}>
            <div>
              <p className="text-xl md:text-4xl mb-2 md:mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)", lineHeight: "1.2" }}>
                "A Voice for the People.<br className="hidden md:block" /> A Vision for Development.<br className="hidden md:block" /> A Legacy of Service."
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider" style={{ background: "var(--leaf-green)", color: "white", fontFamily: "var(--font-body)" }}>#IkeNkanu2027</span>
                <span className="text-xs md:text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.7 }}>Proudly Nkanu · NDC</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
