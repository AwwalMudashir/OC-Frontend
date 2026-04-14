import { proxyGet } from "../_lib/backend";

export async function GET() {
  return proxyGet("/api/event-history");
}