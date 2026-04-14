import { proxyFormDataAuth } from "../../_lib/backend";

export async function POST(request: Request) {
  return proxyFormDataAuth(request, "/api/admin/add-events");
}