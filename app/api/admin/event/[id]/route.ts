import { proxyGetAuth, proxyFormDataAuth } from "../../../_lib/backend";

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();

  if (!id) {
    return Response.json(
      {
        statusCode: 400,
        message: "Event id is required.",
        data: null,
      },
      { status: 400 }
    );
  }

  return proxyGetAuth(`/api/admin/event/${id}`);
}

export async function PUT(request: Request) {
  const id = new URL(request.url).pathname.split("/").pop();

  if (!id) {
    return Response.json(
      {
        statusCode: 400,
        message: "Event id is required.",
        data: null,
      },
      { status: 400 }
    );
  }

  return proxyFormDataAuth(request, `/api/admin/event/${id}`);
}
