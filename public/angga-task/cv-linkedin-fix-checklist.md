# Checklist Perbaikan CV & LinkedIn — Angga Kersana Munggaran

> Dibuat 2026-09-08. Acuan fakta: konfirmasi Angga + `public/CV/original /CV Angga Kersana Munggaran Original.pdf` + cek domain live.
> Status CV utama sudah dikerjakan dan diverifikasi; LinkedIn sebagian dikerjakan manual oleh Angga; 5 varian CV belum.

---

## 1. Fakta final (acuan semua edit)

- **ASTRNT:** mulai **Apr 2019** (bukan May). Jenjang resmi: `Front-End Web Developer` (Apr 2019–Apr 2020) → `Full Stack Engineer` (Apr 2020–Agu 2026). "Senior" = self-claim → hanya di headline/About, bukan judul entri.
- **langgan.id:** freelance **Full-Stack Developer**, Agu–Des 2019. SaaS **website builder** (visual editor): React editor + Laravel backend (user management, billing, API). BUKAN e-commerce.
- **Edudok (PT Rumah Sakit Padjadjaran, Telkom Incubator):** Sep 2018–**Apr 2019** (8 bulan). Stack lama: Lumen (PHP) + AngularJS (opsional disebut).
- **PT Wahana Saabiq:** **Part-time**, Des 2017–Apr 2018, IT Division. Back-office web+mobile (Ionic + CodeIgniter REST).
- **CV Cihanjuang Inti Teknik:** **Part-time**, **Apr–Jul 2016**, Manufacturing Division. MRP web app (Laravel).
- **Galamedia:** Agu 2016–Nov 2017. Situs live: `galamedia.pikiran-rakyat.com` + `galapersib.com` (`galamedianews.com` sudah mati).
- **Kampus:** ejaan resmi **Universitas Jenderal Achmad Yani (UNJANI)**.
- **Skala (2026-09-08):** pernah handle ±**10.000 concurrent user** (puncak live) di **AWS** saat program **Bangkit by Google**. Angka **2.500** = titik **insiden produksi di Azure** yang di-resolve (N+1/index/row lock), **BUKAN batas kapasitas**.
- **Kognisi/Tableau (2026-09-08, SELESAI):** saat membangun Kognisi, **Kompas Gramedia** mengajukan request data monitoring ke ASTRNT (B2B SaaS), dan Angga yang membangunnya via **Tableau**. Sudah masuk CV utama (bullet Kognisi: "...Tableau BI connector serving data-monitoring requests for Kompas Gramedia") + highlight LinkedIn #1. Entry #1 LinkedIn = 1.942 char.

## 2. CV utama (`public/CV/Angga_Kersana_Munggaran_CV_2026.{html,pdf}`) — ✅ DONE

- [x] Mulai ASTRNT → Apr 2019; judul entri → `Full-Stack Engineer (started as Front-End Web Developer)`
- [x] ctx menampilkan jenjang: FE Web Dev (Apr 2019) → Full-Stack Eng (Apr 2020)
- [x] Edudok berakhir → Apr 2019
- [x] Entri gabungan Wahana & Cihanjuang dipisah (Wahana part-time Des 2017–Apr 2018; Cihanjuang part-time Apr–Jul 2016)
- [x] langgan.id ditambahkan (Full-Stack Developer freelance, SaaS website builder)
- [x] Galamedia: domain live `galamedia.pikiran-rakyat.com` + `galapersib.com`
- [x] Ejaan kampus → Achmad Yani
- [x] PDF di-render ulang (headless Chrome) → 2 halaman A4, verifikasi teks PASS

## 3. LinkedIn — sebagian dikerjakan manual oleh Angga

- [x] Nama perusahaan "Astronaut" → ASTRNT (dilakukan Angga)
- [x] Headline final dipasang (dilakukan Angga)
- [x] URL website: tambah portfolio `anggakersana-dev.vercel.app` + label blog (dilakukan Angga)
- [ ] **ASTRNT entri:** rapikan jadi 2 entri judul resmi (FE Web Dev Apr 2019–Apr 2020; Full Stack Eng Apr 2020–Agu 2026)
- [ ] **langgan.id:** judul → `Full-Stack Developer (Freelance)` + deskripsi website builder (teks final di bawah)
- [x] **Edudok:** label company "Edudokapps" → `Edudok (Telkom Incubator)` (2026-09-08: tidak ada company page LinkedIn, perusahaan tutup; profil `/in/edudok-apps...` = personal, tidak bisa di-link → pakai teks polos. Arsip FB: facebook.com/edudok.id)
- [ ] **Cihanjuang:** tambah entri baru part-time `CV Cihanjuang Inti Teknik` (Apr–Jul 2016)
- [ ] **Galamedia:** deskripsi → `galamedia.pikiran-rakyat.com` + `galapersib.com`
- [ ] **Education:** ejaan → Achmad Yani; samakan bidang & tahun dengan ijazah
- [ ] **About rewrite** (gabung sisi product + teknis, lihat draf di `linkedin-profile-fix-plan.md`)
- [ ] **Top Skills** tambah (~15-20, daftar di `linkedin-profile-fix-plan.md`)
- [ ] **Publications** (paper SNATI 2017) & **Honors/Awards** (2 sertifikat ASTRNT)
- [ ] **#OpenToWork** + lokasi dicek

### Teks final langgan.id (untuk LinkedIn & varian CV)
> Built and maintained langgan.id, a SaaS website builder that lets non-technical users create and manage their own sites through a visual editor. Worked across the React-based builder editor and the Laravel backend (user management, billing, APIs), covering feature development, debugging, code review and performance tuning.

## 4. Varian CV per-role (`public/CV/<role>/` × 5) — ❌ BELUM

Terapkan koreksi fakta yang sama seperti CV utama ke masing-masing HTML, lalu render ulang PDF:
- [ ] `backend-engineer/`
- [ ] `frontend-engineer/`
- [ ] `devops/`
- [ ] `product-manager/`
- [ ] `quality-assurance/`
Catatan: isi & penekanan tiap varian beda, tapi blok tanggal/struktur (ASTRNT Apr 2019, Edudok Apr 2019, split Wahana/Cihanjuang, langgan.id, Galamedia domain, Achmad Yani) harus sinkron.

## 5. Keputusan terbuka / opsional

- [x] **Edudok:** sebutan stack `Lumen (PHP) + AngularJS` ditambahkan di bullet modul (CV utama, 2026-09-08)
- [ ] **Diary Kesehatan:** perlu dimasukkan? (opsional, kecil)
- [ ] Cek ulang jumlah halaman & nol em-dash setelah tiap render.

## 6. Yang BELUM dikerjakan (catatan 2026-09-08 sore)

> CV utama sudah final untuk hari ini (koreksi fakta + format + TOEFL + skill). Yang belum: sinkron ke 5 varian + sisa LinkedIn (sedang dikerjakan Angga di bagian Experience).

**A. Sinkron ke 5 varian CV (`backend-engineer/`, `frontend-engineer/`, `devops/`, `product-manager/`, `quality-assurance/`)**
- [ ] Semua koreksi fakta CV utama (ASTRNT Apr 2019 & split title, Edudok Apr 2019, split Wahana/Cihanjuang, langgan.id, Galamedia domain, Achmad Yani)
- [ ] **TOEFL ITP: 500** (Listening 48, Structure 50, Reading 52) + link Drive → entri sertifikasi
- [ ] **Format heading dua-baris** (role di atas, org di bawah) untuk pos lama Edudok/Wahana/Galamedia/Cihanjuang
- [ ] **Skill tambahan:** `Python / Flask`; `AngularJS / Ionic`; `CodeIgniter`; `Twilio`; baris baru **Media & real-time** (MediaRecorder/WebRTC, FFmpeg, JWPlayer, chunked video upload, real-time quality checks)

**B. Verifikasi kecil yang tersisa**
- [ ] **Twilio:** konfirmasi konteks pemakaiannya (tidak ditemukan di repo/CV asli; user mengonfirmasi sebagai skill) — apakah tetap dipertahankan
- [ ] **Tanggal tes TOEFL** (opsional): sertifikat expired Mei 2018 → sengaja tidak dicantumkan, hanya skor. Kalau mau tanggal tes, perlu info dari Angga

**C. LinkedIn — sedang dikerjakan Angga (Experience), sisanya masih pending**
- [ ] ASTRNT jadi 2 entri (Full Stack Engineer Apr 2020–Agu 2026; Front-End Web Developer Apr 2019–Apr 2020)
- [ ] langgan.id: judul `Full-Stack Developer (Freelance)` + deskripsi website builder
- [ ] Edudok label → `Edudok (Telkom Incubator)`
- [ ] Cihanjuang entri part-time baru
- [ ] Galamedia deskripsi domain + langgan.id desc
- [ ] Education, About rewrite, Top Skills (tambah media/Flask/Ionic/Twilio dst.), Publications, Honors (TOEFL?), #OpenToWork

**D. Fakta skala 10.000 (baru, belum diterapkan di mana pun selain plan LinkedIn)**
- [ ] CV utama (ASTRNT): tambah bullet ±10k concurrent di AWS saat Bangkit by Google; 2.500 tetap sbg insiden Azure yang di-fix (bukan kapasitas)
- [ ] 5 varian CV ikut menyesuaikan
- [ ] Website (portfolio.ts: `heroProof` & halaman /career): angka proof "2.500 concurrent users" perlu ditinjau maknanya, pastikan tidak dibaca sbg batas kapasitas. Verifikasi angka 10k ke sumber sebelum dipakai publik
