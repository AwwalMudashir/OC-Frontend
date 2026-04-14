import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardShell from "../components/AdminDashboardShell";

const ADMIN_ENTRY_PATH = "/executive-briefing";

async function logout() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("oc_admin_token");
  cookieStore.delete("oc_admin_email");
  cookieStore.delete("oc_admin_user_id");
  redirect(ADMIN_ENTRY_PATH);
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("oc_admin_token")?.value;
  const email = cookieStore.get("oc_admin_email")?.value;
  const userId = cookieStore.get("oc_admin_user_id")?.value;

  if (!token) {
    redirect(ADMIN_ENTRY_PATH);
  }

  return <AdminDashboardShell email={email} userId={userId} onLogout={logout} />;
}