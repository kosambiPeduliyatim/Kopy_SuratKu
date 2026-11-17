/* ==========================================================================
   KOPY SuratKu — Backup Export & Safe JSON Restore (export-import.js)
   Mendukung Ekspor Selektif/Penuh, Validasi Skema JSON, Perlindungan Data Rusak,
   serta Opsi Timpa (Overwrite) atau Gabungkan (Merge)
   ========================================================================== */

window.KopyExportImport = (function () {
  let pendingImportPayload = null;

  async function exportBackup(scope) {
    // scope: 'all', 'organizations', 'documents', 'customTemplates'
    const payload = {
      app: 'KOPY SuratKu',
      version: '1.0.0',
      scope: scope || 'all',
      exportedAt: new Date().toISOString(),
      data: {}
    };

    if (scope === 'organizations') {
      payload.data.organizations = await KopyStorage.getAll('organizations');
      payload.data.letterheads = await KopyStorage.getAll('letterheads');
      payload.data.signatories = await KopyStorage.getAll('signatories');
    } else if (scope === 'documents') {
      payload.data.documents = await KopyStorage.getAll('documents');
      payload.data.numberingHistory = await KopyStorage.getAll('numberingHistory');
    } else if (scope === 'customTemplates') {
      payload.data.customTemplates = await KopyStorage.getAll('customTemplates');
    } else {
      for (const store of KopyStorage.STORES) {
        payload.data[store] = await KopyStorage.getAll(store);
      }
    }

    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const dateTag = new Date().toISOString().slice(0, 10);
    const filename = `kopy-suratku-backup-${scope || 'lengkap'}-${dateTag}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    localStorage.setItem('kopy_sk_last_backup', new Date().toISOString());
    if (window.KopySettings && window.KopySettings.renderSettingsView) {
      await window.KopySettings.renderSettingsView();
    }
    KopyApp.showToast(`File cadangan (${filename}) berhasil diunduh.`);
  }

  function validateBackupObject(parsed) {
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, reason: 'Isi file bukan objek JSON yang valid.' };
    }
    if (parsed.app !== 'KOPY SuratKu' || !parsed.data || typeof parsed.data !== 'object') {
      return { valid: false, reason: 'Format file bukan cadangan resmi KOPY SuratKu.' };
    }
    const keys = Object.keys(parsed.data);
    const validKeys = keys.filter((k) => KopyStorage.STORES.includes(k) && Array.isArray(parsed.data[k]));
    if (validKeys.length === 0) {
      return { valid: false, reason: 'File cadangan tidak memiliki tabel data yang dapat dipulihkan.' };
    }
    for (const k of validKeys) {
      for (const item of parsed.data[k]) {
        if (!item || typeof item !== 'object' || !item.id) {
          return { valid: false, reason: `Data rusak pada bagian "${k}" (item tanpa ID valid).` };
        }
      }
    }
    return { valid: true, stores: validKeys };
  }

  function handleImportFileSelection(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json') && file.type !== 'application/json') {
      KopyApp.showToast('Harap pilih file cadangan berformat .json.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = JSON.parse(e.target.result);
        const check = validateBackupObject(parsed);
        if (!check.valid) {
          KopyApp.showToast(`Impor dibatalkan: ${check.reason}`, 'error');
          return;
        }
        pendingImportPayload = parsed;
        openImportConfirmModal(parsed, check.stores);
      } catch (err) {
        KopyApp.showToast('File JSON rusak atau tidak dapat dibaca. Data Anda tetap aman.', 'error');
      }
    };
    reader.onerror = function () {
      KopyApp.showToast('Gagal membaca file dari perangkat.', 'error');
    };
    reader.readAsText(file);
  }

  function openImportConfirmModal(parsed, stores) {
    const modal = document.getElementById('importConfirmModal');
    const infoEl = document.getElementById('importPreviewInfo');
    if (infoEl) {
      const counts = stores
        .map((s) => `<li><strong>${s}</strong>: ${parsed.data[s].length} item</li>`)
        .join('');
      infoEl.innerHTML = `
        <p><strong>Tanggal Backup:</strong> ${parsed.exportedAt || '-'}</p>
        <p><strong>Cakupan Data Valid:</strong></p>
        <ul>${counts}</ul>
        <p style="font-size:0.86rem;color:var(--text-secondary);">
          Pilih <strong>Gabungkan Data</strong> untuk menambahkan data baru tanpa menghapus data lama (duplikat ID otomatis diperbarui), atau <strong>Timpa Data</strong> untuk mengganti seluruh data pada kategori terkait.
        </p>
      `;
    }
    if (modal) modal.classList.add('open');
  }

  function closeImportModal() {
    pendingImportPayload = null;
    const modal = document.getElementById('importConfirmModal');
    if (modal) modal.classList.remove('open');
  }

  async function executeImport(mode) {
    // mode: 'merge' | 'overwrite'
    if (!pendingImportPayload) return;
    const payload = pendingImportPayload;
    const check = validateBackupObject(payload);
    if (!check.valid) {
      closeImportModal();
      KopyApp.showToast('Data impor tidak valid.', 'error');
      return;
    }

    for (const storeName of check.stores) {
      if (mode === 'overwrite') {
        await KopyStorage.clearStore(storeName);
      }
      const incoming = payload.data[storeName];
      for (const item of incoming) {
        await KopyStorage.put(storeName, item);
      }
    }

    closeImportModal();
    await KopyApp.refreshAllViews();
    KopyApp.showToast(
      mode === 'overwrite'
        ? 'Data berhasil dipulihkan (Mode Timpa).'
        : 'Data berhasil digabungkan ke penyimpanan lokal.'
    );
  }

  return {
    exportBackup,
    handleImportFileSelection,
    closeImportModal,
    executeImport
  };
})();
