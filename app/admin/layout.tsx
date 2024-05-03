import { AdminNav } from "../components/admin/AdminNav";

export const metadata = {
    title: "Sucre-Shop Admin",
    description: "Sucre-Shop Admin Dashboard"
}

export default function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
        <AdminNav />
      {children}
    </div>
  );
}