# History 详情弹窗 - 实施计划

> **执行方式：** Inline Execution（当前会话内逐步执行，边做边解释原理）

**目标：** 在历史记录列表增加点击查看详情的弹窗，支持轻量编辑核心字段。

**架构：** 纯前端增量开发，不改动现有功能。新增弹窗 DOM + CSS + Storage 更新方法 + app.js 交互逻辑。

**技术栈：** HTML / Tailwind CSS (CDN) / Vanilla JS / localStorage

---

## 文件修改清单

| 文件 | 操作 | 说明 |
|---|---|---|
| `css/app.css` | 追加 | 弹窗样式：毛玻璃背景、动画、分区标题、只读行 |
| `js/storage.js` | 插入 | `updateReport` / `updateQuote` / `updateInvoice` 三个更新方法 |
| `js/i18n.js` | 插入 | 中英西三语翻译键（历史详情、保存更改、放弃更改等） |
| `index.html` | 插入 | `#history-detail-modal` 弹窗 DOM 结构 |
| `js/app.js` | 修改+追加 | 列表项增加点击事件 + `show/save/close/isDirty` 四个新方法 + `escapeHtml` 工具函数 |

---

## Task 1: CSS 弹窗样式

**文件：** `css/app.css`

在文件末尾追加以下样式。

**原理：** 弹窗用 `fixed` 定位覆盖全屏，背景半透明+模糊营造高级感。`.modal-panel` 是白色卡片，带大圆角和阴影。`opacity` + `translateY` 配合 CSS transition 实现淡入上滑动画。

- [ ] **步骤 1: 追加弹窗样式到 app.css 末尾**

```css
/* ─── History Detail Modal ─── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.modal-backdrop.show {
  opacity: 1;
}
.modal-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 512px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  transform: translateY(10px);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-backdrop.show .modal-panel {
  transform: translateY(0);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}
.modal-body {
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  flex: 1;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;
}
.detail-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  margin-bottom: 0.75rem;
  padding-bottom: 0.375rem;
  border-bottom: 1px solid #f1f5f9;
}
.detail-readonly-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
.detail-readonly-row .label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 0;
  width: auto;
  text-align: left;
}
.detail-readonly-row .value {
  font-size: 0.875rem;
  color: #1e293b;
  font-weight: 500;
}
.detail-field {
  margin-bottom: 0.75rem;
}
.detail-field .label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.detail-field .input-field,
.detail-field textarea,
.detail-field select {
  font-size: 0.875rem;
}
```

---

## Task 2: Storage 更新方法

**文件：** `js/storage.js`

在 `deleteInvoice` 方法之后、`getChemicals` 之前插入三个 `updateXxx` 方法。

**原理：** 先从 localStorage 读取整个数组，用 `findIndex` 按 `id` 找到目标项，用对象展开运算符 `{ ...old, ...updates }` 合并新旧数据（保留未修改的字段），再写回 localStorage。这样即使只传了部分字段，也不会丢失原有数据。

- [ ] **步骤 1: 插入 update 方法**

插入位置：第 103 行之后（`deleteInvoice` 结束后的下一行）

```javascript
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
```

---

## Task 3: i18n 翻译键

**文件：** `js/i18n.js`

分别在 `en:`、`zh:`、`es:` 三个字典的末尾（倒数第二个 `}` 之前）插入翻译键。

**原理：** i18n 系统通过 `data-i18n` 属性匹配字典中的键。新增键后需要调用 `I18n.apply()` 重新渲染界面文字。本次新增的键会被弹窗内的 `data-i18n` 属性引用。

- [ ] **步骤 1: 在 en 字典末尾插入（第 451 行之前）**

```javascript
      historyDetailTitle: 'History Detail',
      detailClientInfo: 'Client Information',
      detailServiceDetails: 'Service Details',
      detailNotes: 'Notes & Recommendations',
      detailAmount: 'Amount Details',
      saveChanges: 'Save Changes',
      discardChanges: 'Discard changes?';
      toastChangesSaved: 'Changes saved',
      detailInvoiceDetails: 'Invoice Details',
      detailQuoteDetails: 'Quote Details',
      detailPaymentStatus: 'Payment Status',
      detailDueDate: 'Due Date',
      detailViewDetail: 'View Detail',
```

- [ ] **步骤 2: 在 zh 字典末尾插入（第 229 行之前，需确认具体位置）**

```javascript
      historyDetailTitle: '历史详情',
      detailClientInfo: '客户信息',
      detailServiceDetails: '服务详情',
      detailNotes: '备注与建议',
      detailAmount: '金额详情',
      saveChanges: '保存更改',
      discardChanges: '是否放弃更改？',
      toastChangesSaved: '更改已保存',
      detailInvoiceDetails: '发票详情',
      detailQuoteDetails: '报价详情',
      detailPaymentStatus: '付款状态',
      detailDueDate: '到期日',
      detailViewDetail: '查看详情',
```

- [ ] **步骤 3: 在 es 字典末尾插入（第 675 行之前）**

```javascript
      historyDetailTitle: 'Detalle del Historial',
      detailClientInfo: 'Información del Cliente',
      detailServiceDetails: 'Detalles del Servicio',
      detailNotes: 'Notas y Recomendaciones',
      detailAmount: 'Detalles del Monto',
      saveChanges: 'Guardar Cambios',
      discardChanges: '¿Descartar cambios?',
      toastChangesSaved: 'Cambios guardados',
      detailInvoiceDetails: 'Detalles de la Factura',
      detailQuoteDetails: 'Detalles del Presupuesto',
      detailPaymentStatus: 'Estado de Pago',
      detailDueDate: 'Fecha de Vencimiento',
      detailViewDetail: 'Ver Detalle',
```

---

## Task 4: HTML 弹窗 DOM

**文件：** `index.html`

在 `</body>` 标签之前插入弹窗结构。

**原理：** 弹窗放在 body 最外层，使用 `fixed` 定位才能覆盖整个视口。初始状态加 `hidden` 类隐藏，点击列表项时由 JS 移除 `hidden` 并添加 `show` 触发 CSS 动画。`onclick="if(event.target===this) App.closeHistoryDetail()"` 实现点击背景关闭。

- [ ] **步骤 1: 插入弹窗 HTML**

```html
  <!-- History Detail Modal -->
  <div id="history-detail-modal" class="modal-backdrop hidden" onclick="if(event.target===this) App.closeHistoryDetail()">
    <div class="modal-panel">
      <div class="modal-header">
        <div class="flex items-center gap-2">
          <span id="detail-type-badge" class="text-xs px-2.5 py-1 rounded-full font-semibold"></span>
          <h3 class="text-base font-bold text-gray-900" data-i18n="historyDetailTitle">History Detail</h3>
        </div>
        <button onclick="App.closeHistoryDetail(); event.stopPropagation();" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-600">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body" id="detail-modal-body">
        <!-- Content injected by JS -->
      </div>
      <div class="modal-footer">
        <button onclick="App.closeHistoryDetail(); event.stopPropagation();" class="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition" data-i18n="cancel">Cancel</button>
        <button onclick="App.saveHistoryDetail(); event.stopPropagation();" class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm" data-i18n="saveChanges">Save Changes</button>
      </div>
    </div>
  </div>
```

---

## Task 5: app.js 列表项点击 + 打开弹窗

**文件：** `js/app.js`

**修改点：** `_renderHistoryList` 方法中的列表项 HTML，让卡片整体可点击打开弹窗，但右侧按钮的点击事件要阻止冒泡（`stopPropagation`），避免触发弹窗。

**新增方法：** `showHistoryDetail(id)` 和 `_renderDetailBody(item)`。

**原理：** 事件冒泡是指点击子元素时，事件会向上传递到父元素。列表项卡片整体绑定了 `onclick="App.showHistoryDetail(...)"`，如果点击内部的下载/删除按钮时不阻止冒泡，会同时触发弹窗打开。所以在按钮容器的 div 上加 `onclick="event.stopPropagation()"`。

- [ ] **步骤 1: 修改 `_renderHistoryList` 中的列表项 HTML**

找到 `_renderHistoryList` 方法中 `list.innerHTML = sorted.map(...)` 开头处。

将列表项最外层 div 改为：

```html
<div class="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-blue-300 transition-colors duration-200" onclick="App.showHistoryDetail('${item.id || ''}')" data-history-index="${idx}" data-item-id="${item.id || ''}">
```

将右侧按钮容器 div 改为：

```html
<div class="flex items-center gap-2 shrink-0" onclick="event.stopPropagation()">
```

- [ ] **步骤 2: 追加 `showHistoryDetail` 方法**

插入位置：在 `deleteHistoryItem` 方法之后（约第 951 行之后）

```javascript
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
```

- [ ] **步骤 3: 追加 `_renderDetailBody` 方法**

紧跟在 `showHistoryDetail` 之后：

```javascript
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
```

---

## Task 6: app.js 保存逻辑 + 关闭弹窗

**文件：** `js/app.js`

**新增方法：** `saveHistoryDetail()`、`closeHistoryDetail()`、`isDetailDirty()`、`_escapeHtml()`。

**原理：**
- `saveHistoryDetail` 读取弹窗内所有输入框的值，和原始数据对比。如果没变化就直接关闭，避免无意义写入。有变化则调用 `Storage.updateXxx()`，成功后刷新列表和 Dashboard。
- `closeHistoryDetail` 先检查是否有未保存的修改（调用 `isDetailDirty`），有的话弹出浏览器原生确认框。关闭时用 CSS class 控制动画（先移除 `show` 让 opacity 变 0，200ms 后再加回 `hidden`）。
- `isDetailDirty` 将当前弹窗内所有字段的值和原始 JSON 对比，任一字段不同就返回 true。
- `_escapeHtml` 是一个简单的 HTML 实体转义函数，防止用户输入的特殊字符破坏页面结构（XSS 防护）。

- [ ] **步骤 1: 追加 `saveHistoryDetail` 方法**

```javascript
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
```

- [ ] **步骤 2: 追加 `closeHistoryDetail` 和 `isDetailDirty` 方法**

```javascript
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
```

- [ ] **步骤 3: 追加 `_escapeHtml` 工具方法**

放在 `App` 对象最末尾（最后一个方法之后，`};` 之前）：

```javascript
  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },
```

---

## Task 7: 验证测试

- [ ] **步骤 1: 启动本地服务器**

```bash
cd /e/Desktop/claude/pest-report-pro
npx serve .
```

- [ ] **步骤 2: 功能验证清单**

| 测试项 | 期望结果 |
|---|---|
| 进入 History → 点击 Reports 列表项左侧 | 弹出详情弹窗，带蓝色 "Service Reports" 标签 |
| 弹窗内修改客户名 → 点击保存 | Toast 提示 "Changes saved"，列表刷新，数据已更新 |
| 进入 Invoices → 点击列表项 | 弹窗带紫色标签，付款状态可下拉切换 |
| 修改字段后点击背景或 × | 弹出确认框 "Discard changes?" |
| 不修改直接点保存 | 弹窗直接关闭，无 Toast |
| 点击下载/删除按钮 | 不触发弹窗，正常下载/删除 |
| 手机端查看 | 弹窗宽度适配，内容可滚动 |

---

## 自检清单

**Spec 覆盖检查：**
- [x] 弹窗 UI（毛玻璃背景、圆角阴影、动画）→ Task 1 + Task 4
- [x] 三种类型的可编辑/只读字段 → Task 5 `_renderDetailBody`
- [x] 付款状态下拉（Invoice）→ Task 5 Invoice 分支
- [x] 保存后刷新列表和 Dashboard → Task 6 `saveHistoryDetail`
- [x] 未保存更改提示 → Task 6 `closeHistoryDetail` + `isDetailDirty`
- [x] 不改动现有功能 → 所有修改均为追加或局部 HTML 属性调整

**Placeholder 检查：** 无 TBD、TODO 或模糊描述。

**类型一致性：** `Storage.updateXxx` 签名一致，弹窗字段 ID 统一使用 `detail-` 前缀。