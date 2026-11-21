# Kampil — Brankas Info Akses

Kampil adalah brankas pribadi untuk menyimpan info akses penting di perangkat kamu sendiri: kontak, nomor rekening, akun login (username dan password), kode/skrip, dan catatan. Semua isi dikunci dengan satu master password dan dienkripsi di perangkat — tidak ada server Kampil yang menerima isi brankasmu dalam bentuk teks biasa.

Nama folder backup di Google Drive juga bernama **Kampil** dan selalu privat.

## Fitur utama

- **5 kategori:** Kontak, Rekening / Akun Bank, Akun Login, Kode / Skrip, dan Catatan.
- **Akun Login** dilengkapi tombol tampil/sembunyi, salin, dan generator password acak.
- **Kode / Skrip** tampil seperti notepad kode (JavaScript, HTML, Apps Script, dan lain-lain) dan bisa disalin utuh.
- **Pencarian** di semua kategori dan penguncian otomatis setelah 5 menit tanpa aktivitas.
- **Password yang disalin** dibersihkan sendiri dari clipboard setelah 20 detik.
- **Bisa diinstal sebagai aplikasi (PWA)** di Android dan desktop bila di-deploy lengkap lewat GitHub Pages — lihat cara instal di bawah.
- **Backup terenkripsi** berupa file .kampil: manual (unduh / impor) dan otomatis berkala ke folder **Kampil** di Google Drive yang privat.
- **Sinkronisasi antar perangkat lewat Drive:** satu file sinkron terenkripsi `kampil-sync.kampil` di folder Kampil yang sama membuat isi brankas saling mengikuti antar perangkat tanpa ekspor-impor manual — lihat bagian Sinkronisasi di bawah.
- **Kode pemulihan** untuk mengganti master password bila lupa, tanpa menghapus isi brankas.

## Keamanan — baca ini dulu

- Enkripsi **AES-256-GCM** (Web Crypto) dengan kunci turunan **PBKDF2 250.000 putaran**.
- Master password **tidak disimpan di mana pun** dan tidak dikirim ke server mana pun. Tidak ada tombol reset password seperti di layanan online — itu disengaja, karena tombol reset yang bisa membuka brankas tanpa kunci lama berarti enkripsinya bocor.
- Isi brankas tersimpan terenkripsi di penyimpanan perangkat (IndexedDB). File backup .kampil juga terenkripsi, jadi aman disimpan di mana saja.
- Yang diunggah ke Google Drive hanyalah file .kampil terenkripsi, dan hanya bila backup Drive tersambung oleh kamu sendiri.

## Kode pemulihan

### Saat membuat brankas baru

1. Buat master password (minimal 8 karakter), lalu lanjut.
2. Kampil menampilkan **satu kode pemulihan 16 karakter** dalam format `XXXX-XXXX-XXXX-XXXX` — contoh bentuknya empat grup berisi empat huruf/angka.
3. Kode ini **hanya tampil satu kali**. Kamu wajib **mengetik ulang** kode itu untuk konfirmasi sebelum brankas selesai dibuat.
4. Simpan kode di **kertas** dan simpan kertasnya di tempat aman **di luar HP**. Jangan disimpan di HP yang sama, jangan di-screenshot ke galeri, dan jangan dibagikan ke siapa pun — siapa pun yang punya kode ini bisa membuka brankasmu.

### Kalau lupa master password

1. Di layar kunci, ketuk **Lupa password? Pulihkan dengan kode pemulihan**.
2. Masukkan kode pemulihan yang kamu simpan.
3. Buat master password baru. **Isi brankas tetap utuh** — tidak ada data yang dihapus.
4. Kode pemulihan lama **langsung tidak berlaku**. Kampil menampilkan kode pemulihan baru satu kali — simpan lagi di kertas di luar HP, lalu centang konfirmasi penyimpanan untuk masuk.

### Membuat ulang kode pemulihan

Buka **Pengaturan → Kode pemulihan → Buat ulang kode pemulihan**, masukkan master password saat ini untuk verifikasi. Kode baru tampil satu kali dan kode lama langsung gugur. Kode lama memang tidak bisa ditampilkan lagi, karena kode pemulihan tidak pernah disimpan dalam bentuk teks biasa.

### Batas yang jujur

- File backup **.kampil dibuka dengan master password yang dipakai saat file itu dibuat**, bukan dengan kode pemulihan. Kode pemulihan hanya membuka brankas yang ada di perangkat.
- Kalau master password **dan** kode pemulihan sama-sama hilang, isi brankas **tidak bisa dibuka lagi** — memang begitu rancangan enkripsinya. Jalan terakhir di Pengaturan adalah **Hapus brankas dan buat baru** (dengan konfirmasi dua kali); isi lama hilang, tetapi file .kampil yang sudah kamu unduh atau yang ada di Drive tidak ikut terhapus.
- Brankas lama yang dibuat sebelum fitur ini ada akan dimigrasikan otomatis dan diminta membuat kode pemulihan lewat banner / Pengaturan.

## Isi paket GitHub Pages ini

Paket ZIP dari tombol **Unduh Paket GitHub** di dalam Kampil berisi struktur berikut. **Semua file ini harus ada di repo** agar tombol Instal muncul:

```
index.html                <- aplikasi, di root repo
manifest.webmanifest      <- manifest PWA, di root repo
sw.js                     <- service worker, di root repo (sejajar index.html)
.nojekyll                 <- agar GitHub Pages menyajikan file apa adanya
README.md                 <- file ini
assets/
  icon-192.png            <- ikon 192 x 192
  icon-512.png            <- ikon 512 x 512
  icon-maskable-512.png   <- ikon maskable 512 x 512
  apple-touch-icon.png    <- ikon untuk iPhone/iPad
```

Kenapa posisi file penting?

- Chrome hanya menawarkan **Instal aplikasi** bila halaman HTTPS memiliki manifest yang valid dengan ikon 192 dan 512, start_url dan scope yang benar, **dan** service worker aktif yang mengontrol halaman itu.
- Scope service worker mengikuti folder file-nya. `sw.js` yang ditaruh di dalam folder lain tidak bisa mengontrol `index.html` di root — karena itu `sw.js` **wajib di root**.
- Kalau salah satu syarat hilang, Chrome menurunkan tawarannya menjadi **Buat pintasan** saja dan menulis Aplikasi ini tidak dapat diinstal. Pintasan hanya membuka Chrome; aplikasi terinstal berjalan layar penuh dari ikonnya sendiri.

## Cara instal lewat GitHub Pages

### Langkah 1 — Buat repo

1. Masuk ke github.com, buat repository baru, misalnya bernama `kampil`. Boleh Public (kode aplikasinya memang tidak berisi data kamu — data brankas ada di perangkat masing-masing, bukan di repo).

### Langkah 2 — Unggah SELURUH isi paket

1. Ekstrak ZIP paket GitHub dari Kampil.
2. Unggah **semua** file dan folder hasil ekstrak ke root repo: `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, `README.md`, **dan** folder `assets/` lengkap dengan ikon-ikonnya.
3. Periksa lagi strukturnya di halaman repo: `sw.js` dan `manifest.webmanifest` harus sejajar dengan `index.html`, bukan di dalam folder lain.

### Langkah 3 — Aktifkan GitHub Pages

1. Di repo, buka **Settings → Pages**.
2. Di **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
3. Tunggu 1–3 menit sampai muncul alamat situs, bentuknya `https://username.github.io/kampil/`.

### Langkah 4 — Instal di Android (Chrome)

1. Buka alamat `github.io` itu **langsung di Chrome Android** — bukan dari pratinjau di dalam aplikasi lain atau browser bawaan aplikasi chat.
2. Tunggu sekitar 10 detik di halaman itu (agar service worker selesai terdaftar).
3. Ketuk tombol **Instal Kampil** di kotak Pasang Kampil sebagai aplikasi bila muncul, atau buka menu **titik tiga → Instal aplikasi**.
4. Setelah terinstal, Kampil muncul di laci aplikasi dan layar utama dengan ikonnya sendiri dan berjalan layar penuh.
5. Hapus pintasan lama di beranda bila sebelumnya terlanjur membuat pintasan — pintasan dan aplikasi terinstal adalah dua hal berbeda.

### Instal di desktop (Chrome / Edge)

Buka alamat `github.io` di Chrome atau Edge desktop, lalu klik ikon **Instal** di sisi kanan address bar, atau menu titik tiga → **Instal Kampil**.

### Instal di iPhone / iPad

iOS tidak memakai tombol Instal dari manifest seperti Android. Buka alamat `github.io` di **Safari**, ketuk **Bagikan → Tambahkan ke Layar Utama → Tambah**.

## Cara pakai pertama kali

1. Buka Kampil yang sudah terinstal (atau alamat github.io-nya).
2. Buat master password, simpan kode pemulihan di kertas di luar HP (lihat bagian Kode pemulihan), lalu mulai isi lewat tombol **+ Tambah isi**.
3. Pilih kategori, isi kolomnya, dan simpan. Ulangi untuk kontak, rekening, akun login, kode, dan catatanmu.

## Backup dan pemulihan

### Backup manual — file .kampil

1. Buka **Backup & Drive → Unduh file .kampil** (atau **Backup sekarang**).
2. Simpan file itu di tempat aman. File sudah terenkripsi; tanpa master password saat file dibuat, isinya tidak terbaca.
3. Untuk memulihkan: di layar kunci ketuk **Pulihkan dari file backup**, atau di dalam aplikasi buka **Backup & Drive → Impor file .kampil**, pilih file, lalu masukkan master password file tersebut. Mengimpor dari dalam aplikasi akan menggantikan isi brankas saat ini setelah konfirmasi.

### Pindah HP

Cara termudah adalah **Sinkronisasi antar perangkat lewat Drive** (lihat bagian khusus di bawah): aktifkan sekali di tiap perangkat, isi mengikuti sendiri. Cara manual lewat file tetap tersedia:

1. Di HP lama, unduh file .kampil terbaru.
2. Di HP baru, buka Kampil, ketuk **Pulihkan dari file backup**, dan masukkan master password yang sama.
3. Setelah masuk, buat kode pemulihan baru untuk brankas di HP baru itu lewat Pengaturan bila diminta.

### Backup otomatis ke Google Drive (folder Kampil, privat)

- Backup otomatis **hanya berjalan saat Kampil terbuka / tidak terkunci** — halaman web tidak bisa berjalan di latar belakang selamanya seperti aplikasi native.
- Pilih interval di **Backup & Drive → Backup otomatis**: Setelah ada perubahan, Setiap 6 jam, Harian, atau Mingguan. Log backup terakhir dan statusnya tampil di panel yang sama.
- Hasil backup masuk ke folder bernama **Kampil** di Drive kamu. Folder dan file dibuat dengan akses **privat**: tidak dibagikan ke siapa pun, bukan publik, dan bukan siapa saja yang punya link. Kampil tidak pernah mengubahnya menjadi publik.
- Bila jadwal tiba tetapi Drive belum tersambung, statusnya dicatat sebagai **Menunggu** — bukan gagal diam-diam — dan backup langsung dijalankan begitu Drive tersambung dan Kampil terbuka.

#### Menyambungkan Drive (sekali saja, butuh Client ID milikmu)

1. Buka console.cloud.google.com dan buat project baru, misalnya bernama Kampil.
2. Aktifkan **Google Drive API** (APIs & Services → Library).
3. Di **OAuth consent screen**, pilih External, isi nama aplikasi, lalu tambahkan email kamu sendiri sebagai test user.
4. Di **Credentials → Create Credentials → OAuth client ID → Web application**, tambahkan alamat asal situs kamu di Authorized JavaScript origins — untuk GitHub Pages bentuknya `https://username.github.io` — lalu salin Client ID-nya.
5. Di Kampil, buka **Backup & Drive**, tempel Client ID itu, lalu ketuk **Sambungkan Google Drive** dan setujui izinnya.
6. Izin yang diminta hanya **drive.file**: Kampil hanya bisa melihat file dan folder yang ia buat sendiri, bukan seluruh Drive kamu. Client ID bukan password dan aman disimpan di aplikasi.

## Sinkronisasi antar perangkat lewat Drive

Selain backup berkala, Kampil bisa **menyinkronkan** isi brankas antar perangkat lewat satu file yang sama-sama terenkripsi:

- Aktifkan di **Backup & Drive → Sinkronisasi antar perangkat → Otomatis**, lalu sambungkan Drive. Kampil menaruh satu file tetap bernama `kampil-sync.kampil` di folder **Kampil** (privat) dan menimpanya setiap ada perubahan.
- Perangkat lain mengambil versi terbaru itu secara otomatis saat Kampil dibuka dan Drive tersambung — tidak perlu ekspor-impor manual lagi.
- **Syarat:** master password **sama persis** di semua perangkat, akun Google Drive yang sama tersambung di tiap perangkat (Client ID diisi di tiap perangkat), dan internet saat sinkron berjalan. Sinkronisasi hanya berjalan saat Kampil terbuka / tidak terkunci — halaman web tidak bisa bekerja di latar belakang selamanya.
- **Perangkat kedua:** buat brankas baru dengan master password yang sama (boleh masih kosong), sambungkan Drive yang sama, lalu aktifkan sinkronisasi — isi dari Drive akan mengisi brankas kosong itu. Brankas kosong tidak pernah menimpa brankas yang sudah berisi.
- **Konflik:** bila dua perangkat mengubah isi sebelum sempat sinkron, versi yang terakhir diubah yang dipakai. Versi yang kalah tidak hilang: disimpan sebagai `kampil-konflik-TTTTBBHH-jjmmdd.kampil` di folder Kampil dan bisa dibuka lewat **Impor file .kampil**.
- Yang terlihat di luar enkripsi hanya metadata kecil: nomor versi (waktu perubahan terakhir), ID acak perangkat penulis, dan waktu sinkron. Isi brankas tetap terenkripsi AES-256-GCM dengan kunci turunan master password.
- Backup berkala biasa (file `kampil-backup-…`) tetap berjalan terpisah sebagai cadangan versi lama.

## Troubleshooting instal

**Yang muncul hanya Buat pintasan / Aplikasi ini tidak dapat diinstal**

- Pastikan **seluruh isi ZIP** terunggah, bukan index.html saja: cek `sw.js` dan `manifest.webmanifest` ada di root repo, dan folder `assets/` berisi ikon 192 dan 512.
- Pastikan membukanya lewat **HTTPS** di alamat github.io (GitHub Pages sudah HTTPS) dan **langsung di Chrome Android**, bukan di browser dalam aplikasi lain.
- Tunggu sekitar 10 detik setelah halaman terbuka, lalu coba menu titik tiga lagi. Di kunjungan pertama service worker kadang baru aktif; muat ulang halaman sekali bila perlu.
- Hapus pintasan lama, lalu coba instal lagi. Bila masih gagal, hapus data situs untuk alamat itu di pengaturan Chrome, lalu buka ulang.

**Tombol Instal Kampil di dalam halaman tidak memunculkan dialog**

Artinya Chrome belum memberikan prompt instal ke halaman ini — ikuti daftar periksa di atas, lalu pakai menu titik tiga → Instal aplikasi.

**Data hilang setelah ganti HP atau hapus aplikasi**

Data brankas tersimpan lokal di perangkat. Tanpa file .kampil atau backup Drive, data tidak ikut pindah. Biasakan backup setelah menambah isi penting.

**Lupa master password**

Pakai kode pemulihan (lihat bagian Kode pemulihan). File .kampil tetap dibuka dengan password saat file dibuat.

## FAQ

**Apakah isi brankas dikirim ke GitHub?**
Tidak. Repo GitHub hanya berisi kode aplikasi. Isi brankas tersimpan terenkripsi di perangkat kamu dan tidak pernah masuk ke repo.

**Apakah Kampil ada di Play Store?**
Belum. Play Store membutuhkan akun Google Play Developer dan pembungkusan PWA (misalnya TWA). Cara instal resmi saat ini adalah lewat GitHub Pages seperti di atas.

**Apakah backup Drive bisa dibaca Google atau orang lain?**
File yang diunggah adalah file .kampil terenkripsi. Folder Kampil di Drive bersifat privat dan tidak dibagikan; tanpa master password, isi file tidak terbaca.

## Penggunaan

Kampil dibuat untuk pemakaian pribadi menyimpan info akses milik sendiri. Simpan master password dan kode pemulihan dengan serius — keduanya adalah satu-satunya kunci ke brankasmu.
