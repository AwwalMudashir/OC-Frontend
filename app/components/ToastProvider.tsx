"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";

type ToastVariant = "success" | "error";

type ToastItem = {
  id: number;
  title: string;
  message?: string;
  variant: ToastVariant;
};

type ToastInput = {
  title: string;
  message?: string;
};

type ToastContextValue = {
  success: (input: ToastInput) => void;
  error: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: (id: number) => void;
}) {
  const isSuccess = toast.variant === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertTriangle;

  return (
    <div
      className="animate-slide-in-right pointer-events-auto w-full max-w-sm overflow-hidden rounded-3xl border p-4 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl"
      style={{
        background: isSuccess
          ? "linear-gradient(180deg, rgba(10, 32, 27, 0.96), rgba(7, 18, 17, 0.92))"
          : "linear-gradient(180deg, rgba(41, 13, 21, 0.96), rgba(24, 10, 15, 0.92))",
        borderColor: isSuccess
          ? "rgba(52, 211, 153, 0.28)"
          : "rgba(251, 113, 133, 0.24)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: isSuccess
              ? "rgba(16, 185, 129, 0.18)"
              : "rgba(244, 63, 94, 0.18)",
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{ color: isSuccess ? "#86efac" : "#fda4af" }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {toast.title}
          </p>
          {toast.message && (
            <p className="mt-2 text-sm leading-6 text-slate-200">{toast.message}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onClose(toast.id)}
          className="cursor-pointer rounded-full border border-white/10 bg-white/6 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(1);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (variant: ToastVariant, input: ToastInput) => {
      const id = nextIdRef.current++;
      setToasts((current) => [...current, { id, variant, ...input }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 4200);
    },
    [removeToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      success: (input) => pushToast("success", input),
      error: (input) => pushToast("error", input),
    }),
    [pushToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-100 flex w-full max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}