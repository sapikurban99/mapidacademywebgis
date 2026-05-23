import { Suspense } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Suspense fallback={<div style={{ width: "260px", background: "#f8fafc" }} />}>
        <AdminSidebar />
      </Suspense>
      <main style={{ flex: 1, overflowX: "hidden", display: "flex", flexDirection: "column" }}>
        {children}
      </main>
    </div>
  );
}
