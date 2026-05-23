"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ScrollText,
  ClipboardCheck,
  BookOpenCheck,
  FolderOpen,
  PlayCircle,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import styles from "./Sidebar.module.css";

interface MenuItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const ADMIN_MENU: MenuSection[] = [
  {
    title: "MAIN MENU",
    items: [
      { id: "overview",  name: "Dashboard",         icon: LayoutDashboard },
      { id: "tatib",     name: "Tata Tertib & Kontak", icon: ScrollText },
    ],
  },
  {
    title: "ACADEMICS",
    items: [
      { id: "absensi",   name: "Absensi",            icon: ClipboardCheck },
      { id: "posttest",  name: "Post Test",           icon: BookOpenCheck },
      { id: "tugas",     name: "Monitoring Tugas",    icon: FolderOpen },
      { id: "materi",    name: "Materi & Rekaman",    icon: PlayCircle },
    ],
  },
  {
    title: "PORTFOLIO",
    items: [
      { id: "final",     name: "Final Project",       icon: Trophy },
    ],
  },
];

export default function AdminSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logoContainer}>
          <svg viewBox="0 0 100 100" className={styles.logoSvg}>
            <path d="M10,50 L75,5 L80,55 Z" fill="#3884c7" />
            <path d="M10,50 L50,55 L62,85 Z" fill="#165da6" />
            <path d="M50,55 L80,55 L86,90 L62,85 Z" fill="#94cb5a" />
          </svg>
          <div className={styles.logoText}>
            <span className={styles.brandMapid}>MAPID</span>
            <span className={styles.brandAcademy}>Academy</span>
          </div>
        </div>
        <div className={styles.brandSubtitle}>Admin Panel</div>
      </div>

      <nav className={styles.navigation}>
        {ADMIN_MENU.map((section, idx) => (
          <div key={idx} className={styles.section}>
            <h4 className={styles.sectionTitle}>{section.title}</h4>
            <div className={styles.menuList}>
              {section.items.map((item) => {
                const isActive = currentTab === item.id;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={`/admin?tab=${item.id}`}
                    className={`${styles.menuLink} ${isActive ? styles.activeLink : ""}`}
                  >
                    <span className={styles.menuIcon}><Icon size={16} /></span>
                    <span className={styles.menuName}>{item.name}</span>
                    {isActive && <span className={styles.activeIndicator} />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <span className={styles.batchLabel}>Admin Panel</span>
        <span className={styles.batchValue}>MAPID Academy</span>
      </div>
    </aside>
  );
}
