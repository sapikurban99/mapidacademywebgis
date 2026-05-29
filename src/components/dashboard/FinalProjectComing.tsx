"use client";

import { useState, useEffect } from "react";
import { Trophy, ClipboardList, Lightbulb, Map, Palette, Brain, Hourglass, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { FinalProjectRow } from "@/lib/supabase";
import styles from "./FinalProjectComing.module.css";

interface RequirementItem {
  title: string;
  desc: string;
}

interface FinalProjectSection {
  title: string;
  description: string;
  items: RequirementItem[];
}

export default function FinalProjectComing() {
  const [requirements, setRequirements] = useState<FinalProjectSection | null>(null);
  const [criteria, setCriteria] = useState<FinalProjectSection | null>(null);
  const [submissions, setSubmissions] = useState<FinalProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [reqRes, critRes, subRes] = await Promise.all([
        supabase.from("academy_config_final_project").select("*").eq("section_key", "requirements").single(),
        supabase.from("academy_config_final_project").select("*").eq("section_key", "criteria").single(),
        supabase.from("academy_final_projects").select("*").order("submitted_at", { ascending: false }),
      ]);

      if (reqRes.data?.content) {
        setRequirements(reqRes.data.content as FinalProjectSection);
      }
      if (critRes.data?.content) {
        setCriteria(critRes.data.content as FinalProjectSection);
      }
      if (subRes.data) {
        setSubmissions(subRes.data as FinalProjectRow[]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={styles.container} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
        <Loader2 size={28} style={{ animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2><Trophy size={22} /> Final Project WebGIS</h2>
        <p>Rekapitulasi pengumpulan final project peserta WebGIS Bootcamp Batch 3.</p>
      </div>

      {submissions.length > 0 ? (
        <div className={styles.submissionSection}>
          <div className={styles.cardHeader}>
            <h3>Status Pengumpulan Final Project</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.submissionTable}>
              <thead>
                <tr>
                  <th>Peserta</th>
                  <th>Tanggal Submit</th>
                  <th>Link Project</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.participant}>
                    <td><strong>{s.participant}</strong></td>
                    <td>{s.submitted_at ? new Date(s.submitted_at).toLocaleDateString("id-ID") : "-"}</td>
                    <td>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <ExternalLink size={12} /> Lihat Project
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
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
      )}

      <div className={styles.requirementsSection}>
        {requirements && (
          <div className={styles.requirementsCard}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ClipboardList size={18} />
              {requirements.title}
            </h3>
            <p className={styles.sectionIntro}>{requirements.description}</p>

            <div className={styles.bulletList}>
              {requirements.items.map((item, idx) => (
                <div key={idx} className={styles.bulletItem}>
                  <span className={styles.bulletNum}>{idx + 1}</span>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {criteria && (
          <div className={styles.focusCard}>
            <span className={styles.focusLabel}>FOKUS UTAMA MENTOR</span>
            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Lightbulb size={17} />
              {criteria.title}
            </h3>
            <p className={styles.focusIntro}>{criteria.description}</p>

            <div className={styles.focusItems}>
              {criteria.items.map((item, idx) => (
                <div key={idx} className={styles.focusItem}>
                  <h5 style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {idx === 0 ? <Map size={14} /> : idx === 1 ? <Palette size={14} /> : <Brain size={14} />}
                    {item.title}
                  </h5>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
