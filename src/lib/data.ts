import type { Word, Category, Province } from "./types";

// ===== PROVINCES =====
export const provinces: Province[] = [
  { id: 1, name: "Nasional", slug: "nasional" },
  { id: 2, name: "DKI Jakarta", slug: "dki-jakarta" },
  { id: 3, name: "Jawa Barat", slug: "jawa-barat" },
  { id: 4, name: "Jawa Tengah", slug: "jawa-tengah" },
  { id: 5, name: "DI Yogyakarta", slug: "di-yogyakarta" },
  { id: 6, name: "Jawa Timur", slug: "jawa-timur" },
  { id: 7, name: "Banten", slug: "banten" },
  { id: 8, name: "Bali", slug: "bali" },
  { id: 9, name: "Sumatera Utara", slug: "sumatera-utara" },
];

// ===== CATEGORIES =====
export const categories: Category[] = [
  { id: 1, name: "Kata Benda", icon: "inventory_2" },
  { id: 2, name: "Kata Kerja", icon: "directions_run" },
  { id: 3, name: "Angka", icon: "tag" },
  { id: 4, name: "Warna", icon: "palette" },
  { id: 5, name: "Keluarga", icon: "family_restroom" },
  { id: 6, name: "Perasaan", icon: "mood" },
  { id: 7, name: "Waktu", icon: "schedule" },
  { id: 8, name: "Pendidikan", icon: "school" },
  { id: 9, name: "Percakapan", icon: "chat" },
  { id: 10, name: "Wilayah", icon: "map" },
];

// ===== WORDS =====
export const words: Word[] = [
  {
    id: 1,
    title: "Apel",
    slug: "apel",
    description:
      "Isyarat untuk buah apel, biasanya dilakukan dengan gerakan tangan di area pipi. Tangan dominan membentuk huruf 'A' lalu diputar pelan di pipi.",
    video_url: "",
    category_id: 1,
    province_id: 1,
    status: "published",
  },
  {
    id: 2,
    title: "Yogyakarta",
    slug: "yogyakarta",
    description:
      "Variasi isyarat khusus untuk daerah istimewa Yogyakarta yang menunjukkan identitas lokal. Gerakan tangan membentuk simbol khas keraton.",
    video_url: "",
    category_id: 10,
    province_id: 5,
    status: "published",
  },
  {
    id: 3,
    title: "Halo",
    slug: "halo",
    description:
      "Isyarat salam pembuka yang paling dasar dan sering digunakan dalam percakapan sehari-hari. Lambaikan tangan terbuka ke arah lawan bicara.",
    video_url: "",
    category_id: 9,
    province_id: 1,
    status: "published",
  },
  {
    id: 4,
    title: "Makan",
    slug: "makan",
    description:
      "Isyarat untuk aktivitas makan. Tangan dominan membentuk seperti memegang sendok dan digerakkan menuju mulut secara berulang.",
    video_url: "",
    category_id: 2,
    province_id: 1,
    status: "published",
  },
  {
    id: 5,
    title: "Terima Kasih",
    slug: "terima-kasih",
    description:
      "Isyarat untuk mengungkapkan rasa terima kasih. Telapak tangan menyentuh dagu lalu digerakkan ke depan dengan senyuman.",
    video_url: "",
    category_id: 9,
    province_id: 1,
    status: "published",
  },
  {
    id: 6,
    title: "Sekolah",
    slug: "sekolah",
    description:
      "Isyarat untuk tempat pendidikan atau aktivitas belajar. Kedua tangan digerakkan seperti membuka buku, lalu ditepuk pelan.",
    video_url: "",
    category_id: 8,
    province_id: 1,
    status: "published",
  },
  {
    id: 7,
    title: "Merah",
    slug: "merah",
    description:
      "Isyarat warna merah. Jari telunjuk diletakkan di bibir bawah lalu ditarik ke bawah perlahan.",
    video_url: "",
    category_id: 4,
    province_id: 1,
    status: "published",
  },
  {
    id: 8,
    title: "Ibu",
    slug: "ibu",
    description:
      "Isyarat untuk panggilan ibu atau mama. Jari telunjuk dan jari tengah menyentuh pipi dengan lembut.",
    video_url: "",
    category_id: 5,
    province_id: 1,
    status: "published",
  },
  {
    id: 9,
    title: "Satu",
    slug: "satu",
    description:
      "Isyarat angka satu. Jari telunjuk diangkat ke atas sementara jari lain mengepal di tangan dominan.",
    video_url: "",
    category_id: 3,
    province_id: 1,
    status: "published",
  },
  {
    id: 10,
    title: "Senang",
    slug: "senang",
    description:
      "Isyarat untuk perasaan senang atau bahagia. Kedua telapak tangan diletakkan di dada dan digerakkan memutar ke arah atas.",
    video_url: "",
    category_id: 6,
    province_id: 1,
    status: "published",
  },
  {
    id: 11,
    title: "Pagi",
    slug: "pagi",
    description:
      "Isyarat waktu pagi hari. Tangan dominan diangkat dari bawah ke atas seperti matahari terbit.",
    video_url: "",
    category_id: 7,
    province_id: 1,
    status: "published",
  },
  {
    id: 12,
    title: "Jakarta",
    slug: "jakarta",
    description:
      "Isyarat untuk kota Jakarta. Gerakan tangan membentuk huruf J diikuti dengan gerakan menunjuk arah utara.",
    video_url: "",
    category_id: 10,
    province_id: 2,
    status: "published",
  },
];

// ===== HELPER FUNCTIONS =====

export function getWordBySlug(slug: string): Word | undefined {
  return words.find((word) => word.slug === slug);
}

export function getWordsByCategory(categoryId: number): Word[] {
  return words.filter((word) => word.category_id === categoryId);
}

export function getWordsByProvince(provinceId: number): Word[] {
  return words.filter((word) => word.province_id === provinceId);
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getProvinceById(id: number): Province | undefined {
  return provinces.find((prov) => prov.id === id);
}

export function getPublishedWords(): Word[] {
  return words.filter((word) => word.status === "published");
}
