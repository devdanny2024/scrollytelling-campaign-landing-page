import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import {
  Sprout, Users, Building2, Heart, GraduationCap,
  ChevronDown, Facebook, Twitter, Instagram, Mail,
  MessageCircle, CheckCircle, Scale, Wheat, Laptop,
} from "lucide-react";
import { GrowthVine } from "./components/growth-vine";
import { RipplePortrait } from "./components/ripple-portrait";
import { CampaignButton } from "./components/campaign-button";
import { StickyCTA } from "./components/sticky-cta";
import { VisionPillar } from "./components/vision-pillar";
import { TimelineEvent } from "./components/timeline-event";
import { GlassCard } from "./components/glass-card";
import { BlobDivider } from "./components/blob-divider";
import { ManifestoSection } from "./components/manifesto-section";
import { NewsHub } from "./components/news-hub";
import { EventsSection } from "./components/events-section";
import { VoterToolkit } from "./components/voter-toolkit";
import { DonationEngine } from "./components/donation-engine";
import { VolunteerForm } from "./components/volunteer-form";
import { CandidateBio } from "./components/candidate-bio";
import { API_BASE, scrollToId } from "./config";

import photo3 from "../imports/photo_3_2026-06-17_21-13-04-1.jpg";
import photo5 from "../imports/photo_5_2026-06-17_21-13-04-1.jpg";
import photo7 from "../imports/photo_7_2026-06-17_21-13-04-1.jpg";

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const [newsletterDone, setNewsletterDone] = useState(false);
  const [nlForm, setNlForm] = useState({ email: "", phone: "", channel: "whatsapp" });

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    fetch(`${API_BASE}/subscribe.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: nlForm.email, phone: nlForm.phone, channel: nlForm.channel, source: "newsletter" }),
    })
      .catch(() => {})
      .finally(() => setNewsletterDone(true));
  }

  return (
    <div className="relative overflow-x-hidden" style={{ background: "var(--cream)" }}>
      <GrowthVine />
      <StickyCTA />

      {/* ── HERO ── */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, position: "relative" }}
        className="min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--cream)] via-[var(--warm-sand)]/20 to-[var(--deep-pine)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Portrait — shown first on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="flex justify-center order-first lg:order-last"
            >
              <RipplePortrait />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap items-center gap-2 mb-5"
              >
                <span className="px-3 py-1 rounded-full text-xs uppercase tracking-widest" style={{ background: "var(--core-green)", color: "white", fontFamily: "var(--font-body)" }}>
                  NDC · #IkeNkanu2027
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest hidden sm:block" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}>
                  Nkanu East / Nkanu West · Enugu State
                </span>
              </motion.div>

              <h1 className="mb-5" style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(36px,6vw,88px)", color: "var(--ink)", lineHeight: "1.05" }}>
                A Voice for the People.
                <br />
                <span style={{ color: "var(--core-green)" }}>A Vision for</span>
                <br />Development.
              </h1>

              <p className="text-base md:text-xl mb-4 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.8 }}>
                Barr. Ikeh El-Shaddai — distinguished legal practitioner, governance expert, and son of Nkanu — running for the House of Representatives to bring effective, accountable representation to Nkanu East and Nkanu West.
              </p>
              <p className="text-sm md:text-base mb-8 italic" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)", opacity: 0.9 }}>
                "A Legacy of Service. Proudly Nkanu."
              </p>

              <div className="flex gap-3 md:gap-6 flex-wrap">
                <CampaignButton variant="solid" onClick={() => scrollToId("donate")}>Support the Campaign</CampaignButton>
                <CampaignButton variant="ghost" className="!border-[var(--core-green)] !text-[var(--core-green)]" onClick={() => scrollToId("get-involved")}>Join Us</CampaignButton>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}>Scroll</span>
          <ChevronDown size={20} style={{ color: "var(--core-green)" }} />
        </motion.div>
      </motion.section>

      {/* ── MISSION ── */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>
                The Mission
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-8"
                style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>
                "Not merely to occupy a political office — but to serve as a bridge between government and the people of Nkanu."
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }}
                className="rounded-2xl overflow-hidden shadow-xl" style={{ height: "260px" }}>
                <img src={photo3} alt="Barr. El-Shaddai" className="w-full h-full object-cover" style={{ objectPosition: "top" }} />
              </motion.div>
            </div>
            <div className="space-y-10">
              {[
                "Expanding opportunities for education, enterprise, and employment across every ward in Nkanu East and Nkanu West.",
                "Attracting federal investment and development infrastructure that the constituency has long deserved but not received.",
                "Championing transparent governance and inclusive decision-making so every community has a voice.",
                "Bringing global expertise in law, governance, and technology to bear on the specific challenges facing the Nkanu people.",
              ].map((text, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-lg md:text-xl leading-relaxed"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.85 }}>
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CANDIDATE BIO ── */}
      <CandidateBio />

      {/* ── VISION PILLARS ── */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20">
            <div className="text-sm uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>Six Pillars</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>
              People-Focused Development
            </h2>
          </motion.div>
          <div>
            <VisionPillar index={0} icon={<GraduationCap size={36} />} title="Quality Education" description="Rehabilitation of schools, scholarships for Nkanu students, vocational training centres, and digital literacy — ensuring every child can compete anywhere." />
            <VisionPillar index={1} icon={<Users size={36} />} title="Youth Empowerment & Job Creation" description="Entrepreneurship funds, graduate internships, a tech hub, Young Farmers Programme, and sports investment — turning Nkanu's youth into its greatest economic asset." />
            <VisionPillar index={2} icon={<Wheat size={36} />} title="Agricultural Modernization" description="Modern irrigation, cooperative structures, cold-chain storage, market linkages, and agribusiness training — making Nkanu's land a source of lasting prosperity." />
            <VisionPillar index={3} icon={<Heart size={36} />} title="Healthcare Improvement" description="Rehabilitated health centres in every ward, mobile medical outreach, maternal health programmes, and NHIA expansion for informal-sector workers." />
            <VisionPillar index={4} icon={<Building2 size={36} />} title="Infrastructure Development" description="Federal road projects, rural electrification, clean water, erosion control, and constituency development funds managed by transparent community boards." />
            <VisionPillar index={5} icon={<Laptop size={36} />} title="Digital Inclusion & Entrepreneurship" description="Last-mile broadband, digital skills for women and youth, e-governance tools, fintech support, and data protection advocacy at the national level." />
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <ManifestoSection />

      <BlobDivider />

      {/* ── DONATION ENGINE ── */}
      <DonationEngine />

      <BlobDivider flip />

      {/* ── NEWS HUB ── */}
      <NewsHub />

      {/* ── EVENTS ── */}
      <EventsSection />

      {/* ── VOTER TOOLKIT ── */}
      <VoterToolkit />

      {/* ── JOURNEY TIMELINE ── */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20">
            <div className="text-sm uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>The Journey</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>A Life Shaped by Nkanu</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--core-green)] to-[var(--leaf-green)] md:-translate-x-1/2" />
            <TimelineEvent year="Obe" title="Roots in Nkanu West" description="Born and raised in Obe, Nkanu West LGA, Enugu State — in a household that instilled hard work, faith, discipline, and community responsibility from the earliest age." side="left" />
            <TimelineEvent year="Law" title="Called to the Bar" description="Qualified as a barrister and legal practitioner, building expertise in constitutional law, corporate governance, and regulatory compliance across Nigerian and international jurisdictions." side="right" />
            <TimelineEvent year="Global" title="International Recognition" description="Emerged as an internationally recognized authority in privacy, data protection, and artificial intelligence governance — bringing global best practices home to Nigeria." side="left" />
            <TimelineEvent year="Policy" title="Public Policy Strategist" description="Led institutional development across local and international platforms, consistently demonstrating the capacity to deliver innovative solutions and drive sustainable growth." side="right" />
            <TimelineEvent year="Nkanu" title="The Call to Serve" description="Recognizing that his people deserve a representative who understands their realities and possesses the expertise to attract opportunity, he answered the call to contest." side="left" />
            <TimelineEvent year="2027" title="#IkeNkanu2027" description="Standing for Nkanu East and Nkanu West on the NDC platform — with a clear vision, proven competence, and an unwavering commitment to service." side="right" />
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="mt-12 md:mt-20 rounded-3xl overflow-hidden shadow-xl" style={{ height: "280px" }}>
            <img src={photo7} alt="Barr. El-Shaddai" className="w-full h-full object-cover" style={{ objectPosition: "center 15%" }} />
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[var(--deep-pine)] to-[var(--core-green)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Voices from Nkanu</h2>
            <p className="text-base md:text-lg" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.8 }}>What the people of Nkanu East and Nkanu West are saying.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
            {[
              { quote: "Barr. El-Shaddai is the kind of person who actually understands what we need. Not promises — a plan.", name: "Chief Eze O.", location: "Nkanu West" },
              { quote: "We finally have someone who can speak our language in Abuja and be heard. That is what Nkanu needs.", name: "Mrs. Adaobi N.", location: "Nkanu East" },
              { quote: "His knowledge of governance and the law means he can legislate for us — not just attend sittings.", name: "Engr. Chukwudi A.", location: "Obe" },
              { quote: "A son of the soil who went out, achieved globally, and chose to come back and serve. That is rare.", name: "Prof. Ngozi E.", location: "Nkanu West" },
              { quote: "Na him sabi wetin Nkanu need. He don see the world, now him wan fix our corner — I dey support am.", name: "Emeka T.", location: "Agbani" },
              { quote: "His integrity is not in question. His competence is not in question. The choice is clear.", name: "Barr. Ifeoma C.", location: "Nkanu East" },
            ].map((t, i) => (
              <GlassCard key={i} delay={i * 0.1}>
                <p className="text-sm md:text-base mb-4 italic leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--cream)" }}>"{t.quote}"</p>
                <div className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>— {t.name}, {t.location}</div>
              </GlassCard>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-sm md:max-w-lg" style={{ border: "3px solid rgba(255,255,255,0.15)" }}>
            <img src={photo5} alt="Barr. El-Shaddai" className="w-full object-cover" style={{ height: "380px", objectPosition: "top" }} />
          </motion.div>
        </div>
      </section>

      {/* ── GET INVOLVED ── */}
      <section id="get-involved" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-16">
            <div className="text-sm uppercase tracking-widest mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>Take Action</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Join the Movement</h2>
            <p className="text-base md:text-xl max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.8 }}>Every action matters. Every Nkanu voice counts. #IkeNkanu2027</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="rounded-3xl p-6 md:p-10 flex flex-col" style={{ background: "var(--deep-pine)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "var(--leaf-green)", color: "white" }}>
                <Heart size={28} />
              </div>
              <h3 className="text-2xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Support the Campaign</h3>
              <p className="text-sm md:text-base mb-6 leading-relaxed flex-1" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.85 }}>
                Fund grassroots mobilisation, community engagement, and the ground operation that will deliver victory for Nkanu. One-time or recurring — every contribution counts.
              </p>
              <CampaignButton variant="solid" className="w-full" onClick={() => scrollToId("donate")}>Donate Now</CampaignButton>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <VolunteerForm />
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="rounded-3xl p-6 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-10"
            style={{ background: "white", border: "2px solid var(--warm-sand)" }}>
            <div>
              <h3 className="text-xl md:text-3xl mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Attend an Event</h3>
              <p className="text-sm md:text-base" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.65 }}>
                Meet Barr. El-Shaddai at a town hall or community forum near you.
              </p>
            </div>
            <CampaignButton variant="solid" onClick={() => scrollToId("events")}>View Calendar</CampaignButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="rounded-3xl p-6 md:p-12"
            style={{ background: "linear-gradient(135deg, var(--core-green), var(--leaf-green))" }}>
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Stay Updated</h3>
              <p className="text-sm md:text-lg" style={{ fontFamily: "var(--font-body)", color: "var(--cream)", opacity: 0.9 }}>
                Campaign news, event invitations, and mobilisation alerts — delivered how you prefer.
              </p>
            </div>
            {newsletterDone ? (
              <div className="flex flex-col items-center py-4">
                <CheckCircle size={48} style={{ color: "white" }} />
                <p className="mt-4 text-lg md:text-xl text-center" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>
                  You're in! Watch your {nlForm.channel === "whatsapp" ? "WhatsApp" : nlForm.channel.toUpperCase()} for updates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter}>
                <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto mb-4">
                  <input type="email" required value={nlForm.email} onChange={(e) => setNlForm({ ...nlForm, email: e.target.value })}
                    placeholder="Email address"
                    className="flex-1 px-5 py-3 md:px-6 md:py-4 rounded-full border-2 border-white/30 bg-white/15 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                    style={{ fontFamily: "var(--font-body)" }} />
                  <input type="tel" value={nlForm.phone} onChange={(e) => setNlForm({ ...nlForm, phone: e.target.value })}
                    placeholder="Phone / WhatsApp"
                    className="flex-1 px-5 py-3 md:px-6 md:py-4 rounded-full border-2 border-white/30 bg-white/15 backdrop-blur text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                    style={{ fontFamily: "var(--font-body)" }} />
                </div>
                <div className="flex gap-2 md:gap-3 justify-center mb-5 flex-wrap">
                  {[
                    { key: "whatsapp", label: "WhatsApp", icon: <MessageCircle size={14} /> },
                    { key: "sms", label: "SMS", icon: null },
                    { key: "email", label: "Email", icon: null },
                  ].map(({ key, label, icon }) => (
                    <button key={key} type="button" onClick={() => setNlForm({ ...nlForm, channel: key })}
                      className="flex items-center gap-1 px-4 py-2 rounded-full text-xs md:text-sm transition-all"
                      style={{ background: nlForm.channel === key ? "white" : "rgba(255,255,255,0.15)", color: nlForm.channel === key ? "var(--core-green)" : "white", fontFamily: "var(--font-body)", border: "2px solid rgba(255,255,255,0.3)" }}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
                <div className="text-center">
                  <button type="submit" className="px-8 md:px-10 py-3 md:py-4 rounded-full transition-all hover:scale-105"
                    style={{ background: "white", color: "var(--core-green)", fontFamily: "var(--font-body)", fontSize: "14px" }}>
                    Subscribe
                  </button>
                  <p className="mt-3 text-xs" style={{ fontFamily: "var(--font-body)", color: "white", opacity: 0.6 }}>
                    You consent to receive campaign communications. Opt out any time. NDPA compliant.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative py-12 md:py-16 px-4 md:px-8 bg-[var(--deep-pine)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-lg md:text-xl mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Barr. Ikeh El-Shaddai</div>
              <div className="text-xs mb-3 uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>#IkeNkanu2027 · NDC</div>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.7 }}>
                House of Representatives · Nkanu East / Nkanu West · Enugu State. A Voice for the People. A Vision for Development.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>Learn More</h4>
              <ul className="space-y-2">
                {["The Candidate", "Six Pillars", "Policy Positions", "News & Updates"].map((link) => (
                  <li key={link}><a href="#" className="text-sm transition-colors hover:text-[var(--leaf-green)]" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.75 }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>Get Involved</h4>
              <ul className="space-y-2">
                {[
                  { label: "Support Campaign", id: "donate" },
                  { label: "Volunteer", id: "get-involved" },
                  { label: "Events & RSVP", id: "events" },
                  { label: "Voter Toolkit", id: "voter" },
                  { label: "Contact", id: "get-involved" },
                ].map((link) => (
                  <li key={link.label}><a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToId(link.id); }} className="text-sm transition-colors hover:text-[var(--leaf-green)] cursor-pointer" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.75 }}>{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>Connect</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { icon: <Facebook size={16} />, label: "Facebook" },
                  { icon: <Twitter size={16} />, label: "Twitter" },
                  { icon: <Instagram size={16} />, label: "Instagram" },
                  { icon: <MessageCircle size={16} />, label: "WhatsApp" },
                  { icon: <Mail size={16} />, label: "Email" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all hover:bg-[var(--leaf-green)]"
                    style={{ color: "var(--warm-sand)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Scale size={13} style={{ color: "var(--leaf-green)" }} />
                <span className="text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.6 }}>Nigeria Democratic Congress (NDC)</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-3">
            <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.5 }}>
              Paid for by the Campaign of Barr. Ikeh El-Shaddai · NDC · 2027
            </p>
            <div className="flex gap-4">
              {["Privacy Policy", "Terms of Use", "Opt-Out"].map((link) => (
                <a key={link} href="#" className="text-xs transition-colors hover:text-[var(--leaf-green)]"
                  style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.5 }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
