/* ==========================================================================
   KOPY SuratKu — Main Application Controller (app.js)
   Inisialisasi Aplikasi, PWA Service Worker, UI Organisasi, Kop Surat,
   Penandatangan, Template Kustom & Dashboard Beranda
   ========================================================================== */

window.KopyApp = (function () {
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 220);
    }, 3400);
  }

  async function registerPWA() {
    const statusBadge = document.getElementById('pwaStatusBanner');
    const isFileProtocol = window.location.protocol === 'file:';

    if (isFileProtocol) {
      if (statusBadge) {
        statusBadge.innerHTML = `
          <div class="alert-box alert-warning" style="margin-bottom:14px;">
            <strong>Mode File Lokal (file://):</strong> Anda membuka aplikasi langsung dari File Manager. Seluruh fitur pembuatan surat, penyimpanan lokal, dan cetak tetap berfungsi normal, namun browser membatasi fitur <em>Service Worker Offline Cache</em> dan <em>Instal PWA</em> kecuali dijalankan melalui <strong>HTTPS (seperti GitHub Pages)</strong> atau <strong>http://localhost</strong>.
          </div>
        `;
      }
      return;
    }

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('./service-worker.js');
        if (statusBadge) {
          statusBadge.innerHTML = `
            <div class="alert-box alert-success" style="margin-bottom:14px;">
              <strong>Siap Offline (PWA Aktif):</strong> Aplikasi telah di-cache di perangkat Anda (${esc(reg.scope)}) sehingga tetap dapat dibuka dan digunakan meskipun koneksi internet dimatikan.
            </div>
          `;
        }
      } catch (err) {
        if (statusBadge) {
          statusBadge.innerHTML = `
            <div class="alert-box alert-warning" style="margin-bottom:14px;">
              <strong>Catatan Offline:</strong> Service Worker belum aktif (${esc(err.message)}). Pastikan diakses lewat HTTPS atau localhost.
            </div>
          `;
        }
      }
    }
  }

  async function refreshActiveOrgUI() {
    const activeOrg = await KopyOrganization.getActiveOrganization();
    const sidebarOrgName = document.getElementById('sidebarActiveOrgName');
    const homeOrgName = document.getElementById('homeActiveOrgName');
    const homeOrgMeta = document.getElementById('homeActiveOrgMeta');

    if (sidebarOrgName) {
      sidebarOrgName.textContent = activeOrg ? activeOrg.name : 'Belum dipilih (Mode Umum)';
    }
    if (homeOrgName) {
      homeOrgName.textContent = activeOrg ? activeOrg.name : 'Mode Umum / Pribadi';
    }
    if (homeOrgMeta) {
      homeOrgMeta.textContent = activeOrg
        ? `${activeOrg.shortCode} • ${activeOrg.city || 'Indonesia'}`
        : 'Tambah profil organisasi di menu Organisasi Saya';
    }
  }

  async function refreshHomeDashboard() {
    await refreshActiveOrgUI();
    const docs = await KopyStorage.getAll('documents');
    const allTemplates = await KopyTemplates.getAllTemplates();
    const categories = KopyTemplates.getCategories();

    const savedCountEl = document.getElementById('homeSavedDocsCount');
    if (savedCountEl) savedCountEl.textContent = String(docs.length);

    const tplCountEl = document.getElementById('homeTemplatesCount');
    if (tplCountEl) tplCountEl.textContent = `${allTemplates.length} Template`;

    // Kategori grid di beranda
    const catGridEl = document.getElementById('homeCategoryGrid');
    if (catGridEl) {
      catGridEl.innerHTML = categories
        .map((c) => {
          const cnt = allTemplates.filter((t) => t.category === c.id).length;
          return `
            <button type="button" class="category-card" onclick="KopyNavigation.navigateTo('semua-template'); KopySearch.setCategory('${c.id}');">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span class="badge badge-green">Kategori ${c.id}</span>
                <span style="font-size:0.78rem;font-weight:700;color:var(--primary);">${cnt} surat</span>
              </div>
              <div class="category-card-title">${esc(c.name)}</div>
              <div class="category-card-desc">${esc(c.desc)}</div>
            </button>
          `;
        })
        .join('');
    }

    // Dokumen terakhir di beranda
    const recentEl = document.getElementById('homeRecentDocsList');
    if (recentEl) {
      const sorted = [...docs].sort(
        (a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)
      );
      const recent = sorted.slice(0, 4);
      if (recent.length === 0) {
        recentEl.innerHTML = `
          <div class="empty-state">
            <p style="margin-bottom:8px;">Belum ada dokumen surat yang disimpan di perangkat ini.</p>
            <button type="button" class="btn btn-primary btn-sm" onclick="KopyNavigation.navigateTo('buat-surat')">Mulai Buat Surat Pertama</button>
          </div>
        `;
      } else {
        recentEl.innerHTML = recent
          .map(
            (d) => `
            <div class="item-row">
              <div>
                <strong>${esc(d.docName)}</strong>
                <div style="font-size:0.8rem;color:var(--text-secondary);">
                  ${esc(d.orgName || 'Umum')} &bull; Nomor: ${esc(d.letterNumber || '-')}
                </div>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-soft btn-sm" onclick="KopyArchive.openPreviewModal('${esc(d.id)}')">Preview</button>
                <button type="button" class="btn btn-primary btn-sm" onclick="KopyArchive.editDocument('${esc(d.id)}')">Buka & Edit</button>
              </div>
            </div>
          `
          )
          .join('');
      }
    }
  }

  // ==========================================================================
  // Manajemen Profil Organisasi & Penandatangan UI
  // ==========================================================================
  let pendingOrgLogoDataUrl = '';

  async function renderOrganizationsView() {
    const orgs = await KopyOrganization.listOrganizations();
    const activeOrg = await KopyOrganization.getActiveOrganization();
    const listEl = document.getElementById('organizationsListContainer');

    if (listEl) {
      if (orgs.length === 0) {
        listEl.innerHTML = `<div class="empty-state">Belum ada profil organisasi. Tambahkan profil RT/RW, Karang Taruna, Yayasan, Sekolah, atau UMKM Anda di atas.</div>`;
      } else {
        listEl.innerHTML = orgs
          .map((o) => {
            const isActive = activeOrg && activeOrg.id === o.id;
            return `
              <div class="item-row">
                <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:230px;">
                  ${
                    o.logoDataUrl
                      ? `<img src="${o.logoDataUrl}" alt="Logo" style="width:48px;height:48px;object-fit:contain;border-radius:8px;border:1px solid var(--border-color);background:#fff;padding:2px;">`
                      : `<div style="width:48px;height:48px;border-radius:8px;background:var(--primary-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-weight:800;">${esc((o.shortCode || 'ORG').slice(0, 4))}</div>`
                  }
                  <div>
                    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                      <strong>${esc(o.name)}</strong>
                      <span class="badge">${esc(o.shortCode)}</span>
                      ${isActive ? '<span class="badge badge-green">Profil Aktif</span>' : ''}
                    </div>
                    <div style="font-size:0.82rem;color:var(--text-secondary);">${esc(o.address)}</div>
                    <div style="font-size:0.78rem;color:var(--text-muted);">Ketua: ${esc(o.chairman || '-')} | Sekretaris: ${esc(o.secretary || '-')}</div>
                  </div>
                </div>
                <div class="btn-group">
                  ${!isActive ? `<button type="button" class="btn btn-soft btn-sm" onclick="KopyApp.activateOrg('${esc(o.id)}')">Jadikan Aktif</button>` : ''}
                  <button type="button" class="btn btn-outline btn-sm" onclick="KopyApp.editOrgForm('${esc(o.id)}')">Edit</button>
                  <button type="button" class="btn btn-outline btn-sm" onclick="KopyApp.duplicateOrg('${esc(o.id)}')">Duplikasi</button>
                  <button type="button" class="btn btn-danger-outline btn-sm" onclick="KopyApp.deleteOrg('${esc(o.id)}')">Hapus</button>
                </div>
              </div>
            `;
          })
          .join('');
      }
    }

    await renderSignatoriesSection();
  }

  async function editOrgForm(orgId) {
    const org = await KopyStorage.getById('organizations', orgId);
    if (!org) return;
    document.getElementById('org_id').value = org.id;
    document.getElementById('org_name').value = org.name;
    document.getElementById('org_shortCode').value = org.shortCode;
    document.getElementById('org_city').value = org.city || '';
    document.getElementById('org_address').value = org.address;
    document.getElementById('org_phone').value = org.phone || '';
    document.getElementById('org_email').value = org.email || '';
    document.getElementById('org_website').value = org.website || '';
    document.getElementById('org_regNumber').value = org.regNumber || '';
    document.getElementById('org_chairman').value = org.chairman || '';
    document.getElementById('org_secretary').value = org.secretary || '';
    document.getElementById('org_treasurer').value = org.treasurer || '';
    document.getElementById('org_boardMembers').value = org.boardMembers || '';
    document.getElementById('org_defaultSignerTitle').value = org.defaultSignerTitle || '';
    pendingOrgLogoDataUrl = org.logoDataUrl || '';

    const prev = document.getElementById('orgLogoPreviewBox');
    if (prev) {
      prev.innerHTML = pendingOrgLogoDataUrl
        ? `<img src="${pendingOrgLogoDataUrl}" alt="Preview Logo" style="max-height:64px;border-radius:6px;border:1px solid var(--border-color);padding:3px;background:#fff;">`
        : '<span class="form-help">Belum ada logo dipilih.</span>';
    }
    document.getElementById('orgFormCard').scrollIntoView({ behavior: 'smooth' });
  }

  function resetOrgForm() {
    document.getElementById('organizationForm')?.reset();
    document.getElementById('org_id').value = '';
    pendingOrgLogoDataUrl = '';
    const prev = document.getElementById('orgLogoPreviewBox');
    if (prev) prev.innerHTML = '<span class="form-help">Belum ada logo dipilih.</span>';
  }

  async function activateOrg(orgId) {
    await KopyOrganization.setActiveOrganization(orgId);
    await renderOrganizationsView();
    showToast('Profil organisasi aktif diperbarui.');
  }

  async function duplicateOrg(orgId) {
    await KopyOrganization.duplicateOrganization(orgId);
    await renderOrganizationsView();
    showToast('Profil organisasi berhasil diduplikasi.');
  }

  async function deleteOrg(orgId) {
    if (!confirm('Hapus profil organisasi ini? Dokumen yang sudah tersimpan di arsip tidak akan terhapus.')) return;
    await KopyOrganization.deleteOrganization(orgId);
    await renderOrganizationsView();
    await refreshActiveOrgUI();
    showToast('Profil organisasi dihapus.');
  }

  // Penandatangan UI
  let pendingSigDataUrl = '';

  async function renderSignatoriesSection() {
    const orgs = await KopyOrganization.listOrganizations();
    const sigOrgSel = document.getElementById('sig_orgId');
    if (sigOrgSel) {
      sigOrgSel.innerHTML =
        `<option value="">-- Umum / Semua Organisasi --</option>` +
        orgs.map((o) => `<option value="${esc(o.id)}">${esc(o.name)}</option>`).join('');
    }

    const sigs = await KopySignatory.listSignatories();
    const listEl = document.getElementById('signatoriesListContainer');
    if (!listEl) return;

    if (sigs.length === 0) {
      listEl.innerHTML = `<div class="empty-state">Belum ada data penandatangan tersimpan.</div>`;
      return;
    }

    listEl.innerHTML = sigs
      .map((s) => {
        const org = orgs.find((o) => o.id === s.orgId);
        return `
          <div class="item-row">
            <div style="display:flex;align-items:center;gap:12px;">
              ${
                s.signatureDataUrl
                  ? `<img src="${s.signatureDataUrl}" alt="TTD" style="height:42px;width:84px;object-fit:contain;background:#fff;border:1px solid var(--border-color);border-radius:6px;padding:2px;">`
                  : `<span class="badge">Tanpa Gambar TTD</span>`
              }
              <div>
                <strong>${esc(s.name)}</strong>
                <div style="font-size:0.82rem;color:var(--text-secondary);">${esc(s.title)} &bull; ${esc(org ? org.name : 'Umum')}</div>
              </div>
            </div>
            <button type="button" class="btn btn-danger-outline btn-sm" onclick="KopyApp.deleteSignatoryItem('${esc(s.id)}')">Hapus</button>
          </div>
        `;
      })
      .join('');
  }

  async function deleteSignatoryItem(id) {
    if (!confirm('Hapus data penandatangan ini?')) return;
    await KopySignatory.deleteSignatory(id);
    await renderSignatoriesSection();
    showToast('Data penandatangan dihapus.');
  }

  // ==========================================================================
  // Pembuat Kop Surat UI (letterhead)
  // ==========================================================================
  let pendingLhLogoDataUrl = '';

  function getCurrentLetterheadDraft() {
    return {
      id: document.getElementById('lh_id')?.value || '',
      title: document.getElementById('lh_title')?.value || 'Kop Surat Baru',
      orgId: document.getElementById('lh_orgId')?.value || '',
      orgName: document.getElementById('lh_orgName')?.value || 'NAMA ORGANISASI / LEMBAGA',
      subHeader: document.getElementById('lh_subHeader')?.value || '',
      address: document.getElementById('lh_address')?.value || 'Alamat Sekretariat Lengkap',
      phone: document.getElementById('lh_phone')?.value || '',
      email: document.getElementById('lh_email')?.value || '',
      website: document.getElementById('lh_website')?.value || '',
      logoDataUrl: pendingLhLogoDataUrl,
      logoPosition: document.getElementById('lh_logoPosition')?.value || 'left',
      logoSize: document.getElementById('lh_logoSize')?.value || 'medium',
      dividerStyle: document.getElementById('lh_dividerStyle')?.value || 'thick-thin',
      textAlign: document.getElementById('lh_textAlign')?.value || 'center'
    };
  }

  function updateLetterheadLivePreview() {
    const previewEl = document.getElementById('letterheadLivePreview');
    if (!previewEl) return;
    const draft = getCurrentLetterheadDraft();
    previewEl.innerHTML = KopyLetterhead.renderLetterheadHTML(draft);
  }

  async function renderLetterheadsView() {
    const orgs = await KopyOrganization.listOrganizations();
    const lhOrgSel = document.getElementById('lh_orgId');
    if (lhOrgSel) {
      const prev = lhOrgSel.value;
      lhOrgSel.innerHTML =
        `<option value="">-- Pilih Organisasi untuk Isi Otomatis --</option>` +
        orgs.map((o) => `<option value="${esc(o.id)}">${esc(o.name)}</option>`).join('');
      lhOrgSel.value = prev;
    }

    const list = await KopyLetterhead.listLetterheads();
    const listEl = document.getElementById('savedLetterheadsList');
    if (listEl) {
      if (list.length === 0) {
        listEl.innerHTML = `<div class="empty-state">Belum ada desain kop surat tersimpan.</div>`;
      } else {
        listEl.innerHTML = list
          .map(
            (lh) => `
            <div class="item-row">
              <div>
                <strong>${esc(lh.title)}</strong>
                <div style="font-size:0.82rem;color:var(--text-secondary);">${esc(lh.orgName)} &bull; Tata letak logo: ${esc(lh.logoPosition)}</div>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-soft btn-sm" onclick="KopyApp.loadLetterheadToEditor('${esc(lh.id)}')">Edit</button>
                <button type="button" class="btn btn-danger-outline btn-sm" onclick="KopyApp.deleteLetterheadItem('${esc(lh.id)}')">Hapus</button>
              </div>
            </div>
          `
          )
          .join('');
      }
    }

    updateLetterheadLivePreview();
  }

  async function loadLetterheadToEditor(id) {
    const lh = await KopyStorage.getById('letterheads', id);
    if (!lh) return;
    document.getElementById('lh_id').value = lh.id;
    document.getElementById('lh_title').value = lh.title;
    document.getElementById('lh_orgId').value = lh.orgId || '';
    document.getElementById('lh_orgName').value = lh.orgName;
    document.getElementById('lh_subHeader').value = lh.subHeader || '';
    document.getElementById('lh_address').value = lh.address || '';
    document.getElementById('lh_phone').value = lh.phone || '';
    document.getElementById('lh_email').value = lh.email || '';
    document.getElementById('lh_website').value = lh.website || '';
    document.getElementById('lh_logoPosition').value = lh.logoPosition || 'left';
    document.getElementById('lh_logoSize').value = lh.logoSize || 'medium';
    document.getElementById('lh_dividerStyle').value = lh.dividerStyle || 'thick-thin';
    document.getElementById('lh_textAlign').value = lh.textAlign || 'center';
    pendingLhLogoDataUrl = lh.logoDataUrl || '';
    updateLetterheadLivePreview();
    showToast('Desain kop surat dimuat ke editor.');
  }

  async function deleteLetterheadItem(id) {
    if (!confirm('Hapus desain kop surat ini?')) return;
    await KopyLetterhead.deleteLetterhead(id);
    await renderLetterheadsView();
    showToast('Kop surat dihapus.');
  }

  // ==========================================================================
  // Template Kustom Modal
  // ==========================================================================
  async function openCustomTemplateModal(tplId) {
    const modal = document.getElementById('customTemplateModal');
    document.getElementById('ct_id').value = '';
    document.getElementById('ct_name').value = '';
    document.getElementById('ct_category').value = 'A';
    document.getElementById('ct_code').value = 'KST';
    document.getElementById('ct_docLayout').value = 'surat_resmi';
    document.getElementById('ct_description').value = '';
    document.getElementById('ct_bodyText').value =
      'Dengan hormat,

Sehubungan dengan {{perihal}}, bersama surat ini kami menyampaikan kepada {{nama_penerima}} ({{jabatan_penerima}}) bahwa {{isi_surat}}.

Demikian surat ini kami sampaikan. Atas perhatian Bapak/Ibu, kami ucapkan terima kasih.';

    if (tplId) {
      const existing = await KopyStorage.getById('customTemplates', tplId);
      if (existing) {
        document.getElementById('ct_id').value = existing.id;
        document.getElementById('ct_name').value = existing.name;
        document.getElementById('ct_category').value = existing.category;
        document.getElementById('ct_code').value = existing.code;
        document.getElementById('ct_docLayout').value = existing.docLayout || 'surat_resmi';
        document.getElementById('ct_description').value = existing.description;
        document.getElementById('ct_bodyText').value = existing.bodyText || (existing.paragraphs || []).join('

');
      }
    }
    if (modal) modal.classList.add('open');
  }

  function closeCustomTemplateModal() {
    document.getElementById('customTemplateModal')?.classList.remove('open');
  }

  function insertCustomVariable(varTag) {
    const ta = document.getElementById('ct_bodyText');
    if (!ta) return;
    const start = ta.selectionStart || 0;
    const end = ta.selectionEnd || 0;
    ta.value = ta.value.slice(0, start) + varTag + ta.value.slice(end);
    ta.focus();
    ta.selectionStart = ta.selectionEnd = start + varTag.length;
  }

  async function duplicateTemplateToCustom(tplId) {
    const created = await KopyTemplates.duplicateTemplate(tplId);
    if (created) {
      await KopySearch.renderTemplatesCatalog();
      showToast(`Template "${created.name}" berhasil disalin ke Template Kustom.`);
    }
  }

  async function deleteCustomTemplate(tplId) {
    if (!confirm('Hapus template kustom ini?')) return;
    await KopyTemplates.deleteCustomTemplate(tplId);
    await KopySearch.renderTemplatesCatalog();
    showToast('Template kustom dihapus.');
  }

  // ==========================================================================
  // Event Listeners Global
  // ==========================================================================
  function bindGlobalEvents() {
    // Organization form & logo upload
    const orgLogoInput = document.getElementById('org_logoFile');
    if (orgLogoInput) {
      orgLogoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          pendingOrgLogoDataUrl = await KopyOrganization.validateAndCompressImage(file, 320);
          document.getElementById('orgLogoPreviewBox').innerHTML =
            `<img src="${pendingOrgLogoDataUrl}" alt="Preview Logo" style="max-height:64px;border-radius:6px;border:1px solid var(--border-color);padding:3px;background:#fff;">`;
          showToast('Logo organisasi siap disimpan.');
        } catch (err) {
          showToast(err.message, 'error');
          orgLogoInput.value = '';
        }
      });
    }

    const orgForm = document.getElementById('organizationForm');
    if (orgForm) {
      orgForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('org_name').value.trim();
        if (!name) {
          showToast('Nama organisasi wajib diisi.', 'error');
          return;
        }
        await KopyOrganization.saveOrganization({
          id: document.getElementById('org_id').value || undefined,
          name,
          shortCode: document.getElementById('org_shortCode').value,
          city: document.getElementById('org_city').value,
          address: document.getElementById('org_address').value,
          phone: document.getElementById('org_phone').value,
          email: document.getElementById('org_email').value,
          website: document.getElementById('org_website').value,
          regNumber: document.getElementById('org_regNumber').value,
          chairman: document.getElementById('org_chairman').value,
          secretary: document.getElementById('org_secretary').value,
          treasurer: document.getElementById('org_treasurer').value,
          boardMembers: document.getElementById('org_boardMembers').value,
          defaultSignerTitle: document.getElementById('org_defaultSignerTitle').value,
          logoDataUrl: pendingOrgLogoDataUrl
        });
        resetOrgForm();
        await renderOrganizationsView();
        await refreshActiveOrgUI();
        showToast('Profil organisasi berhasil disimpan.');
      });
    }

    // Signatory form & signature image upload
    const sigFileInput = document.getElementById('sig_imageFile');
    if (sigFileInput) {
      sigFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          pendingSigDataUrl = await KopyOrganization.validateAndCompressImage(file, 320);
          showToast('Gambar tanda tangan siap disimpan.');
        } catch (err) {
          showToast(err.message, 'error');
          sigFileInput.value = '';
        }
      });
    }

    const sigForm = document.getElementById('signatoryForm');
    if (sigForm) {
      sigForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('sig_name').value.trim();
        if (!name) {
          showToast('Nama penandatangan wajib diisi.', 'error');
          return;
        }
        await KopySignatory.saveSignatory({
          orgId: document.getElementById('sig_orgId').value,
          name,
          title: document.getElementById('sig_title').value,
          useSignatureImage: document.getElementById('sig_useImage').checked,
          signatureDataUrl: pendingSigDataUrl
        });
        sigForm.reset();
        pendingSigDataUrl = '';
        await renderSignatoriesSection();
        showToast('Data penandatangan berhasil disimpan.');
      });
    }

    // Letterhead form & live preview
    const lhOrgSelect = document.getElementById('lh_orgId');
    if (lhOrgSelect) {
      lhOrgSelect.addEventListener('change', async () => {
        const org = await KopyStorage.getById('organizations', lhOrgSelect.value);
        if (org) {
          document.getElementById('lh_orgName').value = org.name;
          document.getElementById('lh_address').value = org.address;
          document.getElementById('lh_phone').value = org.phone;
          document.getElementById('lh_email').value = org.email;
          document.getElementById('lh_website').value = org.website;
          if (org.logoDataUrl) pendingLhLogoDataUrl = org.logoDataUrl;
          updateLetterheadLivePreview();
        }
      });
    }

    const lhLogoFile = document.getElementById('lh_logoFile');
    if (lhLogoFile) {
      lhLogoFile.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          pendingLhLogoDataUrl = await KopyOrganization.validateAndCompressImage(file, 320);
          updateLetterheadLivePreview();
          showToast('Logo kop surat diperbarui.');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    }

    ['lh_title', 'lh_orgName', 'lh_subHeader', 'lh_address', 'lh_phone', 'lh_email', 'lh_website', 'lh_logoPosition', 'lh_logoSize', 'lh_dividerStyle', 'lh_textAlign'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', updateLetterheadLivePreview);
        el.addEventListener('change', updateLetterheadLivePreview);
      }
    });

    const lhForm = document.getElementById('letterheadForm');
    if (lhForm) {
      lhForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const draft = getCurrentLetterheadDraft();
        if (!draft.orgName.trim()) {
          showToast('Nama organisasi pada kop surat wajib diisi.', 'error');
          return;
        }
        const saved = await KopyLetterhead.saveLetterhead(draft);
        await KopyStorage.saveSettings({ defaultLetterheadId: saved.id });
        document.getElementById('lh_id').value = '';
        await renderLetterheadsView();
        showToast('Desain kop surat berhasil disimpan & dijadikan kop utama.');
      });
    }

    // Custom Template Form
    const ctForm = document.getElementById('customTemplateForm');
    if (ctForm) {
      ctForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('ct_name').value.trim();
        const bodyText = document.getElementById('ct_bodyText').value.trim();
        if (!name || !bodyText) {
          showToast('Nama template dan isi template wajib diisi.', 'error');
          return;
        }
        await KopyTemplates.saveCustomTemplate({
          id: document.getElementById('ct_id').value || undefined,
          name,
          category: document.getElementById('ct_category').value,
          code: document.getElementById('ct_code').value,
          docLayout: document.getElementById('ct_docLayout').value,
          description: document.getElementById('ct_description').value,
          bodyText
        });
        closeCustomTemplateModal();
        await KopySearch.renderTemplatesCatalog();
        await refreshHomeDashboard();
        showToast('Template kustom berhasil disimpan.');
      });
    }

    // Home quick search
    const homeSearch = document.getElementById('homeQuickSearchInput');
    if (homeSearch) {
      homeSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          KopyNavigation.navigateTo('semua-template');
          const catSearch = document.getElementById('catalogSearchInput');
          if (catSearch) catSearch.value = homeSearch.value;
          KopySearch.setQuery(homeSearch.value);
        }
      });
    }
  }

  async function refreshAllViews() {
    const settings = await KopyStorage.getSettings();
    KopySettings.applyTheme(settings.theme);
    await refreshHomeDashboard();
    await KopySearch.renderTemplatesCatalog();
    await renderOrganizationsView();
    await renderLetterheadsView();
    await KopyArchive.renderArchiveView();
    await KopySettings.renderSettingsView();
  }

  async function init() {
    await KopyStorage.openDB();
    await KopyStorage.seedInitialDataIfEmpty();
    const settings = await KopyStorage.getSettings();
    KopySettings.applyTheme(settings.theme);
    bindGlobalEvents();
    await registerPWA();
    await refreshHomeDashboard();
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    showToast,
    refreshActiveOrgUI,
    refreshHomeDashboard,
    refreshAllViews,
    renderOrganizationsView,
    editOrgForm,
    resetOrgForm,
    activateOrg,
    duplicateOrg,
    deleteOrg,
    deleteSignatoryItem,
    renderLetterheadsView,
    loadLetterheadToEditor,
    deleteLetterheadItem,
    openCustomTemplateModal,
    closeCustomTemplateModal,
    insertCustomVariable,
    duplicateTemplateToCustom,
    deleteCustomTemplate
  };
})();
