"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const events = [
  {
    id: 1,
    title: "Community Outreach in Offa",
    date: "March 12, 2026",
    image: "/oroye_vert_5.jpg",
    excerpt:
      "Engaged with local residents on education and youth empowerment initiatives.",
  },
  {
    id: 2,
    title: "Youth Town Hall Meeting",
    date: "March 5, 2026",
    image: "/youth_empowerment.jpeg",
    excerpt:
      "Interactive session with young leaders discussing opportunities and innovation.",
  },
  {
    id: 3,
    title: "Healthcare Support Initiative",
    date: "February 20, 2026",
    image: "/oroye_vert_3.jpg",
    excerpt:
      "Distribution of medical support materials to underserved communities.",
  },
  {
    id: 4,
    title: "Education Support Program",
    date: "February 10, 2026",
    image: "/oroye_vert_2.jpg",
    excerpt:
      "Donation of learning materials to schools across the constituency.",
  },
];

export default function EventsPage() {
  return (
    <div className="bg-[#030712] text-white">
      <Navbar />

      <main className="relative overflow-hidden">

        {/* HERO */}
        <section className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">

          {/* Glow */}
          <div className="absolute inset-0 -z-10 opacity-40">
            <div className="absolute left-10 top-20 h-72 w-72 bg-[#2f9e44]/20 blur-3xl rounded-full" />
            <div className="absolute right-10 top-32 h-80 w-80 bg-[#5dade2]/20 blur-3xl rounded-full" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
            Campaign Activities
          </p>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Real engagement. Real impact.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-8">
            Follow the journey — from grassroots outreach to community-driven
            initiatives shaping the future of Kwara State.
          </p>
        </section>

        {/*  FEATURED EVENT */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="relative rounded-3xl overflow-hidden border border-white/10">

            <Image
              src="/oroye_vert_4.jpg"
              alt="Featured event"
              width={1400}
              height={600}
              className="w-full h-[320px] sm:h-[420px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />

            <div className="absolute bottom-0 p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
                Featured Event
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold">
                Constituency-wide engagement tour
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl">
                A series of visits across communities to connect directly with
                residents, understand concerns, and share the campaign vision.
              </p>

              <Link
                href="/events/featured"
                className="inline-block mt-5 text-sm font-semibold text-[#5dade2]"
              >
                Read more →
              </Link>
            </div>
          </div>
        </section>

        {/* EVENTS GRID */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group block rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-[#5dade2] uppercase tracking-[0.25em]">
                    {event.date}
                  </p>

                  <h3 className="mt-3 text-lg font-semibold group-hover:text-[#5dade2] transition">
                    {event.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-300 leading-7">
                    {event.excerpt}
                  </p>

                  <span className="inline-block mt-4 text-sm text-[#5dade2] font-medium">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}