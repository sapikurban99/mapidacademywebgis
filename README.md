# MAPID Academy — WebGIS Development Bootcamp Dashboard

Platform dashboard terintegrasi untuk peserta **WebGIS Development Bootcamp Batch 3** oleh MAPID Academy. Memantau kehadiran, post test, tugas, materi, dan final project dalam satu tempat.

## Tech Stack

- **Next.js 16** (App Router) + React 19
- **TypeScript**
- **Supabase** (PostgreSQL, RLS)
- **lucide-react** (icons)
- **jose** (JWT auth)
- CSS Modules (no Tailwind)

## Fitur

### Dashboard (Peserta)
| Tab | Deskripsi |
|-----|-----------|
| Dashboard Overview | Ringkasan kehadiran, post test, tugas, dan kontak MAPID |
| Schedule & Rules | Jadwal 17 sesi bootcamp + tata tertib akademik |
| Absensi | Grid kehadiran per sesi + link Google Form |
| Post Test WebGIS | Kuis interaktif berbasis F1 Paddock dengan 15 sesi |
| Task Monitoring | Form pengumpulan tugas + grid checklist |
| Materi & Video | Modul GitHub + thumbnail YouTube per sesi |
| Platform & Software | Panduan instalasi QGIS, VS Code, Git, GEO MAPID |
| Link Pendukung | Tautan Discord, template, guideline |
| Final Project | Syarat minimum, kriteria penilaian, form pengumpulan |
| Leaderboard | Podium skor post test |

### Admin Panel (`/admin`)
| Tab | Deskripsi |
|-----|-----------|
| Dashboard | Statistik + daftar peserta |
| Tata Tertib & Kontak | Edit aturan akademik, fasilitator, link Zoom/Discord |
| Jadwal & Sesi | CRUD 17 sesi bootcamp |
| Absensi | Toggle kehadiran + kelola daftar peserta |
| Post Test | Editor soal per sesi + rekapitulasi skor |
| Monitoring Tugas | CRUD daftar tugas + checklist pengumpulan |
| Materi & Rekaman | CRUD materi, kategori, link GitHub, YouTube ID |
| Platform & Software | CRUD software, guide steps, redeem code |
| Link Pendukung | CRUD tautan tambahan |
| Final Project | Pantau pengumpulan FP peserta |

Login admin: `admin` / `admin123` (hardcoded)

## Getting Started

### Prasyarat
- **Node.js** 20+
- **Supabase** project (free tier cukup)

### Instalasi

```bash
git clone https://github.com/sapikurban99/mapidacademywebgis.git
cd mapidacademywebgis
npm install
```

### Environment Variables

Copy `.env.local.example` ke `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxx
```

### Setup Database

1. Buka **Supabase Dashboard → SQL Editor**
2. Copy seluruh isi `supabase/schema.sql`
3. Paste & Run — semua tabel, RLS policies, dan seed data otomatis dibuat

### Run Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Build Production

```bash
npm run build
npm run start
```

## Deploy ke Netlify

1. Hubungkan repo ke Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. File `netlify.toml` sudah disediakan
5. Tambahkan environment variables `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` di Netlify dashboard
6. Deploy

## Struktur Project

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/              # Admin panel + login
│   │   ├── quiz/               # Standalone quiz page
│   │   ├── leaderboard/        # Scoreboard page
│   │   └── api/admin/auth/     # Login & logout endpoints
│   ├── components/
│   │   ├── dashboard/          # 9 tab components
│   │   └── layout/             # Sidebar, Navbar, Footer, ConditionalChrome
│   └── lib/                    # supabase client, types, helpers
├── supabase/
│   ├── schema.sql              # Full DB schema + seed data (satu file)
│   └── migrations/             # Migration history
├── netlify.toml                # Netlify config
└── public/                     # Static assets
```

## Lisensi

Private — MAPID Academy Internal
