"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useScrollReveal from "../components/useScrollReveal";

const manifestoValues = [
  {
    title: "Sincerity",
    desc: "A manifesto presented as a solemn promise, not a temporary slogan.",
  },
  {
    title: "Transparency",
    desc: "Open representation, accountable leadership, and a people-first legislative approach.",
  },
  {
    title: "Dedication",
    desc: "Focused service aimed at meaningful development and better living standards.",
  },
];

const manifestoSections = [
  {
    label: "01",
    title: "Good Governance & Representation",
    summary:
      "Giving Essa, Shawo, and Igbodun Constituency a stronger, more respected presence in legislative matters and state policy conversations.",
    points: [
      "Giving the constituency a strong voice in legislative matters",
      "Promoting transparency and accountability in governance",
      "Maintaining regular engagement with constituents",
      "Ensuring constituency needs are prioritized in state policies",
    ],
  },
  {
    label: "02",
    title: "Youth Empowerment",
    summary:
      "Equipping young people with practical tools, opportunities, and support systems that can translate ambition into livelihood and leadership.",
    points: [
      "Skills acquisition and vocational training programmes",
      "Youth entrepreneurship support and startup empowerment",
      "Facilitation of job opportunities and linkages",
      "Support for ICT and digital skills development",
    ],
  },
  {
    label: "03",
    title: "Education Development",
    summary:
      "Advancing learning as a pathway to long-term prosperity by backing students, schools, teachers, and outreach programmes across the constituency.",
    points: [
      "Scholarship and bursary support for students",
      "Improvement of school facilities and learning environments",
      "Advocacy for teacher welfare and recruitment",
      "Support for adult literacy and educational outreach programmes",
    ],
  },
  {
    label: "04",
    title: "Infrastructure Development",
    summary:
      "Pushing for physical development that directly improves access, mobility, public services, and local economic life in communities.",
    points: [
      "Advocacy for road rehabilitation and rural access roads",
      "Improved electricity supply initiatives in communities",
      "Development of water supply systems for rural areas",
      "Support for community based infrastructural projects",
    ],
  },
  {
    label: "05",
    title: "Healthcare Improvement",
    summary:
      "Improving the quality and reach of healthcare through local access, essential support, and targeted community health intervention.",
    points: [
      "Better access to primary healthcare services",
      "Support for health centres with basic equipment and drugs",
      "Health outreach programmes for rural communities",
      "Maternal and child health support initiatives",
    ],
  },
  {
    label: "06",
    title: "Women & Community Development",
    summary:
      "Creating inclusive growth by expanding support for women, traders, cooperatives, and community development partnerships.",
    points: [
      "Empowerment programmes for women in trade and agriculture",
      "Support for cooperative societies and small businesses",
      "Community development initiatives through partnerships",
      "Inclusion of women in decision making processes",
    ],
  },
  {
    label: "07",
    title: "Agriculture & Rural Development",
    summary:
      "Supporting farmers and strengthening rural productivity so agriculture becomes a stronger engine for jobs, food security, and local wealth.",
    points: [
      "Support for farmers with inputs and modern techniques",
      "Promotion of agribusiness opportunities for youths",
      "Advocacy for irrigation and farm-to-market roads",
      "Strengthening food security in the constituency",
    ],
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
              Manifesto of Hon. Adebisi Muhammed Oroye
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              A solemn commitment to Essa, Shawo, and Igbodun Constituency.
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-base sm:text-lg leading-8">
              I, Hon. Adebisi Muhammed Oroye, present this manifesto as a solemn
              commitment to serve the good people of Essa, Shawo, and Igbodun
              Constituency with sincerity, transparency, and dedication. My
              aspiration is driven by a deep desire to bring meaningful
              development, improve living standards, and give our people a
              stronger voice at the Kwara State House of Assembly.
            </p>
          </div>
        </section>

        {/* 🔥 MANIFESTO INTRO DESIGN */}
        <section className="relative mx-auto max-w-7xl px-6 pb-10">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div
              className="reveal-on-scroll reveal-left rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10"
              data-reveal="true"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#5dade2]">
                Preamble Focus
              </p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                A manifesto rooted in service, voice, and meaningful development.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                This manifesto is not a second summary of the pillars below. It is the
                framing promise behind them: to serve Essa, Shawo, and Igbodun Constituency
                with sincerity, transparency, and dedication while pushing for visible
                improvements in representation and living standards.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Essa",
                  "Shawo",
                  "Igbodun",
                  "Transparency",
                  "Accountability",
                  "Representation",
                ].map((item, index) => (
                  <span
                    key={item}
                    data-reveal="true"
                    data-delay={index * 60}
                    className="reveal-on-scroll reveal-up rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {manifestoValues.map((value, index) => (
                <div
                  key={value.title}
                  data-reveal="true"
                  data-delay={120 + index * 80}
                  className="reveal-on-scroll reveal-right rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <p className="text-xs uppercase tracking-[0.26em] text-[#2f9e44]">
                    Guiding Value
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔥 DETAILED SECTION */}
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 space-y-20">
          <div className="reveal-on-scroll reveal-up mx-auto max-w-3xl text-center" data-reveal="true">
            <p className="text-xs uppercase tracking-[0.28em] text-[#2f9e44]">
              Full Manifesto
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">
              Concrete commitments backed by accountability.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {manifestoSections.map((section, index) => (
              <article
                key={section.title}
                data-reveal="true"
                data-delay={index * 70}
                className={`reveal-on-scroll ${index % 2 === 0 ? "reveal-left" : "reveal-right"} rounded-4xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl sm:p-8`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#5dade2]">
                      Pillar {section.label}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                      {section.title}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm font-semibold text-white/80">
                    {section.label}
                  </div>
                </div>

                <p className="mt-6 text-base leading-8 text-slate-300">
                  {section.summary}
                </p>

                <ul className="mt-7 space-y-3 text-sm leading-7 text-slate-200 sm:text-base">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2f9e44]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="reveal-on-scroll reveal-up rounded-4xl border border-emerald-300/16 bg-[linear-gradient(180deg,rgba(9,21,20,0.96),rgba(10,32,27,0.92))] p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10" data-reveal="true">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
              Commitment
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Service with integrity, dedication, and accountability.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              I am fully committed to serving with integrity, dedication, and
              accountability. Together, we can build a more prosperous, united,
              and progressive Essa, Shawo, and Igbodun Constituency.
            </p>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}