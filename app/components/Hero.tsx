"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "/adebisi_1.png",
  "/adebisi_2.jpeg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#0f172a]">
      {images.map((img, imageIndex) => (
        <Image
          key={img}
          src={img}
          alt="Candidate"
          fill
          priority={imageIndex === 0}
          className={`object-cover object-center transition-opacity duration-1000 ${
            imageIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/85 via-black/70 to-black/25" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle at 78% 22%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 34%), radial-gradient(circle at 68% 72%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent 36%)",
        }}
      />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 pt-28 pb-16 lg:px-12">
        <div className="w-full max-w-4xl animate-slide-in-right text-center text-white">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
            style={{
              background: "color-mix(in srgb, white 12%, transparent)",
              color: "#f8fafc",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "var(--color-accent)" }}
            />
            2027 Campaign
          </div>

          <h1
            className="mt-6 text-3xl font-bold leading-tight tracking-wide sm:text-4xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            HON. ADEBISI MUHAMMED OROYE
            </h1>
            {/* <br /> */}
            <span className="text-xl font-normal italic sm:text-2xl lg:text-3xl">
              for a seat in
            </span>
            <h1
              className="mt-3 text-xl font-bold leading-tight tracking-wide sm:text-2xl lg:text-3xl"
            style={{ fontFamily: "var(--font-heading)" }}
            >
            {/* <br /> */}
            KWARA STATE HOUSE OF ASSEMBLY
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-200 sm:text-base lg:text-lg">
            A practical agenda focused on youth empowerment, education, and
            community-driven development. Leadership rooted in service,
            accountability, and visible impact across Kwara State.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-sm px-8 py-3 text-sm font-semibold tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-cta)",
                boxShadow: "0 18px 36px color-mix(in srgb, var(--color-cta) 30%, transparent)",
              }}
            >
              DONATE NOW
            </Link>

            <Link
              href="/manifesto"
              className="inline-flex items-center justify-center rounded-sm border px-8 py-3 text-sm font-semibold tracking-[0.18em] transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "rgba(255,255,255,0.24)",
                background: "color-mix(in srgb, white 10%, transparent)",
                color: "#ffffff",
              }}
            >
              VIEW MANIFESTO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}