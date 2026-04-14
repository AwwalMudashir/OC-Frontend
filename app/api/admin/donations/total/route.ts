import { proxyGetAuth } from "../../../_lib/backend";

export async function GET() {
  return proxyGetAuth("/api/admin/donations/total");
}