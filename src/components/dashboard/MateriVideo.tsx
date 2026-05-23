"use client";

import { useState } from "react";
import { BookOpen, Video, FolderOpen } from "lucide-react";
import styles from "./MateriVideo.module.css";

interface SessionMateri {
  id: number;
  number: string;
  title: string;
  category: "Concept" | "Frontend" | "WebMap" | "Python" | "Event";
  materiUrl: string;
  playlistUrl: string;
  youtubeId?: string;
  topics: string[];
}

const YOUTUBE_PLAYLIST = "https://www.youtube.com/@mapid_official";

const MATERI_LIST: SessionMateri[] = [
  {
    id: 1, number: "Sesi 1", title: "Onboarding Program", category: "Concept",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Sistem administrasi program", "Tata cara pengumpulan tugas", "Ketentuan sertifikat kelulusan"]
  },
  {
    id: 2, number: "Sesi 2", title: "Get to Know WebGIS", category: "Concept",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Apa itu WebGIS & Learning Journey", "Industry Real Case dari Mentor", "Potensi Karir Praktisi WebGIS"]
  },
  {
    id: 3, number: "Sesi 3", title: "GIS Fundamental", category: "Concept",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-3",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Konsep GIS & datum koordinat (WGS84)", "Vektor vs Raster & format data spasial", "GeoJSON, Shapefile & QGIS singkat"]
  },
  {
    id: 4, number: "Sesi 4", title: "Location Value with GEO MAPID", category: "Concept",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-4",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Digitasi & import data spasial online", "GEO MAPID sebagai Cloud Database Spasial", "Pengenalan REST API Endpoint MAPID"]
  },
  {
    id: 5, number: "Sesi 5", title: "Introduction to VS Code, Git, HTML, CSS, and JavaScript", category: "Frontend",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-5",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["VS Code setup & Git/GitHub workflow", "Struktur tag HTML5 dasar website", "CSS selectors, styling & Add to PATH"]
  },
  {
    id: 6, number: "Sesi 6", title: "HTML and CSS Part 2", category: "Frontend",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-6",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Flexbox & CSS Grid — dashboard layout", "CSS Tailwind utility classes", "Stitch AI sebagai referensi visual UI"]
  },
  {
    id: 7, number: "Sesi 7", title: "JavaScript Part 1", category: "Frontend",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-7",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Variable (let, const) & tipe data", "Logic, loop & conditional statement", "Function & Arrow Function ES6"]
  },
  {
    id: 8, number: "Sesi 8", title: "JavaScript Part 2", category: "Frontend",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-8",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["DOM Manipulation & querySelector", "addEventListener & Click/Submit events", "Dasar integrasi dinamis elemen web"]
  },
  {
    id: 9, number: "Sesi 9", title: "Introduction JavaScript Modern", category: "Frontend",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-9",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Async/Await & Promise handling", "Fetch API untuk data spasial GeoJSON", "Workflow integrasi modern menuju MapLibre"]
  },
  {
    id: 10, number: "Sesi 10", title: "Introduction to WebMap & MapLibre Part 1", category: "WebMap",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-10",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Konsep WebMap & cara kerja peta di web", "Inisialisasi MapLibre GL JS", "Basemap tiles, Zoom & Center koordinat"]
  },
  {
    id: 11, number: "Sesi 11", title: "Introduction to WebMap & MapLibre Part 2", category: "WebMap",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-11",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Integrasi data spasial GeoJSON/API", "addSource & addLayer — fill, line, circle", "Styling layer & color expressions"]
  },
  {
    id: 12, number: "Sesi 12", title: "Introduction to WebMap & MapLibre Part 3", category: "WebMap",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-12",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Interactive Popup & setHTML", "Event klik layer & queryRenderedFeatures", "NavigationControl & map custom controls"]
  },
  {
    id: 13, number: "Sesi 13", title: "Feature Implementation Part 1", category: "WebMap",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-13",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Heatmap density layer & heatmap-radius", "Gradien warna & heatmap-weight atribut", "Debugging workflow & code review"]
  },
  {
    id: 14, number: "Sesi 14", title: "Feature Implementation Part 2", category: "WebMap",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-14",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Radius/Buffer analisis via Turf.js", "Isochrone Analysis — jangkauan jalan nyata", "Cursor AI untuk troubleshooting codebase"]
  },
  {
    id: 15, number: "Sesi 15", title: "WebGIS Code Refinement and Deployment", category: "WebMap",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-15",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Cursor AI — deployment workflow & error check", "Netlify / GitHub Pages / Vercel deployment", "Final WebGIS portfolio-ready check"]
  },
  {
    id: 16, number: "Sesi 16 (Bonus 1)", title: "Python for Spatial Data", category: "Python",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/bonus-1",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Pengenalan GeoPandas & Shapely", "Pre-processing data spasial WebGIS", "gpd.read_file() & to_file() GeoJSON"]
  },
  {
    id: 17, number: "Sesi 17 (Bonus 2)", title: "Spatial Analysis & Automation", category: "Python",
    materiUrl: "https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/bonus-2",
    playlistUrl: YOUTUBE_PLAYLIST, youtubeId: "dQw4w9WgXcQ",
    topics: ["Spatial analysis library Python", "Script ETL & automation preprocessing", "Integrasi output Python ke GEO MAPID"]
  }
];

const CATEGORY_COLOR: Record<string, string> = {
  Concept: "#3b82f6",
  Frontend: "#8b5cf6",
  WebMap: "#22c55e",
  Python: "#f59e0b",
};

export default function MateriVideo() {
  const [filter, setFilter] = useState<"All" | "Concept" | "Frontend" | "WebMap" | "Python">("All");

  const filteredMateri = MATERI_LIST.filter(m =>
    filter === "All" ? true : m.category === filter
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FolderOpen size={22} />
          Materi & Video Rekaman
        </h2>
        <p>Akses materi GitHub dan video rekaman pertemuan live Zoom/Discord kelas WebGIS Batch 3.</p>

        <div className={styles.filterBar}>
          {(["All", "Concept", "Frontend", "WebMap", "Python"] as const).map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat === "All" ? "Semua Modul" : cat === "Concept" ? "GIS Konseptual" : cat === "Frontend" ? "Web Frontend" : cat === "WebMap" ? "Interactive WebMap" : "Python GIS"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.materiGrid}>
        {filteredMateri.map(materi => (
          <div key={materi.id} className={styles.card}>
            {/* Thumbnail */}
            <div className={styles.thumbnailWrapper}>
              {materi.youtubeId ? (
                <img
                  src={`https://img.youtube.com/vi/${materi.youtubeId}/hqdefault.jpg`}
                  alt={materi.title}
                  className={styles.thumbnail}
                />
              ) : (
                <div className={styles.thumbnailPlaceholder} />
              )}
              <div className={styles.thumbnailOverlay}>
                <span
                  className={styles.categoryPill}
                  style={{ background: CATEGORY_COLOR[materi.category] }}
                >
                  {materi.category}
                </span>
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.cardMeta}>
                <span className={styles.sessionNum}>{materi.number}</span>
              </div>
              <h3 className={styles.cardTitle}>{materi.title}</h3>

              <div className={styles.topicsBox}>
                {materi.topics.map((topic, idx) => (
                  <span key={idx} className={styles.topicTag}>• {topic}</span>
                ))}
              </div>

              <div className={styles.cardActions}>
                <a
                  href={materi.materiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <BookOpen size={13} /> Materi <span>↗</span>
                </a>
                <a
                  href={materi.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}
                >
                  <Video size={13} /> Tonton Rekaman
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
