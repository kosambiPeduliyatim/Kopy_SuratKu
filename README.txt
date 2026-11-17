================================================================================
KOPY SURATKU — APLIKASI PEMBUAT SURAT DAN DOKUMEN OTOMATIS (FULL VERSION)
Produk Digital KOPY (Kosambi Peduli Yatim) — Gratis untuk Masyarakat Umum
Tagline: "Buat Surat Lebih Mudah, Cepat, dan Praktis."
================================================================================

1. TENTANG APLIKASI
KOPY SuratKu adalah aplikasi web progresif (PWA) berbasis HTML5, CSS3, dan
JavaScript Vanilla tanpa framework eksternal, tanpa CDN, tanpa API berbayar,
dan tanpa login wajib. Seluruh data tersimpan 100% lokal di perangkat pengguna
menggunakan IndexedDB (dengan fallback otomatis ke localStorage).

2. STRUKTUR FOLDER PROYEK
KOPY-SURATKU/
├── index.html
├── manifest.json
├── service-worker.js
├── README.txt
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── print.css
├── js/
│   ├── app.js
│   ├── navigation.js
│   ├── templates.js
│   ├── form-generator.js
│   ├── document-editor.js
│   ├── organization.js
│   ├── letterhead.js
│   ├── numbering.js
│   ├── signatory.js
│   ├── archive.js
│   ├── storage.js
│   ├── export-import.js
│   ├── printing.js
│   ├── search.js
│   └── settings.js
└── assets/
    └── logo.svg

3. CARA MENJALANKAN DI HP ANDROID
A. Cara Paling Direkomendasikan (Online & Full Offline PWA via GitHub Pages):
   1. Ekstrak file KOPY-SURATKU.zip menggunakan aplikasi ZArchiver atau File Manager.
   2. Unggah seluruh isi folder KOPY-SURATKU ke repositori GitHub Anda.
   3. Aktifkan GitHub Pages (Settings -> Pages -> Branch main / root).
   4. Buka tautan HTTPS GitHub Pages di Google Chrome Android.
   5. Chrome akan mengaktifkan Service Worker secara otomatis dan menampilkan opsi
      "Tambahkan ke Layar Utama / Instal Aplikasi". Setelah terpasang, aplikasi
      dapat digunakan penuh tanpa koneksi internet.

B. Menjalankan Secara Lokal di HP Android:
   - Jika Anda membuka index.html langsung lewat File Manager (alamat file://),
     aplikasi tetap berjalan (formulir, editor A4, arsip lokal, dan cetak PDF
     tetap berfungsi), namun browser Android membatasi fitur Service Worker
     offline cache dan instalasi ikon PWA karena alasan keamanan protokol file://.
   - Untuk mengaktifkan Service Worker secara lokal di HP Android, buka folder
     proyek menggunakan aplikasi editor kode Android yang memiliki server lokal
     (seperti Acode, Spck Editor, atau Termux dengan perintah:
     python3 -m http.server 8080), lalu buka http://localhost:8080 di Chrome.

4. CARA MENCETAK & MENYIMPAN PDF DI ANDROID
   1. Selesai mengisi dan mengedit surat, tekan tombol "Cetak / Simpan PDF".
   2. Pada layar pratinjau cetak Android, pilih tujuan printer "Simpan sebagai PDF".
   3. Atur ukuran kertas ke "ISO A4", lalu tekan tombol unduh PDF.

5. PRIVASI & BATASAN HUKUM
   - Aplikasi tidak mengirim data apa pun ke server eksternal.
   - Lakukan Backup JSON secara berkala melalui menu Pengaturan agar data aman.
   - Draf surat yang memerlukan pengesahan RT/RW, Kelurahan, Desa, atau instansi
     resmi tetap wajib diperiksa dan disahkan oleh pejabat yang berwenang.
================================================================================
