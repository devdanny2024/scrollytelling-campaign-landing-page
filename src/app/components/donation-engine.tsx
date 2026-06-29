import { motion } from "motion/react";
import { useState } from "react";
import { Heart, RefreshCw, CheckCircle, Shield } from "lucide-react";
import { DonationThermometer } from "./donation-thermometer";
import { API_BASE, PAYSTACK_PUBLIC_KEY } from "../config";

type Currency = "NGN" | "USD" | "GBP";

const CURRENCIES: { code: Currency; symbol: string; label: string }[] = [
  { code: "NGN", symbol: "₦", label: "Naira" },
  { code: "USD", symbol: "$", label: "Dollar" },
  { code: "GBP", symbol: "£", label: "Pound" },
];

const SUGGESTED: Record<Currency, number[]> = {
  NGN: [1000, 5000, 10000, 25000, 50000, 100000],
  USD: [5, 10, 25, 50, 100, 250],
  GBP: [5, 10, 25, 50, 100, 250],
};

const SYMBOL: Record<Currency, string> = { NGN: "₦", USD: "$", GBP: "£" };

const recentDonors = [
  { name: "Chukwuemeka A.", location: "Onitsha", amount: 50000, time: "2 min ago" },
  { name: "Fatima B.", location: "Kano", amount: 10000, time: "5 min ago" },
  { name: "Taiwo O.", location: "Ibadan", amount: 25000, time: "9 min ago" },
  { name: "Anonymous", location: "Lagos", amount: 100000, time: "12 min ago" },
  { name: "Ngozi E.", location: "Enugu", amount: 5000, time: "18 min ago" },
  { name: "Abdullahi M.", location: "Sokoto", amount: 10000, time: "24 min ago" },
];

function formatMoney(val: number, cur: Currency) {
  const sym = SYMBOL[cur];
  if (cur === "NGN") {
    if (val >= 1_000_000) return `${sym}${(val / 1_000_000).toFixed(1)}m`;
    if (val >= 1_000) return `${sym}${(val / 1_000).toFixed(0)}k`;
  }
  return `${sym}${val.toLocaleString()}`;
}

export function DonationEngine() {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [selected, setSelected] = useState<number | null>(10000);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);

  function switchCurrency(cur: Currency) {
    setCurrency(cur);
    setCustom("");
    setSelected(SUGGESTED[cur][2]); // sensible mid default
  }
  const [step, setStep] = useState<"amount" | "details" | "done">("amount");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const amount = custom ? parseInt(custom.replace(/\D/g, ""), 10) || 0 : selected ?? 0;

  function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    const Paystack = (window as any).PaystackPop;
    if (!Paystack) {
      alert("The payment library could not load. Please check your connection and try again.");
      return;
    }
    setSubmitting(true);
    const handler = Paystack.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: Math.round(amount * 100), // Paystack charges in the minor unit (kobo/cents/pence)
      currency,
      metadata: {
        name: form.name,
        phone: form.phone,
        recurring,
        custom_fields: [
          { display_name: "Donor Name", variable_name: "donor_name", value: form.name },
          { display_name: "Phone", variable_name: "phone", value: form.phone || "—" },
          { display_name: "Frequency", variable_name: "frequency", value: recurring ? "Monthly" : "One-time" },
        ],
      },
      callback: function (response: { reference: string }) {
        fetch(`${API_BASE}/donate-verify.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference: response.reference }),
        })
          .catch(() => {}) // payment already captured; webhook reconciles
          .finally(() => { setSubmitting(false); setStep("done"); });
      },
      onClose: function () { setSubmitting(false); },
    });
    handler.openIframe();
  }

  return (
    <section id="donate" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[var(--deep-pine)]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16">
          <div className="text-sm uppercase tracking-widest mb-3 flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-body)", color: "var(--leaf-green)" }}>
            <Heart size={14} /> Fuel the Movement
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>The Movement is Growing</h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-12 mb-10 md:mb-14">
          {[{ value: "287,500+", label: "Registered Supporters" }, { value: "₦8.42m", label: "Raised So Far" }, { value: "142", label: "Town Halls Held" }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="text-center">
              <div className="text-2xl md:text-5xl lg:text-6xl mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>{stat.value}</div>
              <div className="text-xs md:text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.7 }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 md:mb-14">
          <DonationThermometer raised={8420000} goal={15000000} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Donation form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="rounded-3xl p-6 md:p-10"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
            {step === "done" ? (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                  <CheckCircle size={56} style={{ color: "var(--leaf-green)" }} />
                </motion.div>
                <h3 className="text-2xl md:text-3xl mt-5 mb-3" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Thank You, {form.name || "Supporter"}!</h3>
                <p className="text-sm md:text-base mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.8 }}>
                  Your {formatMoney(amount, currency)}{recurring ? " monthly" : ""} contribution has been received. A receipt will be sent to {form.email || "your email"}.
                </p>
                <p className="text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.5 }}>Paid for by the Campaign of Barr. Ikeh El-Shaddai · NDC · 2027</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl md:text-3xl mb-1" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Make a Donation</h3>
                <p className="text-xs md:text-sm mb-6" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.7 }}>Cards · Bank Transfer · USSD · Apple/Google Pay — all via Paystack</p>

                {step === "amount" && (
                  <>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {CURRENCIES.map((c) => (
                        <button key={c.code} type="button" onClick={() => switchCurrency(c.code)}
                          className="py-2.5 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5"
                          style={{ background: currency === c.code ? "var(--core-green)" : "rgba(255,255,255,0.07)", color: currency === c.code ? "white" : "var(--warm-sand)", fontFamily: "var(--font-body)", border: currency === c.code ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                          <span style={{ fontSize: "15px" }}>{c.symbol}</span> {c.code}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                      {["Give Once", "Monthly"].map((label, idx) => (
                        <button key={label} onClick={() => setRecurring(idx === 1)}
                          className="flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                          style={{ background: recurring === (idx === 1) ? "var(--core-green)" : "transparent", color: recurring === (idx === 1) ? "white" : "var(--warm-sand)", fontFamily: "var(--font-body)", border: recurring === (idx === 1) ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
                          {idx === 1 && <RefreshCw size={13} />} {label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
                      {SUGGESTED[currency].map((amt) => (
                        <button key={amt} onClick={() => { setSelected(amt); setCustom(""); }}
                          className="py-3 md:py-4 rounded-2xl transition-all hover:scale-105 text-sm"
                          style={{ background: selected === amt && !custom ? "var(--leaf-green)" : "rgba(255,255,255,0.07)", color: selected === amt && !custom ? "white" : "var(--warm-sand)", fontFamily: "var(--font-body)", border: selected === amt && !custom ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                          {formatMoney(amt, currency)}
                        </button>
                      ))}
                    </div>

                    <input type="text" value={custom} onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                      placeholder={`Other amount (${SYMBOL[currency]})`}
                      className="w-full px-4 py-3 rounded-2xl focus:outline-none transition-all mb-6 text-sm"
                      style={{ background: "rgba(255,255,255,0.06)", border: custom ? "2px solid var(--leaf-green)" : "1.5px solid rgba(255,255,255,0.15)", color: "var(--cream)", fontFamily: "var(--font-body)" }} />

                    <button disabled={!amount} onClick={() => setStep("details")}
                      className="w-full py-4 rounded-2xl transition-all hover:scale-[1.02] disabled:opacity-40 text-base md:text-lg"
                      style={{ background: "var(--leaf-green)", color: "white", fontFamily: "var(--font-headline)" }}>
                      {amount ? `Donate ${formatMoney(amount, currency)}${recurring ? "/mo" : ""}` : "Select an amount"}
                    </button>
                  </>
                )}

                {step === "details" && (
                  <form onSubmit={handleDonate}>
                    <div className="flex items-center gap-3 mb-5 p-4 rounded-2xl cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--leaf-green)" }} onClick={() => setStep("amount")}>
                      <div>
                        <div style={{ fontFamily: "var(--font-headline)", color: "var(--cream)", fontSize: "18px" }}>{formatMoney(amount, currency)}{recurring ? "/month" : ""}</div>
                        <div style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.6, fontSize: "12px" }}>← Change amount</div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-5">
                      {[{ key: "name", label: "Full Name *", type: "text", placeholder: "Your full name" }, { key: "email", label: "Email *", type: "email", placeholder: "for your receipt" }, { key: "phone", label: "Phone (optional)", type: "tel", placeholder: "+234 800 000 0000" }].map(({ key, label, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.6 }}>{label}</label>
                          <input required={key !== "phone"} type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all text-sm"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.15)", color: "var(--cream)", fontFamily: "var(--font-body)" }} />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs mb-4 leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.5 }}>
                      Donor records kept per campaign-finance regulations. Paid for by the Campaign of Barr. Ikeh El-Shaddai · NDC · 2027
                    </p>
                    <button type="submit" disabled={submitting}
                      className="w-full py-4 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-3 text-base"
                      style={{ background: submitting ? "var(--core-green)" : "var(--leaf-green)", color: "white", fontFamily: "var(--font-headline)" }}>
                      <Shield size={16} /> {submitting ? "Processing…" : "Donate Securely via Paystack"}
                    </button>
                  </form>
                )}
              </>
            )}
          </motion.div>

          {/* Donor wall */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h3 className="text-xl md:text-2xl mb-5" style={{ fontFamily: "var(--font-headline)", color: "var(--cream)" }}>Recent Supporters</h3>
            <div className="space-y-3">
              {recentDonors.map((donor, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--core-green)", color: "var(--cream)", fontFamily: "var(--font-headline)", fontSize: "15px" }}>
                      {donor.name === "Anonymous" ? "★" : donor.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-body)", color: "var(--cream)", fontSize: "13px" }}>{donor.name}</div>
                      <div style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.55, fontSize: "11px" }}>{donor.location} · {donor.time}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs md:text-sm" style={{ background: "rgba(74,158,74,0.2)", color: "var(--leaf-bright)", fontFamily: "var(--font-body)" }}>
                    {formatMoney(donor.amount, "NGN")}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs" style={{ fontFamily: "var(--font-body)", color: "var(--warm-sand)", opacity: 0.4 }}>
              Donors who opted out of the public wall are not shown
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
