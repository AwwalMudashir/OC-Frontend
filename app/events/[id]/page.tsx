"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarRange, Clapperboard, ImageIcon, MapPin } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import apiFetch from "../../api";
import type { EventItem } from "../../types/education";
import useScrollReveal from "../../components/useScrollReveal";
import { formatEventDate, getEventImages, getYouTubeEmbedUrl, hasEventVideo, normalizeEventItem, resolveEventImage } from "../utils";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default function EventDetailPage({ params }: EventDetailPageProps) {
  useScrollReveal();

  const { id } = use(params);
  const eventId = Number(id);

  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [eventError, setEventError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadEvent() {
      setIsLoadingEvent(true);
      setEventError("");

      const response = await apiFetch<EventItem[]>("/api/event-history");

      if (!active) {
        return;
      }

      if (response.statusCode >= 400 || !Array.isArray(response.data)) {
        setEvent(null);
        setEventError(response.message || "Unable to load event details right now.");
        setIsLoadingEvent(false);
        return;
      }

      const matchedEvent = response.data
        .map((item) => normalizeEventItem(item))
        .find((item) => item.id === eventId);

      if (!matchedEvent) {
        setEvent(null);
        setEventError("We could not find that event.");
        setIsLoadingEvent(false);
        return;
      }

      setEvent(matchedEvent);
      setSelectedImageIndex(0);
      setIsLoadingEvent(false);
    }

    if (!Number.isFinite(eventId)) {
      setEvent(null);
      setEventError("That event id is invalid.");
      setIsLoadingEvent(false);
      return;
    }

    void loadEvent();

    return () => {
      active = false;
    };
  }, [eventId]);

  const eventImages = useMemo(() => (event ? getEventImages(event) : []), [event]);
  const selectedImage = eventImages[selectedImageIndex] ?? eventImages[0] ?? "";
  const embedUrl = event ? getYouTubeEmbedUrl(event.videoLink) : null;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-6 pb-24 pt-32 lg:px-10">
        <div className="pointer-events-none absolute -left-20 top-16 h-80 w-80 rounded-full bg-[#5dade2]/14 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-44 h-96 w-96 rounded-full bg-[#2f9e44]/12 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/events"
            className="reveal-on-scroll reveal-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/8"
            data-reveal="true"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Events
          </Link>

          {isLoadingEvent ? (
            <div className="mt-8 rounded-4xl border border-white/10 bg-white/5 p-8 text-center text-sm leading-7 text-slate-300 backdrop-blur-xl">
              Loading event details...
            </div>
          ) : eventError ? (
            <div className="mt-8 rounded-4xl border border-rose-300/20 bg-rose-300/8 p-8 text-center text-sm leading-7 text-rose-100 backdrop-blur-xl">
              {eventError}
            </div>
          ) : event ? (
            <div className="mt-8 space-y-8">
              <section className="reveal-on-scroll reveal-up rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.97),rgba(13,20,36,0.94))] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl" data-reveal="true">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-4xl">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#5dade2]">Campaign Event</p>
                    <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{event.title}</h1>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2">
                        <CalendarRange className="h-4 w-4 text-[#5dade2]" />
                        {formatEventDate(event.eventDate)}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2">
                        <MapPin className="h-4 w-4 text-[#f59e0b]" />
                        {event.location}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2">
                        <ImageIcon className="h-4 w-4 text-[#86efac]" />
                        {eventImages.length} image{eventImages.length === 1 ? "" : "s"}
                      </span>
                      {hasEventVideo(event) ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-300/10 px-4 py-2 text-red-100">
                          <Clapperboard className="h-4 w-4" />
                          YouTube video available
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <p className="mt-8 max-w-5xl text-base leading-8 text-slate-300 sm:text-lg">
                  {event.description}
                </p>
              </section>

              <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="reveal-on-scroll reveal-left rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl" data-reveal="true">
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                    <img src={resolveEventImage(selectedImage)} alt={event.title} className="h-112 w-full object-cover sm:h-136" />
                  </div>

                  {eventImages.length > 1 ? (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {eventImages.map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => setSelectedImageIndex(index)}
                          className={`overflow-hidden rounded-2xl border transition ${selectedImageIndex === index ? "border-[#5dade2]" : "border-white/10 hover:border-white/20"}`}
                        >
                          <img src={resolveEventImage(image)} alt={`${event.title} ${index + 1}`} className="h-24 w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="space-y-8">
                  {embedUrl ? (
                    <section className="reveal-on-scroll reveal-right rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl" data-reveal="true" data-delay="120">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#f59e0b]">Event Video</p>
                      <h2 className="mt-4 text-2xl font-semibold text-white">Watch the moment</h2>
                      <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                        <iframe
                          src={embedUrl}
                          title={`${event.title} video`}
                          className="aspect-video w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                    </section>
                  ) : null}

                  <section className="reveal-on-scroll reveal-right rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]" data-reveal="true" data-delay="220">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">Event Snapshot</p>
                    <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                      <p>
                        This event page is driven from the backend event history and adapts to whichever media the event includes.
                      </p>
                      <p>
                        If an event includes a YouTube video, it appears here. If it includes multiple images, the gallery stays available alongside the video.
                      </p>
                      <p>
                        Events can carry up to ten images and one optional video link without changing the public route structure.
                      </p>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}