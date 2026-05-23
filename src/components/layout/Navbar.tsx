import Link from 'next/link';
import { Trophy, Settings } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <h1>MAPID Academy</h1>
          <span>WEBGIS DEVELOPMENT BOOTCAMP</span>
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Link href="/leaderboard" className={styles.leaderboardLink}>
          <Trophy size={15} style={{ marginRight: "6px", verticalAlign: "middle" }} /> Scoreboard
        </Link>
        <Link href="/admin?tab=overview" className={styles.leaderboardLink} style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
          <Settings size={15} style={{ marginRight: "6px", verticalAlign: "middle" }} /> Admin
        </Link>
      </div>
    </nav>
  );
}
