const App = {
  currentView: 'dashboard',
  signaturePad: null,
  clientSignaturePad: null,
  isPro: false,

  init() {
    this.isPro = false; // Storage.isPro();
    I18n.init();
    this.bindEvents();
    this.renderNav();
    this.loadCompanySettings();
    this.showView('dashboard');
    this.checkInstallPrompt();
    this.initAnimations();

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
  },

  initAnimations() {
    // Add press feedback to all buttons
    document.querySelectorAll('button, .nav-item, .btn-generate, .btn-primary, .btn-secondary').forEach(el => {
      el.classList.add('btn-feedback');
    });

    // Add hover lift to cards
    document.querySelectorAll('.card').forEach(el => {
      el.classList.add('card-hover');
    });
  },

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', (e) => {
        const view = el.dataset.view;
        if (view === 'quote' && !this.isPro) { this.showUnlock(); return; }
        if (view === 'chemical-log' && !this.isPro) { this.showUnlock(); return; }
        this.showView(view);
      });
    });

    document.getElementById('unlock-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.verifyLicense();
    });

    // Mobile menu toggle
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('hidden', !isOpen);
    });

    // Company settings form
    document.getElementById('company-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveCompanySettings();
    });

    // Logo upload
    document.getElementById('logo-input')?.addEventListener('change', (e) => {
      this.handleFileUpload(e.target.files[0], 'logo-preview', 'logo-data');
    });

    // Signature clear (settings)
    document.getElementById('clear-signature')?.addEventListener('click', () => {
      this.signaturePad?.clear();
    });

    // Client signature clear
    document.getElementById('clear-client-signature')?.addEventListener('click', () => {
      this.clientSignaturePad?.clear();
    });

    // Service Report form
    document.getElementById('service-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generateServiceReport();
    });

    // Client select auto-fill
    document.getElementById('sr-client-select')?.addEventListener('change', (e) => {
      this.autoFillClient(e.target.value);
    });

    // Add chemical row
    document.getElementById('add-chemical')?.addEventListener('click', () => {
      this.addChemicalRow();
    });

    // Quote form
    document.getElementById('quote-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generateQuote();
    });

    // Add quote item
    document.getElementById('add-quote-item')?.addEventListener('click', () => {
      this.addQuoteItem();
    });

    // Chemical Log form
    document.getElementById('chemical-log-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generateChemicalLog();
    });

    // Unlock / License

    // Phone formatting
    this.setupPhoneInputs();

    // Country change updates phone placeholders
    document.getElementById('company-country')?.addEventListener('change', () => {
      const country = document.getElementById('company-country').value;
      const placeholders = { US: '(555) 123-4567', CN: '13800138000', MX: '5512345678', OTHER: '+12345678900' };
      document.getElementById('company-phone').placeholder = placeholders[country] || placeholders.US;
      this.updatePhoneHint(country);
      this.formatPhoneInput({ target: document.getElementById('company-phone') }, country);
    });

    // Install PWA
    document.getElementById('install-btn')?.addEventListener('click', () => {
      this.installPWA();
    });
  },

  showView(view) {
    this.currentView = view;
    document.querySelectorAll('.view').forEach(el => {
      el.classList.add('hidden');
      el.style.display = '';
    });
    const target = document.getElementById(`view-${view}`);
    if (target) {
      target.classList.remove('hidden');
      target.classList.add('view-enter');
      setTimeout(() => target.classList.remove('view-enter'), 260);
    }

    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });

    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.add('hidden');
    window.scrollTo(0, 0);
    const main = document.querySelector('main');
    if (main) main.scrollTop = 0;

    if (view === 'dashboard') this.renderDashboard();
    if (view === 'service-report') {
      this.resetServiceForm();
      setTimeout(() => this.initClientSignaturePad(), 50);
    }
    if (view === 'quote') this.resetQuoteForm();
    if (view === 'chemical-log') this.resetChemicalLogForm();
    if (view === 'settings') {
      setTimeout(() => this.initSignaturePad(), 50);
    }
  },


  renderNav() {
    const proBadge = '<span class="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">PRO</span>';
    document.querySelectorAll('[data-pro-badge]').forEach(el => {
      if (!this.isPro) el.innerHTML = proBadge;
      else el.innerHTML = '';
    });
  },

  showUnlock() {
    this.showView('unlock');
  },

  // ========== COMPANY SETTINGS ==========
  loadCompanySettings() {
    const company = Storage.getCompany();
    const fields = ['name', 'address', 'phone', 'email', 'website', 'license', 'technician'];
    fields.forEach(f => {
      const el = document.getElementById(`company-${f}`);
      if (el && company[f]) el.value = company[f];
    });
    const countryEl = document.getElementById('company-country');
    const country = company.country || 'US';
    if (countryEl) countryEl.value = country;
    this.updatePhoneHint(country);
    if (company.logo) {
      document.getElementById('logo-preview').src = company.logo;
      document.getElementById('logo-data').value = company.logo;
    }
    if (company.signature) {
      // Signature is loaded when pad is initialized
    }
  },

  requireCompany() {
    const company = Storage.getCompany();
    if (!company.name || company.name.trim() === '') {
      this.showToast(I18n.t('toastFillCompanyFirst'), 'warning');
      this.showView('settings');
      return false;
    }
    return true;
  },

  saveCompanySettings() {
    const phone = document.getElementById('company-phone').value.trim();
    const email = document.getElementById('company-email').value.trim();
    if (!phone && !email) {
      this.showToast(I18n.t('toastPhoneOrEmailRequired'), 'warning');
      document.getElementById('company-phone').focus();
      return;
    }

    const company = {
      name: document.getElementById('company-name').value,
      address: document.getElementById('company-address').value,
      phone,
      email,
      website: document.getElementById('company-website').value,
      license: document.getElementById('company-license').value,
      technician: document.getElementById('company-technician').value,
      country: document.getElementById('company-country')?.value || 'US',
      logo: document.getElementById('logo-data').value || '',
      signature: this.signaturePad && !this.signaturePad.isEmpty()
        ? this.signaturePad.toDataURL('image/png')
        : Storage.getCompany().signature || ''
    };
    Storage.setCompany(company);
    this.showToast(I18n.t('toastSettingsSaved'));
  },

  handleFileUpload(file, previewId, dataId) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById(previewId).src = e.target.result;
      document.getElementById(dataId).value = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  initSignaturePad() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas || canvas._signaturePadInitialized) return;
    canvas._signaturePadInitialized = true;

    this.signaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(250,250,250)',
      penColor: 'rgb(30, 64, 175)'
    });

    // Load existing signature
    const company = Storage.getCompany();
    if (company.signature) {
      this.signaturePad.fromDataURL(company.signature);
    }

    // Resize handler - restore signature after resize
    const resize = () => {
      const saved = !this.signaturePad.isEmpty() ? this.signaturePad.toDataURL('image/png') : company.signature;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      if (saved) this.signaturePad.fromDataURL(saved);
    };
    resize();
    window.addEventListener('resize', resize);
  },

  initClientSignaturePad() {
    const canvas = document.getElementById('client-signature-canvas');
    if (!canvas || canvas._signaturePadInitialized) return;
    canvas._signaturePadInitialized = true;

    this.clientSignaturePad = new SignaturePad(canvas, {
      backgroundColor: 'rgb(250,250,250)',
      penColor: 'rgb(30, 64, 175)'
    });

    const resize = () => {
      const saved = !this.clientSignaturePad.isEmpty() ? this.clientSignaturePad.toDataURL('image/png') : null;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      if (saved) this.clientSignaturePad.fromDataURL(saved);
    };
    resize();
    window.addEventListener('resize', resize);
  },

  // ========== SERVICE REPORT ==========
  resetServiceForm() {
    document.getElementById('service-form')?.reset();
    document.getElementById('service-date').valueAsDate = new Date();
    document.getElementById('chemical-rows').innerHTML = this.chemicalRowHTML(0);
    const company = Storage.getCompany();
    if (company.technician) {
      document.getElementById('sr-technician').value = company.technician;
    }
    if (this.clientSignaturePad) this.clientSignaturePad.clear();
    this.populateClientSelect();
    I18n.apply();
  },

  populateClientSelect() {
    const select = document.getElementById('sr-client-select');
    if (!select) return;

    // Keep the first option (New Client)
    const firstOption = select.options[0];
    select.innerHTML = '';
    select.appendChild(firstOption);

    const reports = Storage.getReports();
    const clients = new Map();

    reports.forEach(r => {
      if (r.clientName && r.clientName.trim()) {
        const key = r.clientName.trim().toLowerCase();
        if (!clients.has(key)) {
          clients.set(key, {
            name: r.clientName.trim(),
            phone: r.clientPhone || '',
            address: r.clientAddress || ''
          });
        }
      }
    });

    // Sort by name
    const sorted = Array.from(clients.values()).sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(c => {
      const option = document.createElement('option');
      option.value = JSON.stringify(c);
      option.textContent = c.name;
      select.appendChild(option);
    });
  },

  autoFillClient(json) {
    if (!json) {
      document.getElementById('sr-client-name').value = '';
      document.getElementById('sr-client-phone').value = '';
      document.getElementById('sr-client-address').value = '';
      return;
    }
    try {
      const c = JSON.parse(json);
      document.getElementById('sr-client-name').value = c.name || '';
      document.getElementById('sr-client-phone').value = c.phone || '';
      document.getElementById('sr-client-address').value = c.address || '';
    } catch {
      // ignore
    }
  },

  chemicalRowHTML(index) {
    return `
      <div class="chemical-row flex items-center gap-2">
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 flex-1">
          <input type="text" name="chem-name-${index}" data-i18n-placeholder="productName" placeholder="Product Name" class="input-field" required>
          <input type="text" name="chem-epa-${index}" data-i18n-placeholder="epaNum" placeholder="EPA #" class="input-field" required>
          <input type="text" name="chem-amount-${index}" data-i18n-placeholder="amount" placeholder="Amount" class="input-field" required>
          <input type="text" name="chem-dilution-${index}" data-i18n-placeholder="dilution" placeholder="Dilution" class="input-field" required>
          <input type="text" name="chem-area-${index}" data-i18n-placeholder="areaTreated" placeholder="Area Treated" class="input-field" required>
        </div>
        <button type="button" class="text-red-500 hover:text-red-700 flex-shrink-0" onclick="App.removeChemicalRow(this)" title="Remove">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  },

  addChemicalRow() {
    const container = document.getElementById('chemical-rows');
    const count = container.querySelectorAll('.chemical-row').length;
    const div = document.createElement('div');
    div.innerHTML = this.chemicalRowHTML(count);
    container.appendChild(div.firstElementChild);
    I18n.apply();
  },

  removeChemicalRow(btn) {
    const row = btn.closest('.chemical-row');
    const container = document.getElementById('chemical-rows');
    if (container && container.querySelectorAll('.chemical-row').length <= 1) {
      row.querySelectorAll('input').forEach(input => input.value = '');
      return;
    }
    if (row) row.remove();
  },

  generateServiceReport() {
    if (!this.requireCompany()) return;
    const chemicals = [];
    document.querySelectorAll('.chemical-row').forEach((row) => {
      const inputs = row.querySelectorAll('input');
      const name = inputs[0]?.value;
      if (name) {
        chemicals.push({
          name,
          epa: inputs[1]?.value || '',
          amount: inputs[2]?.value || '',
          dilution: inputs[3]?.value || '',
          area: inputs[4]?.value || ''
        });
      }
    });

    const data = {
      clientName: document.getElementById('sr-client-name').value,
      clientPhone: document.getElementById('sr-client-phone').value,
      clientAddress: document.getElementById('sr-client-address').value,
      date: document.getElementById('service-date').value,
      serviceType: document.getElementById('service-type').value,
      technician: document.getElementById('sr-technician').value || Storage.getCompany().technician || '',
      findings: document.getElementById('sr-findings').value,
      treatment: document.getElementById('sr-treatment').value,
      chemicals,
      safety: document.getElementById('sr-safety').value,
      recommendations: document.getElementById('sr-recommendations').value,
      nextService: document.getElementById('sr-next-service').value,
      clientSignature: this.clientSignaturePad && !this.clientSignaturePad.isEmpty()
        ? this.clientSignaturePad.toDataURL('image/png')
        : ''
    };

    PDF.generateServiceReport(data, this.isPro);
    Storage.saveReport(data);
    this.showToast(I18n.t('toastServiceGenerated'));
  },

  // ========== QUOTE ==========
  resetQuoteForm() {
    document.getElementById('quote-form')?.reset();
    document.getElementById('quote-date').valueAsDate = new Date();
    document.getElementById('quote-items').innerHTML = this.quoteItemHTML(0);
    this.calculateQuoteTotals();
    I18n.apply();
  },

  quoteItemHTML(index) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 quote-item items-center">
        <div class="sm:col-span-6">
          <input type="text" name="qi-desc-${index}" data-i18n-placeholder="serviceDescription" placeholder="Service description" class="input-field">
        </div>
        <div class="sm:col-span-2 relative min-w-0">
          <input type="text" inputmode="numeric" name="qi-qty-${index}" value="1" class="input-field qi-qty min-w-0 max-w-[100px]" oninput="App.calculateQuoteTotals()">
        </div>
        <div class="sm:col-span-2 relative min-w-0">
          <input type="text" inputmode="decimal" name="qi-price-${index}" value="0" class="input-field qi-price min-w-0 max-w-[100px]" oninput="App.calculateQuoteTotals()">
        </div>
        <div class="sm:col-span-2 flex justify-start items-center">
          <button type="button" onclick="App.removeQuoteItem(this)" class="text-red-500 hover:text-red-700"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    `;
  },

  removeQuoteItem(btn) {
    const row = btn.closest('.quote-item');
    const container = document.getElementById('quote-items');
    if (container && container.querySelectorAll('.quote-item').length <= 1) {
      row.querySelectorAll('input').forEach(input => {
        if (input.classList.contains('qi-qty') || input.classList.contains('qi-price')) {
          input.value = input.classList.contains('qi-qty') ? '1' : '0';
        } else {
          input.value = '';
        }
      });
      this.calculateQuoteTotals();
      return;
    }
    if (row) {
      row.remove();
      this.calculateQuoteTotals();
    }
  },

  addQuoteItem() {
    const container = document.getElementById('quote-items');
    const count = container.querySelectorAll('.quote-item').length;
    const div = document.createElement('div');
    div.innerHTML = this.quoteItemHTML(count);
    container.appendChild(div.firstElementChild);
    I18n.apply();
  },

  calculateQuoteTotals() {
    let subtotal = 0;
    document.querySelectorAll('.quote-item').forEach(row => {
      const qty = parseFloat(row.querySelector('.qi-qty')?.value) || 0;
      const price = parseFloat(row.querySelector('.qi-price')?.value) || 0;
      subtotal += qty * price;
    });
    const taxRate = parseFloat(document.getElementById('quote-tax-rate')?.value) || 0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    document.getElementById('quote-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('quote-tax').textContent = tax.toFixed(2);
    document.getElementById('quote-total').textContent = total.toFixed(2);
  },

  generateQuote() {
    if (!this.requireCompany()) return;
    const items = [];
    document.querySelectorAll('.quote-item').forEach(row => {
      const desc = row.querySelector('.input-field:not(.qi-qty):not(.qi-price)')?.value;
      if (desc) {
        items.push({
          description: desc,
          quantity: row.querySelector('.qi-qty')?.value || '1',
          price: row.querySelector('.qi-price')?.value || '0'
        });
      }
    });

    const subtotal = parseFloat(document.getElementById('quote-subtotal').textContent) || 0;
    const tax = parseFloat(document.getElementById('quote-tax').textContent) || 0;

    const data = {
      clientName: document.getElementById('q-client-name').value,
      clientAddress: document.getElementById('q-client-address').value,
      clientPhone: document.getElementById('q-client-phone').value,
      date: document.getElementById('quote-date').value,
      validUntil: document.getElementById('quote-valid').value,
      items,
      subtotal,
      tax,
      terms: document.getElementById('quote-terms').value
    };

    PDF.generateQuote(data, this.isPro);
    Storage.saveQuote(data);
    this.showToast(I18n.t('toastQuoteGenerated'));
  },

  // ========== CHEMICAL LOG ==========
  resetChemicalLogForm() {
    document.getElementById('chemical-log-form')?.reset();
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    document.getElementById('cl-start').valueAsDate = lastMonth;
    document.getElementById('cl-end').valueAsDate = today;
  },

  generateChemicalLog() {
    if (!this.requireCompany()) return;
    const start = document.getElementById('cl-start').value;
    const end = document.getElementById('cl-end').value;
    const allLogs = Storage.getReports();
    const logs = [];

    allLogs.forEach(report => {
      if (report.date >= start && report.date <= end && report.chemicals) {
        report.chemicals.forEach(chem => {
          logs.push({
            date: report.date,
            client: report.clientName,
            address: report.clientAddress,
            product: chem.name,
            epa: chem.epa,
            amount: chem.amount,
            area: chem.area,
            technician: report.technician
          });
        });
      }
    });

    if (logs.length === 0) {
      this.showToast(I18n.t('toastNoChemicals'), 'warning');
      return;
    }

    const data = { startDate: start, endDate: end, logs };
    PDF.generateChemicalLog(data, this.isPro);
    this.showToast(I18n.t('toastChemLogGenerated'));
  },

  // ========== LICENSE / UNLOCK ==========
  verifyLicense() {
    const key = document.getElementById('license-key').value.trim();
    if (!key || key.length < 4) {
      this.showToast(I18n.t('toastInvalidKey'), 'error');
      return;
    }

    Storage.setPro(true);
    this.isPro = true;
    this.renderNav();
    this.showToast(I18n.t('toastUnlocked'));
    setTimeout(() => this.showView('dashboard'), 1500);
  },

  // ========== DASHBOARD ==========
  renderDashboard() {
    const reports = Storage.getReports();
    const quotes = Storage.getQuotes();
    document.getElementById('dash-report-count').textContent = reports.length;
    document.getElementById('dash-quote-count').textContent = quotes.length;

    // 只显示最近15天的报告
    const today = new Date();
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(today.getDate() - 15);
    const recentReports = reports
      .filter(r => new Date(r.date) >= fifteenDaysAgo)
      .slice(0, 5);
    const list = document.getElementById('dash-recent-reports');
    if (recentReports.length === 0) {
      list.innerHTML = `<p class="text-gray-400 text-sm italic" data-i18n="noReportsYet">${I18n.t('noReportsYet')}</p>`;
    } else {
      list.innerHTML = recentReports.map(r => `
        <div class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
          <div>
            <p class="text-sm font-medium text-gray-800">${r.clientName}</p>
            <p class="text-xs text-gray-500">${r.date} • ${r.serviceType}</p>
          </div>
          <span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded" data-i18n="reportBadge">${I18n.t('reportBadge')}</span>
        </div>
      `).join('');
    }
  },


  // ========== PWA INSTALL ==========
  deferredPrompt: null,

  checkInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      document.getElementById('install-prompt').style.display = 'flex';
    });
  },

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        document.getElementById('install-prompt').style.display = 'none';
        this.deferredPrompt = null;
      });
    }
  },

  // ========== PHONE FORMATTING ==========
  getCountry() {
    return Storage.getCompany().country || 'US';
  },

  updatePhoneHint(country) {
    const hints = {
      US: I18n.t('phoneHintUS'),
      CN: I18n.t('phoneHintCN'),
      MX: I18n.t('phoneHintMX'),
      OTHER: I18n.t('phoneHintOther')
    };
    const text = hints[country] || hints.US;
    const el1 = document.getElementById('phone-hint-settings');
    const el2 = document.getElementById('phone-hint-service');
    if (el1) el1.textContent = text;
    if (el2) el2.textContent = text;
  },

  setupPhoneInputs() {
    const inputs = [
      document.getElementById('company-phone'),
      document.getElementById('sr-client-phone')
    ];
    inputs.forEach(input => {
      if (!input) return;
      input.addEventListener('input', (e) => this.formatPhoneInput(e, this.getCountry()));
      input.addEventListener('blur', (e) => this.validatePhoneInput(e, this.getCountry()));
    });
  },

  formatPhoneInput(e, country) {
    const input = e.target;
    let raw = input.value.replace(/\D/g, '');

    if (country === 'US') {
      if (raw.length > 10) raw = raw.slice(0, 10);
    } else if (country === 'CN') {
      if (raw.length > 11) raw = raw.slice(0, 11);
    } else if (country === 'MX') {
      if (raw.length > 10) raw = raw.slice(0, 10);
    }

    input.value = raw;
  },

  validatePhoneInput(e, country) {
    const input = e.target;
    let raw = input.value.replace(/\D/g, '');
    let valid = true;

    if (country === 'US') {
      valid = raw.length === 10;
      if (valid) input.value = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
    } else if (country === 'CN') {
      valid = raw.length === 11 && raw.startsWith('1');
      if (valid) input.value = `(+86) ${raw.slice(0, 3)} ${raw.slice(3, 7)} ${raw.slice(7)}`;
    } else if (country === 'MX') {
      valid = raw.length === 10;
      if (valid) input.value = `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6)}`;
    } else {
      valid = raw.length > 0;
    }

    if (!valid && input.value.trim() !== '') {
      input.style.borderColor = '#ef4444';
    } else {
      input.style.borderColor = '';
    }
    return valid;
  },

  // ========== UTILS ==========
  showToast(message, type = 'success') {
    const colors = {
      success: 'bg-green-600',
      error: 'bg-red-600',
      warning: 'bg-amber-500'
    };
    const toast = document.createElement('div');
    toast.className = `fixed top-4 left-1/2 -translate-x-1/2 ${colors[type]} text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium z-50 transition-opacity duration-300 whitespace-nowrap`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('opacity-0'), 2500);
    setTimeout(() => toast.remove(), 2800);
  }
};

// SignaturePad fallback (lightweight inline implementation if CDN fails)
class SignaturePad {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.backgroundColor = options.backgroundColor || 'rgb(255,255,255)';
    this.penColor = options.penColor || 'rgb(0,0,0)';
    this.drawing = false;
    this._data = [];

    this.ctx.strokeStyle = this.penColor;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const start = (e) => {
      this.drawing = true;
      const pos = this._pos(e);
      this.ctx.beginPath();
      this.ctx.moveTo(pos.x, pos.y);
      this._data.push([pos]);
    };
    const move = (e) => {
      if (!this.drawing) return;
      const pos = this._pos(e);
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
      this._data[this._data.length - 1].push(pos);
    };
    const end = () => { this.drawing = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', end);
    canvas.addEventListener('mouseleave', end);
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); start(e.touches[0]); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); move(e.touches[0]); }, { passive: false });
    canvas.addEventListener('touchend', end);
  }

  _pos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._data = [];
  }

  isEmpty() {
    return this._data.length === 0;
  }

  toDataURL(type = 'image/png') {
    return this.canvas.toDataURL(type);
  }

  fromDataURL(dataUrl) {
    const img = new Image();
    img.onload = () => {
      // Use CSS dimensions (logical pixels) because ctx is already scaled by devicePixelRatio
      const cw = this.canvas.offsetWidth;
      const ch = this.canvas.offsetHeight;
      const scale = Math.min(cw / img.width, ch / img.height, 1);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      this.ctx.drawImage(img, x, y, w, h);
    };
    img.src = dataUrl;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => App.init());
