import { motion } from "motion/react";
import { FileText, ChevronDown } from "lucide-react";
import { useState } from "react";
import photo4 from "../../imports/photo_4_2026-06-17_21-13-04-1.jpg";

const policies = [
  { area: "Quality Education", headline: "Every child in Nkanu deserves a world-class education", points: ["Rehabilitation and equipping of public primary and secondary schools across all wards", "Scholarship and bursary programmes for Nkanu students in tertiary institutions", "Vocational and skills-training centres to reduce youth unemployment", "Digital literacy programmes in partnership with technology companies", "Advocacy for increased federal allocation to education in the constituency"] },
  { area: "Youth Empowerment & Job Creation", headline: "Unlocking the potential of Nkanu's young people", points: ["Youth entrepreneurship fund with single-digit microfinance access", "Graduate internship placements with corporate and government partners", "Sports and creative industry investment as economic drivers", "Young Farmers Programme linking youth to agricultural value chains", "Tech hub and co-working space for digital entrepreneurs in the constituency"] },
  { area: "Agricultural Modernization", headline: "Turning Nkanu's land into a source of lasting prosperity", points: ["Modern irrigation and farming inputs for smallholder farmers", "Agricultural cooperative structures with access to federal intervention funds", "Cold-chain storage and processing facilities to reduce post-harvest losses", "Market linkages and export facilitation for cash crops", "Agribusiness training programmes for farmers and their families"] },
  { area: "Healthcare Improvement", headline: "Quality healthcare within reach of every Nkanu family", points: ["Rehabilitation of primary healthcare centres in every ward", "Mobile medical outreach units for rural and underserved communities", "Maternal and child health programmes targeting zero preventable deaths", "Advocacy for NHIA expansion to cover informal-sector workers in Nkanu", "Health insurance and drug subsidy programmes for the elderly"] },
  { area: "Infrastructure Development", headline: "Roads, power, and water as rights — not privileges", points: ["Federal road projects and constituency-level feeder road rehabilitation", "Advocacy for rural electrification and renewable energy in off-grid communities", "Clean water and sanitation projects in every community", "Constituency development fund deployed through transparent community boards", "Bridges and erosion-control structures to protect farmlands and homes"] },
  { area: "Digital Inclusion & Entrepreneurship", headline: "Connecting Nkanu to the digital economy", points: ["Last-mile broadband connectivity for schools, health centres, and markets", "Digital skills training targeting women and out-of-school youth", "E-governance tools to improve transparency and citizen engagement", "Support for technology startups and fintech innovation within the constituency", "Advocacy for data protection rights and digital literacy at the national level"] },
];

export function ManifestoSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16">
          <div className="text-sm uppercase tracking-widest mb-3 flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>
            <FileText size={14} /> Policy Positions
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Vision for Nkanu</h2>
          <p className="text-base md:text-xl max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.7 }}>
            Six pillars of people-focused development — specific, costed, and deliverable for Nkanu East and Nkanu West.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Sticky photo — hidden on mobile, shown on lg+ */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="hidden lg:block lg:sticky lg:top-32">
            <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ border: "2px solid var(--warm-sand)" }}>
              <img src={photo4} alt="Barr. El-Shaddai" className="w-full object-cover" style={{ height: "500px", objectPosition: "top" }} />
            </div>
            <div className="mt-5 p-5 rounded-2xl" style={{ background: "var(--cream)", border: "1px solid var(--warm-sand)" }}>
              <p className="italic text-sm md:text-base leading-relaxed mb-2" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.85 }}>
                "Sustainable progress can only be achieved through strategic planning, effective legislation, strong advocacy, and active engagement with the people."
              </p>
              <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>— Barr. Ikeh El-Shaddai</p>
            </div>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3 md:space-y-4">
            {/* Mobile photo */}
            <div className="lg:hidden mb-6">
              <img src={photo4} alt="Barr. El-Shaddai" className="w-full object-cover rounded-2xl shadow-xl" style={{ height: "220px", objectPosition: "top" }} />
            </div>

            {policies.map((policy, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: open === i ? "2px solid var(--core-green)" : "2px solid var(--warm-sand)", background: open === i ? "var(--cream)" : "white", transition: "all 0.3s ease" }}>
                <button className="w-full text-left px-5 md:px-7 py-4 md:py-5 flex items-center justify-between" onClick={() => setOpen(open === i ? null : i)}>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>{policy.area}</div>
                    <div className="text-sm md:text-lg" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>{policy.headline}</div>
                  </div>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 ml-3">
                    <ChevronDown size={18} style={{ color: "var(--core-green)" }} />
                  </motion.div>
                </button>
                {open === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="px-5 md:px-7 pb-5">
                    <ul className="space-y-2 md:space-y-3">
                      {policy.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--leaf-green)" }} />
                          <span className="text-xs md:text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.8 }}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
