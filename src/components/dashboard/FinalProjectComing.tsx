"use client";

import { Trophy, ClipboardList, Lightbulb, Map, Palette, Brain, Hourglass } from "lucide-react";
import styles from "./FinalProjectComing.module.css";

export default function FinalProjectComing() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Trophy size={22} />
          Final Project WebGIS
        </h2>
        <p>Unjuk karya akhir produk WebGIS interaktif tingkat industri yang layak menjadi portofolio unggulan Anda.</p>
      </div>

      {/* Coming Soon — Submission Checklist */}
      <div className={styles.submissionSection}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "48px 24px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", background: "#f1f5f9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Hourglass size={28} color="#94a3b8" />
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)", marginBottom: "6px" }}>
              Status Pengumpulan Final Project
            </h3>
            <p style={{ fontSize: "13.5px", color: "#64748b", maxWidth: "420px" }}>
              Checklist pengumpulan WebGIS final project peserta akan dibuka saat mendekati akhir program. Pantau terus halaman ini!
            </p>
          </div>
          <span style={{ background: "#f1f5f9", color: "#94a3b8", fontSize: "10px", fontWeight: 800, padding: "4px 12px", borderRadius: "100px", letterSpacing: "1px" }}>
            COMING SOON
          </span>
        </div>
      </div>

      {/* Minimum Requirements & Rules */}
      <div className={styles.requirementsSection}>
        <div className={styles.requirementsCard}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ClipboardList size={18} />
            Output Minimum WebGIS
          </h3>
          <p className={styles.sectionIntro}>Setiap proyek akhir peserta wajib memenuhi kriteria minimum di bawah ini untuk dinyatakan lulus:</p>

          <div className={styles.bulletList}>
            <div className={styles.bulletItem}>
              <span className={styles.bulletNum}>1</span>
              <div>
                <h5>Landing Page / Dashboard</h5>
                <p>Halaman web pembungkus peta yang rapi, informatif, dan responsif ketika diakses di handphone/tablet.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <span className={styles.bulletNum}>2</span>
              <div>
                <h5>WebMap Interaktif</h5>
                <p>Peta dasar menggunakan MapLibre GL JS lengkap dengan fitur navigasi zoom, panning, dan pointer.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <span className={styles.bulletNum}>3</span>
              <div>
                <h5>Integrasi Cloud Database Spasial</h5>
                <p>Data peta dimuat langsung secara dinamis menggunakan REST API Endpoint GEO MAPID pribadi Anda.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <span className={styles.bulletNum}>4</span>
              <div>
                <h5>Minimal 1 Fitur Analisis Spasial</h5>
                <p>Menampilkan analisis spasial fungsional seperti: Popup detail, Heatmap densitas, Buffer radius Turf.js, atau jangkauan Isochrone.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <span className={styles.bulletNum}>5</span>
              <div>
                <h5>Public Live Deployment</h5>
                <p>Aplikasi web harus di-deploy ke publik secara online (Netlify / GitHub Pages / Vercel) dan dapat diakses kapan saja.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.focusCard}>
          <span className={styles.focusLabel}>FOKUS UTAMA MENTOR</span>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Lightbulb size={17} />
            Fokus Penilaian Portfolio
          </h3>
          <p className={styles.focusIntro}>Tim juri dan mentor MAPID Academy akan menilai proyek Anda berdasarkan kriteria industri riil:</p>

          <div className={styles.focusItems}>
            <div className={styles.focusItem}>
              <h5 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Map size={14} /> Industry Relevance &amp; Use Case
              </h5>
              <p>Seberapa relevan solusi WebGIS Anda untuk menyelesaikan permasalahan nyata di lapangan (bukan sekadar tugas syntax).</p>
            </div>

            <div className={styles.focusItem}>
              <h5 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Palette size={14} /> UI/UX &amp; Visual Clarity
              </h5>
              <p>Kerapian layout dashboard, harmoni pilihan warna peta, kenyamanan popup, dan keterbacaan data spasial oleh user.</p>
            </div>

            <div className={styles.focusItem}>
              <h5 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Brain size={14} /> Coding Logic &amp; Reasoning
              </h5>
              <p>Struktur penulisan kode yang bersih (clean code) dan pemahaman reasoning di balik implementasi fitur (bukan salin tempel AI penuh).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
