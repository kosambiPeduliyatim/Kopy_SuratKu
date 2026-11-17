/* ==========================================================================
   KOPY SuratKu — Responsive Navigation & Workflow Router (navigation.js)
   ========================================================================== */

window.KopyNavigation = (function () {
  const VALID_VIEWS = [
    'beranda',
    'buat-surat',
    'semua-template',
    'organisasi',
    'arsip',
    'kop-surat',
    'pengaturan',
    'bantuan'
  ];

  let currentView = 'beranda';
  let createStep = 1;

  function navigateTo(viewId) {
    const target = VALID_VIEWS.includes(viewId) ? viewId : 'beranda';
    currentView = target;

    document.querySelectorAll('.view-section').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `view-${target}`);
    });

    document.querySelectorAll('[data-nav-view]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-nav-view') === target);
    });

    closeMobileMoreDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (target === 'beranda') KopyApp.refreshHomeDashboard();
    if (target === 'semua-template') KopySearch.renderTemplatesCatalog();
    if (target === 'buat-surat') renderCreateStep1Catalog();
    if (target === 'organisasi') KopyApp.renderOrganizationsView();
    if (target === 'arsip') KopyArchive.renderArchiveView();
    if (target === 'kop-surat') KopyApp.renderLetterheadsView();
    if (target === 'pengaturan') KopySettings.renderSettingsView();
  }

  function setCreateStep(stepNum) {
    createStep = stepNum;
    [1, 2, 3].forEach((n) => {
      const panel = document.getElementById(`createStepPanel${n}`);
      const pill = document.getElementById(`stepperItem${n}`);
      if (panel) panel.style.display = n === stepNum ? 'block' : 'none';
      if (pill) {
        pill.classList.toggle('active', n === stepNum);
        pill.classList.toggle('done', n < stepNum);
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function renderCreateStep1Catalog() {
    const all = await KopyTemplates.getAllTemplates();
    const cats = KopyTemplates.getCategories();
    const q = (document.getElementById('step1SearchInput')?.value || '').trim().toLowerCase();
    const catFilter = document.getElementById('step1CatSelect')?.value || 'ALL';

    const catSel = document.getElementById('step1CatSelect');
    if (catSel && catSel.options.length <= 1) {
      cats.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = `${c.id}. ${c.name}`;
        catSel.appendChild(opt);
      });
    }

    const filtered = all.filter((t) => {
      if (catFilter !== 'ALL' && t.category !== catFilter) return false;
      if (!q) return true;
      return `${t.name} ${t.description} ${t.keywords || ''}`.toLowerCase().includes(q);
    });

    const listEl = document.getElementById('step1TemplateList');
    if (!listEl) return;

    listEl.innerHTML = filtered
      .map((t) => {
        const cat = KopyTemplates.getCategoryById(t.category);
        return `
          <div class="template-card">
            <div>
              <span class="badge ${t.isCustom ? 'badge-amber' : 'badge-green'}">${t.isCustom ? 'Template Kustom' : `${cat.id}. ${cat.short}`}</span>
              <h3>${t.name}</h3>
              <p>${t.description}</p>
            </div>
            <button type="button" class="btn btn-primary btn-sm" onclick="KopyNavigation.startCreateWithTemplate('${t.id}')">
              Pilih & Isi Formulir &rarr;
            </button>
          </div>
        `;
      })
      .join('');
  }

  async function startCreateWithTemplate(templateId) {
    navigateTo('buat-surat');
    setCreateStep(2);
    await KopyFormGenerator.renderFormForTemplate(templateId);
  }

  function openMobileMoreDrawer() {
    const modal = document.getElementById('mobileMoreModal');
    if (modal) modal.classList.add('open');
  }

  function closeMobileMoreDrawer() {
    const modal = document.getElementById('mobileMoreModal');
    if (modal) modal.classList.remove('open');
  }

  return {
    navigateTo,
    setCreateStep,
    renderCreateStep1Catalog,
    startCreateWithTemplate,
    openMobileMoreDrawer,
    closeMobileMoreDrawer
  };
})();
