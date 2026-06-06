// License keys are obfuscated to prevent direct extraction from source.
// Encoded as base64 then reversed. Decode at runtime.
const _LK = "==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";

function _dK() {
  try {
    const rev = _LK.split('').reverse().join('');
    const json = atob(rev);
    return JSON.parse(json);
  } catch (e) {
    return [];
  }
}

const App = {
  currentView: 'dashboard',
  signaturePad: null,
  clientSignaturePad: null,
  isPro: false,
  historyTab: 'reports',

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
        if (view === 'invoice' && !this.isPro) { this.showUnlock(); return; }
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

    // Invoice form
    document.getElementById('invoice-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.generateInvoice();
    });

    // Add invoice item
    document.getElementById('add-invoice-item')?.addEventListener('click', () => {
      this.addInvoiceItem();
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
    if (view === 'history') this.renderHistory();
    if (view === 'customers') this.renderCustomers();
    if (view === 'service-report') {
      this.resetServiceForm();
      setTimeout(() => this.initClientSignaturePad(), 50);
    }
    if (view === 'quote') this.resetQuoteForm();
    if (view === 'invoice') this.resetInvoiceForm();
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

  _cleanupSignatureListeners() {
    if (this._signatureResizeHandler) {
      window.removeEventListener('resize', this._signatureResizeHandler);
      this._signatureResizeHandler = null;
    }
    if (this._clientSignatureResizeHandler) {
      window.removeEventListener('resize', this._clientSignatureResizeHandler);
      this._clientSignatureResizeHandler = null;
    }
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
    this._signatureResizeHandler = resize;
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
    this._clientSignatureResizeHandler = resize;
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

    let sources = [];
    const customers = Storage.getCustomers();
    if (customers.length > 0) {
      sources = customers.map(c => ({ name: c.name, phone: c.phone || '', address: c.address || '' }));
    } else {
      // Fallback: extract from reports for backward compatibility
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
      sources = Array.from(clients.values());
    }

    // Sort by name
    const sorted = sources.sort((a, b) => a.name.localeCompare(b.name));
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

  resetInvoiceForm() {
    document.getElementById('invoice-form')?.reset();
    document.getElementById('invoice-date').valueAsDate = new Date();
    document.getElementById('invoice-items').innerHTML = this.invoiceItemHTML(0);
    this.calculateInvoiceTotals();
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

  invoiceItemHTML(index) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 invoice-item items-center">
        <div class="sm:col-span-6">
          <input type="text" name="ii-desc-${index}" data-i18n-placeholder="serviceDescription" placeholder="Service description" class="input-field">
        </div>
        <div class="sm:col-span-2 relative min-w-0">
          <input type="text" inputmode="numeric" name="ii-qty-${index}" value="1" class="input-field ii-qty min-w-0 max-w-[100px]" oninput="App.calculateInvoiceTotals()">
        </div>
        <div class="sm:col-span-2 relative min-w-0">
          <input type="text" inputmode="decimal" name="ii-price-${index}" value="0" class="input-field ii-price min-w-0 max-w-[100px]" oninput="App.calculateInvoiceTotals()">
        </div>
        <div class="sm:col-span-2 flex justify-start items-center">
          <button type="button" onclick="App.removeInvoiceItem(this)" class="text-red-500 hover:text-red-700"><i class="fas fa-trash-alt"></i></button>
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

  removeInvoiceItem(btn) {
    const row = btn.closest('.invoice-item');
    const container = document.getElementById('invoice-items');
    if (container && container.querySelectorAll('.invoice-item').length <= 1) {
      row.querySelectorAll('input').forEach(input => {
        if (input.classList.contains('ii-qty') || input.classList.contains('ii-price')) {
          input.value = input.classList.contains('ii-qty') ? '1' : '0';
        } else {
          input.value = '';
        }
      });
      this.calculateInvoiceTotals();
      return;
    }
    if (row) {
      row.remove();
      this.calculateInvoiceTotals();
    }
  },

  addInvoiceItem() {
    const container = document.getElementById('invoice-items');
    const count = container.querySelectorAll('.invoice-item').length;
    const div = document.createElement('div');
    div.innerHTML = this.invoiceItemHTML(count);
    container.appendChild(div.firstElementChild);
    I18n.apply();
  },

  calculateInvoiceTotals() {
    let subtotal = 0;
    document.querySelectorAll('.invoice-item').forEach(row => {
      const qty = parseFloat(row.querySelector('.ii-qty')?.value) || 0;
      const price = parseFloat(row.querySelector('.ii-price')?.value) || 0;
      subtotal += qty * price;
    });
    const taxRate = parseFloat(document.getElementById('invoice-tax-rate')?.value) || 0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    document.getElementById('invoice-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('invoice-tax').textContent = tax.toFixed(2);
    document.getElementById('invoice-total').textContent = total.toFixed(2);
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

  generateInvoice() {
    if (!this.requireCompany()) return;
    const items = [];
    document.querySelectorAll('.invoice-item').forEach(row => {
      const desc = row.querySelector('.input-field:not(.ii-qty):not(.ii-price)')?.value;
      if (desc) {
        items.push({
          description: desc,
          quantity: row.querySelector('.ii-qty')?.value || '1',
          price: row.querySelector('.ii-price')?.value || '0'
        });
      }
    });

    const subtotal = parseFloat(document.getElementById('invoice-subtotal').textContent) || 0;
    const tax = parseFloat(document.getElementById('invoice-tax').textContent) || 0;

    const data = {
      clientName: document.getElementById('i-client-name').value,
      clientAddress: document.getElementById('i-client-address').value,
      clientPhone: document.getElementById('i-client-phone').value,
      date: document.getElementById('invoice-date').value,
      dueDate: document.getElementById('invoice-due').value,
      paymentMethod: document.getElementById('i-payment-method').value,
      paymentStatus: document.getElementById('i-payment-status').value,
      items,
      subtotal,
      tax,
      terms: document.getElementById('invoice-terms').value
    };

    PDF.generateInvoice(data, this.isPro);
    Storage.saveInvoice(data);
    this.showToast(I18n.t('toastInvoiceGenerated'));
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
    const key = document.getElementById('license-key').value.trim().toUpperCase();

    // Check if key is valid
    const validKeys = _dK();
    if (!validKeys.includes(key)) {
      this.showToast(I18n.t('toastInvalidKey'), 'error');
      return;
    }

    // Check if key has already been used on this device
    if (Storage.isKeyUsed(key)) {
      this.showToast(I18n.t('toastKeyUsed'), 'warning');
      return;
    }

    // Mark key as used and unlock
    Storage.addUsedKey(key);
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
    const invoices = Storage.getInvoices();
    const customers = Storage.getCustomers();
    document.getElementById('dash-report-count').textContent = reports.length;
    document.getElementById('dash-quote-count').textContent = quotes.length;
    document.getElementById('dash-invoice-count').textContent = invoices.length;
    const customerCountEl = document.getElementById('dash-customer-count');
    if (customerCountEl) customerCountEl.textContent = customers.length;

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

  // ========== HISTORY ==========
  switchHistoryTab(tab) {
    this.historyTab = tab;
    document.querySelectorAll('.history-tab').forEach(el => {
      el.classList.toggle('active', el.id === `tab-${tab}`);
    });
    const searchInput = document.getElementById('history-search');
    if (searchInput) searchInput.value = '';
    this.renderHistory();
  },

  renderHistory() {
    const searchInput = document.getElementById('history-search');
    if (searchInput) searchInput.value = '';

    let items = [];
    if (this.historyTab === 'reports') items = Storage.getReports();
    else if (this.historyTab === 'quotes') items = Storage.getQuotes();
    else if (this.historyTab === 'invoices') items = Storage.getInvoices();

    const list = document.getElementById('history-list');
    if (items.length === 0) {
      list.innerHTML = `
        <div class="card text-center py-10">
          <i class="fas fa-folder-open text-gray-300 text-4xl mb-3"></i>
          <p class="text-gray-400 text-sm" data-i18n="historyEmpty">${I18n.t('historyEmpty')}</p>
        </div>
      `;
      return;
    }

    this._renderHistoryList(items);
  },

  _renderHistoryList(items) {
    const list = document.getElementById('history-list');
    const sorted = [...items].sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

    const getBadge = (item) => {
      if (this.historyTab === 'reports') return I18n.t('reportBadge');
      if (this.historyTab === 'quotes') return I18n.t('quotes');
      if (this.historyTab === 'invoices') return item.paymentStatus === 'paid' ? I18n.t('paid') : I18n.t('unpaid');
      return '';
    };

    const getBadgeClass = (item) => {
      if (this.historyTab === 'invoices' && item.paymentStatus === 'paid') return 'bg-green-50 text-green-700';
      if (this.historyTab === 'invoices') return 'bg-red-50 text-red-700';
      return 'bg-blue-50 text-blue-700';
    };

    const getSubtitle = (item) => {
      if (this.historyTab === 'reports') return `${item.date || '—'} • ${PDF.translateServiceType(item.serviceType)}`;
      return item.date || '—';
    };

    list.innerHTML = sorted.map((item, idx) => `
      <div class="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-blue-300 transition-colors duration-200" onclick="App.showHistoryDetail('${item.id || ''}')" data-history-index="${idx}" data-item-id="${item.id || ''}">
        <div class="min-w-0">
          <p class="text-sm font-bold text-gray-900 truncate">${item.clientName || '—'}</p>
          <p class="text-xs text-gray-500 mt-0.5">${getSubtitle(item)}</p>
          ${item.clientAddress ? `<p class="text-xs text-gray-400 mt-0.5 truncate">${item.clientAddress}</p>` : ''}
        </div>
        <div class="flex items-center gap-2 shrink-0" onclick="event.stopPropagation()">
          <span class="text-xs ${getBadgeClass(item)} px-2 py-1 rounded font-medium">${getBadge(item)}</span>
          <button onclick="App.downloadHistoryItem('${item.id || ''}')" class="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-lg transition flex items-center gap-1.5">
            <i class="fas fa-download text-xs"></i>
            <span data-i18n="historyDownload">${I18n.t('historyDownload')}</span>
          </button>
          <button onclick="App.deleteHistoryItem('${item.id || ''}')" class="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg transition">
            <i class="fas fa-trash-alt text-xs"></i>
          </button>
        </div>
      </div>
    `).join('');
  },

  filterHistory() {
    const query = document.getElementById('history-search')?.value.trim().toLowerCase() || '';
    let items = [];
    if (this.historyTab === 'reports') items = Storage.getReports();
    else if (this.historyTab === 'quotes') items = Storage.getQuotes();
    else if (this.historyTab === 'invoices') items = Storage.getInvoices();

    if (!query) {
      this._renderHistoryList(items);
      return;
    }
    const filtered = items.filter(item =>
      (item.clientName || '').toLowerCase().includes(query) ||
      (item.clientAddress || '').toLowerCase().includes(query) ||
      (item.date || '').includes(query)
    );
    this._renderHistoryList(filtered);
  },

  downloadReport(id) {
    const reports = Storage.getReports();
    const report = reports.find(r => r.id === id);
    if (!report) {
      this.showToast(I18n.t('toastInvalidKey'), 'error');
      return;
    }
    PDF.generateServiceReport(report, this.isPro);
    this.showToast(I18n.t('toastServiceGenerated'));
  },

  deleteReport(id) {
    if (!confirm(I18n.t('historyDeleteConfirm'))) return;
    Storage.deleteReport(id);
    this.renderHistory();
    this.showToast(I18n.t('toastReportDeleted'));
  },

  downloadHistoryItem(id) {
    if (this.historyTab === 'reports') {
      const reports = Storage.getReports();
      const report = reports.find(r => r.id === id);
      if (report) {
        PDF.generateServiceReport(report, this.isPro);
        this.showToast(I18n.t('toastServiceGenerated'));
      }
    } else if (this.historyTab === 'quotes') {
      const quotes = Storage.getQuotes();
      const quote = quotes.find(q => q.id === id);
      if (quote) {
        PDF.generateQuote(quote, this.isPro);
        this.showToast(I18n.t('toastQuoteGenerated'));
      }
    } else if (this.historyTab === 'invoices') {
      const invoices = Storage.getInvoices();
      const invoice = invoices.find(i => i.id === id);
      if (invoice) {
        PDF.generateInvoice(invoice, this.isPro);
        this.showToast(I18n.t('toastInvoiceGenerated'));
      }
    }
  },

  deleteHistoryItem(id) {
    if (!confirm(I18n.t('historyDeleteConfirm'))) return;
    if (this.historyTab === 'reports') {
      Storage.deleteReport(id);
    } else if (this.historyTab === 'quotes') {
      Storage.deleteQuote(id);
    } else if (this.historyTab === 'invoices') {
      Storage.deleteInvoice(id);
    }
    this.renderHistory();
    this.showToast(I18n.t('toastReportDeleted'));
    this.renderDashboard();
  },

  showHistoryDetail(id) {
    if (!id) return;
    this._currentDetailId = id;
    this._currentDetailOriginal = null;

    let item = null;
    if (this.historyTab === 'reports') {
      const reports = Storage.getReports();
      item = reports.find(r => r.id === id);
    } else if (this.historyTab === 'quotes') {
      const quotes = Storage.getQuotes();
      item = quotes.find(q => q.id === id);
    } else if (this.historyTab === 'invoices') {
      const invoices = Storage.getInvoices();
      item = invoices.find(i => i.id === id);
    }

    if (!item) {
      this.showToast(I18n.t('toastInvalidKey'), 'error');
      return;
    }

    this._currentDetailOriginal = JSON.stringify(item);
    const modal = document.getElementById('history-detail-modal');
    const badge = document.getElementById('detail-type-badge');

    if (this.historyTab === 'reports') {
      badge.textContent = I18n.t('serviceReports');
      badge.className = 'text-xs px-2.5 py-1 rounded-full font-semibold bg-blue-50 text-blue-700';
    } else if (this.historyTab === 'quotes') {
      badge.textContent = I18n.t('quotes');
      badge.className = 'text-xs px-2.5 py-1 rounded-full font-semibold bg-green-50 text-green-700';
    } else {
      badge.textContent = I18n.t('invoices');
      badge.className = 'text-xs px-2.5 py-1 rounded-full font-semibold bg-purple-50 text-purple-700';
    }

    this._renderDetailBody(item);
    modal.classList.remove('hidden');
    void modal.offsetWidth;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  },

  _renderDetailBody(item) {
    const body = document.getElementById('detail-modal-body');
    const tab = this.historyTab;

    const field = (label, value, key, type = 'text') => {
      const val = this._escapeHtml(value || '');
      if (type === 'textarea') {
        return `<div class="detail-field"><div class="label">${this._escapeHtml(label)}</div><textarea id="detail-${key}" class="input-field" rows="3">${val}</textarea></div>`;
      }
      if (type === 'select') {
        return `<div class="detail-field"><div class="label">${this._escapeHtml(label)}</div><select id="detail-${key}" class="input-field">${value}</select></div>`;
      }
      return `<div class="detail-field"><div class="label">${this._escapeHtml(label)}</div><input type="${type}" id="detail-${key}" class="input-field" value="${val}"></div>`;
    };

    const readonlyRow = (label, value) => {
      return `<div class="detail-readonly-row"><span class="label">${this._escapeHtml(label)}</span><span class="value">${this._escapeHtml(value || '—')}</span></div>`;
    };

    let html = '';

    html += `<div class="detail-section-title" data-i18n="detailClientInfo">${I18n.t('detailClientInfo')}</div>`;
    html += field(I18n.t('clientName'), item.clientName, 'clientName');
    html += field(I18n.t('phone'), item.clientPhone || item.phone || '', 'clientPhone');
    html += field(I18n.t('serviceAddress'), item.clientAddress || item.address || '', 'clientAddress');

    if (tab === 'reports') {
      html += `<div class="detail-section-title mt-4" data-i18n="detailServiceDetails">${I18n.t('detailServiceDetails')}</div>`;
      html += readonlyRow(I18n.t('serviceDate'), item.date);
      html += readonlyRow(I18n.t('serviceType'), item.serviceType);
      html += readonlyRow(I18n.t('technician'), item.technician);

      html += `<div class="detail-section-title mt-4" data-i18n="detailNotes">${I18n.t('detailNotes')}</div>`;
      html += field(I18n.t('notes') || 'Notes', item.notes, 'notes', 'textarea');
      html += field(I18n.t('recommendations') || 'Recommendations', item.recommendations, 'recommendations', 'textarea');
    }

    if (tab === 'quotes') {
      html += `<div class="detail-section-title mt-4" data-i18n="detailQuoteDetails">${I18n.t('detailQuoteDetails')}</div>`;
      html += field(I18n.t('quoteDate') || 'Quote Date', item.date, 'date', 'date');
      html += readonlyRow(I18n.t('validUntil') || 'Valid Until', item.validUntil);
      html += readonlyRow(I18n.t('subtotal') || 'Subtotal', item.subtotal);
      html += readonlyRow(I18n.t('tax') || 'Tax', item.tax);
      html += readonlyRow(I18n.t('total') || 'Total', item.total);

      html += `<div class="detail-section-title mt-4" data-i18n="detailNotes">${I18n.t('detailNotes')}</div>`;
      html += field(I18n.t('notes') || 'Notes', item.notes, 'notes', 'textarea');
    }

    if (tab === 'invoices') {
      html += `<div class="detail-section-title mt-4" data-i18n="detailInvoiceDetails">${I18n.t('detailInvoiceDetails')}</div>`;
      html += field(I18n.t('invoiceDate') || 'Invoice Date', item.invoiceDate || item.date, 'invoiceDate', 'date');
      html += field(I18n.t('dueDate') || 'Due Date', item.dueDate, 'dueDate', 'date');

      const paidSelected = item.paymentStatus === 'paid' ? 'selected' : '';
      const unpaidSelected = item.paymentStatus !== 'paid' ? 'selected' : '';
      const selectOptions = `<option value="paid" ${paidSelected}>${I18n.t('paid')}</option><option value="unpaid" ${unpaidSelected}>${I18n.t('unpaid')}</option>`;
      html += field(I18n.t('paymentStatus') || 'Payment Status', selectOptions, 'paymentStatus', 'select');

      html += readonlyRow(I18n.t('subtotal') || 'Subtotal', item.subtotal);
      html += readonlyRow(I18n.t('tax') || 'Tax', item.tax);
      html += readonlyRow(I18n.t('total') || 'Total', item.total);

      html += `<div class="detail-section-title mt-4" data-i18n="detailNotes">${I18n.t('detailNotes')}</div>`;
      html += field(I18n.t('notes') || 'Notes', item.notes, 'notes', 'textarea');
    }

    body.innerHTML = html;

    const phoneInput = document.getElementById('detail-clientPhone');
    if (phoneInput) {
      this.formatPhoneInput({ target: phoneInput });
      phoneInput.addEventListener('input', (e) => this.formatPhoneInput(e));
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
    const placeholders = {
      US: '(555) 123-4567',
      CN: '(+86) 138 0013 8000',
      MX: '5512345678',
      OTHER: '+12345678900'
    };
    const text = hints[country] || hints.US;
    const placeholder = placeholders[country] || placeholders.US;

    const el1 = document.getElementById('phone-hint-settings');
    const el2 = document.getElementById('phone-hint-service');
    if (el1) el1.textContent = text;
    if (el2) el2.textContent = text;

    const phone1 = document.getElementById('company-phone');
    const phone2 = document.getElementById('sr-client-phone');
    if (phone1) phone1.placeholder = placeholder;
    if (phone2) phone2.placeholder = placeholder;
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

  // ========== CUSTOMERS ==========
  renderCustomers() {
    const customers = Storage.getCustomers();
    const search = (document.getElementById('customer-search')?.value || '').trim().toLowerCase();
    const list = document.getElementById('customers-list');

    const filtered = search
      ? customers.filter(c =>
          (c.name || '').toLowerCase().includes(search) ||
          (c.address || '').toLowerCase().includes(search) ||
          (c.phone || '').toLowerCase().includes(search)
        )
      : customers;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="text-center py-12">
          <i class="fas fa-users text-gray-200 text-5xl mb-4"></i>
          <p class="text-gray-400 text-sm" data-i18n="noCustomersYet">${I18n.t('noCustomersYet')}</p>
        </div>
      `;
      return;
    }

    const getRelatedCount = (customer) => {
      const name = (customer.name || '').trim().toLowerCase();
      const reports = Storage.getReports().filter(r => (r.clientName || '').trim().toLowerCase() === name).length;
      const quotes = Storage.getQuotes().filter(q => (q.clientName || '').trim().toLowerCase() === name).length;
      const invoices = Storage.getInvoices().filter(i => (i.clientName || '').trim().toLowerCase() === name).length;
      return { reports, quotes, invoices };
    };

    list.innerHTML = filtered.map(c => {
      const counts = getRelatedCount(c);
      return `
        <div class="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-blue-300 transition-colors duration-200" onclick="App.showCustomerDetail('${c.id}')">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-800 truncate">${this._escapeHtml(c.name)}</p>
            <div class="flex flex-wrap gap-x-3 text-xs text-gray-500 mt-1">
              ${c.phone ? `<span><i class="fas fa-phone text-gray-300 mr-1"></i>${this._escapeHtml(c.phone)}</span>` : ''}
              ${c.address ? `<span><i class="fas fa-map-marker-alt text-gray-300 mr-1"></i>${this._escapeHtml(c.address)}</span>` : ''}
            </div>
            <div class="flex gap-2 mt-2">
              ${counts.reports > 0 ? `<span class="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">${counts.reports} ${I18n.t('customerReports')}</span>` : ''}
              ${counts.quotes > 0 ? `<span class="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-medium">${counts.quotes} ${I18n.t('customerQuotes')}</span>` : ''}
              ${counts.invoices > 0 ? `<span class="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded font-medium">${counts.invoices} ${I18n.t('customerInvoices')}</span>` : ''}
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <button type="button" class="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition" onclick="event.stopPropagation(); App.openCustomerModal('${c.id}')">
              <i class="fas fa-pen"></i>
            </button>
            <button type="button" class="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition" onclick="event.stopPropagation(); App.deleteCustomer('${c.id}')">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  filterCustomers() {
    this.renderCustomers();
  },

  openCustomerModal(id) {
    const modal = document.getElementById('customer-modal');
    const title = document.getElementById('customer-modal-title');
    const idInput = document.getElementById('customer-id');
    const nameInput = document.getElementById('customer-name');
    const phoneInput = document.getElementById('customer-phone');
    const addressInput = document.getElementById('customer-address');
    const emailInput = document.getElementById('customer-email');
    const notesInput = document.getElementById('customer-notes');

    if (id) {
      const customer = Storage.getCustomers().find(c => c.id === id);
      if (!customer) return;
      title.textContent = I18n.t('editCustomer');
      title.dataset.i18n = 'editCustomer';
      idInput.value = customer.id;
      nameInput.value = customer.name || '';
      phoneInput.value = customer.phone || '';
      addressInput.value = customer.address || '';
      emailInput.value = customer.email || '';
      notesInput.value = customer.notes || '';
    } else {
      title.textContent = I18n.t('addCustomer');
      title.dataset.i18n = 'addCustomer';
      idInput.value = '';
      nameInput.value = '';
      phoneInput.value = '';
      addressInput.value = '';
      emailInput.value = '';
      notesInput.value = '';
    }

    modal.classList.remove('hidden');
    void modal.offsetWidth;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    nameInput.focus();
  },

  closeCustomerModal() {
    const modal = document.getElementById('customer-modal');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  },

  saveCustomerForm() {
    const id = document.getElementById('customer-id').value;
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const email = document.getElementById('customer-email').value.trim();
    const notes = document.getElementById('customer-notes').value.trim();

    if (!name) {
      this.showToast(I18n.t('clientName') + ' is required', 'error');
      return;
    }

    const customer = { name, phone, address, email, notes };
    if (id) customer.id = id;

    Storage.saveCustomer(customer);
    this.showToast(id ? I18n.t('customerUpdated') : I18n.t('customerCreated'));
    this.renderCustomers();
    this.renderDashboard();
    this.closeCustomerModal();
  },

  deleteCustomer(id) {
    const customer = Storage.getCustomers().find(c => c.id === id);
    if (!customer) return;
    if (!confirm(I18n.t('deleteCustomerConfirm'))) return;
    Storage.deleteCustomer(id);
    this.showToast(I18n.t('customerDeleted'));
    this.renderCustomers();
    this.renderDashboard();
  },

  showCustomerDetail(id) {
    const customer = Storage.getCustomers().find(c => c.id === id);
    if (!customer) return;

    const name = (customer.name || '').trim().toLowerCase();
    const reports = Storage.getReports().filter(r => (r.clientName || '').trim().toLowerCase() === name);
    const quotes = Storage.getQuotes().filter(q => (q.clientName || '').trim().toLowerCase() === name);
    const invoices = Storage.getInvoices().filter(i => (i.clientName || '').trim().toLowerCase() === name);

    const body = document.getElementById('customer-detail-body');
    let html = '';

    html += `<div class="space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="detail-field"><div class="label">${I18n.t('clientName')}</div><div class="text-sm text-gray-800 font-medium">${this._escapeHtml(customer.name)}</div></div>
        ${customer.phone ? `<div class="detail-field"><div class="label">${I18n.t('phone')}</div><div class="text-sm text-gray-800">${this._escapeHtml(customer.phone)}</div></div>` : ''}
        ${customer.address ? `<div class="detail-field sm:col-span-2"><div class="label">${I18n.t('serviceAddress')}</div><div class="text-sm text-gray-800">${this._escapeHtml(customer.address)}</div></div>` : ''}
        ${customer.email ? `<div class="detail-field"><div class="label">${I18n.t('customerEmail')}</div><div class="text-sm text-gray-800">${this._escapeHtml(customer.email)}</div></div>` : ''}
      </div>
      ${customer.notes ? `<div class="detail-field"><div class="label">${I18n.t('customerNotes')}</div><div class="text-sm text-gray-600">${this._escapeHtml(customer.notes)}</div></div>` : ''}
    </div>`;

    const renderList = (items, typeLabel, icon, colorClass) => {
      if (items.length === 0) return '';
      return `
        <div class="mt-5">
          <h4 class="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <i class="fas ${icon} ${colorClass}"></i> ${typeLabel} (${items.length})
          </h4>
          <div class="space-y-2">
            ${items.map(item => `
              <div class="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                <div>
                  <p class="text-sm font-medium text-gray-800">${this._escapeHtml(item.date || item.invoiceDate || item.quoteDate || '-')}</p>
                  ${item.serviceType ? `<p class="text-xs text-gray-500">${this._escapeHtml(item.serviceType)}</p>` : ''}
                </div>
                ${item.total ? `<span class="text-sm font-semibold text-gray-800">$${this._escapeHtml(item.total)}</span>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    };

    html += renderList(reports, I18n.t('customerReports'), 'fa-file-medical', 'text-blue-600');
    html += renderList(quotes, I18n.t('customerQuotes'), 'fa-file-invoice-dollar', 'text-green-600');
    html += renderList(invoices, I18n.t('customerInvoices'), 'fa-file-invoice', 'text-purple-600');

    body.innerHTML = html;
    this._currentCustomerDetailId = id;

    const modal = document.getElementById('customer-detail-modal');
    modal.classList.remove('hidden');
    void modal.offsetWidth;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  },

  closeCustomerDetail() {
    const modal = document.getElementById('customer-detail-modal');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      this._currentCustomerDetailId = null;
    }, 200);
  },

  editCustomerFromDetail() {
    const id = this._currentCustomerDetailId;
    if (!id) return;
    this.closeCustomerDetail();
    setTimeout(() => this.openCustomerModal(id), 200);
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
  },

  saveHistoryDetail() {
    const id = this._currentDetailId;
    if (!id) return;

    const tab = this.historyTab;
    const updates = {};

    const getVal = (key) => {
      const el = document.getElementById(`detail-${key}`);
      return el ? el.value.trim() : '';
    };

    updates.clientName = getVal('clientName');
    updates.clientPhone = getVal('clientPhone');
    updates.clientAddress = getVal('clientAddress');

    if (tab === 'reports') {
      updates.notes = getVal('notes');
      updates.recommendations = getVal('recommendations');
    } else if (tab === 'quotes') {
      updates.date = getVal('date');
      updates.notes = getVal('notes');
    } else if (tab === 'invoices') {
      updates.invoiceDate = getVal('invoiceDate');
      updates.dueDate = getVal('dueDate');
      updates.paymentStatus = getVal('paymentStatus');
      updates.notes = getVal('notes');
    }

    const original = JSON.parse(this._currentDetailOriginal || '{}');
    let changed = false;
    for (const key of Object.keys(updates)) {
      if ((original[key] || '') !== updates[key]) {
        changed = true;
        break;
      }
    }
    if (!changed) {
      this.closeHistoryDetail();
      return;
    }

    let success = false;
    if (tab === 'reports') {
      success = !!Storage.updateReport(id, updates);
    } else if (tab === 'quotes') {
      success = !!Storage.updateQuote(id, updates);
    } else if (tab === 'invoices') {
      success = !!Storage.updateInvoice(id, updates);
    }

    if (success) {
      this.showToast(I18n.t('toastChangesSaved'));
      this.renderHistory();
      this.renderDashboard();
      this.closeHistoryDetail();
    } else {
      this.showToast(I18n.t('toastInvalidKey'), 'error');
    }
  },

  closeHistoryDetail() {
    if (this.isDetailDirty()) {
      if (!confirm(I18n.t('discardChanges'))) return;
    }
    const modal = document.getElementById('history-detail-modal');
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      this._currentDetailId = null;
      this._currentDetailOriginal = null;
    }, 200);
  },

  isDetailDirty() {
    if (!this._currentDetailId || !this._currentDetailOriginal) return false;
    const tab = this.historyTab;
    const updates = {};
    const getVal = (key) => {
      const el = document.getElementById(`detail-${key}`);
      return el ? el.value.trim() : '';
    };
    updates.clientName = getVal('clientName');
    updates.clientPhone = getVal('clientPhone');
    updates.clientAddress = getVal('clientAddress');
    if (tab === 'reports') {
      updates.notes = getVal('notes');
      updates.recommendations = getVal('recommendations');
    } else if (tab === 'quotes') {
      updates.date = getVal('date');
      updates.notes = getVal('notes');
    } else if (tab === 'invoices') {
      updates.invoiceDate = getVal('invoiceDate');
      updates.dueDate = getVal('dueDate');
      updates.paymentStatus = getVal('paymentStatus');
      updates.notes = getVal('notes');
    }
    const original = JSON.parse(this._currentDetailOriginal);
    for (const key of Object.keys(updates)) {
      if ((original[key] || '') !== updates[key]) return true;
    }
    return false;
  },

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
