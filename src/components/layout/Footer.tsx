import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>MAPID Academy &copy; {year} &mdash; WebGIS Development Bootcamp</p>
      </div>
    </footer>
  );
}
