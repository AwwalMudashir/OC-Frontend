"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../components/useScrollReveal";

const pillars = [
  {
    title: "Youth Empowerment",
    desc: "Creating opportunities through skills, funding, and innovation hubs.",
  },
  {
    title: "Education",
    desc: "Improving access, quality, and infrastructure across schools.",
  },
  {
    title: "Infrastructure",
    desc: "Roads, water, and electricity that actually serve the people.",
  },
  {
    title: "Healthcare",
    desc: "Accessible and affordable healthcare systems for every community.",
  },
];

export default function ManifestoPage() {
  useScrollReveal();

  return (
    <div className="bg-[#030712] text-white">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-95">
          <div className="absolute -left-24 top-28 h-80 w-80 rounded-full bg-[#2f9e44]/18 blur-3xl" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#5dade2]/14 blur-3xl" />
          <div className="absolute left-1/3 top-136 h-72 w-72 rounded-full bg-[#d9485f]/12 blur-3xl" />
          <div className="absolute -right-10 bottom-20 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-3xl" />
        </div>

        {/* 🔥 HERO */}
        <section className="relative mx-auto max-w-6xl px-6 pt-32 pb-16 text-center">
          <div className="reveal-on-scroll reveal-up" data-reveal="true">
            <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
              Our Manifesto
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              A clear plan for real impact.
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-8">
              This campaign is built on practical solutions — not promises.
              Every pillar reflects a commitment to measurable progress and
              community-first governance.
            </p>
          </div>
        </section>

        {/* 🔥 PILLARS GRID */}
        <section className="relative mx-auto max-w-7xl px-6 pb-20">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {pillars.map((item, i) => (
              <div
                key={item.title}
                data-reveal="true"
                data-delay={i * 90}
                className="reveal-on-scroll reveal-up group relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {/* top bar */}
                <div className="h-1 w-16 bg-[#5dade2] rounded-full" />

                <h3 className="mt-6 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm text-slate-300 leading-7">
                  {item.desc}
                </p>

                {/* subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-[#5dade2]/5 to-transparent rounded-3xl" />
              </div>
            ))}

          </div>
        </section>

        {/* 🔥 DETAILED SECTION */}
        <section className="relative mx-auto max-w-7xl px-6 py-20 space-y-20">

          {/* ITEM */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* TEXT */}
            <div className="reveal-on-scroll reveal-left" data-reveal="true">
              <p className="text-xs uppercase tracking-[0.3em] text-[#2f9e44]">
                Youth Empowerment
              </p>

              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
                Building opportunities for the next generation.
              </h2>

              <p className="mt-6 text-slate-300 leading-8">
                The focus is on equipping young people with real skills,
                access to funding, and platforms to innovate. This includes
                vocational training, tech hubs, and small business support.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>• Skill acquisition programs</li>
                <li>• Startup funding initiatives</li>
                <li>• Youth innovation hubs</li>
              </ul>
            </div>

            {/* IMAGE */}
            <div className="reveal-on-scroll reveal-right relative h-80 sm:h-105 rounded-3xl overflow-hidden border border-white/10" data-reveal="true" data-delay="120">
              <Image
                src="/youth_empowerment.jpeg"
                alt="Youth empowerment"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* REVERSE */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* IMAGE */}
            <div className="reveal-on-scroll reveal-left relative h-80 sm:h-105 rounded-3xl overflow-hidden border border-white/10" data-reveal="true">
              <Image
                src="/adebisi_1.png"
                alt="Education"
                fill
                className="object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="reveal-on-scroll reveal-right" data-reveal="true" data-delay="120">
              <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
                Education
              </p>

              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
                Strengthening the foundation of society.
              </h2>

              <p className="mt-6 text-slate-300 leading-8">
                Education reform is key to long-term development. The plan
                includes improving infrastructure, teacher support, and access
                to quality learning materials.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li>• School infrastructure upgrades</li>
                <li>• Teacher training programs</li>
                <li>• Digital learning access</li>
              </ul>
            </div>
          </div>

        </section>

        {/* 🔥 CTA */}
        <section className="relative mx-auto max-w-5xl px-6 pb-24 text-center">
          <div className="reveal-on-scroll reveal-up rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl" data-reveal="true">

            <h2 className="text-3xl sm:text-4xl font-semibold">
              Be part of the movement.
            </h2>

            <p className="mt-4 text-slate-300">
              Support a campaign focused on real change and measurable impact.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link
                href="/donate"
                className="px-8 py-3 rounded-full font-semibold transition duration-300 hover:-translate-y-1"
                style={{
                  background: "#d9485f",
                  color: "white",
                  boxShadow: "0 18px 38px rgba(217,72,95,0.28)",
                }}
              >
                Donate Now
              </Link>

              <Link
                href="/contact"
                className="px-8 py-3 rounded-full border border-white/20 transition duration-300 hover:-translate-y-1 hover:bg-white/8"
              >
                Contact Team
              </Link>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}