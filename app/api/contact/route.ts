import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          statusCode: 400,
          message: "Name, email, and message are all required.",
          data: null,
        },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          statusCode: 422,
          message: "Please provide a valid email address.",
          data: null,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        statusCode: 200,
        message: "Your message has been delivered to the campaign team.",
        data: {
          received: {
            name,
            email,
            message,
          },
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { statusCode: 400, message: "Invalid request payload.", data: null },
      { status: 400 }
    );
  }
}
