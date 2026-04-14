import { proxyJsonAuth } from "../../_lib/backend";

export async function POST(request: Request) {
  return proxyJsonAuth(request, "/api/admin/add-education");
}