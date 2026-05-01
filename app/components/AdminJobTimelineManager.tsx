"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Pencil, Plus, Trash2, X } from "lucide-react";
import apiFetch from "../api";
import { useToast } from "./ToastProvider";
import type { JobTimelineItem, JobTimelineRequest } from "../types/education";

const initialFormState: JobTimelineRequest = {
  title: "",
  desc: "",
};

const deleteJobEndpoint = (id: number) => `/api/admin/delete-job/${id}`;

export default function AdminJobTimelineManager() {
  const toast = useToast();
  const [form, setForm] = useState(initialFormState);
  const [history, setHistory] = useState<JobTimelineItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [historyError, setHistoryError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function loadHistory() {
    setIsLoadingHistory(true);
    setHistoryError("");

    const response = await apiFetch<JobTimelineItem[]>("/api/job-history");

    if (response.statusCode >= 400 || !Array.isArray(response.data)) {
      setHistory([]);
      setHistoryError(response.message || "Unable to load job history.");
      setIsLoadingHistory(false);
      return;
    }

    setHistory(response.data);
    setIsLoadingHistory(false);
  }

  async function handleEdit(item: JobTimelineItem) {
    if (typeof item.id !== "number") {
      toast.error({ title: "Unable to edit", message: "This job entry does not have a valid ID." });
      return;
    }

    const response = await apiFetch<JobTimelineItem>(`/api/admin/job/${item.id}`);

    if (response.statusCode >= 400 || !response.data) {
      toast.error({
        title: "Unable to load job",
        message: response.message || "The job entry could not be loaded for editing.",
      });
      return;
    }

    setForm({ title: response.data.title, desc: response.data.desc });
    setEditingId(item.id);
    setIsModalOpen(true);
  }

  useEffect(() => {
    void loadHistory();
  }, []);

  function updateField(key: keyof JobTimelineRequest, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim() || !form.desc.trim()) {
      toast.error({ title: "Incomplete", message: "Fill all fields" });
      return;
    }

    setIsSubmitting(true);

    const isEditing = editingId !== null;
    const endpoint = isEditing ? `/api/admin/job/${editingId}` : "/api/admin/add-job";
    const method = isEditing ? "PUT" : "POST";

    const res = await apiFetch(endpoint, {
      method,
      body: form,
    });

    if (res.statusCode >= 400) {
      toast.error({ title: "Error", message: res.message });
      setIsSubmitting(false);
      return;
    }

    setForm(initialFormState);
    setEditingId(null);
    setIsModalOpen(false);
    toast.success({ title: isEditing ? "Updated" : "Added", message: isEditing ? "Job updated successfully" : "Job added successfully" });
    setIsSubmitting(false);
    loadHistory();
  }

  async function handleDelete(item: JobTimelineItem) {
    if (!item.id) return;

    setDeletingId(item.id);

    await apiFetch(deleteJobEndpoint(item.id), { method: "DELETE" });

    setHistory((prev) => prev.filter((i) => i.id !== item.id));
    setDeletingId(null);
  }

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between gap-4 rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(13,20,36,0.94),rgba(9,14,28,0.97))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2f9e44]/14 text-[#2f9e44]">
            <BriefcaseBusiness className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Job Manager</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Job Timeline</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setForm(initialFormState);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-3 rounded-full bg-[#2f9e44] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_rgba(47,158,68,0.26)] transition hover:-translate-y-1"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </button>
      </div>

      <div className="rounded-4xl border border-white/10 bg-[#09101c]/88 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">Published History</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Current work experience records</h3>
          </div>
          <button
            type="button"
            onClick={() => void loadHistory()}
            className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-1 hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        {isLoadingHistory ? (
          <p className="text-sm leading-7 text-slate-300">Loading job history...</p>
        ) : historyError ? (
          <p className="rounded-3xl border border-rose-300/18 bg-rose-300/8 p-4 text-sm leading-7 text-rose-100">{historyError}</p>
        ) : history.length === 0 ? (
          <p className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">No job history is available yet.</p>
        ) : (
          <div className="max-h-130 space-y-4 overflow-y-auto pr-1">
            {history.map((item) => (
              <article key={item.id ?? `${item.title}-${item.desc}`} className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-5 transition hover:border-white/16 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
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
                <p className="text-xs uppercase tracking-[0.24em] text-[#2f9e44]">{editingId !== null ? "Edit Job" : "Add Job"}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {editingId !== null ? "Update job entry" : "Create a new job entry"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                }}
                className="rounded-full border border-white/10 bg-white/6 p-2 text-white transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
              />

              <textarea
                placeholder="Description"
                value={form.desc}
                onChange={(e) => updateField("desc", e.target.value)}
                className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/20 focus:outline-none"
              />
            </div>

            <button className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2f9e44] py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_rgba(47,158,68,0.26)] transition hover:-translate-y-1" disabled={isSubmitting}>
              {isSubmitting ? (editingId !== null ? "Updating..." : "Saving...") : editingId !== null ? "Update Job" : "Save"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}