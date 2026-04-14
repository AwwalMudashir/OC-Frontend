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

  try {
    const payload = rawText ? JSON.parse(rawText) : null;
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        statusCode: response.status,
        message: rawText || (response.ok ? "OK" : "Request failed"),
        data: null,
      },
      { status: response.status }
    );
  }
}

export async function POST(request: Request) {
  try {
    const incomingUrl = new URL(request.url);
    const search = incomingUrl.search || "";
    const response = await fetch(`${getBackendBase()}/api/verify-donation${search}`, {
      method: "POST",
      cache: "no-store",
    });

    return await toNextResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unable to reach backend service.",
        data: null,
      },
      { status: 500 }
    );
  }
}