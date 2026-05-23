"use client";

import { useState } from "react";
import {
  CalendarDays, ScrollText, MessageCircle, Clock, Video,
  Map, Zap, CheckCircle2, Timer, Wrench, User, Target,
  GraduationCap,
} from "lucide-react";
import styles from "./ScheduleRules.module.css";

interface Session {
  number: string;
  title: string;
  topic: string;
  tools: string;
  pic: string;
  outcome: string;
  time: string;
  status: "Completed" | "Today" | "Upcoming";
  date: string;
}

const BOOTCAMP_SESSIONS: Session[] = [
  {
    number: "Sesi 1",
    title: "Onboarding Program",
    topic: "Ruang pengenalan awal program, meliputi platform komunikasi, tata cara pengumpulan tugas, dan ketentuan sertifikat kelulusan.",
    tools: "Konseptual",
    pic: "MC",
    outcome: "Mengetahui teknis program secara keseluruhan dan mendapatkan kenyamanan dan kesiapan untuk mengikuti seluruh program.",
    time: "19.00 - 21.30",
    status: "Completed",
    date: "19 March 2025",
  },
  {
    number: "Sesi 2",
    title: "Get to Know WebGIS",
    topic: "Pemberian materi: Apa itu WebGIS? Learning Journey, Industry Real Case dari Mentor, Potensi Karir Praktisi WebGIS dan Real Case.",
    tools: "Konseptual, Pengenalan Tools Teknis",
    pic: "All Mentor",
    outcome: "Peserta mendapatkan pengetahuan: 1. Fundamental mengenai WebGIS, 2. Cara buat WebGIS di Bootcamp, 3. Potensi karir.",
    time: "19.00 - 21.30",
    status: "Completed",
    date: "21 March 2025",
  },
  {
    number: "Sesi 3",
    title: "GIS Fundamental",
    topic: "Meliputi konsep GIS dan data spasial, serta format data spasial yang bisa masuk ke WebGIS (GeoJSON, Shapefile, Raster).",
    tools: "Konseptual dan QGIS singkat",
    pic: "Dzikri",
    outcome: "Mendapatkan pemahaman GIS yang seragam dan mengetahui data spasial yang bisa masuk ke WebGIS.",
    time: "19.00 - 21.30",
    status: "Completed",
    date: "24 March 2025",
  },
  {
    number: "Sesi 4",
    title: "Location Value with GEO MAPID",
    topic: "Konsep penggunaan GEO MAPID sebagai database dan pengelola data spasial: 1. Cara melakukan digitasi, 2. Mengimpor data spasial, 3. Pengenalan API MAPID.",
    tools: "GEO MAPID",
    pic: "Dzikri",
    outcome: "Mengetahui konsep dan fungsi GEO MAPID: 1. Database spasial cloud, 2. Mengelola Data Spasial (Digit dan Import Data).",
    time: "19.00 - 21.30",
    status: "Completed",
    date: "26 March 2025",
  },
  {
    number: "Sesi 5",
    title: "Introduction to VS Code, Git, HTML, CSS, and JavaScript",
    topic: "Pengenalan workflow dasar development menggunakan VS Code dan Git/Github, serta implementasi langsung struktur dasar website menggunakan HTML dan styling dasar menggunakan CSS.",
    tools: "VS Code, HTML, CSS",
    pic: "Rifqi",
    outcome: "Mampu membuat struktur halaman web sederhana dan mengenal workflow developer modern dengan Git & GitHub.",
    time: "19.00 - 21.30",
    status: "Today",
    date: "28 March 2025",
  },
  {
    number: "Sesi 6",
    title: "HTML and CSS Part 2",
    topic: "Layouting dan styling dashboard (HTML CSS dan CSS Tailwind) menggunakan Flexbox/Grid serta pembuatan tampilan yang siap diintegrasikan ke WebGIS. Disisipkan pengenalan singkat Stitch AI sebagai referensi eksplorasi visual UI.",
    tools: "VS Code + Stitch AI, HTML, CSS, CSS Tailwind",
    pic: "Rifqi",
    outcome: "Mampu membuat tampilan dashboard yang rapi dan siap integrasi.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "31 March 2025",
  },
  {
    number: "Sesi 7",
    title: "JavaScript Part 1",
    topic: "Dasar JavaScript meliputi variable, logic, function, dan event sebagai pondasi interaksi pada website.",
    tools: "VS Code, JS",
    pic: "Rifqi",
    outcome: "Mampu membuat interaksi dasar pada web.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "2 April 2025",
  },
  {
    number: "Sesi 8",
    title: "JavaScript Part 2",
    topic: "DOM manipulation dan integrasi interaksi ke elemen website sebagai dasar pengembangan interaktivitas WebGIS.",
    tools: "VS Code, JS",
    pic: "Rifqi",
    outcome: "Mampu mengontrol elemen web secara dinamis sebagai dasar integrasi map.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "4 April 2025",
  },
  {
    number: "Sesi 9",
    title: "Introduction JavaScript Modern",
    topic: "Pengenalan JavaScript modern sebagai transisi menuju implementasi MapLibre GL JS, meliputi struktur code modern, async-await sederhana, fetch API data spasial, dan workflow integrasi web map.",
    tools: "VS Code, JS",
    pic: "Rifqi",
    outcome: "Menjadi transisi ke implementasi JavaScript modern pada pengembangan WebGIS.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "7 April 2025",
  },
  {
    number: "Sesi 10",
    title: "Introduction to WebMap & MapLibre Part 1",
    topic: "Konsep WebMap, cara kerja peta di web, serta inisialisasi MapLibre GL JS pada website.",
    tools: "MapLibre GL JS",
    pic: "Ahmad Faiz",
    outcome: "Mampu menampilkan peta dasar di web.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "9 April 2025",
  },
  {
    number: "Sesi 11",
    title: "Introduction to WebMap & MapLibre Part 2",
    topic: "Integrasi data spasial menggunakan GeoJSON/API, pengelolaan layer, dan styling dasar peta interaktif.",
    tools: "MapLibre + GEO MAPID API",
    pic: "Ahmad Faiz",
    outcome: "Mampu menampilkan data spasial sebagai layer di peta.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "11 April 2025",
  },
  {
    number: "Sesi 12",
    title: "Introduction to WebMap & MapLibre Part 3",
    topic: "Interaktivitas peta seperti popup, event klik, kontrol map, serta pengembangan feature interaktif pada WebGIS.",
    tools: "MapLibre GL JS",
    pic: "Ahmad Faiz",
    outcome: "Mampu membuat peta interaktif dengan user interaction.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "14 April 2025",
  },
  {
    number: "Sesi 13",
    title: "Feature Implementation Part 1",
    topic: "Implementasi Heatmap dan visualisasi densitas data spasial serta pengembangan feature berbasis user interaction.",
    tools: "MapLibre + Data API GEO",
    pic: "Ahmad Faiz",
    outcome: "Mampu membuat visualisasi heatmap dari data spasial serta memahami workflow code review dan debugging sederhana.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "16 April 2025",
  },
  {
    number: "Sesi 14",
    title: "Feature Implementation Part 2",
    topic: "Implementasi Radius/Buffer dan Isochrone Analysis menggunakan Turf JS serta refinement feature berbasis analisis spasial. Cursor AI digunakan untuk troubleshooting implementasi feature, pengecekan codebase, serta simulasi persiapan deployment.",
    tools: "MapLibre + Data API GEO + Turf JS + Cursor AI",
    pic: "Ahmad Faiz",
    outcome: "Mampu membuat analisis radius berbasis interaksi user dan memahami proses troubleshooting project sebelum deployment.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "18 April 2025",
  },
  {
    number: "Sesi 15",
    title: "WebGIS Code Refinement and Deployment",
    topic: "Peserta dikenalkan penggunaan Cursor AI untuk membantu deployment workflow, membaca error deployment, membantu pengecekan konfigurasi project, serta memberikan insight terkait kebutuhan codebase sebelum project dipublikasikan.",
    tools: "MapLibre + Github + Cursor AI",
    pic: "Ahmad Faiz",
    outcome: "Mampu melakukan finalisasi dan deployment project WebGIS sederhana dengan workflow modern development.",
    time: "19.00 - 21.30",
    status: "Upcoming",
    date: "21 April 2025",
  },
  {
    number: "Sesi 16 (Bonus 1)",
    title: "Python for Spatial Data",
    topic: "Pengenalan Python untuk pengolahan data spasial sederhana dan preprocessing data WebGIS.",
    tools: "VS CODE + GEO MAPID",
    pic: "Raden Pranantya",
    outcome: "Peserta memahami penggunaan Python sederhana untuk membantu workflow data spasial.",
    time: "08.30 - 11.30",
    status: "Upcoming",
    date: "26 April 2025",
  },
  {
    number: "Sesi 17 (Bonus 2)",
    title: "Spatial Analysis & Automation",
    topic: "Explorasi spatial analysis sederhana menggunakan library Python dan data GEO MAPID.",
    tools: "VS CODE + GEO MAPID",
    pic: "Raden Pranantya",
    outcome: "Peserta memahami potensi automation dan preprocessing data spasial menggunakan Python.",
    time: "08.30 - 11.30",
    status: "Upcoming",
    date: "3 May 2025",
  },
];

export default function ScheduleRules() {
  const [filter, setFilter] = useState<"All" | "Completed" | "Upcoming">("All");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const filteredSessions = BOOTCAMP_SESSIONS.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Completed") return s.status === "Completed";
    if (filter === "Upcoming") return s.status === "Upcoming" || s.status === "Today";
    return true;
  });

  // Helper to chunk sessions into rows of 4 for the snake timeline
  const chunkSessions = (sessions: Session[], size = 4) => {
    const chunks: Session[][] = [];
    for (let i = 0; i < sessions.length; i += size) {
      chunks.push(sessions.slice(i, i + size));
    }
    return chunks;
  };

  const parseDateString = (dateStr: string) => {
    if (!dateStr) return { day: "", month: "" };
    const parts = dateStr.split(" ");
    if (parts.length >= 2) {
      // Map English month to shorter/Indonesian form for aesthetics
      const monthMap: Record<string, string> = {
        March: "Maret",
        April: "April",
        May: "Mei",
        June: "Juni",
      };
      const translatedMonth = monthMap[parts[1]] || parts[1];
      return { day: parts[0], month: translatedMonth };
    }
    return { day: dateStr, month: "" };
  };

  const sessionRows = chunkSessions(filteredSessions, 4);

  return (
    <div className={styles.container}>
      {/* Page Title Header */}
      <div className={styles.pageHeader}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}><CalendarDays size={22} /> Schedule & Rules</h1>
        <p className={styles.pageSubtitle}>Pantau lini masa pertemuan bootcamp dan tata tertib akademik Anda.</p>
      </div>

      {/* Rules Section (Landscape) */}
      <div className={styles.rulesLandscape}>
        <div className={styles.rulesHeader}>
          <span className={styles.tag}>PENTING</span>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}><ScrollText size={18} /> Tata Tertib & Ketentuan Akademik</h3>
          <p className={styles.rulesIntro}>
            Harap patuhi ketentuan berikut demi kelancaran belajar dan pemenuhan syarat kelulusan sertifikasi WebGIS:
          </p>
        </div>

        <div className={styles.rulesGrid}>
          <div className={styles.ruleCard}>
            <span className={styles.ruleNum}>1</span>
            <h4>Penyelesaian Post Test</h4>
            <p>Post test wajib diisi setiap selesai mengikuti masing-masing sesi pertemuan.</p>
          </div>

          <div className={styles.ruleCard}>
            <span className={styles.ruleNum}>2</span>
            <h4>Konektivitas Tugas Terintegrasi</h4>
            <p>Tugas mingguan (Sesi 1-15) saling berkesinambungan membentuk final project berupa webgis mandiri.</p>
          </div>

          <div className={styles.ruleCard}>
            <span className={styles.ruleNum}>3</span>
            <h4>Evaluasi Logika Mandiri</h4>
            <p>Penilaian berfokus pada pemahaman sintaks. Penggunaan AI diperbolehkan sebagai asisten logika.</p>
          </div>

          <div className={styles.ruleCard}>
            <span className={styles.ruleNum}>4</span>
            <h4>Fokus Penilaian Portofolio</h4>
            <p>Portofolio dievaluasi atas: Storytelling, UI/UX Peta, fungsionalitas WebGIS, dan hasil deploy cloud.</p>
          </div>
        </div>

        {/* Horizontal Help Banner */}
        <div className={styles.helpBanner}>
          <div className={styles.helpText}>
            <h4>Butuh Bantuan Akademik?</h4>
            <p>Apabila berhalangan hadir atau terkendala teknis, segera hubungi tim fasilitator MAPID Academy:</p>
          </div>
          <div className={styles.helpContacts}>
            <div className={styles.helpContactItem}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><MessageCircle size={14} /> Farah (Fasilitator)</span>
            </div>
            <div className={styles.helpContactItem}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><MessageCircle size={14} /> Rofi (Fasilitator)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Live Class Card Banner (Extreme Visibility) */}
      <div className={styles.zoomLiveCard}>
        <div className={styles.zoomLiveHeader}>
          <div className={styles.zoomLiveBadge}>
            <span className={styles.pulseDot}></span>
            LIVE CLASS HARI INI
          </div>
          <span className={styles.zoomTimeBadge} style={{ display: "flex", alignItems: "center", gap: "5px" }}><Clock size={13} /> 19.00 - 21.30 WIB</span>
        </div>
        <div className={styles.zoomLiveContent}>
          <div className={styles.zoomLiveInfo}>
            <span className={styles.zoomSessionLabel}>SESI AKTIF SEKARANG</span>
            <h3>Sesi 5: Introduction to VS Code, Git, HTML, CSS, and JavaScript</h3>
            <p>Materi: Pengenalan workflow developer dengan VS Code & Git, struktur HTML, dan styling CSS dasar bersama Mentor Rifqi.</p>
          </div>
          <div className={styles.zoomLiveActions}>
            <a 
              href="https://zoom.us/j/88219283192?pwd=mapidacademy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.zoomLaunchBtn}
            >
              <Video size={15} /> Gabung Zoom Meeting Sekarang
            </a>
            <div className={styles.zoomMeta}>
              <span><strong>Meeting ID:</strong> 882 1928 3192</span>
              <span className={styles.separator}>•</span>
              <span><strong>Passcode:</strong> mapidacademy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Column (Landscape Roadmap) */}
      <div className={styles.scheduleColumn}>
        <div className={styles.scheduleHeader}>
          <div className={styles.scheduleHeaderLeft}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}><Map size={20} /> Rencana Kurikulum Detail (Roadmap Program)</h2>
            <p>Klik pada kartu pertemuan untuk melihat target capaian (outcome), tools, dan detail materi lengkap:</p>
          </div>
          
          <div className={styles.filterBar}>
            <button 
              className={`${styles.filterBtn} ${filter === "All" ? styles.activeFilter : ""}`}
              onClick={() => setFilter("All")}
            >
              Semua ({BOOTCAMP_SESSIONS.length})
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === "Completed" ? styles.activeFilter : ""}`}
              onClick={() => setFilter("Completed")}
            >
              Selesai
            </button>
            <button 
              className={`${styles.filterBtn} ${filter === "Upcoming" ? styles.activeFilter : ""}`}
              onClick={() => setFilter("Upcoming")}
            >
              Mendatang
            </button>
          </div>
        </div>

        {/* Snaking Horizontal Timeline */}
        <div className={styles.timeline}>
          {sessionRows.map((row, rowIndex) => {
            const isRowReverse = rowIndex % 2 === 1;
            const isLastRow = rowIndex === sessionRows.length - 1;

            // Determine turning connections
            let turnClass = "";
            if (!isLastRow) {
              turnClass = isRowReverse ? styles.turnLeft : styles.turnRight;
            }

            // Calculate line bounds for the horizontal connector line
            const rowStyle = {} as any;
            if (isLastRow) {
              const N = row.length;
              if (N === 1) {
                rowStyle["--row-line-display"] = "none";
              } else {
                if (isRowReverse) {
                  // Right-to-left: starts at Column 4 (right: 12.5%) and goes to Column (4 - N + 1)
                  // left is 100% - (12.5% + (N - 1) * 25%)
                  rowStyle["--row-line-right"] = "12.5%";
                  rowStyle["--row-line-left"] = `${100 - (12.5 + (N - 1) * 25)}%`;
                } else {
                  // Left-to-right: starts at Column 1 (left: 12.5%) and goes to Column N
                  // right is 100% - (12.5% + (N - 1) * 25%)
                  rowStyle["--row-line-left"] = "12.5%";
                  rowStyle["--row-line-right"] = `${100 - (12.5 + (N - 1) * 25)}%`;
                }
              }
            }

            return (
              <div 
                key={rowIndex} 
                className={`${styles.timelineRow} ${isRowReverse ? styles.timelineRowReverse : styles.timelineRowNormal} ${turnClass}`}
                style={rowStyle}
              >
                {row.map((session, sessionIdx) => {
                  const { day, month } = parseDateString(session.date);
                  
                  return (
                    <div 
                      key={sessionIdx} 
                      className={`${styles.sessionCard} ${styles[session.status.toLowerCase()]} ${session.status === "Today" ? styles.todayCardHighlighted : ""} btn-hover`}
                      onClick={() => setSelectedSession(session)}
                    >
                      <div className={styles.cardMain}>
                        <div className={styles.cardTop}>
                          <div className={`${styles.dateBadge} ${styles[session.status.toLowerCase()]}`}>
                            <span className={styles.sessionLabel}>{session.number.split(" ")[0] + " " + session.number.split(" ")[1]}</span>
                            <span className={styles.dateDay}>{day}</span>
                            <span className={styles.dateMonth}>{month}</span>
                          </div>
                          <div className={styles.cardHeaderInfo}>
                            <h4 className={styles.sessionTitle}>{session.title}</h4>
                            <span className={`${styles.statusBadge} ${styles[session.status.toLowerCase()]}`}>
                              {session.status === "Today" ? <><Zap size={10} /> HARI INI</> : session.status === "Completed" ? <><CheckCircle2 size={10} /> SELESAI</> : <><Timer size={10} /> MENDATANG</>}
                            </span>
                          </div>
                        </div>
                        <p className={styles.sessionTopic}>{session.topic}</p>
                        
                        {/* Inline Zoom Link inside Today's card to make it super visible */}
                        {session.status === "Today" && (
                          <div className={styles.cardZoomWrapper} onClick={(e) => e.stopPropagation()}>
                            <a 
                              href="https://zoom.us/j/88219283192?pwd=mapidacademy" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={styles.cardZoomBtn}
                            >
                              <Video size={13} /> Masuk Kelas Zoom
                            </a>
                            <div className={styles.cardZoomCredentials}>
                              <span>ID: 882 1928 3192</span>
                              <span>PW: mapidacademy</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.cardFooter}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Wrench size={11} /><span className={styles.footerVal}>{session.tools.split(",")[0]}</span></span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><User size={11} /><span className={styles.footerVal}>{session.pic.split(" ")[0]}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal Popup */}
      {selectedSession && (
        <div className={styles.modalOverlay} onClick={() => setSelectedSession(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedSession(null)}>×</button>
            <div className={styles.modalHeader}>
              <div className={`${styles.dateBadge} ${styles[selectedSession.status.toLowerCase()]}`}>
                <span className={styles.sessionLabel}>{selectedSession.number}</span>
                <span className={styles.dateDay}>{parseDateString(selectedSession.date).day}</span>
                <span className={styles.dateMonth}>{parseDateString(selectedSession.date).month}</span>
              </div>
              <div className={styles.modalHeaderInfo}>
                <span className={`${styles.statusBadge} ${styles[selectedSession.status.toLowerCase()]}`}>
                  {selectedSession.status === "Today" ? <><Zap size={10} /> HARI INI</> : selectedSession.status === "Completed" ? <><CheckCircle2 size={10} /> SELESAI</> : <><Timer size={10} /> MENDATANG</>}
                </span>
                <h3 className={styles.modalTitle}>{selectedSession.title}</h3>
              </div>
            </div>
            
            <div className={styles.modalBody}>
              {/* Highlight Zoom Link inside Modal if Today */}
              {selectedSession.status === "Today" && (
                <div className={styles.modalZoomSection}>
                  <div className={styles.modalZoomHeader}>
                    <span className={styles.pulseDot}></span>
                    <strong>KELAS LIVE SEDANG BERLANGSUNG</strong>
                  </div>
                  <p>Silakan klik tombol di bawah ini untuk bergabung langsung ke Zoom Meeting kelas hari ini:</p>
                  <a 
                    href="https://zoom.us/j/88219283192?pwd=mapidacademy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.modalZoomBtn}
                  >
                    <Video size={14} /> Gabung Zoom Meeting
                  </a>
                  <div className={styles.modalZoomCredentials}>
                    <span><strong>Meeting ID:</strong> 882 1928 3192</span>
                    <span className={styles.modalSeparator}>•</span>
                    <span><strong>Passcode:</strong> mapidacademy</span>
                  </div>
                </div>
              )}

              <div className={styles.modalSection}>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px" }}><Target size={14} /> Fokus Utama Pertemuan:</strong>
                <p>{selectedSession.topic}</p>
              </div>
              <div className={styles.modalSection}>
                <strong style={{ display: "flex", alignItems: "center", gap: "6px" }}><GraduationCap size={14} /> Capaian Hasil Belajar (Outcome):</strong>
                <p>{selectedSession.outcome}</p>
              </div>
              <div className={styles.modalGrid}>
                <div className={styles.modalGridCell}>
                  <strong style={{ display: "flex", alignItems: "center", gap: "5px" }}><Wrench size={13} /> Alat (Tools):</strong>
                  <p>{selectedSession.tools}</p>
                </div>
                <div className={styles.modalGridCell}>
                  <strong style={{ display: "flex", alignItems: "center", gap: "5px" }}><User size={13} /> Mentor (PIC):</strong>
                  <p>{selectedSession.pic}</p>
                </div>
                <div className={styles.modalGridCell}>
                  <strong style={{ display: "flex", alignItems: "center", gap: "5px" }}><Clock size={13} /> Waktu Kelas:</strong>
                  <p>{selectedSession.time} WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
