"use client";

import { useState, useEffect } from "react";
import { Trophy, Search, RefreshCw, Crown } from "lucide-react";
import styles from "./leaderboard.module.css";
import { LEADERBOARD_DATA, Participant } from "@/lib/mock-data";

interface CombinedParticipant extends Participant {
  isUser?: boolean;
}

export default function LeaderboardPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboard, setLeaderboard] = useState<CombinedParticipant[]>([]);
  const [hasUserStats, setHasUserStats] = useState(false);

  useEffect(() => {
    // 1. Load User Data
    const savedHighScore = localStorage.getItem("mapid_quiz_highscore");
    const savedAttempts = localStorage.getItem("mapid_quiz_attempts");
    const savedBadges = localStorage.getItem("mapid_quiz_badges");

    const attempts = savedAttempts ? parseInt(savedAttempts, 10) : 0;
    const highScore = savedHighScore ? parseInt(savedHighScore, 10) : 0;

    let userParticipant: CombinedParticipant | null = null;
    let localHasUserStats = false;
    const userBadgesList: string[] = [];

    if (attempts > 0) {
      localHasUserStats = true;
      
      // Map user local badge IDs to mock badge strings
      try {
        if (savedBadges) {
          const parsed = JSON.parse(savedBadges) as string[];
          if (parsed.includes("perfect")) userBadgesList.push("Top Performer");
          if (parsed.includes("speed")) userBadgesList.push("Fast Submission");
          if (parsed.includes("consistent") && !userBadgesList.includes("Consistent Learner")) {
            userBadgesList.push("Consistent Learner");
          }
        }
      } catch (e) {
        console.error(e);
      }

      // Map score out of 100 to the 1250 leaderboard scale
      const scaledScore = Math.round((highScore / 100) * 1250);

      userParticipant = {
        rank: 0,
        name: "Anda (You)",
        score: scaledScore,
        badges: userBadgesList,
        isUser: true
      };
    }

    // 2. Combine and Sort
    const initialList: CombinedParticipant[] = [...LEADERBOARD_DATA];
    if (userParticipant) {
      initialList.push(userParticipant);
    }

    // Sort descending by score
    const sorted = initialList.sort((a, b) => b.score - a.score);

    // Re-assign ranks based on sorted position
    const withRank = sorted.map((p, idx) => ({
      ...p,
      rank: idx + 1
    }));

    const timer = setTimeout(() => {
      setHasUserStats(localHasUserStats);
      setLeaderboard(withRank);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh progres belajar dan riwayat nilai Anda?")) {
      localStorage.removeItem("mapid_quiz_highscore");
      localStorage.removeItem("mapid_quiz_attempts");
      localStorage.removeItem("mapid_quiz_badges");
      localStorage.removeItem("mapid_quiz_completed");
      
      // Reset state and restore original mock data
      const restored = LEADERBOARD_DATA.map((p, idx) => ({
        ...p,
        rank: idx + 1
      }));
      setLeaderboard(restored);
      setHasUserStats(false);
    }
  };

  if (!mounted) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Papan Peringkat MAPID Academy</h1>
          <p>Memuat papan peringkat...</p>
        </div>
      </div>
    );
  }

  // Filter based on search query
  const filteredLeaderboard = leaderboard.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split into Top 3 podium and Ranks 4+ when no active search query
  const showPodium = searchQuery === "" && filteredLeaderboard.length >= 3;
  const podiumWinners = showPodium ? filteredLeaderboard.slice(0, 3) : [];
  const remainingParticipants = showPodium ? filteredLeaderboard.slice(3) : filteredLeaderboard;

  // Podium order: 2nd place, 1st place, 3rd place for physical layout
  const firstPlace = podiumWinners.find((p) => p.rank === 1);
  const secondPlace = podiumWinners.find((p) => p.rank === 2);
  const thirdPlace = podiumWinners.find((p) => p.rank === 3);

  // Helper to match badges to corresponding styled classes
  const getBadgeStyle = (badgeName: string) => {
    switch (badgeName) {
      case "Top Performer":
        return styles.badgeGold;
      case "Consistent Learner":
        return styles.badgePurple;
      case "Fast Submission":
        return styles.badgeBlue;
      default:
        return styles.badgeSilver;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}><Trophy size={24} /> Papan Skor WebGIS Bootcamp</h1>
        <p>
          Uji pemahaman spasial Anda di Post Test dan raih posisi teratas! Papan peringkat 
          menggabungkan data peserta bootcamp MAPID Academy secara real-time.
        </p>
      </div>

      {/* Physical Podium (Only displayed when there's no active search filter) */}
      {showPodium && (
        <div className={styles.podiumContainer}>
          {/* 2nd Place (Left) */}
          {secondPlace && (
            <div className={`${styles.podiumCard} ${styles.silverCard}`}>
              <div className={styles.badgeTrophy}>2</div>
              <div className={styles.podiumName}>
                {secondPlace.name}
                {secondPlace.isUser && <span className={styles.userTag}>Anda</span>}
              </div>
              <div className={styles.podiumScore}>{secondPlace.score}</div>
              <div className={styles.podiumScoreLabel}>Poin</div>
              <div className={styles.podiumBadges}>
                {secondPlace.badges.map((b, i) => (
                  <span key={i} className={styles.miniBadge}>{b}</span>
                ))}
              </div>
            </div>
          )}

          {/* 1st Place (Middle - Higher) */}
          {firstPlace && (
            <div className={`${styles.podiumCard} ${styles.goldCard}`}>
              <div className={styles.badgeTrophy}><Crown size={22} /></div>
              <div className={styles.podiumName}>
                {firstPlace.name}
                {firstPlace.isUser && <span className={styles.userTag}>Anda</span>}
              </div>
              <div className={styles.podiumScore}>{firstPlace.score}</div>
              <div className={styles.podiumScoreLabel}>Poin</div>
              <div className={styles.podiumBadges}>
                {firstPlace.badges.map((b, i) => (
                  <span key={i} className={styles.miniBadge}>{b}</span>
                ))}
              </div>
            </div>
          )}

          {/* 3rd Place (Right) */}
          {thirdPlace && (
            <div className={`${styles.podiumCard} ${styles.bronzeCard}`}>
              <div className={styles.badgeTrophy}>3</div>
              <div className={styles.podiumName}>
                {thirdPlace.name}
                {thirdPlace.isUser && <span className={styles.userTag}>Anda</span>}
              </div>
              <div className={styles.podiumScore}>{thirdPlace.score}</div>
              <div className={styles.podiumScoreLabel}>Poin</div>
              <div className={styles.podiumBadges}>
                {thirdPlace.badges.map((b, i) => (
                  <span key={i} className={styles.miniBadge}>{b}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls: Search Bar & Reset Progress */}
      <div className={styles.controls}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}><Search size={15} /></span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Cari nama peserta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {hasUserStats && (
          <button className={styles.resetButton} onClick={handleReset}>
            <RefreshCw size={13} style={{ marginRight: "6px" }} /> Reset Progres Saya
          </button>
        )}
      </div>

      {/* Score Table */}
      <div className={styles.tableContainer}>
        {filteredLeaderboard.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Nama Peserta</th>
                <th>Total Poin Spasial</th>
                <th>Pencapaian (Badges)</th>
              </tr>
            </thead>
            <tbody>
              {remainingParticipants.map((p) => (
                <tr key={p.rank} className={p.isUser ? styles.userRow : ""}>
                  <td className={styles.rankNumber}>#{p.rank}</td>
                  <td>
                    {p.name}
                    {p.isUser && <span className={styles.userTag}>Anda</span>}
                  </td>
                  <td>{p.score}</td>
                  <td>
                    <div className={styles.tableBadges}>
                      {p.badges.length > 0 ? (
                        p.badges.map((b, idx) => (
                          <span key={idx} className={`${styles.tableBadge} ${getBadgeStyle(b)}`}>
                            {b}
                          </span>
                        ))
                      ) : (
                        <span className={styles.miniBadge}>-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.noResults}>
            Tidak ada peserta bernama &ldquo;{searchQuery}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}
