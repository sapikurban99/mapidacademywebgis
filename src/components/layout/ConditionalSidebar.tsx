"use client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Sidebar from "./Sidebar";

export default function ConditionalSidebar() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <Suspense fallback={<div style={{ width: "260px", background: "#f8fafc" }} />}>
      <Sidebar />
    </Suspense>
  );
}
