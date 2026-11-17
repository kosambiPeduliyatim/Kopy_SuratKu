/* ==========================================================================
   KOPY SuratKu — Local Storage Engine (storage.js)
   IndexedDB (Utama) dengan Fallback Otomatis ke localStorage
   100% Penyimpanan Lokal di Perangkat Pengguna
   ========================================================================== */

window.KopyStorage = (function () {
  const DB_NAME = 'KopySuratKuDB';
  const DB_VERSION = 1;
  const STORES = [
    'organizations',
    'letterheads',
    'signatories',
    'documents',
    'customTemplates',
    'numberingHistory',
    'settings'
  ];

  let dbInstance = null;
  let useFallback = false;

  const DEFAULT_SETTINGS = {
    id: 'app_settings',
    theme: 'light',
    defaultOrgId: 'org_kopy_sample',
    dateFormat: 'ID_LONG', // ID_LONG, DD_MM_YYYY, DD_DASH_MM_YYYY
    docFont: 'times', // times, arial, georgia
    docMargin: 'standard', // standard, compact, wide
    defaultLetterheadId: 'lh_kopy_sample',
    numberingPattern: '{SEQ}/{ORG}/{CODE}/{ROMAN}/{YEAR}',
    numberingDigits: 3,
    numberingReset: 'yearly', // yearly, monthly, continuous
    numberingPrefix: '',
    numberingSuffix: '',
    useRomanMonth: true
  };

  function generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  function openDB() {
    return new Promise((resolve) => {
      if (dbInstance) {
        resolve(dbInstance);
        return;
      }
      if (!('indexedDB' in window)) {
        useFallback = true;
        resolve(null);
        return;
      }
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = function (e) {
          const db = e.target.result;
          STORES.forEach((storeName) => {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id' });
            }
          });
        };
        request.onsuccess = function (e) {
          dbInstance = e.target.result;
          resolve(dbInstance);
        };
        request.onerror = function () {
          useFallback = true;
          resolve(null);
        };
      } catch (err) {
        useFallback = true;
        resolve(null);
      }
    });
  }

  function lsGetStore(storeName) {
    try {
      const raw = localStorage.getItem(`kopy_sk_${storeName}`);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function lsSaveStore(storeName, items) {
    try {
      localStorage.setItem(`kopy_sk_${storeName}`, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Penyimpanan lokal penuh:', e);
      return false;
    }
  }

  async function getAll(storeName) {
    const db = await openDB();
    if (useFallback || !db) {
      return lsGetStore(storeName);
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve(lsGetStore(storeName));
      } catch (e) {
        resolve(lsGetStore(storeName));
      }
    });
  }

  async function getById(storeName, id) {
    const db = await openDB();
    if (useFallback || !db) {
      return lsGetStore(storeName).find((item) => item.id === id) || null;
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });
  }

  async function put(storeName, item) {
    const db = await openDB();
    if (useFallback || !db) {
      const list = lsGetStore(storeName);
      const idx = list.findIndex((x) => x.id === item.id);
      if (idx >= 0) list[idx] = item;
      else list.push(item);
      lsSaveStore(storeName, list);
      return item;
    }
    return new Promise((resolve, reject) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(item);
        req.onsuccess = () => resolve(item);
        req.onerror = (e) => reject(e);
      } catch (e) {
        reject(e);
      }
    });
  }

  async function remove(storeName, id) {
    const db = await openDB();
    if (useFallback || !db) {
      const list = lsGetStore(storeName).filter((x) => x.id !== id);
      lsSaveStore(storeName, list);
      return true;
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }

  async function clearStore(storeName) {
    const db = await openDB();
    if (useFallback || !db) {
      lsSaveStore(storeName, []);
      return true;
    }
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (e) {
        resolve(false);
      }
    });
  }

  async function getSettings() {
    const saved = await getById('settings', 'app_settings');
    return Object.assign({}, DEFAULT_SETTINGS, saved || {});
  }

  async function saveSettings(partial) {
    const current = await getSettings();
    const updated = Object.assign({}, current, partial, { id: 'app_settings' });
    await put('settings', updated);
    return updated;
  }

  async function seedInitialDataIfEmpty() {
    const initialized = localStorage.getItem('kopy_sk_seeded_v1');
    const orgs = await getAll('organizations');
    if (!initialized && orgs.length === 0) {
      const sampleOrg = {
        id: 'org_kopy_sample',
        name: 'KOSAMBI PEDULI YATIM (KOPY)',
        shortCode: 'KOPY',
        city: 'Tangerang',
        address: 'Kosambi Barat, Kec. Kosambi, Kab. Tangerang, Banten',
        phone: '0812-0000-0000',
        email: 'sekretariat@kopypeduli.id',
        website: 'kopy.or.id',
        regNumber: 'SKT-KOMUNITAS-2018',
        chairman: 'Pengurus Ketua KOPY',
        secretary: 'Sekretaris KOPY',
        treasurer: 'Bendahara KOPY',
        boardMembers: 'Ketua: Pengurus Ketua KOPY
Sekretaris: Sekretaris KOPY
Bendahara: Bendahara KOPY',
        defaultSignerTitle: 'Ketua Umum',
        logoDataUrl: '',
        createdAt: new Date().toISOString()
      };
      await put('organizations', sampleOrg);

      const sampleLh = {
        id: 'lh_kopy_sample',
        title: 'Kop Standar KOPY (Contoh)',
        orgId: 'org_kopy_sample',
        orgName: 'KOSAMBI PEDULI YATIM (KOPY)',
        address: 'Kosambi Barat, Kec. Kosambi, Kab. Tangerang, Banten',
        phone: '0812-0000-0000',
        email: 'sekretariat@kopypeduli.id',
        website: 'kopy.or.id',
        logoDataUrl: '',
        logoPosition: 'left',
        logoSize: 'medium',
        dividerStyle: 'thick-thin',
        updatedAt: new Date().toISOString()
      };
      await put('letterheads', sampleLh);

      const sampleSig = {
        id: 'sig_kopy_sample',
        orgId: 'org_kopy_sample',
        name: 'Ketua Pelaksana KOPY',
        title: 'Ketua Pelaksana',
        signatureDataUrl: '',
        createdAt: new Date().toISOString()
      };
      await put('signatories', sampleSig);

      await saveSettings({
        defaultOrgId: 'org_kopy_sample',
        defaultLetterheadId: 'lh_kopy_sample'
      });
      localStorage.setItem('kopy_sk_seeded_v1', 'true');
    }
  }

  async function estimateStorageUsage() {
    let totalBytes = 0;
    const breakdown = {};
    for (const store of STORES) {
      const items = await getAll(store);
      const size = new Blob([JSON.stringify(items)]).size;
      breakdown[store] = { count: items.length, bytes: size };
      totalBytes += size;
    }
    return {
      engine: useFallback ? 'localStorage (Fallback)' : 'IndexedDB (Lokal Perangkat)',
      totalBytes,
      totalKB: (totalBytes / 1024).toFixed(1),
      breakdown
    };
  }

  async function resetAllData() {
    for (const store of STORES) {
      await clearStore(store);
    }
    localStorage.removeItem('kopy_sk_seeded_v1');
    await saveSettings(DEFAULT_SETTINGS);
  }

  return {
    STORES,
    DEFAULT_SETTINGS,
    generateId,
    openDB,
    getAll,
    getById,
    put,
    remove,
    clearStore,
    getSettings,
    saveSettings,
    seedInitialDataIfEmpty,
    estimateStorageUsage,
    resetAllData
  };
})();
