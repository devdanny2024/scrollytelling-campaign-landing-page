import { motion } from "motion/react";
import { Users, CheckCircle } from "lucide-react";
import { useState } from "react";

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
const ROLES = ["Polling Unit Agent","Ward Coordinator","Digital/Social Media","Community Mobiliser","Event Support","Data Entry","Logistics & Transport"];

export function VolunteerForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", state: "", ward: "", pollingUnit: "", role: "", availability: "weekends", channel: "whatsapp" });

  function set(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setDone(true); setSubmitting(false); }, 1400);
  }

  const inputClass = "w-full px-4 py-3 rounded-xl focus:outline-none transition-colors text-sm";
  const inputStyle = { fontFamily: "var(--font-body)", border: "1.5px solid var(--warm-sand)", color: "var(--ink)" };
  const labelStyle = { fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.55 };

  return (
    <div className="rounded-3xl p-6 md:p-10" style={{ background: "white", border: "1px solid var(--warm-sand)" }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--leaf-green), var(--core-green))", color: "white" }}>
          <Users size={22} />
        </div>
        <div>
          <h3 className="text-lg md:text-2xl" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Volunteer Sign-Up</h3>
          <p className="text-xs md:text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.55 }}>Join our ground team in your ward and polling unit</p>
        </div>
      </div>

      {done ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-10 text-center">
          <CheckCircle size={48} style={{ color: "var(--leaf-green)" }} />
          <h4 className="text-xl md:text-2xl mt-4 mb-2" style={{ fontFamily: "var(--font-headline)", color: "var(--ink)" }}>Welcome, {form.name}!</h4>
          <p className="text-sm md:text-base" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.65 }}>
            Your ward coordinator will reach you via {form.channel} within 48 hours.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>Personal Details</span>
            <div className="border-t mt-1.5 mb-3" style={{ borderColor: "var(--warm-sand)" }} />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Full Name *</label>
            <input required type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Phone *</label>
            <input required type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234 800 000 0000" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" className={inputClass} style={inputStyle} />
          </div>

          <div className="col-span-1 md:col-span-2 mt-2">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>Your Location</span>
            <div className="border-t mt-1.5 mb-3" style={{ borderColor: "var(--warm-sand)" }} />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>State *</label>
            <select required value={form.state} onChange={(e) => set("state", e.target.value)} className={inputClass} style={{ ...inputStyle, background: "white" }}>
              <option value="">Select state…</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Ward</label>
            <input type="text" value={form.ward} onChange={(e) => set("ward", e.target.value)} placeholder="e.g. Nkanu West Ward 2" className={inputClass} style={inputStyle} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Polling Unit (optional)</label>
            <input type="text" value={form.pollingUnit} onChange={(e) => set("pollingUnit", e.target.value)} placeholder="e.g. PU 003 — Obe Community School" className={inputClass} style={inputStyle} />
          </div>

          <div className="col-span-1 md:col-span-2 mt-2">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-body)", color: "var(--core-green)" }}>Role & Availability</span>
            <div className="border-t mt-1.5 mb-3" style={{ borderColor: "var(--warm-sand)" }} />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Preferred Role</label>
            <select value={form.role} onChange={(e) => set("role", e.target.value)} className={inputClass} style={{ ...inputStyle, background: "white" }}>
              <option value="">Any role</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={labelStyle}>Availability</label>
            <select value={form.availability} onChange={(e) => set("availability", e.target.value)} className={inputClass} style={{ ...inputStyle, background: "white" }}>
              <option value="weekends">Weekends only</option>
              <option value="evenings">Weekday evenings</option>
              <option value="fulltime">Full-time available</option>
              <option value="electionday">Election day only</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs uppercase tracking-wider mb-2" style={labelStyle}>Preferred contact channel</label>
            <div className="flex gap-2">
              {["whatsapp", "sms", "email"].map((ch) => (
                <button key={ch} type="button" onClick={() => set("channel", ch)}
                  className="flex-1 py-2.5 rounded-xl capitalize transition-all text-xs md:text-sm"
                  style={{ background: form.channel === ch ? "var(--core-green)" : "transparent", color: form.channel === ch ? "white" : "var(--ink)", fontFamily: "var(--font-body)", border: form.channel === ch ? "none" : "1.5px solid var(--warm-sand)", opacity: form.channel === ch ? 1 : 0.7 }}>
                  {ch === "whatsapp" ? "WhatsApp" : ch.charAt(0).toUpperCase() + ch.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-xs mb-3" style={{ fontFamily: "var(--font-body)", color: "var(--ink)", opacity: 0.45 }}>
              Your data is handled under the NDPA. By submitting you opt in to campaign communications via your selected channel. Opt out any time.
            </p>
            <button type="submit" disabled={submitting} className="w-full py-3 md:py-4 rounded-2xl transition-all hover:scale-[1.02] text-sm md:text-base"
              style={{ background: submitting ? "var(--warm-sand)" : "linear-gradient(135deg, var(--core-green), var(--leaf-green))", color: "white", fontFamily: "var(--font-headline)" }}>
              {submitting ? "Submitting…" : "Join the Ground Team"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
