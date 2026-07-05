import { AdminShell } from "@/components/admin/AdminShell";
import AdminDashboard from "./AdminDashboard";

export default function AdminPage() {
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}
