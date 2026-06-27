import { motion } from "motion/react";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";

const articles = [
  { type: "Press Release", date: "June 14, 2026", headline: "Barr. El-Shaddai Announces Youth Entrepreneurship Fund as Centrepiece of Economic Plan", excerpt: "Speaking in Enugu, Barr. El-Shaddai unveiled a comprehensive youth employment programme designed to create sustainable livelihoods across Nkanu East and Nkanu West.", tag: "Economy" },
  { type: "Campaign Update", date: "June 10, 2026", headline: "Town Hall in Nkanu West Draws Record Crowd of Supporters", excerpt: "The Nkanu West gathering was the largest town hall of the campaign to date, with residents turning out to hear the candidate's vision on agriculture, infrastructure, and youth empowerment.", tag: "Momentum" },
  { type: "Policy Brief", date: "June 5, 2026", headline: "Full Healthcare Manifesto Released: Primary Care in Every Ward", excerpt: "The detailed health white paper outlines funding mechanisms for all PHCs, an expanded NHIA, and a mobile medical outreach corps for rural communities in Nkanu.", tag: "Healthcare" },
  { type: "Campaign Update", date: "May 28, 2026", headline: "10,000 Volunteer Sign-Ups — Campaign Hits Constituency Milestone", excerpt: "Grassroots momentum continues to build as the volunteer network reaches a landmark threshold, with active units in every ward across Nkanu East and Nkanu West.", tag: "Volunteer" },
  { type: "Press Release", date: "May 20, 2026", headline: "Barr. El-Shaddai Calls for Transparent Constituency Fund Management", excerpt: "Community boards — not politicians — should control and audit constituency development funds. A bold governance commitment from the NDC candidate.", tag: "Governance" },
];

const tagColors: Record<string, string> = {
  Economy: "var(--core-green)", Momentum: "var(--core-green)", Healthcare: "#92400e",
  Volunteer: "var(--core-green)", Governance: "var(--deep-pine)", Infrastructure: "#3f5f80",
};

export function NewsHub() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="text-sm uppercase tracking-widest mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>
              <Newspaper size={14} /> Updates & Press
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Latest from the Campaign</h2>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm shrink-0 transition-all hover:gap-4"
            style={{ border: "2px solid var(--core-green)", color: "var(--core-green)", fontFamily: "var(--font-body)" }}>
            All Updates <ArrowRight size={14} />
          </button>
        </motion.div>

        {/* Featured */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="rounded-3xl p-6 md:p-10 mb-6 cursor-pointer group" style={{ background: "var(--deep-pine)" }}
          whileHover={{ scale: 1.01 }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider" style={{ background: "var(--core-green)", color: "white", fontFamily: "var(--font-body)" }}>{articles[0].type}</span>
            <span className="flex items-center gap-1 text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.7 }}><Calendar size={11} /> {articles[0].date}</span>
          </div>
          <h3 className="text-xl md:text-3xl lg:text-4xl mb-3 group-hover:opacity-80 transition-opacity" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>{articles[0].headline}</h3>
          <p className="text-sm md:text-lg leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.85 }}>{articles[0].excerpt}</p>
          <div className="mt-5 flex items-center gap-2 text-sm group-hover:gap-4 transition-all" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>
            Read full release <ArrowRight size={13} />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {articles.slice(1).map((article, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }} className="bg-white rounded-2xl p-5 md:p-7 cursor-pointer shadow-sm group" style={{ border: "1px solid var(--warm-sand)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 rounded-full text-xs uppercase tracking-wider"
                  style={{ background: `${tagColors[article.tag]}20`, color: tagColors[article.tag], fontFamily: "var(--font-body)", border: `1px solid ${tagColors[article.tag]}40` }}>
                  {article.tag}
                </span>
                <span className="text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.5 }}>{article.date.split(" ").slice(0, 2).join(" ")}</span>
              </div>
              <h4 className="text-base md:text-xl mb-2 leading-snug group-hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>{article.headline}</h4>
              <p className="text-xs md:text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.65 }}>{article.excerpt}</p>
              <div className="flex items-center gap-2 text-xs md:text-sm group-hover:gap-4 transition-all" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>
                Read more <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
