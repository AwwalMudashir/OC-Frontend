import { proxyJson } from "../_lib/backend";

export async function POST(request: Request) {
  return proxyJson(request, "/api/donate");
}
