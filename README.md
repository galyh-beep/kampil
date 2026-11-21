# Kampil

Brankas pribadi terenkripsi untuk menyimpan info akses penting — kontak, rekening bank, akun login, kode skrip, dan catatan — dalam satu aplikasi yang aman, protektif, dan hanya berjalan di perangkatmu sendiri.

Kampil bukan aplikasi cloud. Tidak ada server Kampil yang menyimpan password, nomor rekening, atau catatanmu. Semua isi brankas dikunci dengan satu master password, dienkripsi di perangkatmu, dan hanya bisa dibuka olehmu.

> Dokumen ini adalah teks siap pakai untuk `README.md` di GitHub. Salin seluruh isinya ke file `README.md` di root repositori Kampil.

---

## Daftar isi

- [Tentang Kampil](#tentang-kampil)
- [Fitur utama](#fitur-utama)
- [Keamanan dan cara data disimpan](#keamanan-dan-cara-data-disimpan)
- [Persyaratan](#persyaratan)
- [Cara instal](#cara-instal)
- [Penggunaan pertama](#penggunaan-pertama)
- [Kode pemulihan](#kode-pemulihan)
- [Lupa master password](#lupa-master-password)
- [Cara memakai per kategori](#cara-memakai-per-kategori)
- [Backup dan pemulihan](#backup-dan-pemulihan)
- [Backup otomatis ke Google Drive](#backup-otomatis-ke-google-drive)
- [Pindah perangkat dan pemulihan data](#pindah-perangkat-dan-pemulihan-data)
- [Troubleshooting](#troubleshooting)
- [Batasan saat ini](#batasan-saat-ini)
- [Pertanyaan yang sering diajukan](#pertanyaan-yang-sering-diajukan)

---

## Tentang Kampil

Kampil dibuat untuk satu keperluan yang spesifik: menyimpan info akses yang selama ini tersebar di chat, catatan biasa, ingatan, dan file yang tidak terkunci.

Dengan Kampil, semua info itu dipindah ke satu brankas terkunci:

- Tidak perlu lagi mencari nomor rekening di riwayat chat.
- Tidak perlu lagi menebak password lama untuk email, media sosial, atau akses admin web.
- Tidak perlu lagi menyimpan potongan kode penting di aplikasi catatan yang terbuka untuk siapa saja yang memegang HP-mu.

Kampil ditujukan untuk pemakaian pribadi, bukan untuk berbagi akses dengan tim. Jika HP-mu dibuka orang lain, brankas tetap terkunci.

## Fitur utama

### 5 kategori isi brankas

| Kategori | Isi yang disimpan | Contoh |
|---|---|---|
| Kontak | Nama, nomor HP, email, dan keterangan kontak penting | Kontak keluarga, rekan kerja, kontak darurat |
| Rekening | Nomor rekening dan info akun bank | Nama bank, nomor rekening, nama pemilik, cabang |
| Akun Login | Username, email, password, dan alamat layanan | Email, media sosial, akses admin web, layanan Google |
| Kode | Potongan kode dan skrip, seperti di notepad untuk programmer | JavaScript, HTML, CSS, Apps Script, konfigurasi |
| Catatan | Catatan bebas seperti di aplikasi Keep | PIN cadangan, jawaban pertanyaan keamanan, pengingat akses |

### Fitur keamanan dan pendukung

- **Satu master password** untuk membuka seluruh brankas.
- **Kode pemulihan 16 karakter** (format `XXXX-XXXX-XXXX-XXXX`) yang dibuat saat brankas dibuat — satu-satunya jalan masuk kembali bila master password lupa, tanpa menghapus isi brankas.
- **Enkripsi AES-256-GCM** — isi brankas tersimpan dalam keadaan terenkripsi, bukan teks biasa.
- **Kunci otomatis setelah 5 menit** tidak dipakai, sehingga brankas tidak tertinggal dalam keadaan terbuka.
- **Generator password** di kategori Akun Login, untuk membuat password baru yang kuat langsung di dalam aplikasi.
- **Penyimpanan lokal saja** — data berada di perangkatmu, bukan di server pihak ketiga.
- **Backup file terenkripsi `.kampil`** yang bisa diunduh, disimpan, dan diimpor kembali.
- **Backup otomatis berkala ke Google Drive** ke folder khusus bernama **Kampil** yang bersifat private.
- **Bisa diinstal seperti aplikasi** (PWA) di HP Android dan di desktop, dengan ikon di layar utama.

---

## Keamanan dan cara data disimpan

Pahami bagian ini sebelum memakai Kampil, karena model keamanannya berbeda dari aplikasi catatan atau password manager berbasis cloud.

### Di mana data disimpan

Data Kampil disimpan secara lokal di perangkat yang kamu pakai, di penyimpanan browser (IndexedDB) dalam keadaan terenkripsi. Artinya:

- Membuka Kampil dari HP berarti membuka brankas yang ada di HP itu.
- Membuka Kampil dari laptop berarti membuka brankas yang ada di laptop itu.
- Isi brankas **tidak** otomatis berpindah atau tersinkron antarperangkat.

Untuk memindahkan isi brankas antarperangkat, gunakan file backup `.kampil` — lihat bagian [Pindah perangkat dan pemulihan data](#pindah-perangkat-dan-pemulihan-data).

### Peran GitHub

GitHub hanya menyimpan **aplikasinya**, bukan datanya.

Saat kamu meng-host Kampil lewat GitHub Pages, yang tersimpan di repositori adalah file aplikasi seperti `index.html`. Kontak, rekening, password, kode, dan catatanmu tidak pernah diunggah ke GitHub.

### Peran master password

Master password adalah satu-satunya kunci brankasmu.

- Jangan memakai password yang sama dengan password email, media sosial, atau layanan lain.
- Jangan membagikan master password ke siapa pun, termasuk lewat chat.
- Jangan menyimpannya di catatan tidak terkunci di HP yang sama.
- Perlakukan kode pemulihan sama berharganya dengan master password: siapa pun yang memiliki kode itu bisa membuka brankas dan mengganti master password-mu.

> [!WARNING]
> Jika master password lupa, satu-satunya jalan masuk kembali adalah **kode pemulihan** — lihat bagian [Kode pemulihan](#kode-pemulihan) dan [Lupa master password](#lupa-master-password). Tidak ada reset password lewat server, email, atau admin, karena master password tidak disimpan di mana pun. Jika master password **dan** kode pemulihan sama-sama hilang, isi brankas tidak bisa dibuka kembali — itu konsekuensi yang disengaja dari enkripsi lokal. Simpan keduanya di tempat aman di luar HP, misalnya ditulis dan disimpan secara fisik di tempat yang hanya kamu yang tahu, dan simpan di tempat yang terpisah satu sama lain.

### Apa yang tetap harus kamu jaga sendiri

Kampil melindungi data saat brankas terkunci. Kampil tidak bisa melindungi data jika:

- HP-mu sudah dalam keadaan terbuka dan brankas sedang tidak terkunci.
- Master password-mu diketahui orang lain.
- Kode pemulihanmu jatuh ke tangan orang lain.
- Perangkatmu terinfeksi malware atau keylogger.

Selalu kunci brankas setelah selesai memakai, dan biarkan kunci otomatis 5 menit bekerja sebagai pengaman tambahan.

---

## Persyaratan

- Browser modern yang mendukung PWA dan enkripsi web, disarankan **Google Chrome** versi terbaru.
- Untuk instal di HP: Android dengan Chrome.
- Untuk instal di desktop: Chrome atau Microsoft Edge di Windows, macOS, atau Linux.
- Untuk backup ke Google Drive: akun Google milikmu sendiri dan Client ID Google milikmu sendiri — dijelaskan di bagian [Backup otomatis ke Google Drive](#backup-otomatis-ke-google-drive).
- Koneksi internet hanya dibutuhkan saat pertama kali membuka dari GitHub Pages, saat menginstal, dan saat backup ke Drive. Sehari-hari, Kampil bisa dipakai offline setelah terinstal.

---

## Cara instal

Ada tiga jalur instal. Jalur yang disarankan adalah GitHub Pages lalu instal sebagai PWA.

### Jalur 1 — Pasang di GitHub Pages

Jalur ini membuat Kampil bisa dibuka dari alamat web milikmu sendiri, lalu diinstal ke HP dan laptop dari alamat yang sama.

1. Siapkan file aplikasi Kampil dari file ZIP yang sudah disediakan. Di dalam ZIP terdapat `index.html` sebagai file utama aplikasi, file `sw.js` (service worker) di root, dan folder `assets/` berisi ikon serta manifest PWA — ketiganya diperlukan agar Kampil bisa diinstal sebagai aplikasi, bukan hanya dibuatkan pintasan.
2. Masuk ke akun GitHub-mu, lalu buat repositori baru, misalnya bernama `kampil`.
3. Atur visibilitas repositori sesuai kebutuhanmu. Ingat: repositori hanya berisi file aplikasi, bukan data brankasmu.
4. Unggah **seluruh** isi ZIP ke repositori tersebut dengan struktur yang sama seperti di dalam ZIP. Pastikan `index.html` dan `sw.js` berada di root repositori — bukan di dalam subfolder tambahan — dan folder `assets/` ikut terunggah utuh.
5. Buka menu **Settings** di repositori, lalu masuk ke bagian **Pages**.
6. Pada bagian sumber penerbitan, pilih branch utama repositori (`main`) dan folder root (`/`), lalu simpan.
7. Tunggu beberapa menit sampai GitHub Pages selesai menerbitkan situs, lalu buka alamat Pages yang diberikan GitHub.
8. Pastikan halaman Kampil tampil dan kamu diminta membuat atau memasukkan master password. Sampai di sini, Kampil sudah bisa dipakai dari browser.

> [!NOTE]
> Alamat GitHub Pages bersifat publik sebagai alamat web, tetapi itu hanya alamat aplikasinya. Siapa pun yang membuka alamat itu hanya melihat aplikasi Kampil yang kosong di perangkat mereka sendiri — mereka tidak melihat brankasmu, karena brankasmu tidak pernah meninggalkan perangkatmu.

### Jalur 2 — Instal sebagai aplikasi di HP Android (PWA)

Lakukan langkah ini setelah Kampil bisa dibuka dari alamat GitHub Pages.

1. Buka alamat GitHub Pages Kampil di **Chrome Android**.
2. Ketuk menu titik tiga di kanan atas Chrome.
3. Pilih **Tambahkan ke layar utama** atau **Instal aplikasi**, sesuai tulisan yang muncul di perangkatmu.
4. Konfirmasi nama **Kampil**, lalu ketuk **Tambah** atau **Instal**.
5. Ikon Kampil akan muncul di layar utama dan di daftar aplikasi. Buka Kampil dari ikon itu, bukan dari tab browser, untuk pemakaian sehari-hari.

Setelah terinstal, Kampil tampil seperti aplikasi biasa: layar penuh, tanpa bilah alamat browser, dan bisa dibuka offline.

### Jalur 3 — Instal sebagai aplikasi di desktop

1. Buka alamat GitHub Pages Kampil di Chrome atau Edge di laptop/PC.
2. Klik ikon instal di bilah alamat, atau buka menu browser lalu pilih **Instal Kampil**.
3. Konfirmasi instalasi. Kampil akan terbuka di jendela tersendiri dan mendapat pintasan seperti aplikasi desktop lainnya.

### Tentang Play Store

Kampil saat ini **belum tersedia di Play Store**.

Menerbitkan PWA ke Play Store tidak bisa dilakukan langsung dari GitHub. Jalur itu membutuhkan akun Google Play Developer dan pembungkusan PWA menjadi aplikasi Android (TWA / Trusted Web Activity) terlebih dahulu. Itu bisa menjadi langkah lanjutan setelah versi GitHub Pages dan PWA berjalan baik. Untuk sekarang, instal lewat Chrome Android memberikan hasil akhir yang sama di layar utama HP-mu.

---

## Penggunaan pertama

Membuat brankas baru di Kampil terdiri dari dua langkah: membuat master password, lalu menyimpan kode pemulihan. Brankas baru benar-benar dibuat setelah kedua langkah selesai.

1. Buka Kampil dari ikon di layar utama atau dari alamat GitHub Pages.
2. **Langkah 1 — buat master password.** Pakai password yang panjang (minimal 8 karakter), unik, dan belum pernah dipakai di layanan lain. Gabungan kata yang panjang dan mudah kamu ingat lebih baik daripada password pendek yang rumit. Ketik ulang untuk konfirmasi, lalu ketuk **Lanjut ke kode pemulihan**.
3. **Langkah 2 — simpan kode pemulihan.** Kampil menampilkan satu kode pemulihan 16 karakter dalam format `XXXX-XXXX-XXXX-XXXX`. Kode ini **hanya ditampilkan satu kali**. Tulis di kertas dan simpan di tempat aman di luar HP — jangan disimpan di HP yang sama dan jangan di-screenshot ke galeri. Tombol **Salin kode** tersedia bila kamu ingin menyalinnya ke tempat aman lain terlebih dahulu.
4. Ketik ulang kode pemulihan persis seperti yang ditampilkan, lalu ketuk **Konfirmasi & buat kampil**. Jika ketikanmu belum sama persis, brankas belum dibuat dan kamu diminta memeriksa lagi — ini disengaja, supaya kamu yakin kode yang kamu simpan benar-benar kode yang bisa dipakai nanti.
5. Brankas kosong akan terbuka. Mulai dari kategori yang paling sering kamu cari — biasanya Akun Login atau Rekening.
6. Tambahkan satu item pertama, lalu uji alurnya: kunci brankas, buka lagi dengan master password, dan pastikan item tadi masih ada. Uji kecil ini memastikan penyimpanan di perangkatmu bekerja sebelum kamu memasukkan semua data penting.
7. Setelah yakin, lanjutkan mengisi kategori lain, lalu segera buat backup pertama — lihat bagian [Backup dan pemulihan](#backup-dan-pemulihan).

## Kode pemulihan

Kode pemulihan adalah kunci cadangan brankasmu. Fungsinya satu: membuka brankas dan mengganti master password bila kamu lupa master password, **tanpa menghapus isi brankas**.

### Bentuk dan sifat kode

- Terdiri dari **16 karakter** dalam 4 grup, ditampilkan sebagai `XXXX-XXXX-XXXX-XXXX`.
- Karakternya dipilih dari huruf dan angka yang tidak mudah tertukar — tidak memakai `0`/`O` dan `1`/`I`/`L` yang mirip.
- Kode dibuat secara acak di perangkatmu saat brankas dibuat, dan **hanya ditampilkan satu kali** pada saat itu.
- Kode **tidak pernah disimpan sebagai teks biasa**. Yang disimpan hanyalah bungkus terenkripsi AES-256-GCM dari kunci brankas, yang hanya bisa dibuka dengan kunci turunan (PBKDF2) dari kode itu sendiri. Karena itu kode lama tidak bisa ditampilkan lagi di kemudian hari — yang bisa dilakukan hanyalah membuat kode baru.
- Satu brankas hanya punya **satu kode pemulihan yang berlaku** pada satu waktu. Setiap kali kode dibuat ulang atau dipakai untuk pemulihan, kode sebelumnya langsung tidak berlaku.

### Cara menyimpan kode

- Tulis di **kertas** dan simpan di tempat aman **di luar HP**, terpisah dari tempat kamu menyimpan catatan master password.
- **Jangan** disimpan di HP yang sama — termasuk di catatan biasa, di chat ke diri sendiri, atau sebagai screenshot di galeri. Jika HP itu yang hilang atau terkunci, kode di dalamnya ikut tidak bisa dijangkau.
- **Jangan dibagikan ke siapa pun.** Siapa pun yang memiliki kode ini bisa membuka brankasmu dan mengganti master password-nya.

### Membuat ulang kode pemulihan

Lakukan ini bila kertas kodemu hilang, rusak, atau kamu khawatir kode lama diketahui orang lain.

1. Buka kunci Kampil seperti biasa, lalu buka **Pengaturan**.
2. Di bagian **Kode pemulihan**, masukkan master password saat ini untuk verifikasi.
3. Ketuk **Buat ulang kode pemulihan**.
4. Kode baru ditampilkan satu kali. Simpan di kertas di luar HP, lalu centang pernyataan bahwa kamu sudah menyimpannya dan ketuk **Selesai**.

Kode lama langsung batal begitu kode baru dibuat. Jika master password yang kamu masukkan salah, kode tidak diubah.

### Brankas lama dan brankas hasil impor

Brankas yang dibuat sebelum fitur ini ada, dan brankas hasil impor file backup, belum memiliki kode pemulihan. Untuk brankas seperti itu:

- Selama brankas terbuka, muncul banner pengingat untuk membuat kode pemulihan. Buat lewat banner itu atau lewat **Pengaturan** — caranya sama seperti membuat ulang kode di atas, dengan verifikasi master password.
- Selama kode belum dibuat, pemulihan saat lupa password **tidak tersedia** untuk brankas tersebut. Buat kodenya sekarang, selagi kamu masih ingat master password-nya.

## Lupa master password

Jika kamu lupa master password tetapi masih menyimpan kode pemulihan, isi brankas bisa diselamatkan seluruhnya:

1. Di layar kunci Kampil, ketuk **Lupa password? Pulihkan dengan kode pemulihan**.
2. Masukkan kode pemulihan yang kamu simpan, lalu ketuk **Lanjut**. Jika kodenya salah, Kampil hanya menampilkan pesan bahwa kode pemulihan salah dan brankas tetap terkunci — tidak ada petunjuk tambahan. Periksa kembali kertas kodemu dan coba lagi.
3. Jika kode benar, buat **master password baru** (minimal 8 karakter), ketik ulang, lalu ketuk **Ganti password & buka kampil**.
4. Brankas terbuka dengan **semua isi tetap utuh** — tidak ada item yang dihapus atau diubah oleh proses pemulihan ini.
5. Kode pemulihan yang baru saja kamu pakai **otomatis tidak berlaku lagi**. Kampil langsung membuatkan kode pemulihan baru dan menampilkannya satu kali. Simpan kode baru itu di kertas di luar HP, centang pernyataan bahwa kamu sudah menyimpannya, lalu ketuk **Masuk ke kampil**.
6. Segera buat satu backup baru setelah pemulihan — file backup lama tetap memakai master password lama, lihat bagian [Backup dan pemulihan](#backup-dan-pemulihan).

### Jika kode pemulihan juga hilang

Tidak ada jalan lain, dan ini memang disengaja:

- Tidak ada reset lewat email, server, atau admin — Kampil tidak memiliki server dan tidak menyimpan password maupun kodemu.
- Brankas di perangkat itu tidak bisa dibuka. Jalan terakhirnya adalah **menghapus brankas dan membuat yang baru dari awal**: lewat tautan hapus di layar kunci, atau lewat **Hapus brankas & buat baru** di Pengaturan. Penghapusan memakai konfirmasi berlapis, dan hanya menghapus brankas di perangkat itu — file backup `.kampil` yang sudah kamu unduh atau yang ada di Drive tidak ikut terhapus.
- Jika kamu masih punya file backup `.kampil`, file itu bisa diimpor kembali — tetapi untuk membukanya kamu tetap membutuhkan master password yang dipakai **saat file backup itu dibuat**.

## Cara memakai per kategori

### Kontak

Tambahkan kontak yang berkaitan dengan akses dan urusan penting: nomor yang dipakai untuk verifikasi, kontak admin, atau kontak darurat. Isi nama, nomor HP, email bila ada, dan keterangan singkat tentang peran kontak tersebut.

### Rekening

Simpan setiap rekening sebagai satu item terpisah. Isi nama bank, nomor rekening, dan nama pemilik sesuai data bank. Saat membutuhkan nomor rekening, buka itemnya di Kampil dan salin dari sana, bukan dari tangkapan layar atau chat lama.

### Akun Login

Simpan satu item untuk setiap layanan: email, media sosial, akses admin web, layanan Google, dan layanan lain yang memakai username dan password. Gunakan generator password bawaan saat membuat atau mengganti password, lalu simpan password baru itu di item yang sama sebelum keluar dari halaman layanan tersebut.

### Kode

Simpan potongan JavaScript, HTML, CSS, Apps Script, dan kode lain yang sering dipakai ulang. Beri judul yang menjelaskan fungsi kodenya, bukan hanya tanggal, supaya mudah dicari kembali.

### Catatan

Gunakan untuk info akses pendukung yang tidak masuk ke empat kategori lain: petunjuk pemulihan akun, lokasi penyimpanan dokumen penting, atau urutan langkah masuk ke layanan tertentu.

---

## Backup dan pemulihan

Backup adalah bagian wajib dari pemakaian Kampil, bukan tambahan. Karena data hanya ada di perangkatmu, backup adalah satu-satunya perlindungan jika HP hilang, rusak, berganti, atau data browser terhapus.

Kampil menyediakan tiga lapis perlindungan:

| Lapis | Bentuk | Fungsi |
|---|---|---|
| 1. Penyimpanan lokal | Brankas terenkripsi di perangkat | Pemakaian sehari-hari |
| 2. File backup | File `.kampil` terenkripsi | Salinan yang bisa kamu simpan dan pindahkan sendiri |
| 3. Google Drive | File `.kampil` di folder **Kampil** yang private | Backup otomatis berkala di akun Google-mu sendiri |

File `.kampil` selalu terenkripsi. File itu aman disimpan di Drive, flashdisk, atau media lain karena isinya tetap tidak bisa dibaca tanpa master password-mu. Yang tidak boleh dibagikan adalah master password-nya, bukan file backup-nya.

### Backup manual — ekspor file `.kampil`

Lakukan ini untuk backup pertama, sebelum ganti HP, dan kapan pun kamu ingin salinan tambahan di luar jadwal otomatis.

1. Buka dan buka kunci Kampil.
2. Buka panel **Backup & Drive**.
3. Pilih perintah ekspor atau unduh backup.
4. File `.kampil` akan terunduh. Simpan file itu di tempat yang kamu tentukan sendiri, misalnya folder khusus di laptop atau flashdisk.
5. Beri nama file yang jelas bila perlu, sertakan tanggal backup supaya versi terbaru mudah dikenali.

### Impor — memulihkan dari file `.kampil`

1. Buka Kampil di perangkat tujuan.
2. Buka panel **Backup & Drive**, lalu pilih perintah impor backup.
3. Pilih file `.kampil` yang akan dipulihkan.
4. Masukkan master password yang dipakai saat file backup itu dibuat.
5. Tunggu sampai impor selesai, lalu periksa beberapa item dari kategori yang berbeda untuk memastikan isinya utuh.

> [!WARNING]
> Impor backup menggantikan atau menggabungkan isi brankas sesuai perilaku yang ditampilkan aplikasi saat impor. Sebelum mengimpor file lama ke brankas yang sudah berisi data baru, buat dulu ekspor dari brankas saat ini. Dengan begitu kamu selalu punya jalan kembali.

### Kebiasaan backup yang disarankan

- Buat backup manual pertama segera setelah brankas mulai terisi.
- Aktifkan backup otomatis ke Drive untuk perlindungan berkala.
- Simpan satu salinan file `.kampil` di luar HP, misalnya di laptop atau flashdisk, sebagai cadangan jika akun Google tidak bisa diakses.
- Setelah mengganti banyak password atau menambah banyak item, buat satu backup manual tambahan dan jangan hanya menunggu jadwal otomatis.

### Hubungan file backup, master password, dan kode pemulihan

Ketiganya sering tertukar, jadi bedakan dengan jelas:

- **File `.kampil` dibuka dengan master password, bukan dengan kode pemulihan.** Password yang berlaku adalah master password yang dipakai **saat file backup itu dibuat**. Kode pemulihan hanya berlaku untuk brankas lokal di perangkat tempat kode itu dibuat.
- **Setelah mengganti master password lewat pemulihan**, file backup yang dibuat sebelumnya tetap memakai password lama. Buat backup baru segera setelah pemulihan, dan catat password mana yang membuka file backup mana.
- **Brankas hasil impor belum punya kode pemulihan.** Setelah mengimpor file backup, buat kode pemulihan baru lewat banner pengingat atau **Pengaturan** — lihat bagian [Kode pemulihan](#kode-pemulihan).
- Kode pemulihan bukan pengganti backup, dan backup bukan pengganti kode pemulihan. Kode menyelamatkanmu saat lupa password di perangkat yang sama; file backup menyelamatkanmu saat perangkatnya hilang atau berganti.

---

## Backup otomatis ke Google Drive

Backup otomatis mengunggah file `.kampil` terenkripsi ke akun Google Drive milikmu sendiri, ke folder khusus bernama **Kampil**.

### Cara kerja backup otomatis

- Backup berjalan **berkala** dengan interval yang bisa dipilih: **setiap 6 jam, harian, atau mingguan**.
- Backup juga terpicu setelah ada perubahan isi brankas.
- Backup hanya berjalan **saat brankas dalam keadaan terbuka**. Jika Kampil tertutup atau terkunci pada jadwal backup, backup tidak dipaksakan berjalan di latar belakang.
- File yang diunggah adalah file terenkripsi yang sama seperti hasil ekspor manual. Google Drive hanya menyimpan filenya dan tidak bisa membaca isinya.
- Di panel **Backup & Drive** kamu bisa melihat status dan waktu backup terakhir.

### Folder Kampil di Drive bersifat private

- Folder backup bernama **Kampil**, mengikuti nama aplikasinya.
- Folder dibuat **private secara bawaan** dan **tidak dibagikan** ke siapa pun.
- Setelah backup pertama berhasil, periksa satu kali di Google Drive: buka folder **Kampil**, lalu pastikan status berbaginya hanya untuk akunmu sendiri dan tidak ada orang atau tautan publik yang memiliki akses.
- Jangan mengubah pengaturan berbagi folder ini menjadi publik, dan jangan membagikan file `.kampil` bersamaan dengan master password-nya.

### Menyiapkan koneksi Google Drive pertama kali

Backup ke Drive membutuhkan **Client ID Google milikmu sendiri**. Client ID ini tidak disediakan bersama aplikasi, karena backup harus masuk ke akun Google-mu, bukan ke akun pihak lain.

1. Buka Kampil, lalu buka panel **Backup & Drive**. Di panel itu tersedia panduan pembuatan Client ID — ikuti panduan tersebut sebagai rujukan utama, karena urutan dan istilah di dalamnya sudah disesuaikan dengan kebutuhan Kampil.
2. Secara garis besar, panduan itu akan mengarahkanmu untuk membuat proyek di Google Cloud, mengaktifkan akses Google Drive, membuat kredensial OAuth jenis Client ID untuk aplikasi web, dan mengizinkan alamat GitHub Pages Kampil milikmu sebagai asal yang diizinkan.
3. Salin Client ID yang dihasilkan, lalu tempelkan ke kolom Client ID di panel **Backup & Drive** di Kampil.
4. Hubungkan akun Google-mu dari panel yang sama, lalu berikan izin akses Drive yang diminta. Izin ini dipakai Kampil untuk membuat folder **Kampil** dan mengunggah file backup ke akunmu.
5. Jalankan **backup manual ke Drive** satu kali sebagai pengujian pertama. Pastikan file backup muncul di folder **Kampil** di Drive-mu.
6. Setelah pengujian berhasil, atur interval backup otomatis: 6 jam, harian, atau mingguan.
7. Buka kembali panel **Backup & Drive** beberapa saat kemudian dan periksa status serta waktu backup terakhir.

### Jika backup berstatus "Menunggu"

Status **Menunggu** berarti backup otomatis sudah dijadwalkan, tetapi unggahan ke Drive belum bisa dilakukan — penyebab paling umum adalah Drive belum tersambung atau Client ID belum diisi.

Status ini bukan kegagalan diam-diam dan bukan berarti datamu hilang. Brankas lokalmu tetap utuh dan tetap bisa dipakai. Selesaikan penyiapan Client ID dan koneksi Drive mengikuti langkah di atas, lalu jalankan backup manual satu kali untuk memastikan unggahan berhasil.

### Memulihkan dari backup Drive

1. Buka file `.kampil` terbaru di folder **Kampil** di Google Drive-mu.
2. Unduh file tersebut ke perangkat tujuan.
3. Impor file itu ke Kampil mengikuti langkah di bagian [Impor — memulihkan dari file `.kampil`](#impor--memulihkan-dari-file-kampil).

---

## Pindah perangkat dan pemulihan data

Karena tidak ada sinkronisasi cloud, pindah perangkat selalu melewati file backup.

### Pindah ke HP baru

1. Di HP lama, buka Kampil dan buat ekspor `.kampil` terbaru.
2. Pindahkan file itu ke HP baru, misalnya lewat Google Drive, kabel data, atau media lain yang kamu percaya.
3. Di HP baru, instal Kampil dari alamat GitHub Pages yang sama.
4. Impor file `.kampil` dan masukkan master password yang dipakai saat file itu dibuat.
5. Periksa isi dari semua kategori sebelum menghapus data di HP lama.
6. Buat kode pemulihan baru di HP baru lewat banner pengingat atau **Pengaturan** — brankas hasil impor belum punya kode pemulihan, dan kode dari HP lama tidak berlaku di HP baru.

### Data browser terhapus

Menghapus data situs/browser, memakai mode privat, atau mengatur ulang browser bisa menghapus brankas lokal di perangkat itu. Jika itu terjadi, jangan panik dan jangan membuat brankas baru yang menimpa apa pun terlebih dahulu. Impor file `.kampil` terbaru dari backup manual atau dari folder **Kampil** di Drive.

### Satu alamat, banyak perangkat

Kamu boleh menginstal Kampil di HP dan di laptop dari alamat GitHub Pages yang sama. Perlakukan setiap perangkat sebagai brankas terpisah yang isinya disamakan secara manual lewat file backup terbaru. Setelah mengimpor di perangkat kedua, buat perubahan penting hanya di satu perangkat utama, lalu ekspor ulang supaya tidak ada dua versi brankas yang saling berbeda jauh.

---

## Troubleshooting

| Masalah | Penyebab yang mungkin | Yang dilakukan |
|---|---|---|
| Master password ditolak | Salah ketik, atau Caps Lock aktif | Ketik ulang perlahan. Jika tetap gagal dan password benar-benar lupa, pakai kode pemulihan — lihat bagian [Lupa master password](#lupa-master-password) |
| Lupa master password | Password tidak tercatat atau tidak teringat | Di layar kunci, ketuk **Lupa password? Pulihkan dengan kode pemulihan**, masukkan kode pemulihan, lalu buat password baru. Isi brankas tetap utuh, dan kamu akan menerima kode pemulihan baru |
| Kode pemulihan ditolak saat pemulihan | Salah salin dari kertas, ada karakter yang tertukar, atau kode itu sudah pernah dipakai / sudah diganti dengan kode baru | Periksa kembali tiap grup karakternya di kertas simpananmu. Ingat: kode yang sudah dipakai untuk pemulihan atau sudah dibuat ulang tidak berlaku lagi — yang berlaku hanya kode terakhir yang kamu simpan |
| Kode pemulihan hilang, master password masih ingat | Kertas kode hilang atau rusak | Segera buat ulang kode lewat **Pengaturan** dengan verifikasi master password — lihat bagian [Kode pemulihan](#kode-pemulihan) |
| Lupa master password dan kode pemulihan juga hilang | Keduanya tidak tercatat di tempat aman | Brankas tidak bisa dibuka dan tidak ada reset lewat server atau email. Jalan terakhir: hapus brankas dan buat baru, atau impor file backup `.kampil` yang password saat dibuatnya masih kamu ingat |
| Brankas belum punya kode pemulihan | Brankas dibuat sebelum fitur ini ada, atau baru diimpor dari file backup | Buka brankas selagi masih ingat password-nya, lalu buat kode lewat banner pengingat atau **Pengaturan**. Selama belum dibuat, pemulihan saat lupa password tidak tersedia |
| Menu instal PWA tidak muncul, atau yang ditawarkan hanya “Buat pintasan” dengan keterangan aplikasi tidak dapat diinstal | File PWA tidak lengkap di GitHub — biasanya `sw.js` tidak ada di root atau folder `assets/` tidak ikut terunggah — atau alamat dibuka bukan dari Chrome | Unggah ulang seluruh isi ZIP terbaru dengan struktur yang sama (`index.html` dan `sw.js` di root, folder `assets/` utuh), tunggu GitHub Pages menerbitkan ulang, lalu buka alamat Pages langsung di Chrome Android dan coba lagi. Di dalam aplikasi juga ada kotak **Pasang Kampil sebagai aplikasi** dengan tombol Instal di layar kunci dan di panel Backup |
| Ikon Kampil tidak ada di layar utama | Instal PWA belum dikonfirmasi | Ulangi langkah instal dan ketuk Tambah/Instal sampai selesai |
| Backup Drive berstatus Menunggu | Client ID belum diisi atau akun Google belum tersambung | Selesaikan penyiapan di panel Backup & Drive, lalu jalankan backup manual satu kali |
| File backup tidak muncul di Drive | Backup manual belum pernah berhasil, atau melihat akun Google yang berbeda | Pastikan akun Google yang dibuka sama dengan akun yang tersambung di Kampil, lalu buka folder **Kampil** |
| Isi brankas kosong setelah ganti HP | Data tidak ikut pindah secara otomatis | Impor file `.kampil` terbaru dari HP lama atau dari Drive |
| Isi hilang setelah membersihkan browser | Penyimpanan lokal ikut terhapus | Impor kembali file `.kampil` terbaru |
| Impor file gagal | File bukan `.kampil` yang benar, file rusak, atau password salah | Pakai file backup lain yang lebih lama, dan pastikan password yang dimasukkan adalah password saat file itu dibuat |

---

## Batasan saat ini

- **Tidak ada sinkronisasi otomatis antarperangkat.** Pindah dan samakan isi brankas lewat file `.kampil`.
- **Backup otomatis hanya berjalan saat brankas terbuka.** Jika aplikasi tertutup pada jadwalnya, backup berikutnya berjalan pada kesempatan terjadwal berikutnya saat brankas terbuka, dan statusnya terlihat di panel Backup & Drive.
- **Backup ke Drive membutuhkan Client ID Google milikmu sendiri.** Tanpa itu, backup manual berupa file `.kampil` tetap bisa dipakai penuh.
- **Belum tersedia di Play Store.** Instal resmi saat ini lewat GitHub Pages dan PWA di Chrome.
- **Pemulihan master password hanya lewat kode pemulihan.** Tidak ada reset lewat server, email, atau admin. Jika master password dan kode pemulihan sama-sama hilang, brankas tidak bisa dibuka dan jalan terakhirnya adalah menghapus brankas lalu membuat yang baru.
- **Kode pemulihan hanya ditampilkan satu kali dan tidak bisa ditampilkan lagi.** Kode lama yang hilang hanya bisa diganti dengan kode baru lewat Pengaturan, dan itu pun memerlukan master password yang masih kamu ingat.
- **Kode pemulihan tidak membuka file backup.** File `.kampil` tetap dibuka dengan master password yang dipakai saat file itu dibuat.
- **Kampil untuk pemakaian pribadi.** Kampil tidak menyediakan akun bersama, peran pengguna, atau berbagi brankas dengan orang lain.

## Pertanyaan yang sering diajukan

**Apakah data saya dikirim ke server Kampil?**
Tidak. Tidak ada server Kampil. Data tersimpan terenkripsi di perangkatmu, dan backup hanya pergi ke tempat yang kamu pilih sendiri: file `.kampil` yang kamu simpan, atau folder **Kampil** di Google Drive milikmu.

**Apakah isi repositori GitHub saya berbahaya jika terlihat orang?**
Repositori hanya berisi file aplikasi. Data brankasmu tidak ada di dalamnya. Meski begitu, perlakukan alamat dan pengaturan repositorimu sebagai milik pribadi, dan jangan pernah mengunggah file `.kampil` atau master password ke repositori.

**Apakah Google bisa membaca backup saya di Drive?**
File yang tersimpan di Drive adalah file `.kampil` terenkripsi. Tanpa master password-mu, isinya tidak bisa dibaca. Drive berfungsi sebagai tempat menyimpan file terkunci, bukan sebagai pembuka kuncinya.

**Apakah folder Kampil di Drive bisa dilihat orang lain?**
Folder **Kampil** dibuat private dan tidak dibagikan. Periksa status berbaginya satu kali setelah backup pertama, dan jangan mengubahnya menjadi publik.

**Bisakah Kampil dipakai offline?**
Bisa, setelah Kampil terinstal dan pernah dibuka. Koneksi internet hanya diperlukan untuk membuka pertama kali dari GitHub Pages, menginstal, menyambungkan Drive, dan menjalankan backup ke Drive.

**Bisakah satu brankas dipakai bersama keluarga atau tim?**
Tidak disarankan dan tidak didukung. Kampil dirancang sebagai brankas pribadi dengan satu master password. Membagikan master password sama dengan membagikan seluruh isi brankas.

**Apa yang harus saya lakukan sebelum ganti HP?**
Ekspor file `.kampil` terbaru, pastikan backup Drive terakhir berhasil, lalu impor dan periksa isinya di HP baru sebelum menghapus data di HP lama. Setelah impor, buat kode pemulihan baru di HP baru itu — brankas hasil impor belum punya kode pemulihan, dan kode dari HP lama tidak berlaku untuknya.

**Bagaimana jika saya lupa master password?**
Pakai kode pemulihan: di layar kunci, ketuk **Lupa password? Pulihkan dengan kode pemulihan**, masukkan kode 16 karakter yang kamu simpan di kertas, lalu buat master password baru. Semua isi brankas tetap utuh. Setelah itu kode lamamu tidak berlaku lagi dan kamu menerima kode pemulihan baru untuk disimpan. Langkah lengkapnya ada di bagian [Lupa master password](#lupa-master-password).

**Apakah ada reset password lewat email atau server?**
Tidak ada. Kampil tidak memiliki server dan tidak menyimpan master password atau kode pemulihanmu, jadi tidak ada pihak yang bisa mengirimkan tautan reset. Satu-satunya pemulihan adalah kode pemulihan yang kamu simpan sendiri.

**Bisakah kode pemulihan saya ditampilkan lagi?**
Tidak bisa. Kode tidak disimpan sebagai teks biasa, jadi tidak ada yang bisa menampilkannya kembali. Jika kodemu hilang tetapi master password masih kamu ingat, buat kode baru lewat **Pengaturan** dengan verifikasi master password — kode lama langsung batal.

**Apa bedanya kode pemulihan dengan password file backup?**
Kode pemulihan membuka brankas lokal di perangkat tempat kode itu dibuat, saat kamu lupa master password. File backup `.kampil` tidak dibuka dengan kode pemulihan, melainkan dengan master password yang dipakai saat file backup itu dibuat.

**Bagaimana jika master password dan kode pemulihan sama-sama hilang?**
Brankas tidak bisa dibuka lagi — memang begitu rancangan enkripsinya. Yang masih bisa dilakukan: menghapus brankas dan membuat yang baru dari awal, atau mengimpor file backup `.kampil` yang password saat dibuatnya masih kamu ingat.

---

## Struktur repositori yang disarankan

```text
kampil/
├── index.html   # File utama aplikasi Kampil
├── sw.js        # Service worker — wajib di root agar Kampil bisa diinstal
├── assets/      # Ikon 192/512/maskable dan manifest.webmanifest PWA
└── README.md    # Isi dokumen ini
```

Unggah seluruh isi ZIP dengan struktur yang sama seperti di dalam ZIP dan jangan mengganti nama atau memindahkan file pendukung tersebut — `sw.js` yang tidak berada di root atau folder `assets/` yang tidak ikut terunggah adalah penyebab paling umum Kampil hanya bisa dibuatkan pintasan dan tidak bisa diinstal.

---

Kampil — brankas pribadi untuk info aksesmu. Simpan di satu tempat, kunci dengan satu password, dan cadangkan secara berkala.
