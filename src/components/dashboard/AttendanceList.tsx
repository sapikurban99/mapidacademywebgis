"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Lightbulb, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { AttendanceRow, ParticipantRow } from "@/lib/supabase";
import styles from "./AttendanceList.module.css";

type AttendanceMap = Record<string, Record<number, boolean>>;

export default function AttendanceList() {
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<AttendanceMap>({});
  const [totalSessions, setTotalSessions] = useState(17);
  const [attendanceLink, setAttendanceLink] = useState("https://forms.gle/mapid-academy-attendance");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [partRes, attRes, cfgRes] = await Promise.all([
        supabase.from("academy_config_participants").select("*").order("sort_order"),
        supabase.from("academy_attendance").select("participant, session_no, attended").order("session_no"),
        supabase.from("academy_site_config").select("key,value").in("key", ["total_absensi_sessions", "attendance_link"]),
      ]);

      const parts = (partRes.data ?? []) as ParticipantRow[];
      setParticipants(parts);

      if (cfgRes.data) {
        cfgRes.data.forEach((r: { key: string; value: string }) => {
          if (r.key === "total_absensi_sessions") {
            const n = parseInt(r.value, 10);
            if (n > 0) setTotalSessions(n);
          }
          if (r.key === "attendance_link" && r.value) {
            setAttendanceLink(r.value);
          }
        });
      }

      const map: AttendanceMap = {};
      parts.forEach((p) => { map[p.name] = {}; });

      (attRes.data ?? []).forEach((row: AttendanceRow) => {
        if (map[row.participant]) {
          map[row.participant][row.session_no] = row.attended;
        }
      });

      setAttendanceMap(map);
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
        <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ClipboardList size={22} />
          Rekapitulasi Absensi Kehadiran
        </h2>
        <p>Hasil rekapan data kehadiran seluruh peserta program WebGIS Development Bootcamp MAPID Academy.</p>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>Pengisian Absensi Kelas</span>
          <h3 className={styles.cardTitle}>Isi Kehadiran Sesi Sekarang</h3>
          <p className={styles.cardDesc}>
            Silakan klik tautan tombol di bawah ini untuk mengisi absensi kehadiran kelas hari ini melalui formulir resmi MAPID Academy.
          </p>
          <a href={attendanceLink} target="_blank" rel="noopener noreferrer" className={styles.fillAttendanceBtn}>
            Isi Absensi Sekarang
          </a>
        </div>

        <div className={`${styles.summaryCard} ${styles.infoCard}`}>
          <div className={styles.infoCardHeader}>
            <Lightbulb size={18} className={styles.infoIcon} />
            <h3>Aspek Penilaian Keaktifan</h3>
          </div>
          <p className={styles.statusDesc}>
            Absensi kehadiran sangat penting karena akan menjadi aspek penilaian utama untuk keaktifan peserta selama mengikuti program WebGIS Development Bootcamp MAPID Academy. Pastikan Anda mengisi kehadiran setiap sesi.
          </p>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h3>Checklist Rekapitulasi Kehadiran Peserta</h3>
          <p>Daftar lengkap absensi per pertemuan yang dihimpun dari pengisian presensi peserta harian.</p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th className={styles.stickyCol}>Peserta</th>
                {Array.from({ length: totalSessions }).map((_, i) => (
                  <th key={i}>Sesi {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.name}>
                  <td className={styles.stickyCol}>
                    <span>{p.name}</span>
                  </td>
                  {Array.from({ length: totalSessions }).map((_, i) => {
                    const sessionNo = i + 1;
                    const isPresent = !!(attendanceMap[p.name]?.[sessionNo]);
                    return (
                      <td key={i} style={{ textAlign: "center" }}>
                        {isPresent ? (
                          <span className={styles.presentBadge}>&#10003;</span>
                        ) : (
                          <span className={styles.absentBadge}>-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
