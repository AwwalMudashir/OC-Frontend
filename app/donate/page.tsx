"use client";

import { useState } from "react";
import { AlertTriangle, CircleAlert, ShieldCheck } from "lucide-react";
import apiFetch from "../api";
import Navbar from "../components/Navbar";
import useScrollReveal from "../components/useScrollReveal";

const presetAmounts = [1000, 5000, 10000, 20000];

type DonationInitData = {
  authorizationUrl?: string;
  received?: {
    name: string;
    email: string;
    amount: number;
  };
};

type StatusState = {
	tone: "error" | "info" | "success";
	title: string;
	message: string;
} | null;

const statusToneStyles = {
	error: {
		icon: AlertTriangle,
		wrapper: "border border-rose-300/25 bg-[linear-gradient(180deg,rgba(68,14,29,0.86),rgba(42,10,18,0.92))] text-rose-50 shadow-[0_20px_60px_rgba(120,18,46,0.28)]",
		iconWrap: "bg-rose-300/14 text-rose-200",
		label: "text-rose-200/80",
	},
	info: {
		icon: CircleAlert,
		wrapper: "border border-sky-300/25 bg-[linear-gradient(180deg,rgba(12,28,48,0.9),rgba(8,18,34,0.94))] text-sky-50 shadow-[0_20px_60px_rgba(20,64,120,0.22)]",
		iconWrap: "bg-sky-300/14 text-sky-200",
		label: "text-sky-200/80",
	},
	success: {
		icon: ShieldCheck,
		wrapper: "border border-emerald-300/25 bg-[linear-gradient(180deg,rgba(7,33,28,0.9),rgba(7,22,19,0.94))] text-emerald-50 shadow-[0_20px_60px_rgba(18,120,88,0.2)]",
		iconWrap: "bg-emerald-300/14 text-emerald-200",
		label: "text-emerald-200/80",
	},
} as const;

export default function DonatePage() {
	useScrollReveal();

  const [amount, setAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<StatusState>(null);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!name || !email || !finalAmount) {
      setStatus({
		 tone: "error",
		 title: "Missing information",
		 message: "Enter your full name, email address, and a valid donation amount before continuing.",
	  });
      return;
    }

	if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
	  setStatus({
		 tone: "error",
		 title: "Invalid amount",
		 message: "Choose one of the preset amounts or enter a valid custom donation amount.",
	  });
	  return;
	}

    setLoading(true);

    try {
      const res = await apiFetch<DonationInitData>("/api/donate", {
        method: "POST",
        body: {
          name,
          email,
          amount: finalAmount,
        },
      });

      if (res.statusCode !== 200) {
				setStatus({
		  tone: "error",
		  title: "Donation request failed",
		  message: res.message || "We could not connect you to the payment gateway right now. Please try again.",
		});
        return;
      }

      if (res.data?.authorizationUrl) {
		if (typeof window !== "undefined") {
		  window.sessionStorage.setItem("donation_donor_name", name.trim());
		}
        window.location.href = res.data.authorizationUrl;
        return;
      }

			setStatus({
		 tone: "info",
		 title: "Payment page unavailable",
		 message: res.message || "The donation request completed, but no payment redirect URL was returned.",
	  });
    } catch {
			setStatus({
		 tone: "error",
		 title: "Network error",
		 message: "The donation request could not reach the server. Check your connection and try again.",
	  });
    } finally {
      setLoading(false);
    }
  }

  return (
	<div>
		<Navbar/>
		<section className="relative min-h-screen mt-6 overflow-hidden bg-black px-6 py-20 text-white flex items-center justify-center">
		<div className="pointer-events-none absolute inset-0 opacity-90">
			<div className="absolute -left-24 top-18 h-80 w-80 rounded-full bg-[#2f9e44]/16 blur-3xl" />
			<div className="absolute -right-20 top-28 h-96 w-96 rounded-full bg-[#5dade2]/14 blur-3xl" />
			<div className="absolute left-1/4 bottom-10 h-72 w-72 rounded-full bg-[#d9485f]/12 blur-3xl" />
		</div>

		<div className="relative w-full max-w-xl">

			{/* HEADER */}
			<div className="reveal-on-scroll reveal-up mb-10 text-center" data-reveal="true">
			<h1 className="text-4xl sm:text-5xl font-bold">
				Support the Campaign
			</h1>
			<p className="text-gray-400 mt-3">
				Your contribution helps us reach more people and drive real change.
			</p>
			</div>

			{/* FORM */}
			<form
			onSubmit={handleDonate}
			data-reveal="true"
			data-delay="100"
			className="reveal-on-scroll reveal-up bg-[#0f172a] border border-gray-800 rounded-3xl p-8 shadow-xl space-y-8"
			>

			{/* NAME */}
			<div>
				<label className="text-sm text-gray-400">Full Name</label>
				<input
				type="text"
				placeholder="Your Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="mt-2 w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-[#2f9e44] transition"
				/>
			</div>

			{/* EMAIL */}
			<div>
				<label className="text-sm text-gray-400">Email Address</label>
				<input
				type="email"
				placeholder="Your Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="mt-2 w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-[#5dade2] transition"
				/>
			</div>

			{/* AMOUNT */}
			<div>
				<label className="text-sm text-gray-400">Select Amount</label>

				{/* PRESET BUTTONS */}
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
				{presetAmounts.map((amt) => (
					<button
					type="button"
					key={amt}
					onClick={() => {
						setAmount(amt);
						setCustomAmount("");
					}}
					className={`py-3 rounded-xl border text-sm font-semibold transition ${
						amount === amt && !customAmount
						? "bg-[#2f9e44] text-white border-[#2f9e44]"
						: "border-gray-700 text-gray-300 hover:border-[#2f9e44]"
					}`}
					>
					₦{amt.toLocaleString()}
					</button>
				))}
				</div>

				{/* CUSTOM AMOUNT */}
				<input
				type="number"
				placeholder="Custom amount (₦)"
				value={customAmount}
				onChange={(e) => {
					setCustomAmount(e.target.value);
					setAmount(null);
				}}
				className="mt-4 w-full px-4 py-3 rounded-xl bg-black border border-gray-700 focus:outline-none focus:border-[#d9485f] transition"
				/>
			</div>

			{/* SUBMIT */}
			<button
				type="submit"
				disabled={loading}
				className="w-full py-4 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300"
				style={{
				background: "#d9485f",
				boxShadow: "0 10px 30px rgba(217,72,95,0.3)",
				}}
			>
				{loading ? "Processing..." : "Donate Now"}
			</button>

			</form>

			{status && (() => {
				const tone = statusToneStyles[status.tone];
				const Icon = tone.icon;

				return (
					<div
						className={`reveal-on-scroll reveal-up mt-5 rounded-3xl p-4 sm:p-5 ${tone.wrapper}`}
						data-reveal="true"
						data-delay="180"
					>
						<div className="flex items-start gap-4">
							<div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.iconWrap}`}>
								<Icon className="h-5 w-5" />
							</div>
							<div className="min-w-0">
								<p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${tone.label}`}>
									Donation Status
								</p>
								<p className="mt-2 text-base font-semibold text-white sm:text-lg">
									{status.title}
								</p>
								<p className="mt-2 text-sm leading-7 text-white/80">
									{status.message}
								</p>
							</div>
						</div>
					</div>
				);
			})()}

			{/* FOOTNOTE */}
			<p className="reveal-on-scroll reveal-up text-center text-xs text-gray-500 mt-6" data-reveal="true" data-delay="220">
			Secure payments powered by Paystack
			</p>

		</div>
		</section>
	</div>
  );
}