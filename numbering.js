/* ==========================================================================
   KOPY SuratKu — Automatic Letter Numbering Engine (numbering.js)
   Penomoran Surat Otomatis, Kustomisasi Pola, Reset Tahunan/Bulanan,
   serta Deteksi Duplikasi Nomor per Profil Organisasi
   ========================================================================== */

window.KopyNumbering = (function () {
  const ROMAN_MONTHS = [
    'I', 'II', 'III', 'IV', 'V', 'VI',
    'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
  ];

  function toRomanMonth(monthIndexZeroBased) {
    return ROMAN_MONTHS[monthIndexZeroBased] || 'I';
  }

  function padNumber(num, digits) {
    const d = Math.max(1, Math.min(6, parseInt(digits, 10) || 3));
    return String(num).padStart(d, '0');
  }

  function getPeriodKey(dateObj, resetMode) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    if (resetMode === 'monthly') return `${year}-${month}`;
    if (resetMode === 'yearly') return `${year}`;
    return 'ALL';
  }

  async function getNextSequence(orgId, dateStr, resetMode) {
    const history = await KopyStorage.getAll('numberingHistory');
    const dateObj = dateStr ? new Date(dateStr) : new Date();
    const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;
    const targetPeriod = getPeriodKey(validDate, resetMode);

    const matching = history.filter((entry) => {
      if (entry.orgId !== orgId) return false;
      if (resetMode === 'continuous') return true;
      return entry.periodKey === targetPeriod;
    });

    let maxSeq = 0;
    matching.forEach((entry) => {
      const seq = parseInt(entry.sequence, 10);
      if (!isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    });
    return maxSeq + 1;
  }

  async function generateNumber(options) {
    const settings = await KopyStorage.getSettings();
    const orgId = options.orgId || settings.defaultOrgId || 'general';
    const orgCode = (options.orgCode || 'ORG').trim().toUpperCase();
    const letterCode = (options.letterCode || 'SRT').trim().toUpperCase();
    const dateObj = options.dateStr ? new Date(options.dateStr) : new Date();
    const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;

    const resetMode = options.resetMode || settings.numberingReset || 'yearly';
    const digits = options.digits || settings.numberingDigits || 3;
    const pattern = options.pattern || settings.numberingPattern || '{SEQ}/{ORG}/{CODE}/{ROMAN}/{YEAR}';
    const prefix = options.prefix !== undefined ? options.prefix : (settings.numberingPrefix || '');
    const suffix = options.suffix !== undefined ? options.suffix : (settings.numberingSuffix || '');

    const nextSeq = options.customSequence
      ? parseInt(options.customSequence, 10)
      : await getNextSequence(orgId, validDate.toISOString(), resetMode);

    const seqFormatted = padNumber(nextSeq, digits);
    const romanMonth = toRomanMonth(validDate.getMonth());
    const numMonth = String(validDate.getMonth() + 1).padStart(2, '0');
    const yearStr = String(validDate.getFullYear());

    let built = pattern
      .replace(/\{SEQ\}/g, seqFormatted)
      .replace(/\{ORG\}/g, orgCode)
      .replace(/\{CODE\}/g, letterCode)
      .replace(/\{ROMAN\}/g, romanMonth)
      .replace(/\{MONTH\}/g, numMonth)
      .replace(/\{YEAR\}/g, yearStr);

    const finalNumber = `${prefix}${built}${suffix}`.trim();
    return {
      number: finalNumber,
      sequence: nextSeq,
      periodKey: getPeriodKey(validDate, resetMode)
    };
  }

  async function checkDuplicate(orgId, letterNumber, excludeDocId) {
    if (!letterNumber || !letterNumber.trim()) return false;
    const clean = letterNumber.trim().toLowerCase();
    const history = await KopyStorage.getAll('numberingHistory');
    const docs = await KopyStorage.getAll('documents');

    const inHistory = history.some(
      (h) =>
        h.orgId === orgId &&
        (h.number || '').trim().toLowerCase() === clean &&
        h.docId !== excludeDocId
    );
    const inDocs = docs.some(
      (d) =>
        d.orgId === orgId &&
        (d.letterNumber || '').trim().toLowerCase() === clean &&
        d.id !== excludeDocId
    );
    return inHistory || inDocs;
  }

  async function recordUsedNumber(record) {
    if (!record || !record.number || !record.number.trim()) return null;
    const settings = await KopyStorage.getSettings();
    const dateObj = record.dateStr ? new Date(record.dateStr) : new Date();
    const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;
    const resetMode = settings.numberingReset || 'yearly';

    // Ekstrak nomor urut dari awal string jika ada
    const matchSeq = record.number.trim().match(/^[^\d]*(\d+)/);
    const parsedSeq = matchSeq ? parseInt(matchSeq[1], 10) : 1;

    const entry = {
      id: record.docId ? `num_${record.docId}` : KopyStorage.generateId('num'),
      docId: record.docId || '',
      orgId: record.orgId || 'general',
      number: record.number.trim(),
      sequence: record.sequence || parsedSeq,
      periodKey: getPeriodKey(validDate, resetMode),
      createdAt: new Date().toISOString()
    };
    await KopyStorage.put('numberingHistory', entry);
    return entry;
  }

  return {
    toRomanMonth,
    padNumber,
    generateNumber,
    checkDuplicate,
    recordUsedNumber
  };
})();
