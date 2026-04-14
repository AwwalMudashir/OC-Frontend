"use client";

import { useState } from "react";
import apiFetch from "../api";

type DonationInitData = {
	authorizationUrl?: string;
};

export default function DonationForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [amount, setAmount] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<string | null>(null);


	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setStatus(null);
		if (!amount || Number(amount) <= 0) {
			setStatus("Please enter a valid amount.");
			return;
		}

		setLoading(true);
		try {
			const res = await apiFetch<DonationInitData>("/api/donate", {
				method: "POST",
				body: { name, email, amount: Number(amount), message },
			});
			if (res.statusCode === 200) {
				if (res.data?.authorizationUrl) {
					window.location.href = res.data.authorizationUrl;
					return;
				}

				setStatus(res.message || "Donation initialized successfully.");
				setName("");
				setEmail("");
				setAmount("");
				setMessage("");
			} else {
				setStatus(res.message || "There was an error processing the donation.");
			}
		} catch (err) {
			setStatus("Network error — try again later.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-6 rounded-md shadow-sm" style={{ borderColor: "var(--neutral-200)" }}>
			<h3 className="text-xl font-semibold mb-4">Make a donation</h3>

			<label className="block mb-3">
				<span className="text-sm">Full name</span>
				<input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded" />
			</label>

			<label className="block mb-3">
				<span className="text-sm">Email</span>
				<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full border px-3 py-2 rounded" />
			</label>

			<label className="block mb-3">
				<span className="text-sm">Amount (NGN)</span>
				<input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0" step="100" className="mt-1 block w-full border px-3 py-2 rounded" />
			</label>

			<label className="block mb-4">
				<span className="text-sm">Message (optional)</span>
				<textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 block w-full border px-3 py-2 rounded" rows={3} />
			</label>

			<div className="flex items-center gap-3">
				<button type="submit" disabled={loading} className="px-4 py-2 rounded text-white" style={{ background: "var(--color-primary)" }}>
					{loading ? "Processing..." : "Donate"}
				</button>
				<div className="text-sm text-neutral-500">Secure payments powered by Paystack.</div>
			</div>

			{status && <p className="mt-3 text-sm">{status}</p>}
		</form>
	);
}
