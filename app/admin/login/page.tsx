"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { useToast } from "../../components/ToastProvider";

export default function AdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error({
        title: "Missing credentials",
        message: "Enter the admin email address and password to continue.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { statusCode?: number; message?: string }
        | null;

      if (!response.ok) {
        toast.error({
          title: "Login failed",
          message: payload?.message || "Invalid credentials or access denied.",
        });
        return;
      }

      toast.success({
        title: "Access granted",
        message: "Redirecting to the admin dashboard.",
      });

      startTransition(() => {
        router.push("/admin");
        router.refresh();
      });
    } catch (error) {
      toast.error({
        title: "Login error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to reach the login service.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#5dade2]/14 blur-3xl" />
        <div className="absolute -right-18 top-40 h-96 w-96 rounded-full bg-[#d9485f]/14 blur-3xl" />
        <div className="absolute left-1/3 bottom-10 h-72 w-72 rounded-full bg-[#2f9e44]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_0.92fr]">
          <section className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,18,34,0.96),rgba(12,24,44,0.92))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
              <ShieldCheck className="h-4 w-4" />
              Restricted Access
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Campaign administration login.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              This entry point is intended for authorized campaign administrators only.
              Successful sign-in opens the protected dashboard and stores a secure session cookie.
            </p>
          </section>

          <section className="rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.97),rgba(13,20,36,0.94))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Admin Sign In
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="block">
                <span className="text-sm font-medium text-slate-300">Email Address</span>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <Mail className="h-4 w-4 text-sky-200" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@email.com"
                    className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                    autoComplete="email"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-300">Password</span>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <LockKeyhole className="h-4 w-4 text-rose-200" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
                    autoComplete="current-password"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={isPending || isLoading}
                className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "#d9485f",
                  boxShadow: "0 18px 40px rgba(217, 72, 95, 0.3)",
                }}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Opening Dashboard...
                  </>
                ) : (
                  "Login To Dashboard"
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}