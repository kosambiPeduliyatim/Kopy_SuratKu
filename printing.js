/* ==========================================================================
   KOPY SuratKu — Printing, PDF Export & Sharing Engine (printing.js)
   ========================================================================== */

window.KopyPrinting = (function () {
  function extractPlainText(doc) {
    if (!doc) return '';
    const parts = [];
    if (doc.letterhead && doc.letterhead.orgName) {
      parts.push(doc.letterhead.orgName.toUpperCase());
      if (doc.letterhead.address) parts.push(doc.letterhead.address);
      parts.push('----------------------------------------');
    }
    if (doc.docLayout === 'surat_judul_tengah') {
      parts.push(doc.letterTitle);
      if (doc.letterNumber) parts.push(`Nomor: ${doc.letterNumber}`);
    } else {
      if (doc.placeAndDate) parts.push(doc.placeAndDate);
      if (doc.letterNumber) parts.push(`Nomor   : ${doc.letterNumber}`);
      if (doc.attachment) parts.push(`Lampiran: ${doc.attachment}`);
      if (doc.subject) parts.push(`Perihal : ${doc.subject}`);
      if (doc.recipientBlock) parts.push(`
${doc.recipientBlock}`);
    }
    if (doc.opening) parts.push(`
${doc.opening}`);
    (doc.paragraphs || []).forEach((p) => parts.push(`
${p}`));
    if (doc.closing) parts.push(`
${doc.closing}`);
    if (doc.docLayout === 'surat_judul_tengah' && doc.placeAndDate) {
      parts.push(`
${doc.placeAndDate}`);
    }
    if (doc.signerTitle) parts.push(doc.signerTitle);
    if (doc.signerName) parts.push(`
${doc.signerName}`);
    return parts.join('
');
  }

  function printCurrentDocument() {
    const doc = KopyEditor.getActiveDocument();
    if (!doc) {
      KopyApp.showToast('Tidak ada dokumen aktif untuk dicetak.', 'warning');
      return;
    }
    document.body.classList.remove('printing-archive-modal');
    window.print();
  }

  async function copyCurrentText() {
    const doc = KopyEditor.getActiveDocument();
    const text = extractPlainText(doc);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      KopyApp.showToast('Isi surat berhasil disalin ke papan klip (clipboard).');
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      KopyApp.showToast('Isi surat berhasil disalin.');
    }
  }

  async function shareCurrentSummary() {
    const doc = KopyEditor.getActiveDocument();
    if (!doc) return;
    const summary = [
      `Dokumen: ${doc.docName}`,
      doc.letterNumber ? `Nomor: ${doc.letterNumber}` : '',
      `Organisasi: ${doc.orgName || 'Umum'}`,
      `Tanggal: ${doc.placeAndDate}`,
      '',
      extractPlainText(doc)
    ]
      .filter(Boolean)
      .join('
');

    if (navigator.share) {
      try {
        await navigator.share({
          title: doc.docName,
          text: summary
        });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }
    await copyCurrentText();
    KopyApp.showToast('Ringkasan surat disalin agar siap ditempel ke WhatsApp/Email.');
  }

  return {
    extractPlainText,
    printCurrentDocument,
    copyCurrentText,
    shareCurrentSummary
  };
})();
