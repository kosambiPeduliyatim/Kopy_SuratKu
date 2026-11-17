/* ==========================================================================
   KOPY SuratKu — Letterhead (Kop Surat) Builder & Renderer (letterhead.js)
   Mendukung Tata Letak Logo Kiri, Logo Tengah, Tanpa Logo, Garis Pembatas,
   dan Penyimpanan Multi-Desain Kop Surat
   ========================================================================== */

window.KopyLetterhead = (function () {
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  async function listLetterheads() {
    return await KopyStorage.getAll('letterheads');
  }

  async function saveLetterhead(data) {
    const id = data.id || KopyStorage.generateId('lh');
    const lh = {
      id,
      title: (data.title || 'Kop Surat Utama').trim(),
      orgId: data.orgId || '',
      orgName: (data.orgName || '').trim(),
      subHeader: (data.subHeader || '').trim(),
      address: (data.address || '').trim(),
      phone: (data.phone || '').trim(),
      email: (data.email || '').trim(),
      website: (data.website || '').trim(),
      logoDataUrl: data.logoDataUrl || '',
      logoPosition: data.logoPosition || 'left', // left, center, none
      logoSize: data.logoSize || 'medium', // small, medium, large
      dividerStyle: data.dividerStyle || 'thick-thin', // double, thick-thin, single, none
      textAlign: data.textAlign || 'center',
      updatedAt: new Date().toISOString()
    };
    await KopyStorage.put('letterheads', lh);
    return lh;
  }

  async function deleteLetterhead(id) {
    await KopyStorage.remove('letterheads', id);
  }

  function renderDividerHTML(style) {
    if (style === 'none') return '';
    if (style === 'double') return '<hr class="kop-divider-double">';
    if (style === 'single') return '<hr class="kop-divider-single">';
    return '<hr class="kop-divider-thick-thin"><hr class="kop-divider-thick-thin-sub">';
  }

  function renderLetterheadHTML(lh) {
    if (!lh || (!lh.orgName && !lh.address)) return '';

    const contactParts = [];
    if (lh.phone) contactParts.push(`Telp/WA: ${esc(lh.phone)}`);
    if (lh.email) contactParts.push(`Email: ${esc(lh.email)}`);
    if (lh.website) contactParts.push(`Web: ${esc(lh.website)}`);
    const contactLine = contactParts.join(' | ');

    const sizeClass = `kop-logo-${lh.logoSize || 'medium'}`;
    const hasLogo = Boolean(lh.logoDataUrl) && lh.logoPosition !== 'none';
    const alignStyle = `text-align: ${esc(lh.textAlign || 'center')};`;

    const textBlock = `
      <div class="kop-text-col" style="${alignStyle}">
        ${lh.subHeader ? `<div style="font-size:10.5pt;font-weight:600;letter-spacing:0.3px;">${esc(lh.subHeader)}</div>` : ''}
        <div class="kop-org-name">${esc(lh.orgName)}</div>
        ${lh.address ? `<div class="kop-org-detail">${esc(lh.address)}</div>` : ''}
        ${contactLine ? `<div class="kop-org-detail">${contactLine}</div>` : ''}
      </div>
    `;

    let inner = '';
    if (hasLogo && lh.logoPosition === 'center') {
      inner = `
        <div class="kop-layout-center">
          <img src="${lh.logoDataUrl}" alt="Logo Organisasi" class="kop-logo-img ${sizeClass}">
          ${textBlock}
        </div>
      `;
    } else if (hasLogo) {
      inner = `
        <div class="kop-layout-left">
          <img src="${lh.logoDataUrl}" alt="Logo Organisasi" class="kop-logo-img ${sizeClass}">
          ${textBlock}
        </div>
      `;
    } else {
      inner = `<div class="kop-layout-none">${textBlock}</div>`;
    }

    return `
      <div class="kop-surat-box">
        ${inner}
        ${renderDividerHTML(lh.dividerStyle)}
      </div>
    `;
  }

  return {
    listLetterheads,
    saveLetterhead,
    deleteLetterhead,
    renderLetterheadHTML
  };
})();
