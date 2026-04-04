"use client";

import { useState } from "react";
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

export default function DonatePage() {
	useScrollReveal();

  const [amount, setAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  async function handleDonate(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!name || !email || !finalAmount) {
      setStatus("Please fill all fields.");
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
        setStatus(res.message || "Something went wrong.");
        return;
      }

      if (res.data?.authorizationUrl) {
		if (typeof window !== "undefined") {
		  window.sessionStorage.setItem("donation_donor_name", name.trim());
		}
        window.location.href = res.data.authorizationUrl;
        return;
      }

      setStatus(res.message || "Donation initialized successfully.");
    } catch {
      setStatus("Something went wrong.");
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

			{status && (
			<p className="reveal-on-scroll reveal-up mt-4 text-center text-sm text-gray-400" data-reveal="true" data-delay="180">
				{status}
			</p>
			)}

			{/* FOOTNOTE */}
			<p className="reveal-on-scroll reveal-up text-center text-xs text-gray-500 mt-6" data-reveal="true" data-delay="220">
			Secure payments powered by Paystack
			</p>

		</div>
		</section>
	</div>
  );
}