"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clapperboard, ImageIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiFetch from "../api";
import useScrollReveal from "../components/useScrollReveal";
import type { EventItem } from "../types/education";
import { formatEventDate, getPrimaryEventImage, getYouTubeEmbedUrl, hasEventVideo, normalizeEventItem, resolveEventImage } from "./utils";

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");

  useScrollReveal();

  useEffect(() => {
    let active = true;

    async function loadEvents() {
      setIsLoadingEvents(true);
      setEventsError("");

      const response = await apiFetch<EventItem[]>("/api/event-history");

      if (!active) {
        return;
      }

      if (response.statusCode >= 400 || !Array.isArray(response.data)) {
        setEvents([]);
        setEventsError(response.message || "Unable to load event history right now.");
        setIsLoadingEvents(false);
        return;
      }

      setEvents(response.data.map((event) => normalizeEventItem(event)));
      setIsLoadingEvents(false);
    }

    void loadEvents();

    return () => {
      active = false;
    };
  }, []);

  const featuredEvent = useMemo(() => events[0] ?? null, [events]);
  const gridEvents = useMemo(() => events.slice(1), [events]);

  return (
    <div className="bg-[#030712] text-white">
      <Navbar />

      <main className="relative overflow-hidden">

        {/* HERO */}
        <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-32 text-center">

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
            initiatives shaping the future of Essa Shawo Igbodun Constituency,
            Offa, Kwara State.
          </p>
        </section>

        {/*  FEATURED EVENT */}
        <section className="mx-auto max-w-7xl px-6 pb-20">
          {isLoadingEvents ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm leading-7 text-slate-300 backdrop-blur-xl">
              Loading featured event...
            </div>
          ) : eventsError ? (
            <div className="rounded-3xl border border-rose-300/20 bg-rose-300/8 p-8 text-center text-sm leading-7 text-rose-100 backdrop-blur-xl">
              {eventsError}
            </div>
          ) : featuredEvent ? (
            hasEventVideo(featuredEvent) ? (
              <Link href={featuredEvent.id ? `/events/${featuredEvent.id}` : "/events"} className="reveal-on-scroll reveal-up block rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/18" data-reveal="true">
                <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                    <iframe
                      src={getYouTubeEmbedUrl(featuredEvent.videoLink) ?? undefined}
                      title={featuredEvent.title}
                      className="aspect-video h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <div className="flex flex-col justify-between gap-5 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
                        Featured Event
                      </p>

                      <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                        {featuredEvent.title}
                      </h2>

                      <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#f59e0b]">
                        {formatEventDate(featuredEvent.eventDate)} · {featuredEvent.location}
                      </p>

                      <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
                        {featuredEvent.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-100">
                        <Clapperboard className="h-3.5 w-3.5" />
                        YouTube video
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                        <ImageIcon className="h-3.5 w-3.5" />
                        {featuredEvent.imageUrls?.length ?? (featuredEvent.imageUrl ? 1 : 0)} image{(featuredEvent.imageUrls?.length ?? (featuredEvent.imageUrl ? 1 : 0)) === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <Link href={featuredEvent.id ? `/events/${featuredEvent.id}` : "/events"} className="reveal-on-scroll reveal-up relative block overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-1 hover:border-white/18" data-reveal="true">
                <img
                  src={resolveEventImage(getPrimaryEventImage(featuredEvent))}
                  alt={featuredEvent.title}
                  className="h-80 w-full object-cover sm:h-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-[#030712]/40 to-transparent" />

                <div className="absolute bottom-0 p-6 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#5dade2]">
                    Featured Event
                  </p>

                  <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                    {featuredEvent.title}
                  </h2>

                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-[#f59e0b]">
                    {formatEventDate(featuredEvent.eventDate)} · {featuredEvent.location}
                  </p>

                  <p className="mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
                    {featuredEvent.description}
                  </p>
                </div>
              </Link>
            )
          ) : (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm leading-7 text-slate-300 backdrop-blur-xl">
              No featured event has been published yet.
            </div>
          )}
        </section>

        {/* EVENTS GRID */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          {isLoadingEvents ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm leading-7 text-slate-300 backdrop-blur-xl">
              Loading campaign events...
            </div>
          ) : eventsError ? null : gridEvents.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm leading-7 text-slate-300 backdrop-blur-xl">
              More event updates will appear here as they are published.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {gridEvents.map((event, index) => (
                <Link
                  key={event.id ?? `${event.title}-${event.eventDate}`}
                  href={event.id ? `/events/${event.id}` : "/events"}
                  data-reveal="true"
                  data-delay={index * 80}
                  className="reveal-on-scroll reveal-up group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={resolveEventImage(getPrimaryEventImage(event))}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
                        <ImageIcon className="h-3.5 w-3.5" />
                        {event.imageUrls?.length ?? (event.imageUrl ? 1 : 0)}
                      </span>
                      {hasEventVideo(event) ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-300/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                          <Clapperboard className="h-3.5 w-3.5" />
                          Video
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#5dade2]">
                      {formatEventDate(event.eventDate)}
                    </p>

                    <h3 className="mt-3 text-lg font-semibold transition group-hover:text-[#5dade2]">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-sm font-medium text-[#f59e0b]">
                      {event.location}
                    </p>

                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {event.description}
                    </p>

                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#5dade2]">
                      Open event details
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}