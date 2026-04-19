import { proxyGetAuth } from "../../_lib/backend";

export async function GET(request: Request) {
  return proxyGetAuth("/api/admin/all-admins");
}
