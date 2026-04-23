"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Users } from "lucide-react";
import { useToast } from "./ToastProvider";
import apiFetch from "../api";

type AdminUser = {
  id?: string | number;
  email?: string;
  username?: string;
  doneBy?: string;
  createdAt?: string;
};

export default function AdminAdminsManager() {
  const toast = useToast();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    void loadAdmins();
  }, []);

  async function loadAdmins() {
    setIsLoadingAdmins(true);
    setLoadError("");

    const response = await apiFetch<AdminUser[]>("/api/admin/all-admins");

    if (response.statusCode >= 400 || !Array.isArray(response.data)) {
      setAdmins([]);
      setLoadError(response.message || "Unable to load admin users.");
    } else {
      setAdmins(response.data);
    }

    setIsLoadingAdmins(false);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.97),rgba(13,20,36,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-300/12 text-sky-200">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Admins</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Manage administrator access</h2>
            </div>
          </div>

          <p className="mt-6 text-sm leading-7 text-slate-300">
            View all admin users. New administrator creation has been disabled in this panel for security reasons. Administrators cannot be deleted from this dashboard.
          </p>
        </section>

        <section className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,19,40,0.97),rgba(12,16,44,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Admin list</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">All administrators</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

          {isLoadingAdmins ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
              Loading administrator accounts...
            </div>
          ) : loadError ? (
            <div className="mt-8 rounded-3xl border border-rose-300/18 bg-rose-300/8 p-6 text-rose-100">
              {loadError}
            </div>
          ) : admins.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
              No admins have been registered yet.
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {admins.map((admin) => (
                <div key={admin.id ?? admin.email} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{admin.username || admin.email}</p>
                      <p className="mt-1 text-sm text-slate-400">{admin.email}</p>
                    </div>
                    <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                      Admin
                    </span>
                  </div>
                  {admin.doneBy ? (
                    <p className="mt-3 text-sm text-slate-500">Created by: {admin.doneBy}</p>
                  ) : null}
                  {admin.createdAt ? (
                    <p className="mt-1 text-sm text-slate-500">Joined: {new Date(admin.createdAt).toLocaleDateString()}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
