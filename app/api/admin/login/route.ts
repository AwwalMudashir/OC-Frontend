import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type LoginResponse = {
  token: string;
  userId: number;
  email: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Email and password are required.",
          data: null,
        },
        { status: 400 }
      );
    }

    const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
    if (!base) {
      return NextResponse.json(
        {
          statusCode: 500,
          message: "API base URL is not configured.",
          data: null,
        },
        { status: 500 }
      );
    }

    const response = await fetch(`${base.replace(/\/+$/, "")}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const rawText = await response.text();
    let payload: LoginResponse | null = null;

    try {
      payload = rawText ? (JSON.parse(rawText) as LoginResponse) : null;
    } catch {
      payload = null;
    }

    if (!response.ok || !payload?.token) {
      return NextResponse.json(
        {
          statusCode: response.status,
          message:
            (payload as unknown as { message?: string } | null)?.message ??
            rawText ??
            "Login failed.",
          data: null,
        },
        { status: response.status || 500 }
      );
    }

    const cookieStore = await cookies();
    const secure = process.env.NODE_ENV === "production";

    cookieStore.set("oc_admin_token", payload.token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("oc_admin_email", payload.email, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("oc_admin_user_id", String(payload.userId), {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(
      {
        statusCode: 200,
        message: "Login successful.",
        data: {
          email: payload.email,
          userId: payload.userId,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Unable to complete login right now.",
        data: null,
      },
      { status: 500 }
    );
  }
}