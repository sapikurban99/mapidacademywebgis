"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

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
