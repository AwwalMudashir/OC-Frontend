import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getBackendBase() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";

  if (!base) {
    throw new Error("API base URL is not configured.");
  }

  return base.replace(/\/+$/, "");
}

function getSafeBackendMediaUrl(path: string) {
  const trimmedPath = path.trim();

  if (!trimmedPath.startsWith("/")) {
    throw new Error("Invalid media path.");
  }

  if (!trimmedPath.startsWith("/uploads/")) {
    throw new Error("Unsupported media path.");
  }

  return `${getBackendBase()}${trimmedPath}`;
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const path = requestUrl.searchParams.get("path") ?? "";

    if (!path) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Image path is required.",
          data: null,
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("oc_admin_token")?.value;

    const response = await fetch(getSafeBackendMediaUrl(path), {
      method: "GET",
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          statusCode: response.status,
          message: response.status === 401 ? "Image request was rejected by the backend." : "Unable to load event image.",
          data: null,
        },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") ?? "application/octet-stream";
    const cacheControl = response.headers.get("cache-control") ?? "public, max-age=3600";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 500,
        message: error instanceof Error ? error.message : "Unable to proxy event image.",
        data: null,
      },
      { status: 500 }
    );
  }
}