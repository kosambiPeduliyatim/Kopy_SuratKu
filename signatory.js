/* ==========================================================================
   KOPY SuratKu — Signatory Management (signatory.js)
   Manajemen Data Penandatangan Berulang per Organisasi
   dengan Keterangan Hukum tentang Gambar Tanda Tangan
   ========================================================================== */

window.KopySignatory = (function () {
  async function listSignatories(orgId) {
    const all = await KopyStorage.getAll('signatories');
    if (!orgId) return all;
    return all.filter((s) => !s.orgId || s.orgId === orgId);
  }

  async function saveSignatory(data) {
    const id = data.id || KopyStorage.generateId('sig');
    const sig = {
      id,
      orgId: data.orgId || '',
      name: (data.name || '').trim(),
      title: (data.title || '').trim(),
      signatureDataUrl: data.useSignatureImage === false ? '' : (data.signatureDataUrl || ''),
      updatedAt: new Date().toISOString()
    };
    await KopyStorage.put('signatories', sig);
    return sig;
  }

  async function deleteSignatory(id) {
    await KopyStorage.remove('signatories', id);
  }

  return {
    listSignatories,
    saveSignatory,
    deleteSignatory
  };
})();
