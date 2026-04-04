import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body?.amount || Number(body.amount) <= 0) {
      return NextResponse.json({ statusCode: 400, message: "Invalid amount", data: null }, { status: 400 });
    }

    // In a real integration you'd forward to your Spring Boot backend or payment gateway here.
    // For now return a simulated success response.
    return NextResponse.json({ statusCode: 200, message: "Donation simulated", data: { received: { ...body } } }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ statusCode: 400, message: "Invalid request", data: null }, { status: 400 });
  }
}
