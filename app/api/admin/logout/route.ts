import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("oc_admin_token");
  cookieStore.delete("oc_admin_email");
  cookieStore.delete("oc_admin_user_id");

  return NextResponse.json({
    statusCode: 200,
    message: "Logged out successfully.",
    data: null,
  });
}