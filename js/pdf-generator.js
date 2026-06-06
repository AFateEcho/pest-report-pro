const { jsPDF } = window.jspdf;

const PDF = {
  // A4 width in px at 96 DPI
  A4_WIDTH: 794,
  A4_HEIGHT: 1123,

  async renderToPDF(htmlContent, filename, isPro = false) {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      left: -9999px;
      top: 0;
      width: ${this.A4_WIDTH}px;
      background: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      color: #1f2937;
      line-height: 1.5;
      font-size: 13px;
    `;
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    // Wait for images to load (max 2s per image)
    const images = container.querySelectorAll('img');
    await Promise.all(Array.from(images).map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      if (img.complete && img.naturalWidth === 0) return Promise.resolve(); // broken image, skip
      return new Promise((resolve) => {
        const timer = setTimeout(resolve, 2000);
        img.onload = () => { clearTimeout(timer); resolve(); };
        img.onerror = () => { clearTimeout(timer); resolve(); };
      });
    }));

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    document.body.removeChild(container);

    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Watermark for free version
    if (!isPro) {
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const watermark = I18n.t('pdfWatermark');
        doc.text(watermark, pageWidth / 2, pageHeight - 4, { align: 'center' });
      }
    }

    doc.save(filename);
  },

  headerHTML(company, title, reportNum) {
    const contactParts = [];
    if (company.phone) contactParts.push(company.phone);
    if (company.email) contactParts.push(company.email);
    if (company.address) contactParts.push(company.address);
    if (company.license) contactParts.push(`${I18n.t('pdfLicense')}: ${company.license}`);

    const logoHtml = company.logo
      ? `<img src="${company.logo}" style="max-width:80px;max-height:50px;object-fit:contain;">`
      : '';

    return `
      <div style="background:#1e40af;color:#fff;padding:18px 30px;margin:0 0 20px 0;display:flex;justify-content:space-between;align-items:center;">
        <div style="flex:1;">
          <div style="font-size:18px;font-weight:bold;margin-bottom:3px;">${company.name || I18n.t('pdfYourCompany')}</div>
          <div style="font-size:10px;opacity:0.85;">${contactParts.join('  |  ')}</div>
          ${company.website ? `<div style="font-size:10px;opacity:0.85;margin-top:2px;">${company.website}</div>` : ''}
        </div>
        ${logoHtml}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:20px;padding:0 30px;">
        <div style="font-size:22px;font-weight:bold;color:#1e40af;">${title}</div>
        <div style="font-size:10px;color:#6b7280;text-align:right;">${reportNum}</div>
      </div>
    `;
  },

  footerHTML(company) {
    return `
      <div style="margin-top:20px;padding:10px 30px 0 30px;border-top:1px solid #e5e7eb;font-size:9px;color:#9ca3af;display:flex;justify-content:space-between;">
        <span>${company.name || 'Pest Report Pro'}</span>
        <span>${I18n.t('pdfGeneratedOn')} ${new Date().toLocaleDateString(I18n.currentLang === 'zh' ? 'zh-CN' : I18n.currentLang === 'es' ? 'es-ES' : 'en-US')}</span>
      </div>
    `;
  },

  sectionHTML(title, content) {
    if (!content || content.trim() === '') return '';
    return `
      <div style="margin-bottom:15px;padding:0 30px;">
        <div style="background:#f3f4f6;padding:12px 15px;border-radius:8px;">
          <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:6px;text-transform:uppercase;border-bottom:2px solid #1e40af;padding-bottom:3px;">${title}</div>
          <div style="font-size:12px;line-height:1.6;color:#374151;white-space:pre-wrap;">${this.escapeHtml(content)}</div>
        </div>
      </div>
    `;
  },

  escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  translateServiceType(type) {
    const map = {
      'Initial Treatment': I18n.t('initialTreatment'),
      'Follow-up': I18n.t('followUp'),
      'Inspection': I18n.t('inspection'),
      'Emergency': I18n.t('emergency'),
      'Quarterly Service': I18n.t('quarterlyService')
    };
    return map[type] || type;
  },

  // ========== SERVICE REPORT ==========
  generateServiceReport(data, isPro = false) {
    const company = Storage.getCompany();
    const seq = Storage.getNextReportNumber('SR', data.date.replace(/-/g, ''));
    const reportNum = `${I18n.t('pdfReportNum')}: SR-${data.date.replace(/-/g, '')}-${seq}`;

    let chemicalsTable = '';
    if (data.chemicals && data.chemicals.length > 0) {
      const rows = data.chemicals.map(c => `
        <tr>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(c.name) || 'N/A'}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(c.epa) || 'N/A'}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(c.amount) || 'N/A'}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(c.dilution) || 'N/A'}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(c.area) || 'N/A'}</td>
        </tr>
      `).join('');

      chemicalsTable = `
        <div style="margin-bottom:15px;padding:0 30px;">
          <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:6px;text-transform:uppercase;border-bottom:2px solid #1e40af;padding-bottom:3px;">${I18n.t('pdfChemicalsApplied')}</div>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#1e40af;color:#fff;">
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('productName')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('epaNum')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('amount')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('dilution')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('areaTreated')}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      `;
    }

    const sigHtml = company.signature
      ? `<img src="${company.signature}" style="max-width:85%;max-height:45px;object-fit:contain;">`
      : '';

    const clientSigHtml = data.clientSignature
      ? `<img src="${data.clientSignature}" style="max-width:85%;max-height:45px;object-fit:contain;">`
      : '';

    const html = `
      <div style="padding:0 0 20px 0;">
        ${this.headerHTML(company, I18n.t('pdfServiceReport'), reportNum)}

        <div style="display:flex;gap:20px;margin-bottom:20px;padding:0 30px;">
          <div style="flex:1;background:#f3f4f6;padding:15px;border-radius:8px;">
            <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:8px;text-transform:uppercase;">${I18n.t('pdfClientInfo')}</div>
            <div style="font-size:11px;line-height:1.8;">
              <div><strong>${I18n.t('pdfName')}:</strong> ${this.escapeHtml(data.clientName) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfPhone')}:</strong> ${this.escapeHtml(data.clientPhone) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfAddress')}:</strong> ${this.escapeHtml(data.clientAddress) || 'N/A'}</div>
            </div>
          </div>
          <div style="flex:1;background:#f3f4f6;padding:15px;border-radius:8px;">
            <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:8px;text-transform:uppercase;">${I18n.t('pdfServiceInfo')}</div>
            <div style="font-size:11px;line-height:1.8;">
              <div><strong>${I18n.t('pdfDate')}:</strong> ${data.date || 'N/A'}</div>
              <div><strong>${I18n.t('pdfType')}:</strong> ${this.translateServiceType(data.serviceType) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfTechnician')}:</strong> ${this.escapeHtml(data.technician) || 'N/A'}</div>
              ${data.nextService ? `<div><strong>${I18n.t('pdfNextService')}:</strong> ${data.nextService}</div>` : ''}
            </div>
          </div>
        </div>

        ${this.sectionHTML(I18n.t('pdfPestFindings'), data.findings || I18n.t('pdfNoFindings'))}
        ${this.sectionHTML(I18n.t('pdfTreatmentDetails'), data.treatment || I18n.t('pdfNoTreatment'))}
        ${chemicalsTable}
        ${this.sectionHTML(I18n.t('pdfSafety'), data.safety)}
        ${this.sectionHTML(I18n.t('pdfRecommendations'), data.recommendations)}

        <div style="margin-bottom:15px;padding:0 30px;">
          <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:6px;text-transform:uppercase;border-bottom:2px solid #1e40af;padding-bottom:3px;">${I18n.t('pdfAcknowledgment')}</div>
          <div style="font-size:10px;color:#6b7280;margin-bottom:12px;">${I18n.t('pdfAckText')}</div>
          <div style="display:flex;gap:20px;">
            <div style="flex:1;border:1px solid #d1d5db;height:70px;padding:8px;position:relative;">
              <div style="font-size:10px;font-weight:bold;color:#374151;">${I18n.t('pdfTechSignature')}</div>
              <div style="position:absolute;bottom:5px;left:5px;">${sigHtml}</div>
            </div>
            <div style="flex:1;border:1px solid #d1d5db;height:70px;padding:8px;position:relative;">
              <div style="font-size:10px;font-weight:bold;color:#374151;">${I18n.t('pdfClientSignature')}</div>
              <div style="position:absolute;bottom:5px;left:5px;">${clientSigHtml || `<span style="font-size:9px;color:#9ca3af;">${I18n.t('pdfSignHere')}</span>`}</div>
            </div>
          </div>
        </div>

        ${this.footerHTML(company)}
      </div>
    `;

    this.renderToPDF(html, `Service-Report-${data.clientName || 'Client'}-${data.date}.pdf`, isPro).catch(err => {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    });
  },

  // ========== QUOTE ==========
  generateQuote(data, isPro = false) {
    const company = Storage.getCompany();
    const qSeq = Storage.getNextReportNumber('Q', data.date.replace(/-/g, ''));
    const reportNum = `${I18n.t('pdfQuoteNum')}: Q-${data.date.replace(/-/g, '')}-${qSeq}`;

    const itemsRows = (data.items || []).map(item => {
      const qty = parseFloat(item.quantity) || 1;
      const price = parseFloat(item.price) || 0;
      const total = qty * price;
      return `
        <tr>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(item.description) || 'N/A'}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;text-align:center;">${qty}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;text-align:right;">$${price.toFixed(2)}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;text-align:right;">$${total.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const subtotal = parseFloat(data.subtotal) || 0;
    const tax = parseFloat(data.tax) || 0;
    const total = subtotal + tax;

    const html = `
      <div style="padding:0 0 20px 0;">
        ${this.headerHTML(company, I18n.t('pdfQuote'), reportNum + `<br>${I18n.t('pdfValidUntil')}: ${data.validUntil || 'N/A'}`)}

        <div style="margin-bottom:20px;padding:0 30px;">
          <div style="background:#f3f4f6;padding:15px;border-radius:8px;">
            <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:6px;text-transform:uppercase;">${I18n.t('pdfTo')}</div>
            <div style="font-size:11px;line-height:1.8;">
              <div><strong>${I18n.t('pdfName')}:</strong> ${this.escapeHtml(data.clientName) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfAddress')}:</strong> ${this.escapeHtml(data.clientAddress) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfPhone')}:</strong> ${this.escapeHtml(data.clientPhone) || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:15px;padding:0 30px;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#1e40af;color:#fff;">
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('pdfDescription')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:center;width:60px;">${I18n.t('pdfQty')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:right;width:80px;">${I18n.t('pdfUnitPrice')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:right;width:80px;">${I18n.t('pdfAmount')}</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>
        </div>

        <div style="margin-bottom:20px;padding:0 30px;">
          <div style="width:220px;margin-left:auto;">
            <div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 0;">
              <span style="color:#6b7280;">${I18n.t('subtotal')}:</span>
              <span style="font-weight:500;">$${subtotal.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 0;">
              <span style="color:#6b7280;">${I18n.t('tax')}:</span>
              <span style="font-weight:500;">$${tax.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:bold;color:#1e40af;padding:6px 0;margin-top:4px;border-top:1px solid #e5e7eb;">
              <span>${I18n.t('pdfTotal')}:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        ${data.terms ? this.sectionHTML(I18n.t('pdfTerms'), data.terms) : ''}

        ${this.footerHTML(company)}
      </div>
    `;

    this.renderToPDF(html, `Quote-${data.clientName || 'Client'}-${data.date}.pdf`, isPro).catch(err => {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    });
  },

  // ========== INVOICE ==========
  generateInvoice(data, isPro = false) {
    const company = Storage.getCompany();
    const invSeq = Storage.getNextReportNumber('INV', data.date.replace(/-/g, ''));
    const reportNum = `${I18n.t('pdfInvoiceNum')}: INV-${data.date.replace(/-/g, '')}-${invSeq}`;

    const itemsRows = (data.items || []).map(item => {
      const qty = parseFloat(item.quantity) || 1;
      const price = parseFloat(item.price) || 0;
      const total = qty * price;
      return `
        <tr>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;">${this.escapeHtml(item.description) || 'N/A'}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;text-align:center;">${qty}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;text-align:right;">$${price.toFixed(2)}</td>
          <td style="border:1px solid #d1d5db;padding:6px 8px;font-size:11px;text-align:right;">$${total.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const subtotal = parseFloat(data.subtotal) || 0;
    const tax = parseFloat(data.tax) || 0;
    const total = subtotal + tax;
    const statusLabel = data.paymentStatus === 'paid' ? I18n.t('pdfPaid') : I18n.t('pdfUnpaid');
    const statusColor = data.paymentStatus === 'paid' ? '#16a34a' : '#dc2626';

    const html = `
      <div style="padding:0 0 20px 0;">
        ${this.headerHTML(company, I18n.t('pdfInvoice'), reportNum + `<br>${I18n.t('pdfDueDate')}: ${data.dueDate || 'N/A'}`)}

        <div style="margin-bottom:20px;padding:0 30px;">
          <div style="background:#f3f4f6;padding:15px;border-radius:8px;">
            <div style="font-weight:bold;color:#1e40af;font-size:11px;margin-bottom:6px;text-transform:uppercase;">${I18n.t('pdfTo')}</div>
            <div style="font-size:11px;line-height:1.8;">
              <div><strong>${I18n.t('pdfName')}:</strong> ${this.escapeHtml(data.clientName) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfAddress')}:</strong> ${this.escapeHtml(data.clientAddress) || 'N/A'}</div>
              <div><strong>${I18n.t('pdfPhone')}:</strong> ${this.escapeHtml(data.clientPhone) || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:15px;padding:0 30px;">
          <div style="display:flex;gap:20px;margin-bottom:15px;">
            <div style="flex:1;background:#f3f4f6;padding:12px 15px;border-radius:8px;">
              <div style="font-size:10px;color:#6b7280;margin-bottom:2px;">${I18n.t('pdfPaymentMethod')}</div>
              <div style="font-size:12px;font-weight:500;">${this.escapeHtml(data.paymentMethod) || 'N/A'}</div>
            </div>
            <div style="flex:1;background:#f3f4f6;padding:12px 15px;border-radius:8px;text-align:center;">
              <div style="font-size:10px;color:#6b7280;margin-bottom:2px;">${I18n.t('pdfPaymentStatus')}</div>
              <div style="font-size:14px;font-weight:bold;color:${statusColor};">${statusLabel}</div>
            </div>
          </div>
        </div>

        <div style="margin-bottom:15px;padding:0 30px;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#1e40af;color:#fff;">
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:left;">${I18n.t('pdfDescription')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:center;width:60px;">${I18n.t('pdfQty')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:right;width:80px;">${I18n.t('pdfUnitPrice')}</th>
                <th style="border:1px solid #1e40af;padding:6px 8px;font-size:10px;text-align:right;width:80px;">${I18n.t('pdfAmount')}</th>
              </tr>
            </thead>
            <tbody>${itemsRows}</tbody>
          </table>
        </div>

        <div style="margin-bottom:20px;padding:0 30px;">
          <div style="width:220px;margin-left:auto;">
            <div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 0;">
              <span style="color:#6b7280;">${I18n.t('subtotal')}:</span>
              <span style="font-weight:500;">$${subtotal.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 0;">
              <span style="color:#6b7280;">${I18n.t('tax')}:</span>
              <span style="font-weight:500;">$${tax.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:bold;color:#1e40af;padding:6px 0;margin-top:4px;border-top:1px solid #e5e7eb;">
              <span>${I18n.t('pdfTotal')}:</span>
              <span>$${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        ${data.terms ? this.sectionHTML(I18n.t('pdfTerms'), data.terms) : ''}

        ${this.footerHTML(company)}
      </div>
    `;

    this.renderToPDF(html, `Invoice-${data.clientName || 'Client'}-${data.date}.pdf`, isPro).catch(err => {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    });
  },

  // ========== CHEMICAL LOG ==========
  generateChemicalLog(data, isPro = false) {
    const company = Storage.getCompany();
    const title = `${I18n.t('pdfChemLog')}<br><span style="font-size:10px;color:#6b7280;font-weight:normal;">${I18n.t('pdfPeriod')}: ${data.startDate} ${I18n.t('pdfOf')} ${data.endDate}</span>`;

    const rows = (data.logs || []).map(log => `
      <tr>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${log.date || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.client) || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.address) || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.product) || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.epa) || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.amount) || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.area) || ''}</td>
        <td style="border:1px solid #d1d5db;padding:5px 6px;font-size:10px;">${this.escapeHtml(log.technician) || ''}</td>
      </tr>
    `).join('');

    const html = `
      <div style="padding:0 0 20px 0;">
        ${this.headerHTML(company, title, '')}

        <div style="margin-bottom:15px;padding:0 30px;">
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#1e40af;color:#fff;">
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('pdfDate')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('clientName')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('address')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('pdfProduct')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('pdfEpa')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('amount')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('pdfArea')}</th>
                <th style="border:1px solid #1e40af;padding:5px 6px;font-size:9px;text-align:left;">${I18n.t('pdfTech')}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>

        ${this.footerHTML(company)}
      </div>
    `;

    this.renderToPDF(html, `Chemical-Log-${data.startDate}-to-${data.endDate}.pdf`, isPro).catch(err => {
      console.error('PDF generation failed:', err);
      alert('PDF generation failed. Please try again.');
    });
  }
};
