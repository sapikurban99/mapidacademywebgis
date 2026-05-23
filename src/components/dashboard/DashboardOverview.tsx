"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Globe, FolderOpen, Lightbulb, Phone, Layers, GraduationCap, UploadCloud } from "lucide-react";
import styles from "./DashboardOverview.module.css";

interface OverviewStats {
  attendanceRate: number;
  quizzesSubmitted: number;
  tasksSubmitted: number;
  activeStudentName: string;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<OverviewStats>({
    attendanceRate: 100,
    quizzesSubmitted: 0,
    tasksSubmitted: 0,
    activeStudentName: "Belum Diisi",
  });

  // Load and calculate stats
  const loadData = () => {
    // 1. Get active participant name and email
    let savedName = localStorage.getItem("mapid_active_username") || "";
    let savedEmail = localStorage.getItem("mapid_active_useremail") || "";
    
    if (!savedName) {
      savedName = "Kalvin Reza Pratama";
      localStorage.setItem("mapid_active_username", "Kalvin Reza Pratama");
    }
    if (!savedEmail) {
      savedEmail = "kalvin@gmail.com";
      localStorage.setItem("mapid_active_useremail", "kalvin@gmail.com");
    }

    // 2. Calculate quizzes submitted (how many post-tests completed out of 15)
    let quizzesCount = 0;
    const savedScores = localStorage.getItem("mapid_quiz_scores");
    if (savedScores) {
      try {
        const parsed = JSON.parse(savedScores);
        quizzesCount = Object.keys(parsed).length;
      } catch {
        // empty catch
      }
    }

    // 3. Calculate tasks submitted (how many tasks out of 15 from "mapid_submissions")
    let tasksCount = 0;
    const savedTasks = localStorage.getItem("mapid_submissions");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        tasksCount = Object.keys(parsed).length;
      } catch {
        // empty catch
      }
    }

    // 4. Calculate attendance (overall ratio from 17 meetings)
    let attendanceCount = 4; // default initial attendance has 4 sessions checked in
    const savedAttendance = localStorage.getItem("mapid_attendance");
    if (savedAttendance) {
      try {
        const parsed = JSON.parse(savedAttendance);
        attendanceCount = Object.values(parsed).filter(Boolean).length;
      } catch {
        // empty catch
      }
    }
    const attendancePercentage = Math.round((attendanceCount / 17) * 100);

    setStats({
      attendanceRate: attendancePercentage,
      quizzesSubmitted: quizzesCount,
      tasksSubmitted: tasksCount,
      activeStudentName: savedName || "Belum Diisi",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);

    // Listen to changes in localStorage from other tabs
    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Welcome Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>mulai belajar dengan dashboard ini!</span>
            <span className={styles.hashtag}>#CodetheMapDecodetheFuture</span>
          </div>
          <h1 className={styles.title}>
            Selamat Datang di Dashboard <span className={styles.highlight}>MAPID Academy WebGIS Development Bootcamp Batch 3!</span>
          </h1>
          <p className={styles.subtitle}>
            Dashboard terintegrasi ini siap menemanimu belajar secara praktis. Pantau absensi, kelola kuis, dan serahkan tugas di satu tempat untuk membantumu menciptakan masa depan dengan inovasi WebGIS yang andal!
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
            {/* Spinning decorative geometric elements */}
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


      {/* Overview Analytics Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Users size={22} /></div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Overall Rasio Kehadiran dari 17 Pertemuan</span>
            <span className={styles.statValue}>{stats.attendanceRate}%</span>
            <span className={styles.statDesc}>Kehadiran Anda dari total 17 sesi live class</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${stats.attendanceRate}%`, background: "var(--accent)" }} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><Globe size={22} /></div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Overall Rasio Submit Post Test</span>
            <span className={styles.statValue}>{Math.round((stats.quizzesSubmitted / 15) * 100)}%</span>
            <span className={styles.statDesc}>{stats.quizzesSubmitted} / 15 Post test WebGIS yang diselesaikan</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(stats.quizzesSubmitted / 15) * 100}%`, background: "var(--accent-indigo)" }} />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}><FolderOpen size={22} /></div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Overall Rasio Tugas per Pertemuan</span>
            <span className={styles.statValue}>{Math.round((stats.tasksSubmitted / 15) * 100)}%</span>
            <span className={styles.statDesc}>{stats.tasksSubmitted} / 15 Link tugas yang diserahkan dari tugas mingguan</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(stats.tasksSubmitted / 15) * 100}%`, background: "var(--accent-blue)" }} />
          </div>
        </div>
      </div>

      {/* Feature Explanations & Mission */}
      <div className={styles.infoSection}>
        <div className={styles.missionCard}>
          {/* Header */}
          <div className={styles.missionHeaderArea}>
            <div className={styles.missionTagLine}>
              <Lightbulb size={12} />
              <span>FITUR UNGGULAN</span>
            </div>
            <h3>Keunggulan Utama Single-Dashboard</h3>
            <p>Dashboard terintegrasi yang dirancang khusus untuk peserta WebGIS Batch 3 — semua kebutuhan belajar di satu tempat, terstruktur dan terukur.</p>
          </div>

          {/* Feature Cards */}
          <div className={styles.featureGrid}>
            <div className={styles.featureRow}>
              <div className={`${styles.featureIconBox} ${styles.iconPurple}`}>
                <Layers size={18} />
              </div>
              <div className={styles.featureText}>
                <strong>Sentralisasi Aset Belajar</strong>
                <span>Modul coding GitHub, rekaman video YouTube, link software, dan absensi diatur rapi di satu halaman.</span>
              </div>
            </div>
            <div className={styles.featureRow}>
              <div className={`${styles.featureIconBox} ${styles.iconBlue}`}>
                <GraduationCap size={18} />
              </div>
              <div className={styles.featureText}>
                <strong>Post Test WebGIS Akademik</strong>
                <span>Evaluasi spasial interaktif dengan leaderboard kelas secara real-time untuk memvalidasi pemahaman spasial.</span>
              </div>
            </div>
            <div className={styles.featureRow}>
              <div className={`${styles.featureIconBox} ${styles.iconGreen}`}>
                <UploadCloud size={18} />
              </div>
              <div className={styles.featureText}>
                <strong>Sistem Pengumpulan Tugas Mulus</strong>
                <span>Pengumpulan link tugas berbasis cloud yang instan, mempermudah pelacakan kemajuan portofolio.</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={styles.missionStatsRow}>
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>17</span>
              <span className={styles.missionStatLabel}>Sesi Live</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>15</span>
              <span className={styles.missionStatLabel}>Post Test</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>15</span>
              <span className={styles.missionStatLabel}>Tugas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.missionStat}>
              <span className={styles.missionStatNum}>10</span>
              <span className={styles.missionStatLabel}>Peserta</span>
            </div>
          </div>
        </div>

        <div className={styles.corporateCard}>
          <div className={styles.corpHeaderWithLogo}>
            <div className={styles.corpLabelGroup}>
              <span className={styles.corpLabel}>MAPID Vision</span>
              <a href="https://www.mapid.io" target="_blank" rel="noopener noreferrer" className={styles.corpWebsiteLink}>
                www.mapid.io ↗
              </a>
            </div>
            <svg viewBox="0 0 100 100" className={styles.corpLogoSvg}>
              {/* Top Fold - Light Blue */}
              <path d="M10,50 L75,5 L80,55 Z" fill="#3884c7" />
              {/* Bottom-Left Fold - Dark Blue */}
              <path d="M10,50 L50,55 L62,85 Z" fill="#165da6" />
              {/* Bottom-Right Fold - Light Green */}
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

