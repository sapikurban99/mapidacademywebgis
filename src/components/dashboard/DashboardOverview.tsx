"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Globe, FolderOpen, Lightbulb, Phone, Layers, GraduationCap, UploadCloud } from "lucide-react";
import { supabase } from "@/lib/supabase";
import styles from "./DashboardOverview.module.css";

interface OverviewStats {
  attendanceRate: number;
  quizzesSubmitted: number;
  tasksSubmitted: number;
  activeStudentName: string;
}

interface AppConfig {
  totalSessions: number;
  totalQuizzes: number;
  totalTasks: number;
  totalParticipants: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<OverviewStats>({
    attendanceRate: 0,
    quizzesSubmitted: 0,
    tasksSubmitted: 0,
    activeStudentName: "Belum Diisi",
  });
  const [config, setConfig] = useState<AppConfig>({
    totalSessions: 17,
    totalQuizzes: 15,
    totalTasks: 15,
    totalParticipants: 10,
  });

  useEffect(() => {
    async function loadData() {
      let savedName = localStorage.getItem("mapid_active_username") || "";
      const savedEmail = localStorage.getItem("mapid_active_useremail") || "";

      if (!savedName) {
        const { data: participants } = await supabase
          .from("academy_config_participants")
          .select("name")
          .order("sort_order")
          .limit(1);

        if (participants && participants.length > 0) {
          savedName = participants[0].name;
        } else {
          savedName = "Peserta";
        }
        localStorage.setItem("mapid_active_username", savedName);
      }
      if (!savedEmail) {
        localStorage.setItem("mapid_active_useremail", "");
      }

      const { data: cfgData } = await supabase
        .from("academy_site_config")
        .select("key,value")
        .in("key", ["total_bootcamp_sessions", "total_quiz_sessions", "total_task_count", "total_participants"]);

      const cfgMap: Record<string, string> = {};
      (cfgData ?? []).forEach((r: { key: string; value: string }) => {
        cfgMap[r.key] = r.value;
      });

      const totalSessions = parseInt(cfgMap["total_bootcamp_sessions"] || "17", 10);
      const totalQuizzes = parseInt(cfgMap["total_quiz_sessions"] || "15", 10);
      const totalTasks = parseInt(cfgMap["total_task_count"] || "15", 10);
      const totalParticipants = parseInt(cfgMap["total_participants"] || "10", 10);

      setConfig({ totalSessions, totalQuizzes, totalTasks, totalParticipants });

      const { data: attData } = await supabase
        .from("academy_attendance")
        .select("participant, session_no, attended");

      let attendanceCount = 0;
      if (attData && savedName) {
        const myAtt = attData.filter(
          (r) => r.participant === savedName && r.attended
        );
        attendanceCount = myAtt.length;
      }

      const { data: quizData } = await supabase
        .from("academy_quiz_scores")
        .select("participant, session_key")
        .eq("participant", savedName);

      const uniqueSessions = new Set((quizData ?? []).map((r) => r.session_key));

      const { data: taskData } = await supabase
        .from("academy_task_submissions")
        .select("participant, task_id")
        .eq("participant", savedName);

      const uniqueTasks = new Set((taskData ?? []).map((r) => r.task_id));

      setStats({
        attendanceRate: totalSessions > 0 ? Math.round((attendanceCount / totalSessions) * 100) : 0,
        quizzesSubmitted: uniqueSessions.size,
        tasksSubmitted: uniqueTasks.size,
        activeStudentName: savedName || "Belum Diisi",
      });
    }

    loadData();

    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const { totalSessions, totalQuizzes, totalTasks, totalParticipants } = config;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>mulai belajar dengan dashboard ini!</span>
            <span className={styles.hashtag}>#CodetheMapDecodetheFuture</span>
          </div>
          <h1 className={styles.title}>
            Selamat Datang di Dashboard{" "}
            <span className={styles.highlight}>MAPID Academy WebGIS Development Bootcamp Batch 3!</span>
          </h1>
          <p className={styles.subtitle}>
            Platform pembelajaran terpadu yang dirancang khusus untuk peserta WebGIS Development Bootcamp Batch 3. Pantau kehadiran, selesaikan evaluasi, dan kelola pengumpulan tugas secara terpusat guna mendukung capaian kompetensi WebGIS secara terstruktur dan terukur.
          </p>
          <div className={styles.heroActions}>
            <Link href="/?tab=schedule" className={`${styles.btn} ${styles.btnPrimary}`}>
              Lihat Jadwal Kelas
            </Link>
            <Link href="/?tab=quiz" className={`${styles.btn} ${styles.btnSecondary}`}>
              Mulai Post Test
            </Link>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <svg viewBox="0 0 200 200" className={styles.geoSvg}>
            <circle cx="100" cy="100" r="80" className={styles.orbit1} />
            <circle cx="100" cy="100" r="50" className={styles.orbit2} />
            <polygon points="100,40 150,130 50,130" className={styles.facetPolygon} />
            <circle cx="100" cy="40" r="8" className={styles.node} />
            <circle cx="150" cy="130" r="8" className={styles.node} />
            <circle cx="50" cy="130" r="8" className={styles.node} />
            <circle cx="100" cy="100" r="12" className={styles.centerNode} />
          </svg>
        </div>
      </section>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Users size={22} /></div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Overall Rasio Kehadiran dari {totalSessions} Pertemuan</span>
            <span className={styles.statValue}>{stats.attendanceRate}%</span>
            <span className={styles.statDesc}>Kehadiran Anda dari total {totalSessions} sesi live class</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${stats.attendanceRate}%`, background: "var(--accent)" }} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><Globe size={22} /></div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Overall Rasio Submit Post Test</span>
            <span className={styles.statValue}>{totalQuizzes > 0 ? Math.round((stats.quizzesSubmitted / totalQuizzes) * 100) : 0}%</span>
            <span className={styles.statDesc}>{stats.quizzesSubmitted} / {totalQuizzes} Post test WebGIS yang diselesaikan</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${totalQuizzes > 0 ? (stats.quizzesSubmitted / totalQuizzes) * 100 : 0}%`, background: "var(--accent-indigo)" }} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><FolderOpen size={22} /></div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Overall Rasio Tugas per Pertemuan</span>
            <span className={styles.statValue}>{totalTasks > 0 ? Math.round((stats.tasksSubmitted / totalTasks) * 100) : 0}%</span>
            <span className={styles.statDesc}>{stats.tasksSubmitted} / {totalTasks} Link tugas yang diserahkan dari tugas mingguan</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${totalTasks > 0 ? (stats.tasksSubmitted / totalTasks) * 100 : 0}%`, background: "var(--accent-blue)" }} />
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.missionCard}>
          <div className={styles.missionHeaderArea}>
            <div className={styles.missionTagLine}>
              <Lightbulb size={12} />
              <span>FITUR UNGGULAN</span>
            </div>
            <h3>Keunggulan Utama Single-Dashboard</h3>
            <p>Dashboard terintegrasi yang dirancang khusus untuk peserta WebGIS Batch 3 — semua kebutuhan belajar di satu tempat, terstruktur dan terukur.</p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureRow}>
              <div className={styles.featureIconBox}><Layers size={16} /></div>
              <div className={styles.featureText}>
                <strong>Sentralisasi Aset Belajar</strong>
                <span>Modul coding GitHub, rekaman video YouTube, link software, dan absensi diatur rapi di satu halaman.</span>
              </div>
            </div>
            <div className={styles.featureRow}>
              <div className={styles.featureIconBox}><GraduationCap size={16} /></div>
              <div className={styles.featureText}>
                <strong>Post Test WebGIS Akademik</strong>
                <span>Evaluasi spasial interaktif dengan 15 sesi kuis untuk memvalidasi pemahaman spasialmu.</span>
              </div>
            </div>
            <div className={styles.featureRow}>
              <div className={styles.featureIconBox}><UploadCloud size={16} /></div>
              <div className={styles.featureText}>
                <strong>Sistem Pengumpulan Tugas Mulus</strong>
                <span>Pengumpulan link tugas berbasis cloud yang instan, mempermudah pelacakan kemajuan portofolio.</span>
              </div>
            </div>
          </div>

          <div className={styles.missionStatsRow}>
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>{totalSessions}</span>
              <span className={styles.missionStatLabel}>Sesi Live</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>{totalQuizzes}</span>
              <span className={styles.missionStatLabel}>Post Test</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>{totalTasks}</span>
              <span className={styles.missionStatLabel}>Tugas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>{totalParticipants}</span>
              <span className={styles.missionStatLabel}>Peserta</span>
            </div>
          </div>
        </div>

        <div className={styles.corporateCard}>
          <div className={styles.corpHeaderWithLogo}>
            <div className={styles.corpLabelGroup}>
              <span className={styles.corpLabel}>MAPID Vision</span>
              <a href="https://www.mapid.io" target="_blank" rel="noopener noreferrer" className={styles.corpWebsiteLink}>
                www.mapid.io &#x2197;
              </a>
            </div>
            <svg viewBox="0 0 100 100" className={styles.corpLogoSvg}>
              <path d="M10,50 L75,5 L80,55 Z" fill="#3884c7" />
              <path d="M10,50 L50,55 L62,85 Z" fill="#165da6" />
              <path d="M50,55 L80,55 L86,90 L62,85 Z" fill="#94cb5a" />
            </svg>
          </div>
          <h3>AI-Powered Spatial Insights for Smarter Decisions</h3>
          <p>
            MAPID berkomitmen untuk mengakselerasi pemanfaatan kecerdasan spasial berbasis data untuk semua kalangan.
          </p>
          <p>
            Kami memberdayakan organisasi, bisnis, akademisi, dan individu dalam mengekstraksi nilai dari lokasi secara cerdas, otomatis, ilmiah, dan presisi tinggi guna menghasilkan keputusan taktis serta strategis terbaik di era digital.
          </p>
          <div className={styles.corpFooter}>
            <span className={styles.contactTitle}>Hubungi untuk:</span>
            <ul className={styles.corpBulletList}>
              <li>Personal License</li>
              <li>Enterprise</li>
              <li>Corporate Training</li>
            </ul>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={13} /> Wina</span>
                <a href="tel:+6281324011024" className={styles.corpLink}>+62 813-2401-1024</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
