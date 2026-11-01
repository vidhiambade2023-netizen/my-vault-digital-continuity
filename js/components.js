/**
 * MoneyWise Reusable UI Components Library (19 Components)
 * Strictly styled, modern, minimal, interactive states.
 */

// SVG Icon Helper Library (Feather / Lucide equivalent inline SVGs)
const Icons = {
  bell: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  list: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  pieChart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  food: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  transport: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.05 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
  shopping: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  bills: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  entertainment: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
  other: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
  wifiOff: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  sync: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
};

function getCategoryIcon(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('food')) return Icons.food;
  if (cat.includes('transport')) return Icons.transport;
  if (cat.includes('shopping')) return Icons.shopping;
  if (cat.includes('bill')) return Icons.bills;
  if (cat.includes('entertain')) return Icons.entertainment;
  return Icons.other;
}

function getCategoryIconClass(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('food')) return 'tx-icon-food';
  if (cat.includes('transport')) return 'tx-icon-transport';
  if (cat.includes('shopping')) return 'tx-icon-shopping';
  if (cat.includes('bill')) return 'tx-icon-bills';
  if (cat.includes('entertain')) return 'tx-icon-entertainment';
  return 'tx-icon-food';
}

// --------------------------------------------------------------------------
// Component 1: Top Navigation / Header
// --------------------------------------------------------------------------
function ComponentHeader({ greeting, title, showBack = false, backAction = null }) {
  if (showBack) {
    return `
      <div class="top-header header-with-back">
        <button class="back-btn" onclick="${backAction || "store.setScreen('dashboard')"}" id="btn-header-back">
          ${Icons.arrowLeft} Back
        </button>
        <div class="header-title" style="font-size: 16px;">${title}</div>
        <div style="width: 48px;"></div>
      </div>
    `;
  }

  return `
    <div class="top-header">
      <div class="header-text">
        <span class="header-greeting">${greeting || 'Good morning'}</span>
        <h1 class="header-title">${title || "Here's your spending overview"}</h1>
      </div>
      <button class="header-action-btn" title="Notifications" onclick="showToast('No new notifications', 'info')">
        ${Icons.bell}
        <span class="notification-badge"></span>
      </button>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 2: Bottom Navigation
// --------------------------------------------------------------------------
function ComponentBottomNav({ activeTab = 'dashboard' }) {
  return `
    <div class="bottom-nav">
      <button class="nav-item ${activeTab === 'dashboard' ? 'active' : ''}" onclick="store.setScreen('dashboard')">
        ${Icons.home}
        <span>Home</span>
      </button>
      <button class="nav-item ${activeTab === 'transactions' ? 'active' : ''}" onclick="store.setScreen('transactions')">
        ${Icons.list}
        <span>Transactions</span>
      </button>
      <button class="nav-add-btn" onclick="store.setScreen('add-expense')" title="Add Expense">
        ${Icons.plus}
      </button>
      <button class="nav-item ${activeTab === 'budget' ? 'active' : ''}" onclick="store.setScreen('budget')">
        ${Icons.pieChart}
        <span>Budget</span>
      </button>
      <button class="nav-item ${activeTab === 'settings' ? 'active' : ''}" onclick="store.setScreen('settings')">
        ${Icons.settings}
        <span>Settings</span>
      </button>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 3: Primary Button
// --------------------------------------------------------------------------
function ComponentPrimaryButton({ 
  label, 
  id, 
  onClick, 
  isLoading = false, 
  state = 'default', 
  processingText = 'Processing...', 
  successText = 'Expense added',
  errorText = 'Transaction failed',
  disabled = false, 
  icon = '' 
}) {
  let content = `${icon} ${label}`;
  let stateClass = '';

  if (state === 'pressed') {
    stateClass = 'btn-pressed';
  } else if (state === 'processing' || state === 'saving' || isLoading) {
    stateClass = 'btn-state-processing';
    content = `<span class="spinner"></span> ${state === 'saving' ? 'Saving...' : processingText}`;
  } else if (state === 'success' || state === 'saved') {
    stateClass = 'btn-state-success';
    content = `<span class="btn-success-check">${Icons.check}</span> ${state === 'saved' ? 'Budget saved' : successText}`;
  } else if (state === 'error') {
    stateClass = 'btn-state-error';
    content = `<span class="btn-error-icon">${Icons.alertCircle}</span> ${errorText}`;
  }

  const isBtnDisabled = disabled || state === 'processing' || state === 'saving' || state === 'success' || state === 'saved' || state === 'error' || isLoading;

  return `
    <button id="${id}" class="btn-primary ${stateClass}" ${isBtnDisabled ? 'disabled' : ''} onclick="${onClick}">
      ${content}
    </button>
  `;
}

// --------------------------------------------------------------------------
// Component 4: Secondary Button
// --------------------------------------------------------------------------
function ComponentSecondaryButton({ label, id, onClick, isDanger = false, icon = '' }) {
  const classNames = isDanger ? 'btn-secondary btn-danger' : 'btn-secondary';
  return `
    <button id="${id}" class="${classNames}" onclick="${onClick}">
      ${icon} ${label}
    </button>
  `;
}

// --------------------------------------------------------------------------
// Component 5 & 6: Expense Input & Amount Input
// --------------------------------------------------------------------------
function ComponentAmountInput({ value = '450', onChange = '', id = 'input-amount' }) {
  return `
    <div class="form-group">
      <label class="form-label">Amount</label>
      <div class="amount-input-container">
        <span class="amount-currency-symbol">₹</span>
        <input type="number" id="${id}" class="input-amount" value="${value}" placeholder="0" oninput="${onChange}" />
      </div>
    </div>
  `;
}

function ComponentExpenseInput({ label, id, value = '', placeholder = '', error = '', onChange = '' }) {
  return `
    <div class="form-group">
      <label class="form-label" for="${id}">${label}</label>
      <input type="text" id="${id}" class="input-text ${error ? 'error' : ''}" value="${value}" placeholder="${placeholder}" oninput="${onChange}" />
      ${error ? ComponentErrorState(error) : ''}
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 7: Category Selector
// --------------------------------------------------------------------------
function ComponentCategorySelector({ selectedCategory = 'Food', onSelect = '' }) {
  const categories = [
    { name: 'Food', icon: Icons.food },
    { name: 'Transport', icon: Icons.transport },
    { name: 'Shopping', icon: Icons.shopping },
    { name: 'Bills', icon: Icons.bills },
    { name: 'Entertainment', icon: Icons.entertainment },
    { name: 'Other', icon: Icons.other }
  ];

  return `
    <div class="form-group">
      <label class="form-label">Category</label>
      <div class="category-grid">
        ${categories.map(cat => `
          <button type="button" class="category-option ${selectedCategory === cat.name ? 'selected' : ''}" 
                  onclick="selectCategory('${cat.name}')">
            <div class="category-icon">${cat.icon}</div>
            <span class="category-label">${cat.name}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 8: Transaction Row
// --------------------------------------------------------------------------
function ComponentTransactionRow(tx, isNew = false, isDeleting = false) {
  let rowAnimClass = '';
  if (isDeleting || (window.deletingTxId && tx.id === window.deletingTxId)) {
    rowAnimClass = 'tx-row-anim-delete';
  } else if (isNew || (window.latestAddedTxId && tx.id === window.latestAddedTxId)) {
    rowAnimClass = 'tx-row-anim-new';
  }

  let syncBadgeHtml = '';
  if (tx.syncStatus === 'pending') {
    syncBadgeHtml = `
      <span class="tx-sync-badge pending">
        <span class="sync-spin-icon">${Icons.sync}</span> Waiting to sync
      </span>
    `;
  } else if (tx.syncStatus === 'synced') {
    syncBadgeHtml = `
      <span class="tx-sync-badge synced">
        <span class="sync-check-icon">${Icons.check}</span> Synced ✓
      </span>
    `;
  }

  const metaText = tx.metaDate ? `${tx.category} · ${tx.metaDate}` : `${tx.category} · ${tx.date}`;
  return `
    <div class="transaction-row ${rowAnimClass}" onclick="store.setScreen('detail', '${tx.id}')">
      <div class="tx-left">
        <div class="tx-icon-box ${getCategoryIconClass(tx.category)}">
          ${getCategoryIcon(tx.category)}
        </div>
        <div class="tx-info">
          <div class="tx-merchant">
            ${tx.merchant}
            ${syncBadgeHtml}
          </div>
          <div class="tx-meta">
            <span>${metaText}</span>
          </div>
        </div>
      </div>
      <div class="tx-amount">- ${formatINR(tx.amount)}</div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 17: Progress Bar
// --------------------------------------------------------------------------
function ComponentProgressBar({ percentage, status = 'normal' }) {
  let statusClass = '';
  if (percentage >= 100) statusClass = 'danger';
  else if (percentage >= 80) statusClass = 'warning';

  return `
    <div class="progress-bar-container">
      <div class="progress-bar-fill ${statusClass}" style="width: ${Math.min(100, percentage)}%;"></div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 9: Budget Progress Card
// --------------------------------------------------------------------------
function ComponentBudgetProgressCard({ monthlyBudget, spent, remaining, pulseComplete = false }) {
  const percentage = Math.min(100, Math.round((spent / monthlyBudget) * 100));
  let badgeText = 'On Track';
  let badgeClass = 'badge-normal';

  if (percentage >= 100) {
    badgeText = 'Budget Reached';
    badgeClass = 'badge-danger';
  } else if (percentage >= 80) {
    badgeText = `${percentage}% Used`;
    badgeClass = 'badge-warning';
  }

  const containerPulseClass = pulseComplete ? 'pulse-complete' : '';

  return `
    <div class="budget-card">
      <div class="budget-card-header">
        <div>
          <div class="budget-card-title">Monthly Spending</div>
          <div class="budget-card-amount">${formatINR(spent)}</div>
        </div>
        <span class="budget-card-badge ${badgeClass}">${badgeText}</span>
      </div>

      <div class="${containerPulseClass}">
        ${ComponentProgressBar({ percentage, status: percentage >= 100 ? 'danger' : (percentage >= 80 ? 'warning' : 'normal') })}
      </div>

      <div class="budget-stats-row">
        <div class="budget-stat-item">
          <span class="budget-stat-label">Budget</span>
          <span class="budget-stat-value">${formatINR(monthlyBudget)}</span>
        </div>
        <div class="budget-stat-item" style="align-items: flex-end;">
          <span class="budget-stat-label">Remaining</span>
          <span class="budget-stat-value" style="color: ${remaining === 0 ? 'var(--error)' : 'var(--accent-text)'};">${formatINR(remaining)}</span>
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 10: Daily Spending Card
// --------------------------------------------------------------------------
function ComponentDailySpendingCard({ todaySpent, dailyLimit }) {
  const percentage = Math.round((todaySpent / dailyLimit) * 100);
  let limitColor = 'var(--text-primary)';
  if (percentage >= 100) limitColor = 'var(--error)';
  else if (percentage >= 80) limitColor = 'var(--warning)';

  return `
    <div class="daily-card">
      <div class="daily-info">
        <span class="daily-label">Today's Spending</span>
        <div class="daily-values">
          <span class="daily-spent" style="color: ${limitColor}">${formatINR(todaySpent)}</span>
          <span class="daily-limit">/ ${formatINR(dailyLimit)}</span>
        </div>
      </div>
      <div class="daily-meter-box">
        <span style="font-size: 12px; font-weight: 700; color: ${limitColor};">${percentage}%</span>
        ${ComponentProgressBar({ percentage })}
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component: Daily Limit Exceeded Card (Micro-Interaction 10)
// --------------------------------------------------------------------------
function ComponentDailyLimitExceededCard({ 
  todaySpent = 1150, 
  dailyLimit = 1000, 
  isVisible = true, 
  onViewSpending = "store.setScreen('transactions')" 
}) {
  const overAmount = Math.max(0, todaySpent - dailyLimit);
  const animClass = isVisible ? 'visible' : '';

  return `
    <div class="daily-limit-exceeded-card ${animClass}">
      <div class="daily-exceeded-header">
        <div style="flex-shrink: 0; color: var(--error);">${Icons.alertCircle}</div>
        <div class="daily-exceeded-title">Daily limit exceeded</div>
      </div>
      <div class="daily-exceeded-desc">You've spent ${formatINR(overAmount)} over today's limit.</div>
      <button class="daily-exceeded-action-btn" onclick="${onViewSpending}">View spending</button>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 11: Toast Notification Manager
// --------------------------------------------------------------------------
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  let icon = Icons.check;
  let typeClass = 'toast-success';
  if (type === 'warning') { icon = Icons.alertTriangle; typeClass = 'toast-warning'; }
  if (type === 'error') { icon = Icons.alertCircle; typeClass = 'toast-error'; }
  if (type === 'info') { icon = Icons.sparkles; typeClass = 'toast-info'; }

  const toastEl = document.createElement('div');
  toastEl.className = `toast ${typeClass}`;
  toastEl.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-text">${message}</div>
  `;

  toastContainer.appendChild(toastEl);
  // Trigger animation frame
  setTimeout(() => toastEl.classList.add('show'), 10);

  setTimeout(() => {
    toastEl.classList.remove('show');
    setTimeout(() => toastEl.remove(), 250);
  }, 2800);
}

// Bottom Undo Toast Manager (Micro-Interaction 05)
function showUndoToast(message, onUndoAction) {
  dismissUndoToast(); // clear active undo toast if any

  const container = document.getElementById('toast-container-bottom') || document.getElementById('toast-container');
  if (!container) return;

  const toastEl = document.createElement('div');
  toastEl.className = 'toast-bottom';
  toastEl.id = 'active-undo-toast';
  toastEl.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="color: #38BDF8;">${Icons.trash}</div>
      <span>${message}</span>
    </div>
    <button class="toast-undo-btn" onclick="executeUndoAction()">Undo</button>
  `;

  window.activeUndoCallback = onUndoAction;

  container.appendChild(toastEl);
  setTimeout(() => toastEl.classList.add('show'), 10);

  window.activeUndoTimeout = setTimeout(() => {
    dismissUndoToast();
  }, 5000);
}

function dismissUndoToast() {
  const toastEl = document.getElementById('active-undo-toast');
  if (toastEl) {
    toastEl.classList.remove('show');
    setTimeout(() => toastEl.remove(), 250);
  }
  if (window.activeUndoTimeout) clearTimeout(window.activeUndoTimeout);
}

function executeUndoAction() {
  if (typeof window.activeUndoCallback === 'function') {
    const cb = window.activeUndoCallback;
    window.activeUndoCallback = null;
    dismissUndoToast();
    cb();
  }
}

// --------------------------------------------------------------------------
// Component 12: Alert Banner
// --------------------------------------------------------------------------
function ComponentAlertBanner({ message, type = 'warning' }) {
  let icon = Icons.alertTriangle;
  let classType = 'alert-banner-warning';
  if (type === 'error') { icon = Icons.alertCircle; classType = 'alert-banner-error'; }
  if (type === 'info') { icon = Icons.sparkles; classType = 'alert-banner-info'; }

  return `
    <div class="alert-banner ${classType}">
      ${icon}
      <div>${message}</div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component: Budget Warning Message (Micro-Interaction 02)
// --------------------------------------------------------------------------
function ComponentBudgetWarningMessage({ remaining = 2000, isVisible = true }) {
  const animClass = isVisible ? 'visible' : '';
  return `
    <div class="budget-warning-banner ${animClass}">
      <div class="warning-icon-wrap">
        ${Icons.alertTriangle}
      </div>
      <div class="budget-warning-content">
        <div class="budget-warning-primary">You're approaching your budget</div>
        <div class="budget-warning-secondary">${formatINR(remaining)} remaining this month</div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component: Budget Reached Card (Micro-Interaction 06)
// --------------------------------------------------------------------------
function ComponentBudgetReachedCard({ isVisible = true, onReview = "store.setScreen('transactions')" }) {
  const animClass = isVisible ? 'visible' : '';
  return `
    <div class="budget-reached-card ${animClass}">
      <div class="budget-reached-header">
        <div style="flex-shrink: 0;">${Icons.alertCircle}</div>
        <div class="budget-reached-title">Monthly budget reached</div>
      </div>
      <div class="budget-reached-desc">You've used your full ₹10,000 budget.</div>
      <button class="budget-reached-action-btn" onclick="${onReview}">Review spending</button>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 13: Confirmation Modal
// --------------------------------------------------------------------------
function ComponentConfirmationModal({ title, description, confirmText, onConfirm, id = 'confirm-modal' }) {
  return `
    <div id="${id}" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-icon-badge">${Icons.trash}</div>
        <div class="modal-title">${title}</div>
        <div class="modal-description">${description}</div>
        <div class="modal-actions">
          ${ComponentSecondaryButton({ label: 'Cancel', id: 'modal-cancel-btn', onClick: `closeModal('${id}')` })}
          ${ComponentPrimaryButton({ label: confirmText, id: 'modal-confirm-btn', onClick: onConfirm })}
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component: Duplicate Expense Dialog Modal (Micro-Interaction 04)
// --------------------------------------------------------------------------
function ComponentDuplicateModal({ 
  amount = 500, 
  merchant = 'Swiggy', 
  onCancel = "handleCancelDuplicate()", 
  onKeepBoth = "handleKeepBothDuplicate()",
  id = 'duplicate-modal' 
}) {
  return `
    <div id="${id}" class="modal-overlay-center">
      <div class="modal-card-compact">
        <div class="modal-icon-badge-amber">
          ${Icons.alertTriangle}
        </div>
        <div class="modal-title" style="font-size: 18px;">Looks like a duplicate</div>
        <div class="modal-description" style="font-size: 13px; line-height: 1.45;">
          An identical ${formatINR(amount)} ${merchant} expense was already added today.
        </div>
        <div class="modal-actions" style="margin-top: 6px;">
          ${ComponentSecondaryButton({ label: 'Cancel', id: 'modal-dup-cancel-btn', onClick: onCancel })}
          ${ComponentPrimaryButton({ label: 'Keep Both', id: 'modal-dup-keep-btn', onClick: onKeepBoth })}
        </div>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component: Offline Expense Dialog Modal (Micro-Interaction 08)
// --------------------------------------------------------------------------
function ComponentOfflineModal({ 
  onSaveOffline = "handleSaveOfflineSubmit()", 
  onCancel = "closeModal('offline-modal')",
  id = 'offline-modal' 
}) {
  return `
    <div id="${id}" class="modal-overlay-center">
      <div class="modal-card-compact">
        <div class="modal-icon-badge-amber">
          ${Icons.wifiOff}
        </div>
        <div class="modal-title" style="font-size: 18px;">You're offline</div>
        <div class="modal-description" style="font-size: 13px; line-height: 1.45;">
          Your expense will be saved and synced when you're back online.
        </div>
        <div class="modal-actions" style="margin-top: 6px;">
          ${ComponentSecondaryButton({ label: 'Cancel', id: 'modal-offline-cancel-btn', onClick: onCancel })}
          ${ComponentPrimaryButton({ label: 'Save Offline', id: 'modal-offline-save-btn', onClick: onSaveOffline })}
        </div>
      </div>
    </div>
  `;
}

function openModal(id = 'confirm-modal') {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function closeModal(id = 'confirm-modal') {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

// --------------------------------------------------------------------------
// Component 14: Loading State (Shimmer Skeleton)
// --------------------------------------------------------------------------
function ComponentLoadingSkeleton() {
  return `
    <div class="transaction-row" style="opacity: 0.7;">
      <div class="tx-left">
        <div class="skeleton" style="width: 40px; height: 40px; border-radius: 12px;"></div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div class="skeleton" style="width: 100px; height: 14px;"></div>
          <div class="skeleton" style="width: 60px; height: 10px;"></div>
        </div>
      </div>
      <div class="skeleton" style="width: 50px; height: 16px;"></div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 15: Success State Card
// --------------------------------------------------------------------------
function ComponentSuccessState(message) {
  return `
    <div class="success-badge-card">
      ${Icons.check}
      <span>${message}</span>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 16: Error State
// --------------------------------------------------------------------------
function ComponentErrorState(message) {
  return `
    <div class="error-text-msg">
      ${Icons.alertCircle}
      <span>${message}</span>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 18: Category Suggestion Card & Chip (Micro-Interaction 09)
// --------------------------------------------------------------------------
function ComponentCategorySuggestionChip({ category, onClick }) {
  return `
    <div class="suggestion-container">
      <span style="font-size: 12px; color: var(--text-secondary);">Suggested:</span>
      <button type="button" class="suggestion-chip" onclick="${onClick}">
        ${Icons.sparkles}
        <span>${category}</span>
      </button>
    </div>
  `;
}

function ComponentCategorySuggestionCard({ category = 'Transport', onUse = "handleApplySuggestion('Transport')", onChange = "handleChangeSuggestion()" }) {
  const icon = getCategoryIcon(category);
  return `
    <div class="category-suggestion-card suggestion-anim-enter" id="category-suggestion-prompt">
      <div class="suggestion-card-header">
        <span class="suggestion-label">Suggested category</span>
        <button type="button" class="suggestion-change-btn" onclick="${onChange}">Change</button>
      </div>
      <div class="suggestion-card-body">
        <div class="suggestion-cat-pill">
          <span class="suggestion-icon">${icon}</span>
          <span class="suggestion-cat-name">${category}</span>
        </div>
        <button type="button" class="btn-use-suggestion" id="btn-use-cat-suggestion" onclick="${onUse}">
          <span class="btn-use-text">Use ${category}</span>
          <span class="btn-use-check" style="display: none;">${Icons.check}</span>
        </button>
      </div>
    </div>
  `;
}

// --------------------------------------------------------------------------
// Component 19: Offline Status Indicator
// --------------------------------------------------------------------------
function ComponentOfflineIndicator() {
  return `
    <div class="offline-banner">
      <span class="offline-dot"></span>
      ${Icons.wifiOff}
      <span>Offline Mode — Changes saved locally</span>
    </div>
  `;
}
