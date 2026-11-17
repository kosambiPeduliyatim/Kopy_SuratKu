/* ==========================================================================
   KOPY SuratKu — Application Settings & Storage Diagnostics (settings.js)
   ========================================================================== */

window.KopySettings = (function () {
  function applyTheme(theme) {
    const mode = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', mode);
  }

  async function toggleTheme() {
    const settings = await KopyStorage.getSettings();
    const next = settings.theme === 'dark' ? 'light' : 'dark';
    await KopyStorage.saveSettings({ theme: next });
    applyTheme(next);
    await renderSettingsView();
    KopyApp.showToast(`Mode ${next === 'dark' ? 'Gelap' : 'Terang'} diaktifkan.`);
  }

  async function renderSettingsView() {
    const settings = await KopyStorage.getSettings();
    const orgs = await KopyOrganization.listOrganizations();
    const letterheads = await KopyLetterhead.listLetterheads();
    const usage = await KopyStorage.estimateStorageUsage();
    const lastBackup = localStorage.getItem('kopy_sk_last_backup');

    const themeSel = document.getElementById('set_theme');
    if (themeSel) themeSel.value = settings.theme;

    const orgSel = document.getElementById('set_defaultOrgId');
    if (orgSel) {
      orgSel.innerHTML =
        `<option value="">-- Tidak Ada Default --</option>` +
        orgs.map((o) => `<option value="${o.id}" ${o.id === settings.defaultOrgId ? 'selected' : ''}>${o.name}</option>`).join('');
    }

    const lhSel = document.getElementById('set_defaultLetterheadId');
    if (lhSel) {
      lhSel.innerHTML =
        `<option value="">-- Tanpa Kop Default --</option>` +
        letterheads.map((l) => `<option value="${l.id}" ${l.id === settings.defaultLetterheadId ? 'selected' : ''}>${l.title}</option>`).join('');
    }

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal('set_dateFormat', settings.dateFormat);
    setVal('set_docFont', settings.docFont);
    setVal('set_docMargin', settings.docMargin);
    setVal('set_numberingPattern', settings.numberingPattern);
    setVal('set_numberingDigits', settings.numberingDigits);
    setVal('set_numberingReset', settings.numberingReset);
    setVal('set_numberingPrefix', settings.numberingPrefix || '');
    setVal('set_numberingSuffix', settings.numberingSuffix || '');

    const storageInfoEl = document.getElementById('storageDiagnosticsBox');
    if (storageInfoEl) {
      storageInfoEl.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;font-size:0.86rem;">
          <div><strong>Mesin Penyimpanan:</strong><br>${usage.engine}</div>
          <div><strong>Total Ruang Terpakai:</strong><br>${usage.totalKB} KB</div>
          <div><strong>Versi Aplikasi:</strong><br>KOPY SuratKu v1.0.0 (PWA)</div>
          <div><strong>Backup Terakhir:</strong><br>${lastBackup ? new Date(lastBackup).toLocaleString('id-ID') : 'Belum pernah backup'}</div>
        </div>
      `;
    }
  }

  async function saveSettingsFromForm(e) {
    if (e) e.preventDefault();
    const getVal = (id) => document.getElementById(id)?.value || '';
    const updated = await KopyStorage.saveSettings({
      theme: getVal('set_theme') || 'light',
      defaultOrgId: getVal('set_defaultOrgId'),
      defaultLetterheadId: getVal('set_defaultLetterheadId'),
      dateFormat: getVal('set_dateFormat') || 'ID_LONG',
      docFont: getVal('set_docFont') || 'times',
      docMargin: getVal('set_docMargin') || 'standard',
      numberingPattern: getVal('set_numberingPattern') || '{SEQ}/{ORG}/{CODE}/{ROMAN}/{YEAR}',
      numberingDigits: parseInt(getVal('set_numberingDigits'), 10) || 3,
      numberingReset: getVal('set_numberingReset') || 'yearly',
      numberingPrefix: getVal('set_numberingPrefix'),
      numberingSuffix: getVal('set_numberingSuffix')
    });

    applyTheme(updated.theme);
    await KopyApp.refreshActiveOrgUI();
    KopyApp.showToast('Pengaturan aplikasi berhasil disimpan.');
  }

  async function clearNumberingHistory() {
    if (!confirm('Hapus seluruh riwayat penomoran surat? Nomor urut otomatis berikutnya akan dimulai kembali dari 001.')) {
      return;
    }
    await KopyStorage.clearStore('numberingHistory');
    await renderSettingsView();
    KopyApp.showToast('Riwayat penomoran surat telah dikosongkan.');
  }

  async function factoryResetAllData() {
    const first = confirm('PERINGATAN: Seluruh dokumen arsip, profil organisasi, kop surat, penandatangan, dan template kustom akan dihapus permanen dari perangkat ini. Lanjutkan?');
    if (!first) return;
    const second = prompt('Ketik kata HAPUS untuk mengonfirmasi penghapusan seluruh data lokal:');
    if (second !== 'HAPUS') {
      KopyApp.showToast('Penghapusan seluruh data dibatalkan.', 'warning');
      return;
    }
    await KopyStorage.resetAllData();
    await KopyApp.refreshAllViews();
    KopyApp.showToast('Seluruh data lokal berhasil dihapus.');
  }

  return {
    applyTheme,
    toggleTheme,
    renderSettingsView,
    saveSettingsFromForm,
    clearNumberingHistory,
    factoryResetAllData
  };
})();
