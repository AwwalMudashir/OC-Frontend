"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const images = ["/oroye_vert_1.jpg", "/oroye_vert_2.jpg"];

export default function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-16 lg:px-10">
      <div
        className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, var(--color-accent) 18%, transparent)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-12 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, var(--color-primary) 18%, transparent)" }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="animate-slide-in-left order-2 text-left lg:order-1">
          <div className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
            About The Candidate
          </div>

          <h2
            className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ color: "var(--color-foreground)" }}
          >
            A grounded leader shaped by community, enterprise, and public service.
          </h2>

          <p
            className="mt-6 max-w-2xl text-base leading-8 sm:text-lg"
            style={{ color: "var(--neutral-500)" }}
          >
            Adebisi Muhammed Oroye brings a practical mix of education, professional
            exposure, and grassroots connection. The campaign is built around real
            development priorities: stronger schools, safer communities, better local
            opportunity, and representation that stays accountable to the people.
          </p>

          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: "var(--color-cta)",
                color: "#ffffff",
                boxShadow: "0 14px 32px color-mix(in srgb, var(--color-cta) 30%, transparent)",
              }}
            >
              Read More
            </Link>
          </div>
        </div>

        <div className="animate-slide-in-right order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative aspect-square w-70 sm:w-85 lg:w-105">
            <div
              className="absolute inset-0 rounded-3xl border"
              style={{
                background: "linear-gradient(180deg, color-mix(in srgb, var(--color-background) 92%, var(--neutral-100)), color-mix(in srgb, var(--color-accent) 10%, var(--neutral-100)))",
                borderColor: "var(--neutral-200)",
                boxShadow: "var(--shadow-soft)",
              }}
            />

            {images.map((img, imageIndex) => (
              <Image
                key={img}
                src={img}
                alt="Candidate"
                fill
                priority={imageIndex === 0}
                className={`rounded-3xl object-cover transition-opacity duration-700 ${
                  imageIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
