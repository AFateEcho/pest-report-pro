const Storage = {
  key: {
    company: 'prp_company',
    pro: 'prp_pro',
    reports: 'prp_reports',
    quotes: 'prp_quotes',
    invoices: 'prp_invoices',
    chemicals: 'prp_chemicals',
    customers: 'prp_customers',
    lang: 'prp_lang',
    usedKeys: 'prp_used_keys'
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

  getInvoices() {
    try {
      return JSON.parse(localStorage.getItem(this.key.invoices)) || [];
    } catch {
      return [];
    }
  },

  saveInvoice(invoice) {
    const invoices = this.getInvoices();
    invoice.id = invoice.id || Date.now().toString();
    invoice.createdAt = invoice.createdAt || new Date().toISOString();
    const idx = invoices.findIndex(i => i.id === invoice.id);
    if (idx >= 0) invoices[idx] = invoice;
    else invoices.unshift(invoice);
    localStorage.setItem(this.key.invoices, JSON.stringify(invoices));
    return invoice;
  },

  deleteInvoice(id) {
    const invoices = this.getInvoices().filter(i => i.id !== id);
    localStorage.setItem(this.key.invoices, JSON.stringify(invoices));
  },

  updateReport(id, updates) {
    const reports = this.getReports();
    const idx = reports.findIndex(r => r.id === id);
    if (idx >= 0) {
      reports[idx] = { ...reports[idx], ...updates, id };
      localStorage.setItem(this.key.reports, JSON.stringify(reports));
      return reports[idx];
    }
    return null;
  },

  updateQuote(id, updates) {
    const quotes = this.getQuotes();
    const idx = quotes.findIndex(q => q.id === id);
    if (idx >= 0) {
      quotes[idx] = { ...quotes[idx], ...updates, id };
      localStorage.setItem(this.key.quotes, JSON.stringify(quotes));
      return quotes[idx];
    }
    return null;
  },

  updateInvoice(id, updates) {
    const invoices = this.getInvoices();
    const idx = invoices.findIndex(i => i.id === id);
    if (idx >= 0) {
      invoices[idx] = { ...invoices[idx], ...updates, id };
      localStorage.setItem(this.key.invoices, JSON.stringify(invoices));
      return invoices[idx];
    }
    return null;
  },

  getCustomers() {
    try {
      return JSON.parse(localStorage.getItem(this.key.customers)) || [];
    } catch {
      return [];
    }
  },

  saveCustomer(customer) {
    const customers = this.getCustomers();
    customer.id = customer.id || Date.now().toString();
    customer.createdAt = customer.createdAt || new Date().toISOString();
    const idx = customers.findIndex(c => c.id === customer.id);
    if (idx >= 0) customers[idx] = customer;
    else customers.unshift(customer);
    localStorage.setItem(this.key.customers, JSON.stringify(customers));
    return customer;
  },

  deleteCustomer(id) {
    const customers = this.getCustomers().filter(c => c.id !== id);
    localStorage.setItem(this.key.customers, JSON.stringify(customers));
  },

  updateCustomer(id, updates) {
    const customers = this.getCustomers();
    const idx = customers.findIndex(c => c.id === id);
    if (idx >= 0) {
      customers[idx] = { ...customers[idx], ...updates, id };
      localStorage.setItem(this.key.customers, JSON.stringify(customers));
      return customers[idx];
    }
    return null;
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

  getUsedKeys() {
    try {
      return JSON.parse(localStorage.getItem(this.key.usedKeys)) || [];
    } catch {
      return [];
    }
  },

  addUsedKey(key) {
    const keys = this.getUsedKeys();
    const normalized = key.trim().toUpperCase();
    if (!keys.includes(normalized)) {
      keys.push(normalized);
      localStorage.setItem(this.key.usedKeys, JSON.stringify(keys));
    }
  },

  isKeyUsed(key) {
    return this.getUsedKeys().includes(key.trim().toUpperCase());
  },

  getNextReportNumber(prefix, date) {
    const key = `prp_seq_${prefix}_${date}`;
    const current = parseInt(localStorage.getItem(key)) || 0;
    const next = current + 1;
    localStorage.setItem(key, next.toString());
    return next.toString().padStart(3, '0');
  }
};
