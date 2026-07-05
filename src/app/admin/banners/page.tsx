import { AdminShell } from "@/components/admin/AdminShell";
import { BannerEditor } from "@/components/admin/BannerEditor";

export default function AdminBannersPage() {
  return (
    <AdminShell>
      <BannerEditor />
    </AdminShell>
  );
}
