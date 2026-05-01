"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Pencil, Plus, Trash2, X } from "lucide-react";
import apiFetch from "../api";
import { useToast } from "./ToastProvider";
import type { EducationTimelineItem, EducationTimelineRequest } from "../types/education";

const initialForm: EducationTimelineRequest = {
  title: "",
  qualification: "",
  startYear: "",
  endYear: "",
};

const deleteEducationEndpoint = (id: number) => `/api/admin/delete-education/${id}`;

export default function AdminEducationTimelineManager() {
  const toast = useToast();
  const [form, setForm] = useState(initialForm);
  const [history, setHistory] = useState<EducationTimelineItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [historyError, setHistoryError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setIsLoadingHistory(true);
    setHistoryError("");

    const res = await apiFetch<EducationTimelineItem[]>("/api/education-history");

    if (res.statusCode >= 400 || !Array.isArray(res.data)) {
      setHistory([]);
      setHistoryError(res.message || "Unable to load education history.");
      setIsLoadingHistory(false);
      return;
    }

    setHistory(res.data);
    setIsLoadingHistory(false);
  }

  async function handleEdit(item: EducationTimelineItem) {
    if (typeof item.id !== "number") {
      toast.error({
        title: "Unable to edit",
        message: "This education entry does not have a valid ID.",
      });
      return;
    }

    const res = await apiFetch<EducationTimelineItem>(`/api/admin/education/${item.id}`);
    if (res.statusCode >= 400 || !res.data) {
      toast.error({
        title: "Unable to load entry",
        message: res.message || "The education entry could not be loaded for editing.",
      });
      return;
    }

    setForm({
      title: res.data.title,
      qualification: res.data.qualification,
      startYear: res.data.period?.split("-")[0] ?? "",
      endYear: res.data.period?.split("-")[1] ?? "",
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  }

  function updateField<K extends keyof EducationTimelineRequest>(
    key: K,
    value: EducationTimelineRequest[K]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim() || !form.qualification.trim() || !form.startYear.trim() || !form.endYear.trim()) {
      toast.error({
        title: "Incomplete entry",
        message: "Fill in the title, qualification, start year, and end year.",
      });
      return;
    }

    setIsSubmitting(true);

    const isEditing = editingId !== null;
    const endpoint = isEditing ? `/api/admin/education/${editingId}` : "/api/admin/add-education";
    const method = isEditing ? "PUT" : "POST";

    const res = await apiFetch<EducationTimelineItem>(endpoint, {
      method,
      body: form,
    });

    if (res.statusCode >= 400 || !res.data) {
      toast.error({
        title: isEditing ? "Unable to update timeline" : "Unable to save timeline",
        message: res.message || "The education timeline entry could not be saved.",
      });
      setIsSubmitting(false);
      return;
    }

    setForm(initialForm);
    setEditingId(null);
    setIsModalOpen(false);
    setHistoryError("");
    toast.success({
      title: isEditing ? "Timeline updated" : "Timeline added",
      message: isEditing ? "The education timeline entry was updated." : "The education history section has been updated.",
    });
    setIsSubmitting(false);
    void load();
  }

  async function handleDelete(item: EducationTimelineItem) {
    if (typeof item.id !== "number") {
      toast.error({
        title: "Delete unavailable",
        message: "This education entry has no id yet, so it cannot be deleted from the dashboard.",
      });
      return;
    }

    setDeletingId(item.id);

    const res = await apiFetch(deleteEducationEndpoint(item.id), {
      method: "DELETE",
    });

    if (res.statusCode >= 400) {
      toast.error({
        title: "Unable to delete timeline",
        message: res.message || "The education timeline entry could not be deleted.",
      });
      setDeletingId(null);
      return;
    }

    setHistory((current) => current.filter((entry) => entry.id !== item.id));
    toast.success({
      title: "Timeline deleted",
      message: "The education timeline entry was removed successfully.",
    });
    setDeletingId(null);
  }

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between gap-4 rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.97),rgba(13,20,36,0.94))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5dade2]/14 text-[#5dade2]">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Education Manager</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Education Timeline</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setForm(initialForm);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-3 rounded-full bg-[#5dade2] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#04111f] shadow-[0_18px_40px_rgba(93,173,226,0.28)] transition hover:-translate-y-1"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </button>
      </div>

      <div className="rounded-4xl border border-white/10 bg-[#09101c]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#f59e0b]">Published History</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Current education records</h3>
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
          <p className="text-sm leading-7 text-slate-300">Loading education history...</p>
        ) : historyError ? (
          <p className="rounded-3xl border border-rose-300/18 bg-rose-300/8 p-4 text-sm leading-7 text-rose-100">{historyError}</p>
        ) : history.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">No education history is available yet.</p>
        ) : (
          <div className="max-h-130 space-y-4 overflow-y-auto pr-1">
            {history.map((item) => (
              <article
                key={item.id ?? `${item.title}-${item.period}-${item.qualification}`}
                className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-5 transition hover:border-white/16 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">{item.period}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#f8d46b]">{item.qualification}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => void handleEdit(item)}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100 transition hover:-translate-y-1 hover:bg-sky-300/16"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDelete(item)}
                      disabled={deletingId === item.id || typeof item.id !== "number"}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-100 transition hover:-translate-y-1 hover:bg-rose-300/16 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" />
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
          <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-4xl border border-white/10 bg-[#0b1220] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">{editingId !== null ? "Edit Education" : "Add Education"}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {editingId !== null ? "Update education entry" : "Create a new education entry"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full border border-white/10 bg-white/6 p-2 text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <input
                placeholder="School"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
              />
              <input
                placeholder="Qualification"
                value={form.qualification}
                onChange={(e) => updateField("qualification", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Start Year"
                  value={form.startYear}
                  onChange={(e) => updateField("startYear", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
                />
                <input
                  placeholder="End Year"
                  value={form.endYear}
                  onChange={(e) => updateField("endYear", e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>

            <button className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#5dade2] py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#04111f] shadow-[0_18px_40px_rgba(93,173,226,0.28)] transition hover:-translate-y-1 disabled:opacity-70" disabled={isSubmitting}>
              {isSubmitting ? (editingId !== null ? "Updating..." : "Saving...") : editingId !== null ? "Update Education" : "Save Education"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}