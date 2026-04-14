"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, CalendarRange, CircleDollarSign, GraduationCap, LayoutDashboard, Plus, Users, Wallet } from "lucide-react";
import AdminEducationTimelineManager from "./AdminEducationTimelineManager";
import AdminEventManager from "./AdminEventManager";
import AdminJobTimelineManager from "./AdminJobTimelineManager";
import AdminAdminsManager from "./AdminAdminsManager";
import apiFetch from "../api";
import type { DonationItem } from "../types/education";

type AdminDashboardShellProps = {
  email?: string;
  userId?: string;
  onLogout: () => Promise<void>;
};

export default function AdminDashboardShell({
  email,
  userId,
  onLogout,
}: AdminDashboardShellProps) {
  const [active, setActive] = useState("dashboard");
  const [totalDonations, setTotalDonations] = useState<number | null>(null);
  const [recentDonations, setRecentDonations] = useState<DonationItem[]>([]);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);
  const [donationError, setDonationError] = useState("");

  useEffect(() => {
    let activeRequest = true;

    async function loadDashboardData() {
      setIsLoadingDonations(true);
      setDonationError("");

      const [totalResponse, recentResponse] = await Promise.all([
        apiFetch<number>("/api/admin/donations/total"),
        apiFetch<DonationItem[]>("/api/admin/donations/recent"),
      ]);

      if (!activeRequest) {
        return;
      }

      if (totalResponse.statusCode >= 400 || typeof totalResponse.data !== "number") {
        setTotalDonations(null);
        setDonationError(totalResponse.message || "Unable to load donation totals.");
      } else {
        setTotalDonations(totalResponse.data);
      }

      if (recentResponse.statusCode >= 400 || !Array.isArray(recentResponse.data)) {
        setRecentDonations([]);
        setDonationError((current) => current || recentResponse.message || "Unable to load recent donations.");
      } else {
        setRecentDonations(recentResponse.data);
      }

      setIsLoadingDonations(false);
    }

    void loadDashboardData();

    return () => {
      activeRequest = false;
    };
  }, []);

  const formatNaira = (amount?: number | null) => {
    if (typeof amount !== "number") {
      return "Unavailable";
    }

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (value?: string) => {
    if (!value) {
      return "Date unavailable";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(parsed);
  };

  const navigationItems = [
    { name: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { name: "Education", key: "education", icon: GraduationCap },
    { name: "Jobs", key: "jobs", icon: BriefcaseBusiness },
    { name: "Events", key: "events", icon: CalendarRange },
    { name: "Admins", key: "admins", icon: Users },
  ];

  const renderContent = () => {
    switch (active) {
      case "education":
        return <AdminEducationTimelineManager />;
      case "jobs":
        return <AdminJobTimelineManager />;
      case "events":
        return <AdminEventManager />;
      case "admins":
        return <AdminAdminsManager />;
      default:
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-emerald-300/18 bg-[linear-gradient(180deg,rgba(8,29,25,0.96),rgba(5,18,17,0.92))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Status</p>
                <p className="mt-3 text-lg font-semibold text-[#86efac]">Active</p>
              </div>
              <div className="rounded-3xl border border-amber-300/18 bg-[linear-gradient(180deg,rgba(41,27,8,0.96),rgba(24,16,5,0.92))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/14 text-[#f59e0b]">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current Total Donations</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {isLoadingDonations ? "Loading..." : formatNaira(totalDonations)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.97),rgba(13,20,36,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
                <p className="text-xs uppercase tracking-[0.24em] text-[#5dade2]">Admin Quick Actions</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Publish updates from one workspace.</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {navigationItems
                    .filter((item) => item.key !== "dashboard")
                    .map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setActive(item.key)}
                          className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:-translate-y-1 hover:border-white/18 hover:bg-white/8"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">Open manager</p>
                          </div>
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-[#5dade2]">
                            <Plus className="h-5 w-5" />
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="flex h-136 flex-col rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#f59e0b]">Recent Donations</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Latest 5 successful contributions.</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/12 text-[#f59e0b]">
                    <CircleDollarSign className="h-6 w-6" />
                  </div>
                </div>

                {isLoadingDonations ? (
                  <div className="mt-8 flex flex-1 overflow-hidden">
                    <p className="text-sm leading-7 text-slate-300">Loading donation activity...</p>
                  </div>
                ) : donationError ? (
                  <div className="mt-8 flex flex-1 overflow-hidden">
                    <p className="rounded-3xl border border-rose-300/18 bg-rose-300/8 p-4 text-sm leading-7 text-rose-100">
                      {donationError}
                    </p>
                  </div>
                ) : recentDonations.length === 0 ? (
                  <div className="mt-8 flex flex-1 overflow-hidden">
                    <p className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                      No recent donations are available yet.
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 flex-1 overflow-hidden">
                    <div className="h-full space-y-4 overflow-y-auto pr-2">
                      {recentDonations.map((donation, index) => {
                        const donor =
                          donation.fullName || donation.donorName || donation.name || donation.email || "Anonymous donor";

                        return (
                          <div
                            key={donation.id ?? donation.reference ?? `${donor}-${index}`}
                            className="flex items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:border-white/18 hover:bg-white/7"
                          >
                            <div>
                              <p className="text-base font-semibold text-white">{donor}</p>
                              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                                {formatDate(donation.createdAt)}
                              </p>
                              {donation.reference ? (
                                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#5dade2]">
                                  Ref: {donation.reference}
                                </p>
                              ) : null}
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-semibold text-[#f8d46b]">{formatNaira(donation.amount)}</p>
                              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#86efac]">
                                {donation.status ?? "SUCCESS"}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex min-h-screen bg-[#030712] text-white">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[linear-gradient(180deg,#020617,#07111f)] p-6 md:flex">
        <h2 className="mb-3 text-xl font-semibold">Admin</h2>
        <p className="mb-10 text-sm leading-7 text-slate-400">Manage campaign updates, timelines, events, and donation visibility.</p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(item.key)}
              className={`mb-2 flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                active === item.key
                  ? "border-[#5dade2]/30 bg-[#5dade2]/10 text-white"
                  : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8 text-[#5dade2]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.name}</span>
              </span>
              {item.key !== "dashboard" ? <Plus className="h-4 w-4 text-slate-400" /> : null}
            </button>
          );
        })}

        <form action={onLogout} className="mt-auto">
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-[#d9485f] py-3 transition hover:opacity-90"
          >
            Logout
          </button>
        </form>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#020617]/80 px-6 backdrop-blur-md">
          <h1 className="text-lg font-semibold capitalize">{active}</h1>

          <div className="text-sm text-slate-400">{email ?? "Unknown user"}</div>
        </header>

        <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">{renderContent()}</div>
      </div>
    </main>
  );
}