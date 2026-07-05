import { AdminShell } from "@/components/admin/AdminShell";
import { SiteContentEditor } from "@/components/admin/SiteContentEditor";

export default function AdminContentPage() {
  return (
    <AdminShell>
      <SiteContentEditor />
    </AdminShell>
  );
}
