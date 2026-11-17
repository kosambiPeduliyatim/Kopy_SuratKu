/* ==========================================================================
   KOPY SuratKu — Organization Identity Management (organization.js)
   Multi-Profil Organisasi (RT/RW, Karang Taruna, Yayasan, Sekolah, UMKM)
   dengan Kompresi & Validasi Logo Lokal ke IndexedDB
   ========================================================================== */

window.KopyOrganization = (function () {
  const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const MAX_RAW_SIZE_BYTES = 3 * 1024 * 1024; // Maks 3MB sebelum kompresi

  function validateAndCompressImage(file, maxDimension) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('File gambar tidak ditemukan.'));
        return;
      }
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        reject(new Error('Format gambar tidak didukung. Gunakan PNG, JPG, atau WEBP.'));
        return;
      }
      if (file.size > MAX_RAW_SIZE_BYTES) {
        reject(new Error('Ukuran gambar terlalu besar (maksimal 3 MB).'));
        return;
      }

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const limit = maxDimension || 360;

          if (width > limit || height > limit) {
            if (width > height) {
              height = Math.round((height * limit) / width);
              width = limit;
            } else {
              width = Math.round((width * limit) / height);
              height = limit;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          // Gunakan PNG agar transparansi logo/tanda tangan tetap terjaga
          const compressedDataUrl = canvas.toDataURL('image/png', 0.88);
          resolve(compressedDataUrl);
        };
        img.onerror = function () {
          reject(new Error('Gagal memproses file gambar. Pastikan file tidak rusak.'));
        };
        img.src = event.target.result;
      };
      reader.onerror = function () {
        reject(new Error('Gagal membaca file dari galeri perangkat.'));
      };
      reader.readAsDataURL(file);
    });
  }

  async function listOrganizations() {
    const list = await KopyStorage.getAll('organizations');
    return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  async function getActiveOrganization() {
    const settings = await KopyStorage.getSettings();
    const list = await listOrganizations();
    if (list.length === 0) return null;
    const found = list.find((o) => o.id === settings.defaultOrgId);
    return found || list[0];
  }

  async function setActiveOrganization(orgId) {
    await KopyStorage.saveSettings({ defaultOrgId: orgId });
    if (window.KopyApp && window.KopyApp.refreshActiveOrgUI) {
      await window.KopyApp.refreshActiveOrgUI();
    }
  }

  async function saveOrganization(data) {
    const id = data.id || KopyStorage.generateId('org');
    const org = {
      id,
      name: (data.name || '').trim(),
      shortCode: (data.shortCode || 'ORG').trim().toUpperCase(),
      city: (data.city || '').trim(),
      address: (data.address || '').trim(),
      phone: (data.phone || '').trim(),
      email: (data.email || '').trim(),
      website: (data.website || '').trim(),
      regNumber: (data.regNumber || '').trim(),
      chairman: (data.chairman || '').trim(),
      secretary: (data.secretary || '').trim(),
      treasurer: (data.treasurer || '').trim(),
      boardMembers: (data.boardMembers || '').trim(),
      defaultSignerTitle: (data.defaultSignerTitle || 'Ketua').trim(),
      logoDataUrl: data.logoDataUrl || '',
      updatedAt: new Date().toISOString(),
      createdAt: data.createdAt || new Date().toISOString()
    };
    await KopyStorage.put('organizations', org);

    const list = await listOrganizations();
    if (list.length === 1) {
      await setActiveOrganization(org.id);
    }
    return org;
  }

  async function duplicateOrganization(orgId) {
    const source = await KopyStorage.getById('organizations', orgId);
    if (!source) return null;
    const copy = Object.assign({}, source, {
      id: KopyStorage.generateId('org'),
      name: `${source.name} (Salinan)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await KopyStorage.put('organizations', copy);
    return copy;
  }

  async function deleteOrganization(orgId) {
    await KopyStorage.remove('organizations', orgId);
    const settings = await KopyStorage.getSettings();
    if (settings.defaultOrgId === orgId) {
      const remaining = await listOrganizations();
      await KopyStorage.saveSettings({
        defaultOrgId: remaining.length > 0 ? remaining[0].id : ''
      });
    }
  }

  return {
    validateAndCompressImage,
    listOrganizations,
    getActiveOrganization,
    setActiveOrganization,
    saveOrganization,
    duplicateOrganization,
    deleteOrganization
  };
})();
