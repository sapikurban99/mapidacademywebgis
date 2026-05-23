-- ============================================================
-- MAPID Academy WebGIS Batch 3 — Supabase Schema
-- Run this in: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ─── 1. ATTENDANCE ──────────────────────────────────────────
-- One row per participant per session. Managed by admin.
CREATE TABLE IF NOT EXISTS attendance (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant  text NOT NULL,
  session_no   integer NOT NULL CHECK (session_no BETWEEN 1 AND 17),
  attended     boolean NOT NULL DEFAULT false,
  created_at   timestamptz DEFAULT now(),
  UNIQUE (participant, session_no)
);

-- ─── 2. TASK SUBMISSIONS ────────────────────────────────────
-- Participants submit their task URLs here.
CREATE TABLE IF NOT EXISTS task_submissions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant  text NOT NULL,
  task_id      integer NOT NULL,
  task_number  text NOT NULL,
  task_title   text NOT NULL,
  url          text NOT NULL,
  submitted_at timestamptz DEFAULT now()
);

-- ─── 3. QUIZ SCORES (Post Test — in-dashboard) ─────────────
-- One row per participant per session quiz attempt.
CREATE TABLE IF NOT EXISTS quiz_scores (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant   text NOT NULL,
  email         text,
  session_key   integer NOT NULL CHECK (session_key BETWEEN 1 AND 15),
  score         integer NOT NULL CHECK (score BETWEEN 0 AND 100),
  attempt_no    integer NOT NULL DEFAULT 1,
  completed_at  timestamptz DEFAULT now(),
  UNIQUE (participant, session_key, attempt_no)
);

-- ─── 4. FINAL PROJECTS ──────────────────────────────────────
-- One row per participant; upserted when they submit their URL.
CREATE TABLE IF NOT EXISTS final_projects (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant  text UNIQUE NOT NULL,
  url          text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- ─── ROW LEVEL SECURITY ─────────────────────────────────────
ALTER TABLE attendance       ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores      ENABLE ROW LEVEL SECURITY;
ALTER TABLE final_projects   ENABLE ROW LEVEL SECURITY;

-- Allow all reads (public dashboard)
CREATE POLICY "public read attendance"       ON attendance       FOR SELECT USING (true);
CREATE POLICY "public read task_submissions" ON task_submissions FOR SELECT USING (true);
CREATE POLICY "public read quiz_scores"      ON quiz_scores      FOR SELECT USING (true);
CREATE POLICY "public read final_projects"   ON final_projects   FOR SELECT USING (true);

-- Allow anon writes (participants submit their own data)
CREATE POLICY "anon insert task_submissions" ON task_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "anon insert quiz_scores"      ON quiz_scores      FOR INSERT WITH CHECK (true);
CREATE POLICY "anon upsert final_projects"   ON final_projects   FOR ALL    USING (true) WITH CHECK (true);

-- ─── SEED: initial attendance (Sesi 1–5 completed) ──────────
INSERT INTO attendance (participant, session_no, attended) VALUES
  ('Kalvin Reza Pratama',   1, true),  ('Kalvin Reza Pratama',   2, true),  ('Kalvin Reza Pratama',   3, true),  ('Kalvin Reza Pratama',   4, true),  ('Kalvin Reza Pratama',   5, true),
  ('Rafi Fistra Ali',       1, true),  ('Rafi Fistra Ali',       2, true),  ('Rafi Fistra Ali',       3, true),  ('Rafi Fistra Ali',       4, true),  ('Rafi Fistra Ali',       5, true),
  ('Binar Aulia Setyawan',  1, true),  ('Binar Aulia Setyawan',  2, true),  ('Binar Aulia Setyawan',  3, true),  ('Binar Aulia Setyawan',  4, true),  ('Binar Aulia Setyawan',  5, false),
  ('Athirah Hamzah',        1, true),  ('Athirah Hamzah',        2, true),  ('Athirah Hamzah',        3, true),  ('Athirah Hamzah',        4, true),  ('Athirah Hamzah',        5, true),
  ('Azya Naurah Sumakhalda',1, true),  ('Azya Naurah Sumakhalda',2, true),  ('Azya Naurah Sumakhalda',3, true),  ('Azya Naurah Sumakhalda',4, true),  ('Azya Naurah Sumakhalda',5, true),
  ('Robertho Kadji',        1, true),  ('Robertho Kadji',        2, true),  ('Robertho Kadji',        3, true),  ('Robertho Kadji',        4, true),  ('Robertho Kadji',        5, false),
  ('Rinjani Putri Djunaedi',1, true),  ('Rinjani Putri Djunaedi',2, true),  ('Rinjani Putri Djunaedi',3, true),  ('Rinjani Putri Djunaedi',4, true),  ('Rinjani Putri Djunaedi',5, true),
  ('Rizki Amara Putri',     1, true),  ('Rizki Amara Putri',     2, true),  ('Rizki Amara Putri',     3, true),  ('Rizki Amara Putri',     4, true),  ('Rizki Amara Putri',     5, true),
  ('Muhammad Thariq Aziz',  1, true),  ('Muhammad Thariq Aziz',  2, true),  ('Muhammad Thariq Aziz',  3, true),  ('Muhammad Thariq Aziz',  4, true),  ('Muhammad Thariq Aziz',  5, true),
  ('Adinda Dwi Yulianto',   1, true),  ('Adinda Dwi Yulianto',   2, true),  ('Adinda Dwi Yulianto',   3, true),  ('Adinda Dwi Yulianto',   4, true),  ('Adinda Dwi Yulianto',   5, true)
ON CONFLICT (participant, session_no) DO NOTHING;

-- ─── 5. POST-TEST CONFIG (Admin) ────────────────────────────
-- Admin sets how many post-test sessions are active.
-- Only ever one row (singleton). Update via admin page.
CREATE TABLE IF NOT EXISTS post_test_config (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_sessions integer NOT NULL DEFAULT 1 CHECK (total_sessions BETWEEN 1 AND 15),
  updated_at     timestamptz DEFAULT now()
);
INSERT INTO post_test_config (total_sessions) VALUES (1)
ON CONFLICT DO NOTHING;

ALTER TABLE post_test_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read post_test_config"  ON post_test_config FOR SELECT USING (true);
CREATE POLICY "anon update post_test_config"  ON post_test_config FOR UPDATE USING (true) WITH CHECK (true);

-- ─── 6. SITE CONFIG (key-value) ─────────────────────────────
-- General site-wide config: tata tertib, contacts, links, etc.
CREATE TABLE IF NOT EXISTS site_config (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read site_config"  ON site_config FOR SELECT USING (true);
CREATE POLICY "anon write site_config"   ON site_config FOR ALL    USING (true) WITH CHECK (true);

INSERT INTO site_config (key, value) VALUES
  ('attendance_link',      'https://forms.gle/mapid-academy-attendance'),
  ('discord_link',         'https://discord.gg/mapid'),
  ('zoom_link',            'https://zoom.us/j/88219283192?pwd=mapidacademy'),
  ('zoom_meeting_id',      '882 1928 3192'),
  ('zoom_passcode',        'mapidacademy'),
  ('fasilitator_1_name',   'Farah'),
  ('fasilitator_1_phone',  ''),
  ('fasilitator_2_name',   'Rofi'),
  ('fasilitator_2_phone',  ''),
  ('tata_tertib_1_title',  'Penyelesaian Post Test'),
  ('tata_tertib_1_desc',   'Post test wajib diisi setiap selesai mengikuti masing-masing sesi pertemuan.'),
  ('tata_tertib_2_title',  'Konektivitas Tugas Terintegrasi'),
  ('tata_tertib_2_desc',   'Tugas mingguan (Sesi 1-15) saling berkesinambungan membentuk final project berupa webgis mandiri.'),
  ('tata_tertib_3_title',  'Evaluasi Logika Mandiri'),
  ('tata_tertib_3_desc',   'Penilaian berfokus pada pemahaman sintaks. Penggunaan AI diperbolehkan sebagai asisten logika.'),
  ('tata_tertib_4_title',  'Fokus Penilaian Portofolio'),
  ('tata_tertib_4_desc',   'Portofolio dievaluasi atas: Storytelling, UI/UX Peta, fungsionalitas WebGIS, dan hasil deploy cloud.')
ON CONFLICT (key) DO NOTHING;

-- ─── 7. CONFIG PARTICIPANTS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS config_participants (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text UNIQUE NOT NULL,
  email      text DEFAULT '',
  sort_order integer DEFAULT 0
);
ALTER TABLE config_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read config_participants" ON config_participants FOR SELECT USING (true);
CREATE POLICY "anon write config_participants"  ON config_participants FOR ALL    USING (true) WITH CHECK (true);

INSERT INTO config_participants (name, email, sort_order) VALUES
  ('Kalvin Reza Pratama',    'kalvin@gmail.com',    1),
  ('Rafi Fistra Ali',        'rafi@gmail.com',      2),
  ('Binar Aulia Setyawan',   'binar@gmail.com',     3),
  ('Athirah Hamzah',         'athirah@gmail.com',   4),
  ('Azya Naurah Sumakhalda', 'azya@gmail.com',      5),
  ('Robertho Kadji',         'robertho@gmail.com',  6),
  ('Rinjani Putri Djunaedi', 'rinjani@gmail.com',   7),
  ('Rizki Amara Putri',      'rizki@gmail.com',     8),
  ('Muhammad Thariq Aziz',   'thariq@gmail.com',    9),
  ('Adinda Dwi Yulianto',    'adinda@gmail.com',    10)
ON CONFLICT (name) DO NOTHING;

-- ─── 8. CONFIG TASKS ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS config_tasks (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_order integer UNIQUE NOT NULL,
  number     text NOT NULL,
  title      text NOT NULL,
  phase      text DEFAULT ''
);
ALTER TABLE config_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read config_tasks" ON config_tasks FOR SELECT USING (true);
CREATE POLICY "anon write config_tasks"  ON config_tasks FOR ALL    USING (true) WITH CHECK (true);

INSERT INTO config_tasks (task_order, number, title, phase) VALUES
  (1, 'Tugas 1-2',   'Spatial Preparation — Format GIS & Problem Solving',              'GIS & Location Value'),
  (2, 'Tugas 3',     'Project Definition — Ide WebGIS & Data Spasial Awal',             'GIS & Location Value'),
  (3, 'Tugas 4',     'Web Structure & Dashboard UI — HTML & CSS',                       'HTML & CSS'),
  (4, 'Tugas 5',     'Web Interaction & Dynamic Content — JavaScript',                  'JavaScript'),
  (5, 'Tugas 6',     'WebMap Integration — Layer, Data Spasial & Popup',                'WebMap Fundamentals'),
  (6, 'Tugas 7',     'Spatial Feature Implementation — Heatmap/Radius/Isochrone',       'Feature Development'),
  (7, 'Tugas 8',     'Final WebGIS Project — Refinement & Deployment (Cursor AI)',      'Refinement & Deployment'),
  (8, 'Bonus Task',  'Python for Spatial Data — Preprocessing & Spatial Analysis',      'Bonus Session')
ON CONFLICT (task_order) DO NOTHING;

-- ─── 9. CONFIG MATERI ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS config_materi (
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
ALTER TABLE config_materi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read config_materi" ON config_materi FOR SELECT USING (true);
CREATE POLICY "anon write config_materi"  ON config_materi FOR ALL    USING (true) WITH CHECK (true);

-- ─── 10. QUIZ QUESTIONS (Admin editable) ────────────────────
-- Admin adds/edits quiz questions per session_key (1-15)
CREATE TABLE IF NOT EXISTS quiz_questions (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_key    integer NOT NULL CHECK (session_key BETWEEN 1 AND 15),
  sort_order     integer NOT NULL DEFAULT 0,
  question_text  text NOT NULL DEFAULT '',
  options        jsonb NOT NULL DEFAULT '["","","",""]',
  correct_answer integer NOT NULL DEFAULT 0 CHECK (correct_answer BETWEEN 0 AND 3),
  image_url      text DEFAULT ''
);
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read quiz_questions" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "anon write quiz_questions"  ON quiz_questions FOR ALL    USING (true) WITH CHECK (true);

-- ─── 11. SITE CONFIG: total attendance sessions ──────────────
-- Already in site_config key-value, just add the key:
INSERT INTO site_config (key, value) VALUES ('total_absensi_sessions', '17')
ON CONFLICT (key) DO NOTHING;
