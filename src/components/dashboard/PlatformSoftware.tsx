"use client";

import React, { useState, useEffect } from "react";
import { Wrench, List, Copy, Check, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { SoftwareRow } from "@/lib/supabase";
import styles from "./PlatformSoftware.module.css";

const LOGOS: Record<string, React.ReactElement> = {
  qgis: (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="#589632" aria-hidden="true">
      <path d="M12.879 13.006v3.65l-3.004-3.048v-3.495h3.582l2.852 2.893h-3.43zm10.886 7.606V24h-3.654l-5.73-5.9v-3.55h3.354l6.03 6.062zm-10.828-1.448l3.372 3.371c-1.309.442-2.557.726-4.325.726C5.136 23.26 0 18.243 0 11.565 0 4.92 5.136 0 11.984 0 18.864 0 24 4.952 24 11.565c0 2.12-.523 4.076-1.457 5.759l-3.625-3.725a8.393 8.393 0 0 0 .24-2.005c0-4.291-3.148-7.527-7.1-7.527-3.954 0-7.248 3.236-7.248 7.527s3.33 7.6 7.247 7.6c.548 0 .661.017.88-.03z"/>
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="#007ACC" aria-hidden="true">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="#181717" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
};

export default function PlatformSoftware() {
  const [softwareList, setSoftwareList] = useState<SoftwareRow[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("academy_config_software")
        .select("*")
        .order("sort_order");

      if (data) {
        const parsed = (data as SoftwareRow[]).map((s) => ({
          ...s,
          guide_steps: Array.isArray(s.guide_steps) ? s.guide_steps : [],
        }));
        setSoftwareList(parsed);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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
          <Wrench size={22} />
          Platform & Panduan Software
        </h2>
        <p>Instalasi toolchain developer penting untuk menunjang kelancaran materi coding WebGIS Batch 3.</p>
      </div>

      <div className={styles.accordionList}>
        {softwareList.map((software) => {
          const isOpen = openId === software.software_key;
          return (
            <div key={software.software_key} className={`${styles.accordionCard} ${isOpen ? styles.accordionOpen : ""}`}>
              <button className={styles.accordionHeader} onClick={() => toggleOpen(software.software_key)}>
                <div className={styles.accordionLeft}>
                  <span className={styles.softwareIcon}>
                    {software.software_key === "geomapid" ? (
                      <svg viewBox="0 0 100 100" width="36" height="36">
                        <path d="M10,50 L75,5 L80,55 Z" fill="#3884c7" />
                        <path d="M10,50 L50,55 L62,85 Z" fill="#165da6" />
                        <path d="M50,55 L80,55 L86,90 L62,85 Z" fill="#94cb5a" />
                      </svg>
                    ) : (
                      LOGOS[software.software_key] || <Wrench size={36} />
                    )}
                  </span>
                  <div>
                    <span className={styles.softwareName}>{software.name}</span>
                    <span className={styles.versionBadge}>{software.version}</span>
                  </div>
                </div>
                <div className={styles.accordionRight}>
                  <span className={styles.accordionDesc}>{software.description}</span>
                  <span className={styles.chevron}>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                </div>
              </button>

              {isOpen && (
                <div className={styles.accordionBody}>
                  <div className={styles.guideBox}>
                    <h4 style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <List size={15} />
                      Langkah Instalasi / Setup:
                    </h4>
                    <ol className={styles.stepsList}>
                      {software.guide_steps.map((step: string, idx: number) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {software.redeem_code && (
                    <div className={styles.redeemBox}>
                      <span className={styles.redeemLabel}>KODE AKSES BOOTCAMP</span>
                      <div className={styles.redeemCode}>
                        <span className={styles.codeText}>{software.redeem_code}</span>
                        <button onClick={() => handleCopy(software.redeem_code, software.software_key)} className={styles.copyBtn}>
                          {copiedId === software.software_key ? <><Check size={12} /> Tersalin</> : <><Copy size={12} /> Salin</>}
                        </button>
                      </div>
                      <p className={styles.redeemNote}>Masukkan kode ini di menu Redeem Code setelah membuat akun GEO MAPID.</p>
                    </div>
                  )}

                  {software.test_command && (
                    <div className={styles.terminalBox}>
                      <div className={styles.terminalHeader}>
                        <span>Terminal Test Command</span>
                        <button onClick={() => handleCopy(software.test_command, software.software_key)} className={styles.copyBtn}>
                          {copiedId === software.software_key ? <><Check size={12} /> Tersalin</> : <><Copy size={12} /> Salin</>}
                        </button>
                      </div>
                      <code>{software.test_command}</code>
                    </div>
                  )}

                  <a href={software.download_url} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                    {software.software_key === "geomapid" ? "Buka Platform GEO MAPID" : "Unduh Resminya"} <span>&#x2197;</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
