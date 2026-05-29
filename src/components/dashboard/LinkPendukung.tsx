"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Link2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { LinkRow } from "@/lib/supabase";
import styles from "./LinkPendukung.module.css";

export default function LinkPendukung() {
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("academy_config_links").select("*").order("sort_order").then(({ data }) => {
      setLinks((data as LinkRow[]) || []);
      setLoading(false);
    });
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
        <h2><Link2 size={20} /> Link Pendukung</h2>
        <p>Kumpulan tautan tambahan yang dibutuhkan selama mengikuti WebGIS Development Bootcamp Batch 3.</p>
      </div>

      {links.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
          Belum ada link yang ditambahkan oleh admin.
        </div>
      ) : (
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thNo}>No</th>
                <th>Deskripsi</th>
                <th className={styles.thLink}>Link</th>
              </tr>
            </thead>
            <tbody>
              {links.map((item, i) => (
                <tr key={item.id || i}>
                  <td className={styles.tdNo}>{i + 1}</td>
                  <td className={styles.tdDesc}>{item.title}</td>
                  <td className={styles.tdLink}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                      <ExternalLink size={13} /> Buka Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
