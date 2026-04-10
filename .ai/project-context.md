# 📘 Kamus BISINDO — Project Context

> File ini adalah **sumber kebenaran tunggal** untuk AI assistant dan developer.
> Diperbarui setiap kali ada perubahan signifikan dalam proyek.
> **Last updated:** 2026-04-10

---

## 1. Ringkasan Proyek

| Item | Detail |
|------|--------|
| **Nama** | Kamus BISINDO (Bahasa Isyarat Indonesia) |
| **Klien** | Pak Ismail |
| **Developer** | Havin (Informatika) |
| **Tujuan** | Kamus digital interaktif untuk Bahasa Isyarat Indonesia dengan video berkualitas tinggi |
| **Strategi** | Local First → Production (Hostinger VPS KVM 1) |
| **Repo** | https://github.com/Havinoia/kamus-bisindo.git |
| **Branch `main`** | Production (deploy ke VPS) |
| **Branch `develop`** | Development aktif |

---

## 2. Tech Stack

| Layer | Teknologi | Keterangan |
|-------|-----------|------------|
| **Frontend** | Next.js 16 (App Router) | Framework utama |
| **Styling** | Tailwind CSS v4 | `@theme inline` syntax |
| **Fuzzy Search** | Fuse.js | Pencarian tahan typo di client-side |
| **CMS/Backend** | Directus (Self-hosted) | Headless CMS, dijalankan manual via terminal |
| **Database** | Supabase (PostgreSQL) | Cloud-hosted database |
| **Storage** | Local Filesystem (Mapped Volume) | Menggunakan disk VPS Hostinger (Tanpa CC) |
| **Infrastructure** | Docker Desktop (lokal) & Hostinger VPS KVM 1 (production) | |

---

## 3. Design System — "The Tactile Scholar"

Referensi lengkap ada di `informasi/DESIGN.md`.

### Prinsip Utama
- **Editorial & Encyclopedic** — bukan template SaaS generik
- **No 1px Borders** — pemisah menggunakan tonal surface shift
- **Glassmorphism** — navbar & floating elements (`backdrop-blur-xl`, 80% opacity)
- **Ambient Shadows** — blur 32-64px, opacity 4-8%, warna `on-surface` (bukan hitam murni)
- **Intentional Asymmetry** — white space sebagai grid

### Palet Warna
| Token | Hex | Kegunaan |
|-------|-----|----------|
| `primary` | `#24389c` | Indigo utama — headline, CTA |
| `primary-container` | `#3f51b5` | Gradient target |
| `secondary` | `#7e5700` | Amber — aksen interaktif (sparingly) |
| `secondary-container` | `#feb300` | Badge, highlight |
| `tertiary-container` | `#00665a` | Category chips |
| `surface` | `#faf8ff` | Background utama |
| `surface-container-low` | `#f2f3fd` | Section background |
| `surface-container-lowest` | `#ffffff` | Cards, inputs |
| `on-surface` | `#191b22` | Teks utama (BUKAN pure black) |

### Tipografi
| Penggunaan | Font | Catatan |
|------------|------|---------|
| Headlines & Display | **Plus Jakarta Sans** (700-800) | Geometric, authoritative |
| Body & Labels | **Public Sans** (300-500) | Friendly, legible |

### Border Radius
| Size | Value | Penggunaan |
|------|-------|------------|
| `xl` | 1.5rem | Large containers, video frames |
| `full` | 9999px | Buttons, pills, search bar |
| `md` | 0.75rem | Chips, small badges |

---

## 4. Arsitektur Folder

```
bisindo/
├── .ai/
│   └── project-context.md    ← FILE INI
├── informasi/                 # Referensi desain (DESIGN.md, code.html, screen.png)
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (fonts, SEO, Navbar+Footer)
│   │   ├── globals.css        # Design system tokens (@theme inline)
│   │   ├── page.tsx           # Homepage
│   │   └── kamus/
│   │       └── [slug]/
│   │           └── page.tsx   # Detail kata (dynamic route, SSG)
│   ├── components/
│   │   ├── Navbar.tsx         # Glassmorphic fixed nav + mobile menu
│   │   ├── Footer.tsx         # 4-kolom footer + email subscribe
│   │   ├── WordCard.tsx       # Card kata isyarat + hover overlay
│   │   ├── SearchBar.tsx      # Live fuzzy search + dropdown
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       ├── AlphabetFilter.tsx
│   │       ├── WordGrid.tsx
│   │       └── FilterSection.tsx
│   └── lib/
│       ├── types.ts           # TypeScript interfaces (Word, Category, Province)
│       ├── data.ts            # Mock data + helper functions
│       └── search.ts          # Fuse.js konfigurasi & fungsi search
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 5. Skema Database (Directus Collections)

### `provinces`
| Field | Type | Keterangan |
|-------|------|------------|
| `id` | integer (PK, auto) | |
| `name` | string | Nama provinsi |
| `slug` | string (unique) | URL-friendly |

### `categories`
| Field | Type | Keterangan |
|-------|------|------------|
| `id` | integer (PK, auto) | |
| `name` | string | Nama kategori |
| `icon` | string | Material Symbols icon name |

### `words`
| Field | Type | Keterangan |
|-------|------|------------|
| `id` | integer (PK, auto) | |
| `title` | string | Judul kata (misal: "HALO") atau Huruf (misal: "A") |
| `slug` | string (unique) | SEO-friendly URL |
| `description` | text | Penjelasan isyarat |
| `video_file` | uuid (M2O) | FK → `directus_files`. Video isyarat (Tersimpan di local `/uploads`) |
| `province` | integer (M2O) | FK → `provinces`. Relasi wilayah |
| `category` | integer (M2O) | FK → `categories`. Relasi kategori |
| `status` | enum: draft/review/published | Workflow konten |

> [!IMPORTANT]
> **Display Templates**: Koleksi `provinces` dan `categories` harus memiliki `meta.display_template = "{{name}}"` agar nama provinsi/kategori muncul di UI admin, bukan sekadar tanda `--`.

### Relasi
- `words.category` → `categories.id` (Many-to-One)
- `words.province` → `provinces.id` (Many-to-One)
- `words.video_file` → `directus_files.id` (Many-to-One)

---

## 6. Metadata & Asset Management

### Video & Asset URL
Karena kita menggunakan Directus self-hosted, video dari `video_file` diakses melalui:
`{{DIRECTUS_URL}}/assets/{{video_file_id}}`

### Penamaan Field Mismatch
> [!WARNING]
> Saat ini ada perbedaan penamaan antara Backend dan Frontend Mock:
> - Backend: `province`, `category`, `video_file`
> - Frontend Mock: `province_id`, `category_id`, `video_url`
> **Tugas Fase 3**: Sinkronisasi nama field ini saat integrasi API.

---

## 6. Workflow Konten (Admin/CMS)

| Tahapan | Aktor | Tindakan di Backend | Visual & UX Admin |
|---------|-------|--------------------|--------------------|
| **Input & Upload** | Kontributor | Upload video ke Cloudflare R2 via Directus | Drag-and-Drop Zone dengan progress bar transparan. Notifikasi otomatis jika format file salah |
| **Mapping** | Kontributor | Memilih kategori dan wilayah | Smart Dropdown: search-as-you-type pada kolom kategori |
| **Review** | Ahli BISINDO | Memutar video, cek gerakan tangan & metadata | Side-by-Side View: Video player di panel kanan, teks rincian di kiri |
| **Correction & Revision** | Admin / Ahli | Mengoreksi rincian teks atau mengganti video | Inline Editor: edit cepat di tabel. Tombol "Replace Video" mencolok |
| **Status Control** | Admin | Mengaktifkan (Publish) atau menonaktifkan data | Color-Coded Badges: Draft (Kuning), Published (Hijau), Off/Archived (Merah). Toggle Switch besar |
| **Analytics & Monitor** | Admin | Melihat statistik kosa isyarat dan log aktivitas | Visual Dashboard: grafik batang/lingkaran. Tabel log "siapa mengubah apa dan kapan" |

### Aturan Role & Permissions
- **Public API**: Read-Only untuk `words` (status=published), `categories`, `provinces`
- **Kontributor**: Create & Edit `words` (status=draft saja)
- **Admin**: Full CRUD + bisa mengubah status ke `published`

---

## 7. Fitur Wajib

| # | Fitur | Keterangan | Status |
|---|-------|------------|--------|
| 1 | **Fuzzy Search** | Fuse.js, tahan typo, pencarian di `title` + `description` | ✅ Done |
| 2 | **Video Playback** | Putar video dari Storage Lokal di halaman detail | ✅ Done (Backend Ready) |
| 3 | **Filter Kategori** | Filter berdasarkan 10 kategori (Kata Benda, Kerja, dll) | ✅ Done |
| 4 | **Filter Wilayah** | Filter berdasarkan 9 provinsi | ✅ Done |
| 5 | **Workflow Konten** | Draft → Review → Published di Directus | ✅ Done |
| 6 | **Role & Permissions** | API publik Read-Only, Admin-only Publish | ✅ Done |
| 7 | **SEO & Slug** | Setiap kata punya slug unik, dynamic metadata | ✅ Done |

---

## 8. Roadmap & Progress

### FASE 1: UI Frontend ✅
- [x] Inisialisasi proyek Next.js 16 + Tailwind v4
- [x] Setup design system (40+ color tokens, typography, animations)
- [x] Komponen: Navbar, Footer, WordCard, SearchBar
- [x] Komponen homepage: HeroSection, AlphabetFilter, WordGrid, FilterSection
- [x] Halaman homepage (`/`)
- [x] Halaman detail kata (`/kamus/[slug]`) dengan SEO
- [x] Fuse.js fuzzy search integration
- [x] Mock data (12 kata, 10 kategori, 9 provinsi)
- [x] Build verification — zero errors, 16 static pages
- [x] Push ke GitHub (`develop` branch)

### FASE 2: Backend & CMS ✅
- [x] Setup Directus (via Docker)
- [x] Hubungkan Directus ke Supabase (via IPv4 Pooler)
- [x] Buat Collections: `words`, `categories`, `provinces`
- [x] Setup relasi Many-to-One (termasuk `video_file` relationship)
- [x] Konfigurasi Display Templates (`{{name}}`)
- [x] Konfigurasi Roles & Permissions (Public Read-Only)
- [x] Konfigurasi workflow status (Draft → Review → Published)
- [x] Hubungkan Directus Storage ke Local (Folder /uploads)
- [x] Skrip otomasi schema & data clearing

### FASE 3: Integrasi Frontend ↔ Backend ✅
- [x] Sinkronisasi TypeScript types dengan Directus Schema
- [x] Ganti mock data dengan fetch dari Directus API
- [x] Implementasi Fetch API wrapper (`lib/directus.ts`)
- [x] Dynamic ISR/SSG dari data Directus
- [x] Map asset ID ke URL video asli
- [x] Integrasi Filter (Alphabet, Category, Province) ke URL Params

### FASE 4: Polish & Enhancement 🔲
- [ ] Loading states & skeleton screens
- [ ] Error handling & fallback pages
- [ ] Pagination / infinite scroll untuk daftar kata
- [ ] Alphabet filter terhubung ke data (filter kata berdasarkan huruf awal)
- [ ] Dark mode (opsional)
- [ ] Accessibility audit (ARIA labels, keyboard nav)
- [ ] Performance optimization (image/video lazy loading)

### FASE 5: Deployment ke Hostinger VPS 🔲
- [ ] Checklist persiapan OS Ubuntu (Install Docker, UFW firewall)
- [ ] `docker-compose.prod.yml` dengan Caddy/Nginx sebagai reverse proxy
- [ ] SSL/HTTPS otomatis via Caddy
- [ ] Sinkronisasi konfigurasi Directus (lokal → VPS)
- [ ] CI/CD pipeline (GitHub Actions, opsional)
- [ ] Domain setup & DNS pointing
- [ ] Monitoring & logging

---

## 9. Konvensi & Aturan

### Git
- **`main`** = Production only (merge dari `develop` saat siap deploy)
- **`develop`** = Development aktif
- Commit message format: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`

### Code Style
- TypeScript strict mode
- Komponen: PascalCase (`WordCard.tsx`)
- Utility/lib: camelCase (`data.ts`, `search.ts`)
- CSS: Tailwind utility classes + custom tokens di `globals.css`

### Design Rules (dari DESIGN.md)
- ❌ JANGAN gunakan `1px solid border` — pakai tonal shift
- ❌ JANGAN gunakan pure black (`#000`) — pakai `on-surface` (`#191b22`)
- ❌ JANGAN crowding video container — beri whitespace maksimal
- ✅ Gunakan `secondary` Amber secukupnya (highlighter, bukan warna utama)
- ✅ Gunakan `xl` radius (1.5rem) untuk container besar
- ✅ White space sebagai grid — jangan tambah divider, tambah margin

---

## 10. Backend Management Scripts (Utilities)

Gunakan skrip di folder `backend/` untuk mengelola Directus tanpa harus masuk ke database manual:

| Script | Fungsi |
|--------|--------|
| `setup-schema.js` | Inisialisasi awal seluruh koleksi, field, dan relasi. |
| `setup-permissions.js` | Mengatur hak akses Public agar bisa me-read data. |
| `clear-data.js` | Menghapus semua isi item di Words, Categories, dan Provinces. |
| `fix-relation.js` | Memperbaiki relasi `video_file` jika library media bermasalah. |
| `fix-display.js` | Memperbaiki tampilan `--` menjadi Nama di dropdown relasi. |

---

## 10. Environment Variables (Akan Digunakan)

```env
# Directus
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=your-static-token

# Supabase
DB_CLIENT=pg
DB_HOST=db.xxx.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USER=postgres
DB_PASSWORD=your-password

# Cloudflare R2
STORAGE_LOCATIONS=r2
STORAGE_R2_DRIVER=s3
STORAGE_R2_KEY=your-r2-access-key
STORAGE_R2_SECRET=your-r2-secret-key
STORAGE_R2_BUCKET=bisindo-videos
STORAGE_R2_REGION=auto
STORAGE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com

# Next.js Public
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
```

> ⚠️ Jangan commit file `.env` ke Git! Pastikan ada di `.gitignore`.
