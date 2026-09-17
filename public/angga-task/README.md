# Portfolio Angga — Catatan Konteks & Log Perubahan

> File ini dibuat agar kalau mau update website portfolio nanti, kamu (atau AI yang bantu) langsung paham konteks: apa yang sudah dikerjakan, di file mana, dengan prinsip/format apa.
> Terakhir diperbarui: **2026-09-16**.

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
  - **Pengecualian sadar (2026-09-17): aset gambar signature.** `public/signature/` (1 foto + 4 ikon) **di-commit ke `main`** supaya bisa diambil penerima email lewat HTTPS. Signature HTML-nya sendiri tetap hanya di `apply`. Lihat `public/signature/README.md`.

### Post blog: "One signature, five attachments" (2026-09-17)

Post kedua di `/blog` (`email-signature-without-attachments`), Bahasa Inggris. Menceritakan cara membangun signature email yang efisien: gejala 5 attachment, kenapa base64 ditolak, opsi hosting gambar, hasil uji Google Drive, apa yang dilakukan client terhadap markup, dan bagian yang tidak ada di HTML sama sekali (Mobile Signature Gmail).

- **Semua angka di post adalah hasil ukur, bukan kutipan artikel.** Satu file Drive publik diuji tiga bentuk URL dengan `curl`, masing-masing pada dua User-Agent (curl polos dan UA `GoogleImageProxy` yang dipakai Gmail saat mengambil gambar untuk penerima):

  | Bentuk URL | Status | Content-Type | Magic bytes | Byte |
  |---|---|---|---|---|
  | `uc?export=view&id=` | 200 | `application/pdf` (proxy) / `application/octet-stream` (curl) | `%PDF-1.5` | 279.990 |
  | `thumbnail?id=&sz=w1000` | 200 | `image/png` | `\x89PNG` | 785.447 |
  | `lh3.googleusercontent.com/d/` | 200 | `image/png` | `\x89PNG` | 862.270 |
  | `lh3.googleusercontent.com/d/=w200` | 200 | `image/png` | `\x89PNG` | 45.328 |

- ⚠️ **Koreksi klaim yang beredar.** Nasihat umum (dan yang sempat aku sampaikan sebelum diukur) bilang link langsung Drive sekarang **403** sejak Januari 2024. Itu **tidak tereplikasi**. Yang benar-benar terjadi: `uc?export=view` mengembalikan **PDF**, jadi `<img>` tidak bisa merender. Content-type-nya bahkan berpindah menurut User-Agent pada jumlah byte yang identik. Karena itu post-nya tidak memakai klaim 403, dan kesimpulannya juga bukan "Drive mati" melainkan "Drive jalan lewat endpoint yang tidak terdokumentasi, dan itu justru masalahnya".
- **Gambar** `public/blog/signature-wide.jpg` + `signature-narrow.jpg`, dirender sendiri dari HTML signature di container **600px** dan **390px**. Kanvas 720×450 CSS dengan `--force-device-scale-factor=2` supaya keluar 1440×900, yaitu rasio intrinsik yang dideklarasikan blok `compare` di `PostBody`. Dua jebakan yang kena: kartu versi sempit terpotong karena tingginya ditebak, dan koordinat crop manual meleset, jadi akhirnya batas kartu ditentukan lewat **trim otomatis** terhadap latar putih.
- Blok `compare` di `PostBody` memberi label **"Before"/"After" secara hardcoded**. Di sini isinya dua lebar, bukan sebelum/sesudah, jadi caption-nya menyatakan itu terus terang.
- **Bagian endpoint penghitung open ditulis ulang setelah dikoreksi Angga.** Draf pertamaku menyimpulkan endpoint itu hampir tidak berguna. Angga menunjukkan bahwa ia sudah memakainya di produksi dan hasilnya selalu tercatat. Setelah membaca implementasi aslinya, ternyata benar: pixel di sana membawa **kode per penerima** di dalam path, dan penulisan timestamp open dijaga supaya hanya open pertama yang dihitung. Jadi klaim "tidak berguna" itu salah dan sudah diganti.
  - **Yang tetap berlaku adalah pembedanya, bukan kelemahan tekniknya:** signature tidak punya kode per penerima, karena satu blob HTML yang sama dipakai di semua email. Jadi yang tersisa hanya total global, tanpa atribusi ke orang. Pembedaan itu yang sekarang jadi isi bagian tersebut.
  - Konsekuensi: `readingMinutes` naik 9 → 13.
- **Verifikasi:** build lulus, 0 em dash, tidak ada overflow di 1440/390/320, 24 chip kode tanpa backtick bocor, gambar termuat (`complete=true`) dengan rasio 1,603 sehingga tidak penyok, dan post otomatis jadi teratas di `/blog` sekaligus "Latest writing" di Hero tanpa wiring tambahan.

### Perbaikan Signature Gmail: Base64 → HTTPS (2026-09-17)
- **Masalah:** signature menampilkan **"5 Attachments"** di Gmail, terutama di mobile. Penyebabnya 5 gambar ditulis sebagai `data:image/...;base64` di dalam HTML; Gmail mengubah data URI di body compose menjadi **inline attachment**.
- **Solusi:** kelima gambar diekstrak ke `public/signature/` dan di-commit ke `main` (ter-deploy di `anggakersana-dev.vercel.app`), lalu semua `src` di HTML signature diganti URL HTTPS. Desain tidak berubah: foto tetap bulat 84×84, keempat ikon tetap 18×18 dan tetap clickable.
- Sekalian diperbaiki: karakter `any` nyasar di awal file, atribut `border="0"` pada ikon (Outlook lama suka menambah border biru), dan `bgcolor="#ffffff"` pada tabel (Outlook mengabaikan background CSS).
- **Konsekuensi yang perlu diketahui:** gambar eksternal bisa diblokir client penerima sampai mereka klik "Display images". Ini tetap jauh lebih baik daripada muncul sebagai attachment.

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

### Ikon tab, ikon iOS, dan avatar kartu sosial (2026-09-15)

Sempat kelewat: ikon tab masih **segitiga Vercel** meski `public/favicon.svg` sudah dibuat. Penyebabnya `src/app/favicon.ico` (bawaan `create-next-app`, ikut ter-commit sejak awal) menang atas `public/` karena file di `app/` adalah *file convention* yang Next daftarkan sendiri. Menambah `metadata.icons` malah bikin dua set `<link rel="icon">` yang saling berebut.

- Sekarang ikonnya **foto kamu**: `src/app/favicon.ico` (16/32/48, dibungkus PNG-in-ICO), `src/app/icon.png` (192), `src/app/apple-icon.png` (180). Blok `metadata.icons` di `layout.tsx` **dihapus** supaya tidak dobel.
- **`public/avatar.jpg`** (512x512) = crop kotak pada wajah, dipakai untuk ikon tab dan avatar di kartu OG. **`public/profile.jpg` jangan dipakai untuk ikon atau kartu sosial**: di dalam file-nya sudah menempel bingkai bundar + cincin lavender, sisa palet lama yang tadinya masih ikut muncul di kartu sosial.
- `opengraph-image.tsx` sekarang membaca `public/avatar.jpg` **dari disk**, bukan fetch ke domain sendiri seperti sebelumnya (dulu kalau fetch gagal, avatar hilang diam-diam).
- File scaffolding bawaan Next yang tidak terpakai sudah dihapus: `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`, `favicon.svg`.
- Kalau mau ganti crop fotonya: ubah nilai `CROP` (fraksi `left`/`top`/`size`) di skrip pembuat ikon, lalu render ulang ketiga ukuran itu.

### CV versi Senior Full-Stack — `public/CV/senior-fullstack/` (2026-09-16)

Revisi dari CV 2026 utama setelah dibaca ulang dari kacamata recruiter yang punya 20–30 detik untuk memutuskan shortlist. Masalah yang disasar bukan kurang pengalaman, tapi **positioning yang melebar**: terlalu banyak hal masuk sekaligus, dan angka impact terbesar baru ketemu setelah membaca beberapa paragraf.

- **File baru:** `Angga_Kersana_Munggaran_CV_SeniorFullstack_2026.{html,pdf}`, 2 halaman A4. **CV 2026 di root TIDAK diubah.** ⚠️ **Diperbarui:** `personalInfo.resumeUrl` akhirnya dialihkan ke CV ini, jadi situs menyajikan versi baru, bukan versi lama.
- **Yang naik ke halaman pertama:** strip 4 metrik impact di bawah header (2.500 concurrent / 92% bundle / 18 feature areas dalam 6 bulan / 0 downtime migrasi dual-database), lalu tagline tiga baris sinyal berurutan: role → tahun → stack.
- **Yang turun:** angka aktivitas (11.700 commits, 35 repositori, 1.661 tiket Jira, 93%) pindah dari context line ASTRNT ke baris footer bukti. Alasannya: itu activity metric, bukan outcome metric, dan sebagai headline memancing pertanyaan "so what?".
- **ASTRNT dipadatkan 15 bullet → 8 bullet**, kata kerja divariasikan (Led / Diagnosed / Designed / Engineered / Built / Migrated / Scaled / Owned) supaya tidak monoton "Built". Paragraf pembelaan histori commit dihapus.
- **Skills disusun bertingkat:** Core / Working knowledge / Additional / Specialist, menggantikan 9 baris kategori. Keyword ATS-nya hampir semua tetap ada. Satu perubahan CSS lokal: `.skill-line` jadi flex supaya nilai yang wrap sejajar dengan kolom nilai, bukan kembali ke margin kiri.
- ⚠️ **Angka 2.500 itu titik insiden, bukan kapasitas.** Karena ia naik jadi headline, labelnya harus jujur: "production scalability incident diagnosed and resolved", bukan ditulis polos sebagai klaim kapasitas.
- ⚠️ **`C# / .NET` sekarang tertulis** (di tier Additional) supaya lolos string ATS ".NET". Ini **tidak** mengubah batas klaim yang lama: .NET Core services, Entity Framework, NATS, dan Quarkus tetap tidak diklaim.
- **Menyimpang dari feedback, atas permintaan Angga:** TOEFL ITP 500 dan GPA 3.13 **tetap** ada; yang dihapus cuma baris Kaderisasi UNJANI dan detail tesis di Education (tesis sudah terwakili paper SNATI 2017 di Awards). ⚠️ **Dibatalkan di putaran ketiga:** keduanya akhirnya dihapus.
- **Klaim QnA jadi kualitatif** ("the largest codebase I owned") tanpa angka commit. Ini sekaligus menghilangkan konflik lama: `portfolio.ts` menulis ~1.300 commits sementara CV dan LinkedIn menulis ~2.200, dan dua sumber itu memang tidak pernah sinkron.
- **Cara render & verifikasi:** sama seperti CV lain (headless Chrome). Untuk menghitung halaman pakai ghostscript: `gs -q -dNODISPLAY -dNOSAFER -c "(file.pdf) (r) file runpdfbegin pdfpagecount = quit"`. Cara lama (grep `/Type /Pages` lalu `/Count N`) **tidak lagi bisa diandalkan**: PDF keluaran Chrome sekarang mengompresi object stream, jadi `/Type /Pages` tidak muncul sebagai teks polos. Untuk inspeksi visual, `gs -sDEVICE=png16m -r110 -o out%d.png file.pdf` (ghostscript ada di mesin ini) lebih akurat daripada screenshot HTML, karena yang dilihat benar-benar layout cetaknya. Catatan: teks PDF tidak bisa diekstrak (`pdftotext`/`pypdf` tidak terpasang, dan font di-subset dengan encoding glyph kustom), jadi verifikasi isi selalu lewat rasterisasi + baca PNG.

#### Putaran polishing (masih 2026-09-16)

Review recruiter kedua menilai versi ini 8.8/10 dan menyebutnya sudah masuk fase **polishing, bukan rebuilding**. Yang tetap dipertahankan: headline, strip metrik, positioning, hierarki stack, format 2 halaman.

- **Profile dipotong ~30% dan diubah jadi impersonal.** Sebelumnya tiga kalimat mengulang ide yang sama (spec → implementasi → produksi) dan memakai "I write..." yang terlalu conversational untuk CV internasional. Sekarang satu pernyataan kuat: "Owns features end to end, from product specification through implementation and production operations."
- **ASTRNT sekarang bertingkat, bukan 9 bullet berbobot sama.** 5 bullet Tier 1 (modernisasi Next.js, migrasi dual-database, insiden 2.500 concurrent, exam-integrity + media, AWS → Azure), lalu label **"Also delivered"** dengan 5 bullet berbobot penuh (CV/AI pipeline, QnA, multi-product & enterprise, job-market ingestion, product definition). Container-nya class `.also` di file ini, sengaja tidak ada di CV root. ⚠️ **Diganti di putaran ketiga** oleh sub-heading tematik (class `.group`), lihat di bawah.
- **Label skill diubah:** "Specialist" diganti **"Domain & systems"** (kata "specialist" terbaca sebagai klaim subjektif) dan **dinaikkan ke posisi 2** supaya bagian paling unik tidak terkubur. Urutan sekarang: Core engineering / Domain & systems / Working knowledge / Additional.
- **Semua angka activity dihapus dari footer** (11.700 commits, 35 repositori, 1.661 tiket, 93%, 335 reported). Barisnya sekarang: "All figures traceable to primary sources." Frasa "git commit history" diganti "primary sources" karena angka yang tersisa di body (2.500, 92%, 18) tidak semuanya berasal dari git.
- **Headline stack**: MySQL dikeluarkan, urutannya jadi `... PostgreSQL · AWS · Azure`, supaya AWS/Azure yang menempel di ujung dan memperkuat sinyal system ownership. MySQL tetap ada di tier Core engineering.
- **TOEFL dan GPA tetap** (lagi-lagi diminta hapus oleh feedback, lagi-lagi dipertahankan Angga). ⚠️ **Dibatalkan di putaran ketiga.**
- ⚠️ **Dua keyword ATS sempat hilang** saat memadatkan Tier 2 dan sudah dikembalikan: **Tableau** (kembali sebagai "a Tableau BI connector") dan **web scraping** (kembali sebagai grup "Data ingestion and web scraping" di tier Domain & systems). Kalau memadatkan lagi, cek dulu keyword ini tidak ikut terbuang.
- **Klaim QnA tetap kualitatif** ("the largest codebase I owned"), tidak memakai angka. Feedback menyarankan menulis "2,200+ commits", tapi angka itu belum pernah direkonsiliasi dengan `portfolio.ts` yang menulis ~1.300. **Rekonsiliasi ini masih utang** dan menyangkut juga kartu project di website.
- **Keputusan akhir layout: Option B.** Kelima item "Also delivered" dinaikkan jadi bullet berbobot penuh dengan label pendek agar mudah di-scan, **tanpa menambah informasi baru**. Halaman 1 sekarang terisi sampai bawah; halaman 2 terisi sekitar setengah. Keputusan sadar: white space di halaman 2 lebih dipilih daripada memaksa penuh. Yang **sengaja tidak** diperpanjang: Galamedia, Wahana Saabiq, Cihanjuang, karena menambah detail di sana hanya menarik perhatian dari ASTRNT.

#### Putaran ketiga: restrukturisasi hierarki (masih 2026-09-16)

Fokus putaran ini **bukan menambah isi**, tapi menata ulang hierarki visual supaya kekuatan yang sudah ada lebih cepat ditemukan recruiter. Angga eksplisit menolak mengisi halaman 2 hanya karena masih ada ruang: "Ada ruang kosong → tambahkan bullet" bukan alasan yang sah.

- **Urutan section diubah** menjadi: Header → strip metrik impact → Profile → Professional Experience → **Technical Skills** → Education → **Awards & Research**. Sebelumnya Skills ada di paling bawah, setelah Education. Untuk target Senior Full-Stack, skill adalah sinyal kedua terkuat setelah experience, jadi ia naik dan Education/Awards turun ke bawah.
- **"Also delivered" diganti "Selected engineering & product work"** dan tetap 5 bullet berbobot penuh. Label lama terdengar seperti lampiran; label baru menyatakan bahwa ini portofolio kerja yang dipilih, bukan sisa.
- **ASTRNT sekarang punya 4 sub-heading tematik** (class `.group` + `.group-head`, warna aksen, uppercase, huruf kecil) yang mengelompokkan 5 bullet Tier 1: **Platform modernisation** (modernisasi Next.js + 18 feature areas + 92% bundle), **Architecture & scalability** (migrasi dual-database + insiden 2.500 concurrent), **Media & exam integrity**, **Cloud migration** (AWS → Azure). Sub-heading ini murni scaffolding visual: **tidak ada bullet baru, tidak ada klaim baru**, isinya persis sama. Efeknya recruiter bisa menemukan "Architecture & scalability" dalam sekali scan tanpa membaca kelima bullet.
- **CSS `.also` / `.also-head` dihapus**, diganti `.group` / `.group-head` (di file ini saja, bukan di CV root). Keduanya dapat `page-break-inside:avoid` pada `.group` dan `page-break-after:avoid` pada `.group-head` supaya heading tidak pernah terpisah dari bullet pertamanya.
- **Awards dipadatkan 4 baris → 2 baris** dan judulnya jadi **"Awards & Research"** (kata "Achievements" berlebihan untuk dua penghargaan internal). Dua penghargaan ASTRNT digabung jadi satu baris dengan **dua link sertifikat terpisah** (2025 certificate / 2026 certificate); paper SNATI 2017 tetap satu baris sendiri dengan link publikasinya.
- **TOEFL ITP 500 dihapus.** Dibatalkan dari dua putaran sebelumnya setelah review ketiga menegaskannya lagi: skor 500 di bawah ambang yang recruiter internasional anggap relevan, jadi ia hanya memakan ruang tanpa menambah sinyal.
- **GPA 3.13 dihapus dari Education.** Tujuh tahun setelah lulus, GPA tidak lagi membantu positioning senior; yang tersisa: `S.Kom., Informatics` + universitas + tahun lulus + baris konsentrasi AI and Data Mining.
- **Yang sengaja TIDAK dilakukan:** menambah pengalaman, bullet, atau klaim baru untuk mengisi halaman 2. Hasil akhir tetap 2 halaman A4 dengan halaman 2 terisi sekitar setengah.
- **Verifikasi putaran ini:** 2 halaman (dicek lewat ghostscript `pdfpagecount`, karena grep `/Type /Pages` gagal pada PDF yang object stream-nya terkompresi), 0 em-dash, semua keyword ATS dari CV root masih ada (audit grep 35 keyword: Tableau, web scraping, NestJS, Prisma, Kubernetes, Elasticsearch, DynamoDB, C# / .NET, Cypress, FFmpeg, WebRTC, Stripe, Midtrans, Azure Speech, TensorFlow, VRA, Confluence, Azure DevOps, PM2, MediaRecorder, shadcn, AngularJS, CodeIgniter, Lumen, Flask, MongoDB, Nuxt, dll), dan CV root + `src/data/portfolio.ts` terkonfirmasi tidak tersentuh (`git diff --stat` kosong).

#### Koreksi fakta: "0 downtime" milik migrasi dual-database, bukan AWS→Azure (2026-09-16)

Koreksi dari Angga setelah CV-nya dibaca ulang. **Klaim "0 downtime" selama ini ditempelkan ke migrasi AWS → Azure, dan itu salah.** Yang benar: nol downtime itu terjadi pada **migrasi database ke arsitektur baru**, yang dijalankan dengan **dual-database store write** sehingga fitur yang sudah berjalan di produksi tidak terganggu selama arsitektur barunya dibangun.

- **Strip metrik diperbaiki:** `0` sekarang berbunyi "downtime during the dual-database migration to the new architecture", bukan "during the AWS to Azure migration".
- **Bullet Cloud migration kehilangan klaimnya:** frasa "as a zero-downtime move" dihapus dari bullet AWS → Azure. Isi bullet lainnya tidak berubah.
- **Bullet Architecture & scalability dibuat eksplisit** soal mekanismenya: "running both schemas on **dual writes** so data moved between them with no cut-over outage and no disruption to features already in production". Sebelumnya cuma bilang "no cut-over outage" tanpa menyebut dual write, jadi pembacanya tidak tahu kenapa ia bisa tanpa downtime.
- **Situs ikut diperbaiki.** Kartu di `src/components/sections/ForYourBusiness.tsx` sebelumnya berjudul "Scale and migrate **without downtime**" dengan body "...to MongoDB, **with no service downtime**." Atas instruksi Angga, klaim downtime-nya dibuang seluruhnya dan diganti netral: judulnya jadi **"Scale and migrate successfully"**, body-nya berakhir "...from DynamoDB to MongoDB, **successfully**." Jadi sekarang **tidak ada satu pun klaim downtime di `src/`** (dicek dengan `grep -rn -i downtime src/`).
- ⚠️ **Yang masih menyimpan klaim itu:** catatan lamaran di `public/angga-task/apply-to/` (privat, tidak ada di branch ini). Beberapa file menulis "migrasi AWS ke Azure tanpa downtime" sebagai bukti kompetensi cloud. Klaim itu perlu dikoreksi sebelum dipakai lagi.
- **CV 2026 root dan halaman `/career` bersih:** keduanya tidak pernah mengklaim zero-downtime untuk AWS → Azure. Root CV cuma menulis "Led the AWS to Azure cloud migration for the company's infrastructure consolidation."
- **Pelajaran untuk ke depan:** klaim "tanpa downtime" itu spesifik pada satu peristiwa. Jangan dipindah ke peristiwa lain yang mirip hanya karena keduanya sama-sama disebut "migrasi".

#### Durasi tahun di baris Core engineering (2026-09-16)

Masalah yang diangkat Angga: **Technical Skills cuma daftar flat tanpa durasi**, jadi recruiter harus menyimpulkan sendiri dari narasi di atas, dan itu gampang kelewat saat scan cepat. "React 19" disebut di bullet, tapi sejak kapan React dipakai tidak eksplisit di mana pun.

Yang ditambahkan: estimasi tahun **hanya di baris Core engineering**, tidak di 30+ item. Baris Domain & systems, Working knowledge, dan Additional sengaja dibiarkan tanpa durasi, karena levelnya memang "familiar", bukan core expertise.

```
Core engineering: TypeScript (2 yrs) · JavaScript (ES6+) · React ecosystem, v16 → Next.js 16 (7 yrs) ·
                  Node.js / Express (5+ yrs) · PHP / Laravel (9 yrs) · MySQL (9 yrs) ·
                  PostgreSQL · REST API · AWS / Azure (6 yrs)
```

**Cara angka itu diturunkan** (semuanya dari tanggal kerja yang sudah ada di CV ini, bukan perkiraan baru):

| Skill | Sumber | Rentang |
|---|---|---|
| React | Recruiter platform + candidate app ASTRNT 2019–2026, langgan.id 2019 | 7 yrs |
| PHP / Laravel | Cihanjuang 2016, Galamedia 2016–2017, ASTRNT 2019–2026 | 9 yrs |
| MySQL | Era Laravel 2016–2026 | 9 yrs |
| Node.js / Express | Public web ASTRNT 2019–2026, migrasi cloud 2020 (Node + PM2) | 5+ yrs |
| AWS / Azure | S3 di recruiter platform 2019–2026; Azure sejak migrasi 2020 | 6 yrs (batas bawah keduanya) |
| TypeScript | `ezreturn-fe` 2025, Dashboard V2 2026 | 2 yrs |
| Next.js | Dashboard V2 2026 + situs ini | 1 yr |
| PostgreSQL | `ShopeeMonitor` 2026, Prisma di Dashboard V2 | 2 yrs |

- **Yang ditolak: usulan awal "React / Next.js / TypeScript (6+ yrs)".** 7 tahun itu milik React; Next.js dan TypeScript baru masuk di generasi terakhir. Menggabungkannya akan meminjamkan durasi React ke dua skill yang belum selama itu, persis kesalahan yang sama seperti kasus "0 downtime" di atas.
- **Solusi yang dipilih Angga:** React dan Next.js digabung jadi satu label **ekosistem** ("React ecosystem, v16 → Next.js 16 (7 yrs)"), jadi 7 tahun itu eksplisit milik React dan Next.js ikut sebagai ekosistem yang sama, bukan diklaim setara. TypeScript tetap terpisah dan jujur di 2 yrs.
- **PostgreSQL tidak diberi tahun** meski ada di baris Core, karena rentangnya pendek. MySQL yang diberi tahun, dan urutannya dibalik jadi `MySQL (9 yrs) · PostgreSQL` supaya angka 9 tidak menempel ke PostgreSQL.
- **Kata "Laravel" masih utuh untuk ATS**, sekarang jadi `PHP / Laravel`. Tidak ada keyword ATS yang hilang dari baris ini.
- ⚠️ **Catatan lamaran yang perlu dikoreksi:** `public/angga-task/apply-to/zero-one-group/job.md` menulis "TypeScript/JavaScript sejak 2019". Itu benar untuk JavaScript, **salah untuk TypeScript**. Belum disentuh (file privat, keputusan Angga).
- **Konsekuensi yang perlu disadari:** tagline header tetap "7+ years" (mengacu ke masa B2B SaaS di ASTRNT) sementara baris skill menulis Laravel 9 yrs. Keduanya benar untuk lingkup masing-masing, tapi kalau mau diseragamkan, itu keputusan terpisah.

**Verifikasi putaran ini:** 2 halaman (ghostscript `pdfpagecount`), 0 em-dash, cek visual PDF halaman 2 (baris skill wrap jadi 2 baris, tidak ada heading orphan, tidak ada bullet terpotong).

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
