import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import ConditionalSidebar from "@/components/layout/ConditionalSidebar";
import ConditionalChrome, { ConditionalFooter } from "@/components/layout/ConditionalChrome";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "MAPID Academy - WebGIS Bootcamp Dashboard",
  description: "All-in-one workspace for MAPID Academy WebGIS Development Bootcamp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <div style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
          <ConditionalSidebar />
          <main style={{ flex: 1, overflowX: "hidden", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <ConditionalChrome />
            {children}
            <ConditionalFooter />
          </main>
        </div>
      </body>
    </html>
  );
}



