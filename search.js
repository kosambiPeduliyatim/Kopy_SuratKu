/* ==========================================================================
   KOPY SuratKu — Offline Template Search & Category Filter (search.js)
   ========================================================================== */

window.KopySearch = (function () {
  let selectedCategory = 'ALL';
  let searchQuery = '';

  function setCategory(catId) {
    selectedCategory = catId || 'ALL';
    renderTemplatesCatalog();
  }

  function setQuery(q) {
    searchQuery = String(q || '').trim().toLowerCase();
    renderTemplatesCatalog();
  }

  function matchesQuery(tpl, q) {
    if (!q) return true;
    const cat = KopyTemplates.getCategoryById(tpl.category);
    const haystack = `${tpl.name} ${tpl.description} ${tpl.keywords || ''} ${cat.name} ${cat.short}`.toLowerCase();
    return q.split(/\s+/).every((token) => haystack.includes(token));
  }

  async function renderTemplatesCatalog() {
    const allTemplates = await KopyTemplates.getAllTemplates();
    const categories = KopyTemplates.getCategories();

    // Render Filter Pills
    const pillsEl = document.getElementById('templateCategoryPills');
    if (pillsEl) {
      const pills = [
        `<button type="button" class="filter-pill ${selectedCategory === 'ALL' ? 'active' : ''}" onclick="KopySearch.setCategory('ALL')">Semua (${allTemplates.length})</button>`,
        ...categories.map((c) => {
          const cnt = allTemplates.filter((t) => t.category === c.id).length;
          return `<button type="button" class="filter-pill ${selectedCategory === c.id ? 'active' : ''}" onclick="KopySearch.setCategory('${c.id}')">${c.id}. ${c.short} (${cnt})</button>`;
        }),
        `<button type="button" class="filter-pill ${selectedCategory === 'CUSTOM' ? 'active' : ''}" onclick="KopySearch.setCategory('CUSTOM')">Template Kustom (${allTemplates.filter((t) => t.isCustom).length})</button>`
      ];
      pillsEl.innerHTML = pills.join('');
    }

    // Legal banner jika kategori C dipilih
    const catLegalEl = document.getElementById('templateCategoryLegalBanner');
    if (catLegalEl) {
      const catObj = KopyTemplates.getCategoryById(selectedCategory);
      if (selectedCategory === 'C' && catObj.legalNote) {
        catLegalEl.style.display = 'block';
        catLegalEl.innerHTML = `<strong>Peringatan Kategori RT/RW & Lingkungan:</strong> ${catObj.legalNote}`;
      } else {
        catLegalEl.style.display = 'none';
      }
    }

    const filtered = allTemplates.filter((tpl) => {
      if (selectedCategory === 'CUSTOM' && !tpl.isCustom) return false;
      if (selectedCategory !== 'ALL' && selectedCategory !== 'CUSTOM' && tpl.category !== selectedCategory) return false;
      return matchesQuery(tpl, searchQuery);
    });

    const gridEl = document.getElementById('templatesCatalogGrid');
    const countEl = document.getElementById('templatesResultCount');
    if (countEl) {
      countEl.textContent = `Menampilkan ${filtered.length} template surat`;
    }
    if (!gridEl) return;

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <p style="font-weight:700;margin-bottom:6px;">Template tidak ditemukan</p>
          <p style="font-size:0.88rem;margin-bottom:12px;">Coba kata kunci lain (contoh: "permohonan dana", "undangan", "domisili", "tagihan") atau buat template kustom Anda sendiri.</p>
          <button type="button" class="btn btn-primary btn-sm" onclick="KopyApp.openCustomTemplateModal()">+ Buat Template Kustom</button>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered
      .map((tpl) => {
        const cat = KopyTemplates.getCategoryById(tpl.category);
        const customActions = tpl.isCustom
          ? `
            <button type="button" class="btn btn-outline btn-sm" onclick="KopyApp.openCustomTemplateModal('${tpl.id}')">Edit</button>
            <button type="button" class="btn btn-danger-outline btn-sm" onclick="KopyApp.deleteCustomTemplate('${tpl.id}')">Hapus</button>
          `
          : `<button type="button" class="btn btn-outline btn-sm" onclick="KopyApp.duplicateTemplateToCustom('${tpl.id}')">Duplikasi</button>`;

        return `
          <div class="template-card">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
                <span class="badge ${tpl.isCustom ? 'badge-amber' : 'badge-green'}">
                  ${tpl.isCustom ? 'Kustom' : `${cat.id}. ${cat.short}`}
                </span>
                <span style="font-size:0.74rem;color:var(--text-muted);">${tpl.code}</span>
              </div>
              <h3>${tpl.name}</h3>
              <p>${tpl.description}</p>
            </div>
            <div class="btn-group" style="margin-top:6px;">
              <button type="button" class="btn btn-primary btn-sm" style="flex:1;" onclick="KopyNavigation.startCreateWithTemplate('${tpl.id}')">
                Gunakan Template
              </button>
              ${customActions}
            </div>
          </div>
        `;
      })
      .join('');
  }

  return {
    setCategory,
    setQuery,
    renderTemplatesCatalog
  };
})();
