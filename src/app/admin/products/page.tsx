import { AdminShell } from "@/components/admin/AdminShell";
import AdminProductsList from "./AdminProductsList";

export default function AdminProductsPage() {
  return (
    <AdminShell>
      <AdminProductsList />
    </AdminShell>
  );
}
