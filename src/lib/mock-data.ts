export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of options
  image?: string;
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "WebGIS Fundamental",
    question: "Apa fungsi utama GeoJSON dalam pengembangan WebGIS?",
    options: [
      "Menyimpan data spasial berbasis JSON",
      "Membuat tampilan UI website",
      "Menghubungkan database SQL",
      "Mengatur hosting deployment"
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    category: "GIS Fundamental",
    question: "Sistem koordinat mana yang paling umum digunakan dalam peta web seperti Google Maps atau MapLibre?",
    options: [
      "WGS 84 (EPSG:4326)",
      "Web Mercator (EPSG:3857)",
      "UTM Zone 48S",
      "DMS (Degrees Minutes Seconds)"
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    category: "WebGIS Fundamental",
    question: "Apa yang dilakukan oleh Map Engine dalam WebGIS?",
    options: [
      "Menyimpan data spasial",
      "Mengatur database",
      "Merender peta",
      "Mengedit data spasial"
    ],
    correctAnswer: 2,
  },
  {
    id: 4,
    category: "MapLibre",
    question: "Dalam MapLibre, komponen yang berfungsi sebagai sumber data disebut...",
    options: [
      "Layer",
      "Map Object",
      "Source",
      "Event"
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    category: "MapLibre",
    question: "Metode MapLibre yang digunakan untuk menyembunyikan atau menampilkan layer secara dinamis adalah...",
    options: [
      "map.setPaintProperty()",
      "map.setLayoutProperty()",
      "map.addLayer()",
      "map.addSource()"
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    category: "Visualisasi Spasial",
    question: "Apa fungsi utama heatmap dalam visualisasi data spasial?",
    options: [
      "Area yang dapat dicapai dalam waktu tertentu dari suatu titik",
      "Mengelompokkan titik-titik yang berdekatan menjadi satu simbol",
      "Menampilkan kepadatan atau intensitas data dengan gradasi warna",
      "Mengubah warna peta dasar"
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    category: "Visualisasi Spasial",
    question: "Apa yang dilakukan oleh cluster pada peta?",
    options: [
      "Area yang dapat dicapai dalam waktu tertentu dari suatu titik",
      "Mengelompokkan titik-titik yang berdekatan menjadi satu simbol",
      "Menampilkan kepadatan atau intensitas data dengan gradasi warna",
      "Mengubah warna peta dasar"
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    category: "Analisis Spasial",
    question: "Apa yang dimaksud dengan isochrone dalam analisis spasial?",
    options: [
      "Area yang dapat dicapai dalam waktu tertentu dari suatu titik",
      "Mengelompokkan titik-titik yang berdekatan menjadi satu simbol",
      "Menampilkan kepadatan atau intensitas data dengan gradasi warna",
      "Garis batas antara dua wilayah administratif"
    ],
    correctAnswer: 0,
  },
  {
    id: 9,
    category: "GIS Fundamental",
    question: "Format file spasial mana yang merupakan format native dari QGIS dan mendukung banyak tipe geometri dalam satu file?",
    options: [
      "Shapefile (.shp)",
      "GeoPackage (.gpkg)",
      "GeoJSON (.geojson)",
      "KML (.kml)"
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    category: "WebGIS Fundamental",
    question: "Dalam arsitektur WebGIS, REST API Endpoint GEO MAPID berfungsi sebagai...",
    options: [
      "Framework JavaScript untuk merender peta",
      "Antarmuka untuk mengakses data spasial dari cloud database",
      "Tool deployment project ke Netlify",
      "Plugin QGIS untuk digitasi data"
    ],
    correctAnswer: 1,
  }
];

export interface Participant {
  rank: number;
  name: string;
  score: number;
  badges: string[];
}

export const LEADERBOARD_DATA: Participant[] = [
  { rank: 1, name: "Fariz", score: 1240, badges: ["Top Performer", "Fast Submission"] },
  { rank: 2, name: "Rifqi", score: 1190, badges: ["Consistent Learner"] },
  { rank: 3, name: "Ahmad", score: 1150, badges: ["Top Performer"] },
  { rank: 4, name: "Siti", score: 1080, badges: [] },
  { rank: 5, name: "Budi", score: 950, badges: ["Fast Submission"] }
];
