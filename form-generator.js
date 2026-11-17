/* ==========================================================================
   KOPY SuratKu — Dynamic Form Generator (form-generator.js)
   Formulir Dinamis Sesuai Jenis Surat, Validasi Kolom Wajib,
   Integrasi Profil Organisasi, Kop Surat, Penomoran & Penandatangan
   ========================================================================== */

window.KopyFormGenerator = (function () {
  let currentTemplate = null;

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDateIndonesian(isoDateStr, formatMode) {
    if (!isoDateStr) return '';
    const d = new Date(isoDateStr);
    if (isNaN(d.getTime())) return isoDateStr;

    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = d.getDate();
    const dayPad = String(day).padStart(2, '0');
    const monthNum = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    if (formatMode === 'DD_MM_YYYY') return `${dayPad}/${monthNum}/${year}`;
    if (formatMode === 'DD_DASH_MM_YYYY') return `${dayPad}-${monthNum}-${year}`;
    return `${day} ${months[d.getMonth()]} ${year}`;
  }

  function getTodayISO() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  async function renderFormForTemplate(templateId, prefillValues) {
    const tpl = await KopyTemplates.getTemplateById(templateId);
    if (!tpl) {
      KopyApp.showToast('Template surat tidak ditemukan.', 'error');
      return;
    }
    currentTemplate = tpl;
    const cat = KopyTemplates.getCategoryById(tpl.category);
    const orgs = await KopyOrganization.listOrganizations();
    const activeOrg = await KopyOrganization.getActiveOrganization();
    const settings = await KopyStorage.getSettings();
    const letterheads = await KopyLetterhead.listLetterheads();
    const activeOrgId = (prefillValues && prefillValues.orgId) || (activeOrg ? activeOrg.id : '');
    const signatories = await KopySignatory.listSignatories(activeOrgId);

    const todayISO = getTodayISO();
    const autoNum = await KopyNumbering.generateNumber({
      orgId: activeOrgId || 'general',
      orgCode: activeOrg ? activeOrg.shortCode : 'ORG',
      letterCode: tpl.code || 'SRT',
      dateStr: todayISO
    });

    const container = document.getElementById('dynamicFormContainer');
    if (!container) return;

    const legalBanner = cat.legalNote
      ? `<div class="alert-box alert-warning"><strong>Perhatian Hukum & Administrasi:</strong> ${esc(cat.legalNote)}</div>`
      : '';

    const orgOptions = [
      `<option value="">-- Tanpa Profil Organisasi (Pribadi / Umum) --</option>`,
      ...orgs.map(
        (o) =>
          `<option value="${esc(o.id)}" ${o.id === activeOrgId ? 'selected' : ''}>${esc(o.name)} (${esc(o.shortCode)})</option>`
      )
    ].join('');

    const lhOptions = [
      `<option value="">-- Tanpa Kop Surat --</option>`,
      ...letterheads.map(
        (lh) =>
          `<option value="${esc(lh.id)}" ${lh.id === settings.defaultLetterheadId ? 'selected' : ''}>${esc(lh.title)} — ${esc(lh.orgName)}</option>`
      )
    ].join('');

    const sigOptions = [
      `<option value="">-- Isi Manual / Pilih Penandatangan Tersimpan --</option>`,
      ...signatories.map(
        (s) =>
          `<option value="${esc(s.id)}">${esc(s.name)} (${esc(s.title)})</option>`
      )
    ].join('');

    const defaultSignerName = (prefillValues && prefillValues.nama_penandatangan) ||
      (signatories[0] ? signatories[0].name : (activeOrg ? activeOrg.chairman : ''));
    const defaultSignerTitle = (prefillValues && prefillValues.jabatan_penandatangan) ||
      (signatories[0] ? signatories[0].title : (activeOrg ? activeOrg.defaultSignerTitle : ''));
    const defaultCity = (prefillValues && prefillValues.tempat_surat) ||
      (activeOrg && activeOrg.city ? activeOrg.city : 'Tangerang');

    const dynamicFieldsHTML = (tpl.fields || [])
      .map((field) => {
        const val =
          prefillValues && prefillValues[field.name] !== undefined
            ? prefillValues[field.name]
            : field.type === 'date' && !field.default
            ? todayISO
            : field.default || '';
        const reqMark = field.required ? '<span class="required-mark">*</span>' : '';
        const fullClass = field.type === 'textarea' ? 'full-width' : '';

        if (field.type === 'textarea') {
          return `
            <div class="form-group ${fullClass}">
              <label class="form-label" for="fld_${esc(field.name)}">${esc(field.label)}${reqMark}</label>
              <textarea id="fld_${esc(field.name)}" name="${esc(field.name)}" class="form-control"
                placeholder="${esc(field.placeholder || '')}" ${field.required ? 'data-required="true"' : ''}>${esc(val)}</textarea>
            </div>
          `;
        }
        if (field.type === 'select') {
          const opts = (field.options || [])
            .map((opt) => `<option value="${esc(opt)}" ${opt === val ? 'selected' : ''}>${esc(opt)}</option>`)
            .join('');
          return `
            <div class="form-group">
              <label class="form-label" for="fld_${esc(field.name)}">${esc(field.label)}${reqMark}</label>
              <select id="fld_${esc(field.name)}" name="${esc(field.name)}" class="form-control" ${field.required ? 'data-required="true"' : ''}>
                ${opts}
              </select>
            </div>
          `;
        }
        return `
          <div class="form-group">
            <label class="form-label" for="fld_${esc(field.name)}">${esc(field.label)}${reqMark}</label>
            <input type="${esc(field.type || 'text')}" id="fld_${esc(field.name)}" name="${esc(field.name)}"
              class="form-control" value="${esc(val)}" placeholder="${esc(field.placeholder || '')}"
              ${field.required ? 'data-required="true"' : ''}>
          </div>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="card">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px;">
          <div>
            <span class="badge badge-green">Kategori ${esc(cat.id)}: ${esc(cat.short)}</span>
            <h2 style="margin:6px 0 4px;font-size:1.25rem;">${esc(tpl.name)}</h2>
            <p class="page-subtitle">${esc(tpl.description)}</p>
          </div>
          <button type="button" class="btn btn-outline btn-sm" onclick="KopyNavigation.setCreateStep(1)">
            &larr; Ganti Template
          </button>
        </div>
        ${legalBanner}
      </div>

      <form id="letterDataForm" novalidate>
        <div class="card">
          <h3 class="section-heading">1. Identitas Organisasi, Kop Surat & Nomor Surat</h3>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label" for="fld_orgId">Profil Organisasi Pengirim</label>
              <select id="fld_orgId" name="orgId" class="form-control">${orgOptions}</select>
              <span class="form-help">Otomatis mengisi kop surat, kota, dan daftar penandatangan.</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="fld_letterheadId">Desain Kop Surat</label>
              <select id="fld_letterheadId" name="letterheadId" class="form-control">${lhOptions}</select>
            </div>

            <div class="form-group">
              <label class="form-label" for="fld_nomor_surat">Nomor Surat</label>
              <div style="display:flex;gap:8px;">
                <input type="text" id="fld_nomor_surat" name="nomor_surat" class="form-control"
                  value="${esc((prefillValues && prefillValues.nomor_surat) || autoNum.number)}"
                  placeholder="Contoh: 001/KOPY/PRM/XI/2026">
                <button type="button" class="btn btn-soft btn-sm" id="btnRegenerateNumber" title="Buat nomor otomatis baru">Auto</button>
              </div>
              <div id="duplicateNumberWarning" class="form-help" style="color:var(--warning);font-weight:600;display:none;">
                Peringatan: Nomor surat ini sudah pernah digunakan pada profil organisasi ini.
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="fld_tempat_surat">Tempat / Kota Surat<span class="required-mark">*</span></label>
              <input type="text" id="fld_tempat_surat" name="tempat_surat" class="form-control"
                value="${esc(defaultCity)}" data-required="true" placeholder="Contoh: Tangerang">
            </div>

            <div class="form-group">
              <label class="form-label" for="fld_tanggal_surat">Tanggal Surat<span class="required-mark">*</span></label>
              <input type="date" id="fld_tanggal_surat" name="tanggal_surat" class="form-control"
                value="${esc((prefillValues && prefillValues.tanggal_surat) || todayISO)}" data-required="true">
            </div>

            <div class="form-group">
              <label class="form-label" for="fld_tone">Gaya Bahasa Surat</label>
              <select id="fld_tone" name="tone" class="form-control">
                <option value="formal">Formal Resmi</option>
                <option value="formal_sederhana">Formal Sederhana</option>
                <option value="profesional">Profesional Bisnis</option>
                <option value="sopan_ramah">Sopan dan Ramah</option>
              </select>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="section-heading">2. Rincian Isi ${esc(tpl.name)}</h3>
          <div class="form-grid">
            ${dynamicFieldsHTML}
          </div>
        </div>

        <div class="card">
          <h3 class="section-heading">3. Penandatangan Dokumen</h3>
          <div class="form-grid">
            <div class="form-group full-width">
              <label class="form-label" for="fld_signatoryId">Pilih dari Daftar Penandatangan Tersimpan</label>
              <select id="fld_signatoryId" name="signatoryId" class="form-control">${sigOptions}</select>
            </div>
            <div class="form-group">
              <label class="form-label" for="fld_nama_penandatangan">Nama Penandatangan<span class="required-mark">*</span></label>
              <input type="text" id="fld_nama_penandatangan" name="nama_penandatangan" class="form-control"
                value="${esc(defaultSignerName)}" data-required="true" placeholder="Nama lengkap penandatangan">
            </div>
            <div class="form-group">
              <label class="form-label" for="fld_jabatan_penandatangan">Jabatan Penandatangan</label>
              <input type="text" id="fld_jabatan_penandatangan" name="jabatan_penandatangan" class="form-control"
                value="${esc(defaultSignerTitle)}" placeholder="Contoh: Ketua Umum / Sekretaris / Pemohon">
            </div>
          </div>
          <p class="form-help" style="margin-bottom:0;">
            Catatan: Gambar tanda tangan bersifat opsional (elemen visual) dan tidak menggantikan tanda tangan elektronik tersertifikasi maupun pengesahan basah apabila diwajibkan instansi.
          </p>
        </div>

        <div id="formValidationBanner" class="alert-box alert-danger" style="display:none;"></div>

        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:16px;">
          <button type="button" class="btn btn-outline" onclick="KopyNavigation.setCreateStep(1)">
            &larr; Kembali Pilih Template
          </button>
          <button type="submit" class="btn btn-primary">
            Lanjut ke Preview & Editor Surat &rarr;
          </button>
        </div>
      </form>
    `;

    bindFormEvents(tpl);
  }

  function bindFormEvents(tpl) {
    const orgSelect = document.getElementById('fld_orgId');
    const lhSelect = document.getElementById('fld_letterheadId');
    const sigSelect = document.getElementById('fld_signatoryId');
    const numInput = document.getElementById('fld_nomor_surat');
    const dateInput = document.getElementById('fld_tanggal_surat');
    const regenBtn = document.getElementById('btnRegenerateNumber');
    const form = document.getElementById('letterDataForm');

    async function verifyDupNumber() {
      const warn = document.getElementById('duplicateNumberWarning');
      if (!warn || !numInput) return;
      const isDup = await KopyNumbering.checkDuplicate(orgSelect ? orgSelect.value : '', numInput.value);
      warn.style.display = isDup ? 'block' : 'none';
    }

    verifyDupNumber();

    if (numInput) {
      numInput.addEventListener('input', verifyDupNumber);
    }

    if (regenBtn) {
      regenBtn.addEventListener('click', async () => {
        const orgId = orgSelect ? orgSelect.value : '';
        const org = orgId ? await KopyStorage.getById('organizations', orgId) : null;
        const generated = await KopyNumbering.generateNumber({
          orgId: orgId || 'general',
          orgCode: org ? org.shortCode : 'ORG',
          letterCode: tpl.code || 'SRT',
          dateStr: dateInput ? dateInput.value : getTodayISO()
        });
        numInput.value = generated.number;
        verifyDupNumber();
        KopyApp.showToast('Nomor surat otomatis diperbarui.');
      });
    }

    if (orgSelect) {
      orgSelect.addEventListener('change', async () => {
        const orgId = orgSelect.value;
        const org = orgId ? await KopyStorage.getById('organizations', orgId) : null;
        if (org) {
          const cityEl = document.getElementById('fld_tempat_surat');
          if (cityEl && org.city) cityEl.value = org.city;

          // Pilih kop surat yang sesuai organisasi jika ada
          const allLh = await KopyLetterhead.listLetterheads();
          const matchingLh = allLh.find((l) => l.orgId === org.id);
          if (matchingLh && lhSelect) lhSelect.value = matchingLh.id;

          // Perbarui dropdown penandatangan
          const sigs = await KopySignatory.listSignatories(org.id);
          if (sigSelect) {
            sigSelect.innerHTML = [
              `<option value="">-- Isi Manual / Pilih Penandatangan Tersimpan --</option>`,
              ...sigs.map((s) => `<option value="${esc(s.id)}">${esc(s.name)} (${esc(s.title)})</option>`)
            ].join('');
          }
          if (sigs[0]) {
            document.getElementById('fld_nama_penandatangan').value = sigs[0].name;
            document.getElementById('fld_jabatan_penandatangan').value = sigs[0].title;
          } else if (org.chairman) {
            document.getElementById('fld_nama_penandatangan').value = org.chairman;
            document.getElementById('fld_jabatan_penandatangan').value = org.defaultSignerTitle || 'Ketua';
          }

          const generated = await KopyNumbering.generateNumber({
            orgId: org.id,
            orgCode: org.shortCode || 'ORG',
            letterCode: tpl.code || 'SRT',
            dateStr: dateInput ? dateInput.value : getTodayISO()
          });
          numInput.value = generated.number;
          verifyDupNumber();
        }
      });
    }

    if (sigSelect) {
      sigSelect.addEventListener('change', async () => {
        const sigId = sigSelect.value;
        if (!sigId) return;
        const sig = await KopyStorage.getById('signatories', sigId);
        if (sig) {
          document.getElementById('fld_nama_penandatangan').value = sig.name;
          document.getElementById('fld_jabatan_penandatangan').value = sig.title;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const banner = document.getElementById('formValidationBanner');
        const requiredEls = form.querySelectorAll('[data-required="true"]');
        const missingLabels = [];

        requiredEls.forEach((el) => {
          el.classList.remove('is-invalid');
          if (!String(el.value || '').trim()) {
            el.classList.add('is-invalid');
            const lbl = form.querySelector(`label[for="${el.id}"]`);
            missingLabels.push(lbl ? lbl.textContent.replace('*', '').trim() : el.name);
          }
        });

        if (missingLabels.length > 0) {
          banner.style.display = 'block';
          banner.innerHTML = `<strong>Data belum lengkap:</strong> Mohon isi kolom wajib berikut: ${esc(missingLabels.join(', '))}.`;
          banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        banner.style.display = 'none';

        const formData = new FormData(form);
        const values = {};
        formData.forEach((val, key) => {
          values[key] = String(val);
        });

        await buildDocumentFromForm(tpl, values);
      });
    }
  }

  function interpolateText(templateStr, varsMap) {
    return String(templateStr || '').replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (full, key) => {
      if (varsMap[key] !== undefined && String(varsMap[key]).trim() !== '') {
        return String(varsMap[key]).trim();
      }
      return full; // Pertahankan tag jika kosong agar terdeteksi peringatan variabel
    });
  }

  async function buildDocumentFromForm(tpl, values) {
    const settings = await KopyStorage.getSettings();
    const org = values.orgId ? await KopyStorage.getById('organizations', values.orgId) : null;
    const lh = values.letterheadId ? await KopyStorage.getById('letterheads', values.letterheadId) : null;
    const sig = values.signatoryId ? await KopyStorage.getById('signatories', values.signatoryId) : null;
    const toneObj = KopyTemplates.TONE_PRESETS[values.tone] || KopyTemplates.TONE_PRESETS.formal;

    const formattedDate = formatDateIndonesian(values.tanggal_surat, settings.dateFormat);

    // Format semua field bertipe tanggal dalam values agar terbaca rapi di badan surat
    const formattedValues = Object.assign({}, values, {
      tanggal: formattedDate,
      nama_organisasi: org ? org.name : '',
      alamat: org ? org.address : '',
      nama_pengirim: values.nama_penandatangan || ''
    });

    (tpl.fields || []).forEach((f) => {
      if (f.type === 'date' && values[f.name]) {
        formattedValues[f.name] = formatDateIndonesian(values[f.name], settings.dateFormat);
      }
    });

    const compiledParagraphs = (tpl.paragraphs || []).map((p) => interpolateText(p, formattedValues));

    let recipientBlock = '';
    if (values.nama_penerima || values.instansi_penerima || values.alamat_tujuan) {
      const lines = ['Kepada Yth.'];
      if (values.nama_penerima) lines.push(values.nama_penerima);
      if (values.instansi_penerima) lines.push(values.instansi_penerima);
      if (values.alamat_tujuan) lines.push(`di ${values.alamat_tujuan}`);
      recipientBlock = lines.join('
');
    }

    const docObj = {
      id: KopyStorage.generateId('doc'),
      docName: `${tpl.name}${values.perihal ? ' - ' + values.perihal : ''}`,
      templateId: tpl.id,
      templateName: tpl.name,
      category: tpl.category,
      docLayout: tpl.docLayout || 'surat_resmi',
      orgId: org ? org.id : '',
      orgName: org ? org.name : 'Pribadi / Umum',
      letterhead: lh || null,
      letterTitle: tpl.name.toUpperCase(),
      letterNumber: values.nomor_surat || '',
      attachment: values.lampiran || '-',
      subject: values.perihal || tpl.name,
      placeAndDate: `${values.tempat_surat || 'Tangerang'}, ${formattedDate}`,
      recipientBlock,
      tone: values.tone || 'formal',
      opening: tpl.docLayout === 'surat_judul_tengah' ? '' : toneObj.opening,
      paragraphs: compiledParagraphs,
      closing: tpl.docLayout === 'surat_judul_tengah' ? '' : toneObj.closing,
      attachmentsList: '',
      signerName: values.nama_penandatangan || '',
      signerTitle: values.jabatan_penandatangan || '',
      signerImage: sig ? sig.signatureDataUrl : '',
      useSignerImage: Boolean(sig && sig.signatureDataUrl),
      rawFormValues: values,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    KopyNavigation.setCreateStep(3);
    await KopyEditor.loadDocument(docObj);
  }

  return {
    formatDateIndonesian,
    getTodayISO,
    renderFormForTemplate
  };
})();
