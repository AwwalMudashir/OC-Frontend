"use client";

import Link from "next/link";

const socialItems = [
  {
    label: "Facebook",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
      >
        <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6H16.8V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H7.8v3h2.6v8h3.1Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC-xPmV-0cU1dc8you8K3DBA",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    ),
  },
  {
    label: "X",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
      >
        <path d="M18.9 3H22l-6.8 7.8L23 21h-6.1l-4.8-6.2L6.7 21H3.6l7.2-8.2L1 3h6.2l4.3 5.7L18.9 3Zm-1.1 16h1.7L6.3 4.9H4.5L17.8 19Z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-none stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.1a2 2 0 0 1-.6 1.8L7.1 10.5a16 16 0 0 0 6.4 6.4l1.9-1.9a2 2 0 0 1 1.8-.6l3.1.5A2 2 0 0 1 22 16.9Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
		<div
			className="pointer-events-none absolute -bottom-20 -right-12 h-72 w-72 rounded-full blur-3xl"
			style={{ background: "color-mix(in srgb, var(--color-cta) 16%, transparent)" }}
		/>
      {/* TOP CTA */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">

        <h2 className="text-2xl sm:text-3xl font-semibold">
          Join the Movement
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Be part of the change. Support the campaign, volunteer, or
          contribute to building a better future for Kwara State.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/donate"
            className="px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "#d9485f",
              boxShadow: "0 10px 30px rgba(217,72,95,0.3)",
            }}
          >
            Donate Now
          </Link>

          <Link
            href="/volunteer"
            className="px-8 py-3 rounded-full border border-white/20 text-sm font-semibold uppercase tracking-wide hover:bg-white/10 transition-all duration-300"
          >
            Become a Volunteer
          </Link>

        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-lg font-semibold">
            Oroye Campaign
          </h3>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Building a future driven by integrity, opportunity, and
            people-centered leadership across Kwara State.
          </p>
        </div>

        {/* NAV */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
            Navigation
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/manifesto" className="hover:text-white">Manifesto</Link></li>
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/volunteer" className="hover:text-white">Volunteer</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>Email: oroye.campaign@gmail.com</li>
            <li>Phone: +234 803 419 3066</li>
            <li>Location: Kwara State, Nigeria</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
            Follow
          </h4>
          <div className="mt-4 flex gap-4">

            {socialItems.map((social) => (
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/30 hover:text-white"
                    aria-label={social.label}
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ) : (
                  <div
                    key={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition hover:border-white/30 hover:text-white"
                    aria-label={social.label}
                    title={social.label}
                  >
                    {social.icon}
                  </div>
                )
            ))}

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Oroye Campaign. All rights reserved.
      </div>

    </footer>
  );
}