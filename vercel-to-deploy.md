# 🚀 Deploy ke Vercel

Panduan lengkap untuk deploy website portofolio ini ke Vercel.

---

## Opsi 1: Deploy via GitHub (Rekomendasi)

Cara paling praktis — Vercel otomatis build ulang setiap kali kamu push ke GitHub.

### 1. Push ke GitHub

```bash
# Init git (sudah dilakukan)
git add .
git commit -m "feat: initial portfolio website"

# Buat repo di GitHub dulu, lalu:
git remote add origin https://github.com/anggakersanamunggaran/portfolio-angga.git
git branch -M main
git push -u origin main
```

### 2. Deploy di Vercel Dashboard

1. Buka [vercel.com](https://vercel.com) dan login (pakai GitHub)
2. Klik **"Add New" → "Project"**
3. Pilih repo `portfolio-angga`
4. **Framework preset**: otomatis terdeteksi sebagai **Next.js**
5. Biarkan semua setting default — **jangan ubah apapun**
6. Klik **"Deploy"**

✅ Selesai! Vercel akan otomatis:
- Build project dengan `npm run build`
- Deploy ke URL `portfolio-angga.vercel.app`
- Setup ulang setiap kali ada push ke `main`

### Custom Domain (Opsional)

Di dashboard Vercel:
1. Buka project → **Settings** → **Domains**
2. Masukkan domain kamu (misal: `anggakersana.dev`)
3. Ikuti instruksi DNS (arahkan nameserver ke Vercel)

---

## Opsi 2: Deploy via Vercel CLI

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login ke Vercel

```bash
vercel login
```
> Akan membuka browser untuk login via GitHub.

### 3. Deploy

```bash
# Deploy ke production
vercel --prod
```

Atau deploy preview dulu:

```bash
vercel
```

---

## Konfigurasi Penting

### Environment Variables

Project ini **tidak memerlukan environment variables** — semua konten statis.

### Framework

Project sudah otomatis terdeteksi sebagai **Next.js** oleh Vercel.

### Build Settings (default — tidak perlu diubah)

| Setting          | Value              |
| ---------------- | ------------------ |
| Framework        | Next.js            |
| Build Command    | `npm run build`    |
| Output Directory | `.next` (otomatis) |
| Install Command  | `npm install`      |

---

## Struktur File untuk Vercel

```
.
├── .vercel/            # Auto-generated (di .gitignore)
├── .next/              # Build output (di .gitignore)
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   ├── components/     # UI components
│   ├── data/           # Portfolio content data
│   └── lib/            # Utilities
├── public/             # Static assets
├── vercel.json         # Vercel config
├── next.config.ts      # Next.js config
├── package.json        # Dependencies
└── README.md           # Project docs
```

---

## Tips

### ✅ Deploy otomatis tiap push

Cukup push ke branch `main`, Vercel build ulang otomatis.

### ✅ Preview Deployments

Setiap PR/ branch akan punya URL preview unik — bagus untuk review sebelum merge ke production.

### ✅ Performance

- Semua halaman **static generated** — super cepat
- Built-in CDN dari Vercel (Edge Network)
- Automatic image optimization (Next.js)

### ✅ Monitoring

- Vercel Dashboard → **Analytics** untuk lihat traffic
- **Logs** untuk lihat error runtime

---

## Troubleshooting

### Build gagal?

Coba lokal dulu:

```bash
npm run build
```

Kalau lokal berhasil tapi Vercel gagal, cek:
1. **Node.js version** — Vercel pakai Node 18+/20+ (harusnya cocok)
2. **Dependencies** — pastikan `node_modules` tidak di-commit
3. **Environment** — kalau pake env variables, set di Vercel Dashboard

### Domain not propagating?

- DNS changes butuh 5-30 menit
- Pastikan sudah arahkan ke DNS Vercel: `76.76.21.21`

### 404 on page refresh?

Ini Next.js App Router — Vercel handle ini otomatis. Pastikan pake framework preset Next.js, bukan static export.

---

## Link Penting

- [Vercel Dashboard](https://vercel.com)
- [Vercel Docs: Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
- [Project Settings → Domains](https://vercel.com/docs/projects/domains)
