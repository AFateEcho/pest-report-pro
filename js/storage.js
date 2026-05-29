const Storage = {
  key: {
    company: 'prp_company',
    pro: 'prp_pro',
    reports: 'prp_reports',
    quotes: 'prp_quotes',
    chemicals: 'prp_chemicals',
    lang: 'prp_lang'
  },

  getCompany() {
    try {
      return JSON.parse(localStorage.getItem(this.key.company)) || {};
    } catch {
      return {};
    }
  },

  setCompany(data) {
    localStorage.setItem(this.key.company, JSON.stringify(data));
  },

  isPro() {
    return localStorage.getItem(this.key.pro) === 'true';
  },

  setPro(value) {
    localStorage.setItem(this.key.pro, value ? 'true' : 'false');
  },

  getReports() {
    try {
      return JSON.parse(localStorage.getItem(this.key.reports)) || [];
    } catch {
      return [];
    }
  },

  saveReport(report) {
    const reports = this.getReports();
    report.id = report.id || Date.now().toString();
    report.createdAt = report.createdAt || new Date().toISOString();
    const idx = reports.findIndex(r => r.id === report.id);
    if (idx >= 0) reports[idx] = report;
    else reports.unshift(report);
    localStorage.setItem(this.key.reports, JSON.stringify(reports));
    return report;
  },

  deleteReport(id) {
    const reports = this.getReports().filter(r => r.id !== id);
    localStorage.setItem(this.key.reports, JSON.stringify(reports));
  },

  getQuotes() {
    try {
      return JSON.parse(localStorage.getItem(this.key.quotes)) || [];
    } catch {
      return [];
    }
  },

  saveQuote(quote) {
    const quotes = this.getQuotes();
    quote.id = quote.id || Date.now().toString();
    quote.createdAt = quote.createdAt || new Date().toISOString();
    const idx = quotes.findIndex(q => q.id === quote.id);
    if (idx >= 0) quotes[idx] = quote;
    else quotes.unshift(quote);
    localStorage.setItem(this.key.quotes, JSON.stringify(quotes));
    return quote;
  },

  deleteQuote(id) {
    const quotes = this.getQuotes().filter(q => q.id !== id);
    localStorage.setItem(this.key.quotes, JSON.stringify(quotes));
  },

  getChemicals() {
    try {
      return JSON.parse(localStorage.getItem(this.key.chemicals)) || [];
    } catch {
      return [];
    }
  },

  saveChemical(log) {
    const logs = this.getChemicals();
    log.id = log.id || Date.now().toString();
    log.createdAt = log.createdAt || new Date().toISOString();
    const idx = logs.findIndex(l => l.id === log.id);
    if (idx >= 0) logs[idx] = log;
    else logs.unshift(log);
    localStorage.setItem(this.key.chemicals, JSON.stringify(logs));
    return log;
  },

  deleteChemical(id) {
    const logs = this.getChemicals().filter(l => l.id !== id);
    localStorage.setItem(this.key.chemicals, JSON.stringify(logs));
  },

  clearAll() {
    Object.values(this.key).forEach(k => localStorage.removeItem(k));
  },

  getLang() {
    return localStorage.getItem(this.key.lang) || 'en';
  },

  setLang(lang) {
    localStorage.setItem(this.key.lang, lang);
  },

  getNextReportNumber(prefix, date) {
    const key = `prp_seq_${prefix}_${date}`;
    const current = parseInt(localStorage.getItem(key)) || 0;
    const next = current + 1;
    localStorage.setItem(key, next.toString());
    return next.toString().padStart(3, '0');
  }
};
