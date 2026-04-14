import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getBackendBase() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";

  if (!base) {
    throw new Error("API base URL is not configured.");
  }

  return base.replace(/\/+$/, "");
}

async function toNextResponse(response: Response) {
  const rawText = await response.text();
  let payload: unknown = null;

  try {
    payload = rawText ? JSON.parse(rawText) : null;
  } catch {
    payload = null;
  }

  if (payload && typeof payload === "object") {
    return NextResponse.json(payload, { status: response.status });
  }

  return NextResponse.json(
    {
      statusCode: response.status,
      message: rawText || (response.ok ? "OK" : "Request failed"),
      data: null,
    },
    { status: response.status }
  );
}

function toErrorResponse(error: unknown) {
  return NextResponse.json(
    {
      statusCode: 500,
      message: error instanceof Error ? error.message : "Unable to reach backend service.",
      data: null,
    },
    { status: 500 }
  );
}

function toUnauthorizedResponse() {
  return NextResponse.json(
    {
      statusCode: 401,
      message: "Authentication required.",
      data: null,
    },
    { status: 401 }
  );
}

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("oc_admin_token")?.value;

  if (!token) {
    return null;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function proxyGet(endpoint: string) {
  try {
    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: "GET",
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyGetAuth(endpoint: string) {
  try {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders) {
      return toUnauthorizedResponse();
    }

    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: "GET",
      headers: authHeaders,
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyJson(request: Request, endpoint: string) {
  try {
    const body = await request.text();
    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyJsonAuth(request: Request, endpoint: string) {
  try {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders) {
      return toUnauthorizedResponse();
    }

    const body = await request.text();
    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      body,
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyFormData(request: Request, endpoint: string) {
  try {
    const incoming = await request.formData();
    const formData = new FormData();

    incoming.forEach((value, key) => {
      formData.append(key, value);
    });

    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: request.method,
      body: formData,
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyFormDataAuth(request: Request, endpoint: string) {
  try {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders) {
      return toUnauthorizedResponse();
    }

    const incoming = await request.formData();
    const formData = new FormData();

    incoming.forEach((value, key) => {
      formData.append(key, value);
    });

    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: request.method,
      headers: authHeaders,
      body: formData,
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyDelete(endpoint: string) {
  try {
    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: "DELETE",
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function proxyDeleteAuth(endpoint: string) {
  try {
    const authHeaders = await getAuthHeaders();

    if (!authHeaders) {
      return toUnauthorizedResponse();
    }

    const response = await fetch(`${getBackendBase()}${endpoint}`, {
      method: "DELETE",
      headers: authHeaders,
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return toErrorResponse(error);
  }
}