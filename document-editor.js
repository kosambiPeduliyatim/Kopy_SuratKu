/* ==========================================================================
   KOPY SuratKu — Interactive Document Editor & A4 Live Preview (document-editor.js)
   Edit Judul, Nomor, Tanggal, Penerima, Paragraf (Ubah/Tambah/Hapus/Urutkan),
   Lampiran, Penandatangan, Gaya Bahasa & Deteksi Variabel Belum Terisi
   ========================================================================== */

window.KopyEditor = (function () {
  let activeDoc = null;

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightUnfilled(escapedText) {
    return escapedText.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match) => {
      return `<span class="unfilled-var-highlight" title="Variabel belum diisi">${match}</span>`;
    });
  }

  function getActiveDocument() {
    return activeDoc;
  }

  async function renderA4HTML(doc) {
    if (!doc) return '';
    const settings = await KopyStorage.getSettings();
    const fontClass =
      settings.docFont === 'arial'
        ? 'font-arial'
        : settings.docFont === 'georgia'
        ? 'font-georgia'
        : '';
    const marginClass =
      settings.docMargin === 'compact'
        ? 'margin-compact'
        : settings.docMargin === 'wide'
        ? 'margin-wide'
        : '';

    const kopHTML = doc.letterhead ? KopyLetterhead.renderLetterheadHTML(doc.letterhead) : '';

    let headerMetaHTML = '';
    if (doc.docLayout === 'surat_judul_tengah') {
      headerMetaHTML = `
        <div class="doc-center-header">
          <div class="doc-center-title">${highlightUnfilled(esc(doc.letterTitle))}</div>
          ${doc.letterNumber ? `<div class="doc-center-number">Nomor: ${highlightUnfilled(esc(doc.letterNumber))}</div>` : ''}
        </div>
      `;
    } else if (doc.docLayout === 'surat_pribadi') {
      headerMetaHTML = `
        <div class="doc-date-right">${highlightUnfilled(esc(doc.placeAndDate))}</div>
        ${
          doc.subject
            ? `<table class="doc-meta-table">
                <tr><td class="doc-meta-label">Perihal</td><td class="doc-meta-colon">:</td><td><strong>${highlightUnfilled(esc(doc.subject))}</strong></td></tr>
                ${doc.attachment && doc.attachment !== '-' ? `<tr><td class="doc-meta-label">Lampiran</td><td class="doc-meta-colon">:</td><td>${highlightUnfilled(esc(doc.attachment))}</td></tr>` : ''}
              </table>`
            : ''
        }
        ${doc.recipientBlock ? `<div class="doc-recipient">${highlightUnfilled(esc(doc.recipientBlock)).replace(/
/g, '<br>')}</div>` : ''}
      `;
    } else {
      // surat_resmi standar
      headerMetaHTML = `
        <div class="doc-date-right">${highlightUnfilled(esc(doc.placeAndDate))}</div>
        <table class="doc-meta-table">
          ${doc.letterNumber ? `<tr><td class="doc-meta-label">Nomor</td><td class="doc-meta-colon">:</td><td>${highlightUnfilled(esc(doc.letterNumber))}</td></tr>` : ''}
          <tr><td class="doc-meta-label">Lampiran</td><td class="doc-meta-colon">:</td><td>${highlightUnfilled(esc(doc.attachment || '-'))}</td></tr>
          <tr><td class="doc-meta-label">Perihal</td><td class="doc-meta-colon">:</td><td><strong>${highlightUnfilled(esc(doc.subject))}</strong></td></tr>
        </table>
        ${doc.recipientBlock ? `<div class="doc-recipient">${highlightUnfilled(esc(doc.recipientBlock)).replace(/
/g, '<br>')}</div>` : ''}
      `;
    }

    const openingHTML = doc.opening
      ? `<p class="doc-paragraph">${highlightUnfilled(esc(doc.opening))}</p>`
      : '';

    const bodyHTML = (doc.paragraphs || [])
      .map((p) => `<p class="doc-paragraph">${highlightUnfilled(esc(p))}</p>`)
      .join('');

    const closingHTML = doc.closing
      ? `<p class="doc-paragraph">${highlightUnfilled(esc(doc.closing))}</p>`
      : '';

    const sigDateLine =
      doc.docLayout === 'surat_judul_tengah' && doc.placeAndDate
        ? `<div>${highlightUnfilled(esc(doc.placeAndDate))}</div>`
        : '';

    const sigImageHTML =
      doc.useSignerImage && doc.signerImage
        ? `<img src="${doc.signerImage}" alt="Tanda Tangan" class="doc-signature-img">`
        : `<div class="doc-signature-space"></div>`;

    const signatureHTML = `
      <div class="doc-signature-wrap">
        <div class="doc-signature-box">
          ${sigDateLine}
          ${doc.signerTitle ? `<div>${highlightUnfilled(esc(doc.signerTitle))}</div>` : ''}
          ${sigImageHTML}
          <div class="doc-signature-name">${highlightUnfilled(esc(doc.signerName))}</div>
        </div>
      </div>
    `;

    const attachmentsHTML =
      doc.attachmentsList && doc.attachmentsList.trim()
        ? `<div class="doc-attachments"><strong>Daftar Lampiran:</strong><br>${highlightUnfilled(esc(doc.attachmentsList)).replace(/
/g, '<br>')}</div>`
        : '';

    return `
      <div class="a4-sheet ${fontClass} ${marginClass}" id="printableA4Sheet">
        ${kopHTML}
        ${headerMetaHTML}
        ${openingHTML}
        ${bodyHTML}
        ${closingHTML}
        ${signatureHTML}
        ${attachmentsHTML}
      </div>
    `;
  }

  function getMissingVariablesInDoc(doc) {
    if (!doc) return [];
    const combined = [
      doc.letterTitle,
      doc.letterNumber,
      doc.subject,
      doc.placeAndDate,
      doc.recipientBlock,
      doc.opening,
      ...(doc.paragraphs || []),
      doc.closing,
      doc.attachmentsList,
      doc.signerName,
      doc.signerTitle
    ].join('
');
    return KopyTemplates.findUnfilledVariables(combined);
  }

  async function refreshPreviewOnly() {
    if (!activeDoc) return;
    const previewContainer = document.getElementById('a4PreviewMount');
    if (previewContainer) {
      previewContainer.innerHTML = await renderA4HTML(activeDoc);
    }

    const missing = getMissingVariablesInDoc(activeDoc);
    const warnBox = document.getElementById('editorUnfilledVarWarning');
    if (warnBox) {
      if (missing.length > 0) {
        warnBox.style.display = 'block';
        warnBox.innerHTML = `<strong>Peringatan Variabel Belum Terisi:</strong> Masih terdapat variabel <code>${missing.map((m) => '{{' + m + '}}').join(', ')}</code> yang belum diisi. Silakan lengkapi teksnya pada panel editor di samping sebelum mencetak.`;
      } else {
        warnBox.style.display = 'none';
      }
    }
  }

  async function loadDocument(docObj) {
    activeDoc = JSON.parse(JSON.stringify(docObj));
    const mount = document.getElementById('documentEditorContainer');
    if (!mount) return;

    const cat = KopyTemplates.getCategoryById(activeDoc.category);
    const legalNotice = cat.legalNote
      ? `<div class="alert-box alert-warning">${esc(cat.legalNote)}</div>`
      : '';

    const paraEditorsHTML = (activeDoc.paragraphs || [])
      .map(
        (p, idx) => `
        <div class="paragraph-editor-item" data-para-idx="${idx}">
          <div class="paragraph-editor-header">
            <span>Paragraf ${idx + 1}</span>
            <div style="display:flex;gap:4px;">
              <button type="button" class="btn btn-outline btn-sm" style="min-height:28px;padding:2px 8px;" onclick="KopyEditor.moveParagraph(${idx}, -1)" title="Geser ke atas">&uarr;</button>
              <button type="button" class="btn btn-outline btn-sm" style="min-height:28px;padding:2px 8px;" onclick="KopyEditor.moveParagraph(${idx}, 1)" title="Geser ke bawah">&darr;</button>
              <button type="button" class="btn btn-danger-outline btn-sm" style="min-height:28px;padding:2px 8px;" onclick="KopyEditor.removeParagraph(${idx})" title="Hapus paragraf">&times;</button>
            </div>
          </div>
          <textarea class="form-control para-textarea" data-idx="${idx}" rows="3">${esc(p)}</textarea>
        </div>
      `
      )
      .join('');

    mount.innerHTML = `
      <div class="card no-print" style="margin-bottom:16px;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px;">
          <div>
            <span class="badge badge-green">Preview Kertas A4 & Editor Dokumen</span>
            <h2 style="margin:6px 0 2px;font-size:1.2rem;">${esc(activeDoc.docName)}</h2>
            <p class="form-help" style="margin:0;">Perubahan pada editor tidak menimpa data asli secara paksa dan langsung tampil pada lembar A4.</p>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-outline btn-sm" onclick="KopyNavigation.setCreateStep(2)">&larr; Kembali ke Formulir</button>
            <button type="button" class="btn btn-primary btn-sm" id="btnSaveDocumentArchive">Simpan ke Arsip</button>
            <button type="button" class="btn btn-soft btn-sm" onclick="KopyPrinting.printCurrentDocument()">Cetak / Simpan PDF</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="KopyPrinting.copyCurrentText()">Salin Teks</button>
            <button type="button" class="btn btn-outline btn-sm" onclick="KopyPrinting.shareCurrentSummary()">Bagikan</button>
          </div>
        </div>
      </div>

      ${legalNotice}
      <div id="editorUnfilledVarWarning" class="alert-box alert-warning no-print" style="display:none;"></div>

      <div class="editor-workspace">
        <div class="editor-controls-panel no-print">
          <h3 class="section-heading" style="margin-bottom:10px;">Panel Edit Dokumen</h3>

          <div class="form-group">
            <label class="form-label">Nama Dokumen (untuk Arsip)</label>
            <input type="text" id="ed_docName" class="form-control" value="${esc(activeDoc.docName)}">
          </div>

          <div class="form-group">
            <label class="form-label">Judul / Perihal Surat</label>
            <input type="text" id="ed_titleOrSubject" class="form-control"
              value="${esc(activeDoc.docLayout === 'surat_judul_tengah' ? activeDoc.letterTitle : activeDoc.subject)}">
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nomor Surat</label>
              <input type="text" id="ed_letterNumber" class="form-control" value="${esc(activeDoc.letterNumber)}">
            </div>
            <div class="form-group">
              <label class="form-label">Tempat & Tanggal</label>
              <input type="text" id="ed_placeAndDate" class="form-control" value="${esc(activeDoc.placeAndDate)}">
            </div>
          </div>

          ${
            activeDoc.docLayout !== 'surat_judul_tengah'
              ? `<div class="form-group">
                  <label class="form-label">Tujuan / Penerima Surat</label>
                  <textarea id="ed_recipientBlock" class="form-control" rows="3">${esc(activeDoc.recipientBlock)}</textarea>
                </div>`
              : ''
          }

          <div class="form-group">
            <label class="form-label">Sesuaikan Gaya Bahasa Pembuka & Penutup</label>
            <select id="ed_tonePreset" class="form-control">
              <option value="formal" ${activeDoc.tone === 'formal' ? 'selected' : ''}>Formal Resmi</option>
              <option value="formal_sederhana" ${activeDoc.tone === 'formal_sederhana' ? 'selected' : ''}>Formal Sederhana</option>
              <option value="profesional" ${activeDoc.tone === 'profesional' ? 'selected' : ''}>Profesional Bisnis</option>
              <option value="sopan_ramah" ${activeDoc.tone === 'sopan_ramah' ? 'selected' : ''}>Sopan dan Ramah</option>
            </select>
          </div>

          ${
            activeDoc.docLayout !== 'surat_judul_tengah'
              ? `<div class="form-group">
                  <label class="form-label">Salam Pembuka</label>
                  <input type="text" id="ed_opening" class="form-control" value="${esc(activeDoc.opening)}">
                </div>`
              : ''
          }

          <div class="form-group">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <label class="form-label" style="margin:0;">Paragraf Isi Surat</label>
              <button type="button" class="btn btn-soft btn-sm" onclick="KopyEditor.addParagraph()">+ Paragraf</button>
            </div>
            <div id="paragraphEditorsList">${paraEditorsHTML}</div>
          </div>

          ${
            activeDoc.docLayout !== 'surat_judul_tengah'
              ? `<div class="form-group">
                  <label class="form-label">Kalimat Penutup</label>
                  <textarea id="ed_closing" class="form-control" rows="2">${esc(activeDoc.closing)}</textarea>
                </div>`
              : ''
          }

          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nama Penandatangan</label>
              <input type="text" id="ed_signerName" class="form-control" value="${esc(activeDoc.signerName)}">
            </div>
            <div class="form-group">
              <label class="form-label">Jabatan Penandatangan</label>
              <input type="text" id="ed_signerTitle" class="form-control" value="${esc(activeDoc.signerTitle)}">
            </div>
          </div>

          ${
            activeDoc.signerImage
              ? `<div class="form-group">
                  <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.88rem;">
                    <input type="checkbox" id="ed_useSignerImage" ${activeDoc.useSignerImage ? 'checked' : ''}>
                    Tampilkan gambar tanda tangan tersimpan
                  </label>
                </div>`
              : ''
          }

          <div class="form-group">
            <label class="form-label">Daftar Lampiran Tambahan (Opsional)</label>
            <textarea id="ed_attachmentsList" class="form-control" rows="2" placeholder="Contoh: 1. Fotokopi KTP&#10;2. Rincian Anggaran">${esc(activeDoc.attachmentsList || '')}</textarea>
          </div>

          <button type="button" class="btn btn-primary" style="width:100%;" onclick="KopyEditor.saveCurrentDocument()">
            Simpan Dokumen ke Arsip
          </button>
        </div>

        <div>
          <div class="alert-box no-print" style="margin-bottom:10px;font-size:0.82rem;">
            <strong>Tips Cetak di HP Android:</strong> Tekan <em>Cetak / Simpan PDF</em>, lalu pada layar pratinjau cetak Android pilih printer <strong>Simpan sebagai PDF (Save as PDF)</strong> dan ukuran kertas <strong>ISO A4</strong>.
          </div>
          <div class="a4-viewport" id="a4PreviewMount"></div>
        </div>
      </div>
    `;

    bindEditorEvents();
    await refreshPreviewOnly();
  }

  function bindEditorEvents() {
    const bindInput = (id, handler) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          handler(el);
          refreshPreviewOnly();
        });
      }
    };

    bindInput('ed_docName', (el) => { activeDoc.docName = el.value; });
    bindInput('ed_titleOrSubject', (el) => {
      if (activeDoc.docLayout === 'surat_judul_tengah') {
        activeDoc.letterTitle = el.value;
      } else {
        activeDoc.subject = el.value;
      }
    });
    bindInput('ed_letterNumber', (el) => { activeDoc.letterNumber = el.value; });
    bindInput('ed_placeAndDate', (el) => { activeDoc.placeAndDate = el.value; });
    bindInput('ed_recipientBlock', (el) => { activeDoc.recipientBlock = el.value; });
    bindInput('ed_opening', (el) => { activeDoc.opening = el.value; });
    bindInput('ed_closing', (el) => { activeDoc.closing = el.value; });
    bindInput('ed_signerName', (el) => { activeDoc.signerName = el.value; });
    bindInput('ed_signerTitle', (el) => { activeDoc.signerTitle = el.value; });
    bindInput('ed_attachmentsList', (el) => { activeDoc.attachmentsList = el.value; });

    const useSigCb = document.getElementById('ed_useSignerImage');
    if (useSigCb) {
      useSigCb.addEventListener('change', () => {
        activeDoc.useSignerImage = useSigCb.checked;
        refreshPreviewOnly();
      });
    }

    const toneSel = document.getElementById('ed_tonePreset');
    if (toneSel) {
      toneSel.addEventListener('change', () => {
        const preset = KopyTemplates.TONE_PRESETS[toneSel.value];
        if (preset && activeDoc.docLayout !== 'surat_judul_tengah') {
          activeDoc.tone = toneSel.value;
          activeDoc.opening = preset.opening;
          activeDoc.closing = preset.closing;
          const opEl = document.getElementById('ed_opening');
          const clEl = document.getElementById('ed_closing');
          if (opEl) opEl.value = preset.opening;
          if (clEl) clEl.value = preset.closing;
          refreshPreviewOnly();
        }
      });
    }

    document.querySelectorAll('.para-textarea').forEach((ta) => {
      ta.addEventListener('input', () => {
        const idx = parseInt(ta.getAttribute('data-idx'), 10);
        if (!isNaN(idx) && activeDoc.paragraphs[idx] !== undefined) {
          activeDoc.paragraphs[idx] = ta.value;
          refreshPreviewOnly();
        }
      });
    });

    const saveTopBtn = document.getElementById('btnSaveDocumentArchive');
    if (saveTopBtn) {
      saveTopBtn.addEventListener('click', saveCurrentDocument);
    }
  }

  async function addParagraph() {
    if (!activeDoc) return;
    activeDoc.paragraphs.push('Tuliskan paragraf tambahan di sini...');
    await loadDocument(activeDoc);
  }

  async function removeParagraph(idx) {
    if (!activeDoc || activeDoc.paragraphs.length <= 1) {
      KopyApp.showToast('Minimal harus ada 1 paragraf isi surat.', 'warning');
      return;
    }
    activeDoc.paragraphs.splice(idx, 1);
    await loadDocument(activeDoc);
  }

  async function moveParagraph(idx, delta) {
    if (!activeDoc) return;
    const target = idx + delta;
    if (target < 0 || target >= activeDoc.paragraphs.length) return;
    const temp = activeDoc.paragraphs[idx];
    activeDoc.paragraphs[idx] = activeDoc.paragraphs[target];
    activeDoc.paragraphs[target] = temp;
    await loadDocument(activeDoc);
  }

  async function saveCurrentDocument() {
    if (!activeDoc) return;
    activeDoc.updatedAt = new Date().toISOString();
    await KopyStorage.put('documents', activeDoc);

    if (activeDoc.letterNumber && activeDoc.letterNumber.trim()) {
      await KopyNumbering.recordUsedNumber({
        docId: activeDoc.id,
        orgId: activeDoc.orgId || 'general',
        number: activeDoc.letterNumber,
        dateStr: activeDoc.rawFormValues ? activeDoc.rawFormValues.tanggal_surat : activeDoc.createdAt
      });
    }

    KopyApp.showToast('Dokumen berhasil disimpan ke Arsip Dokumen.');
    if (window.KopyApp && window.KopyApp.refreshHomeDashboard) {
      await window.KopyApp.refreshHomeDashboard();
    }
  }

  return {
    getActiveDocument,
    renderA4HTML,
    loadDocument,
    addParagraph,
    removeParagraph,
    moveParagraph,
    saveCurrentDocument
  };
})();
