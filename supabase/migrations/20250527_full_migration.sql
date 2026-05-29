-- ============================================================
-- MAPID Academy — Full Migration
-- Tables: sessions, software, final_project, academy_admin_users
-- Seeds:   materi (17 sesi), quiz questions (10 soal),
--          sessions (17), software (4), final project,
--          academy_site_config additions
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ═══════════════════════════════════════════════════════════════
-- 1. CONFIG SESSIONS — 17 sesi bootcamp schedule
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_config_sessions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_no    integer UNIQUE NOT NULL CHECK (session_no BETWEEN 1 AND 17),
  number_label  text NOT NULL,
  title         text NOT NULL,
  topic         text NOT NULL,
  tools         text NOT NULL,
  pic           text NOT NULL,
  outcome       text NOT NULL,
  time_label    text NOT NULL DEFAULT '19.00 - 21.30',
  session_date  text NOT NULL DEFAULT '',
  sort_order    integer NOT NULL DEFAULT 0
);

ALTER TABLE academy_config_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_config_sessions" ON academy_config_sessions FOR SELECT USING (true);
CREATE POLICY "anon write academy_config_sessions"  ON academy_config_sessions FOR ALL    USING (true) WITH CHECK (true);

INSERT INTO academy_config_sessions (session_no, number_label, title, topic, tools, pic, outcome, time_label, session_date, sort_order) VALUES
(1,  'Sesi 1',  'Onboarding Program',
     'Ruang pengenalan awal program, meliputi platform komunikasi, tata cara pengumpulan tugas, dan ketentuan sertifikat kelulusan.',
     'Konseptual', 'MC',
     'Mengetahui teknis program secara keseluruhan dan mendapatkan kenyamanan dan kesiapan untuk mengikuti seluruh program.',
     '19.00 - 21.30', '2025-03-19', 1),
(2,  'Sesi 2',  'Get to Know WebGIS',
     'Pemberian materi: Apa itu WebGIS? Learning Journey, Industry Real Case dari Mentor, Potensi Karir Praktisi WebGIS dan Real Case.',
     'Konseptual, Pengenalan Tools Teknis', 'All Mentor',
     'Peserta mendapatkan pengetahuan: 1. Fundamental mengenai WebGIS, 2. Cara buat WebGIS di Bootcamp, 3. Potensi karir.',
     '19.00 - 21.30', '2025-03-21', 2),
(3,  'Sesi 3',  'GIS Fundamental',
     'Meliputi konsep GIS dan data spasial, serta format data spasial yang bisa masuk ke WebGIS (GeoJSON, Shapefile, Raster).',
     'Konseptual dan QGIS singkat', 'Dzikri',
     'Mendapatkan pemahaman GIS yang seragam dan mengetahui data spasial yang bisa masuk ke WebGIS.',
     '19.00 - 21.30', '2025-03-24', 3),
(4,  'Sesi 4',  'Location Value with GEO MAPID',
     'Konsep penggunaan GEO MAPID sebagai database dan pengelola data spasial: 1. Cara melakukan digitasi, 2. Mengimpor data spasial, 3. Pengenalan API MAPID.',
     'GEO MAPID', 'Dzikri',
     'Mengetahui konsep dan fungsi GEO MAPID: 1. Database spasial cloud, 2. Mengelola Data Spasial (Digit dan Import Data).',
     '19.00 - 21.30', '2025-03-26', 4),
(5,  'Sesi 5',  'Introduction to VS Code, Git, HTML, CSS, and JavaScript',
     'Pengenalan workflow dasar development menggunakan VS Code dan Git/Github, serta implementasi langsung struktur dasar website menggunakan HTML dan styling dasar menggunakan CSS.',
     'VS Code, HTML, CSS', 'Rifqi',
     'Mampu membuat struktur halaman web sederhana dan mengenal workflow developer modern dengan Git & GitHub.',
     '19.00 - 21.30', '2025-03-28', 5),
(6,  'Sesi 6',  'HTML and CSS Part 2',
     'Layouting dan styling dashboard (HTML CSS dan CSS Tailwind) menggunakan Flexbox/Grid serta pembuatan tampilan yang siap diintegrasikan ke WebGIS. Disisipkan pengenalan singkat Stitch AI sebagai referensi eksplorasi visual UI.',
     'VS Code + Stitch AI, HTML, CSS, CSS Tailwind', 'Rifqi',
     'Mampu membuat tampilan dashboard yang rapi dan siap integrasi.',
     '19.00 - 21.30', '2025-03-31', 6),
(7,  'Sesi 7',  'JavaScript Part 1',
     'Dasar JavaScript meliputi variable, logic, function, dan event sebagai pondasi interaksi pada website.',
     'VS Code, JS', 'Rifqi',
     'Mampu membuat interaksi dasar pada web.',
     '19.00 - 21.30', '2025-04-02', 7),
(8,  'Sesi 8',  'JavaScript Part 2',
     'DOM manipulation dan integrasi interaksi ke elemen website sebagai dasar pengembangan interaktivitas WebGIS.',
     'VS Code, JS', 'Rifqi',
     'Mampu mengontrol elemen web secara dinamis sebagai dasar integrasi map.',
     '19.00 - 21.30', '2025-04-04', 8),
(9,  'Sesi 9',  'Introduction JavaScript Modern',
     'Pengenalan JavaScript modern sebagai transisi menuju implementasi MapLibre GL JS, meliputi struktur code modern, async-await sederhana, fetch API data spasial, dan workflow integrasi web map.',
     'VS Code, JS', 'Rifqi',
     'Menjadi transisi ke implementasi JavaScript modern pada pengembangan WebGIS.',
     '19.00 - 21.30', '2025-04-07', 9),
(10, 'Sesi 10', 'Introduction to WebMap & MapLibre Part 1',
     'Konsep WebMap, cara kerja peta di web, serta inisialisasi MapLibre GL JS pada website.',
     'MapLibre GL JS', 'Ahmad Faiz',
     'Mampu menampilkan peta dasar di web.',
     '19.00 - 21.30', '2025-04-09', 10),
(11, 'Sesi 11', 'Introduction to WebMap & MapLibre Part 2',
     'Integrasi data spasial menggunakan GeoJSON/API, pengelolaan layer, dan styling dasar peta interaktif.',
     'MapLibre + GEO MAPID API', 'Ahmad Faiz',
     'Mampu menampilkan data spasial sebagai layer di peta.',
     '19.00 - 21.30', '2025-04-11', 11),
(12, 'Sesi 12', 'Introduction to WebMap & MapLibre Part 3',
     'Interaktivitas peta seperti popup, event klik, kontrol map, serta pengembangan feature interaktif pada WebGIS.',
     'MapLibre GL JS', 'Ahmad Faiz',
     'Mampu membuat peta interaktif dengan user interaction.',
     '19.00 - 21.30', '2025-04-14', 12),
(13, 'Sesi 13', 'Feature Implementation Part 1',
     'Implementasi Heatmap dan visualisasi densitas data spasial serta pengembangan feature berbasis user interaction.',
     'MapLibre + Data API GEO', 'Ahmad Faiz',
     'Mampu membuat visualisasi heatmap dari data spasial serta memahami workflow code review dan debugging sederhana.',
     '19.00 - 21.30', '2025-04-16', 13),
(14, 'Sesi 14', 'Feature Implementation Part 2',
     'Implementasi Radius/Buffer dan Isochrone Analysis menggunakan Turf JS serta refinement feature berbasis analisis spasial. Cursor AI digunakan untuk troubleshooting implementasi feature, pengecekan codebase, serta simulasi persiapan deployment.',
     'MapLibre + Data API GEO + Turf JS + Cursor AI', 'Ahmad Faiz',
     'Mampu membuat analisis radius berbasis interaksi user dan memahami proses troubleshooting project sebelum deployment.',
     '19.00 - 21.30', '2025-04-18', 14),
(15, 'Sesi 15', 'WebGIS Code Refinement and Deployment',
     'Peserta dikenalkan penggunaan Cursor AI untuk membantu deployment workflow, membaca error deployment, membantu pengecekan konfigurasi project, serta memberikan insight terkait kebutuhan codebase sebelum project dipublikasikan.',
     'MapLibre + Github + Cursor AI', 'Ahmad Faiz',
     'Mampu melakukan finalisasi dan deployment project WebGIS sederhana dengan workflow modern development.',
     '19.00 - 21.30', '2025-04-21', 15),
(16, 'Sesi 16 (Bonus 1)', 'Python for Spatial Data',
     'Pengenalan Python untuk pengolahan data spasial sederhana dan preprocessing data WebGIS.',
     'VS CODE + GEO MAPID', 'Raden Pranantya',
     'Peserta memahami penggunaan Python sederhana untuk membantu workflow data spasial.',
     '08.30 - 11.30', '2025-04-26', 16),
(17, 'Sesi 17 (Bonus 2)', 'Spatial Analysis & Automation',
     'Explorasi spatial analysis sederhana menggunakan library Python dan data GEO MAPID.',
     'VS CODE + GEO MAPID', 'Raden Pranantya',
     'Peserta memahami potensi automation dan preprocessing data spasial menggunakan Python.',
     '08.30 - 11.30', '2025-05-03', 17)
ON CONFLICT (session_no) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. CONFIG SOFTWARE — 4 software + guide steps
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_config_software (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  software_key  text UNIQUE NOT NULL,
  name          text NOT NULL,
  version       text NOT NULL,
  description   text NOT NULL,
  guide_steps   jsonb NOT NULL DEFAULT '[]',
  test_command  text DEFAULT '',
  download_url  text NOT NULL DEFAULT '',
  redeem_code   text DEFAULT '',
  sort_order    integer NOT NULL DEFAULT 0
);

ALTER TABLE academy_config_software ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_config_software" ON academy_config_software FOR SELECT USING (true);
CREATE POLICY "anon write academy_config_software"  ON academy_config_software FOR ALL    USING (true) WITH CHECK (true);

INSERT INTO academy_config_software (software_key, name, version, description, guide_steps, test_command, download_url, redeem_code, sort_order) VALUES
('qgis', 'QGIS Desktop', 'v3.28 LTR (atau terbaru)',
 'Aplikasi GIS desktop open-source untuk mengelola, menganalisis, mendigitasi, dan memformat data spasial vektor/raster.',
 '["Kunjungi situs resmi pengunduhan QGIS.", "Unduh installer ''QGIS LTR (Long Term Release)'' sesuai sistem operasi Anda (Windows/macOS/Linux).", "Jalankan file installer dan selesaikan wizard instalasi dengan opsi default.", "Buka QGIS Desktop untuk memastikan aplikasi berjalan dengan baik."]',
 'qgis --version', 'https://qgis.org/en/site/forusers/download.html', '', 1),
('vscode', 'VS Code', 'Terbaru',
 'Code editor andalan developer modern untuk menulis HTML, CSS, JavaScript, MapLibre, hingga script spasial Python.',
 '["Unduh VS Code installer untuk sistem operasi Anda.", "Lakukan instalasi dan centang opsi ''Add to PATH'' (sangat penting untuk Windows).", "Pasang ekstensi: Live Server (oleh Ritwick Dey) dan Live Preview (oleh Microsoft)."]',
 'code --version', 'https://code.visualstudio.com/', '', 2),
('git', 'Git & GitHub', 'Terbaru',
 'Version Control System untuk melacak perubahan kode, manajemen repositori tugas, dan deploy portfolio WebGIS.',
 '["Unduh Git Installer sesuai sistem operasi Anda.", "Gunakan konfigurasi default saat instalasi, pastikan Git CLI aktif.", "Buat akun di github.com jika belum memilikinya.", "Gunakan Git Bash atau terminal pilihan Anda untuk menguji konfigurasi."]',
 'git --version', 'https://git-scm.com/downloads', '', 3),
('geomapid', 'GEO MAPID', 'Platform Cloud Spasial',
 'Platform cloud database spasial MAPID untuk digitasi data, manajemen layer GeoJSON, dan aktivasi REST API Endpoint peta.',
 '["Kunjungi platform GEO MAPID dan buat akun baru dengan email aktif Anda.", "Setelah mendaftar, masuk ke menu Redeem Code.", "Masukkan kode akses bootcamp untuk mengaktifkan akses penuh platform.", "Eksplorasi fitur digitasi, upload GeoJSON, dan aktifkan API Endpoint data spasial Anda."]',
 '', 'https://geo.mapid.io', 'WGA262', 4)
ON CONFLICT (software_key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 3. CONFIG FINAL PROJECT — requirements + evaluation criteria
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_config_final_project (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key  text UNIQUE NOT NULL,
  content      jsonb NOT NULL DEFAULT '{}'
);

ALTER TABLE academy_config_final_project ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_config_final_project" ON academy_config_final_project FOR SELECT USING (true);
CREATE POLICY "anon write academy_config_final_project"  ON academy_config_final_project FOR ALL    USING (true) WITH CHECK (true);

INSERT INTO academy_config_final_project (section_key, content) VALUES
('requirements', '{
  "title": "Output Minimum WebGIS",
  "description": "Setiap proyek akhir peserta wajib memenuhi kriteria minimum di bawah ini untuk dinyatakan lulus:",
  "items": [
    {"title": "Landing Page / Dashboard", "desc": "Halaman web pembungkus peta yang rapi, informatif, dan responsif ketika diakses di handphone/tablet."},
    {"title": "WebMap Interaktif", "desc": "Peta dasar menggunakan MapLibre GL JS lengkap dengan fitur navigasi zoom, panning, dan pointer."},
    {"title": "Integrasi Cloud Database Spasial", "desc": "Data peta dimuat langsung secara dinamis menggunakan REST API Endpoint GEO MAPID pribadi Anda."},
    {"title": "Minimal 1 Fitur Analisis Spasial", "desc": "Menampilkan analisis spasial fungsional seperti: Popup detail, Heatmap densitas, Buffer radius Turf.js, atau jangkauan Isochrone."},
    {"title": "Public Live Deployment", "desc": "Aplikasi web harus di-deploy ke publik secara online (Netlify / GitHub Pages / Vercel) dan dapat diakses kapan saja."}
  ]
}'),
('criteria', '{
  "title": "Fokus Penilaian Portfolio",
  "description": "Tim juri dan mentor MAPID Academy akan menilai proyek Anda berdasarkan kriteria industri riil:",
  "items": [
    {"title": "Industry Relevance & Use Case", "desc": "Seberapa relevan solusi WebGIS Anda untuk menyelesaikan permasalahan nyata di lapangan (bukan sekadar tugas syntax)."},
    {"title": "UI/UX & Visual Clarity", "desc": "Kerapian layout dashboard, harmoni pilihan warna peta, kenyamanan popup, dan keterbacaan data spasial oleh user."},
    {"title": "Coding Logic & Reasoning", "desc": "Struktur penulisan kode yang bersih (clean code) dan pemahaman reasoning di balik implementasi fitur (bukan salin tempel AI penuh)."}
  ]
}')
ON CONFLICT (section_key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 4. ADMIN USERS — dummy auth
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_admin_users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username      text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE academy_admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_admin_users"   ON academy_admin_users FOR SELECT USING (true);
CREATE POLICY "anon read academy_admin_users"     ON academy_admin_users FOR SELECT USING (true);

-- Dummy admin: username=admin, password=admin123
-- SHA-256 base64 hash of "admin123"
INSERT INTO academy_admin_users (username, password_hash) VALUES
  ('admin', 'JAvlGPq9JyTdtvBO6x2llnRI1+gxwIyPqCKAn3THIKk=')
ON CONFLICT (username) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. CONFIG MATERI (table) — ensures table exists before seed
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_config_materi (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_no   integer UNIQUE NOT NULL,
  number_label text NOT NULL,
  title        text NOT NULL,
  category     text NOT NULL DEFAULT 'Concept',
  materi_url   text DEFAULT '',
  playlist_url text DEFAULT '',
  youtube_id   text DEFAULT '',
  topics       jsonb DEFAULT '[]'
);
ALTER TABLE academy_config_materi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_config_materi" ON academy_config_materi FOR SELECT USING (true);
CREATE POLICY "anon write academy_config_materi"  ON academy_config_materi FOR ALL    USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- 5a. SEED: academy_config_materi (17 sessions)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO academy_config_materi (session_no, number_label, title, category, materi_url, playlist_url, youtube_id, topics) VALUES
(1,  'Sesi 1',  'Onboarding Program',             'Concept',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Sistem administrasi program", "Tata cara pengumpulan tugas", "Ketentuan sertifikat kelulusan"]'),
(2,  'Sesi 2',  'Get to Know WebGIS',             'Concept',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Apa itu WebGIS & Learning Journey", "Industry Real Case dari Mentor", "Potensi Karir Praktisi WebGIS"]'),
(3,  'Sesi 3',  'GIS Fundamental',                'Concept',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-3',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Konsep GIS & datum koordinat (WGS84)", "Vektor vs Raster & format data spasial", "GeoJSON, Shapefile & QGIS singkat"]'),
(4,  'Sesi 4',  'Location Value with GEO MAPID',  'Concept',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-4',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Digitasi & import data spasial online", "GEO MAPID sebagai Cloud Database Spasial", "Pengenalan REST API Endpoint MAPID"]'),
(5,  'Sesi 5',  'Introduction to VS Code, Git, HTML, CSS, and JavaScript', 'Frontend',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-5',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["VS Code setup & Git/GitHub workflow", "Struktur tag HTML5 dasar website", "CSS selectors, styling & Add to PATH"]'),
(6,  'Sesi 6',  'HTML and CSS Part 2',            'Frontend',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-6',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Flexbox & CSS Grid — dashboard layout", "CSS Tailwind utility classes", "Stitch AI sebagai referensi visual UI"]'),
(7,  'Sesi 7',  'JavaScript Part 1',              'Frontend',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-7',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Variable (let, const) & tipe data", "Logic, loop & conditional statement", "Function & Arrow Function ES6"]'),
(8,  'Sesi 8',  'JavaScript Part 2',              'Frontend',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-8',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["DOM Manipulation & querySelector", "addEventListener & Click/Submit events", "Dasar integrasi dinamis elemen web"]'),
(9,  'Sesi 9',  'Introduction JavaScript Modern', 'Frontend',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-9',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Async/Await & Promise handling", "Fetch API untuk data spasial GeoJSON", "Workflow integrasi modern menuju MapLibre"]'),
(10, 'Sesi 10', 'Introduction to WebMap & MapLibre Part 1', 'WebMap',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-10',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Konsep WebMap & cara kerja peta di web", "Inisialisasi MapLibre GL JS", "Basemap tiles, Zoom & Center koordinat"]'),
(11, 'Sesi 11', 'Introduction to WebMap & MapLibre Part 2', 'WebMap',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-11',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Integrasi data spasial GeoJSON/API", "addSource & addLayer — fill, line, circle", "Styling layer & color expressions"]'),
(12, 'Sesi 12', 'Introduction to WebMap & MapLibre Part 3', 'WebMap',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-12',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Interactive Popup & setHTML", "Event klik layer & queryRenderedFeatures", "NavigationControl & map custom controls"]'),
(13, 'Sesi 13', 'Feature Implementation Part 1',  'WebMap',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-13',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Heatmap density layer & heatmap-radius", "Gradien warna & heatmap-weight atribut", "Debugging workflow & code review"]'),
(14, 'Sesi 14', 'Feature Implementation Part 2',  'WebMap',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-14',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Radius/Buffer analisis via Turf.js", "Isochrone Analysis — jangkauan jalan nyata", "Cursor AI untuk troubleshooting codebase"]'),
(15, 'Sesi 15', 'WebGIS Code Refinement and Deployment', 'WebMap',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/session-15',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Cursor AI — deployment workflow & error check", "Netlify/GitHub Pages/Vercel deployment", "Final WebGIS portfolio-ready check"]'),
(16, 'Sesi 16 (Bonus 1)', 'Python for Spatial Data', 'Python',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/bonus-1',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Pengenalan GeoPandas & Shapely", "Pre-processing data spasial WebGIS", "gpd.read_file() & to_file() GeoJSON"]'),
(17, 'Sesi 17 (Bonus 2)', 'Spatial Analysis & Automation', 'Python',
     'https://github.com/mapid-academy/webgis-bootcamp-batch3/tree/main/bonus-2',
     'https://www.youtube.com/@mapid_official', 'dQw4w9WgXcQ',
     '["Spatial analysis library Python", "Script ETL & automation preprocessing", "Integrasi output Python ke GEO MAPID"]')
ON CONFLICT (session_no) DO UPDATE SET
  number_label = EXCLUDED.number_label,
  title        = EXCLUDED.title,
  category     = EXCLUDED.category,
  materi_url   = EXCLUDED.materi_url,
  playlist_url = EXCLUDED.playlist_url,
  youtube_id   = EXCLUDED.youtube_id,
  topics       = EXCLUDED.topics;

-- ═══════════════════════════════════════════════════════════════
-- 6. QUIZ QUESTIONS (table) — ensures table exists before seed
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_quiz_questions (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key    integer NOT NULL CHECK (session_key BETWEEN 1 AND 15),
  sort_order     integer NOT NULL DEFAULT 0,
  question_text  text NOT NULL DEFAULT '',
  options        jsonb NOT NULL DEFAULT '["","","",""]',
  correct_answer integer NOT NULL DEFAULT 0 CHECK (correct_answer BETWEEN 0 AND 3),
  image_url      text DEFAULT ''
);
ALTER TABLE academy_quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_quiz_questions" ON academy_quiz_questions FOR SELECT USING (true);
CREATE POLICY "anon write academy_quiz_questions"  ON academy_quiz_questions FOR ALL    USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- 6a. SEED: academy_quiz_questions (10 soal dari mock-data)
-- ═══════════════════════════════════════════════════════════════
INSERT INTO academy_quiz_questions (session_key, sort_order, question_text, options, correct_answer, image_url) VALUES
(1, 1, 'Apa fungsi utama GeoJSON dalam pengembangan WebGIS?',
 '["Menyimpan data spasial berbasis JSON", "Membuat tampilan UI website", "Menghubungkan database SQL", "Mengatur hosting deployment"]',
 0, ''),
(1, 2, 'Sistem koordinat mana yang paling umum digunakan dalam peta web seperti Google Maps atau MapLibre?',
 '["WGS 84 (EPSG:4326)", "Web Mercator (EPSG:3857)", "UTM Zone 48S", "DMS (Degrees Minutes Seconds)"]',
 1, ''),
(1, 3, 'Apa yang dilakukan oleh Map Engine dalam WebGIS?',
 '["Menyimpan data spasial", "Mengatur database", "Merender peta", "Mengedit data spasial"]',
 2, ''),
(1, 4, 'Dalam MapLibre, komponen yang berfungsi sebagai sumber data disebut...',
 '["Layer", "Map Object", "Source", "Event"]',
 2, ''),
(1, 5, 'Metode MapLibre yang digunakan untuk menyembunyikan atau menampilkan layer secara dinamis adalah...',
 '["map.setPaintProperty()", "map.setLayoutProperty()", "map.addLayer()", "map.addSource()"]',
 1, ''),
(1, 6, 'Apa fungsi utama heatmap dalam visualisasi data spasial?',
 '["Area yang dapat dicapai dalam waktu tertentu dari suatu titik", "Mengelompokkan titik-titik yang berdekatan menjadi satu simbol", "Menampilkan kepadatan atau intensitas data dengan gradasi warna", "Mengubah warna peta dasar"]',
 2, ''),
(1, 7, 'Apa yang dilakukan oleh cluster pada peta?',
 '["Area yang dapat dicapai dalam waktu tertentu dari suatu titik", "Mengelompokkan titik-titik yang berdekatan menjadi satu simbol", "Menampilkan kepadatan atau intensitas data dengan gradasi warna", "Mengubah warna peta dasar"]',
 1, ''),
(1, 8, 'Apa yang dimaksud dengan isochrone dalam analisis spasial?',
 '["Area yang dapat dicapai dalam waktu tertentu dari suatu titik", "Mengelompokkan titik-titik yang berdekatan menjadi satu simbol", "Menampilkan kepadatan atau intensitas data dengan gradasi warna", "Garis batas antara dua wilayah administratif"]',
 0, ''),
(1, 9, 'Format file spasial mana yang merupakan format native dari QGIS dan mendukung banyak tipe geometri dalam satu file?',
 '["Shapefile (.shp)", "GeoPackage (.gpkg)", "GeoJSON (.geojson)", "KML (.kml)"]',
 1, ''),
(1, 10, 'Dalam arsitektur WebGIS, REST API Endpoint GEO MAPID berfungsi sebagai...',
 '["Framework JavaScript untuk merender peta", "Antarmuka untuk mengakses data spasial dari cloud database", "Tool deployment project ke Netlify", "Plugin QGIS untuk digitasi data"]',
 1, '')
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 7. SITE CONFIG (table) — ensures table exists before seed
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS academy_site_config (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE academy_site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read academy_site_config" ON academy_site_config FOR SELECT USING (true);
CREATE POLICY "anon write academy_site_config"  ON academy_site_config FOR ALL    USING (true) WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════
-- 7a. SITE CONFIG additions — app-level constants
-- ═══════════════════════════════════════════════════════════════
INSERT INTO academy_site_config (key, value) VALUES
  ('youtube_playlist_url',        'https://www.youtube.com/@mapid_official'),
  ('total_bootcamp_sessions',     '17'),
  ('total_quiz_sessions',         '15'),
  ('total_task_count',            '15'),
  ('total_participants',          '10'),
  ('redeem_code',                 'WGA262'),
  ('fasilitator_1_phone',         '+6281234567890'),
  ('fasilitator_2_phone',         '+6281234567891'),
  ('quiz_sessions_map',           '{"1":"Sesi 1 & 2: Onboarding & Get to Know WebGIS","2":"Sesi 3: GIS Fundamental","3":"Sesi 4: Location Value with GEO MAPID","4":"Sesi 5: Introduction to VS Code, Git, HTML, CSS, and JS","5":"Sesi 6: HTML and CSS Part 2","6":"Sesi 7: JavaScript Part 1","7":"Sesi 8: JavaScript Part 2","8":"Sesi 9: Introduction JavaScript Modern","9":"Sesi 10: WebMap & MapLibre Part 1","10":"Sesi 11: WebMap & MapLibre Part 2","11":"Sesi 12: WebMap & MapLibre Part 3","12":"Sesi 13: Feature Implementation Part 1","13":"Sesi 14: Feature Implementation Part 2","14":"Sesi 15: WebGIS Code Refinement and Deployment","15":"Bonus: Python Spatial Data"}')
ON CONFLICT (key) DO NOTHING;
