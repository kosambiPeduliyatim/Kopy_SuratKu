/* ==========================================================================
   KOPY SuratKu — Document Archive & History (archive.js)
   Simpan, Edit, Duplikasi, Hapus, Cari, Filter Kategori/Organisasi/Tanggal,
   Urutkan, Tandai Favorit, Ubah Nama, Lihat Preview & Cetak Ulang
   ========================================================================== */

window.KopyArchive = (function () {
  let modalDoc = null;

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function renderArchiveView() {
    const docs = await KopyStorage.getAll('documents');
    const orgs = await KopyOrganization.listOrganizations();
    const categories = KopyTemplates.getCategories();

    const searchVal = (document.getElementById('archiveSearchInput')?.value || '').trim().toLowerCase();
    const catFilter = document.getElementById('archiveCatFilter')?.value || 'ALL';
    const orgFilter = document.getElementById('archiveOrgFilter')?.value || 'ALL';
    const dateFilter = document.getElementById('archiveDateFilter')?.value || '';
    const sortMode = document.getElementById('archiveSortSelect')?.value || 'newest';
    const favOnly = document.getElementById('archiveFavOnly')?.checked || false;

    // Populate filter dropdowns once if empty
    const catSelect = document.getElementById('archiveCatFilter');
    if (catSelect && catSelect.options.length <= 1) {
      categories.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.id}. ${c.short}`;
        catSelect.appendChild(opt);
      });
    }

    const orgSelect = document.getElementById('archiveOrgFilter');
    if (orgSelect) {
      const prevVal = orgSelect.value;
      orgSelect.innerHTML = `<option value="ALL">Semua Organisasi</option>` +
        orgs.map((o) => `<option value="${esc(o.id)}">${esc(o.name)}</option>`).join('');
      orgSelect.value = prevVal || 'ALL';
    }

    let filtered = docs.filter((d) => {
      if (favOnly && !d.isFavorite) return false;
      if (catFilter !== 'ALL' && d.category !== catFilter) return false;
      if (orgFilter !== 'ALL' && d.orgId !== orgFilter) return false;
      if (dateFilter) {
        const docDate = (d.updatedAt || d.createdAt || '').slice(0, 10);
        if (docDate !== dateFilter) return false;
      }
      if (searchVal) {
        const hay = `${d.docName} ${d.templateName} ${d.letterNumber} ${d.orgName} ${d.subject}`.toLowerCase();
        if (!hay.includes(searchVal)) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      const tA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const tB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return sortMode === 'oldest' ? tA - tB : tB - tA;
    });

    const listContainer = document.getElementById('archiveListContainer');
    if (!listContainer) return;

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state">
          <p style="font-weight:700;margin-bottom:6px;">Belum ada dokumen yang sesuai filter</p>
          <p style="font-size:0.88rem;margin-bottom:14px;">Buat surat baru dari template dan simpan ke arsip untuk mengelolanya di sini.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="KopyNavigation.navigateTo('buat-surat')">Buat Surat Sekarang</button>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = filtered
      .map((doc) => {
        const cat = KopyTemplates.getCategoryById(doc.category);
        const dateLabel = KopyFormGenerator.formatDateIndonesian(
          (doc.updatedAt || doc.createdAt || '').slice(0, 10),
          'ID_LONG'
        );
        return `
          <div class="item-row">
            <div style="flex:1;min-width:230px;">
              <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:4px;">
                <span class="badge badge-green">${esc(cat.short)}</span>
                <span class="badge">${esc(doc.orgName || 'Umum')}</span>
                ${doc.isFavorite ? '<span class="badge badge-amber">&#9733; Favorit</span>' : ''}
              </div>
              <strong style="font-size:1.02rem;display:block;margin-bottom:2px;">${esc(doc.docName)}</strong>
              <div style="font-size:0.82rem;color:var(--text-secondary);">
                Nomor: <strong>${esc(doc.letterNumber || '-')}</strong> &bull; Diperbarui: ${esc(dateLabel)}
              </div>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-outline btn-sm" onclick="KopyArchive.toggleFavorite('${esc(doc.id)}')" title="Tandai Favorit">
                ${doc.isFavorite ? '&#9733;' : '&#9734;'}
              </button>
              <button type="button" class="btn btn-soft btn-sm" onclick="KopyArchive.openPreviewModal('${esc(doc.id)}')">Preview & Cetak</button>
              <button type="button" class="btn btn-primary btn-sm" onclick="KopyArchive.editDocument('${esc(doc.id)}')">Edit</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="KopyArchive.renameDocument('${esc(doc.id)}')">Ubah Nama</button>
              <button type="button" class="btn btn-outline btn-sm" onclick="KopyArchive.duplicateDocument('${esc(doc.id)}')">Duplikasi</button>
              <button type="button" class="btn btn-danger-outline btn-sm" onclick="KopyArchive.deleteDocument('${esc(doc.id)}')">Hapus</button>
            </div>
          </div>
        `;
      })
      .join('');
  }

  async function toggleFavorite(docId) {
    const doc = await KopyStorage.getById('documents', docId);
    if (!doc) return;
    doc.isFavorite = !doc.isFavorite;
    await KopyStorage.put('documents', doc);
    await renderArchiveView();
  }

  async function renameDocument(docId) {
    const doc = await KopyStorage.getById('documents', docId);
    if (!doc) return;
    const newName = prompt('Masukkan nama baru untuk dokumen ini:', doc.docName);
    if (newName && newName.trim()) {
      doc.docName = newName.trim();
      doc.updatedAt = new Date().toISOString();
      await KopyStorage.put('documents', doc);
      await renderArchiveView();
      KopyApp.showToast('Nama dokumen diperbarui.');
    }
  }

  async function duplicateDocument(docId) {
    const doc = await KopyStorage.getById('documents', docId);
    if (!doc) return;
    const copy = Object.assign({}, doc, {
      id: KopyStorage.generateId('doc'),
      docName: `${doc.docName} (Salinan)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await KopyStorage.put('documents', copy);
    await renderArchiveView();
    KopyApp.showToast('Dokumen berhasil diduplikasi.');
  }

  async function deleteDocument(docId) {
    if (!confirm('Apakah Anda yakin ingin menghapus dokumen ini dari arsip? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }
    await KopyStorage.remove('documents', docId);
    await renderArchiveView();
    if (window.KopyApp && window.KopyApp.refreshHomeDashboard) {
      await window.KopyApp.refreshHomeDashboard();
    }
    KopyApp.showToast('Dokumen dihapus dari arsip.');
  }

  async function editDocument(docId) {
    const doc = await KopyStorage.getById('documents', docId);
    if (!doc) return;
    KopyNavigation.navigateTo('buat-surat');
    KopyNavigation.setCreateStep(3);
    await KopyEditor.loadDocument(doc);
  }

  async function openPreviewModal(docId) {
    const doc = await KopyStorage.getById('documents', docId);
    if (!doc) return;
    modalDoc = doc;
    const modal = document.getElementById('archivePreviewModal');
    const titleEl = document.getElementById('archiveModalTitle');
    const bodyEl = document.getElementById('archiveModalBody');
    if (titleEl) titleEl.textContent = doc.docName;
    if (bodyEl) {
      bodyEl.innerHTML = `<div class="a4-viewport">${await KopyEditor.renderA4HTML(doc)}</div>`;
    }
    if (modal) modal.classList.add('open');
  }

  function closePreviewModal() {
    const modal = document.getElementById('archivePreviewModal');
    if (modal) modal.classList.remove('open');
    document.body.classList.remove('printing-archive-modal');
  }

  function printModalDocument() {
    document.body.classList.add('printing-archive-modal');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-archive-modal');
    }, 500);
  }

  function getModalDocument() {
    return modalDoc;
  }

  return {
    renderArchiveView,
    toggleFavorite,
    renameDocument,
    duplicateDocument,
    deleteDocument,
    editDocument,
    openPreviewModal,
    closePreviewModal,
    printModalDocument,
    getModalDocument
  };
})();
