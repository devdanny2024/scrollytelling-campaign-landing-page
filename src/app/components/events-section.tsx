import { motion } from "motion/react";
import { CalendarDays, MapPin, Clock, Users, CheckCircle } from "lucide-react";
import { useState } from "react";

const events = [
  { date: { day: "28", month: "Jun" }, title: "Nkanu West Mega Rally — Obe Community Square", location: "Obe, Nkanu West LGA", time: "10:00am – 2:00pm", type: "Rally", spotsLeft: 4820 },
  { date: { day: "5", month: "Jul" }, title: "Nkanu East Town Hall — Agbani Council Hall", location: "Agbani, Nkanu East LGA", time: "9:00am – 1:00pm", type: "Town Hall", spotsLeft: 340 },
  { date: { day: "12", month: "Jul" }, title: "Youth Forum — Digital Entrepreneurship & Jobs", location: "Enugu Urban, Enugu State", time: "11:00am – 3:00pm", type: "Town Hall", spotsLeft: 2100 },
  { date: { day: "19", month: "Jul" }, title: "Donor & Volunteer Briefing — Abuja", location: "Central Business District, FCT", time: "10:00am – 12:00pm", type: "Briefing", spotsLeft: 88 },
];

type RSVPState = Record<number, boolean>;

export function EventsSection() {
  const [rsvpd, setRsvpd] = useState<RSVPState>({});
  const [activeRsvp, setActiveRsvp] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", channel: "whatsapp" });
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent, i: number) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setRsvpd((prev) => ({ ...prev, [i]: true })); setActiveRsvp(null); setSubmitting(false); setForm({ name: "", phone: "", email: "", channel: "whatsapp" }); }, 1200);
  }

  const typeColors: Record<string, string> = { Rally: "var(--core-green)", "Town Hall": "var(--core-green)", Briefing: "#92400e" };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14">
          <div className="text-sm uppercase tracking-widest mb-3 flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>
            <CalendarDays size={14} /> Events Calendar
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Meet the Movement</h2>
          <p className="text-base md:text-xl max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.7 }}>
            Join Barr. El-Shaddai at rallies, town halls, and community forums across Nkanu and beyond.
          </p>
        </motion.div>

        <div className="space-y-4">
          {events.map((ev, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div className="rounded-2xl p-4 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8"
                style={{ background: "var(--cream)", border: activeRsvp === i ? "2px solid var(--core-green)" : "2px solid var(--warm-sand)", transition: "border-color 0.3s ease" }}>
                {/* Date block */}
                <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center" style={{ background: "var(--deep-pine)" }}>
                  <span className="text-2xl md:text-3xl leading-none" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>{ev.date.day}</span>
                  <span className="text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>{ev.date.month}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-full text-xs uppercase tracking-wider"
                      style={{ background: `${typeColors[ev.type]}20`, color: typeColors[ev.type], fontFamily: "var(--font-body)", border: `1px solid ${typeColors[ev.type]}40` }}>
                      {ev.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.5 }}>
                      <Users size={10} /> {ev.spotsLeft.toLocaleString()} spots left
                    </span>
                  </div>
                  <h3 className="text-base md:text-2xl mb-1 leading-snug" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>{ev.title}</h3>
                  <div className="flex flex-wrap gap-3 md:gap-6">
                    <span className="text-xs flex items-center gap-1" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}><MapPin size={11} /> {ev.location}</span>
                    <span className="text-xs flex items-center gap-1" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}><Clock size={11} /> {ev.time}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full sm:w-auto">
                  {rsvpd[i] ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm" style={{ background: "var(--leaf-green)", color: "white", fontFamily: "var(--font-body)" }}>
                      <CheckCircle size={14} /> Confirmed
                    </div>
                  ) : (
                    <button onClick={() => setActiveRsvp(activeRsvp === i ? null : i)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full transition-all hover:scale-105 text-sm"
                      style={{ background: "var(--core-green)", color: "white", fontFamily: "var(--font-body)" }}>
                      RSVP Now
                    </button>
                  )}
                </div>
              </div>

              {/* Inline RSVP form */}
              {activeRsvp === i && !rsvpd[i] && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                  className="mx-0 md:mx-2 rounded-b-2xl p-5 md:p-8"
                  style={{ background: "white", border: "2px solid var(--core-green)", borderTop: "none" }}>
                  <h4 className="text-base md:text-xl mb-4" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Reserve your spot</h4>
                  <form onSubmit={(e) => handleSubmit(e, i)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[{ key: "name", label: "Full Name *", type: "text", placeholder: "Your full name" }, { key: "phone", label: "Phone *", type: "tel", placeholder: "+234 800 000 0000" }, { key: "email", label: "Email", type: "email", placeholder: "your@email.com" }].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}>{label}</label>
                        <input required={key !== "email"} type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border focus:outline-none transition-colors text-sm"
                          style={{ fontFamily: "var(--font-body)", border: "1.5px solid var(--warm-sand)", color: "var(--ink)" }} placeholder={placeholder} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.6 }}>Reminder via</label>
                      <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl focus:outline-none text-sm"
                        style={{ fontFamily: "var(--font-body)", border: "1.5px solid var(--warm-sand)", color: "var(--ink)", background: "white" }}>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="sms">SMS</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-xs mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.5 }}>
                        By submitting you consent to receive event reminders. Your data is handled per our Privacy Policy and the NDPA.
                      </p>
                      <button type="submit" disabled={submitting}
                        className="px-8 py-3 rounded-full transition-all hover:scale-105 text-sm"
                        style={{ background: submitting ? "var(--warm-sand)" : "var(--core-green)", color: "white", fontFamily: "var(--font-body)" }}>
                        {submitting ? "Confirming…" : "Confirm RSVP"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
