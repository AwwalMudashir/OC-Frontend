import { proxyDeleteAuth } from "../../../_lib/backend";

export async function DELETE(request: Request) {
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

  return proxyDeleteAuth(`/api/admin/delete-event/${id}`);
}