# public/signature/

Aset gambar untuk **signature email** (Gmail → Settings → Signature), disajikan publik
lewat domain portofolio supaya punya URL HTTPS.

| File | Ukuran sumber | Dipakai sebagai |
|---|---|---|
| `photo.jpg` | 160×160 JPEG | foto profil, tampil 84×84, sudah bulat + ring lavender di pixel |
| `gmail.png` | 64×64 PNG | ikon link Email, tampil 18×18 |
| `portfolio.png` | 64×64 PNG | ikon link Portfolio, tampil 18×18 |
| `linkedin.png` | 64×64 PNG | ikon link LinkedIn, tampil 18×18 |
| `github.png` | 64×64 PNG | ikon link GitHub, tampil 18×18 |

URL: `https://anggakersana-dev.vercel.app/signature/<file>`

## Kenapa ada di sini, bukan di `public/angga-task/`

Signature HTML-nya sendiri (`public/angga-task/signature-gmail-preview.html`) memuat
foto, nomor HP, dan quote, jadi file itu **tetap hanya ada di branch `apply`** (repo
privat). Gambarnya dipisah ke sini karena penerima email harus bisa mengambilnya tanpa
login: gambar wajib berada di repo publik yang ter-deploy.

`photo.jpg` di sini adalah crop bulat dari foto yang **sudah tampil publik** di
`public/profile.jpg` dan `public/avatar.jpg`, jadi tidak ada eksposur baru.

## Jangan diubah tanpa alasan

`photo.jpg` dan empat ikon ini adalah **satu-satunya salinan** yang direferensikan
signature email yang sudah beredar. Ganti nama, pindahkan, atau hapus filenya akan
membuat gambar di signature tersebut rusak di semua email yang sudah terkirim.
