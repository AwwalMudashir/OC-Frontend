"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import apiFetch from "../api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import useScrollReveal from "../components/useScrollReveal";
import { useToast } from "../components/ToastProvider";

export default function ContactPage() {
  useScrollReveal();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error({
        title: "Missing required fields",
        message: "Please complete your name, email address, and message before sending.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/api/contact", {
        method: "POST",
        body: { name, email, message },
      });

      if (res.statusCode === 200) {
        toast.success({
          title: "Message sent successfully",
          message: res.message || "The campaign team has received your message and will get back to you.",
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error({
          title: "Could not send message",
          message: res.message || "Something went wrong while submitting your message.",
        });
      }
    } catch {
      toast.error({
        title: "Network error",
        message: "The contact request could not be completed. Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-10">
        <div className="pointer-events-none absolute -left-16 top-20 h-80 w-80 rounded-full bg-[rgba(59,130,246,0.16)] blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[rgba(34,197,94,0.12)] blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <section className="reveal-on-scroll reveal-left rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,17,34,0.96),rgba(14,28,52,0.92))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-10" data-reveal="true">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
              <Mail className="h-4 w-4" />
              Contact Campaign Team
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Reach the campaign directly.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Send a message for enquiries, partnership requests, volunteer coordination, media outreach, or community engagement. The campaign team will respond through the contact details you provide.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="reveal-on-scroll reveal-up rounded-3xl border border-white/8 bg-white/5 p-5" data-reveal="true" data-delay="80">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/12 text-sky-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Email</p>
                    <p className="mt-2 text-sm text-slate-100 sm:text-base">oroye.campaign@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll reveal-up rounded-3xl border border-white/8 bg-white/5 p-5" data-reveal="true" data-delay="140">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/12 text-emerald-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Phone</p>
                    <p className="mt-2 text-sm text-slate-100 sm:text-base">+234 800 000 0000</p>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll reveal-up rounded-3xl border border-white/8 bg-white/5 p-5" data-reveal="true" data-delay="200">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-400/12 text-rose-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Location</p>
                    <p className="mt-2 text-sm text-slate-100 sm:text-base">Offa, Kwara State, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-on-scroll reveal-up mt-8 rounded-3xl border border-emerald-300/14 bg-emerald-300/8 p-5" data-reveal="true" data-delay="260">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-200" />
                <p className="text-sm leading-7 text-slate-200">
                  Your message is sent through the campaign contact endpoint and is intended for legitimate civic communication, coordination, and supporter outreach.
                </p>
              </div>
            </div>
          </section>

          <section className="reveal-on-scroll reveal-right rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(12,20,38,0.92))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-10" data-reveal="true" data-delay="120">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Send A Message</p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">We want to hear from you.</h2>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/6 text-sky-200">
                <Send className="h-6 w-6" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Full Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Email Address</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Your email"
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the campaign team what you need"
                  className="mt-2 block min-h-40 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-slate-500 focus:border-rose-400 focus:outline-none"
                  rows={6}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "#e11d48",
                  boxShadow: "0 18px 40px rgba(225, 29, 72, 0.32)",
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
