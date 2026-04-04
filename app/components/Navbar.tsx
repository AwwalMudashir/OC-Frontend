"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

const navBg = scrolled
  ? "rgba(10, 10, 10, 0.75)"
  : "transparent";
  
  const navBorder = scrolled
    ? "1px solid color-mix(in srgb, var(--neutral-200) 88%, transparent)"
    : "1px solid transparent";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: navBg,
        // borderBottom: navBorder,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxShadow: scrolled
          ? "0 8px 30px rgba(15, 23, 42, 0.06)"
          : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full"
            
          >
            <img src="/apc_logo.png" alt="Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <span
            className="font-semibold text-lg tracking-wide text-white"
            
          >
            Oroye Campaign
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          {[
            { name: "About", href: "/about" },
            { name: "Manifesto", href: "/manifesto" },
            { name: "Events", href: "/events" },
            // { name: "Volunteer", href: "/volunteer" },
            { name: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group text-sm font-medium"
              style={{ color: "var(--color-foreground)" }}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-(--color-primary) transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* CTA BUTTON */}
          <Link
            href="/donate"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--color-cta)",
              color: "white",
              boxShadow: "0 6px 20px rgba(217,72,95,0.3)",
            }}
          >
            Donate
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="cursor-pointer md:hidden rounded-2xl border border-white/10 bg-white/8 p-2 text-white transition-all duration-300 hover:bg-white/14"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          type="button"
        >
          {open ? <X className="h-6 w-6 cursor-pointer" /> : <Menu className="h-6 w-6 cursor-pointer" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="px-6 pb-6 md:hidden">
          <div className="mx-auto max-w-7xl rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,14,27,0.96),rgba(13,24,43,0.94))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between rounded-3xl border border-white/8 bg-white/5 px-4 py-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Navigation
                </p>
                <p className="mt-1 text-sm text-slate-200">
                  Explore the campaign and key action pages.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Menu
              </div>
            </div>

            <div className="grid gap-3">
              {[
                { name: "About", href: "/about" },
                { name: "Manifesto", href: "/manifesto" },
                { name: "Events", href: "/events" },
                // { name: "Volunteer", href: "/volunteer" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-3xl border border-white/8 bg-white/4 px-4 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/8"
                >
                  <div>
                    <p className="text-base text-white">{link.name}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                      Open page
                    </p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/6 text-slate-200 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-rose-300/12 bg-rose-400/8 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-100/80">
                Support The Movement
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                Back the campaign with a contribution and help expand outreach across communities.
              </p>

              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--color-cta)",
                  boxShadow: "0 14px 32px rgba(217,72,95,0.28)",
                }}
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}