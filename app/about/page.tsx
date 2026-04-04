"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const educationTimeline = [
    {
        year: "1995",
        title: "Moradayo Nursery and Primary School",
        detail: "Completed early education and earned the First School Leaving Certificate.",
    },
    {
        year: "2001",
        title: "Olalomi Comprehensive College, Offa",
        detail: "Built a strong secondary-school foundation shaped by discipline and civic awareness.",
    },
    {
        year: "2005",
        title: "Federal Polytechnic Offa",
        detail: "Completed the Ordinary National Diploma with a practical, hands-on academic focus.",
    },
    {
        year: "2011",
        title: "Kaduna Polytechnic",
        detail: "Advanced professional studies and obtained the Higher National Diploma.",
    },
    {
        year: "2015",
        title: "LAUTECH",
        detail: "Expanded leadership and specialist capacity through a Postgraduate Diploma programme.",
    },
];

const workExperience = [
    {
        title: "Oceanic Bank Plc",
        desc: "Worked in financial services and customer relations from 2006 to 2009, gaining frontline experience in trust, structure, and service delivery.",
    },
    {
        title: "ICMA Professional Services",
        desc: "Delivered professional and administrative expertise from 2011 onward, strengthening operations and strategic coordination.",
    },
    {
        title: "MULAT Group",
        desc: "Leads MULAT Table Water and MULAT Farms as Managing Director, creating jobs and building sustainable local enterprise.",
    },
    {
        title: "Express Payment Solutions",
        desc: "Contributed to financial and digital service operations in 2021, with exposure to modern payment systems and execution detail.",
    },
];

const leadershipPillars = [
    "Youth empowerment programmes",
    "Stronger access to quality education",
    "Infrastructure that serves daily life",
    "Support systems for elderly citizens",
];

export default function AboutPage() {
    useEffect(() => {
        const elements = Array.from(
            document.querySelectorAll<HTMLElement>("[data-reveal]")
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const element = entry.target as HTMLElement;

                    const delay = element.getAttribute("data-delay");
                    if (delay) {
                        element.style.transitionDelay = `${delay}ms`;
                    }

                    element.classList.add("is-visible");
                    observer.unobserve(element);
                });
            },
            {
                threshold: 0.18,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

  return (
        <div className="bg-[#030712] text-white">
            <Navbar />

            <main className="relative overflow-hidden bg-[#030712] text-white">
                <div className="pointer-events-none absolute inset-0 opacity-90">
                    <div className="absolute -left-32 top-28 h-80 w-80 rounded-full bg-[#2f9e44]/20 blur-3xl" />
                    <div className="absolute -right-24 top-44 h-96 w-96 rounded-full bg-[#5dade2]/18 blur-3xl" />
                    <div className="absolute left-1/3 top-128 h-72 w-72 rounded-full bg-[#d9485f]/14 blur-3xl" />
                    <div className="absolute bottom-24 right-10 h-80 w-80 rounded-full bg-[#f59e0b]/10 blur-3xl" />
                </div>

                <section className="relative mx-auto max-w-7xl px-6 pb-18 pt-32 lg:px-10 lg:pb-24">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="reveal-on-scroll reveal-left" data-reveal="true">
                            <div className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70 backdrop-blur-md">
                                About Adebisi Oroye
                            </div>

                            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
                                A reform-minded leader shaped by education, enterprise, and service.
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                This page tells the deeper story behind the campaign: the academic path,
                                the professional discipline, and the community values driving a people-first
                                vision for Kwara State.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    href="/manifesto"
                                    className="inline-flex items-center justify-center rounded-full bg-[#d9485f] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:bg-[#c73e4d]"
                                >
                                    View Manifesto
                                </Link>
                                <Link
                                    href="/donate"
                                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/6 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                                >
                                    Support Campaign
                                </Link>
                            </div>
                        </div>

                        <div className="reveal-on-scroll reveal-right" data-reveal="true" data-delay="120">
                            <div className="relative overflow-hidden rounded-4xl border border-white/12 bg-white/6 p-3 shadow-[0_35px_120px_rgba(3,7,18,0.55)] backdrop-blur-xl">
                                <div className="relative h-105 overflow-hidden rounded-[1.6rem] sm:h-130">
                                    <Image
                                        src="/adebisi_1.png"
                                        alt="Adebisi Oroye portrait"
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-[#030712]/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                        <div className="rounded-3xl border border-white/12 bg-[#030712]/62 p-5 backdrop-blur-md">
                                            <p className="text-xs uppercase tracking-[0.28em] text-[#5dade2]">
                                                Community-rooted leadership
                                            </p>
                                            <p className="mt-3 text-sm leading-7 text-slate-200">
                                                Grounded in Offa, inspired by service, and focused on practical progress
                                                that people can feel in education, jobs, and representation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
                    <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr] lg:items-center">
                        <div className="reveal-on-scroll reveal-left rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl" data-reveal="true">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#5dade2]">
                                Biography
                            </p>
                            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
                                A personal story built on discipline, exposure, and grassroots connection.
                            </h2>
                            <p className="mt-6 text-base leading-8 text-slate-300">
                                Adebisi Muhammed Oroye is a Nigerian political aspirant, grassroots mobilizer,
                                and community development advocate from Kwara State. Raised in Offa, he comes
                                from a family with deep roots in education and service.
                            </p>
                            <p className="mt-4 text-base leading-8 text-slate-300">
                                Inspired by a legacy of learning and civic contribution, he has developed a
                                leadership approach that blends empathy, structure, and accountability with a
                                strong belief in youth opportunity.
                            </p>
                        </div>

                        <div className="reveal-on-scroll reveal-right grid gap-4 sm:grid-cols-3" data-reveal="true" data-delay="120">
                            <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1220]/88 p-6 backdrop-blur-xl sm:col-span-1">
                                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Focus</p>
                                <p className="mt-4 text-3xl font-semibold text-[#2f9e44]">People</p>
                                <p className="mt-3 text-sm leading-7 text-slate-300">Representation guided by lived realities and real needs.</p>
                            </div>
                            <div className="rounded-[1.75rem] border border-white/10 bg-[#0f172a]/88 p-6 backdrop-blur-xl sm:col-span-1">
                                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Approach</p>
                                <p className="mt-4 text-3xl font-semibold text-[#5dade2]">Action</p>
                                <p className="mt-3 text-sm leading-7 text-slate-300">Solutions that move from campaign promises to visible outcomes.</p>
                            </div>
                            <div className="rounded-[1.75rem] border border-white/10 bg-[#131c31]/88 p-6 backdrop-blur-xl sm:col-span-1">
                                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Value</p>
                                <p className="mt-4 text-3xl font-semibold text-[#f59e0b]">Service</p>
                                <p className="mt-3 text-sm leading-7 text-slate-300">Leadership measured by community trust, access, and delivery.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-6xl px-6 py-18 lg:px-10 lg:py-24">
                    <div className="reveal-on-scroll reveal-up mx-auto max-w-3xl text-center" data-reveal="true">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#5dade2]">
                        Educational Journey
                        </p>
                        <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                        A steady path of growth and discipline.
                        </h2>
                        <p className="mt-5 text-base leading-8 text-slate-300">
                        Each stage reflects intentional progress — academically and personally.
                        </p>
                    </div>

                    <div className="relative mt-16">
                        
                        {/* Vertical Line */}
                        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-white/10 md:left-1/2 md:-translate-x-1/2" />

                        <div className="space-y-12">
                        {educationTimeline.map((item, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                            <div
                                key={item.year}
                                data-reveal="true"
                                data-delay={index * 100}
                                className={`reveal-on-scroll ${
                                isLeft ? "reveal-left" : "reveal-right"
                                } relative flex flex-col md:flex-row md:items-center`}
                            >
                                {/* LEFT SIDE */}
                                <div
                                className={`md:w-1/2 ${
                                    isLeft ? "md:pr-10 md:text-right" : "md:order-2 md:pl-10"
                                }`}
                                >
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/20 hover:-translate-y-1">
                                    
                                    <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
                                    {item.year}
                                    </p>

                                    <h3 className="mt-3 text-lg font-semibold text-white">
                                    {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-300">
                                    {item.detail}
                                    </p>
                                </div>
                                </div>

                                {/* CENTER DOT */}
                                <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-[#2f9e44] ring-4 ring-[#030712] md:left-1/2" />

                                {/* RIGHT SIDE (empty for spacing) */}
                                <div className="hidden md:block md:w-1/2" />
                            </div>
                            );
                        })}
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-6 py-18 lg:px-10 lg:py-24">
                    <div className="reveal-on-scroll reveal-up mx-auto max-w-3xl text-center" data-reveal="true">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#f59e0b]">Work Experience</p>
                        <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Professional depth across finance, administration, and enterprise.</h2>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {workExperience.map((job, index) => (
                            <article
                                key={job.title}
                                data-reveal="true"
                                data-delay={index * 80}
                                className="reveal-on-scroll reveal-up rounded-4xl border border-white/10 bg-[#09101c]/88 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/18"
                            >
                                <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-slate-300">{job.desc}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-6 lg:px-10 lg:pb-30 lg:pt-10">
                    <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="reveal-on-scroll reveal-left relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl" data-reveal="true">
                            <div className="relative h-105 overflow-hidden rounded-[1.6rem] sm:h-130">
                                <Image
                                    src="/adebisi_2.jpeg"
                                    alt="Campaign event"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/28 to-transparent" />
                            </div>
                        </div>

                        <div className="reveal-on-scroll reveal-right rounded-4xl border border-white/10 bg-[#07111f]/84 p-8 backdrop-blur-xl sm:p-10" data-reveal="true" data-delay="120">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#2f9e44]">Political Vision</p>
                            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
                                Leadership that turns proximity to the people into practical representation.
                            </h2>

                            <p className="mt-6 text-base leading-8 text-slate-300">
                                As a committed APC member, Adebisi Oroye has remained active in grassroots
                                mobilization and party-strengthening efforts across communities. The vision is
                                built around access, responsiveness, and delivery that people can measure.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {leadershipPillars.map((pillar, index) => (
                                    <div
                                        key={pillar}
                                        data-reveal="true"
                                        data-delay={160 + index * 80}
                                        className="reveal-on-scroll reveal-up rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-200"
                                    >
                                        {pillar}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
  );
}