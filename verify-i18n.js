const fs = require('fs');
const path = require('path');
const dir = path.dirname(__filename);

// Read i18n.js and extract keys for each language
const i18nSrc = fs.readFileSync(path.join(dir, 'js/i18n.js'), 'utf8');
const langs = ['en', 'zh', 'es'];
const langKeys = {};
for (const lang of langs) {
  const match = i18nSrc.match(new RegExp(lang + ':\\s*\\{([\\s\\S]*?)\\n  \\},', 'm'));
  if (!match) { console.log('FAIL: Could not find language block for', lang); process.exit(1); }
  const keys = [...match[1].matchAll(/\\s([a-zA-Z0-9_]+):/g)].map(m => m[1]);
  langKeys[lang] = keys;
}

const enKeys = new Set(langKeys.en);
const zhKeys = new Set(langKeys.zh);
const esKeys = new Set(langKeys.es);

let missing = false;
for (const key of enKeys) {
  if (!zhKeys.has(key)) { console.log('MISSING in zh:', key); missing = true; }
  if (!esKeys.has(key)) { console.log('MISSING in es:', key); missing = true; }
}
for (const key of zhKeys) {
  if (!enKeys.has(key)) { console.log('MISSING in en (from zh):', key); missing = true; }
}
for (const key of esKeys) {
  if (!enKeys.has(key)) { console.log('MISSING in en (from es):', key); missing = true; }
}
if (!missing) console.log('PASS: All translation keys consistent across 3 languages (' + enKeys.size + ' keys each)');

// Check index.html for untranslated visible text
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const untranslated = [];
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('<script') || line.includes('</script>') || line.includes('<style') || line.includes('</style>')) continue;
  const textMatches = [...line.matchAll(/>([^<]{2,})</g)];
  for (const m of textMatches) {
    const text = m[1].trim();
    if (!text) continue;
    if (line.includes('data-i18n')) continue;
    if (/^[$]?\d/.test(text)) continue;
    if (text === 'No Logo') continue;
    if (text.startsWith('PRP-')) continue;
    if (text.includes('@') || text.includes('www.') || text.includes('.com')) continue;
    if (text.length < 3) continue;
    untranslated.push({ line: i+1, text: text.slice(0, 60) });
  }
}
if (untranslated.length > 0) {
  console.log('\nWARN: Potential untranslated text snippets in index.html:');
  untranslated.slice(0, 10).forEach(u => console.log('  Line', u.line + ':', u.text));
} else {
  console.log('PASS: No obvious untranslated text in index.html');
}

// Check app.js for hardcoded toast/alert strings
const appSrc = fs.readFileSync(path.join(dir, 'js/app.js'), 'utf8');
const hardcodedToast = [...appSrc.matchAll(/showToast\((['"'])([^'"']+)\1/g)];
const nonI18nToast = hardcodedToast.filter(m => !m[2].startsWith('I18n.t('));
if (nonI18nToast.length > 0) {
  console.log('\nWARN: Potential hardcoded strings in app.js showToast calls:');
  nonI18nToast.forEach(m => console.log(' ', m[0]));
} else {
  console.log('PASS: All showToast calls use I18n.t() in app.js');
}

// Check pdf-generator.js for hardcoded section titles
const pdfSrc = fs.readFileSync(path.join(dir, 'js/pdf-generator.js'), 'utf8');
const hardcodedTitles = [...pdfSrc.matchAll(/doc\.text\((['"'])([A-Z][A-Z\s&#]+)\1/g)];
const nonI18nTitles = hardcodedTitles.filter(m => !['SR-', 'Q-', 'N/A', 'TO:'].some(s => m[2].includes(s)));
if (nonI18nTitles.length > 0) {
  console.log('\nWARN: Potential hardcoded uppercase strings in pdf-generator.js:');
  nonI18nTitles.forEach(m => console.log(' ', m[0]));
} else {
  console.log('PASS: No obvious hardcoded uppercase titles in pdf-generator.js');
}

console.log('\n--- Verification Summary ---');
console.log('Translation keys:', missing ? 'INCONSISTENT' : 'CONSISTENT');
console.log('HTML text coverage:', untranslated.length > 0 ? 'PARTIAL (' + untranslated.length + ' potential)' : 'COMPLETE');
console.log('app.js i18n usage:', nonI18nToast.length > 0 ? 'INCOMPLETE' : 'COMPLETE');
console.log('pdf-generator.js i18n usage:', nonI18nTitles.length > 0 ? 'INCOMPLETE' : 'COMPLETE');
