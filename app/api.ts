export type ApiResponse<T = any> = {
	statusCode: number;
	message: string;
	data: T | null;
};

type FetchOptions = {
	method?: string;
	body?: any;
	headers?: Record<string, string>;
	mode?: RequestMode;
};

/**
 * apiFetch: small wrapper to call endpoints and normalize response shape.
 * - Uses `NEXT_PUBLIC_API_BASE` from .env when set (client-safe variable).
 * - Returns object: { statusCode, message, data }
 */
export default async function apiFetch<T = any>(endpoint: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
	const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
	let url = endpoint;
	if (base) {
		url = base.replace(/\/+$/, "") + endpoint;
	}

	const method = options.method ?? "GET";
	const mode = options.mode ?? "cors";
	const body = options.body ? JSON.stringify(options.body) : undefined;
	const headers: Record<string, string> = { ...(options.headers || {}) };

	if (body && !headers["Content-Type"]) {
		headers["Content-Type"] = "application/json";
	}

	console.log("[apiFetch] request:start", {
		endpoint,
		url,
		method,
		mode,
		headers,
		body: options.body ?? null,
	});

	try {
		const res = await fetch(url, { method, mode, headers, body });
		console.log("[apiFetch] response:received", {
			endpoint,
			url,
			status: res.status,
			ok: res.ok,
			statusText: res.statusText,
		});

		const payload = await res.json().catch(() => null);
		console.log("[apiFetch] response:payload", {
			endpoint,
			url,
			payload,
		});

		// If the server already returns normalized shape, use it; otherwise build it
		if (payload && typeof payload.statusCode === "number" && "message" in payload) {
			console.log("[apiFetch] response:normalized", {
				endpoint,
				url,
				response: payload,
			});
			return payload as ApiResponse<T>;
		}

		const normalizedResponse = {
			statusCode: payload?.statusCode ?? res.status,
			message: payload?.message ?? (res.ok ? "OK" : "Request failed"),
			data: payload?.data ?? payload ?? null,
		};

		console.log("[apiFetch] response:normalized", {
			endpoint,
			url,
			response: normalizedResponse,
		});

		return normalizedResponse;
	} catch (err: any) {
		console.log("[apiFetch] request:error", {
			endpoint,
			url,
			error: err,
		});

		const errorResponse = {
			statusCode: 500,
			message: err?.message ?? "Network error",
			data: null,
		};

		console.log("[apiFetch] response:normalized", {
			endpoint,
			url,
			response: errorResponse,
		});

		return errorResponse;
	}
}
