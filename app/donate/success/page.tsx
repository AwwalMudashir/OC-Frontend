"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  LoaderCircle,
  ReceiptText,
  RotateCcw,
  ShieldCheck,
  UserRound,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import apiFetch from "../../api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useScrollReveal from "../../components/useScrollReveal";

type VerifyState = "verifying" | "success" | "failed" | "missing-reference";

type VerifyDonationData = string;

type StateConfig = {
  badgeLabel: string;
  badgeClassName: string;
  iconClassName: string;
  icon: LucideIcon;
  panelGlow: string;
  panelBorder: string;
  panelBackground: string;
};

const stateConfig: Record<VerifyState, StateConfig> = {
  success: {
    badgeLabel: "Donation Confirmed",
    badgeClassName: "border border-emerald-400/35 bg-emerald-400/15 text-emerald-200",
    iconClassName: "text-emerald-300",
    icon: CheckCircle2,
    panelGlow: "rgba(16, 185, 129, 0.22)",
    panelBorder: "rgba(52, 211, 153, 0.24)",
    panelBackground: "linear-gradient(180deg, rgba(7, 18, 17, 0.96), rgba(10, 32, 27, 0.92))",
  },
  failed: {
    badgeLabel: "Verification Failed",
    badgeClassName: "border border-rose-400/35 bg-rose-400/15 text-rose-200",
    iconClassName: "text-rose-300",
    icon: XCircle,
    panelGlow: "rgba(244, 63, 94, 0.22)",
    panelBorder: "rgba(251, 113, 133, 0.22)",
    panelBackground: "linear-gradient(180deg, rgba(24, 10, 15, 0.96), rgba(41, 13, 21, 0.92))",
  },
  "missing-reference": {
    badgeLabel: "Reference Missing",
    badgeClassName: "border border-amber-300/35 bg-amber-300/15 text-amber-100",
    iconClassName: "text-amber-200",
    icon: AlertTriangle,
    panelGlow: "rgba(245, 158, 11, 0.18)",
    panelBorder: "rgba(252, 211, 77, 0.22)",
    panelBackground: "linear-gradient(180deg, rgba(25, 18, 8, 0.96), rgba(43, 29, 10, 0.92))",
  },
  verifying: {
    badgeLabel: "Verifying Payment",
    badgeClassName: "border border-sky-300/35 bg-sky-300/15 text-sky-100",
    iconClassName: "animate-spin text-sky-200",
    icon: LoaderCircle,
    panelGlow: "rgba(56, 189, 248, 0.22)",
    panelBorder: "rgba(125, 211, 252, 0.22)",
    panelBackground: "linear-gradient(180deg, rgba(7, 17, 31, 0.96), rgba(11, 27, 48, 0.92))",
  },
};

function StatusBadge({ state }: { state: VerifyState }) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${config.badgeClassName}`}>
      <Icon className={`h-4 w-4 ${config.iconClassName}`} />
      {config.badgeLabel}
    </div>
  );
}

export default function DonationSuccessPage() {
  useScrollReveal();

  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [donorName, setDonorName] = useState<string | null>(null);

  const [state, setState] = useState<VerifyState>(reference ? "verifying" : "missing-reference");
  const [message, setMessage] = useState<string>(
    reference
      ? "We are confirming your payment with the campaign payment gateway."
      : "We could not find a payment reference in the return URL."
  );
  const [verifiedData, setVerifiedData] = useState<VerifyDonationData | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedName = window.sessionStorage.getItem("donation_donor_name");
    setDonorName(storedName && storedName.trim() ? storedName.trim() : null);
  }, []);

  useEffect(() => {
    if (!reference) {
      setState("missing-reference");
      setMessage("We could not find a payment reference in the return URL.");
      return;
    }

    const paymentReference = reference;

    let ignore = false;

    async function verifyDonation() {
      setState("verifying");
      setMessage("We are confirming your payment with the campaign payment gateway.");

      const query = new URLSearchParams({ reference: paymentReference });
      if (donorName) {
        query.set("name", donorName);
      }

      const response = await apiFetch<VerifyDonationData>(`/api/verify-donation?${query.toString()}`, {
        method: "POST",
      });

      if (ignore) {
        return;
      }

      if (response.statusCode === 200) {
        setState("success");
        setVerifiedData(response.data ?? null);
        setMessage(response.message || "Payment verified and saved.");
		if (typeof window !== "undefined") {
		  window.sessionStorage.removeItem("donation_donor_name");
		}
        return;
      }

      setState("failed");
      setVerifiedData(null);
      setMessage(response.message || "Payment verification failed.");
    }

    verifyDonation();

    return () => {
      ignore = true;
    };
  }, [donorName, reference]);

  const heading =
    state === "success"
      ? "Your support has been confirmed."
      : state === "failed"
        ? "We could not confirm this payment."
        : state === "missing-reference"
          ? "We need a payment reference to continue."
          : "Verifying your donation now.";

  const contextCopy =
    state === "success"
      ? "Your contribution helps the campaign reach more communities, strengthen outreach, and keep the movement organized around real delivery."
      : state === "failed"
        ? "This usually means the payment was not completed or the verification request could not confirm it. If you were charged, keep the reference and contact the campaign team."
        : state === "missing-reference"
          ? "This screen is meant to open after Paystack returns you with a payment reference. Without that reference, the campaign cannot confirm the transaction."
          : "Please hold for a moment while we validate the transaction record returned from Paystack.";

  const config = stateConfig[state];
  const HeroIcon = config.icon;

  return (
    <div className="min-h-screen bg-[#060816] text-white">
      <Navbar />

      <main className="relative overflow-hidden px-6 pb-20 pt-32 lg:px-10">
        <div
          className="pointer-events-none absolute -left-16 top-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: config.panelGlow }}
        />
        <div
          className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(59, 130, 246, 0.16)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section
            className="reveal-on-scroll reveal-left rounded-4xl border p-8 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10"
            data-reveal="true"
            style={{
              background: config.panelBackground,
              borderColor: config.panelBorder,
            }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <StatusBadge state={state} />

                <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  {heading}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {contextCopy}
                </p>
              </div>

              <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/6">
                <HeroIcon className={`h-9 w-9 ${config.iconClassName}`} />
              </div>
            </div>

            <div className="reveal-on-scroll reveal-up mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" data-reveal="true" data-delay="120">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-black/10 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Verification Status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {message}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/10 p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <UserRound className="h-4 w-4" />
                    Donor Name
                  </p>
                  <p className="mt-2 text-sm text-slate-100 sm:text-base">
                    {donorName ?? "Unavailable"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/10 p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <ReceiptText className="h-4 w-4" />
                    Payment Reference
                  </p>
                  <p className="mt-2 break-all text-sm text-slate-100 sm:text-base">
                    {reference ?? "Unavailable"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/10 p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <ShieldCheck className="h-4 w-4" />
                    Gateway Check
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {state === "success"
                      ? "Your donation has been verified against the payment provider and marked as complete."
                      : state === "failed"
                        ? "The campaign could not confirm a completed payment from the provider for this reference."
                        : state === "missing-reference"
                          ? "A verification request was not sent because no reference was available."
                          : "We are waiting for the verification response from the backend endpoint."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/10 p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    <BadgeCheck className="h-4 w-4" />
                    Backend Result
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {verifiedData ?? "No extra verification payload returned."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "#e11d48",
                  color: "#ffffff",
                  boxShadow: "0 18px 40px rgba(225, 29, 72, 0.32)",
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back Home
              </Link>

              {state === "failed" && (
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{
                    borderColor: "rgba(255,255,255,0.14)",
                    color: "#ffffff",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Donation Again
                </Link>
              )}
            </div>
          </section>

          <aside className="grid gap-6">
            <div
              className="reveal-on-scroll reveal-right rounded-4xl border p-7"
              data-reveal="true"
              data-delay="120"
              style={{
                background: "linear-gradient(180deg, rgba(10, 18, 34, 0.96), rgba(16, 28, 48, 0.92))",
                borderColor: "rgba(125, 211, 252, 0.16)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              }}
            >
              <h2 className="text-xl font-semibold text-white">
                What happens next
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
                <p>
                  Verified donations strengthen field coordination, volunteer mobilization, and communication with voters across communities.
                </p>
                <p>
                  If your payment failed verification, keep the reference above. It is the fastest way to investigate any issue with the campaign team or payment provider.
                </p>
                <p>
                  This screen depends on the backend verify endpoint and is designed to reflect its state directly: success means the donation was saved, failure means it was not confirmed.
                </p>
              </div>
            </div>

            <div
              className="reveal-on-scroll reveal-right rounded-4xl border p-7"
              data-reveal="true"
              data-delay="220"
              style={{
                background: "linear-gradient(160deg, rgba(17, 24, 39, 0.98), rgba(10, 49, 77, 0.95) 56%, rgba(9, 84, 64, 0.9))",
                borderColor: "rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.28)",
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300/80">
                Campaign Context
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                Every confirmed contribution backs visible campaign work.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-200/85">
                From voter outreach to community presence and policy communication, this contribution flow is meant to close the loop cleanly so supporters know whether their payment truly landed.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}