/* ==========================================================================
   KOPY SuratKu — Complete Letter Templates & Custom Template Engine (templates.js)
   Total: 102 Template Surat Bawaan (Kategori A - F) + Template Kustom
   ========================================================================== */

window.KopyTemplates = (function () {
  const CATEGORIES = [
  {
    "id": "A",
    "name": "Surat Umum dan Pribadi",
    "short": "Umum & Pribadi",
    "desc": "Surat permohonan, pernyataan, kuasa, undangan, pengantar, keterangan, dan korespondensi pribadi.",
    "legalNote": ""
  },
  {
    "id": "B",
    "name": "Organisasi dan Komunitas",
    "short": "Organisasi & Komunitas",
    "desc": "Surat rapat, kerja sama, sponsor, tugas, SK pengurus, berita acara, mandat, dan pelantikan.",
    "legalNote": ""
  },
  {
    "id": "C",
    "name": "RT/RW dan Lingkungan",
    "short": "RT/RW & Lingkungan",
    "desc": "Surat pengantar warga, draf surat keterangan domisili/usaha/SKTM, kerja bakti, dan musyawarah warga.",
    "legalNote": "PERINGATAN PENTING: Draf surat pada kategori RT/RW dan Lingkungan ini merupakan alat bantu penyusunan teks awal dan TIDAK menggantikan surat resmi yang wajib diterbitkan, ditandatangani, dan distempel oleh Ketua RT/RW, Kelurahan, Desa, Kecamatan, atau instansi pemerintah berwenang."
  },
  {
    "id": "D",
    "name": "Pendidikan dan Sekolah",
    "short": "Pendidikan & Sekolah",
    "desc": "Surat izin siswa, permohonan beasiswa, magang/PKL, keterangan aktif, undangan wali murid, dan pindah sekolah.",
    "legalNote": ""
  },
  {
    "id": "E",
    "name": "Yayasan dan Kegiatan Sosial",
    "short": "Yayasan & Sosial",
    "desc": "Surat permohonan donasi, santunan yatim, proposal CSR, tanda terima bantuan, relawan, dan laporan penyaluran.",
    "legalNote": ""
  },
  {
    "id": "F",
    "name": "Usaha dan UMKM",
    "short": "Usaha & UMKM",
    "desc": "Surat penawaran produk/jasa, pesanan barang, invoice/tagihan, konfirmasi pembayaran, dan perjanjian usaha.",
    "legalNote": ""
  }
];

  const BUILTIN_TEMPLATES = [
  {
    "id": "tpl_a01",
    "name": "Surat Permohonan",
    "category": "A",
    "code": "PRM",
    "docLayout": "surat_resmi",
    "description": "Digunakan untuk mengajukan permohonan resmi kepada instansi, lembaga, atau perorangan.",
    "keywords": "permohonan umum pengajuan permintaan resmi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal Surat",
        "type": "text",
        "placeholder": "Contoh: Permohonan Fasilitasi / Bantuan",
        "required": true,
        "default": "Permohonan Bantuan / Fasilitasi"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "Contoh: 1 (Satu) Berkas / -",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "isi_permohonan",
        "label": "Uraian Maksud Permohonan",
        "type": "textarea",
        "placeholder": "Jelaskan secara jelas apa yang dimohonkan, alasan, serta waktu pelaksanaan jika ada.",
        "required": true,
        "default": ""
      },
      {
        "name": "kontak_pengirim",
        "label": "Nomor Telepon / WA yang Dapat Dihubungi",
        "type": "text",
        "placeholder": "Contoh: 0812-3456-7890",
        "required": false,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan kebutuhan dan rencana kegiatan yang akan kami laksanakan, bersama surat ini kami mengajukan permohonan kepada Bapak/Ibu agar kiranya berkenan memberikan dukungan serta persetujuan atas maksud tersebut.",
      "Adapun rincian permohonan yang kami ajukan adalah sebagai berikut:\n{{isi_permohonan}}",
      "Besar harapan kami agar permohonan ini dapat dipertimbangkan dan dikabulkan. Untuk koordinasi lebih lanjut dapat menghubungi nomor {{kontak_pengirim}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a02",
    "name": "Surat Pernyataan",
    "category": "A",
    "code": "PRN",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan pribadi atau resmi untuk menyatakan kesanggupan, kebenaran data, atau komitmen tertentu.",
    "keywords": "pernyataan kesanggupan kebenaran data pribadi",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "isi_pernyataan",
        "label": "Isi Pernyataan",
        "type": "textarea",
        "placeholder": "Tuliskan pernyataan Anda secara tegas dan jelas.",
        "required": true,
        "default": "Menyatakan dengan sesungguhnya bahwa seluruh data dan keterangan yang saya berikan adalah benar dan dapat dipertanggungjawabkan sesuai ketentuan yang berlaku."
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat Pernyataan",
        "type": "text",
        "placeholder": "Contoh: Melengkapi persyaratan administrasi",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nJenis Kelamin : {{jenis_kelamin}}\nPekerjaan : {{pekerjaan}}\nAlamat : {{alamat_lengkap}}",
      "Dengan ini menyatakan dengan sadar, tanpa paksaan dari pihak mana pun, bahwa:\n{{isi_pernyataan}}",
      "Surat pernyataan ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagai {{keperluan}}. Apabila di kemudian hari pernyataan ini terbukti tidak benar, saya bersedia menerima konsekuensi sesuai peraturan yang berlaku."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a03",
    "name": "Surat Kuasa",
    "category": "A",
    "code": "KUA",
    "docLayout": "surat_judul_tengah",
    "description": "Pelimpahan wewenang dari pemberi kuasa kepada penerima kuasa untuk mengurus keperluan tertentu.",
    "keywords": "kuasa perwakilan pelimpahan wewenang pengambilan berkas",
    "fields": [
      {
        "name": "nama_pemberi",
        "label": "Nama Pemberi Kuasa",
        "type": "text",
        "placeholder": "Nama lengkap pihak yang memberi kuasa",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_pemberi",
        "label": "NIK Pemberi Kuasa",
        "type": "text",
        "placeholder": "16 digit NIK",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_pemberi",
        "label": "Alamat Pemberi Kuasa",
        "type": "textarea",
        "placeholder": "Alamat lengkap sesuai KTP",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_penerima_kuasa",
        "label": "Nama Penerima Kuasa",
        "type": "text",
        "placeholder": "Nama lengkap pihak yang diberi kuasa",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_penerima_kuasa",
        "label": "NIK Penerima Kuasa",
        "type": "text",
        "placeholder": "16 digit NIK",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_penerima_kuasa",
        "label": "Alamat Penerima Kuasa",
        "type": "textarea",
        "placeholder": "Alamat lengkap sesuai KTP",
        "required": true,
        "default": ""
      },
      {
        "name": "objek_kuasa",
        "label": "Uraian Wewenang / Keperluan Kuasa",
        "type": "textarea",
        "placeholder": "Contoh: Mengambil dokumen administrasi / melakukan pengurusan berkas di...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini:\nNama : {{nama_pemberi}}\nNIK : {{nik_pemberi}}\nAlamat : {{alamat_pemberi}}\nSelanjutnya disebut sebagai PIHAK PERTAMA (Pemberi Kuasa).",
      "Dengan ini memberikan kuasa penuh kepada:\nNama : {{nama_penerima_kuasa}}\nNIK : {{nik_penerima_kuasa}}\nAlamat : {{alamat_penerima_kuasa}}\nSelanjutnya disebut sebagai PIHAK KEDUA (Penerima Kuasa).",
      "KHUSUS untuk bertindak atas nama PIHAK PERTAMA dalam hal:\n{{objek_kuasa}}",
      "Demikian Surat Kuasa ini dibuat dengan penuh kesadaran untuk dapat dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a04",
    "name": "Surat Undangan",
    "category": "A",
    "code": "UND",
    "docLayout": "surat_resmi",
    "description": "Surat undangan resmi atau umum untuk menghadiri acara, pertemuan, atau kegiatan tertentu.",
    "keywords": "undangan acara pertemuan kehadiran",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal Undangan",
        "type": "text",
        "placeholder": "Contoh: Undangan Menghadiri Acara...",
        "required": true,
        "default": "Undangan Menghadiri Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "Contoh: -",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "catatan_tambahan",
        "label": "Catatan / Dresscode (Opsional)",
        "type": "text",
        "placeholder": "Contoh: Harap hadir 15 menit sebelum acara dimulai",
        "required": false,
        "default": "Mengingat pentingnya acara tersebut, dimohon kehadiran Bapak/Ibu tepat pada waktunya."
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka menyelenggarakan kegiatan {{nama_kegiatan}}, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir pada acara tersebut yang insya Allah akan dilaksanakan pada:",
      "Hari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nAcara : {{nama_kegiatan}}",
      "{{catatan_tambahan}}"
    ],
    "closing": ""
  },
  {
    "id": "tpl_a05",
    "name": "Surat Pengantar",
    "category": "A",
    "code": "PNG",
    "docLayout": "surat_resmi",
    "description": "Surat pengantar pengiriman berkas, dokumen, barang, atau pengantar seseorang kepada pihak tujuan.",
    "keywords": "pengantar berkas dokumen pengiriman",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Contoh: Pengantar Berkas Administrasi",
        "required": true,
        "default": "Pengantar Berkas / Dokumen"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "Contoh: 1 (Satu) Bundel Berkas",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "daftar_berkas",
        "label": "Rincian Berkas / Hal yang Diantar",
        "type": "textarea",
        "placeholder": "Contoh: 1. Fotokopi KTP dan KK (2 lembar)\n2. Formulir Pendaftaran",
        "required": true,
        "default": ""
      },
      {
        "name": "tujuan_pengiriman",
        "label": "Maksud / Tujuan Pengiriman",
        "type": "text",
        "placeholder": "Contoh: Untuk diproses lebih lanjut sesuai ketentuan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami sampaikan berkas/dokumen sebagai berikut:\n{{daftar_berkas}}",
      "Adapun dokumen tersebut kami kirimkan dengan maksud {{tujuan_pengiriman}}.",
      "Demikian surat pengantar ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a06",
    "name": "Surat Keterangan",
    "category": "A",
    "code": "SKT",
    "docLayout": "surat_judul_tengah",
    "description": "Surat resmi dari pimpinan lembaga/organisasi untuk menerangkan status, data, atau keadaan seseorang.",
    "keywords": "keterangan resmi status identitas",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "isi_keterangan",
        "label": "Isi Keterangan",
        "type": "textarea",
        "placeholder": "Contoh: Adalah benar warga/anggota aktif yang berdomisili dan berkelakuan baik di lingkungan kami.",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Pembuatan Surat",
        "type": "text",
        "placeholder": "Contoh: Persyaratan administrasi",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan dengan sesungguhnya bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nJenis Kelamin : {{jenis_kelamin}}\nPekerjaan : {{pekerjaan}}\nAlamat : {{alamat_lengkap}}",
      "Berdasarkan data dan catatan yang ada pada kami, nama tersebut di atas benar:\n{{isi_keterangan}}",
      "Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagai {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a07",
    "name": "Surat Pemberitahuan",
    "category": "A",
    "code": "PMB",
    "docLayout": "surat_resmi",
    "description": "Menyampaikan informasi penting, perubahan jadwal, kebijakan, atau pemberitahuan kegiatan kepada pihak terkait.",
    "keywords": "pemberitahuan informasi pengumuman jadwal",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal Pemberitahuan",
        "type": "text",
        "placeholder": "Contoh: Pemberitahuan Perubahan Jadwal / Kegiatan",
        "required": true,
        "default": "Pemberitahuan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "Contoh: -",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "isi_pemberitahuan",
        "label": "Isi Pemberitahuan",
        "type": "textarea",
        "placeholder": "Tuliskan informasi utama yang ingin disampaikan secara lengkap.",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_berlaku",
        "label": "Waktu / Tanggal Berlaku",
        "type": "text",
        "placeholder": "Contoh: Mulai tanggal 20 November 2026",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Melalui surat ini kami sampaikan pemberitahuan resmi kepada Bapak/Ibu terkait hal berikut:\n{{isi_pemberitahuan}}",
      "Pemberitahuan ini mulai berlaku efektif pada {{waktu_berlaku}}. Kami mengharapkan perhatian dan penyesuaian dari seluruh pihak terkait.",
      "Demikian pemberitahuan ini kami sampaikan agar dapat dimaklumi bersama."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a08",
    "name": "Surat Pengajuan",
    "category": "A",
    "code": "PGJ",
    "docLayout": "surat_resmi",
    "description": "Surat pengajuan usulan program, permohonan fasilitas, anggaran, atau persetujuan administrasi.",
    "keywords": "pengajuan usulan program fasilitas anggaran",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal Pengajuan",
        "type": "text",
        "placeholder": "Contoh: Pengajuan Usulan Program / Anggaran",
        "required": true,
        "default": "Pengajuan Usulan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "Contoh: 1 (Satu) Rincian Pengajuan",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "judul_pengajuan",
        "label": "Judul / Topik Pengajuan",
        "type": "text",
        "placeholder": "Contoh: Pengadaan Peralatan Sekretariat",
        "required": true,
        "default": ""
      },
      {
        "name": "rincian_pengajuan",
        "label": "Rincian & Alasan Pengajuan",
        "type": "textarea",
        "placeholder": "Jelaskan latar belakang, rincian kebutuhan, serta manfaat pengajuan.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka mendukung kelancaran pelaksanaan tugas dan pelayanan, bersama surat ini kami mengajukan permohonan persetujuan terkait {{judul_pengajuan}}.",
      "Adapun rincian pengajuan tersebut adalah sebagai berikut:\n{{rincian_pengajuan}}",
      "Besar harapan kami pengajuan ini dapat disetujui dan direalisasikan sesuai ketentuan yang berlaku."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a09",
    "name": "Surat Pengalaman Kerja",
    "category": "A",
    "code": "SPK",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan resmi mengenai riwayat masa kerja, jabatan, dan kinerja mantan karyawan/staf.",
    "keywords": "pengalaman kerja paklaring riwayat karyawan",
    "fields": [
      {
        "name": "nama_karyawan",
        "label": "Nama Lengkap Karyawan",
        "type": "text",
        "placeholder": "Contoh: Siti Aminah",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_karyawan",
        "label": "NIK / ID Karyawan",
        "type": "text",
        "placeholder": "Contoh: 3603xxxxxxxxxxxx",
        "required": false,
        "default": ""
      },
      {
        "name": "jabatan_terakhir",
        "label": "Jabatan Terakhir",
        "type": "text",
        "placeholder": "Contoh: Staf Administrasi",
        "required": true,
        "default": ""
      },
      {
        "name": "periode_kerja",
        "label": "Periode Masa Kerja",
        "type": "text",
        "placeholder": "Contoh: 01 Januari 2023 s.d. 31 Oktober 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "penilaian_kinerja",
        "label": "Keterangan Kinerja",
        "type": "textarea",
        "placeholder": "Contoh: Selama bekerja yang bersangkutan telah menunjukkan dedikasi, disiplin, dan tanggung jawab yang baik.",
        "required": true,
        "default": "Selama bekerja bersama kami, yang bersangkutan telah menunjukkan dedikasi, loyalitas, dan tanggung jawab kerja yang baik."
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama : {{nama_karyawan}}\nNIK / ID : {{nik_karyawan}}\nJabatan Terakhir : {{jabatan_terakhir}}",
      "Adalah benar pernah bekerja pada instansi/perusahaan kami terhitung sejak tanggal {{periode_kerja}}.",
      "{{penilaian_kinerja}}",
      "Demikian surat keterangan pengalaman kerja ini diberikan agar dapat dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a10",
    "name": "Surat Pengunduran Diri",
    "category": "A",
    "code": "RES",
    "docLayout": "surat_pribadi",
    "description": "Surat pernyataan pengunduran diri secara resmi dan sopan dari jabatan, organisasi, atau pekerjaan.",
    "keywords": "pengunduran diri resign berhenti kerja jabatan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Pengunduran Diri",
        "required": true,
        "default": "Permohonan Pengunduran Diri"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_pemohon",
        "label": "Nama Lengkap Pemohon",
        "type": "text",
        "placeholder": "Nama Anda",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_pemohon",
        "label": "Jabatan / Posisi Saat Ini",
        "type": "text",
        "placeholder": "Contoh: Staf Operasional / Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_efektif",
        "label": "Tanggal Efektif Berhenti",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_resign",
        "label": "Alasan Pengunduran Diri",
        "type": "textarea",
        "placeholder": "Contoh: Dikarenakan adanya keperluan keluarga dan rencana pengembangan diri.",
        "required": true,
        "default": "Dikarenakan adanya keperluan keluarga serta pertimbangan pengembangan diri ke depan."
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama : {{nama_pemohon}}\nJabatan : {{jabatan_pemohon}}",
      "Melalui surat ini bermaksud mengajukan permohonan pengunduran diri dari jabatan {{jabatan_pemohon}}, terhitung efektif mulai tanggal {{tanggal_efektif}}. Adapun keputusan ini saya ambil {{alasan_resign}}",
      "Saya mengucapkan terima kasih yang sebesar-besarnya atas kesempatan, bimbingan, serta kerja sama yang baik selama saya menjalankan tugas. Saya berkomitmen menyelesaikan proses serah terima pekerjaan dengan sebaik-baiknya sebelum tanggal efektif tersebut."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a11",
    "name": "Surat Permintaan Informasi",
    "category": "A",
    "code": "INF",
    "docLayout": "surat_resmi",
    "description": "Surat untuk meminta data, keterangan resmi, jadwal, atau informasi publik/administratif dari suatu pihak.",
    "keywords": "permintaan informasi data keterangan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permintaan Informasi / Data",
        "required": true,
        "default": "Permintaan Informasi dan Data"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "informasi_diminta",
        "label": "Rincian Informasi yang Diminta",
        "type": "textarea",
        "placeholder": "Sebutkan secara spesifik data atau informasi apa yang dibutuhkan.",
        "required": true,
        "default": ""
      },
      {
        "name": "tujuan_penggunaan",
        "label": "Tujuan Penggunaan Informasi",
        "type": "text",
        "placeholder": "Contoh: Keperluan penyusunan laporan kegiatan sosial",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka memenuhi kebutuhan administrasi untuk {{tujuan_penggunaan}}, bersama surat ini kami bermaksud mengajukan permohonan informasi/data kepada Bapak/Ibu.",
      "Adapun informasi yang kami perlukan adalah sebagai berikut:\n{{informasi_diminta}}",
      "Kami menjamin bahwa informasi yang diberikan akan dipergunakan secara bertanggung jawab sesuai tujuan tersebut di atas."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a12",
    "name": "Surat Penawaran",
    "category": "A",
    "code": "PNW",
    "docLayout": "surat_resmi",
    "description": "Surat penawaran kerja sama, layanan, atau program secara umum kepada calon mitra atau klien.",
    "keywords": "penawaran umum layanan kerja sama",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal Penawaran",
        "type": "text",
        "placeholder": "Contoh: Penawaran Layanan / Program Kerja Sama",
        "required": true,
        "default": "Penawaran Kerja Sama / Layanan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "Contoh: 1 (Satu) Lembar Rincian",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "detail_penawaran",
        "label": "Rincian Penawaran",
        "type": "textarea",
        "placeholder": "Jelaskan keunggulan layanan, harga/skema, dan manfaat bagi penerima.",
        "required": true,
        "default": ""
      },
      {
        "name": "masa_berlaku",
        "label": "Masa Berlaku Penawaran",
        "type": "text",
        "placeholder": "Contoh: 14 hari sejak tanggal surat ini",
        "required": false,
        "default": "30 hari sejak tanggal diterbitkannya surat ini"
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan penuh rasa hormat, bersama surat ini kami bermaksud memperkenalkan serta mengajukan penawaran kepada Bapak/Ibu sebagai berikut:\n{{detail_penawaran}}",
      "Penawaran ini berlaku selama {{masa_berlaku}}. Kami sangat terbuka untuk berdiskusi lebih lanjut guna menyesuaikan penawaran dengan kebutuhan instansi Bapak/Ibu.",
      "Demikian surat penawaran ini kami sampaikan. Atas perhatian dan kesempatan yang diberikan, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a13",
    "name": "Surat Tanggapan",
    "category": "A",
    "code": "TGP",
    "docLayout": "surat_resmi",
    "description": "Surat balasan atau tanggapan resmi atas surat masuk, permohonan, undangan, atau laporan.",
    "keywords": "tanggapan balasan surat konfirmasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Contoh: Tanggapan atas Surat Nomor...",
        "required": true,
        "default": "Tanggapan Resmi"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_surat_masuk",
        "label": "Nomor & Tanggal Surat yang Ditanggapi",
        "type": "text",
        "placeholder": "Contoh: 012/UND/X/2026 tanggal 10 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "isi_tanggapan",
        "label": "Isi Tanggapan / Jawaban",
        "type": "textarea",
        "placeholder": "Tuliskan jawaban, keputusan, atau klarifikasi secara jelas.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Menindaklanjuti surat dari Bapak/Ibu Nomor {{nomor_surat_masuk}}, bersama ini kami sampaikan tanggapan resmi sebagai berikut:",
      "{{isi_tanggapan}}",
      "Demikian surat tanggapan ini kami sampaikan. Atas perhatian dan kerja sama yang terjalin dengan baik, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a14",
    "name": "Surat Keberatan",
    "category": "A",
    "code": "KBR",
    "docLayout": "surat_resmi",
    "description": "Surat penyampaian keberatan secara sopan, objektif, dan terstruktur atas suatu keputusan atau tagihan.",
    "keywords": "keberatan sanggahan klarifikasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Penyampaian Keberatan",
        "required": true,
        "default": "Penyampaian Keberatan dan Permohonan Peninjauan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Berkas Bukti Pendukung",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "objek_keberatan",
        "label": "Hal / Keputusan yang Dikeberatkan",
        "type": "text",
        "placeholder": "Contoh: Tagihan / Keputusan Administrasi Nomor...",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_keberatan",
        "label": "Dasar & Alasan Keberatan",
        "type": "textarea",
        "placeholder": "Uraikan fakta serta alasan keberatan secara objektif.",
        "required": true,
        "default": ""
      },
      {
        "name": "harapan_penyelesaian",
        "label": "Permohonan Penyelesaian",
        "type": "text",
        "placeholder": "Contoh: Mohon dilakukan peninjauan ulang dan koreksi data",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan segala hormat, melalui surat ini kami bermaksud menyampaikan keberatan atas {{objek_keberatan}}.",
      "Adapun dasar dan alasan keberatan kami adalah sebagai berikut:\n{{alasan_keberatan}}",
      "Sehubungan dengan hal tersebut, kami memohon kiranya Bapak/Ibu berkenan untuk melakukan {{harapan_penyelesaian}}. Kami siap memberikan keterangan tambahan apabila diperlukan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a15",
    "name": "Surat Kesepakatan",
    "category": "A",
    "code": "KSP",
    "docLayout": "surat_judul_tengah",
    "description": "Dokumen kesepakatan bersama antara dua pihak mengenai komitmen, jadwal, atau penyelesaian suatu hal.",
    "keywords": "kesepakatan bersama mufakat perjanjian",
    "fields": [
      {
        "name": "pihak_1_nama",
        "label": "Nama Pihak Pertama",
        "type": "text",
        "placeholder": "Nama lengkap pihak pertama",
        "required": true,
        "default": ""
      },
      {
        "name": "pihak_1_jabatan",
        "label": "Jabatan / Peran Pihak Pertama",
        "type": "text",
        "placeholder": "Contoh: Ketua Pelaksana / Pihak Pertama",
        "required": true,
        "default": ""
      },
      {
        "name": "pihak_2_nama",
        "label": "Nama Pihak Kedua",
        "type": "text",
        "placeholder": "Nama lengkap pihak kedua",
        "required": true,
        "default": ""
      },
      {
        "name": "pihak_2_jabatan",
        "label": "Jabatan / Peran Pihak Kedua",
        "type": "text",
        "placeholder": "Contoh: Mitra / Pihak Kedua",
        "required": true,
        "default": ""
      },
      {
        "name": "poin_kesepakatan",
        "label": "Poin-Poin Kesepakatan",
        "type": "textarea",
        "placeholder": "1. ...\n2. ...\n3. ...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pada hari ini, kami yang bertanda tangan di bawah ini:\n1. Nama : {{pihak_1_nama}} ({{pihak_1_jabatan}}), selanjutnya disebut PIHAK PERTAMA.\n2. Nama : {{pihak_2_nama}} ({{pihak_2_jabatan}}), selanjutnya disebut PIHAK KEDUA.",
      "Kedua belah pihak secara sadar dan mufakat menyepakati hal-hal sebagai berikut:\n{{poin_kesepakatan}}",
      "Demikian Surat Kesepakatan ini dibuat untuk dipatuhi dan dilaksanakan dengan penuh tanggung jawab oleh kedua belah pihak."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a16",
    "name": "Surat Pernyataan Tanggung Jawab",
    "category": "A",
    "code": "SPTJ",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan kesediaan memikul tanggung jawab penuh atas pelaksanaan kegiatan, dana, atau keamanan.",
    "keywords": "tanggung jawab mutlak sptjm kegiatan dana",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_penanggung_jawab",
        "label": "Jabatan / Kapasitas",
        "type": "text",
        "placeholder": "Contoh: Ketua Panitia Pelaksana",
        "required": true,
        "default": ""
      },
      {
        "name": "objek_tanggung_jawab",
        "label": "Hal yang Dipertanggungjawabkan",
        "type": "textarea",
        "placeholder": "Contoh: Pelaksanaan kegiatan sosial dan penggunaan dana bantuan secara transparan sesuai proposal.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama : {{nama_lengkap}}\nNIK : {{nik}}\nJabatan : {{jabatan_penanggung_jawab}}\nAlamat : {{alamat_lengkap}}",
      "Dengan ini menyatakan bertanggung jawab penuh secara moral maupun administratif atas:\n{{objek_tanggung_jawab}}",
      "Apabila di kemudian hari terjadi penyimpangan atau ketidaksesuaian, saya bersedia mempertanggungjawabkannya sesuai peraturan dan ketentuan yang berlaku."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a17",
    "name": "Surat Izin",
    "category": "A",
    "code": "IZN",
    "docLayout": "surat_resmi",
    "description": "Surat permohonan izin tidak masuk kerja, izin menyelenggarakan acara, atau izin penggunaan fasilitas.",
    "keywords": "izin permohonan tidak masuk acara",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal Izin",
        "type": "text",
        "placeholder": "Contoh: Permohonan Izin Tidak Masuk Kerja / Kegiatan",
        "required": true,
        "default": "Permohonan Izin"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_pemohon",
        "label": "Nama Pemohon Izin",
        "type": "text",
        "placeholder": "Nama lengkap pemohon",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_izin",
        "label": "Hari / Tanggal Izin",
        "type": "text",
        "placeholder": "Contoh: Rabu, 18 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_izin",
        "label": "Alasan Permohonan Izin",
        "type": "textarea",
        "placeholder": "Jelaskan alasan izin secara jelas dan jujur.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan hormat, saya yang bertanda tangan di bawah ini:\nNama : {{nama_pemohon}}",
      "Bermaksud mengajukan permohonan izin pada hari/tanggal {{tanggal_izin}} dikarenakan {{alasan_izin}}.",
      "Demikian surat permohonan izin ini saya sampaikan. Atas kebijaksanaan dan izin yang Bapak/Ibu berikan, saya ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_a18",
    "name": "Surat Keterangan Penghasilan",
    "category": "A",
    "code": "SKP",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan penghasilan karyawan dari pemberi kerja atau pernyataan penghasilan mandiri.",
    "keywords": "keterangan penghasilan gaji pendapatan",
    "fields": [
      {
        "name": "nama_pemohon",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Nama pihak yang diterangkan penghasilannya",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_pemohon",
        "label": "NIK",
        "type": "text",
        "placeholder": "16 digit NIK",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_pekerjaan",
        "label": "Jabatan / Jenis Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Staf Operasional / Pedagang UMKM",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_pemohon",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Alamat sesuai KTP",
        "required": true,
        "default": ""
      },
      {
        "name": "nominal_penghasilan",
        "label": "Rata-rata Penghasilan per Bulan (Rp)",
        "type": "text",
        "placeholder": "Contoh: Rp 3.500.000,- (Tiga Juta Lima Ratus Ribu Rupiah)",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Pengajuan beasiswa pendidikan anak / administrasi perbankan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama : {{nama_pemohon}}\nNIK : {{nik_pemohon}}\nJabatan / Pekerjaan : {{jabatan_pekerjaan}}\nAlamat : {{alamat_pemohon}}",
      "Adalah benar memiliki rata-rata penghasilan bersih setiap bulannya sebesar {{nominal_penghasilan}}.",
      "Surat keterangan penghasilan ini dibuat dengan sebenar-benarnya untuk keperluan {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b01",
    "name": "Surat Undangan Rapat",
    "category": "B",
    "code": "UND-RPT",
    "docLayout": "surat_resmi",
    "description": "Undangan rapat pengurus, rapat anggota, atau rapat koordinasi panitia organisasi/komunitas.",
    "keywords": "undangan rapat pengurus anggota koordinasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Rapat Koordinasi",
        "required": true,
        "default": "Undangan Rapat Pengurus & Anggota"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "agenda_rapat",
        "label": "Agenda Pembahasan Rapat",
        "type": "textarea",
        "placeholder": "1. Evaluasi kegiatan berjalan\n2. Perencanaan program kerja bulan depan\n3. Lain-lain",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan agenda program kerja organisasi, kami mengundang Bapak/Ibu/Saudara/i pengurus dan anggota untuk hadir dalam rapat yang akan dilaksanakan pada:",
      "Hari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nAgenda Rapat :\n{{agenda_rapat}}",
      "Mengingat pentingnya pembahasan dalam rapat ini, kehadiran Bapak/Ibu/Saudara/i tepat pada waktunya sangat kami harapkan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b02",
    "name": "Surat Permohonan Kerja Sama",
    "category": "B",
    "code": "KJS",
    "docLayout": "surat_resmi",
    "description": "Mengajak lembaga, komunitas, atau instansi lain untuk menjalin kemitraan program atau kegiatan.",
    "keywords": "permohonan kerja sama kemitraan sinergi organisasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Kerja Sama Program",
        "required": true,
        "default": "Permohonan Kerja Sama Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Berkas Profil / Konsep",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_program",
        "label": "Nama Program / Kegiatan",
        "type": "text",
        "placeholder": "Contoh: Pelatihan Pemuda & Bakti Sosial",
        "required": true,
        "default": ""
      },
      {
        "name": "bentuk_kerjasama",
        "label": "Bentuk Kerja Sama yang Diharapkan",
        "type": "textarea",
        "placeholder": "Jelaskan peran masing-masing pihak dan manfaat kolaborasi.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka memperluas manfaat program {{nama_program}} bagi masyarakat, kami bermaksud mengajak instansi/organisasi yang Bapak/Ibu pimpin untuk menjalin kerja sama strategis.",
      "Adapun bentuk kerja sama yang kami tawarkan meliputi:\n{{bentuk_kerjasama}}",
      "Kami sangat berharap dapat menjadwalkan pertemuan singkat untuk membahas teknis kolaborasi ini lebih lanjut."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b03",
    "name": "Surat Permohonan Sponsor",
    "category": "B",
    "code": "SPR",
    "docLayout": "surat_resmi",
    "description": "Surat pengajuan sponsorship kegiatan organisasi, lomba, seminar, atau acara komunitas.",
    "keywords": "permohonan sponsor sponsorship dukungan acara",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Sponsorship Kegiatan",
        "required": true,
        "default": "Permohonan Sponsorship Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Bundel Proposal Sponsorship",
        "required": false,
        "default": "1 (Satu) Proposal"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "manfaat_sponsor",
        "label": "Kontraprestasi / Manfaat bagi Sponsor",
        "type": "textarea",
        "placeholder": "Contoh: Pencantuman logo pada spanduk utama, media publikasi acara, dan penyebutan nama sponsor oleh MC.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan akan diselenggarakannya kegiatan {{nama_kegiatan}} pada tanggal {{tanggal_kegiatan}} bertempat di {{tempat_kegiatan}}, kami mengajukan permohonan partisipasi sponsorship kepada perusahaan/instansi yang Bapak/Ibu pimpin.",
      "Sebagai bentuk apresiasi kepada pihak sponsor, panitia menyediakan paket kontraprestasi berupa:\n{{manfaat_sponsor}}",
      "Rincian anggaran dan teknis acara terlampir dalam proposal kegiatan. Besar harapan kami Bapak/Ibu berkenan mendukung suksesnya acara ini."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b04",
    "name": "Surat Permohonan Bantuan Dana",
    "category": "B",
    "code": "BDN",
    "docLayout": "surat_resmi",
    "description": "Permohonan dukungan dana kegiatan organisasi, karang taruna, atau program pemberdayaan masyarakat.",
    "keywords": "permohonan bantuan dana anggaran kegiatan organisasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Bantuan Dana Kegiatan",
        "required": true,
        "default": "Permohonan Bantuan Dana Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Proposal & RAB",
        "required": false,
        "default": "1 (Satu) Proposal"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan",
        "type": "text",
        "placeholder": "Contoh: Peringatan Hari Besar & Bakti Pemuda",
        "required": true,
        "default": ""
      },
      {
        "name": "total_kebutuhan",
        "label": "Estimasi Total Anggaran (Rp)",
        "type": "text",
        "placeholder": "Contoh: Rp 10.000.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "info_rekening",
        "label": "Nomor Rekening Resmi Organisasi",
        "type": "text",
        "placeholder": "Contoh: Bank BSI 700xxxxxxx a.n. Organisasi...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka menyukseskan kegiatan {{nama_kegiatan}}, panitia pelaksana membutuhkan dukungan pembiayaan operasional dengan estimasi total anggaran sebesar {{total_kebutuhan}}.",
      "Melalui surat ini kami memohon bantuan dana dari Bapak/Ibu sesuai keikhlasan dan kemampuan. Bantuan dana dapat disalurkan secara langsung melalui sekretariat atau melalui rekening resmi organisasi: {{info_rekening}}.",
      "Setiap dukungan dana yang masuk akan dicatat dan dilaporkan secara transparan dalam laporan pertanggungjawaban kegiatan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b05",
    "name": "Surat Pemberitahuan Kegiatan",
    "category": "B",
    "code": "PKB",
    "docLayout": "surat_resmi",
    "description": "Memberitahukan rencana pelaksanaan kegiatan organisasi kepada pengurus lingkungan, aparat setempat, atau mitra.",
    "keywords": "pemberitahuan kegiatan izin lingkungan acara",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pemberitahuan Pelaksanaan Kegiatan",
        "required": true,
        "default": "Pemberitahuan Pelaksanaan Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Susunan Acara",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "jumlah_peserta",
        "label": "Perkiraan Jumlah Peserta",
        "type": "text",
        "placeholder": "Contoh: ± 75 orang",
        "required": true,
        "default": ""
      },
      {
        "name": "penanggung_jawab",
        "label": "Nama & Kontak Penanggung Jawab",
        "type": "text",
        "placeholder": "Contoh: Ahmad (0812-xxxx-xxxx)",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami memberitahukan bahwa organisasi kami akan menyelenggarakan kegiatan {{nama_kegiatan}} yang akan dilaksanakan pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nPerkiraan Peserta : {{jumlah_peserta}}",
      "Panitia berkomitmen menjaga ketertiban, keamanan, dan kebersihan lingkungan selama kegiatan berlangsung. Penanggung jawab lapangan kegiatan ini adalah {{penanggung_jawab}}.",
      "Demikian surat pemberitahuan ini kami sampaikan. Atas perhatian dan dukungan Bapak/Ibu, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b06",
    "name": "Surat Tugas",
    "category": "B",
    "code": "STG",
    "docLayout": "surat_judul_tengah",
    "description": "Penugasan resmi dari pimpinan organisasi kepada pengurus atau anggota untuk melaksanakan tugas tertentu.",
    "keywords": "surat tugas penugasan delegasi pengurus",
    "fields": [
      {
        "name": "nama_ditugaskan",
        "label": "Nama Pengurus / Anggota yang Ditugaskan",
        "type": "text",
        "placeholder": "Contoh: Muhammad Rizky",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_ditugaskan",
        "label": "Jabatan dalam Organisasi",
        "type": "text",
        "placeholder": "Contoh: Koordinator Bidang Humas",
        "required": true,
        "default": ""
      },
      {
        "name": "uraian_tugas",
        "label": "Uraian Tugas yang Diberikan",
        "type": "textarea",
        "placeholder": "Contoh: Mewakili organisasi menghadiri forum koordinasi serta melakukan pendataan lapangan.",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_tugas",
        "label": "Waktu / Masa Berlaku Tugas",
        "type": "text",
        "placeholder": "Contoh: Tanggal 20 s.d. 22 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "lokasi_tugas",
        "label": "Tempat Pelaksanaan Tugas",
        "type": "text",
        "placeholder": "Contoh: Aula Kecamatan Kosambi",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pimpinan organisasi dengan ini memberikan tugas resmi kepada:\nNama : {{nama_ditugaskan}}\nJabatan : {{jabatan_ditugaskan}}",
      "Untuk melaksanakan tugas sebagai berikut:\n{{uraian_tugas}}\nWaktu Pelaksanaan : {{waktu_tugas}}\nTempat : {{lokasi_tugas}}",
      "Demikian Surat Tugas ini diterbitkan untuk dilaksanakan dengan penuh tanggung jawab dan melaporkan hasilnya setelah tugas selesai."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b07",
    "name": "Surat Keputusan",
    "category": "B",
    "code": "SKEP",
    "docLayout": "surat_judul_tengah",
    "description": "Surat Keputusan (SK) resmi organisasi mengenai penetapan panitia, kebijakan, atau keputusan rapat.",
    "keywords": "surat keputusan sk penetapan kebijakan panitia",
    "fields": [
      {
        "name": "tentang_sk",
        "label": "Tentang / Judul Keputusan",
        "type": "text",
        "placeholder": "Contoh: PEMBENTUKAN PANITIA PELAKSANA KEGIATAN TAHUN 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "menimbang",
        "label": "Konsiderans Menimbang",
        "type": "textarea",
        "placeholder": "Contoh: Bahwa untuk kelancaran pelaksanaan program kerja organisasi, dipandang perlu menetapkan susunan panitia pelaksana.",
        "required": true,
        "default": ""
      },
      {
        "name": "mengingat",
        "label": "Konsiderans Mengingat",
        "type": "textarea",
        "placeholder": "Contoh: Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART) Organisasi serta hasil musyawarah pengurus.",
        "required": true,
        "default": ""
      },
      {
        "name": "memutuskan",
        "label": "Isi Keputusan (Menetapkan)",
        "type": "textarea",
        "placeholder": "KESATU : Mengesahkan nama-nama yang tercantum untuk melaksanakan tugas sebagaimana mestinya.\nKEDUA : Keputusan ini berlaku sejak tanggal ditetapkan.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "TENTANG:\n{{tentang_sk}}",
      "Menimbang :\n{{menimbang}}",
      "Mengingat :\n{{mengingat}}",
      "MEMUTUSKAN / MENETAPKAN:\n{{memutuskan}}"
    ],
    "closing": ""
  },
  {
    "id": "tpl_b08",
    "name": "Surat Berita Acara",
    "category": "B",
    "code": "BAP",
    "docLayout": "surat_judul_tengah",
    "description": "Catatan resmi bukti sah terlaksananya rapat, musyawarah, pemilihan pengurus, atau serah terima.",
    "keywords": "berita acara rapat musyawarah serah terima",
    "fields": [
      {
        "name": "judul_acara",
        "label": "Judul Berita Acara",
        "type": "text",
        "placeholder": "Contoh: RAPAT MUSYAWARAH PENGURUS",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_acara",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_acara",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 19.30 WIB s.d. 21.30 WIB",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_acara",
        "label": "Tempat Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Sekretariat Organisasi",
        "required": true,
        "default": ""
      },
      {
        "name": "pimpinan_rapat",
        "label": "Pimpinan Rapat / Acara",
        "type": "text",
        "placeholder": "Nama pimpinan rapat",
        "required": true,
        "default": ""
      },
      {
        "name": "hasil_keputusan",
        "label": "Ringkasan Jalannya Acara & Keputusan",
        "type": "textarea",
        "placeholder": "Uraikan jalannya acara, jumlah peserta hadir, dan poin keputusan yang disepakati.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "BERITA ACARA {{judul_acara}}",
      "Pada tanggal {{tanggal_acara}}, bertempat di {{tempat_acara}}, mulai pukul {{waktu_acara}}, telah dilaksanakan kegiatan {{judul_acara}} yang dipimpin oleh {{pimpinan_rapat}}.",
      "Adapun jalannya kegiatan dan hasil keputusan yang disepakati bersama adalah sebagai berikut:\n{{hasil_keputusan}}",
      "Demikian Berita Acara ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b09",
    "name": "Surat Rekomendasi",
    "category": "B",
    "code": "REK",
    "docLayout": "surat_judul_tengah",
    "description": "Surat rekomendasi resmi dari organisasi untuk mendukung anggota mengikuti pelatihan, beasiswa, atau seleksi.",
    "keywords": "rekomendasi dukungan anggota pelatihan seleksi",
    "fields": [
      {
        "name": "nama_direkomendasikan",
        "label": "Nama yang Direkomendasikan",
        "type": "text",
        "placeholder": "Nama lengkap anggota/pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_anggota",
        "label": "Jabatan / Status Keanggotaan",
        "type": "text",
        "placeholder": "Contoh: Anggota Aktif Bidang Sosial",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_anggota",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "tujuan_rekomendasi",
        "label": "Tujuan Rekomendasi",
        "type": "text",
        "placeholder": "Contoh: Mengikuti Pelatihan Kepemimpinan Pemuda Tingkat Kabupaten",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_rekomendasi",
        "label": "Pertimbangan Rekomendasi",
        "type": "textarea",
        "placeholder": "Contoh: Yang bersangkutan aktif berkontribusi, berintegritas tinggi, dan layak mewakili organisasi.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini memberikan rekomendasi resmi kepada:\nNama : {{nama_direkomendasikan}}\nJabatan / Status : {{jabatan_anggota}}\nAlamat : {{alamat_anggota}}",
      "Untuk mengikuti/mengajukan {{tujuan_rekomendasi}}.",
      "Rekomendasi ini diberikan berdasarkan pertimbangan bahwa {{alasan_rekomendasi}}",
      "Demikian surat rekomendasi ini dibuat untuk dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b10",
    "name": "Surat Ucapan Terima Kasih",
    "category": "B",
    "code": "UTK",
    "docLayout": "surat_resmi",
    "description": "Surat apresiasi resmi kepada mitra, pembicara, panitia, atau instansi atas dukungan pada acara organisasi.",
    "keywords": "ucapan terima kasih apresiasi dukungan mitra",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Ucapan Terima Kasih",
        "required": true,
        "default": "Ucapan Terima Kasih atas Dukungan Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan yang Telah Terlaksana",
        "type": "text",
        "placeholder": "Contoh: Bakti Sosial & Santunan",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan Kegiatan",
        "type": "text",
        "placeholder": "Contoh: 15 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "bentuk_dukungan",
        "label": "Bentuk Dukungan yang Diberikan",
        "type": "textarea",
        "placeholder": "Contoh: Dukungan fasilitas tempat, konsumsi, serta kehadiran tim relawan.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan telah terlaksananya kegiatan {{nama_kegiatan}} pada tanggal {{tanggal_kegiatan}} dengan lancar dan sukses, kami menyampaikan terima kasih dan apresiasi yang setinggi-tingginya kepada Bapak/Ibu.",
      "Secara khusus kami menghargai kontribusi berupa {{bentuk_dukungan}} yang sangat membantu keberhasilan acara tersebut.",
      "Semoga kerja sama dan silaturahmi yang baik ini dapat terus terjaga pada program-program berikutnya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b11",
    "name": "Surat Pengangkatan Pengurus",
    "category": "B",
    "code": "ANG",
    "docLayout": "surat_judul_tengah",
    "description": "Surat penetapan pengangkatan pengurus baru dalam struktur organisasi atau kepanitiaan.",
    "keywords": "pengangkatan pengurus penetapan jabatan struktur",
    "fields": [
      {
        "name": "nama_pengurus",
        "label": "Nama Lengkap Pengurus",
        "type": "text",
        "placeholder": "Nama yang diangkat",
        "required": true,
        "default": ""
      },
      {
        "name": "ttl_pengurus",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 10 Agustus 1998",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_pengurus",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_baru",
        "label": "Jabatan yang Diamanahkan",
        "type": "text",
        "placeholder": "Contoh: Sekretaris Bidang Program",
        "required": true,
        "default": ""
      },
      {
        "name": "masa_bakti",
        "label": "Periode Masa Bakti",
        "type": "text",
        "placeholder": "Contoh: Periode 2026 – 2028",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Berdasarkan hasil musyawarah pengurus dan kebutuhan organisasi, dengan ini mengangkat:\nNama : {{nama_pengurus}}\nTempat, Tanggal Lahir : {{ttl_pengurus}}\nAlamat : {{alamat_pengurus}}",
      "Untuk menjabat sebagai {{jabatan_baru}} untuk masa bakti {{masa_bakti}}.",
      "Kepada yang bersangkutan diharapkan dapat menjalankan amanah dan tanggung jawab ini dengan penuh dedikasi sesuai ketentuan organisasi."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b12",
    "name": "Surat Pemberhentian Pengurus",
    "category": "B",
    "code": "PBR",
    "docLayout": "surat_judul_tengah",
    "description": "Surat resmi pemberhentian dengan hormat pengurus yang telah habis masa bakti atau mengundurkan diri.",
    "keywords": "pemberhentian pengurus demisioner masa bakti",
    "fields": [
      {
        "name": "nama_pengurus",
        "label": "Nama Lengkap Pengurus",
        "type": "text",
        "placeholder": "Nama pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_lama",
        "label": "Jabatan Sebelumnya",
        "type": "text",
        "placeholder": "Contoh: Bendahara Umum",
        "required": true,
        "default": ""
      },
      {
        "name": "periode_lama",
        "label": "Periode Kepengurusan",
        "type": "text",
        "placeholder": "Contoh: Periode 2024 – 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_pemberhentian",
        "label": "Alasan Pemberhentian",
        "type": "text",
        "placeholder": "Contoh: Berakhirnya masa bakti kepengurusan / permohonan pengunduran diri",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Berdasarkan keputusan rapat pengurus dan mempertimbangkan {{alasan_pemberhentian}}, dengan ini menetapkan pemberhentian dengan hormat kepada:\nNama : {{nama_pengurus}}\nJabatan : {{jabatan_lama}}\nPeriode : {{periode_lama}}",
      "Pimpinan dan seluruh keluarga besar organisasi mengucapkan terima kasih yang tulus atas segala pengabdian, pemikiran, dan tenaga yang telah dicurahkan selama menjabat.",
      "Surat ini berlaku sejak tanggal ditetapkan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b13",
    "name": "Surat Mandat",
    "category": "B",
    "code": "MND",
    "docLayout": "surat_judul_tengah",
    "description": "Surat mandat resmi organisasi kepada delegasi untuk mengikuti musyawarah daerah, kongres, atau forum eksternal.",
    "keywords": "surat mandat delegasi perwakilan musyawarah",
    "fields": [
      {
        "name": "nama_penerima_mandat",
        "label": "Nama Penerima Mandat",
        "type": "text",
        "placeholder": "Nama delegasi",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan_penerima_mandat",
        "label": "Jabatan dalam Organisasi",
        "type": "text",
        "placeholder": "Contoh: Wakil Ketua",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_forum",
        "label": "Nama Forum / Acara yang Diikuti",
        "type": "text",
        "placeholder": "Contoh: Musyawarah Daerah Karang Taruna",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_forum",
        "label": "Tanggal & Tempat Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: 25 November 2026 di Gedung Serbaguna",
        "required": true,
        "default": ""
      },
      {
        "name": "cakupan_mandat",
        "label": "Batasan / Kewenangan Mandat",
        "type": "text",
        "placeholder": "Contoh: Mewakili suara dan aspirasi organisasi secara resmi dalam forum tersebut",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pimpinan organisasi dengan ini memberikan mandat resmi kepada:\nNama : {{nama_penerima_mandat}}\nJabatan : {{jabatan_penerima_mandat}}",
      "Untuk bertindak sebagai utusan resmi organisasi dalam kegiatan {{nama_forum}} yang diselenggarakan pada {{tanggal_forum}}, dengan kewenangan {{cakupan_mandat}}.",
      "Penerima mandat wajib menjaga nama baik organisasi serta menyampaikan laporan tertulis setelah kegiatan selesai."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b14",
    "name": "Surat Pernyataan Anggota",
    "category": "B",
    "code": "SPA",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan kesediaan bergabung sebagai anggota aktif dan mematuhi tata tertib organisasi.",
    "keywords": "pernyataan anggota bergabung tata tertib",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "bidang_minat",
        "label": "Bidang / Divisi yang Diminati",
        "type": "text",
        "placeholder": "Contoh: Bidang Sosial & Kemanusiaan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nJenis Kelamin : {{jenis_kelamin}}\nPekerjaan : {{pekerjaan}}\nAlamat : {{alamat_lengkap}}",
      "Dengan penuh kesadaran menyatakan bersedia bergabung menjadi anggota aktif dan berkontribusi pada {{bidang_minat}}, serta siap mematuhi seluruh aturan dan tata tertib yang berlaku.",
      "Demikian surat pernyataan keanggotaan ini saya buat dengan sebenarnya tanpa paksaan dari pihak mana pun."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b15",
    "name": "Surat Permohonan Penggunaan Tempat",
    "category": "B",
    "code": "TMP",
    "docLayout": "surat_resmi",
    "description": "Permohonan peminjaman aula, lapangan, gedung sekolah, atau fasilitas umum untuk acara organisasi.",
    "keywords": "permohonan penggunaan peminjaman tempat aula gedung",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Peminjaman Tempat / Fasilitas",
        "required": true,
        "default": "Permohonan Izin Penggunaan Tempat"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_tempat",
        "label": "Nama Tempat / Ruangan yang Dimohonkan",
        "type": "text",
        "placeholder": "Contoh: Aula Serbaguna / Lapangan RW",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan akan diadakannya kegiatan {{nama_kegiatan}}, kami bermaksud mengajukan permohonan izin peminjaman dan penggunaan {{nama_tempat}} yang Bapak/Ibu kelola.",
      "Adapun rencana penggunaan tempat tersebut adalah pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nKegiatan : {{nama_kegiatan}}",
      "Kami bersedia mematuhi seluruh tata tertib serta menjaga kebersihan dan keutuhan fasilitas selama maupun setelah kegiatan berlangsung."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b16",
    "name": "Surat Permohonan Narasumber",
    "category": "B",
    "code": "NRS",
    "docLayout": "surat_resmi",
    "description": "Undangan dan permohonan kepada pakar, tokoh, atau praktisi untuk menjadi pemateri/narasumber acara.",
    "keywords": "permohonan narasumber pemateri pembicara workshop",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Menjadi Narasumber",
        "required": true,
        "default": "Permohonan Kesediaan Menjadi Narasumber"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Kerangka Acuan (TOR)",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "topik_materi",
        "label": "Topik / Judul Materi",
        "type": "text",
        "placeholder": "Contoh: Peran Pemuda dalam Pemberdayaan Masyarakat",
        "required": true,
        "default": ""
      },
      {
        "name": "durasi_sesi",
        "label": "Durasi Penyampaian Materi",
        "type": "text",
        "placeholder": "Contoh: 60 menit (termasuk sesi tanya jawab)",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka meningkatkan wawasan peserta pada kegiatan {{nama_kegiatan}}, kami bermaksud memohon kesediaan Bapak/Ibu untuk hadir sebagai Narasumber / Pemateri.",
      "Adapun jadwal dan materi yang diharapkan adalah sebagai berikut:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nTopik Materi : {{topik_materi}}\nDurasi : {{durasi_sesi}}",
      "Besar harapan kami Bapak/Ibu berkenan meluangkan waktu untuk berbagi ilmu dan pengalaman bersama peserta kami."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b17",
    "name": "Surat Pengantar Proposal",
    "category": "B",
    "code": "PRP",
    "docLayout": "surat_resmi",
    "description": "Surat resmi pengantar pengajuan proposal kegiatan kepada instansi pemerintah, perusahaan, atau mitra.",
    "keywords": "pengantar proposal kegiatan pengajuan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pengantar Proposal Kegiatan",
        "required": true,
        "default": "Pengajuan Proposal Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Bundel Proposal",
        "required": false,
        "default": "1 (Satu) Bundel Proposal"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "judul_proposal",
        "label": "Judul Proposal Kegiatan",
        "type": "text",
        "placeholder": "Contoh: Proposal Gebyar Pemuda & Bakti Sosial 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_pelaksanaan",
        "label": "Rencana Waktu & Lokasi",
        "type": "text",
        "placeholder": "Contoh: 30 November 2026 di Kosambi Barat",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka melaksanakan program kerja organisasi, bersama surat ini kami menyampaikan {{judul_proposal}} yang direncanakan akan dilaksanakan pada {{waktu_pelaksanaan}}.",
      "Proposal terlampir memuat latar belakang, susunan panitia, rincian acara, serta rencana anggaran biaya yang diperlukan.",
      "Besar harapan kami Bapak/Ibu berkenan mempelajari proposal tersebut serta memberikan dukungan demi kelancaran kegiatan ini."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b18",
    "name": "Surat Undangan Pelantikan",
    "category": "B",
    "code": "PLT",
    "docLayout": "surat_resmi",
    "description": "Undangan resmi acara pengukuhan atau pelantikan pengurus baru organisasi/karang taruna.",
    "keywords": "undangan pelantikan pengukuhan pengurus",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Pelantikan Pengurus",
        "required": true,
        "default": "Undangan Acara Pelantikan Pengurus"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Susunan Acara",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "periode_kepengurusan",
        "label": "Periode Kepengurusan yang Dilantik",
        "type": "text",
        "placeholder": "Contoh: Periode 2026 – 2029",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan telah terbentuknya struktur kepengurusan baru {{periode_kepengurusan}}, kami bermaksud mengundang Bapak/Ibu untuk hadir pada acara Pelantikan Pengurus yang akan dilaksanakan pada:",
      "Hari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nAcara : {{nama_kegiatan}}",
      "Kehadiran dan doa restu Bapak/Ibu merupakan kehormatan besar bagi langkah awal kepengurusan kami."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b19",
    "name": "Surat Kesediaan Menjadi Panitia",
    "category": "B",
    "code": "KPN",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan kesediaan anggota/relawan untuk bergabung dalam kepanitiaan suatu acara.",
    "keywords": "kesediaan panitia pernyataan kepanitiaan",
    "fields": [
      {
        "name": "nama_calon_panitia",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Nama lengkap calon panitia",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_calon",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "no_hp",
        "label": "Nomor HP / WhatsApp",
        "type": "text",
        "placeholder": "Contoh: 0812-xxxx-xxxx",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_acara",
        "label": "Nama Acara / Kegiatan",
        "type": "text",
        "placeholder": "Contoh: Panitia Santunan & Bakti Sosial",
        "required": true,
        "default": ""
      },
      {
        "name": "seksi_panitia",
        "label": "Divisi / Seksi yang Diminati",
        "type": "text",
        "placeholder": "Contoh: Seksi Acara / Logistik / Perlengkapan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama Lengkap : {{nama_calon_panitia}}\nAlamat : {{alamat_calon}}\nNomor HP / WA : {{no_hp}}",
      "Dengan ini menyatakan bersedia dan sanggup menjadi bagian dari panitia pelaksana pada kegiatan {{nama_acara}} (Divisi/Seksi: {{seksi_panitia}}), serta berkomitmen menjalankan tugas sebaik-baiknya hingga acara selesai.",
      "Demikian surat kesediaan ini dibuat dengan penuh tanggung jawab."
    ],
    "closing": ""
  },
  {
    "id": "tpl_b20",
    "name": "Surat Keterangan Keanggotaan",
    "category": "B",
    "code": "SKA",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan resmi yang membuktikan seseorang terdaftar sebagai pengurus atau anggota aktif.",
    "keywords": "keterangan keanggotaan anggota aktif pengurus",
    "fields": [
      {
        "name": "nama_anggota",
        "label": "Nama Lengkap Anggota",
        "type": "text",
        "placeholder": "Nama lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_anggota",
        "label": "Nomor Induk Anggota (Jika ada)",
        "type": "text",
        "placeholder": "Contoh: KOPY-2024-015",
        "required": false,
        "default": ""
      },
      {
        "name": "jabatan_anggota",
        "label": "Jabatan / Status",
        "type": "text",
        "placeholder": "Contoh: Anggota Aktif",
        "required": true,
        "default": ""
      },
      {
        "name": "sejak_tahun",
        "label": "Terdaftar Sejak Tahun",
        "type": "text",
        "placeholder": "Contoh: 2022",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Administrasi pendaftaran pelatihan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pimpinan organisasi dengan ini menerangkan bahwa:\nNama : {{nama_anggota}}\nNomor Anggota : {{nomor_anggota}}\nStatus / Jabatan : {{jabatan_anggota}}",
      "Adalah benar terdaftar sebagai anggota aktif sejak tahun {{sejak_tahun}} hingga saat surat ini diterbitkan dan aktif berpartisipasi dalam kegiatan organisasi.",
      "Demikian surat keterangan keanggotaan ini dibuat untuk dipergunakan sebagai {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c01",
    "name": "Surat Pengantar RT/RW",
    "category": "C",
    "code": "PNG-RT",
    "docLayout": "surat_judul_tengah",
    "description": "Draf surat pengantar dari pengurus RT/RW untuk pengurusan administrasi kependudukan di Kelurahan/Desa.",
    "keywords": "pengantar rt rw kelurahan desa ktp kk",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "agama",
        "label": "Agama",
        "type": "text",
        "placeholder": "Contoh: Islam",
        "required": true,
        "default": ""
      },
      {
        "name": "status_kawin",
        "label": "Status Perkawinan",
        "type": "select",
        "options": [
          "Belum Kawin",
          "Kawin",
          "Cerai Hidup",
          "Cerai Mati"
        ],
        "required": true,
        "default": "Belum Kawin"
      },
      {
        "name": "keperluan_pengantar",
        "label": "Keperluan Pengantar",
        "type": "text",
        "placeholder": "Contoh: Pengurusan Pembuatan KTP / Kartu Keluarga / SKCK di Kelurahan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini Ketua RT/RW menerangkan bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nJenis Kelamin : {{jenis_kelamin}}\nAgama : {{agama}}\nStatus Perkawinan : {{status_kawin}}\nPekerjaan : {{pekerjaan}}\nAlamat : {{alamat_lengkap}}",
      "Orang tersebut di atas adalah benar warga kami yang berdomisili di alamat tersebut dan berkelakuan baik.",
      "Surat pengantar ini diberikan kepada yang bersangkutan untuk keperluan: {{keperluan_pengantar}} di tingkat Kelurahan/Desa dan instansi terkait."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c02",
    "name": "Draf Surat Keterangan Domisili",
    "category": "C",
    "code": "DOM",
    "docLayout": "surat_judul_tengah",
    "description": "Draf awal keterangan domisili warga untuk diajukan dan disahkan oleh Ketua RT/RW atau Kelurahan/Desa.",
    "keywords": "draf keterangan domisili tempat tinggal warga",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "lama_tinggal",
        "label": "Lama Berdomisili di Alamat Ini",
        "type": "text",
        "placeholder": "Contoh: Sejak tahun 2020 hingga sekarang",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Domisili",
        "type": "text",
        "placeholder": "Contoh: Persyaratan pendaftaran sekolah / administrasi kerja",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nJenis Kelamin : {{jenis_kelamin}}\nPekerjaan : {{pekerjaan}}\nAlamat Domisili : {{alamat_lengkap}}",
      "Adalah benar warga yang berdomisili tetap/sementara di alamat tersebut di atas terhitung {{lama_tinggal}}.",
      "Demikian draf surat keterangan domisili ini dibuat untuk dipergunakan sebagai {{keperluan}} setelah mendapatkan pengesahan pejabat berwenang."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c03",
    "name": "Draf Surat Keterangan Usaha",
    "category": "C",
    "code": "SKU",
    "docLayout": "surat_judul_tengah",
    "description": "Draf pengantar/keterangan usaha mikro warga untuk diajukan pengesahannya ke RT/RW dan Kelurahan/Desa.",
    "keywords": "draf keterangan usaha sku umkm mikro",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_usaha",
        "label": "Nama Usaha",
        "type": "text",
        "placeholder": "Contoh: Warung Sembako Berkah / Jamu Tradisional",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_usaha",
        "label": "Jenis / Bidang Usaha",
        "type": "text",
        "placeholder": "Contoh: Perdagangan Eceran / Kuliner Minuman Herbal",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_usaha",
        "label": "Alamat Lokasi Usaha",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi Barat RT 002/RW 004",
        "required": true,
        "default": ""
      },
      {
        "name": "tahun_berdiri",
        "label": "Mulai Berusaha Sejak",
        "type": "text",
        "placeholder": "Contoh: Tahun 2024",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Pengajuan modal usaha mikro / NIB",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama Pemilik : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nAlamat Tempat Tinggal : {{alamat_lengkap}}",
      "Berdasarkan pengamatan di lingkungan kami, yang bersangkutan benar memiliki dan menjalankan kegiatan usaha sebagai berikut:\nNama Usaha : {{nama_usaha}}\nJenis Usaha : {{jenis_usaha}}\nAlamat Usaha : {{alamat_usaha}}\nBerdiri Sejak : {{tahun_berdiri}}",
      "Demikian draf surat keterangan usaha ini dibuat untuk keperluan {{keperluan}} dan menunggu pengesahan instansi yang berwenang."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c04",
    "name": "Draf Surat Keterangan Tidak Mampu",
    "category": "C",
    "code": "SKTM",
    "docLayout": "surat_judul_tengah",
    "description": "Draf pengantar SKTM warga untuk keperluan bantuan sosial, pendidikan, atau layanan kesehatan di Kelurahan/Desa.",
    "keywords": "draf keterangan tidak mampu sktm bantuan sosial",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "jumlah_tanggungan",
        "label": "Jumlah Tanggungan Keluarga (Orang)",
        "type": "number",
        "placeholder": "Contoh: 4",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan_sktm",
        "label": "Keperluan Pengajuan SKTM",
        "type": "text",
        "placeholder": "Contoh: Pengajuan KIP Sekolah / Keringanan Biaya Rumah Sakit",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nPekerjaan : {{pekerjaan}}\nJumlah Tanggungan : {{jumlah_tanggungan}} orang\nAlamat : {{alamat_lengkap}}",
      "Berdasarkan kondisi sosial ekonomi keluarga di lingkungan kami, yang bersangkutan tergolong keluarga kurang mampu / prasejahtera yang layak mendapatkan prioritas bantuan.",
      "Demikian draf keterangan ini dibuat sebagai pengantar pengurusan SKTM resmi di Kelurahan/Desa untuk keperluan {{keperluan_sktm}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c05",
    "name": "Draf Surat Keterangan Kematian",
    "category": "C",
    "code": "SKM",
    "docLayout": "surat_judul_tengah",
    "description": "Draf laporan/keterangan peristiwa kematian warga dari lingkungan RT/RW untuk pelaporan ke Kelurahan/Desa.",
    "keywords": "draf keterangan kematian warga dukacita",
    "fields": [
      {
        "name": "nama_almarhum",
        "label": "Nama Lengkap Almarhum / Almarhumah",
        "type": "text",
        "placeholder": "Nama lengkap mendiang",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_almarhum",
        "label": "NIK Almarhum / Almarhumah",
        "type": "text",
        "placeholder": "16 digit NIK",
        "required": false,
        "default": ""
      },
      {
        "name": "umur_almarhum",
        "label": "Usia",
        "type": "text",
        "placeholder": "Contoh: 64 Tahun",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_almarhum",
        "label": "Alamat Terakhir",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_wafat",
        "label": "Tanggal Meninggal Dunia",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_wafat",
        "label": "Pukul / Waktu",
        "type": "text",
        "placeholder": "Contoh: Pukul 05.30 WIB",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_wafat",
        "label": "Tempat Meninggal Dunia",
        "type": "text",
        "placeholder": "Contoh: Rumah Kediaman / RSUD Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "sebab_wafat",
        "label": "Sebab Kematian",
        "type": "text",
        "placeholder": "Contoh: Sakit / Usia Lanjut",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_pelapor",
        "label": "Nama Pelapor / Ahli Waris",
        "type": "text",
        "placeholder": "Nama anggota keluarga pelapor",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa telah meninggal dunia warga kami:\nNama : {{nama_almarhum}}\nNIK : {{nik_almarhum}}\nUsia : {{umur_almarhum}}\nAlamat : {{alamat_almarhum}}",
      "Yang bersangkutan telah berpulang ke rahmatullah pada:\nTanggal : {{tanggal_wafat}}\nWaktu : {{waktu_wafat}}\nTempat : {{tempat_wafat}}\nDisebabkan karena : {{sebab_wafat}}",
      "Draf keterangan ini dibuat berdasarkan laporan keluarga ({{nama_pelapor}}) sebagai pengantar penerbitan Akta/Surat Kematian resmi di Kelurahan/Desa."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c06",
    "name": "Draf Surat Keterangan Belum Menikah",
    "category": "C",
    "code": "SKBM",
    "docLayout": "surat_judul_tengah",
    "description": "Draf surat keterangan status belum pernah menikah dari lingkungan RT/RW untuk pengurusan nikah atau kerja.",
    "keywords": "draf keterangan belum menikah lajang nikah",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "agama",
        "label": "Agama",
        "type": "text",
        "placeholder": "Contoh: Islam",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Persyaratan administrasi pernikahan di KUA / lamaran kerja",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nJenis Kelamin : {{jenis_kelamin}}\nAgama : {{agama}}\nPekerjaan : {{pekerjaan}}\nAlamat : {{alamat_lengkap}}",
      "Sepanjang pengetahuan dan catatan kependudukan di lingkungan kami, yang bersangkutan benar berstatus BELUM PERNAH MENIKAH.",
      "Demikian draf keterangan ini dibuat sebagai bahan pengantar pengesahan di Kelurahan/Desa untuk keperluan {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c07",
    "name": "Draf Surat Keterangan Penghasilan",
    "category": "C",
    "code": "SKP-RT",
    "docLayout": "surat_judul_tengah",
    "description": "Draf keterangan perkiraan penghasilan warga pekerja informal untuk pengantar ke Kelurahan/Desa.",
    "keywords": "draf keterangan penghasilan warga informal",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_usaha_kerja",
        "label": "Uraian Pekerjaan / Usaha",
        "type": "text",
        "placeholder": "Contoh: Buruh Harian Lepas / Pedagang Kaki Lima",
        "required": true,
        "default": ""
      },
      {
        "name": "perkiraan_penghasilan",
        "label": "Perkiraan Penghasilan per Bulan",
        "type": "text",
        "placeholder": "Contoh: Rp 1.800.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan",
        "type": "text",
        "placeholder": "Contoh: Persyaratan pengajuan bantuan pendidikan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nPekerjaan : {{pekerjaan}} ({{jenis_usaha_kerja}})\nAlamat : {{alamat_lengkap}}",
      "Berdasarkan keterangan yang bersangkutan dan kondisi di lingkungan kami, yang bersangkutan memiliki penghasilan tidak tetap dengan rata-rata sekitar {{perkiraan_penghasilan}} per bulan.",
      "Demikian draf keterangan ini dibuat untuk pengurusan pengesahan resmi di Kelurahan/Desa guna keperluan {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c08",
    "name": "Draf Surat Pengantar Pindah",
    "category": "C",
    "code": "PND",
    "docLayout": "surat_judul_tengah",
    "description": "Draf pengantar pindah domisili warga dari RT/RW asal menuju alamat tujuan baru.",
    "keywords": "draf pengantar pindah domisili mutasi warga",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_kk",
        "label": "Nomor Kartu Keluarga (KK)",
        "type": "text",
        "placeholder": "16 digit Nomor KK",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan_pindah",
        "label": "Alamat Tujuan Pindah Lengkap",
        "type": "textarea",
        "placeholder": "RT/RW, Kelurahan/Desa, Kecamatan, Kabupaten/Kota, Provinsi",
        "required": true,
        "default": ""
      },
      {
        "name": "jumlah_pengikut",
        "label": "Jumlah Anggota Keluarga yang Ikut Pindah",
        "type": "number",
        "placeholder": "Contoh: 3",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_pindah",
        "label": "Alasan Pindah",
        "type": "text",
        "placeholder": "Contoh: Mengikuti tempat kerja / pindah rumah keluarga",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Yang bertanda tangan di bawah ini menerangkan permohonan pindah penduduk atas nama:\nNama Pemohon : {{nama_lengkap}}\nNIK : {{nik}}\nNomor KK : {{nomor_kk}}\nAlamat Asal : {{alamat_lengkap}}",
      "Bermaksud mengajukan pindah tempat tinggal ke alamat tujuan:\n{{alamat_tujuan_pindah}}\nAlasan Pindah : {{alasan_pindah}}\nJumlah Pengikut : {{jumlah_pengikut}} orang",
      "Demikian draf pengantar pindah ini dibuat untuk diproses lebih lanjut di Kelurahan/Desa dan Dinas Kependudukan setempat."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c09",
    "name": "Surat Keterangan Warga",
    "category": "C",
    "code": "SKW",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan internal pengurus RT/RW yang menyatakan status kependudukan seseorang sebagai warga setempat.",
    "keywords": "keterangan warga penduduk rt rw",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "rt_rw",
        "label": "Wilayah RT / RW",
        "type": "text",
        "placeholder": "Contoh: RT 003 / RW 005 Desa Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan",
        "type": "text",
        "placeholder": "Contoh: Pendaftaran anggota fasilitas lingkungan / administrasi internal",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pengurus {{rt_rw}} dengan ini menerangkan bahwa:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nTempat, Tanggal Lahir : {{ttl}}\nPekerjaan : {{pekerjaan}}\nAlamat : {{alamat_lengkap}}",
      "Adalah benar warga yang tercatat dan bertempat tinggal di wilayah {{rt_rw}}.",
      "Surat keterangan ini diterbitkan untuk keperluan {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c10",
    "name": "Surat Permohonan Penggunaan Fasilitas",
    "category": "C",
    "code": "FSL",
    "docLayout": "surat_resmi",
    "description": "Permohonan peminjaman balai warga, posyandu, tenda, kursi, atau fasilitas lingkungan RT/RW.",
    "keywords": "permohonan penggunaan fasilitas balai warga tenda kursi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Peminjaman Fasilitas Lingkungan",
        "required": true,
        "default": "Permohonan Penggunaan Fasilitas Warga"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_pemohon",
        "label": "Nama Warga / Pemohon",
        "type": "text",
        "placeholder": "Nama pemohon",
        "required": true,
        "default": ""
      },
      {
        "name": "fasilitas_dipinjam",
        "label": "Fasilitas / Inventaris yang Dipinjam",
        "type": "text",
        "placeholder": "Contoh: Balai Warga RW 04 dan 30 buah kursi plastik",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_pakai",
        "label": "Tanggal Penggunaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan_acara",
        "label": "Keperluan Acara",
        "type": "text",
        "placeholder": "Contoh: Acara syukuran keluarga / pengajian rutin",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama : {{nama_pemohon}}",
      "Bermaksud mengajukan permohonan peminjaman fasilitas lingkungan berupa {{fasilitas_dipinjam}} pada tanggal {{tanggal_pakai}} untuk keperluan {{keperluan_acara}}.",
      "Saya bertanggung jawab penuh untuk merawat, membersihkan, dan mengembalikan fasilitas tersebut dalam keadaan baik setelah acara selesai."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c11",
    "name": "Surat Undangan Kerja Bakti",
    "category": "C",
    "code": "KBK",
    "docLayout": "surat_resmi",
    "description": "Undangan gotong royong kebersihan lingkungan, perbaikan saluran air, atau persiapan hari besar di RT/RW.",
    "keywords": "undangan kerja bakti gotong royong kebersihan lingkungan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Kerja Bakti Lingkungan",
        "required": true,
        "default": "Undangan Kerja Bakti & Gotong Royong Warga"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Ditujukan Kepada",
        "type": "text",
        "placeholder": "Seluruh Bapak/Ibu Warga Lingkungan",
        "required": true,
        "default": "Seluruh Warga Lingkungan RT/RW"
      },
      {
        "name": "instansi_penerima",
        "label": "Wilayah",
        "type": "text",
        "placeholder": "Contoh: Lingkungan RT 002 / RW 004",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Tempat",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "perlengkapan_dibawa",
        "label": "Peralatan yang Dianjurkan Dibawa",
        "type": "text",
        "placeholder": "Contoh: Cangkul, sapu lidi, sabit, atau kantong sampah",
        "required": false,
        "default": "Peralatan kebersihan masing-masing (sapu lidi, cangkul, atau sabit)"
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka menjaga kebersihan, kesehatan, dan kenyamanan lingkungan kita bersama, pengurus mengundang seluruh warga untuk berpartisipasi dalam kegiatan {{nama_kegiatan}} yang akan dilaksanakan pada:",
      "Hari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTitik Kumpul : {{tempat_kegiatan}}\nPerlengkapan : {{perlengkapan_dibawa}}",
      "Kehadiran dan partisipasi aktif seluruh warga sangat kami harapkan demi lingkungan yang bersih dan asri."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c12",
    "name": "Surat Pemberitahuan Kegiatan Warga",
    "category": "C",
    "code": "PKW",
    "docLayout": "surat_resmi",
    "description": "Pemberitahuan kepada seluruh warga mengenai agenda ronda, fogging, posyandu, iuran sosial, atau peringatan hari besar.",
    "keywords": "pemberitahuan kegiatan warga fogging posyandu ronda",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pemberitahuan Kegiatan Warga",
        "required": true,
        "default": "Pemberitahuan Pelaksanaan Kegiatan Warga"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Kepada Yth.",
        "type": "text",
        "placeholder": "Seluruh Warga Lingkungan",
        "required": true,
        "default": "Seluruh Warga Lingkungan"
      },
      {
        "name": "instansi_penerima",
        "label": "Wilayah RT/RW",
        "type": "text",
        "placeholder": "Contoh: RT 001 / RW 003",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "keterangan_kegiatan",
        "label": "Keterangan Tambahan untuk Warga",
        "type": "textarea",
        "placeholder": "Contoh: Dimohon warga menutup makanan dan menyiapkan tempat penampungan air saat petugas fogging melintas.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami memberitahukan kepada seluruh warga bahwa akan dilaksanakan kegiatan {{nama_kegiatan}} pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nLokasi : {{tempat_kegiatan}}",
      "{{keterangan_kegiatan}}",
      "Demikian pemberitahuan ini disampaikan agar seluruh warga dapat mempersiapkan diri dan mendukung kelancaran kegiatan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c13",
    "name": "Surat Undangan Pertemuan Warga",
    "category": "C",
    "code": "PTW",
    "docLayout": "surat_resmi",
    "description": "Undangan rapat musyawarah warga tingkat RT/RW untuk membahas keamanan, iuran kas, atau program lingkungan.",
    "keywords": "undangan pertemuan rapat musyawarah warga rt rw",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Pertemuan Warga",
        "required": true,
        "default": "Undangan Musyawarah / Pertemuan Warga"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Kepada Yth.",
        "type": "text",
        "placeholder": "Bapak/Ibu Kepala Keluarga",
        "required": true,
        "default": "Bapak/Ibu Kepala Keluarga / Warga"
      },
      {
        "name": "instansi_penerima",
        "label": "Wilayah",
        "type": "text",
        "placeholder": "Contoh: RT 002 / RW 004",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "agenda_pertemuan",
        "label": "Agenda Musyawarah",
        "type": "textarea",
        "placeholder": "1. Laporan keuangan kas RT/RW\n2. Pembahasan keamanan lingkungan\n3. Usulan dan aspirasi warga",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan hormat, pengurus mengundang Bapak/Ibu warga untuk hadir dalam acara {{nama_kegiatan}} yang akan diselenggarakan pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}",
      "Adapun agenda pembahasan dalam pertemuan tersebut meliputi:\n{{agenda_pertemuan}}",
      "Mengingat pentingnya keputusan bersama bagi lingkungan kita, kehadiran Bapak/Ibu sangat diharapkan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c14",
    "name": "Berita Acara Musyawarah",
    "category": "C",
    "code": "BAM",
    "docLayout": "surat_judul_tengah",
    "description": "Berita acara resmi kesepakatan hasil musyawarah warga lingkungan RT/RW.",
    "keywords": "berita acara musyawarah mufakat warga",
    "fields": [
      {
        "name": "topik_musyawarah",
        "label": "Topik Musyawarah Warga",
        "type": "text",
        "placeholder": "Contoh: PENETAPAN IURAN KEBERSIHAN DAN KEAMANAN LINGKUNGAN",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_musyawarah",
        "label": "Tanggal Musyawarah",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_musyawarah",
        "label": "Tempat Musyawarah",
        "type": "text",
        "placeholder": "Contoh: Balai Warga RW 004",
        "required": true,
        "default": ""
      },
      {
        "name": "jumlah_hadir",
        "label": "Jumlah Warga yang Hadir (Orang)",
        "type": "number",
        "placeholder": "Contoh: 35",
        "required": true,
        "default": ""
      },
      {
        "name": "hasil_musyawarah",
        "label": "Keputusan Hasil Musyawarah",
        "type": "textarea",
        "placeholder": "1. ...\n2. ...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "BERITA ACARA MUSYAWARAH WARGA\nTENTANG: {{topik_musyawarah}}",
      "Pada hari ini tanggal {{tanggal_musyawarah}}, bertempat di {{tempat_musyawarah}}, telah diselenggarakan musyawarah warga yang dihadiri oleh kurang lebih {{jumlah_hadir}} orang perwakilan kepala keluarga.",
      "Setelah melalui diskusi dan mufakat bersama, seluruh peserta menyepakati keputusan sebagai berikut:\n{{hasil_musyawarah}}",
      "Demikian Berita Acara Musyawarah ini dibuat untuk menjadi pedoman bersama seluruh warga."
    ],
    "closing": ""
  },
  {
    "id": "tpl_c15",
    "name": "Surat Permohonan Bantuan Lingkungan",
    "category": "C",
    "code": "BTL",
    "docLayout": "surat_resmi",
    "description": "Permohonan bantuan perbaikan jalan lingkungan, lampu penerangan jalan, tempat sampah, atau fogging ke instansi.",
    "keywords": "permohonan bantuan lingkungan penerangan jalan sampah fogging",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Bantuan Sarana Lingkungan",
        "required": true,
        "default": "Permohonan Bantuan Perbaikan / Sarana Lingkungan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Foto Kondisi Lapangan",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "wilayah_pengaju",
        "label": "Nama Wilayah RT/RW",
        "type": "text",
        "placeholder": "Contoh: RT 002 / RW 004 Desa Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "kebutuhan_lingkungan",
        "label": "Uraian Kebutuhan & Kondisi Lapangan",
        "type": "textarea",
        "placeholder": "Jelaskan permasalahan lingkungan (misal: saluran drainase tersumbat, lampu PJU mati, atau pengadaan tong sampah terpilah).",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka meningkatkan kenyamanan, keselamatan, dan kebersihan warga di wilayah {{wilayah_pengaju}}, bersama surat ini kami mengajukan permohonan bantuan sarana lingkungan kepada Bapak/Ibu.",
      "Adapun kondisi lapangan dan kebutuhan yang sangat mendesak saat ini adalah sebagai berikut:\n{{kebutuhan_lingkungan}}",
      "Besar harapan kami permohonan warga ini dapat ditindaklanjuti dan direalisasikan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d01",
    "name": "Surat Izin Tidak Masuk Sekolah",
    "category": "D",
    "code": "IZN-SKL",
    "docLayout": "surat_pribadi",
    "description": "Surat pemberitahuan dan permohonan izin dari orang tua/wali kepada wali kelas karena siswa berhalangan hadir.",
    "keywords": "izin tidak masuk sekolah sakit siswa wali kelas",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Izin Tidak Masuk Sekolah",
        "required": true,
        "default": "Permohonan Izin Tidak Masuk Sekolah"
      },
      {
        "name": "nama_penerima",
        "label": "Kepada Yth.",
        "type": "text",
        "placeholder": "Bapak/Ibu Wali Kelas ...",
        "required": true,
        "default": "Bapak/Ibu Wali Kelas"
      },
      {
        "name": "instansi_penerima",
        "label": "Nama Sekolah",
        "type": "text",
        "placeholder": "Contoh: SD / SMP / SMA Negeri 1 Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Sekolah",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_siswa",
        "label": "Nama Lengkap Siswa",
        "type": "text",
        "placeholder": "Nama putra/putri Anda",
        "required": true,
        "default": ""
      },
      {
        "name": "kelas_siswa",
        "label": "Kelas",
        "type": "text",
        "placeholder": "Contoh: VII-B / X IPA 1",
        "required": true,
        "default": ""
      },
      {
        "name": "hari_tanggal_izin",
        "label": "Hari / Tanggal Izin",
        "type": "text",
        "placeholder": "Contoh: Rabu, 18 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_tidak_masuk",
        "label": "Alasan Tidak Masuk",
        "type": "select",
        "options": [
          "Sakit",
          "Keperluan Keluarga Penting",
          "Menghadiri Acara Keluarga",
          "Lainnya"
        ],
        "required": true,
        "default": "Sakit"
      },
      {
        "name": "keterangan_tambahan",
        "label": "Keterangan Singkat",
        "type": "text",
        "placeholder": "Contoh: Dikarenakan kondisi kesehatan kurang baik (demam) dan perlu beristirahat.",
        "required": false,
        "default": "Dikarenakan kondisi kesehatan kurang baik sehingga perlu beristirahat di rumah."
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan hormat, saya yang bertanda tangan di bawah ini selaku orang tua/wali dari siswa:\nNama Siswa : {{nama_siswa}}\nKelas : {{kelas_siswa}}",
      "Memberitahukan bahwa pada hari/tanggal {{hari_tanggal_izin}}, putra/putri kami tidak dapat mengikuti kegiatan belajar mengajar di sekolah dikarenakan {{alasan_tidak_masuk}}. {{keterangan_tambahan}}",
      "Demikian surat izin ini kami sampaikan. Atas perhatian dan kebijaksanaan Bapak/Ibu Guru, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d02",
    "name": "Surat Permohonan Beasiswa",
    "category": "D",
    "code": "BSW",
    "docLayout": "surat_pribadi",
    "description": "Surat pengajuan permohonan beasiswa pendidikan bagi siswa atau mahasiswa berprestasi maupun kurang mampu.",
    "keywords": "permohonan beasiswa pendidikan siswa mahasiswa",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Bantuan Beasiswa Pendidikan",
        "required": true,
        "default": "Permohonan Beasiswa Pendidikan"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_pemohon",
        "label": "Nama Lengkap Siswa / Mahasiswa",
        "type": "text",
        "placeholder": "Nama pemohon",
        "required": true,
        "default": ""
      },
      {
        "name": "nis_nim",
        "label": "NIS / NIM",
        "type": "text",
        "placeholder": "Nomor Induk Siswa atau Mahasiswa",
        "required": true,
        "default": ""
      },
      {
        "name": "asal_sekolah_kampus",
        "label": "Asal Sekolah / Perguruan Tinggi",
        "type": "text",
        "placeholder": "Contoh: SMA Negeri 1 Kosambi / Universitas...",
        "required": true,
        "default": ""
      },
      {
        "name": "kelas_semester",
        "label": "Kelas / Semester",
        "type": "text",
        "placeholder": "Contoh: Kelas XI / Semester 3",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_pengajuan",
        "label": "Latar Belakang Pengajuan Beasiswa",
        "type": "textarea",
        "placeholder": "Jelaskan prestasi akademik/non-akademik maupun kondisi ekonomi keluarga secara jujur.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama : {{nama_pemohon}}\nNIS / NIM : {{nis_nim}}\nSekolah / Kampus : {{asal_sekolah_kampus}}\nKelas / Semester : {{kelas_semester}}",
      "Dengan ini mengajukan permohonan untuk dapat diterima sebagai penerima program beasiswa pendidikan yang Bapak/Ibu kelola.",
      "Adapun pertimbangan pengajuan saya adalah sebagai berikut:\n{{alasan_pengajuan}}",
      "Sebagai bahan pertimbangan, bersama ini saya lampirkan berkas persyaratan administrasi yang ditentukan. Besar harapan saya permohonan ini dapat dikabulkan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d03",
    "name": "Surat Permohonan Magang",
    "category": "D",
    "code": "MGG",
    "docLayout": "surat_resmi",
    "description": "Permohonan pelaksanaan program magang mahasiswa atau lulusan baru di perusahaan/instansi.",
    "keywords": "permohonan magang internship mahasiswa",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Pelaksanaan Magang (Internship)",
        "required": true,
        "default": "Permohonan Kesempatan Magang"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Berkas CV & Transkrip",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_peserta",
        "label": "Nama Lengkap Pemohon",
        "type": "text",
        "placeholder": "Nama mahasiswa/peserta",
        "required": true,
        "default": ""
      },
      {
        "name": "nim_jurusan",
        "label": "NIM & Program Studi / Jurusan",
        "type": "text",
        "placeholder": "Contoh: 202301045 — Manajemen / Teknik Informatika",
        "required": true,
        "default": ""
      },
      {
        "name": "asal_kampus",
        "label": "Asal Perguruan Tinggi / Lembaga",
        "type": "text",
        "placeholder": "Contoh: Universitas Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "periode_magang",
        "label": "Rencana Periode Magang",
        "type": "text",
        "placeholder": "Contoh: 01 Desember 2026 s.d. 28 Februari 2027",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka meningkatkan kompetensi praktis dan pengalaman dunia kerja, kami mengajukan permohonan kesempatan melaksanakan program magang di instansi/perusahaan yang Bapak/Ibu pimpin atas nama:\nNama : {{nama_peserta}}\nNIM / Jurusan : {{nim_jurusan}}\nAsal Perguruan Tinggi : {{asal_kampus}}",
      "Adapun rencana pelaksanaan magang tersebut diharapkan berlangsung pada periode {{periode_magang}} atau menyesuaikan dengan kebijakan perusahaan Bapak/Ibu.",
      "Kami siap mematuhi seluruh peraturan dan tata tertib yang berlaku di lingkungan kerja Bapak/Ibu."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d04",
    "name": "Surat Keterangan Aktif",
    "category": "D",
    "code": "SK-AKT",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan resmi dari sekolah atau lembaga pendidikan bahwa siswa/mahasiswa aktif belajar.",
    "keywords": "keterangan aktif siswa mahasiswa sekolah",
    "fields": [
      {
        "name": "nama_siswa",
        "label": "Nama Lengkap Siswa / Mahasiswa",
        "type": "text",
        "placeholder": "Nama lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "nisn_nim",
        "label": "NIS / NISN / NIM",
        "type": "text",
        "placeholder": "Nomor induk",
        "required": true,
        "default": ""
      },
      {
        "name": "ttl_siswa",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 12 Maret 2010",
        "required": true,
        "default": ""
      },
      {
        "name": "kelas_tingkat",
        "label": "Kelas / Tingkat / Program Studi",
        "type": "text",
        "placeholder": "Contoh: Kelas IX-A",
        "required": true,
        "default": ""
      },
      {
        "name": "tahun_ajaran",
        "label": "Tahun Ajaran / Akademik",
        "type": "text",
        "placeholder": "Contoh: 2026/2027",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Persyaratan pendaftaran lomba / tunjangan keluarga",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Kepala Sekolah / Pimpinan Lembaga Pendidikan dengan ini menerangkan bahwa:\nNama : {{nama_siswa}}\nNIS / NISN : {{nisn_nim}}\nTempat, Tanggal Lahir : {{ttl_siswa}}\nKelas / Tingkat : {{kelas_tingkat}}",
      "Adalah benar tercatat sebagai peserta didik aktif pada Tahun Ajaran {{tahun_ajaran}} dan berkelakuan baik.",
      "Demikian surat keterangan aktif ini dibuat untuk dipergunakan sebagai {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d05",
    "name": "Surat Undangan Wali Murid",
    "category": "D",
    "code": "UND-WM",
    "docLayout": "surat_resmi",
    "description": "Undangan resmi sekolah kepada orang tua/wali murid untuk pengambilan rapor, sosialisasi, atau pertemuan.",
    "keywords": "undangan wali murid orang tua rapor pertemuan sekolah",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Pertemuan Orang Tua / Wali Murid",
        "required": true,
        "default": "Undangan Orang Tua / Wali Murid"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Kepada Yth.",
        "type": "text",
        "placeholder": "Bapak/Ibu Orang Tua / Wali Murid",
        "required": true,
        "default": "Bapak/Ibu Orang Tua / Wali Murid"
      },
      {
        "name": "instansi_penerima",
        "label": "Kelas / Angkatan",
        "type": "text",
        "placeholder": "Contoh: Seluruh Kelas VII, VIII, dan IX",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "agenda_pertemuan",
        "label": "Agenda Utama",
        "type": "text",
        "placeholder": "Contoh: Sosialisasi program semester genap dan pembagian laporan hasil belajar",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka menjalin komunikasi serta sinergi antara pihak sekolah dan orang tua dalam mendampingi perkembangan belajar peserta didik, kami mengundang Bapak/Ibu untuk hadir pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nAcara : {{nama_kegiatan}}",
      "Agenda utama pertemuan ini adalah {{agenda_pertemuan}}.",
      "Mengingat pentingnya acara tersebut bagi kemajuan pendidikan putra/putri Bapak/Ibu, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d06",
    "name": "Surat Pemberitahuan Kegiatan",
    "category": "D",
    "code": "PMB-SKL",
    "docLayout": "surat_resmi",
    "description": "Pemberitahuan resmi sekolah kepada orang tua mengenai ujian, studi wisata, pesantren kilat, atau libur sekolah.",
    "keywords": "pemberitahuan kegiatan sekolah ujian libur studi wisata",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pemberitahuan Kegiatan Sekolah",
        "required": true,
        "default": "Pemberitahuan Kegiatan Sekolah"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Kepada Yth.",
        "type": "text",
        "placeholder": "Bapak/Ibu Orang Tua / Wali Murid",
        "required": true,
        "default": "Bapak/Ibu Orang Tua / Wali Murid"
      },
      {
        "name": "instansi_penerima",
        "label": "Satuan Pendidikan",
        "type": "text",
        "placeholder": "Contoh: Seluruh Siswa",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "ketentuan_siswa",
        "label": "Ketentuan / Persiapan Siswa",
        "type": "textarea",
        "placeholder": "Contoh: Siswa wajib mengenakan seragam olahraga dan membawa bekal secukupnya.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami sampaikan pemberitahuan kepada Bapak/Ibu Orang Tua/Wali Murid bahwa sekolah akan melaksanakan kegiatan {{nama_kegiatan}} pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nLokasi : {{tempat_kegiatan}}",
      "Adapun ketentuan bagi peserta didik adalah sebagai berikut:\n{{ketentuan_siswa}}",
      "Demikian pemberitahuan ini disampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d07",
    "name": "Surat Rekomendasi Siswa",
    "category": "D",
    "code": "REK-SWA",
    "docLayout": "surat_judul_tengah",
    "description": "Surat rekomendasi kepala sekolah/guru untuk siswa yang mengikuti olimpiade, beasiswa, atau seleksi sekolah lanjutan.",
    "keywords": "rekomendasi siswa prestasi olimpiade beasiswa",
    "fields": [
      {
        "name": "nama_siswa",
        "label": "Nama Lengkap Siswa",
        "type": "text",
        "placeholder": "Nama lengkap siswa",
        "required": true,
        "default": ""
      },
      {
        "name": "nisn",
        "label": "NIS / NISN",
        "type": "text",
        "placeholder": "Nomor induk siswa",
        "required": true,
        "default": ""
      },
      {
        "name": "kelas",
        "label": "Kelas",
        "type": "text",
        "placeholder": "Contoh: XII IPA 2",
        "required": true,
        "default": ""
      },
      {
        "name": "kegiatan_tujuan",
        "label": "Kegiatan / Program Tujuan",
        "type": "text",
        "placeholder": "Contoh: Olimpiade Sains Nasional / Seleksi Beasiswa",
        "required": true,
        "default": ""
      },
      {
        "name": "catatan_prestasi",
        "label": "Catatan Prestasi & Kepribadian Siswa",
        "type": "textarea",
        "placeholder": "Contoh: Siswa memiliki rata-rata nilai akademik sangat baik, disiplin, dan aktif dalam kegiatan ekstrakurikuler.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Kepala Sekolah dengan ini memberikan rekomendasi kepada peserta didik:\nNama : {{nama_siswa}}\nNIS / NISN : {{nisn}}\nKelas : {{kelas}}",
      "Untuk mengikuti/mendaftar pada {{kegiatan_tujuan}}.",
      "Berdasarkan catatan akademik dan pembinaan kesiswaan, {{catatan_prestasi}}",
      "Demikian surat rekomendasi ini diberikan untuk dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d08",
    "name": "Surat Permohonan Penelitian",
    "category": "D",
    "code": "PNL",
    "docLayout": "surat_resmi",
    "description": "Permohonan izin pengambilan data, observasi, atau wawancara untuk tugas akhir, skripsi, atau karya ilmiah.",
    "keywords": "permohonan penelitian skripsi observasi wawancara data",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Izin Penelitian & Pengambilan Data",
        "required": true,
        "default": "Permohonan Izin Penelitian"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Ringkasan Proposal Penelitian",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_peneliti",
        "label": "Nama Peneliti / Mahasiswa",
        "type": "text",
        "placeholder": "Nama lengkap peneliti",
        "required": true,
        "default": ""
      },
      {
        "name": "nim_institusi",
        "label": "NIM & Asal Institusi",
        "type": "text",
        "placeholder": "Contoh: 202208011 — Fakultas Ilmu Sosial",
        "required": true,
        "default": ""
      },
      {
        "name": "judul_penelitian",
        "label": "Judul Penelitian",
        "type": "text",
        "placeholder": "Contoh: Peran Komunitas Sosial dalam Pemberdayaan Pendidikan Anak Yatim",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_penelitian",
        "label": "Rencana Waktu Penelitian",
        "type": "text",
        "placeholder": "Contoh: Bulan November s.d. Desember 2026",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka penyusunan karya ilmiah/tugas akhir dengan judul \"{{judul_penelitian}}\", kami mengajukan permohonan izin penelitian dan pengambilan data di instansi yang Bapak/Ibu pimpin.",
      "Adapun identitas peneliti adalah:\nNama : {{nama_peneliti}}\nNIM / Institusi : {{nim_institusi}}\nWaktu Penelitian : {{waktu_penelitian}}",
      "Seluruh data yang diperoleh akan dijaga kerahasiaannya dan hanya digunakan untuk kepentingan akademik."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d09",
    "name": "Surat Permohonan Praktik Kerja Lapangan",
    "category": "D",
    "code": "PKL",
    "docLayout": "surat_resmi",
    "description": "Surat pengantar resmi dari sekolah SMK/kampus untuk penempatan siswa Praktik Kerja Lapangan (PKL/Prakerin).",
    "keywords": "permohonan praktik kerja lapangan pkl prakerin smk",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Penempatan Praktik Kerja Lapangan (PKL)",
        "required": true,
        "default": "Permohonan Praktik Kerja Lapangan (PKL)"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Daftar Nama Siswa",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "daftar_siswa_pkl",
        "label": "Nama Siswa & Kompetensi Keahlian",
        "type": "textarea",
        "placeholder": "Contoh: 1. Andi Pratama (Teknik Komputer & Jaringan)\n2. Sari Dewi (Akuntansi)",
        "required": true,
        "default": ""
      },
      {
        "name": "periode_pkl",
        "label": "Periode Pelaksanaan PKL",
        "type": "text",
        "placeholder": "Contoh: 04 Januari 2027 s.d. 31 Maret 2027",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sesuai dengan kurikulum pendidikan kejuruan untuk membekali peserta didik dengan pengalaman kerja nyata, bersama surat ini kami mengajukan permohonan penempatan Praktik Kerja Lapangan (PKL) di perusahaan/instansi Bapak/Ibu.",
      "Adapun peserta didik yang kami ajukan adalah:\n{{daftar_siswa_pkl}}\nPeriode PKL : {{periode_pkl}}",
      "Besar harapan kami Bapak/Ibu berkenan menerima serta membimbing siswa-siswi kami selama periode tersebut."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d10",
    "name": "Surat Undangan Rapat Sekolah",
    "category": "D",
    "code": "RPT-SKL",
    "docLayout": "surat_resmi",
    "description": "Undangan rapat dewan guru, komite sekolah, atau koordinasi panitia ujian/akreditasi.",
    "keywords": "undangan rapat sekolah dewan guru komite",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Rapat Dinas / Dewan Guru",
        "required": true,
        "default": "Undangan Rapat Koordinasi Sekolah"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Kepada Yth.",
        "type": "text",
        "placeholder": "Bapak/Ibu Dewan Guru & Staf",
        "required": true,
        "default": "Bapak/Ibu Dewan Guru dan Staf"
      },
      {
        "name": "instansi_penerima",
        "label": "Unit Pendidikan",
        "type": "text",
        "placeholder": "Contoh: Sekolah / Yayasan Pendidikan",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Di Tempat",
        "required": true,
        "default": "Di Tempat"
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "agenda_rapat",
        "label": "Agenda Rapat",
        "type": "textarea",
        "placeholder": "1. Evaluasi proses pembelajaran\n2. Persiapan penilaian akhir semester\n3. Pembagian tugas kepanitiaan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan hormat, mengharapkan kehadiran Bapak/Ibu Dewan Guru dan Staf dalam rapat dinas sekolah yang akan dilaksanakan pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}",
      "Adapun agenda rapat meliputi:\n{{agenda_rapat}}",
      "Mengingat pentingnya agenda rapat tersebut, dimohon kehadiran Bapak/Ibu tepat pada waktunya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d11",
    "name": "Surat Pernyataan Orang Tua",
    "category": "D",
    "code": "SPO",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan persetujuan atau komitmen orang tua/wali murid untuk kegiatan sekolah maupun tata tertib.",
    "keywords": "pernyataan orang tua wali murid izin kegiatan",
    "fields": [
      {
        "name": "nama_ortu",
        "label": "Nama Lengkap Orang Tua / Wali",
        "type": "text",
        "placeholder": "Nama orang tua/wali",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_ortu",
        "label": "NIK Orang Tua / Wali",
        "type": "text",
        "placeholder": "16 digit NIK",
        "required": false,
        "default": ""
      },
      {
        "name": "no_hp_ortu",
        "label": "Nomor HP / WhatsApp Aktif",
        "type": "text",
        "placeholder": "Contoh: 0812-xxxx-xxxx",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_ortu",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Alamat tempat tinggal",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_anak",
        "label": "Nama Lengkap Siswa",
        "type": "text",
        "placeholder": "Nama putra/putri",
        "required": true,
        "default": ""
      },
      {
        "name": "kelas_anak",
        "label": "Kelas",
        "type": "text",
        "placeholder": "Contoh: VIII-A",
        "required": true,
        "default": ""
      },
      {
        "name": "isi_pernyataan_ortu",
        "label": "Isi Pernyataan / Persetujuan",
        "type": "textarea",
        "placeholder": "Contoh: Memberikan izin penuh kepada putra/putri kami untuk mengikuti kegiatan Perkemahan Sabtu Minggu (Persami) serta bersedia mematuhi seluruh tata tertib sekolah.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama Orang Tua / Wali : {{nama_ortu}}\nNIK : {{nik_ortu}}\nNomor HP / WA : {{no_hp_ortu}}\nAlamat : {{alamat_ortu}}",
      "Selaku orang tua/wali dari peserta didik:\nNama Siswa : {{nama_anak}}\nKelas : {{kelas_anak}}",
      "Dengan ini menyatakan dengan sesungguhnya bahwa:\n{{isi_pernyataan_ortu}}",
      "Demikian surat pernyataan ini saya buat dengan penuh kesadaran untuk dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d12",
    "name": "Surat Pengantar Siswa",
    "category": "D",
    "code": "PNG-SWA",
    "docLayout": "surat_resmi",
    "description": "Surat pengantar resmi sekolah bagi siswa yang dikirim mengikuti lomba, pertukaran pelajar, atau kunjungan.",
    "keywords": "pengantar siswa lomba delegasi perwakilan sekolah",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Surat Pengantar Peserta Lomba / Kegiatan",
        "required": true,
        "default": "Pengantar Delegasi Peserta Didik"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "daftar_siswa",
        "label": "Nama Siswa & Kelas",
        "type": "textarea",
        "placeholder": "Contoh: 1. Nabila Putri (Kelas VIII-A)\n2. Rafi Ahmad (Kelas VIII-C)",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_pembimbing",
        "label": "Nama Guru Pendamping",
        "type": "text",
        "placeholder": "Contoh: Ibu Dra. Siti Nurhaliza",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_event",
        "label": "Nama Kegiatan / Lomba",
        "type": "text",
        "placeholder": "Contoh: Lomba Cerdas Cermat Tingkat Kecamatan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami menghadapkan peserta didik dari sekolah kami untuk mengikuti kegiatan {{nama_event}}, yaitu:\n{{daftar_siswa}}",
      "Selama kegiatan berlangsung, peserta didik tersebut didampingi oleh guru pembimbing: {{nama_pembimbing}}.",
      "Demikian surat pengantar ini kami sampaikan. Atas penerimaan dan kerja sama Bapak/Ibu, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d13",
    "name": "Surat Permohonan Pindah Sekolah",
    "category": "D",
    "code": "PND-SKL",
    "docLayout": "surat_pribadi",
    "description": "Permohonan mutasi/pindah sekolah dari orang tua/wali siswa kepada Kepala Sekolah asal maupun sekolah tujuan.",
    "keywords": "permohonan pindah sekolah mutasi siswa",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Pindah Sekolah (Mutasi Siswa)",
        "required": true,
        "default": "Permohonan Pindah Sekolah"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_ortu",
        "label": "Nama Orang Tua / Wali Pemohon",
        "type": "text",
        "placeholder": "Nama orang tua",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_siswa",
        "label": "Nama Lengkap Siswa",
        "type": "text",
        "placeholder": "Nama siswa",
        "required": true,
        "default": ""
      },
      {
        "name": "nisn_kelas",
        "label": "NISN & Kelas Saat Ini",
        "type": "text",
        "placeholder": "Contoh: 0098765432 — Kelas V",
        "required": true,
        "default": ""
      },
      {
        "name": "sekolah_tujuan",
        "label": "Nama Sekolah Tujuan Pindah",
        "type": "text",
        "placeholder": "Contoh: SD Negeri 02 Jakarta Selatan",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan_pindah",
        "label": "Alasan Kepindahan",
        "type": "text",
        "placeholder": "Contoh: Mengikuti kepindahan tugas kerja orang tua ke luar kota",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini, {{nama_ortu}}, selaku orang tua/wali dari:\nNama Siswa : {{nama_siswa}}\nNISN / Kelas : {{nisn_kelas}}",
      "Dengan ini mengajukan permohonan pindah sekolah ke {{sekolah_tujuan}} dikarenakan {{alasan_pindah}}.",
      "Sehubungan dengan hal tersebut, kami memohon kiranya Bapak/Ibu Kepala Sekolah berkenan menerbitkan Surat Keterangan Pindah Sekolah beserta berkas pendukung yang diperlukan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_d14",
    "name": "Surat Keterangan Mengikuti Kegiatan",
    "category": "D",
    "code": "SK-KGT",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan resmi dari panitia atau sekolah bahwa siswa/peserta telah mengikuti kegiatan tertentu.",
    "keywords": "keterangan mengikuti kegiatan sertifikat kehadiran siswa",
    "fields": [
      {
        "name": "nama_peserta",
        "label": "Nama Lengkap Peserta / Siswa",
        "type": "text",
        "placeholder": "Nama peserta",
        "required": true,
        "default": ""
      },
      {
        "name": "asal_sekolah",
        "label": "Asal Sekolah / Kelas",
        "type": "text",
        "placeholder": "Contoh: SMP Negeri 1 Kosambi / Kelas VIII-B",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan yang Diikuti",
        "type": "text",
        "placeholder": "Contoh: Pelatihan Kepemimpinan & Literasi Digital",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_pelaksanaan",
        "label": "Tanggal & Tempat Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: 14 – 15 November 2026 di Aula Kecamatan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Panitia Pelaksana dengan ini menerangkan bahwa:\nNama : {{nama_peserta}}\nAsal Sekolah / Kelas : {{asal_sekolah}}",
      "Telah mengikuti dengan baik dan aktif seluruh rangkaian kegiatan {{nama_kegiatan}} yang diselenggarakan pada {{waktu_pelaksanaan}}.",
      "Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e01",
    "name": "Surat Permohonan Donasi",
    "category": "E",
    "code": "DNS",
    "docLayout": "surat_resmi",
    "description": "Surat permohonan donasi sukarela untuk program santunan anak yatim, pendidikan, dan kegiatan sosial.",
    "keywords": "permohonan donasi infak sedekah santunan yatim",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Donasi Kegiatan Sosial",
        "required": true,
        "default": "Permohonan Donasi & Dukungan Kemanusiaan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Rincian Program",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_program",
        "label": "Nama Program Sosial",
        "type": "text",
        "placeholder": "Contoh: Santunan Rutin Anak Yatim & Dhuafa",
        "required": true,
        "default": ""
      },
      {
        "name": "target_penerima",
        "label": "Sasaran Penerima Manfaat",
        "type": "text",
        "placeholder": "Contoh: 100 anak yatim dan dhuafa di wilayah Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_penyaluran",
        "label": "Rencana Waktu Penyaluran",
        "type": "text",
        "placeholder": "Contoh: Minggu, 29 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "rekening_donasi",
        "label": "Rekening Resmi Donasi",
        "type": "text",
        "placeholder": "Contoh: Bank BSI 712xxxxxxx a.n. Yayasan / Komunitas...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka menebar kepedulian dan meringankan beban sesama, kami bermaksud menyelenggarakan program {{nama_program}} yang ditujukan bagi {{target_penerima}} pada {{waktu_penyaluran}}.",
      "Melalui surat ini kami mengetuk hati dan memohon partisipasi donasi dari Bapak/Ibu para dermawan. Donasi dapat disalurkan secara langsung maupun melalui rekening resmi: {{rekening_donasi}}.",
      "Semoga setiap kebaikan dan keikhlasan Bapak/Ibu dibalas dengan keberkahan serta kesehatan yang berlipat ganda."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e02",
    "name": "Surat Permohonan Bantuan Sosial",
    "category": "E",
    "code": "BSO",
    "docLayout": "surat_resmi",
    "description": "Permohonan bantuan sosial berupa paket sembako, sandang, atau layanan kesehatan kepada instansi/lembaga sosial.",
    "keywords": "permohonan bantuan sosial sembako kemanusiaan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Bantuan Sosial Masyarakat",
        "required": true,
        "default": "Permohonan Bantuan Sosial"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Daftar Penerima Manfaat",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "kondisi_lapangan",
        "label": "Gambaran Kondisi Masyarakat",
        "type": "textarea",
        "placeholder": "Jelaskan kondisi warga penerima manfaat yang membutuhkan bantuan sosial.",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_bantuan",
        "label": "Jenis Bantuan yang Diharapkan",
        "type": "text",
        "placeholder": "Contoh: 150 Paket Sembako dan Perlengkapan Sekolah",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Berdasarkan hasil pendataan lapangan yang dilakukan oleh tim relawan kami, terdapat sejumlah warga dan keluarga prasejahtera yang sangat membutuhkan uluran tangan dengan kondisi sebagai berikut:\n{{kondisi_lapangan}}",
      "Sehubungan dengan hal tersebut, kami mengajukan permohonan dukungan bantuan sosial berupa {{jenis_bantuan}} melalui lembaga/instansi yang Bapak/Ibu pimpin.",
      "Kami siap bersinergi dalam proses penyaluran agar bantuan tepat sasaran dan terdokumentasi dengan baik."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e03",
    "name": "Surat Pengajuan Proposal",
    "category": "E",
    "code": "PRP-SOS",
    "docLayout": "surat_resmi",
    "description": "Pengajuan proposal program sosial yayasan atau komunitas kepada lembaga filantropi maupun donatur institusi.",
    "keywords": "pengajuan proposal sosial yayasan program",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pengajuan Proposal Program Sosial",
        "required": true,
        "default": "Pengajuan Proposal Program Sosial"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Bundel Proposal Lengkap",
        "required": false,
        "default": "1 (Satu) Bundel"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "judul_program",
        "label": "Judul Program dalam Proposal",
        "type": "text",
        "placeholder": "Contoh: Program Beasiswa Yatim & Pelatihan Keterampilan",
        "required": true,
        "default": ""
      },
      {
        "name": "estimasi_dana",
        "label": "Estimasi Anggaran Program (Rp)",
        "type": "text",
        "placeholder": "Contoh: Rp 25.000.000,-",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami mengajukan proposal program sosial bertajuk \"{{judul_program}}\" dengan estimasi kebutuhan anggaran sebesar {{estimasi_dana}}.",
      "Program ini dirancang untuk memberikan manfaat jangka panjang bagi penerima manfaat melalui pendampingan terukur dan transparan.",
      "Besar harapan kami Bapak/Ibu berkenan meninjau proposal terlampir serta menjalin kemitraan dalam merealisasikan program ini."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e04",
    "name": "Surat Undangan Santunan",
    "category": "E",
    "code": "UND-STN",
    "docLayout": "surat_resmi",
    "description": "Undangan kegiatan santunan anak yatim, buka puasa bersama, atau doa bersama bagi donatur, tokoh, dan penerima manfaat.",
    "keywords": "undangan santunan anak yatim doa bersama",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Acara Santunan Anak Yatim",
        "required": true,
        "default": "Undangan Kegiatan Santunan & Doa Bersama"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "jumlah_yatim",
        "label": "Jumlah Anak Yatim yang Disantuni",
        "type": "text",
        "placeholder": "Contoh: 60 anak yatim",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa, kami mengundang Bapak/Ibu untuk hadir dalam acara {{nama_kegiatan}} bersama {{jumlah_yatim}} yang insya Allah akan dilaksanakan pada:",
      "Hari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}",
      "Kehadiran Bapak/Ibu akan menjadi kebahagiaan dan semangat tersendiri bagi adik-adik yatim serta para relawan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e05",
    "name": "Surat Permohonan Kerja Sama CSR",
    "category": "E",
    "code": "CSR",
    "docLayout": "surat_resmi",
    "description": "Pengajuan kemitraan program Corporate Social Responsibility (CSR) perusahaan untuk kegiatan pemberdayaan sosial.",
    "keywords": "permohonan kerja sama csr perusahaan tanggung jawab sosial",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Kerja Sama Program CSR",
        "required": true,
        "default": "Permohonan Kemitraan Program CSR"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Proposal Kemitraan CSR",
        "required": false,
        "default": "1 (Satu) Proposal"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "fokus_program",
        "label": "Fokus Program CSR yang Diusulkan",
        "type": "text",
        "placeholder": "Contoh: Pendidikan Anak Yatim, Kesehatan Masyarakat, dan Pemberdayaan Ekonomi Ibu Rumah Tangga",
        "required": true,
        "default": ""
      },
      {
        "name": "dampak_program",
        "label": "Target Dampak & Pelaporan",
        "type": "textarea",
        "placeholder": "Contoh: Menjangkau 200 penerima manfaat di wilayah sekitar perusahaan disertai laporan dokumentasi dan audit penyaluran lengkap.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sebagai wujud sinergi antara dunia usaha dan lembaga sosial masyarakat, kami mengajukan proposal kemitraan program Corporate Social Responsibility (CSR) di bidang {{fokus_program}}.",
      "Adapun cakupan manfaat dan komitmen akuntabilitas program kami meliputi:\n{{dampak_program}}",
      "Kami berharap dapat mempresentasikan konsep program CSR ini secara langsung kepada tim manajemen Bapak/Ibu."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e06",
    "name": "Surat Tanda Terima Bantuan",
    "category": "E",
    "code": "TTB",
    "docLayout": "surat_judul_tengah",
    "description": "Bukti resmi penerimaan donasi uang, paket sembako, atau barang bantuan dari donatur/mitra.",
    "keywords": "tanda terima bantuan donasi kwitansi barang",
    "fields": [
      {
        "name": "nama_donatur",
        "label": "Nama Donatur / Instansi Pemberi",
        "type": "text",
        "placeholder": "Contoh: Bapak H. Sulaiman / PT Sejahtera",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_donatur",
        "label": "Alamat / Kontak Donatur",
        "type": "textarea",
        "placeholder": "Contoh: Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "rincian_bantuan",
        "label": "Rincian Bantuan yang Diterima",
        "type": "textarea",
        "placeholder": "Contoh: 1. Uang tunai sebesar Rp 2.500.000,-\n2. Paket sembako sebanyak 20 dus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_terima",
        "label": "Tanggal Penerimaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "peruntukan",
        "label": "Peruntukan Bantuan",
        "type": "text",
        "placeholder": "Contoh: Program Santunan Anak Yatim & Dhuafa",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Telah terima dengan baik dari:\nNama Donatur / Instansi : {{nama_donatur}}\nAlamat / Kontak : {{alamat_donatur}}",
      "Berupa bantuan dengan rincian sebagai berikut:\n{{rincian_bantuan}}\nTanggal Penerimaan : {{tanggal_terima}}\nPeruntukan : {{peruntukan}}",
      "Bantuan ini telah dicatat dalam pembukuan resmi dan akan disalurkan sesuai amanah donatur. Terima kasih atas kepedulian Bapak/Ibu."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e07",
    "name": "Surat Ucapan Terima Kasih Donatur",
    "category": "E",
    "code": "UTD",
    "docLayout": "surat_resmi",
    "description": "Surat apresiasi dan doa khusus kepada donatur yang telah berpartisipasi dalam program sosial.",
    "keywords": "ucapan terima kasih donatur dermawan apresiasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Ucapan Terima Kasih kepada Donatur",
        "required": true,
        "default": "Ucapan Terima Kasih & Apresiasi Donatur"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_program",
        "label": "Nama Program yang Didukung",
        "type": "text",
        "placeholder": "Contoh: Santunan Anak Yatim Bulan November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "ringkasan_donasi",
        "label": "Bentuk Donasi yang Diberikan",
        "type": "text",
        "placeholder": "Contoh: Donasi dana dan paket bingkisan anak",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Segala puji bagi Tuhan Yang Maha Esa. Kami menghaturkan terima kasih yang tulus dan penghargaan setinggi-tingginya kepada Bapak/Ibu atas partisipasi dalam program {{nama_program}} melalui {{ringkasan_donasi}}.",
      "Amanah donasi tersebut telah kami salurkan kepada para penerima manfaat dengan penuh tanggung jawab.",
      "Semoga Tuhan Yang Maha Kuasa membalas segala kebaikan Bapak/Ibu beserta keluarga dengan kesehatan, kelapangan rezeki, dan keberkahan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e08",
    "name": "Surat Keterangan Penerima Manfaat",
    "category": "E",
    "code": "SKPM",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan bahwa seseorang/anak tercatat sebagai penerima manfaat binaan yayasan atau komunitas sosial.",
    "keywords": "keterangan penerima manfaat yatim binaan sosial",
    "fields": [
      {
        "name": "nama_penerima_manfaat",
        "label": "Nama Lengkap Penerima Manfaat",
        "type": "text",
        "placeholder": "Nama anak/warga binaan",
        "required": true,
        "default": ""
      },
      {
        "name": "ttl_penerima",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 05 Juni 2015",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_penerima",
        "label": "Alamat Tempat Tinggal",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "kategori_binaan",
        "label": "Kategori Penerima Manfaat",
        "type": "text",
        "placeholder": "Contoh: Anak Yatim / Dhuafa Binaan",
        "required": true,
        "default": ""
      },
      {
        "name": "sejak_tahun",
        "label": "Terdaftar Sejak Tahun",
        "type": "text",
        "placeholder": "Contoh: 2023",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Administrasi pengajuan bantuan pendidikan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pengurus lembaga/komunitas sosial dengan ini menerangkan bahwa:\nNama : {{nama_penerima_manfaat}}\nTempat, Tanggal Lahir : {{ttl_penerima}}\nAlamat : {{alamat_penerima}}",
      "Adalah benar terdaftar sebagai {{kategori_binaan}} di lembaga kami sejak tahun {{sejak_tahun}} dan aktif mengikuti kegiatan pembinaan sosial.",
      "Demikian surat keterangan ini dibuat dengan sebenarnya untuk dipergunakan sebagai {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e09",
    "name": "Surat Laporan Penyaluran Bantuan",
    "category": "E",
    "code": "LPB",
    "docLayout": "surat_resmi",
    "description": "Surat pengantar laporan pertanggungjawaban penyaluran donasi/bantuan kepada donatur atau mitra.",
    "keywords": "laporan penyaluran bantuan pertanggungjawaban transparansi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Laporan Penyaluran Bantuan Sosial",
        "required": true,
        "default": "Laporan Penyaluran Bantuan & Pertanggungjawaban"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Berkas Dokumentasi & Rekapitulasi",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Program Penyaluran",
        "type": "text",
        "placeholder": "Contoh: Penyaluran Santunan Yatim & Paket Sembako",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_penyaluran",
        "label": "Tanggal Penyaluran",
        "type": "text",
        "placeholder": "Contoh: 15 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "lokasi_penyaluran",
        "label": "Lokasi Penyaluran",
        "type": "text",
        "placeholder": "Contoh: Wilayah Kosambi Barat dan Kosambi Timur",
        "required": true,
        "default": ""
      },
      {
        "name": "ringkasan_realisasi",
        "label": "Ringkasan Realisasi Bantuan",
        "type": "textarea",
        "placeholder": "Contoh: Total dana masuk Rp 12.500.000,- telah disalurkan seluruhnya kepada 85 penerima manfaat.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sebagai wujud transparansi dan akuntabilitas pengelolaan amanah donatur, bersama surat ini kami sampaikan laporan hasil pelaksanaan {{nama_kegiatan}} yang telah dilaksanakan pada tanggal {{tanggal_penyaluran}} di {{lokasi_penyaluran}}.",
      "Adapun ringkasan realisasi penyaluran bantuan adalah sebagai berikut:\n{{ringkasan_realisasi}}",
      "Rincian rekapitulasi anggaran serta dokumentasi kegiatan kami sertakan pada lampiran surat ini."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e10",
    "name": "Surat Permohonan Dukungan Kegiatan",
    "category": "E",
    "code": "PDK",
    "docLayout": "surat_resmi",
    "description": "Permohonan dukungan moril, perizinan, publikasi, atau kehadiran tokoh dalam kegiatan sosial.",
    "keywords": "permohonan dukungan kegiatan sosial tokoh masyarakat",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Dukungan Kegiatan Sosial",
        "required": true,
        "default": "Permohonan Dukungan Pelaksanaan Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Susunan Acara",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "bentuk_dukungan",
        "label": "Bentuk Dukungan yang Diharapkan",
        "type": "text",
        "placeholder": "Contoh: Dukungan moril, rekomendasi kegiatan, serta kesediaan memberikan sambutan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka menyukseskan kegiatan sosial {{nama_kegiatan}} yang akan dilaksanakan pada tanggal {{tanggal_kegiatan}} pukul {{waktu_kegiatan}} bertempat di {{tempat_kegiatan}}, kami memohon dukungan dari Bapak/Ibu.",
      "Adapun bentuk dukungan yang kami harapkan adalah {{bentuk_dukungan}}.",
      "Dukungan Bapak/Ibu akan sangat berarti bagi kelancaran gerakan kepedulian sosial di tengah masyarakat."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e11",
    "name": "Surat Undangan Kegiatan Sosial",
    "category": "E",
    "code": "UKS",
    "docLayout": "surat_resmi",
    "description": "Undangan umum bagi relawan, masyarakat, atau mitra untuk berpartisipasi dalam bakti sosial atau donor darah.",
    "keywords": "undangan kegiatan sosial bakti sosial donor darah",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Undangan Partisipasi Kegiatan Sosial",
        "required": true,
        "default": "Undangan Kegiatan Sosial Masyarakat"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "rangkaian_acara",
        "label": "Rangkaian Kegiatan",
        "type": "textarea",
        "placeholder": "Contoh: Pemeriksaan kesehatan gratis, pembagian paket gizi anak, dan santunan.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan penuh semangat kebersamaan, kami mengundang Bapak/Ibu untuk hadir dan berpartisipasi dalam kegiatan {{nama_kegiatan}} yang akan diselenggarakan pada:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}",
      "Rangkaian kegiatan meliputi:\n{{rangkaian_acara}}",
      "Atas perhatian dan kehadiran Bapak/Ibu, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e12",
    "name": "Surat Permohonan Bantuan Perlengkapan",
    "category": "E",
    "code": "PBP",
    "docLayout": "surat_resmi",
    "description": "Permohonan bantuan barang/logistik seperti alat tulis sekolah, seragam, tenda, atau alat kesehatan.",
    "keywords": "permohonan bantuan perlengkapan logistik alat tulis",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Bantuan Perlengkapan Kegiatan",
        "required": true,
        "default": "Permohonan Bantuan Perlengkapan / Logistik"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_program",
        "label": "Nama Program / Kegiatan",
        "type": "text",
        "placeholder": "Contoh: Program Kembali ke Sekolah Anak Yatim",
        "required": true,
        "default": ""
      },
      {
        "name": "daftar_perlengkapan",
        "label": "Daftar Perlengkapan yang Dibutuhkan",
        "type": "textarea",
        "placeholder": "Contoh: 1. Tas sekolah (50 buah)\n2. Buku tulis dan alat tulis (50 paket)",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka mendukung pelaksanaan program {{nama_program}}, kami membutuhkan dukungan sarana dan perlengkapan untuk dibagikan/digunakan dalam kegiatan tersebut.",
      "Adapun rincian perlengkapan yang kami butuhkan adalah sebagai berikut:\n{{daftar_perlengkapan}}",
      "Besar harapan kami Bapak/Ibu berkenan membantu penyediaan sebagian atau seluruh perlengkapan tersebut."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e13",
    "name": "Surat Permohonan Sponsorship",
    "category": "E",
    "code": "SPS-SOS",
    "docLayout": "surat_resmi",
    "description": "Pengajuan sponsorship acara amal, konser kemanusiaan, atau festival sosial kepada perusahaan.",
    "keywords": "permohonan sponsorship acara sosial amal festival",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Sponsorship Kegiatan Sosial",
        "required": true,
        "default": "Permohonan Sponsorship Acara Sosial"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Proposal Sponsorship",
        "required": false,
        "default": "1 (Satu) Proposal"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "benefit_sponsor",
        "label": "Manfaat Publikasi bagi Mitra Sponsor",
        "type": "textarea",
        "placeholder": "Contoh: Logo perusahaan pada seluruh materi publikasi acara, stand promosi di lokasi acara, dan liputan dokumentasi.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Kami mengundang perusahaan yang Bapak/Ibu pimpin untuk menjadi mitra sponsor dalam kegiatan amal {{nama_kegiatan}} yang akan digelar pada {{tanggal_kegiatan}} di {{tempat_kegiatan}}.",
      "Sebagai wujud kemitraan saling menguntungkan, panitia memberikan fasilitas publikasi berupa:\n{{benefit_sponsor}}",
      "Seluruh hasil penggalangan dana dari kegiatan ini akan disalurkan sepenuhnya untuk program sosial masyarakat."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e14",
    "name": "Surat Pernyataan Penerima Bantuan",
    "category": "E",
    "code": "SPPB",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan warga/penerima manfaat bahwa bantuan telah diterima utuh tanpa potongan apa pun.",
    "keywords": "pernyataan penerima bantuan bukti terima warga",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "bantuan_diterima",
        "label": "Jenis & Jumlah Bantuan yang Diterima",
        "type": "textarea",
        "placeholder": "Contoh: 1 (satu) paket sembako dan uang santunan sebesar Rp 300.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_terima",
        "label": "Tanggal Penerimaan Bantuan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama Lengkap : {{nama_lengkap}}\nNIK : {{nik}}\nAlamat : {{alamat_lengkap}}",
      "Menyatakan dengan sebenar-benarnya bahwa pada tanggal {{tanggal_terima}}, saya telah menerima bantuan sosial berupa:\n{{bantuan_diterima}}",
      "Bantuan tersebut saya terima dalam keadaan baik, utuh, dan tanpa dikenakan potongan maupun pungutan biaya apa pun."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e15",
    "name": "Surat Keterangan Relawan",
    "category": "E",
    "code": "SK-RLW",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan pengabdian bagi relawan yang aktif membantu kegiatan sosial dan kemanusiaan.",
    "keywords": "keterangan relawan volunteer pengabdian sosial",
    "fields": [
      {
        "name": "nama_relawan",
        "label": "Nama Lengkap Relawan",
        "type": "text",
        "placeholder": "Nama lengkap relawan",
        "required": true,
        "default": ""
      },
      {
        "name": "ttl_relawan",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 21 September 2001",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_relawan",
        "label": "Alamat",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "divisi_relawan",
        "label": "Divisi / Peran Relawan",
        "type": "text",
        "placeholder": "Contoh: Relawan Pendamping Pendidikan Anak",
        "required": true,
        "default": ""
      },
      {
        "name": "periode_bakti",
        "label": "Periode Pengabdian",
        "type": "text",
        "placeholder": "Contoh: Januari 2025 s.d. November 2026",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pengurus lembaga/komunitas sosial dengan ini menerangkan bahwa:\nNama : {{nama_relawan}}\nTempat, Tanggal Lahir : {{ttl_relawan}}\nAlamat : {{alamat_relawan}}",
      "Adalah benar telah mengabdikan diri sebagai {{divisi_relawan}} pada periode {{periode_bakti}} dengan penuh keikhlasan, disiplin, dan kepedulian tinggi.",
      "Demikian surat keterangan relawan ini diberikan sebagai bentuk penghargaan dan dapat dipergunakan sebagaimana mestinya."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e16",
    "name": "Surat Tugas Relawan",
    "category": "E",
    "code": "ST-RLW",
    "docLayout": "surat_judul_tengah",
    "description": "Surat tugas resmi bagi tim relawan yang melaksanakan survei lapangan, distribusi bantuan, atau tanggap bencana.",
    "keywords": "surat tugas relawan survei distribusi lapangan",
    "fields": [
      {
        "name": "nama_relawan",
        "label": "Nama Relawan / Koordinator Tim",
        "type": "text",
        "placeholder": "Nama lengkap relawan",
        "required": true,
        "default": ""
      },
      {
        "name": "no_hp_relawan",
        "label": "Nomor Kontak Relawan",
        "type": "text",
        "placeholder": "Contoh: 0812-xxxx-xxxx",
        "required": true,
        "default": ""
      },
      {
        "name": "tugas_relawan",
        "label": "Tugas Lapangan yang Dilaksanakan",
        "type": "textarea",
        "placeholder": "Contoh: Melakukan verifikasi data calon penerima santunan dan pendistribusian paket bantuan.",
        "required": true,
        "default": ""
      },
      {
        "name": "wilayah_tugas",
        "label": "Wilayah / Lokasi Tugas",
        "type": "text",
        "placeholder": "Contoh: Kecamatan Kosambi, Kabupaten Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "masa_tugas",
        "label": "Tanggal / Masa Berlaku Tugas",
        "type": "text",
        "placeholder": "Contoh: 20 s.d. 24 November 2026",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pengurus dengan ini menugaskan kepada:\nNama Relawan : {{nama_relawan}}\nNomor Kontak : {{no_hp_relawan}}",
      "Untuk melaksanakan tugas sosial berupa:\n{{tugas_relawan}}\nLokasi Tugas : {{wilayah_tugas}}\nWaktu Tugas : {{masa_tugas}}",
      "Mohon kepada pihak-pihak terkait di lapangan dapat memberikan kemudahan koordinasi demi kelancaran misi kemanusiaan ini."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e17",
    "name": "Surat Pengantar Proposal Kegiatan",
    "category": "E",
    "code": "PPK-SOS",
    "docLayout": "surat_resmi",
    "description": "Surat pengantar resmi pengiriman proposal kegiatan sosial atau santunan kepada calon donatur/mitra.",
    "keywords": "pengantar proposal kegiatan santunan sosial",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pengantar Proposal Kegiatan Sosial",
        "required": true,
        "default": "Pengantar Proposal Kegiatan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Bundel Proposal",
        "required": false,
        "default": "1 (Satu) Bundel Proposal"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan",
        "type": "text",
        "placeholder": "Contoh: Gebyar Muharram & Santunan Yatim",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Rencana Tanggal Kegiatan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan memohon ridho Tuhan Yang Maha Esa, bersama surat ini kami menyampaikan proposal kegiatan {{nama_kegiatan}} yang insya Allah akan dilaksanakan pada tanggal {{tanggal_kegiatan}}.",
      "Proposal terlampir berisi uraian konsep acara, susunan panitia, serta rencana anggaran biaya kegiatan.",
      "Atas perhatian dan kesediaan Bapak/Ibu mendukung kegiatan ini, kami ucapkan terima kasih."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e18",
    "name": "Surat Permohonan Kolaborasi",
    "category": "E",
    "code": "KLB",
    "docLayout": "surat_resmi",
    "description": "Ajakan kolaborasi antar komunitas, karang taruna, atau yayasan untuk menyelenggarakan aksi sosial bersama.",
    "keywords": "permohonan kolaborasi sinergi komunitas aksi sosial",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Kolaborasi Aksi Sosial",
        "required": true,
        "default": "Permohonan Kolaborasi Kegiatan Sosial"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "tema_kolaborasi",
        "label": "Tema / Nama Aksi Kolaborasi",
        "type": "text",
        "placeholder": "Contoh: Gerakan Pemuda Peduli Lingkungan & Santunan",
        "required": true,
        "default": ""
      },
      {
        "name": "konsep_kolaborasi",
        "label": "Konsep Pembagian Peran Kolaborasi",
        "type": "textarea",
        "placeholder": "Jelaskan ide kegiatan bersama dan peran yang dapat dikolaborasikan.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Kami memandang bahwa gerakan kebaikan akan jauh lebih berdampak apabila dijalankan secara bersama-sama. Oleh karena itu, kami mengajak komunitas/lembaga Bapak/Ibu untuk berkolaborasi dalam kegiatan {{tema_kolaborasi}}.",
      "Adapun gambaran konsep kolaborasi yang kami tawarkan adalah:\n{{konsep_kolaborasi}}",
      "Besar harapan kami ajakan kolaborasi ini dapat disambut baik melalui diskusi lanjutan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e19",
    "name": "Surat Permohonan Narasumber",
    "category": "E",
    "code": "NRS-SOS",
    "docLayout": "surat_resmi",
    "description": "Permohonan pembicara motivasi, pendongeng anak, atau narasumber edukasi pada acara sosial/santunan.",
    "keywords": "permohonan narasumber motivator pendongeng edukasi sosial",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Narasumber / Pengisi Acara Sosial",
        "required": true,
        "default": "Permohonan Kesediaan Menjadi Narasumber / Pengisi Acara"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kegiatan",
        "label": "Nama Kegiatan / Acara",
        "type": "text",
        "placeholder": "Contoh: Rapat Koordinasi Pengurus",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kegiatan",
        "label": "Tanggal Pelaksanaan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "waktu_kegiatan",
        "label": "Waktu Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: Pukul 09.00 WIB s.d. Selesai",
        "required": true,
        "default": ""
      },
      {
        "name": "tempat_kegiatan",
        "label": "Tempat / Lokasi",
        "type": "text",
        "placeholder": "Contoh: Aula Sekretariat Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "tema_sesi",
        "label": "Tema Sesi / Materi",
        "type": "text",
        "placeholder": "Contoh: Membangun Semangat Belajar dan Cita-Cita Anak",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka memberikan motivasi dan edukasi yang menyenangkan bagi peserta pada kegiatan {{nama_kegiatan}}, kami memohon kesediaan Bapak/Ibu untuk hadir sebagai narasumber/pengisi acara.",
      "Jadwal pelaksanaan kegiatan adalah:\nHari / Tanggal : {{tanggal_kegiatan}}\nWaktu : {{waktu_kegiatan}}\nTempat : {{tempat_kegiatan}}\nTema Sesi : {{tema_sesi}}",
      "Kehadiran dan inspirasi dari Bapak/Ibu akan menjadi bekal berharga bagi para peserta."
    ],
    "closing": ""
  },
  {
    "id": "tpl_e20",
    "name": "Surat Terima Kasih Mitra",
    "category": "E",
    "code": "TKM",
    "docLayout": "surat_resmi",
    "description": "Surat penghargaan resmi kepada lembaga mitra yang telah sukses berkolaborasi dalam kegiatan sosial.",
    "keywords": "terima kasih mitra kolaborasi penghargaan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Ucapan Terima Kasih Mitra Kolaborasi",
        "required": true,
        "default": "Ucapan Terima Kasih & Penghargaan Mitra"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_program_bersama",
        "label": "Nama Program Kolaborasi",
        "type": "text",
        "placeholder": "Contoh: Bakti Sosial Kesehatan & Santunan Yatim 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_program",
        "label": "Tanggal Pelaksanaan",
        "type": "text",
        "placeholder": "Contoh: 15 November 2026",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Atas nama seluruh pengurus dan penerima manfaat, kami menyampaikan terima kasih yang sebesar-besarnya kepada lembaga mitra yang Bapak/Ibu pimpin atas kolaborasi luar biasa dalam menyukseskan kegiatan {{nama_program_bersama}} pada tanggal {{tanggal_program}}.",
      "Sinergi yang terjalin telah membuktikan bahwa kebersamaan mampu menghadirkan manfaat nyata bagi masyarakat luas.",
      "Semoga kemitraan strategis ini terus berlanjut pada program-program kemanusiaan di masa mendatang."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f01",
    "name": "Surat Penawaran Produk",
    "category": "F",
    "code": "PNW-PRD",
    "docLayout": "surat_resmi",
    "description": "Surat penawaran produk UMKM/usaha (makanan, minuman herbal, kerajinan, konveksi, dll.) kepada calon pembeli.",
    "keywords": "penawaran produk umkm harga katalog barang",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Penawaran Produk Usaha",
        "required": true,
        "default": "Penawaran Produk"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Daftar Harga / Katalog",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_produk",
        "label": "Nama / Jenis Produk",
        "type": "text",
        "placeholder": "Contoh: Minuman Herbal Tradisional (Beras Kencur & Kunyit Asam) Kemasan Botol",
        "required": true,
        "default": ""
      },
      {
        "name": "spesifikasi_harga",
        "label": "Spesifikasi, Keunggulan & Daftar Harga",
        "type": "textarea",
        "placeholder": "Contoh: - Kemasan botol higienis 250 ml (gula terpisah)\n- Harga satuan Rp 10.000,- / paket acara Rp 9.000,- (min. 30 botol)",
        "required": true,
        "default": ""
      },
      {
        "name": "kontak_pemesanan",
        "label": "Kontak Pemesanan",
        "type": "text",
        "placeholder": "Contoh: WhatsApp 0812-xxxx-xxxx",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan hormat, kami bermaksud memperkenalkan produk unggulan usaha kami, yaitu {{nama_produk}}, yang diproduksi secara higienis menggunakan bahan baku pilihan berkualitas.",
      "Berikut adalah rincian spesifikasi dan harga penawaran kami:\n{{spesifikasi_harga}}",
      "Untuk pemesanan maupun permintaan sampel produk, Bapak/Ibu dapat menghubungi kami melalui {{kontak_pemesanan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f02",
    "name": "Surat Penawaran Kerja Sama",
    "category": "F",
    "code": "KJS-BIZ",
    "docLayout": "surat_resmi",
    "description": "Penawaran kemitraan reseller, agen distribusi, titip jual (konsinyasi), atau suplai rutin UMKM.",
    "keywords": "penawaran kerja sama bisnis reseller konsinyasi suplai",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Penawaran Kerja Sama Usaha / Kemitraan",
        "required": true,
        "default": "Penawaran Kerja Sama Usaha"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Skema Kemitraan",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "skema_kerjasama",
        "label": "Skema Kerja Sama",
        "type": "text",
        "placeholder": "Contoh: Kemitraan Reseller / Suplai Rutin / Konsinyasi",
        "required": true,
        "default": ""
      },
      {
        "name": "keuntungan_mitra",
        "label": "Keuntungan & Ketentuan bagi Mitra",
        "type": "textarea",
        "placeholder": "Contoh: Margin keuntungan 25%, dukungan materi promosi, dan garansi penggantian produk rusak saat pengiriman.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka memperluas jangkauan pemasaran dan saling mendukung pertumbuhan usaha, kami bermaksud menawarkan kerja sama usaha dengan skema {{skema_kerjasama}}.",
      "Adapun keuntungan dan fasilitas yang kami berikan kepada mitra meliputi:\n{{keuntungan_mitra}}",
      "Kami sangat senang apabila dapat berdiskusi lebih lanjut untuk menjajaki potensi kerja sama ini."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f03",
    "name": "Surat Pesanan Barang",
    "category": "F",
    "code": "PO",
    "docLayout": "surat_resmi",
    "description": "Surat resmi pemesanan barang (Purchase Order) kepada supplier atau distributor dengan rincian jumlah dan jadwal kirim.",
    "keywords": "pesanan barang purchase order po pembelian",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pesanan Barang (Purchase Order)",
        "required": true,
        "default": "Pesanan Barang"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "daftar_pesanan",
        "label": "Rincian Barang yang Dipesan",
        "type": "textarea",
        "placeholder": "Contoh: 1. Kemasan Botol 250ml = 500 pcs\n2. Stiker Label = 500 lembar",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_kirim_diharapkan",
        "label": "Tanggal Pengiriman yang Diharapkan",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_pengiriman",
        "label": "Alamat Tujuan Pengiriman Barang",
        "type": "textarea",
        "placeholder": "Alamat lengkap gudang/tempat usaha",
        "required": true,
        "default": ""
      },
      {
        "name": "metode_pembayaran",
        "label": "Metode Pembayaran",
        "type": "text",
        "placeholder": "Contoh: Transfer bank setelah barang diterima dengan baik",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Berdasarkan penawaran harga yang telah disepakati, bersama surat ini kami memesan barang-barang dengan rincian sebagai berikut:\n{{daftar_pesanan}}",
      "Barang pesanan tersebut diharapkan dapat dikirimkan paling lambat pada tanggal {{tanggal_kirim_diharapkan}} ke alamat:\n{{alamat_pengiriman}}",
      "Adapun pembayaran akan kami lakukan melalui {{metode_pembayaran}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f04",
    "name": "Surat Konfirmasi Pembayaran",
    "category": "F",
    "code": "KNF-BYR",
    "docLayout": "surat_resmi",
    "description": "Surat pemberitahuan bahwa pembayaran invoice atau pesanan telah ditransfer beserta rincian transaksinya.",
    "keywords": "konfirmasi pembayaran transfer bukti bayar",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Konfirmasi Pembayaran",
        "required": true,
        "default": "Konfirmasi Pembayaran Pesanan / Tagihan"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Bukti Transfer",
        "required": false,
        "default": "1 (Satu) Bukti Transfer"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_invoice",
        "label": "Nomor Invoice / Pesanan",
        "type": "text",
        "placeholder": "Contoh: INV/2026/XI/014",
        "required": true,
        "default": ""
      },
      {
        "name": "nominal_dibayar",
        "label": "Jumlah Pembayaran (Rp)",
        "type": "text",
        "placeholder": "Contoh: Rp 1.750.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_bayar",
        "label": "Tanggal Pembayaran",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "bank_pengirim_tujuan",
        "label": "Rekening Tujuan Transfer",
        "type": "text",
        "placeholder": "Contoh: Bank BCA / BRI a.n. ...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami mengonfirmasi bahwa telah dilakukan pembayaran atas tagihan/pesanan Nomor {{nomor_invoice}} dengan rincian sebagai berikut:\nJumlah Dibayar : {{nominal_dibayar}}\nTanggal Transfer : {{tanggal_bayar}}\nRekening Tujuan : {{bank_pengirim_tujuan}}",
      "Bukti transaksi pembayaran kami sertakan bersama surat ini.",
      "Mohon dapat dilakukan pengecekan dan konfirmasi penerimaan dana. Terima kasih atas kerja sama yang baik."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f05",
    "name": "Surat Tagihan",
    "category": "F",
    "code": "INV",
    "docLayout": "surat_resmi",
    "description": "Surat penagihan pembayaran (Invoice Letter) resmi atas barang atau jasa yang telah dikirimkan kepada klien.",
    "keywords": "surat tagihan invoice pembayaran jatuh tempo",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Tagihan Pembayaran (Invoice)",
        "required": true,
        "default": "Tagihan Pembayaran Barang / Jasa"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Rincian Nota / Invoice",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_nota",
        "label": "Nomor Invoice / Nota",
        "type": "text",
        "placeholder": "Contoh: INV-028/XI/2026",
        "required": true,
        "default": ""
      },
      {
        "name": "rincian_tagihan",
        "label": "Rincian Barang / Jasa yang Ditagihkan",
        "type": "textarea",
        "placeholder": "Contoh: Pengadaan 100 paket konsumsi acara tanggal 12 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "total_tagihan",
        "label": "Total Nominal Tagihan (Rp)",
        "type": "text",
        "placeholder": "Contoh: Rp 2.500.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "jatuh_tempo",
        "label": "Tanggal Jatuh Tempo Pembayaran",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "rekening_pembayaran",
        "label": "Rekening Tujuan Pembayaran",
        "type": "text",
        "placeholder": "Contoh: Bank Mandiri 155xxxxxxx a.n. ...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Sehubungan dengan telah diselesaikannya pengiriman/pekerjaan sesuai pesanan Bapak/Ibu, bersama surat ini kami menyampaikan tagihan pembayaran dengan rincian:\nNomor Invoice : {{nomor_nota}}\nRincian : {{rincian_tagihan}}\nTotal Tagihan : {{total_tagihan}}\nJatuh Tempo : {{jatuh_tempo}}",
      "Pembayaran dapat ditransfer ke rekening resmi kami:\n{{rekening_pembayaran}}",
      "Apabila pembayaran telah dilakukan sebelum surat ini diterima, mohon abaikan surat tagihan ini dan kirimkan bukti transfer untuk pencatatan administrasi kami."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f06",
    "name": "Surat Pengajuan Modal Usaha",
    "category": "F",
    "code": "MDL",
    "docLayout": "surat_resmi",
    "description": "Surat permohonan pembiayaan atau tambahan modal usaha UMKM kepada koperasi, lembaga keuangan, atau investor.",
    "keywords": "pengajuan modal usaha umkm pembiayaan kredit",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permohonan Pembiayaan / Tambahan Modal Usaha",
        "required": true,
        "default": "Permohonan Pengajuan Modal Usaha"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Berkas Rencana Usaha",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_usaha",
        "label": "Nama Usaha",
        "type": "text",
        "placeholder": "Contoh: Bengkel Motor / Usaha Jamu Kemasan",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_usaha",
        "label": "Bidang Usaha & Lama Berjalan",
        "type": "text",
        "placeholder": "Contoh: Jasa Servis Kendaraan, berjalan 2 tahun",
        "required": true,
        "default": ""
      },
      {
        "name": "jumlah_modal",
        "label": "Nominal Modal yang Diajukan (Rp)",
        "type": "text",
        "placeholder": "Contoh: Rp 15.000.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "rencana_penggunaan",
        "label": "Rencana Penggunaan Modal",
        "type": "textarea",
        "placeholder": "Contoh: Pembelian peralatan kerja, penambahan stok bahan baku, dan peningkatan kapasitas produksi.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya selaku pemilik usaha {{nama_usaha}} ({{jenis_usaha}}) bermaksud mengajukan permohonan dukungan pembiayaan modal usaha sebesar {{jumlah_modal}}.",
      "Dana modal usaha tersebut akan digunakan secara produktif untuk:\n{{rencana_penggunaan}}",
      "Sebagai bahan pertimbangan, bersama ini saya lampirkan identitas usaha serta catatan perkembangan omzet bulanan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f07",
    "name": "Surat Pernyataan Usaha",
    "category": "F",
    "code": "SPU",
    "docLayout": "surat_judul_tengah",
    "description": "Surat pernyataan pemilik usaha mengenai kepemilikan, legalitas operasional, dan komitmen menjaga kualitas produk.",
    "keywords": "pernyataan usaha kepemilikan umkm",
    "fields": [
      {
        "name": "nama_lengkap",
        "label": "Nama Lengkap",
        "type": "text",
        "placeholder": "Contoh: Ahmad Fauzi",
        "required": true,
        "default": ""
      },
      {
        "name": "nik",
        "label": "NIK (Nomor Induk Kependudukan)",
        "type": "text",
        "placeholder": "16 digit NIK sesuai KTP",
        "required": false,
        "default": ""
      },
      {
        "name": "ttl",
        "label": "Tempat, Tanggal Lahir",
        "type": "text",
        "placeholder": "Contoh: Tangerang, 14 Mei 1995",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_kelamin",
        "label": "Jenis Kelamin",
        "type": "select",
        "options": [
          "Laki-laki",
          "Perempuan"
        ],
        "required": true,
        "default": "Laki-laki"
      },
      {
        "name": "pekerjaan",
        "label": "Pekerjaan",
        "type": "text",
        "placeholder": "Contoh: Karyawan Swasta / Wiraswasta",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_lengkap",
        "label": "Alamat Lengkap",
        "type": "textarea",
        "placeholder": "Contoh: Kp. Kosambi Barat RT 002/RW 004, Kec. Kosambi",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_usaha",
        "label": "Nama Usaha",
        "type": "text",
        "placeholder": "Contoh: Berkah Mandiri UMKM",
        "required": true,
        "default": ""
      },
      {
        "name": "bidang_usaha",
        "label": "Bidang Usaha",
        "type": "text",
        "placeholder": "Contoh: Produksi Makanan & Minuman",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_usaha",
        "label": "Alamat Tempat Usaha",
        "type": "textarea",
        "placeholder": "Alamat lokasi usaha",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat Pernyataan",
        "type": "text",
        "placeholder": "Contoh: Pendaftaran kurasi produk UMKM / perizinan berusaha",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama Pemilik : {{nama_lengkap}}\nNIK : {{nik}}\nAlamat Pemilik : {{alamat_lengkap}}",
      "Menyatakan dengan sesungguhnya bahwa saya adalah pemilik sah dari kegiatan usaha:\nNama Usaha : {{nama_usaha}}\nBidang Usaha : {{bidang_usaha}}\nAlamat Usaha : {{alamat_usaha}}",
      "Usaha tersebut benar aktif beroperasi, tidak melanggar ketentuan hukum maupun ketertiban lingkungan, dan pernyataan ini dibuat untuk keperluan {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f08",
    "name": "Surat Pengunduran Diri Karyawan",
    "category": "F",
    "code": "RES-KRY",
    "docLayout": "surat_pribadi",
    "description": "Surat pengunduran diri karyawan dari toko, bengkel, atau perusahaan UMKM secara sopan dan profesional.",
    "keywords": "pengunduran diri karyawan pegawai toko usaha",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pengunduran Diri Karyawan",
        "required": true,
        "default": "Permohonan Pengunduran Diri"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_karyawan",
        "label": "Nama Karyawan",
        "type": "text",
        "placeholder": "Nama lengkap Anda",
        "required": true,
        "default": ""
      },
      {
        "name": "posisi_kerja",
        "label": "Posisi / Bagian",
        "type": "text",
        "placeholder": "Contoh: Mekanik / Kasir / Staf Produksi",
        "required": true,
        "default": ""
      },
      {
        "name": "tanggal_berhenti",
        "label": "Tanggal Terakhir Bekerja",
        "type": "date",
        "placeholder": "",
        "required": true,
        "default": ""
      },
      {
        "name": "alasan",
        "label": "Alasan Pengunduran Diri",
        "type": "text",
        "placeholder": "Contoh: Keperluan keluarga dan melanjutkan pendidikan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Saya yang bertanda tangan di bawah ini:\nNama : {{nama_karyawan}}\nPosisi : {{posisi_kerja}}",
      "Dengan ini mengajukan permohonan pengunduran diri dari posisi {{posisi_kerja}} terhitung sejak tanggal {{tanggal_berhenti}} dikarenakan {{alasan}}.",
      "Saya mengucapkan terima kasih atas kesempatan kerja dan bimbingan selama saya bekerja di tempat Bapak/Ibu."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f09",
    "name": "Surat Keterangan Kerja",
    "category": "F",
    "code": "SKK",
    "docLayout": "surat_judul_tengah",
    "description": "Surat keterangan dari pemilik usaha bahwa karyawan masih aktif bekerja (untuk KPR, rekening bank, atau BPJS).",
    "keywords": "keterangan kerja karyawan aktif bank bpjs",
    "fields": [
      {
        "name": "nama_karyawan",
        "label": "Nama Lengkap Karyawan",
        "type": "text",
        "placeholder": "Nama karyawan",
        "required": true,
        "default": ""
      },
      {
        "name": "nik_karyawan",
        "label": "NIK Karyawan",
        "type": "text",
        "placeholder": "16 digit NIK",
        "required": true,
        "default": ""
      },
      {
        "name": "jabatan",
        "label": "Jabatan / Posisi",
        "type": "text",
        "placeholder": "Contoh: Kepala Bengkel / Admin Penjualan",
        "required": true,
        "default": ""
      },
      {
        "name": "mulai_bekerja",
        "label": "Mulai Bekerja Sejak",
        "type": "text",
        "placeholder": "Contoh: 10 Februari 2024",
        "required": true,
        "default": ""
      },
      {
        "name": "keperluan",
        "label": "Keperluan Surat",
        "type": "text",
        "placeholder": "Contoh: Pembukaan rekening bank / pengajuan fasilitas kredit",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Pemilik / Pimpinan Usaha dengan ini menerangkan bahwa:\nNama : {{nama_karyawan}}\nNIK : {{nik_karyawan}}\nJabatan : {{jabatan}}",
      "Adalah benar karyawan tetap/aktif yang bekerja pada usaha kami sejak tanggal {{mulai_bekerja}} hingga saat ini dengan kinerja yang baik.",
      "Demikian surat keterangan kerja ini dibuat untuk dipergunakan sebagai {{keperluan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f10",
    "name": "Surat Perjanjian Kerja Sama Sederhana",
    "category": "F",
    "code": "SPKS",
    "docLayout": "surat_judul_tengah",
    "description": "Perjanjian kerja sama usaha sederhana antara dua pelaku usaha mengenai modal, bagi hasil, atau operasional.",
    "keywords": "perjanjian kerja sama sederhana bagi hasil modal usaha",
    "fields": [
      {
        "name": "pihak_pertama",
        "label": "Nama Pihak Pertama",
        "type": "text",
        "placeholder": "Nama lengkap pihak pertama",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_pihak_1",
        "label": "Alamat Pihak Pertama",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "pihak_kedua",
        "label": "Nama Pihak Kedua",
        "type": "text",
        "placeholder": "Nama lengkap pihak kedua",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_pihak_2",
        "label": "Alamat Pihak Kedua",
        "type": "textarea",
        "placeholder": "Alamat lengkap",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_usaha_bersama",
        "label": "Nama / Bentuk Usaha yang Dikerjasamakan",
        "type": "text",
        "placeholder": "Contoh: Usaha Distribusi Minuman Herbal",
        "required": true,
        "default": ""
      },
      {
        "name": "kesepakatan_bagi_hasil",
        "label": "Ketentuan Modal, Tugas & Bagi Hasil",
        "type": "textarea",
        "placeholder": "Contoh: Pihak Pertama menyediakan produksi barang, Pihak Kedua menangani pemasaran dengan pembagian keuntungan bersih 50% : 50% setiap akhir bulan.",
        "required": true,
        "default": ""
      },
      {
        "name": "jangka_waktu",
        "label": "Jangka Waktu Kerja Sama",
        "type": "text",
        "placeholder": "Contoh: 1 (satu) tahun dan dapat diperpanjang berdasarkan kesepakatan",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "PERJANJIAN KERJA SAMA USAHA",
      "Yang bertanda tangan di bawah ini:\n1. Nama : {{pihak_pertama}}, Alamat : {{alamat_pihak_1}} (selanjutnya disebut PIHAK PERTAMA).\n2. Nama : {{pihak_kedua}}, Alamat : {{alamat_pihak_2}} (selanjutnya disebut PIHAK KEDUA).",
      "Kedua belah pihak sepakat menjalin kerja sama dalam pengelolaan {{nama_usaha_bersama}} selama jangka waktu {{jangka_waktu}} dengan ketentuan sebagai berikut:\n{{kesepakatan_bagi_hasil}}",
      "Apabila terjadi perbedaan pendapat di kemudian hari, kedua belah pihak sepakat menyelesaikannya secara musyawarah kekeluargaan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f11",
    "name": "Surat Penawaran Jasa",
    "category": "F",
    "code": "PNW-JSA",
    "docLayout": "surat_resmi",
    "description": "Surat penawaran jasa perawatan, servis motor, desain, katering, kebersihan, atau layanan profesional UMKM.",
    "keywords": "penawaran jasa servis perawatan katering layanan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Penawaran Jasa Layanan",
        "required": true,
        "default": "Penawaran Jasa Layanan Profesional"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Daftar Paket Jasa",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "jenis_jasa",
        "label": "Jenis Jasa yang Ditawarkan",
        "type": "text",
        "placeholder": "Contoh: Jasa Servis Berkala Kendaraan Operasional / Jasa Katering Acara",
        "required": true,
        "default": ""
      },
      {
        "name": "rincian_paket",
        "label": "Rincian Layanan, Keunggulan & Biaya",
        "type": "textarea",
        "placeholder": "Contoh: - Pengecekan lengkap & ganti oli\n- Garansi pengerjaan 7 hari\n- Diskon khusus untuk armada operasional",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dalam rangka mendukung kelancaran operasional instansi/perusahaan Bapak/Ibu, kami menawarkan layanan {{jenis_jasa}} yang dikerjakan oleh tenaga berpengalaman dan terpercaya.",
      "Adapun rincian layanan dan estimasi biaya kami meliputi:\n{{rincian_paket}}",
      "Kami siap melakukan survei kebutuhan atau konsultasi teknis kapan saja sesuai waktu yang Bapak/Ibu tentukan."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f12",
    "name": "Surat Pengiriman Barang",
    "category": "F",
    "code": "DO",
    "docLayout": "surat_resmi",
    "description": "Surat jalan / pengantar pengiriman barang pesanan kepada pelanggan sebagai bukti serah terima barang.",
    "keywords": "pengiriman barang surat jalan ekspedisi serah terima",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Pengiriman Barang Pesanan (Surat Jalan)",
        "required": true,
        "default": "Pengantar Pengiriman Barang"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Nota / Packing List",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_po",
        "label": "Referensi Nomor Pesanan",
        "type": "text",
        "placeholder": "Contoh: PO-2026-09",
        "required": true,
        "default": ""
      },
      {
        "name": "rincian_barang_kirim",
        "label": "Daftar Barang & Jumlah yang Dikirim",
        "type": "textarea",
        "placeholder": "Contoh: 1. Produk A = 10 dus (isi 24 botol/dus)\n2. Produk B = 5 dus",
        "required": true,
        "default": ""
      },
      {
        "name": "nama_kurir",
        "label": "Nama Pengantar / Ekspedisi",
        "type": "text",
        "placeholder": "Contoh: Kurir Internal / Budi",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Menindaklanjuti pesanan Bapak/Ibu dengan referensi {{nomor_po}}, bersama surat ini kami mengirimkan barang-barang dengan rincian sebagai berikut:\n{{rincian_barang_kirim}}",
      "Barang dikirimkan melalui {{nama_kurir}}. Mohon dapat diperiksa kondisi serta kesesuaian jumlah barang pada saat diterima.",
      "Demikian surat pengantar pengiriman barang ini kami sampaikan. Terima kasih atas kepercayaan Bapak/Ibu."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f13",
    "name": "Surat Komplain Pelanggan",
    "category": "F",
    "code": "KMP",
    "docLayout": "surat_resmi",
    "description": "Surat penyampaian keluhan atas ketidaksesuaian barang, keterlambatan pengiriman, atau layanan kepada supplier.",
    "keywords": "komplain pelanggan keluhan retur penggantian barang",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Penyampaian Keluhan / Komplain Pesanan",
        "required": true,
        "default": "Penyampaian Komplain dan Permohonan Penggantian"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Lembar Foto Bukti",
        "required": false,
        "default": "1 (Satu) Lembar"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_transaksi",
        "label": "Nomor Nota / Tanggal Transaksi",
        "type": "text",
        "placeholder": "Contoh: Nota No. 045 tanggal 14 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "detail_keluhan",
        "label": "Uraian Ketidaksesuaian / Keluhan",
        "type": "textarea",
        "placeholder": "Contoh: Terdapat 2 dus kemasan yang mengalami kebocoran saat diterima.",
        "required": true,
        "default": ""
      },
      {
        "name": "solusi_diharapkan",
        "label": "Solusi yang Diharapkan",
        "type": "text",
        "placeholder": "Contoh: Penggantian barang baru sesuai jumlah yang rusak",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Dengan hormat, sehubungan dengan transaksi pembelian kami pada {{nomor_transaksi}}, kami bermaksud menyampaikan keluhan terkait kondisi barang yang diterima.",
      "Adapun ketidaksesuaian yang kami temukan adalah sebagai berikut:\n{{detail_keluhan}}",
      "Demi menjaga kelancaran kerja sama yang selama ini sudah terjalin baik, kami memohon tindak lanjut berupa {{solusi_diharapkan}}."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f14",
    "name": "Surat Balasan Penawaran",
    "category": "F",
    "code": "BLS-PNW",
    "docLayout": "surat_resmi",
    "description": "Surat balasan resmi untuk menerima, menegosiasikan, atau menanggapi surat penawaran dari mitra/vendor.",
    "keywords": "balasan penawaran tanggapan vendor negosiasi",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Balasan atas Surat Penawaran",
        "required": true,
        "default": "Tanggapan / Balasan Surat Penawaran"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "-",
        "required": false,
        "default": "-"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "nomor_surat_penawaran",
        "label": "Nomor Surat Penawaran yang Dibalas",
        "type": "text",
        "placeholder": "Contoh: 019/PNW/XI/2026",
        "required": true,
        "default": ""
      },
      {
        "name": "keputusan_balasan",
        "label": "Isi Tanggapan / Keputusan",
        "type": "textarea",
        "placeholder": "Contoh: Kami tertarik dengan paket penawaran nomor 2 dan bermaksud menjadwalkan pertemuan untuk finalisasi harga dan jadwal pengiriman.",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Terima kasih atas surat penawaran Bapak/Ibu Nomor {{nomor_surat_penawaran}} yang telah kami terima dan pelajari dengan baik.",
      "Sehubungan dengan penawaran tersebut, kami sampaikan tanggapan sebagai berikut:\n{{keputusan_balasan}}",
      "Demikian surat balasan ini kami sampaikan. Kami menantikan kabar dan tindak lanjut dari Bapak/Ibu."
    ],
    "closing": ""
  },
  {
    "id": "tpl_f15",
    "name": "Surat Permintaan Pembayaran",
    "category": "F",
    "code": "PMB-BYR",
    "docLayout": "surat_resmi",
    "description": "Surat pengingat pembayaran termin proyek, pelunasan pesanan, atau pencairan hak pembayaran usaha.",
    "keywords": "permintaan pembayaran pelunasan termin pencairan",
    "fields": [
      {
        "name": "perihal",
        "label": "Perihal",
        "type": "text",
        "placeholder": "Permintaan Pelunasan / Pencairan Pembayaran",
        "required": true,
        "default": "Permintaan Penyelesaian Pembayaran"
      },
      {
        "name": "lampiran",
        "label": "Lampiran",
        "type": "text",
        "placeholder": "1 (Satu) Berita Acara Serah Terima / Nota",
        "required": false,
        "default": "1 (Satu) Berkas"
      },
      {
        "name": "nama_penerima",
        "label": "Nama / Jabatan Penerima",
        "type": "text",
        "placeholder": "Contoh: Bapak/Ibu Kepala Bagian / Pimpinan",
        "required": true,
        "default": ""
      },
      {
        "name": "instansi_penerima",
        "label": "Instansi / Lembaga Tujuan",
        "type": "text",
        "placeholder": "Contoh: PT Maju Bersama / Kelurahan Kosambi Barat",
        "required": true,
        "default": ""
      },
      {
        "name": "alamat_tujuan",
        "label": "Alamat Tujuan",
        "type": "textarea",
        "placeholder": "Contoh: Jl. Raya Kosambi No. 12, Kab. Tangerang",
        "required": true,
        "default": ""
      },
      {
        "name": "dasar_tagihan",
        "label": "Dasar Pekerjaan / Pesanan",
        "type": "text",
        "placeholder": "Contoh: SPK / Pesanan Nomor 011 tanggal 01 November 2026",
        "required": true,
        "default": ""
      },
      {
        "name": "nominal_pelunasan",
        "label": "Nominal yang Dimohonkan Pembayarannya",
        "type": "text",
        "placeholder": "Contoh: Rp 4.000.000,-",
        "required": true,
        "default": ""
      },
      {
        "name": "rekening_tujuan",
        "label": "Rekening Penerima Pembayaran",
        "type": "text",
        "placeholder": "Contoh: Bank BRI 0342xxxxxxx a.n. ...",
        "required": true,
        "default": ""
      }
    ],
    "opening": "",
    "paragraphs": [
      "Bersama surat ini kami sampaikan bahwa kewajiban pengadaan/pekerjaan berdasarkan {{dasar_tagihan}} telah kami selesaikan seluruhnya dengan baik.",
      "Sehubungan dengan hal tersebut, kami mengajukan permohonan pencairan/pelunasan pembayaran sebesar {{nominal_pelunasan}} yang dapat ditransfer ke rekening:\n{{rekening_tujuan}}",
      "Atas perhatian dan kelancaran proses administrasi pembayaran Bapak/Ibu, kami ucapkan terima kasih."
    ],
    "closing": ""
  }
];

  const TONE_PRESETS = {
    formal: {
      label: 'Formal Resmi',
      opening: 'Dengan hormat,',
      closing: 'Demikian surat ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.'
    },
    formal_sederhana: {
      label: 'Formal Sederhana',
      opening: 'Dengan hormat,',
      closing: 'Demikian surat ini dibuat untuk dipergunakan sebagaimana mestinya. Terima kasih atas perhatiannya.'
    },
    profesional: {
      label: 'Profesional Bisnis',
      opening: 'Kepada Yth. Bapak/Ibu, dengan penuh rasa hormat,',
      closing: 'Besar harapan kami kerja sama yang baik ini dapat terus terjalin. Atas perhatian dan kepercayaan Bapak/Ibu, kami sampaikan terima kasih.'
    },
    sopan_ramah: {
      label: 'Sopan & Ramah',
      opening: 'Assalamu\'alaikum Wr. Wb. / Salam sejahtera, dengan penuh rasa hormat,',
      closing: 'Atas perhatian, dukungan, dan kebaikan Bapak/Ibu, kami menghaturkan terima kasih yang sebesar-besarnya.'
    }
  };

  function getCategories() {
    return CATEGORIES;
  }

  function getCategoryById(catId) {
    return CATEGORIES.find((c) => c.id === catId) || {
      id: 'CUSTOM',
      name: 'Template Kustom Saya',
      short: 'Template Kustom',
      desc: 'Template surat yang dibuat dan disesuaikan sendiri oleh pengguna.',
      legalNote: ''
    };
  }

  async function getAllTemplates() {
    const customList = await KopyStorage.getAll('customTemplates');
    const normalizedCustom = customList.map((c) => Object.assign({}, c, { isCustom: true }));
    return [...BUILTIN_TEMPLATES, ...normalizedCustom];
  }

  async function getTemplateById(id) {
    const builtIn = BUILTIN_TEMPLATES.find((t) => t.id === id);
    if (builtIn) return Object.assign({}, builtIn, { isCustom: false });
    const custom = await KopyStorage.getById('customTemplates', id);
    if (custom) return Object.assign({}, custom, { isCustom: true });
    return null;
  }

  function extractVariablesFromText(text) {
    const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
    const found = new Set();
    let match;
    while ((match = regex.exec(String(text || ''))) !== null) {
      found.add(match[1]);
    }
    return Array.from(found);
  }

  function findUnfilledVariables(text) {
    const regex = /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g;
    const missing = [];
    let match;
    while ((match = regex.exec(String(text || ''))) !== null) {
      if (!missing.includes(match[1])) {
        missing.push(match[1]);
      }
    }
    return missing;
  }

  function humanizeVariableLabel(varName) {
    return varName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  async function saveCustomTemplate(data) {
    const id = data.id || KopyStorage.generateId('tpl_custom');
    const rawBody = (data.bodyText || '').trim();
    const paragraphs = rawBody
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const vars = extractVariablesFromText(rawBody);
    const autoFields = vars
      .filter((v) => !['nama_organisasi', 'alamat', 'nomor_surat', 'tanggal', 'nama_penandatangan', 'jabatan_penandatangan'].includes(v))
      .map((v) => ({
        name: v,
        label: humanizeVariableLabel(v),
        type: v.includes('tanggal') ? 'date' : (v.includes('isi') || v.includes('alamat') || v.includes('rincian') ? 'textarea' : 'text'),
        placeholder: `Masukkan ${humanizeVariableLabel(v).toLowerCase()}`,
        required: true,
        default: ''
      }));

    const tpl = {
      id,
      name: (data.name || 'Template Kustom').trim(),
      category: data.category || 'A',
      code: (data.code || 'KST').trim().toUpperCase(),
      docLayout: data.docLayout || 'surat_resmi',
      description: (data.description || 'Template surat kustom buatan pengguna.').trim(),
      keywords: `${data.name} ${data.description} kustom`,
      fields: autoFields,
      paragraphs: paragraphs.length > 0 ? paragraphs : [rawBody],
      bodyText: rawBody,
      isCustom: true,
      updatedAt: new Date().toISOString()
    };

    await KopyStorage.put('customTemplates', tpl);
    return tpl;
  }

  async function duplicateTemplate(tplId) {
    const src = await getTemplateById(tplId);
    if (!src) return null;
    const bodyText = src.bodyText || (src.paragraphs || []).join('\n\n');
    return await saveCustomTemplate({
      name: `${src.name} (Salinan Kustom)`,
      category: src.category,
      code: src.code,
      docLayout: src.docLayout,
      description: src.description,
      bodyText
    });
  }

  async function deleteCustomTemplate(id) {
    await KopyStorage.remove('customTemplates', id);
  }

  return {
    CATEGORIES,
    BUILTIN_TEMPLATES,
    TONE_PRESETS,
    getCategories,
    getCategoryById,
    getAllTemplates,
    getTemplateById,
    extractVariablesFromText,
    findUnfilledVariables,
    saveCustomTemplate,
    duplicateTemplate,
    deleteCustomTemplate
  };
})();
