"use client";

import { useEffect, useState } from "react";
import { CalendarRange, Clapperboard, ImageIcon, MapPin, Plus, Trash2, X } from "lucide-react";
import apiFetch from "../api";
import { extractYouTubeId, formatEventDate, getPrimaryEventImage, hasEventVideo, normalizeEventItem, resolveEventImage } from "../events/utils";
import { useToast } from "./ToastProvider";
import type { CreateEventRequest, EventItem } from "../types/education";

const initialFormState: CreateEventRequest = {
  title: "",
  description: "",
  location: "",
  eventDate: "",
  eventTime: "",
  images: [],
  videoLink: "",
};

const MAX_EVENT_DESCRIPTION_LENGTH = 10000;
const MAX_EVENT_IMAGES = 10;

const deleteEventEndpoint = (id: number) => `/api/admin/delete-event/${id}`;

function toEventDateTimeValue(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) {
    return "";
  }

  return `${dateValue}T${timeValue}:00`;
}

export default function AdminEventManager() {
  const toast = useToast();

  const [form, setForm] = useState<CreateEventRequest>(initialFormState);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [historyError, setHistoryError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setIsLoadingHistory(true);
    setHistoryError("");

    const res = await apiFetch<EventItem[]>("/api/event-history");

    if (res.statusCode >= 400 || !Array.isArray(res.data)) {
      setEvents([]);
      setHistoryError(res.message || "Unable to load event history.");
      setIsLoadingHistory(false);
      return;
    }

    setEvents(res.data.map((event) => normalizeEventItem(event)));
    setIsLoadingHistory(false);
  }

  function updateField<K extends keyof CreateEventRequest>(key: K, value: CreateEventRequest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim() || !form.location.trim() || !form.description.trim() || !form.eventDate || !form.eventTime || form.images.length === 0) {
      toast.error({
        title: "Incomplete event",
        message: "Fill in the title, description, location, date, start time, and at least one image before publishing.",
      });
      return;
    }

    if (form.description.trim().length > MAX_EVENT_DESCRIPTION_LENGTH) {
      toast.error({
        title: "Description too long",
        message: `Event descriptions cannot exceed ${MAX_EVENT_DESCRIPTION_LENGTH.toLocaleString()} characters.`,
      });
      return;
    }

    if (form.images.length > MAX_EVENT_IMAGES) {
      toast.error({
        title: "Too many images",
        message: `You can upload up to ${MAX_EVENT_IMAGES} images for a single event.`,
      });
      return;
    }

    if (form.videoLink.trim() && !extractYouTubeId(form.videoLink)) {
      toast.error({
        title: "Invalid video link",
        message: "Use a valid YouTube watch, share, embed, or shorts link.",
      });
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", form.title.trim());
    data.append("description", form.description.trim());
    data.append("location", form.location.trim());
    data.append("eventDate", toEventDateTimeValue(form.eventDate, form.eventTime));

    if (form.videoLink.trim()) {
      data.append("videoLink", form.videoLink.trim());
    }

    form.images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const res = await apiFetch<EventItem>("/api/admin/add-events", {
        method: "POST",
        body: data,
      });

      if (res.statusCode >= 400) {
        toast.error({
          title: "Unable to save event",
          message: res.message || "The event could not be saved.",
        });
        return;
      }

      if (!res.data) {
        toast.error({
          title: "Save failed",
          message: "The server did not return saved event data.",
        });
        return;
      }

      setForm(initialFormState);
      setIsModalOpen(false);
      setHistoryError("");
      toast.success({ title: "Event added", message: "The event history section has been updated." });
      void load();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(item: EventItem) {
    if (typeof item.id !== "number") {
      toast.error({
        title: "Delete unavailable",
        message: "This event has no id yet, so it cannot be deleted from the dashboard.",
      });
      return;
    }

    setDeletingId(item.id);

    const res = await apiFetch(deleteEventEndpoint(item.id), {
      method: "DELETE",
    });

    if (res.statusCode >= 400) {
      toast.error({
        title: "Unable to delete event",
        message: res.message || "The event could not be deleted.",
      });
      setDeletingId(null);
      return;
    }

    setEvents((current) => current.filter((entry) => entry.id !== item.id));
    toast.success({ title: "Event deleted", message: "The event was removed successfully." });
    setDeletingId(null);
  }

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between gap-4 rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,34,0.97),rgba(13,20,36,0.94))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f59e0b]/14 text-[#f59e0b]">
            <CalendarRange className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Event Manager</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Campaign Events</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-3 rounded-full bg-[#f59e0b] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#030712] shadow-[0_18px_40px_rgba(245,158,11,0.26)] transition hover:-translate-y-1"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="rounded-4xl border border-white/10 bg-[#09101c]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">Published History</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Current event records</h3>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-1 hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        {isLoadingHistory ? (
          <p className="text-sm leading-7 text-slate-300">Loading event history...</p>
        ) : historyError ? (
          <p className="rounded-3xl border border-rose-300/18 bg-rose-300/8 p-4 text-sm leading-7 text-rose-100">{historyError}</p>
        ) : events.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">No events are available yet.</p>
        ) : (
          <div className="max-h-130 space-y-4 overflow-y-auto pr-1">
            {events.map((event) => (
              <article key={event.id ?? `${event.title}-${event.eventDate}`} className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-5 transition hover:border-white/16 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    {getPrimaryEventImage(event) ? (
                      <img src={resolveEventImage(getPrimaryEventImage(event))} alt={event.title} className="h-full w-full object-cover" />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">{formatEventDate(event.eventDate)}</p>
                        <h3 className="mt-3 text-lg font-semibold text-white">{event.title}</h3>
                        <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#f59e0b]">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                            <ImageIcon className="h-3.5 w-3.5" />
                            {(event.imageUrls?.length ?? 0) || (event.imageUrl ? 1 : 0)} image{((event.imageUrls?.length ?? 0) || (event.imageUrl ? 1 : 0)) === 1 ? "" : "s"}
                          </span>
                          {hasEventVideo(event) ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-100">
                              <Clapperboard className="h-3.5 w-3.5" />
                              YouTube video
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleDelete(event)}
                        disabled={deletingId === event.id || typeof event.id !== "number"}
                        className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-100 transition hover:-translate-y-1 hover:bg-rose-300/16 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        {deletingId === event.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{event.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-6">
          <form onSubmit={handleSubmit} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-4xl border border-white/10 bg-[#0b1220] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.34)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#f59e0b]">Add Event</p>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Create a new campaign event</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-white/10 bg-white/6 p-2 text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3.5">
              <input placeholder="Title" value={form.title} onChange={(e) => updateField("title", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none" />
              <input placeholder="Location" value={form.location} onChange={(e) => updateField("location", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none" />
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="date" value={form.eventDate} onChange={(e) => updateField("eventDate", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-white/20 focus:outline-none" />
                <input type="time" value={form.eventTime} onChange={(e) => updateField("eventTime", e.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white focus:border-white/20 focus:outline-none" />
              </div>
              <div className="space-y-2">
                <textarea
                  placeholder="Description"
                  value={form.description}
                  maxLength={MAX_EVENT_DESCRIPTION_LENGTH}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="min-h-28 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
                />
                <p className="text-right text-xs uppercase tracking-[0.16em] text-slate-500">
                  {form.description.length.toLocaleString()} / {MAX_EVENT_DESCRIPTION_LENGTH.toLocaleString()} characters
                </p>
              </div>
              <input
                type="url"
                placeholder="YouTube video link (optional)"
                value={form.videoLink}
                onChange={(e) => updateField("videoLink", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
              />
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => updateField("images", Array.from(e.target.files ?? []).slice(0, MAX_EVENT_IMAGES))}
                  className="block w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#f59e0b] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.16em] file:text-[#030712]"
                />
                <p className="text-xs leading-6 text-slate-400">
                  Add between 1 and {MAX_EVENT_IMAGES} images. A YouTube link is optional.
                </p>
                {form.images.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {form.images.map((image) => (
                      <span key={`${image.name}-${image.lastModified}`} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                        {image.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <button className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#f59e0b] py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#030712] shadow-[0_18px_40px_rgba(245,158,11,0.26)] transition hover:-translate-y-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving Event..." : "Save Event"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}