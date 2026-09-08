# Rencana Perbaikan Profil LinkedIn — Angga Kersana Munggaran

> File kerja personal. Sumber pembanding: CV utama `public/CV/Angga_Kersana_Munggaran_CV_2026.{html,pdf}` dan ekspor profil LinkedIn (`Profile (2).pdf`, 2026-09-08).
> **FAKTA SKALA (2026-09-08):** pernah handle ±**10.000 concurrent user** (puncak live) di **AWS** saat program **Bangkit by Google**. Angka **2.500** yang sering muncul = titik **insiden di Azure** yang di-resolve (N+1, index, row lock), BUKAN batas kapasitas. Setelah resolve seharusnya bisa ke 10k.
> Tujuan: LinkedIn dan CV konsisten sehingga recruiter/ATS yang cross-check tidak menemukan perbedaan yang mencurigakan. Semua angka dan tanggal harus bisa diverifikasi (git history / dokumen).
> **Keputusan penting: `langgan.id` TETAP dicantumkan** (tidak dihapus dari LinkedIn), malah diperjelas deskripsinya.

---

## A. Kritikal: identitas & brand

- [ ] **Nama perusahaan "Astronaut" → "ASTRNT".**
  Saat ini semua role di ASTRNT menampilkan pemberi kerja sebagai *"Astronaut"*. Perbaiki di tiap pos (Front End Web Developer & Full Stack Engineer) dengan memilih profil perusahaan ASTRNT yang benar, atau ketik manual nama brand `ASTRNT (astrnt.co)`. Pastikan tidak memilih/membuat perusahaan duplicate yang salah.
- [ ] **Headline disesuaikan.** Sekarang: *"Fullstack Engineer • Scalable Architecture • Monolith Modernization • AI-Assisted Engineering"*.
  **Keputusan label: "Senior Full-Stack Engineer"** (bukan "Software Engineer"): label peran spesifik yang umum dipakai job post & pencarian recruiter; "Software Engineer" terlalu generik. **"Product-minded" TETAP dipertahankan**.
  **TANPA keyword stack** supaya tidak terkunci ke React/Laravel; ke depan bisa apply Java + Angular tanpa harus ganti headline (label "Full-Stack" tetap akurat untuk kombinasi Java+Angular). **Dua jam terbang ditampilkan terpisah:** total software engineering sejak Galamedia **Agu 2016 → ±10 tahun (di 2026)**, dan fokus HR tech B2B SaaS ±7 tahun (masa ASTRNT).
  - **Headline final (rekomendasi):** `Senior Full-Stack Engineer • Product-minded • 10+ yrs Software Engineering • 7+ yrs B2B SaaS HR Tech` (~110 char, di bawah batas 220).
  - Cadangan lebih ringkas: `Senior Full-Stack Engineer • Product-minded • 10+ yrs SWE, 7+ yrs B2B SaaS HR Tech`.
  - **Catatan konsistensi CV:** CV tidak mencantumkan angka total "tahun software engineering", hanya tagline "7+ years in HR technology" (masa ASTRNT). Jadi headline LinkedIn yang menyebut total 10+ tahun tidak bertentangan, karena di CV pun riwayat pengalaman dimulai 2016 (recruiter bisa menghitung sendiri).
- [ ] **URL website/portfolio (dicek langsung 2026-09-08).** Tiga domain terdeteksi hidup:
  - `anggakersana-dev.vercel.app` = **portfolio utama** (title "Senior Full-Stack Engineer", dipakai CV). PASTIKAN INI yang tampil di LinkedIn.
  - `anggakersanamunggaran.vercel.app` = **blog pribadi** (yang sekarang ada di LinkedIn berlabel "(Blog)") → boleh dipertahankan asal label "Blog".
  - `portfolio-angga.vercel.app` = deploy lama, judul masih "Portfolio AnggA" → **jangan dipakai** (kalau perlu hapus project-nya di Vercel).
  **Tindakan:** tambahkan/ubah website di LinkedIn menjadi 2 entri yang jelas: portfolio `anggakersana-dev.vercel.app` bertipe Portfolio, dan blog `anggakersanamunggaran.vercel.app` bertipe Blog. Cara edit ada di chat konteks (Contact info → Edit → Websites).

## B. Pengalaman kerja: struktur, judul, tanggal (verifikasi dulu)

**Fakta terkonfirmasi (2026-09-08):**
- **ASTRNT posisi resmi:** Front-End Web Developer (Apr 2019 – Apr 2020) → Full Stack Engineer (Apr 2020 – Agu 2026). **"Senior" = SELF-CLAIM** (tidak ada promosi resmi dari perusahaan) → sebaiknya dipakai sebagai level positioning di headline/About, bukan sebagai judul jabatan dengan tanggal fiktif. (Keputusan tampil di entri masih terbuka, lihat bawah.)
- **langgan.id:** freelance, Agu 2019 – Des 2019 → **TETAP tercatat**, hanya diperjelas deskripsinya.
- **Edudok:** Sep 2018 – **Apr 2019** (8 bulan). **CV keliru menulis Feb 2019 → harus diubah jadi Apr 2019.** Label: `Edudok (Telkom Incubator)`.
- **PT Wahana Saabiq:** **PART-TIME**, Des 2017 – Apr 2018, IT Division (programmer, back-office web+mobile: Ionic + CodeIgniter REST). **[FINAL]**
- **CV Cihanjuang Inti Teknik:** **PART-TIME**, Apr 2016 – Jul 2016, Manufacturing Division (MRP web app, Laravel). Sudah jadi entri terpisah di CV & LinkedIn. **[FINAL]**
- **Galamedia:** Agu 2016 – Nov 2017 (tanggal sudah cocok; samakan judul + tambahkan galapersib.com).

**Keputusan ASTRNT (FINAL, 2026-09-08):** judul resmi di entri pengalaman, "Senior" hanya sebagai positioning di headline/About (karena self-claim, aman saat reference check). Struktur final yang dipakai di LinkedIn & CV:
- **Full Stack Engineer** · ASTRNT · Apr 2020 – Agu 2026 (full-time)
- **Front-End Web Developer** · ASTRNT · Apr 2019 – Apr 2020 (full-time)
- Mulai ASTRNT disamakan ke **Apr 2019** (sudah diterapkan di CV & LinkedIn). **[DONE]**
- [x] **langgan.id (FINAL 2026-09-08, SELESAI)**: TETAP tercatat; deskripsi yang benar = **SaaS website-builder platform** (bukan e-commerce), visual editor, React editor + Laravel backend. Judul di CV jadi **Full-Stack Developer (Freelance)**; teks sudah diterapkan di CV utama:
  > Built and maintained langgan.id, a SaaS website builder that lets non-technical users create and manage their own sites through a visual editor. Worked across the React-based builder editor and the Laravel backend (user management, billing, APIs), covering feature development, debugging, code review and performance tuning.
  **Sisa untuk LinkedIn:** samakan judul langgan.id jadi `Full-Stack Developer (Freelance)` + deskripsi di atas. Periode tumpang-tindih dengan Front-End Web Developer ASTRNT wajar untuk freelance; pastikan tidak terkesan meninggalkan ASTRNT.
- [x] **Edudok (SELESAI)**: label company "Edudokapps" → `Edudok (Telkom Incubator)`, tanggal Sep 2018 – Apr 2019. Tidak ada company page (perusahaan tutup); profil `/in/edudok-apps...` = personal → pakai teks polos. CV sudah diubah (Feb → Apr 2019).
- [x] **Wahana Saabiq & Cihanjuang (SELESAI)**: keduanya PART-TIME (Wahana Des 2017 – Apr 2018; Cihanjuang Apr 2016 – Jul 2016). Sudah jadi 2 entri terpisah di LinkedIn & CV.
- [x] **Galamedia (SELESAI)**: judul disamakan, deskripsi memakai `galamedia.pikiran-rakyat.com` + `galapersib.com`, plus bullet auto-share artikel ke official social media.

## C. Ringkasan / About

About LinkedIn sekarang kaya sisi teknis (upload chunked ~5 dtk, FFmpeg, Azure Media, Nginx, 92% bundle cut) tapi belum menyebut sisi product & domain yang jadi pembeda di CV (HR tech B2B SaaS, spec-to-ship owner, recruiter platform, AI scoring/CV parsing, migrasi AWS→Azure). Gabungkan keduanya. Draft usulan (bisa diedit bebas):

> Senior Full-Stack Engineer with 10+ years building web software, the last 7+ in HR technology (B2B SaaS). I build and modernise the hiring software that recruiters and applicants actually use: asynchronous video interviews, online proctoring and anti-cheat, AI-assisted scoring, and CV parsing. I own features end to end: I write the product spec, design and build it, and keep it running in production.
>
> At ASTRNT I helped build the candidate assessment platform from 2019, then led the rebuild of the flagship recruiter product, ASTRNT Dashboard V2, onto Next.js 16 and TypeScript, plus a cross-cloud AWS to Azure migration with no downtime. My work spans the recruiter dashboard, the candidate assessment app, a white-label family (Kognisi.id / Popskul / CDC), and enterprise landing pages for BCA, Google, Deloitte, Gojek, Sephora, Home Credit and KAI.
>
> Deep across frontend (React, Vue, AngularJS, Redux, Next.js, Nuxt), backend (Laravel, Node.js/Express, Python/Flask) and async systems (queues, webhooks, Redis, Socket.IO). Built media-heavy browser features that run reliably on desktop and mobile browsers: MediaRecorder video and screen capture, stream tracking, ~5s chunked uploads and strict lifecycle cleanup, plus FFmpeg processing before Azure Blob storage, and Azure Media and Speech Services in Python.
>
> Performance is a habit: served about 10,000 concurrent users on AWS during Google's Bangkit program, cut a production bundle by about 92% (40MB to 3MB), shipped safely with feature flagging, and resolved a production incident at 2,500 concurrent candidates.
>
> **[FINAL 2026-09-08 · ±1.578 char, di bawah limit ~2.600.]** 10k = puncak live concurrent di AWS saat Bangkit by Google; 2.500 = insiden produksi yang di-resolve (bukan batas kapasitas). Teknis dari About lama yg dipertahankan: queues/webhooks/Redis/Socket.IO, MediaRecorder+screen capture & lifecycle cleanup, FFmpeg→Azure Blob, Azure Media/Speech (Python), feature flagging. ✅ **feature flagging, Socket.IO, Azure Media Services terverifikasi** (konfirmasi Angga, 2026-09-08).

## D. Top skills, publikasi, penghargaan

- [ ] **Top Skills** sekarang cuma 2 (*Software Infrastructure Engineering*, *Software Design*). Target: 20–30 skill, konsisten dgn kolom skill CV + About + Experience. **3 teratas = yang tampil "featured", urutan paling penting dulu.** Rekomendasi urutan (bisa disusun ulang di LinkedIn):
  1. `TypeScript`, 2. `React`, 3. `Laravel`, lalu lanjut (grup berurutan sesuai peran): `Full-Stack Development`, `Next.js`, `Node.js`, `Redux`, `Vue`, `Nuxt`, `AngularJS`, `Tailwind CSS`, `Ionic`, `PHP`, `Lumen`, `CodeIgniter`, `JavaScript (ES6+)`, `Python`, `Flask`, `Express`, `SQL`, `MySQL`, `PostgreSQL`, `MongoDB`, `Redis`, `REST API`, `Prisma`, `AWS`, `Azure`, `Docker`, `Linux`, `WebRTC / MediaRecorder`, `FFmpeg`, `Socket.IO`, `Tableau`, `Web Scraping`, `AI SDKs (OpenAI, Anthropic, Gemini)`, `Azure Speech`, `Git`, `Jira`, `Confluence`, `Cypress`, `Twilio`.
  Catatan: headline tetap stack-agnostic (fleksibel Java/Angular), tapi daftar skill boleh menampilkan React/Laravel karena itu memang terkuat & paling dicari recruiter.
- [ ] **Publications**: tambahkan paper SNATI 2017 (co-author) dengan link `https://journal.uii.ac.id/Snati/article/view/8478`. Judul: *Identifikasi Suara Pengontrol Lampu Menggunakan MFCC dan Hidden Markov Model*.
- [ ] **Honors & Awards**: tambahkan 2 penghargaan ASTRNT yang ada di CV, lengkap dengan link sertifikat:
  - "Set Objective, Move Fast" Award (Q3 2025).
  - "We Do Excellence & Personal Growth" Award (No. 002/CERT/ATI/I/26, 2026).
- [ ] **Education**: perbaiki ejaan kampus menjadi **Universitas Jenderal Achmad Yani (UNJANI)** (yang dipakai LinkedIn, ejaan resmi; CV masih menulis "Ahmad"). Samakan nama bidang studi dengan ijazah (LinkedIn: Information Technology; CV: Informatics) dan tahun. IPK 3.13 opsional untuk ditampilkan.

## E. Konten teknis yang hanya ada di LinkedIn (tetap dipertahankan)

Rincian ini bagus dan tidak ada di CV, pastikan tidak terhapus saat edit:
- Upload media ~5 detik per-chunk untuk cegah timeout; lifecycle cleanup stream (stop all tracks) untuk stabilitas browser.
- Pengolahan media dengan FFmpeg sebelum disimpan ke Azure Blob; integrasi Azure Media Services & Azure Speech Services (Python).
- Dukungan screen recording desktop + penanganan batasan mobile; batasan durasi per section & per soal.
- Bundle production turun ~92% (40MB → 3MB); feature flagging untuk rilis bertahap.

## F. Pengaturan profil lain (opsional)

- [ ] Nyatakan **#OpenToWork** sesuai target (senior full-stack / product engineering), dengan "visibile to recruiters only" bila tidak ingin terlihat oleh kantor sekarang.
- [ ] Pastikan lokasi masuk akal (Indonesia / Cimahi, West Java) agar hasil pencarian lokal & remote akurat.
- [ ] Jika ada pos yang direkrut per-role (backend, frontend, devops, PM, QA), isi kolom *services / penawaran* di LinkedIn agar cocok dengan 5 varian CV di `public/CV/<role>/`.

---

## Urutan eksekusi yang disarankan

1. Fix A (nama perusahaan + headline + URL) dulu, karena paling kelihatan & paling cepat.
2. Konfirmasi fakta di B (tanggal/judul Edudok, Wahana Saabiq, dan pola ASTRNT), baru rapikan riwayat kerja.
3. Rewrite About (C) + tambah skills/publikasi/penghargaan (D).
4. Cek ulang konsistensi dengan CV setelah semua selesai.

> Catatan: repo ini public. File ini berisi rencana personal, simpan seperti file lamaran lain (branch `apply`, tidak di-push ke `main`).
