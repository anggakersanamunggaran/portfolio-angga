# Portfolio Angga — Catatan Konteks & Log Perubahan

> File ini dibuat agar kalau mau update website portfolio nanti, kamu (atau AI yang bantu) langsung paham konteks: apa yang sudah dikerjakan, di file mana, dengan prinsip/format apa.
> Terakhir diperbarui: **2026-09-15**.

---

## 1. Ringkasan Repos

Portfolio single-page di `/` (Hero → ForYourBusiness → About → Skills → Projects → Experience → Contact), halaman `/career` (track record yang angka-angkanya bersumber dari git commit history), dan `/blog` + `/blog/<slug>` (tulisan soal keputusan teknis membangun situs ini). Jira/Confluence tidak bisa diakses lagi sejak keluar ASTRNT.

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4 (`@theme` di `globals.css`)
- **Icons:** lucide-react
- **Deploy:** Vercel (push ke `main` = auto redeploy)

## 2. Cara Update Konten (semua data-driven)

Hampir semua teks situs ada di **`src/data/portfolio.ts`**:

| Mau ubah | Edit di |
|---|---|
| Nama, headline, bio, resumeUrl | `personalInfo` |
| Angka proof strip di Hero | `heroProof` |
| Statistik besar / halaman career | `careerStats` |
| Tiga fase karier (Act I/II/III) | `careerPhases` |
| Keahlian domain / halaman career | `domainExpertise` |
| Chapter migrasi AWS→Azure | `cloudMigration` |
| Skill + kategori (chips) | `skills` |
| Kartu project & detail modal | `projects` |
| Riwayat kerja (Experience) | `experiences` |

Komponen section-nya: `src/components/sections/*.tsx` (`ForYourBusiness.tsx` berisi kartu "What I can do for your business").

Konten blog ada di **`src/data/posts.ts`** (bukan markdown, sengaja: biar tidak ada dependency markdown dan seluruh tipografi artikel diatur satu komponen, `src/components/blog/PostBody.tsx`):

| Mau ubah | Edit di |
|---|---|
| Tambah tulisan | append ke array `posts`; `slug` jadi URL `/blog/<slug>` dan ikut ter-generate otomatis |
| Judul | `title` (huruf kapital tebal) + `accent` (serif italic, maksimal beberapa kata) |
| Isi | array `blocks`: `p`, `h2`, `ul`, `code`, `compare` |
| Gambar before/after | blok `compare` (`before`/`after` + `caption`); file gambarnya di `public/blog/` |
| Format kode inline | bungkus dengan backtick di dalam teks `p`/`ul`, contoh: `` `rounded-full` `` |

### Konvensi kerja kamu (berlaku juga untuk proyek lain)
- **GitFlow selalu** sebagai branching strategy: feature branch dari `develop` → merge ke `develop` → `release` → `main`. (Repo portfolio ini khususnya cuma punya branch `main` dan langsung di-push untuk auto-deploy Vercel — konfirmasi dulu kalau mau diterapkan GitFlow penuh di sini.)
- **Product management:** Jira (ticket) untuk tracking pekerjaan, **Confluence sebagai dokumentasi**. Commit usaha engineering biasanya terhubung ke key tiket Jira (traceability).

## 3. Log Perubahan

### CV 2026 (HTML + PDF) — `public/CV/Angga_Kersana_Munggaran_CV_2026.{html,pdf}`
- Dibuat dari file HTML sumber, lalu di-render ke PDF via headless Chrome. **Kalau mau update CV, edit HTML-nya dulu, baru render ulang PDF.**
- Format CV = versi **HR/ATS scannable**: tiap bullet diawali `.lead` tebal (kalimat "bangun apa"), diikuti tujuan + dampak bisnis. **Zero em-dash** di seluruh teks CV (biar tidak terlihat seperti hasil AI).
- Berisi 7 link (header + portofolio legacy), 2 halaman A4.
- Link di navbar/hero pakai `personalInfo.resumeUrl` → `/CV/Angga_Kersana_Munggaran_CV_2026.pdf`. CTA-nya bertuliskan **"Check out my resume"** (bukan "Download CV" literal).
- File `Angga_Kersana_Munggaran_CV(2).pdf` (versi lama) sudah dihapus.
- **Catatan isi:** klaim soal QnA platform (~2.200 commit) & jenis pertanyaan valid; soal questionnaire/WorkValue atribusi ditulis sebagai kerja kolaboratif (branch dari teammate, UX dikerjakan sendiri & di-merge), bukan diklaim penuh atas nama sendiri. Pastikan bahasa ini tetap akurat saat edit.

### Landing Page — Upgrade HR/founder-focused (A+B+C)
- **A. Hero outcome-first** (`Hero.tsx` + `heroProof`): headline sekarang "I build hiring software end to end, then modernise it before it slows your business down.", dilengkapi **proof strip 4 angka** (7 yrs HR tech, 18 feature areas/6 bln, 2.500 concurrent users, 11.697 commits), dan CTA "See the work behind these numbers" / "What this means for your business".
- **B. Section baru `ForYourBusiness`** ("What I can do for your business"): 4 kartu penawaran yang langsung menjawab kebutuhan founder/CTO/HR + CTA ke /career dan email.
- **C. Trust & Skills reframe:**
  - `Skills.tsx`: judul "Proven in production, not self-assessed", tampilan chips dengan ikon check (menghilangkan progress bar yang menyesatkan).
  - `About.tsx`: judul "Seven years in one vertical...", + blok **Recognition** (2 penghargaan ASTRNT + paper SNATI 2017).
- **Sweep em-dash menyeluruh**: seluruh copy homepage, `portfolio.ts`, dan halaman `/career` dibersihkan dari em-dash (diganti titik dua/koma/restrukturisasi). Yang tersisa hanya di metadata (judul tab browser / social card) dan komentar kode — sengaja dibiarkan.

### CV Varian Per-Role — `public/CV/<role>/` (5 folder baru)
- Dibuat **5 varian CV** yang di-tailor ke lowongan, masing-masing di folder terpisah, berisi `.html` sumber + `.pdf` hasil render:
  | Role | Folder | Target tagline |
  |---|---|---|
  | Product Manager | `product-manager/` | spec-to-ship owner (19 PRD, 30 design use case, template PRD, 1.661 tiket Jira) |
  | Quality Assurance / SDET | `quality-assurance/` | E2E no-mock, perf 2.500 concurrent, kualitas release |
  | DevOps / Platform | `devops/` | AWS→Azure, CI/CD, PM2, operasi produksi |
  | Frontend Engineer | `frontend-engineer/` | React/Next.js/TypeScript, WebRTC/media, bundle −92% |
  | Backend Engineer | `backend-engineer/` | Laravel/PHP + Node.js, monolith paralel, data layer AI |
- **Aturan pakai:** edit HTML lalu render ulang PDF (headless Chrome). Format sama dengan CV utama (`.lead` tebal, zero em-dash). Hanya memakai fakta yang bisa diverifikasi dari CV utama / sumber primer (tidak ada angka yang dikarang).
- **CV asli `public/CV/Angga_Kersana_Munggaran_CV_2026.{html,pdf}` TIDAK diubah** — tetap jadi versi umum untuk ATS/HR; varian ini opsional untuk lamaran per-role.
- Verifikasi: semua 1 halaman A4 kecuali `backend-engineer/` = 2 halaman (halaman 2 hanya berisi baris footer proof). Nol em-dash di body semua file.

### Perbaikan Navigasi Header di Subpage
- **Masalah:** di `/career`, menu header (About/Skills/Projects/Experience/Contact) memakai `href="#..."` yang id-nya cuma ada di homepage → klik tidak berefek.
- **Solusi** (`src/components/layout/Navbar.tsx`): semua link section kini `/#section` lewat Next `<Link>`. Dari `/career` klik menu kembali ke homepage di section yang benar; dari homepage smooth-scroll tanpa navigasi ulang. Logo → `/` (di homepage = scroll ke atas).

### Proses Lamaran Kerja & Apply Tracking (2026-09-04)
- Mulai target juga **PM/QA/DevOps/FE/BE** selain senior full-stack & product-engineering → 5 CV varian per-role (lihat bagian atas).
- **Draft email + cover letter ke Saputri (Glints, client Singapore, Web Developer)** dibuat dalam bahasa Inggris, diarahkan ke **bisnis/outcome**: fitur tanpa downtime (rebuild React + upgrade Laravel paralel), backend kuat di 2.500 concurrent, own-outcome end-to-end (cocok remote), retensi (7 tahun, apply permanent). Draft di lokasi **lokal** `public/angga-task/apply-to/glints-saputri-webdev/`.
- **`apply-to/` = tracker lamaran lokal** (`README.md` punya tabel status + legenda; `_template/` untuk lamaran baru; tiap lamaran = 1 folder: `email.md`, `cover-letter.md`, `job.md`).
- **Signature Gmail** dibuat sebagai asset lokal `public/angga-task/signature-gmail-preview.html` (foto profil + WA/Gmail/Portfolio/LinkedIn/GitHub + quote bisnis). Copy-paste isinya ke Gmail → Settings → Signature.
- ⚠️ **Repo GitHub ini PUBLIC.** Karena itu semua bahan lamaran personal (email, cover letter, tracker, signature, no. HP, foto) **tidak di-commit/di-push** ke `main`. File di-gitignore (lihat `.gitignore`). Backup/akses dari mana saja pakai tempat privat (Drive pribadi / repo privat), bukan repo ini.

### Restyle total ke bahasa visual monokrom/editorial + halaman Blog (2026-09-15)

Branch `feature/ZOG-design`, belum di-merge ke `main`. Ini **overhaul menyeluruh**, bukan penyesuaian: palet, bentuk, dan konvensinya berubah total.

- **Palet:** monokrom. Satu hitam (`#000`) dan satu putih (`#fff`), pemisah selalu garis 1px. Tidak ada gradient, shadow, atau sudut membulat. Foto profil di hero **sengaja tetap berwarna** (satu-satunya elemen berwarna di situs).
- **Struktur halaman:** hero hitam, section sesudahnya putih. `Navbar.tsx` mengukur elemen `[data-hero]` untuk menentukan warnanya, jadi halaman baru tidak perlu hero hitam sendiri.
- **Dark mode dimatikan** dengan satu baris: `@custom-variant dark (&:where(.dark, .dark *))` membuat semua class `dark:` tidak pernah aktif. Alasannya: hero hitam tidak mungkin hidup berdampingan dengan tema yang mengubah permukaan jadi putih.
- **Kunci cara kerjanya: token dulu, bukan sapuan komponen.** Radius, shadow, dan warna diubah nilainya di `@theme` / `@theme inline` (`src/app/globals.css`), sehingga seluruh situs ikut berubah tanpa menyentuh komponen. `rounded-full` **tidak** ikut token-driven (compiles ke calc), jadi lingkaran yang disengaja tetap ada.
- **Tipografi yang mengerjakan desain:** Inter (via `next/font`) + Instrument Serif italic untuk kata penekanan. Utility: `label-micro` (11px uppercase, tracking 0.2em) untuk label struktural, `display-xl/l/m` untuk judul, `accent-serif` untuk aksen italic.
  - ⚠️ **Jebakan yang pernah bikin font tidak kepakai:** `@theme inline` meng-inline nilai, jadi menulis `--font-sans: "Inter"` (string literal) tidak akan pernah cocok dengan nama hashed dari `next/font`. Harus `var(--font-inter)`.
- **Aksesibilitas yang jadi tumpuan:** karena tidak ada warna aksen, link dalam paragraf wajib underline, focus ring 2px (hitam di putih, putih di hero hitam), `::selection` di-set per permukaan, dan `prefers-reduced-motion` harus menyelesaikan elemen ber-`opacity-0` ke keadaan akhirnya.
- **Primitif baru:** `src/components/ui/Rule.tsx`, `src/components/ui/SectionHeader.tsx`, `src/components/ui/cta.ts`.
- **Halaman `/blog` + `/blog/<slug>`** ditambahkan, plus tautan "Latest writing" di kaki hero (menggantikan petunjuk "Scroll" dekoratif). Tulisan pertamanya justru menceritakan keputusan desain di atas, lengkap dengan **perbandingan gambar before/after** (`public/blog/`, diambil dari situs live untuk sisi "before" dan dev server untuk sisi "after").
- **Verifikasi:** jangan percaya screenshot untuk urusan layout. Alat screenshot pernah mengabaikan `--window-size` sehingga halaman ter-layout ~886px tapi ter-capture 390px, dan itu terlihat persis seperti bug overflow. Ukur dengan `getBoundingClientRect()` / `documentElement.scrollWidth` / `getComputedStyle()` dari browser sungguhan.
- Angka di hero dan `/career` tidak berubah sama sekali: restyle ini murni tampilan, `src/data/portfolio.ts` tidak disentuh.

## 4. Konvensi & Constraint Penting

- **File personal TIDAK pernah di-commit/di-push** (repo public): `screening-answer.md` (root), `public/angga-task/apply-to/` (email, cover letter, tracker lamaran), `public/angga-task/signature-gmail-preview.html`. Sudah masuk `.gitignore` (2026-09-04).
- **`public/CV/` ikut di-commit & di-push** (keputusan 2026-09-04) supaya CV bisa di-download live dari situs. Yang di-push hanya CV (umum + 5 varian) + log ini, bukan bahan lamaran.
- Jangan menambahkan kembali em-dash `—` pada copy paragraf/bullet yang tampil. Tanda pisah yang dipakai: titik dua (`:`), koma, atau restrukturisasi kalimat. En-dash `–` hanya untuk rentang tahun/tanggal.
- Angka harus bersumber dari **git commit history yang masih ada** (Jira/Confluence tidak bisa diakses lagi sejak keluar ASTRNT, 2026). Jangan mengarang angka.
- **Jangan kembalikan warna aksen, sudut membulat, shadow, atau dark mode** (sejak 2026-09-15). Semuanya dimatikan lewat token di `src/app/globals.css`. Kalau nanti ada kebutuhan visual, ubah nilai tokennya, jangan tambah `rounded-lg` / `shadow-md` / warna langsung di komponen.

## 5. Verifikasi Lokal

```bash
npm run dev        # dev server (Turbopack)
npm run build      # production build
```

Cek cepat setelah edit: `curl -s http://localhost:3000 | grep "marker text"`, dan pastikan log dev server tidak ada error kompilasi. Render ulang PDF CV dengan headless Chrome lalu cek halaman A4 + jumlah link + tidak ada orphan heading (pakai `@page{size:A4}` dan `page-break-after:avoid` pada `.job-head`).
