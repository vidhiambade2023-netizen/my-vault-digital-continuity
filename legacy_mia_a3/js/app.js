/**
 * MoneyWise Core Application Controller & Screen Renderer
 */

let selectedCategoryState = 'Food';
let currentFormError = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  store.subscribe(renderApp);
  renderApp(store.data);

  // Check URL query parameters for Figma state deep-linking e.g., ?state=15
  const urlParams = new URLSearchParams(window.location.search);
  const figmaState = urlParams.get('state') || urlParams.get('figmaState');
  if (figmaState) {
    setFigmaCaptureState(figmaState);
  }
});

// Render Main Container & Active Screen
function renderApp(state) {
  const appScreen = document.getElementById('app-screen');
  if (!appScreen) return;

  const isOffline = state.isOffline;
  const currentScreen = state.currentScreen;

  // Build screen HTML content according to active screen
  let screenHTML = '';
  if (isOffline) {
    screenHTML += ComponentOfflineIndicator();
  }

  switch (currentScreen) {
    case 'dashboard':
      screenHTML += renderDashboardScreen(state);
      break;
    case 'add-expense':
      screenHTML += renderAddExpenseScreen(state);
      break;
    case 'transactions':
      screenHTML += renderTransactionsScreen(state);
      break;
    case 'budget':
      screenHTML += renderBudgetScreen(state);
      break;
    case 'detail':
      screenHTML += renderDetailScreen(state);
      break;
    case 'settings':
      screenHTML += renderSettingsScreen(state);
      break;
    case 'payment':
      screenHTML += renderPaymentScreen(state);
      break;
    case 'showcase':
      screenHTML += renderShowcaseScreen(state);
      break;
    default:
      screenHTML += renderDashboardScreen(state);
  }

  // Inject active tab for bottom navigation
  let activeTab = currentScreen;
  if (currentScreen === 'detail') activeTab = 'transactions';
  if (currentScreen === 'showcase') activeTab = '';
  
  screenHTML += ComponentBottomNav({ activeTab });

  appScreen.innerHTML = screenHTML;
  appScreen.className = 'screen-view active';

  // Attach search listeners if on transactions screen
  if (currentScreen === 'transactions') {
    const searchInput = document.getElementById('tx-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => filterTransactionsList(e.target.value));
    }
  }
}

// Default form state for Micro-Interaction 01
window.addExpenseAmount = '450';
window.addExpenseDesc = 'Swiggy';
window.addExpenseButtonState = 'default';
window.latestAddedTxId = null;

// State variables for Micro-Interaction 02 (Budget Warning)
window.mi02Active = false;
window.mi02State = 'state-1'; // 'state-1' (₹7,900 / 79%) or 'state-2' (₹8,000 / 80%)

function setMI02State(stateName) {
  window.mi06Active = false;
  window.mi02Active = true;
  window.mi02State = stateName;
  store.notify();
}

// State variables for Micro-Interaction 06 (Budget Reached)
window.mi06Active = false;
window.mi06State = 'state-1'; // 'state-1' (₹9,950 / 99.5%) or 'state-2' (₹10,000 / 100%)
window.mi06Pulse = false;

function setMI06State(stateName) {
  window.mi02Active = false;
  window.mi06Active = true;
  window.mi06State = stateName;

  if (stateName === 'state-2') {
    window.mi06Pulse = true;
    setTimeout(() => {
      window.mi06Pulse = false;
      store.notify();
    }, 350);
  } else {
    window.mi06Pulse = false;
  }

  store.notify();
}

// --------------------------------------------------------------------------
// SCREEN 1 — DASHBOARD
// --------------------------------------------------------------------------
function renderDashboardScreen(state) {
  let monthlySpent = store.getMonthlySpent();
  let remaining = store.getRemainingBudget();
  let monthlyBudget = state.monthlyBudget;
  let budgetPercentage = store.getBudgetUsagePercentage();

  // Override numbers if Micro-Interaction 02 testing mode is active
  if (window.mi02Active) {
    monthlyBudget = 10000;
    if (window.mi02State === 'state-1') {
      monthlySpent = 7900;
      remaining = 2100;
      budgetPercentage = 79;
    } else {
      monthlySpent = 8000;
      remaining = 2000;
      budgetPercentage = 80;
    }
  }

  // Override numbers if Micro-Interaction 06 testing mode is active
  if (window.mi06Active) {
    monthlyBudget = 10000;
    if (window.mi06State === 'state-1') {
      monthlySpent = 9950;
      remaining = 50;
      budgetPercentage = 99.5;
    } else {
      monthlySpent = 10000;
      remaining = 0;
      budgetPercentage = 100;
    }
  }

  const recentTxs = state.transactions.slice(0, 4);

  return `
    ${ComponentHeader({ greeting: 'Good morning', title: "Here's your spending overview" })}
    
    ${window.mi02Active ? `
      <div style="display: flex; gap: 6px; margin-bottom: 4px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
        <button class="filter-chip ${window.mi02State === 'state-1' ? 'active' : ''}" onclick="setMI02State('state-1')">State 1: Normal (₹7,900)</button>
        <button class="filter-chip ${window.mi02State === 'state-2' ? 'active' : ''}" onclick="setMI02State('state-2')">State 2: Approaching (₹8,000)</button>
      </div>
    ` : ''}

    ${window.mi06Active ? `
      <div style="display: flex; gap: 6px; margin-bottom: 4px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
        <button class="filter-chip ${window.mi06State === 'state-1' ? 'active' : ''}" onclick="setMI06State('state-1')">State 1: Near Limit (₹9,950)</button>
        <button class="filter-chip ${window.mi06State === 'state-2' ? 'active' : ''}" onclick="setMI06State('state-2')">State 2: Reached 100% (₹10,000)</button>
      </div>
    ` : ''}

    ${window.mi10Active ? `
      <div style="display: flex; gap: 6px; margin-bottom: 4px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
        <button class="filter-chip ${window.mi10State === 'state-1' ? 'active' : ''}" onclick="setMI10State('state-1')">State 1: Normal (₹850 / 85%)</button>
        <button class="filter-chip ${window.mi10State === 'state-2' ? 'active' : ''}" onclick="setMI10State('state-2')">State 2: Exceeded (₹1,150 / 115%)</button>
      </div>
    ` : ''}

    ${(window.mi06Active && window.mi06State === 'state-2') || (!window.mi06Active && budgetPercentage >= 100) 
      ? ComponentBudgetReachedCard({ isVisible: true, onReview: "store.setScreen('transactions')" }) 
      : ((window.mi02Active || budgetPercentage >= 80) 
        ? ComponentBudgetWarningMessage({ remaining: remaining, isVisible: true }) 
        : '')
    }

    ${(store.getTodaySpent() > state.dailyLimit || (window.mi10Active && window.mi10State === 'state-2'))
      ? ComponentDailyLimitExceededCard({
          todaySpent: store.getTodaySpent(),
          dailyLimit: state.dailyLimit,
          isVisible: true,
          onViewSpending: "store.setScreen('transactions')"
        })
      : ''
    }

    ${ComponentBudgetProgressCard({
      monthlyBudget: monthlyBudget,
      spent: monthlySpent,
      remaining: remaining,
      pulseComplete: window.mi06Pulse
    })}

    ${ComponentDailySpendingCard({
      todaySpent: store.getTodaySpent(),
      dailyLimit: state.dailyLimit
    })}

    <div class="section-header">
      <h2 class="section-title">Recent Transactions</h2>
      <span class="section-link" onclick="store.setScreen('transactions')">View All</span>
    </div>

    <div class="transaction-list">
      ${recentTxs.length > 0 
        ? recentTxs.map(tx => ComponentTransactionRow(tx, tx.id === window.latestAddedTxId)).join('')
        : `<div style="text-align: center; color: var(--text-secondary); padding: 20px;">No transactions yet.</div>`
      }
    </div>
  `;
}

window.mi10Active = false;
window.mi10State = 'state-1';

function setMI10State(stateName) {
  window.mi02Active = false;
  window.mi06Active = false;
  window.mi10Active = true;
  window.mi10State = stateName;

  // Clear demo transactions to maintain exact starting numbers
  store.data.transactions = store.data.transactions.filter(t => t.id !== 'tx-mi10-demo' && t.id !== 'tx-mi10-exceeded');

  if (stateName === 'state-1') {
    // Starting state: Today's spending = ₹850, Limit = ₹1,000 (85%)
    store.data.transactions.unshift({
      id: 'tx-mi10-demo',
      merchant: 'Lunch & Coffee',
      amount: 850,
      category: 'Food',
      date: 'Today, 1:15 PM',
      rawDate: new Date(),
      paymentMethod: 'UPI (GPay)',
      notes: 'Starting state ₹850'
    });
  } else {
    // Exceeded state: ₹850 + ₹300 = ₹1,150 (₹150 over limit)
    store.data.transactions.unshift(
      {
        id: 'tx-mi10-demo',
        merchant: 'Lunch & Coffee',
        amount: 850,
        category: 'Food',
        date: 'Today, 1:15 PM',
        rawDate: new Date(),
        paymentMethod: 'UPI (GPay)',
        notes: 'Starting state ₹850'
      },
      {
        id: 'tx-mi10-exceeded',
        merchant: 'Dinner Party',
        amount: 300,
        category: 'Food',
        date: 'Today, 8:45 PM',
        rawDate: new Date(),
        paymentMethod: 'Credit Card',
        notes: 'Exceeded by ₹150'
      }
    );
    window.latestAddedTxId = 'tx-mi10-exceeded';
  }

  store.notify();
}

window.overrideDuplicate = false;
window.isDuplicateDemo = false;

// --------------------------------------------------------------------------
// SCREEN 2 — ADD EXPENSE
// --------------------------------------------------------------------------
function renderAddExpenseScreen(state) {
  const desc = window.addExpenseDesc !== undefined ? window.addExpenseDesc : 'Swiggy';
  const amount = window.addExpenseAmount !== undefined ? window.addExpenseAmount : '450';
  const suggestedCat = suggestCategory(desc);

  return `
    ${ComponentHeader({ title: 'Add Expense', showBack: true })}

    ${(state.isOffline || window.isOfflineDemo) ? ComponentOfflineIndicator() : ''}

    <form id="add-expense-form" onsubmit="handleExpenseSubmit(event)">
      <div style="display: flex; flex-direction: column; gap: 18px;">
        ${ComponentAmountInput({ 
          value: amount,
          onChange: 'window.addExpenseAmount = this.value;'
        })}

        <div>
          ${ComponentExpenseInput({
            label: 'Description',
            id: 'input-merchant',
            value: desc,
            placeholder: 'e.g. Swiggy, Uber, Amazon',
            error: currentFormError,
            onChange: 'onDescriptionChange(this.value)'
          })}
        </div>

        ${(suggestedCat && !window.mi09SuggestionDismissed) ? ComponentCategorySuggestionCard({
          category: suggestedCat,
          onUse: `handleApplySuggestion('${suggestedCat}')`,
          onChange: 'handleChangeSuggestion()'
        }) : ''}

        ${ComponentCategorySelector({ selectedCategory: selectedCategoryState })}

        ${ComponentExpenseInput({
          label: 'Date',
          id: 'input-date',
          value: 'Today',
          placeholder: 'Today',
          onChange: ''
        })}

        <div style="margin-top: 8px;">
          ${ComponentPrimaryButton({
            label: 'Add Expense',
            id: 'btn-add-expense-submit',
            onClick: 'handleExpenseSubmit(event)',
            state: window.addExpenseButtonState || 'default'
          })}
        </div>
      </div>
    </form>

    ${ComponentDuplicateModal({
      amount: parseFloat(amount) || 500,
      merchant: desc || 'Swiggy',
      onCancel: 'handleCancelDuplicate()',
      onKeepBoth: 'handleKeepBothDuplicate()'
    })}

    ${ComponentOfflineModal({
      onSaveOffline: 'handleSaveOfflineSubmit()',
      onCancel: 'handleCancelOffline()'
    })}
  `;
}

function selectCategory(catName) {
  selectedCategoryState = catName;
  store.notify();
}

function onDescriptionChange(val) {
  window.addExpenseDesc = val;
  window.mi09SuggestionDismissed = false;
  store.notify();
}

function handleApplySuggestion(categoryName) {
  const btn = document.getElementById('btn-use-cat-suggestion');
  const promptCard = document.getElementById('category-suggestion-prompt');

  if (btn) {
    btn.classList.add('applied');
    const checkEl = btn.querySelector('.btn-use-check');
    if (checkEl) checkEl.style.display = 'inline-flex';
  }

  // 1. Update Category to Transport
  selectedCategoryState = categoryName;

  // 2. Animate suggestion card exit over 280ms
  setTimeout(() => {
    if (promptCard) {
      promptCard.classList.add('suggestion-anim-exit');
    }
    showToast(`Category set to ${categoryName} ✓`, 'success');
    
    setTimeout(() => {
      window.mi09SuggestionDismissed = true;
      store.notify();
    }, 280);
  }, 350);
}

function handleChangeSuggestion() {
  const promptCard = document.getElementById('category-suggestion-prompt');
  if (promptCard) {
    promptCard.classList.add('suggestion-anim-exit');
  }
  setTimeout(() => {
    window.mi09SuggestionDismissed = true;
    showToast('Select a category from the list below', 'info');
    store.notify();
    const catGrid = document.querySelector('.category-grid');
    if (catGrid) {
      catGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 250);
}

function applyCategorySuggestion(catName) {
  selectedCategoryState = catName;
  showToast(`Category set to ${catName}`, 'info');
  store.notify();
}

function handleExpenseSubmit(e) {
  if (e) e.preventDefault();

  // Prevent multiple taps during processing/success states
  if (window.addExpenseButtonState === 'processing' || window.addExpenseButtonState === 'success') {
    return;
  }

  const desc = window.addExpenseDesc !== undefined && window.addExpenseDesc.trim() !== '' ? window.addExpenseDesc : 'Swiggy';
  const amount = parseFloat(window.addExpenseAmount || '450');

  if (!desc.trim()) {
    currentFormError = 'Please enter an expense description';
    store.notify();
    return;
  }

  currentFormError = null;

  // Micro-Interaction 08: Offline Expense Trigger
  if ((store.data.isOffline || window.isOfflineDemo) && !window.bypassOfflineCheck) {
    openModal('offline-modal');
    return;
  }

  // Check if an identical transaction was already added today
  const isDuplicate = store.data.transactions.some(tx => 
    tx.merchant.toLowerCase().trim() === desc.toLowerCase().trim() && 
    tx.amount === amount
  );

  // Micro-Interaction 04: Duplicate Detection Trigger
  if ((isDuplicate || window.isDuplicateDemo) && !window.overrideDuplicate) {
    // Do NOT immediately add transaction. Show compact confirmation dialog.
    openModal('duplicate-modal');
    return;
  }

  // STATE 2 — PROCESSING
  // 1. Give the button a subtle pressed/compressed scale effect (~120ms)
  window.addExpenseButtonState = 'pressed';
  store.notify();

  setTimeout(() => {
    // 2. Transition button into loading state ("Adding expense...", spinner, disabled)
    window.addExpenseButtonState = 'processing';
    store.notify();

    // STATE 3 — SUCCESS
    // After short simulated processing delay (~800ms):
    setTimeout(() => {
      // 3. Change button into "✓ Expense added" with checkmark scaling 80% to 100%
      window.addExpenseButtonState = 'success';
      store.notify();

      // STATE 4 — STATE CHANGE
      // After success feedback display (~650ms), navigate to Dashboard
      setTimeout(() => {
        const newTx = store.addExpense({
          merchant: desc,
          amount: amount,
          category: selectedCategoryState || 'Food',
          date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metaDate: 'Just now'
        });

        window.latestAddedTxId = newTx.id;

        // Reset state for repeatable testing
        window.addExpenseDesc = 'Swiggy';
        window.addExpenseAmount = '450';
        window.addExpenseButtonState = 'default';
        window.overrideDuplicate = false;
        window.isDuplicateDemo = false;

        // Navigate back to Dashboard & show toast
        showToast(`Expense added: ${newTx.merchant} (${formatINR(newTx.amount)})`, 'success');
        store.setScreen('dashboard');

        // Clear highlight animation flag after 1.5s
        setTimeout(() => {
          if (window.latestAddedTxId === newTx.id) {
            window.latestAddedTxId = null;
          }
        }, 1500);

      }, 650);

    }, 800);

  }, 120);
}

function handleCancelDuplicate() {
  closeModal('duplicate-modal');
  window.addExpenseButtonState = 'default';
  showToast('Cancelled — Duplicate expense not added', 'info');
  store.notify();
}

function handleKeepBothDuplicate() {
  closeModal('duplicate-modal');
  window.overrideDuplicate = true;
  showToast('Keeping both transactions', 'info');
  handleExpenseSubmit();
}

function handleSaveOfflineSubmit() {
  closeModal('offline-modal');

  const desc = window.addExpenseDesc !== undefined && window.addExpenseDesc.trim() !== '' ? window.addExpenseDesc : 'Cafe';
  const amount = parseFloat(window.addExpenseAmount || '250');
  const cat = selectedCategoryState || 'Food';

  // 1. Show feedback "Saved offline"
  showToast('Saved offline', 'warning');

  // 2. Add transaction to the transaction list with syncStatus 'pending'
  const newTx = store.addExpense({
    merchant: desc,
    amount: amount,
    category: cat,
    date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    metaDate: 'Just now'
  });

  newTx.syncStatus = 'pending';
  window.latestAddedTxId = newTx.id;

  // Reset Add Expense form state
  window.addExpenseDesc = 'Swiggy';
  window.addExpenseAmount = '450';
  window.addExpenseButtonState = 'default';

  // Navigate to Dashboard
  store.setScreen('dashboard');

  // 3. Simulate internet connection returning after 1.6 seconds
  setTimeout(() => {
    newTx.syncStatus = 'synced';
    window.isOfflineDemo = false;
    store.notify();
    showToast('Internet connection restored — Expense synced ✓', 'success');

    // Return to normal display after 3.2s
    setTimeout(() => {
      delete newTx.syncStatus;
      store.notify();
    }, 3200);
  }, 1600);
}

function handleCancelOffline() {
  closeModal('offline-modal');
  window.addExpenseButtonState = 'default';
  showToast('Cancelled offline save', 'info');
  store.notify();
}

// --------------------------------------------------------------------------
// SCREEN 3 — TRANSACTIONS
// --------------------------------------------------------------------------
let selectedFilterCategory = 'All';

function renderTransactionsScreen(state) {
  let filtered = state.transactions;
  if (selectedFilterCategory !== 'All') {
    filtered = filtered.filter(tx => tx.category.toLowerCase() === selectedFilterCategory.toLowerCase());
  }

  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'];

  return `
    ${ComponentHeader({ greeting: 'History', title: 'Transactions' })}

    <div class="search-box">
      <div class="search-icon">${Icons.search}</div>
      <input type="text" id="tx-search-input" class="input-search" placeholder="Search merchant or category..." />
    </div>

    <div class="filter-chips">
      ${categories.map(cat => `
        <button class="filter-chip ${selectedFilterCategory === cat ? 'active' : ''}" 
                onclick="setFilterCategory('${cat}')">
          ${cat}
        </button>
      `).join('')}
    </div>

    <div id="tx-list-container" class="transaction-list">
      ${filtered.length > 0 
        ? filtered.map(tx => ComponentTransactionRow(tx)).join('')
        : `<div style="text-align: center; color: var(--text-secondary); padding: 30px;">No matching transactions.</div>`
      }
    </div>
  `;
}

function setFilterCategory(cat) {
  selectedFilterCategory = cat;
  store.notify();
}

function filterTransactionsList(query) {
  const container = document.getElementById('tx-list-container');
  if (!container) return;

  const q = query.toLowerCase().trim();
  let filtered = store.data.transactions;
  
  if (selectedFilterCategory !== 'All') {
    filtered = filtered.filter(tx => tx.category.toLowerCase() === selectedFilterCategory.toLowerCase());
  }

  if (q) {
    filtered = filtered.filter(tx => 
      tx.merchant.toLowerCase().includes(q) || 
      tx.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 30px;">No matching transactions found.</div>`;
  } else {
    container.innerHTML = filtered.map(tx => ComponentTransactionRow(tx)).join('');
  }
}

window.mi07SaveState = 'default';
window.editBudgetInputVal = '12000';

function handleSaveBudget(e) {
  if (e) e.preventDefault();

  if (window.mi07SaveState === 'saving' || window.mi07SaveState === 'saved') {
    return;
  }

  const inputEl = document.getElementById('input-edit-budget');
  const val = inputEl ? parseFloat(inputEl.value) : 12000;
  const newAmount = isNaN(val) ? 12000 : val;

  // STATE 1 → Pressed scale effect (120ms)
  window.mi07SaveState = 'pressed';
  store.notify();

  setTimeout(() => {
    // STATE 2 — SAVING ("Saving...", spinner, disabled) over 200ms ease-out
    window.mi07SaveState = 'saving';
    store.notify();

    setTimeout(() => {
      // STATE 3 — SAVED ("✓ Budget saved", checkmark 80%->100% scale) over 250-300ms ease-out
      window.mi07SaveState = 'saved';
      store.notify();

      // Return to normal budget display with updated amount
      setTimeout(() => {
        store.setMonthlyBudget(newAmount);
        window.mi07SaveState = 'default';
        window.editBudgetInputVal = newAmount;

        // Reset MI02 / MI06 demo overrides if active
        window.mi02Active = false;
        window.mi06Active = false;

        showToast(`Monthly budget updated to ${formatINR(newAmount)}`, 'success');
        store.notify();
      }, 700);

    }, 850);

  }, 120);
}

// --------------------------------------------------------------------------
// SCREEN 4 — BUDGET
// --------------------------------------------------------------------------
function renderBudgetScreen(state) {
  const monthlySpent = store.getMonthlySpent();
  const remaining = store.getRemainingBudget();
  const todaySpent = store.getTodaySpent();

  // Category breakdown stats
  const catBreakdown = [
    { name: 'Food', limit: 4000 },
    { name: 'Shopping', limit: 3000 },
    { name: 'Transport', limit: 2000 },
    { name: 'Bills', limit: 1000 }
  ].map(cat => {
    const spent = state.transactions
      .filter(tx => tx.category.toLowerCase() === cat.name.toLowerCase())
      .reduce((a, b) => a + b.amount, 0);
    return { ...cat, spent, percentage: Math.round((spent / cat.limit) * 100) };
  });

  return `
    ${ComponentHeader({ greeting: 'Overview', title: 'Budget & Limits' })}

    ${ComponentBudgetProgressCard({
      monthlyBudget: state.monthlyBudget,
      spent: monthlySpent,
      remaining: remaining
    })}

    <!-- Micro-Interaction 07: Edit Monthly Budget Section -->
    <div class="detail-card">
      <div class="section-title">Edit Monthly Budget</div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div class="amount-input-container" style="padding: 10px 14px;">
          <span class="amount-currency-symbol" style="font-size: 22px;">₹</span>
          <input type="number" id="input-edit-budget" class="input-amount" style="font-size: 22px; width: 140px;" 
                 value="${window.editBudgetInputVal || state.monthlyBudget || '12000'}" 
                 oninput="window.editBudgetInputVal = this.value" />
        </div>
        ${ComponentPrimaryButton({
          label: 'Save Budget',
          id: 'btn-save-budget-mi07',
          onClick: 'handleSaveBudget(event)',
          state: window.mi07SaveState || 'default',
          processingText: 'Saving...',
          successText: 'Budget saved'
        })}
      </div>
    </div>

    ${ComponentDailySpendingCard({
      todaySpent: todaySpent,
      dailyLimit: state.dailyLimit
    })}

    <div class="section-header" style="margin-top: 4px;">
      <h2 class="section-title">Category Breakdown</h2>
    </div>

    <div class="detail-card">
      ${catBreakdown.map(cat => `
        <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600;">
            <span style="display: flex; align-items: center; gap: 6px;">
              <span class="category-icon" style="width: 24px; height: 24px; font-size: 10px;">
                ${getCategoryIcon(cat.name)}
              </span>
              ${cat.name}
            </span>
            <span>${formatINR(cat.spent)} / ${formatINR(cat.limit)}</span>
          </div>
          ${ComponentProgressBar({ percentage: cat.percentage })}
        </div>
      `).join('')}
    </div>
  `;
}

// --------------------------------------------------------------------------
// SCREEN 5 — TRANSACTION DETAIL
// --------------------------------------------------------------------------
function renderDetailScreen(state) {
  const tx = state.transactions.find(t => t.id === state.selectedTransactionId) || state.transactions[0];

  if (!tx) {
    return `
      ${ComponentHeader({ title: 'Transaction Detail', showBack: true })}
      <div style="text-align: center; padding: 40px; color: var(--text-secondary);">Transaction not found.</div>
    `;
  }

  return `
    ${ComponentHeader({ title: 'Transaction Detail', showBack: true, backAction: "store.setScreen('transactions')" })}

    <div class="detail-card" style="align-items: center; text-align: center; padding: 28px 20px;">
      <div class="tx-icon-box ${getCategoryIconClass(tx.category)}" style="width: 56px; height: 56px; border-radius: 18px;">
        ${getCategoryIcon(tx.category)}
      </div>
      <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 8px;">${tx.merchant}</div>
      <div style="font-size: 32px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;">- ${formatINR(tx.amount)}</div>
      <span class="tx-category-badge" style="font-size: 12px; padding: 4px 10px;">${tx.category}</span>
    </div>

    <div class="detail-card">
      <div class="detail-row">
        <span class="detail-label">Date & Time</span>
        <span class="detail-value">${tx.date}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Method</span>
        <span class="detail-value">${tx.paymentMethod || 'UPI'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Notes</span>
        <span class="detail-value">${tx.notes || 'None'}</span>
      </div>
    </div>

    <div style="margin-top: 12px;">
      ${ComponentSecondaryButton({
        label: 'Delete Transaction',
        id: 'btn-delete-tx',
        isDanger: true,
        icon: Icons.trash,
        onClick: `openModal('delete-tx-modal')`
      })}
    </div>

    ${ComponentConfirmationModal({
      id: 'delete-tx-modal',
      title: 'Delete transaction?',
      description: 'Are you sure you want to delete this transaction?',
      confirmText: 'Delete',
      onConfirm: `confirmDeleteTx('${tx.id}')`
    })}
  `;
}

function confirmDeleteTx(txId) {
  // Find transaction to backup for Undo recovery
  const targetTx = store.data.transactions.find(t => t.id === txId) || {
    id: txId,
    merchant: 'Amazon',
    amount: 850,
    category: 'Shopping',
    date: 'Yesterday, 6:45 PM',
    rawDate: new Date(),
    paymentMethod: 'Credit Card',
    notes: 'Desk organizer'
  };

  const targetIndex = store.data.transactions.findIndex(t => t.id === txId);
  const insertPos = targetIndex !== -1 ? targetIndex : 2;

  // Step 1: Close modal (200ms ease-out)
  closeModal('delete-tx-modal');

  // Mark deleting row on screen for animation
  window.deletingTxId = txId;

  // Navigate to Dashboard if on detail screen to show row exit animation
  if (store.data.currentScreen === 'detail') {
    store.setScreen('dashboard');
  } else {
    store.notify();
  }

  // Step 2 & 3: Animate row sliding left & fading out over 300ms, then remove from store
  setTimeout(() => {
    store.deleteTransaction(txId);
    window.deletingTxId = null;
    store.notify();

    // Step 4: Show bottom toast "Transaction deleted" with "Undo" action (sliding upward 250ms)
    showUndoToast('Transaction deleted', () => {
      // RECOVERY / UNDO ACTION
      // 1. Restore transaction back into store at original position
      store.data.transactions.splice(insertPos, 0, targetTx);
      window.latestAddedTxId = targetTx.id;

      // 2. Animate row back into list (280ms) & recalculate budget
      store.notify();
      showToast(`Restored ${targetTx.merchant} (${formatINR(targetTx.amount)})`, 'success');

      setTimeout(() => {
        if (window.latestAddedTxId === targetTx.id) {
          window.latestAddedTxId = null;
        }
      }, 1500);
    });

  }, 300);
}

// --------------------------------------------------------------------------
// SCREEN 6 — SETTINGS / LIMITS
// --------------------------------------------------------------------------
function renderSettingsScreen(state) {
  return `
    ${ComponentHeader({ greeting: 'Preferences', title: 'Settings & Limits' })}

    <div class="detail-card">
      <div class="section-title">Monthly Budget</div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <input type="number" id="setting-monthly-budget" class="input-text" value="${state.monthlyBudget}" style="font-weight: 600;" />
        <button class="btn-primary" style="width: auto; padding: 0 16px;" onclick="saveMonthlyBudgetSetting()">Save</button>
      </div>
    </div>

    <div class="detail-card">
      <div class="section-title">Daily Spending Limit</div>
      <div style="display: flex; gap: 10px; align-items: center;">
        <input type="number" id="setting-daily-limit" class="input-text" value="${state.dailyLimit}" style="font-weight: 600;" />
        <button class="btn-primary" style="width: auto; padding: 0 16px;" onclick="saveDailyLimitSetting()">Save</button>
      </div>
    </div>

    <div class="detail-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div class="section-title">Offline Mode</div>
          <div style="font-size: 12px; color: var(--text-secondary);">Simulate offline expense queuing</div>
        </div>
        <button class="btn-secondary" style="width: auto; padding: 6px 14px; height: 36px;" onclick="store.toggleOffline()">
          ${state.isOffline ? 'Disable' : 'Enable'}
        </button>
      </div>
    </div>

    <div class="detail-card">
      <div class="section-title">Component Showcase View</div>
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">Inspect all 19 reusable UI components & states</div>
      ${ComponentSecondaryButton({
        label: 'View Component Catalog',
        id: 'btn-open-showcase',
        onClick: "store.setScreen('showcase')"
      })}
    </div>

    <div style="margin-top: 8px;">
      ${ComponentSecondaryButton({
        label: 'Reset Demo Data',
        id: 'btn-reset-data',
        isDanger: true,
        onClick: 'resetAppData()'
      })}
    </div>
  `;
}

function saveMonthlyBudgetSetting() {
  const input = document.getElementById('setting-monthly-budget');
  if (input) {
    store.setMonthlyBudget(input.value);
    showToast('Monthly budget saved', 'success');
  }
}

function saveDailyLimitSetting() {
  const input = document.getElementById('setting-daily-limit');
  if (input) {
    store.setDailyLimit(input.value);
    showToast('Daily spending limit saved', 'success');
  }
}

function resetAppData() {
  store.resetDemoData();
  showToast('Demo data restored', 'info');
}

// --------------------------------------------------------------------------
// SCREEN — PAYMENT (MICRO-INTERACTION 03: TRANSACTION PROCESSING)
// --------------------------------------------------------------------------
window.mi03PaymentAmount = 2500;
window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
window.mi03ButtonState = 'default'; // 'default', 'pressed', 'processing', 'success', 'error'
window.mi03BranchMode = 'success'; // 'success' or 'error'

function setMI03Branch(branchName) {
  window.mi03BranchMode = branchName;
  window.mi03ButtonState = 'default';
  store.notify();
}

function renderPaymentScreen(state) {
  const isErrorState = window.mi03ButtonState === 'error';

  return `
    ${ComponentHeader({ title: 'Payment Flow', showBack: true, backAction: "store.setScreen('dashboard')" })}

    <!-- Evaluator Branch Switcher -->
    <div style="display: flex; gap: 6px; margin-bottom: 4px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
      <button class="filter-chip ${window.mi03BranchMode === 'success' ? 'active' : ''}" onclick="setMI03Branch('success')">Branch A: Success Flow</button>
      <button class="filter-chip ${window.mi03BranchMode === 'error' ? 'active' : ''}" onclick="setMI03Branch('error')">Branch B: Error & Recovery</button>
    </div>

    <!-- Payment Amount Card -->
    <div class="detail-card" style="align-items: center; text-align: center; padding: 24px 20px;">
      <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em;">Payment</div>
      <div style="font-size: 34px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em; margin: 4px 0;">${formatINR(window.mi03PaymentAmount || 2500)}</div>
      <div style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">${window.mi03PaymentMerchant}</div>
    </div>

    <div class="detail-card">
      <div class="detail-row">
        <span class="detail-label">Payment Method</span>
        <span class="detail-value">UPI (GPay)</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Date</span>
        <span class="detail-value">Today</span>
      </div>
    </div>

    <!-- Error Alert Banner when in Error State -->
    <div id="payment-error-box">
      ${isErrorState ? ComponentAlertBanner({
        message: '<strong>Transaction failed:</strong> Something went wrong. Your payment was not completed.',
        type: 'error'
      }) : ''}
    </div>

    <!-- Action Buttons -->
    <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 10px;">
      ${isErrorState ? ComponentPrimaryButton({
        label: 'Try again',
        id: 'btn-payment-try-again',
        onClick: 'handlePaymentStart()',
        icon: ''
      }) : ComponentPrimaryButton({
        label: `Pay ${formatINR(window.mi03PaymentAmount || 2500)}`,
        id: 'btn-payment-submit',
        onClick: 'handlePaymentStart()',
        state: window.mi03ButtonState || 'default',
        processingText: 'Processing...',
        successText: 'Payment successful',
        errorText: 'Transaction failed'
      })}
    </div>
  `;
}

function handlePaymentStart() {
  if (window.mi03ButtonState === 'processing' || window.mi03ButtonState === 'success') {
    return;
  }

  // 1. Button press effect (120ms)
  window.mi03ButtonState = 'pressed';
  store.notify();

  setTimeout(() => {
    // 2. Transition into loading state ("Processing...", spinner, disabled) over 200ms ease-out
    window.mi03ButtonState = 'processing';
    store.notify();

    // 3. Simulated processing delay (~900ms)
    setTimeout(() => {
      if (window.mi03BranchMode === 'error') {
        // ERROR BRANCH
        window.mi03ButtonState = 'error';
        store.notify();
        showToast('Payment failed — tap Try again to retry', 'error');
      } else {
        // SUCCESS BRANCH
        window.mi03ButtonState = 'success';
        store.notify();

        // Update transaction state in store
        const newTx = store.addExpense({
          merchant: window.mi03PaymentMerchant,
          amount: window.mi03PaymentAmount || 2500,
          category: 'Bills',
          date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          metaDate: 'Just now'
        });

        window.latestAddedTxId = newTx.id;
        showToast(`Payment of ${formatINR(newTx.amount)} completed`, 'success');

        // After success transition (900ms), return to Dashboard
        setTimeout(() => {
          window.mi03ButtonState = 'default';
          store.setScreen('dashboard');
        }, 900);
      }
    }, 900);

  }, 120);
}

// --------------------------------------------------------------------------
// SCREEN 7 — REUSABLE COMPONENT SHOWCASE (All 19 Components)
// --------------------------------------------------------------------------
function renderShowcaseScreen(state) {
  return `
    ${ComponentHeader({ title: '19 Components Showcase', showBack: true })}

    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- 1. Top Navigation -->
      <div class="detail-card">
        <div class="section-title">1. Top Navigation / Header</div>
        ${ComponentHeader({ greeting: 'Good morning', title: "Here's your spending overview" })}
      </div>

      <!-- 2. Bottom Navigation -->
      <div class="detail-card">
        <div class="section-title">2. Bottom Navigation</div>
        <div style="position: relative; height: 72px; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden;">
          ${ComponentBottomNav({ activeTab: 'dashboard' })}
        </div>
      </div>

      <!-- 3. Primary Button -->
      <div class="detail-card">
        <div class="section-title">3. Primary Button</div>
        ${ComponentPrimaryButton({ label: 'Primary Action', id: 'sc-p1', onClick: '' })}
        ${ComponentPrimaryButton({ label: 'Disabled Primary', id: 'sc-p2', disabled: true, onClick: '' })}
        ${ComponentPrimaryButton({ label: 'Loading Primary', id: 'sc-p3', isLoading: true, onClick: '' })}
      </div>

      <!-- 4. Secondary Button -->
      <div class="detail-card">
        <div class="section-title">4. Secondary Button</div>
        ${ComponentSecondaryButton({ label: 'Secondary Action', id: 'sc-s1', onClick: '' })}
        ${ComponentSecondaryButton({ label: 'Danger Action', id: 'sc-s2', isDanger: true, onClick: '' })}
      </div>

      <!-- 5 & 6. Inputs -->
      <div class="detail-card">
        <div class="section-title">5 & 6. Expense & Amount Input</div>
        ${ComponentAmountInput({ value: '450' })}
        ${ComponentExpenseInput({ label: 'Description Input', id: 'sc-inp1', value: 'Swiggy', placeholder: 'Enter merchant' })}
        ${ComponentExpenseInput({ label: 'Error Input State', id: 'sc-inp2', value: '', placeholder: 'Required field', error: 'Field cannot be empty' })}
      </div>

      <!-- 7. Category Selector -->
      <div class="detail-card">
        <div class="section-title">7. Category Selector</div>
        ${ComponentCategorySelector({ selectedCategory: 'Food' })}
      </div>

      <!-- 8. Transaction Row -->
      <div class="detail-card">
        <div class="section-title">8. Transaction Row</div>
        ${ComponentTransactionRow({ id: 'sc-tx', merchant: 'Swiggy', amount: 450, category: 'Food', date: 'Today, 1:20 PM' })}
      </div>

      <!-- 9 & 10. Budget & Daily Cards -->
      <div class="detail-card">
        <div class="section-title">9 & 10. Budget & Daily Cards</div>
        ${ComponentBudgetProgressCard({ monthlyBudget: 10000, spent: 8200, remaining: 1800 })}
        ${ComponentDailySpendingCard({ todaySpent: 650, dailyLimit: 1000 })}
      </div>

      <!-- 11 & 12. Toast & Alert Banner -->
      <div class="detail-card">
        <div class="section-title">11 & 12. Toast & Alert Banners</div>
        ${ComponentAlertBanner({ message: 'Warning: 82% of monthly budget used', type: 'warning' })}
        ${ComponentAlertBanner({ message: 'Alert: Daily limit exceeded', type: 'error' })}
        ${ComponentAlertBanner({ message: 'Info: Category auto-suggested', type: 'info' })}
      </div>

      <!-- 14, 15, 16. States -->
      <div class="detail-card">
        <div class="section-title">14, 15, 16. Loading, Success, Error States</div>
        ${ComponentLoadingSkeleton()}
        ${ComponentSuccessState('Transaction recorded successfully')}
        ${ComponentErrorState('Unable to process payment')}
      </div>

      <!-- 17, 18, 19. Progress, Chip, Offline -->
      <div class="detail-card">
        <div class="section-title">17, 18, 19. Progress, Chip, Offline Indicator</div>
        ${ComponentProgressBar({ percentage: 82 })}
        ${ComponentCategorySuggestionChip({ category: 'Food', onClick: '' })}
        ${ComponentOfflineIndicator()}
      </div>

    </div>
  `;
}

// --------------------------------------------------------------------------
// 10 MICRO-INTERACTION PRESET HANDLERS (For UX Evaluators)
// --------------------------------------------------------------------------
function triggerMicroInteraction(presetNumber) {
  switch (presetNumber) {
    case 1: // Add Expense
      window.addExpenseDesc = 'Swiggy';
      window.addExpenseAmount = '450';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.isDuplicateWarning = false;
      store.setScreen('add-expense');
      showToast('Micro-Interaction 01: Add Expense (State 1 Default)', 'info');
      break;

    case 2: // Budget Warning (Micro-Interaction 02)
      window.mi02Active = true;
      window.mi02State = 'state-1';
      store.setScreen('dashboard');
      showToast('State 1: Normal Budget (₹7,900 / 79%)', 'info');

      setTimeout(() => {
        window.mi02State = 'state-2';
        store.notify();
        showToast('State 2: Approaching Budget (₹8,000 / 80%)', 'warning');
      }, 750);
      break;

    case 3: // Transaction Processing (Micro-Interaction 03)
      window.mi03PaymentAmount = 2500;
      window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
      window.mi03ButtonState = 'default';
      window.mi03BranchMode = 'success';
      store.setScreen('payment');
      showToast('Micro-Interaction 03: Payment Flow (₹2,500)', 'info');
      break;

    case 4: // Duplicate Expense (Micro-Interaction 04)
      window.addExpenseDesc = 'Swiggy';
      window.addExpenseAmount = '500';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.overrideDuplicate = false;
      window.isDuplicateDemo = true;
      store.setScreen('add-expense');
      showToast('Micro-Interaction 04: Tap "Add Expense" to trigger Duplicate Dialog', 'info');
      break;

    case 5: // Delete Transaction (Micro-Interaction 05)
      let amazonTx = store.data.transactions.find(t => t.merchant.toLowerCase().includes('amazon'));
      if (!amazonTx) {
        amazonTx = {
          id: 'tx-amazon-demo',
          merchant: 'Amazon',
          amount: 850,
          category: 'Shopping',
          date: 'Yesterday, 6:45 PM',
          rawDate: new Date(),
          paymentMethod: 'Credit Card',
          notes: 'Desk organizer'
        };
        store.data.transactions.splice(2, 0, amazonTx);
        store.notify();
      }

      store.setScreen('detail', amazonTx.id);
      setTimeout(() => openModal('delete-tx-modal'), 220);
      showToast('Micro-Interaction 05: Delete Confirmation (Amazon ₹850)', 'info');
      break;

    case 6: // Budget Reached (Micro-Interaction 06)
      window.mi02Active = false;
      window.mi06Active = true;
      window.mi06State = 'state-1';
      store.setScreen('dashboard');
      showToast('State 1: Near Budget Limit (₹9,950 / 99.5%)', 'info');

      setTimeout(() => {
        setMI06State('state-2');
        showToast('State 2: 100% Budget Reached (₹10,000)', 'error');
      }, 750);
      break;

    case 7: // Budget Saved
      store.setMonthlyBudget(10000);
      window.editBudgetInputVal = '12000';
      window.mi07SaveState = 'default';
      store.setScreen('budget');
      showToast('Micro-Interaction 07: Edit Budget (Starting ₹10,000 → Tap Save for ₹12,000)', 'info');
      break;

    case 8: // Offline Expense (Micro-Interaction 08)
      window.isOfflineDemo = true;
      if (!store.data.isOffline) store.data.isOffline = true;
      window.addExpenseDesc = 'Cafe';
      window.addExpenseAmount = '250';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      store.setScreen('add-expense');
      setTimeout(() => openModal('offline-modal'), 220);
      showToast('Micro-Interaction 08: Offline Expense (₹250 Cafe) — Tap "Save Offline"', 'warning');
      break;

    case 9: // Category Suggestion (Micro-Interaction 09)
      window.addExpenseAmount = '150';
      window.addExpenseDesc = 'Uber';
      selectedCategoryState = 'Food';
      window.mi09SuggestionDismissed = false;
      window.addExpenseButtonState = 'default';
      store.setScreen('add-expense');
      showToast('Micro-Interaction 09: Suggested Category (Transport) — Tap "Use Transport"', 'info');
      break;

    case 10: // Daily Spending Limit (Micro-Interaction 10)
      window.mi02Active = false;
      window.mi06Active = false;
      window.mi10Active = true;
      setMI10State('state-1');
      store.setScreen('dashboard');
      showToast('State 1: Today\'s spending ₹850 / ₹1,000 (85%)', 'info');

      setTimeout(() => {
        setMI10State('state-2');
        showToast('State 2: Daily limit exceeded! ₹1,150 (₹150 over limit)', 'error');
      }, 950);
      break;

    default:
      console.log('Preset not recognized');
  }
}

// Phone frame size toggle helper
function togglePhoneFrameMode(mode) {
  const wrapper = document.getElementById('phone-wrapper');
  if (!wrapper) return;

  const btnDevice = document.getElementById('view-btn-device');
  const btnFull = document.getElementById('view-btn-full');

  if (mode === 'fullscreen') {
    wrapper.classList.add('fullscreen-mode');
    if (btnDevice) btnDevice.classList.remove('active');
    if (btnFull) btnFull.classList.add('active');
  } else {
    wrapper.classList.remove('fullscreen-mode');
    if (btnDevice) btnDevice.classList.add('active');
    if (btnFull) btnFull.classList.remove('active');
  }
}

// --------------------------------------------------------------------------
// FIGMA CODE TO CANVAS DESIGN CAPTURE (34 States Engine)
// --------------------------------------------------------------------------
function setFigmaCaptureState(stateId) {
  stateId = parseInt(stateId, 10);
  if (isNaN(stateId)) return;

  const selectEl = document.getElementById('figma-state-select');
  if (selectEl) selectEl.value = stateId.toString();

  // Reset demo flags & overlays
  window.mi02Active = false;
  window.mi06Active = false;
  window.mi10Active = false;
  window.isOfflineDemo = false;
  store.data.isOffline = false;
  closeModal('confirm-modal');
  closeModal('delete-tx-modal');
  closeModal('duplicate-modal');
  closeModal('offline-modal');

  switch (stateId) {
    // 1. Dashboard — default
    case 1:
      store.setScreen('dashboard');
      showToast('Figma State 01: Dashboard — Default', 'info');
      break;

    // 2. Add Expense — default
    case 2:
      window.addExpenseAmount = '450';
      window.addExpenseDesc = 'Swiggy';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 02: Add Expense — Default', 'info');
      break;

    // 3. Add Expense — processing
    case 3:
      window.addExpenseAmount = '450';
      window.addExpenseDesc = 'Swiggy';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'processing';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 03: Add Expense — Processing', 'info');
      break;

    // 4. Add Expense — success
    case 4:
      window.addExpenseAmount = '450';
      window.addExpenseDesc = 'Swiggy';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'success';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 04: Add Expense — Success (✓ Expense added)', 'success');
      break;

    // 5. Add Expense — final transaction added
    case 5:
      let swiggyTx = store.data.transactions.find(t => t.merchant === 'Swiggy' && t.amount === 450);
      if (!swiggyTx) {
        swiggyTx = store.addExpense({
          merchant: 'Swiggy',
          amount: 450,
          category: 'Food',
          date: 'Today, 1:20 PM',
          metaDate: 'Just now'
        });
      }
      window.latestAddedTxId = swiggyTx.id;
      store.setScreen('dashboard');
      showToast('Figma State 05: Add Expense — Final Transaction Added to Dashboard', 'success');
      break;

    // 6. Budget — normal
    case 6:
      store.setMonthlyBudget(10000);
      store.setScreen('budget');
      showToast('Figma State 06: Budget — Normal', 'info');
      break;

    // 7. Budget — approaching warning
    case 7:
      window.mi02Active = true;
      window.mi02State = 'state-2';
      store.setScreen('dashboard');
      showToast('Figma State 07: Budget — Approaching Warning (>80%)', 'warning');
      break;

    // 8. Budget — 100% reached
    case 8:
      window.mi06Active = true;
      window.mi06State = 'state-2';
      store.setScreen('dashboard');
      showToast('Figma State 08: Budget — 100% Reached', 'error');
      break;

    // 9. Transaction Processing — default
    case 9:
      window.mi03PaymentAmount = 2500;
      window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
      window.mi03ButtonState = 'default';
      store.setScreen('payment');
      showToast('Figma State 09: Transaction Processing — Default', 'info');
      break;

    // 10. Transaction Processing — processing
    case 10:
      window.mi03PaymentAmount = 2500;
      window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
      window.mi03ButtonState = 'processing';
      store.setScreen('payment');
      showToast('Figma State 10: Transaction Processing — Processing', 'info');
      break;

    // 11. Transaction Processing — success
    case 11:
      window.mi03PaymentAmount = 2500;
      window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
      window.mi03ButtonState = 'success';
      store.setScreen('payment');
      showToast('Figma State 11: Transaction Processing — Success', 'success');
      break;

    // 12. Transaction Processing — failure
    case 12:
      window.mi03PaymentAmount = 2500;
      window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
      window.mi03ButtonState = 'error';
      window.mi03BranchMode = 'error';
      store.setScreen('payment');
      showToast('Figma State 12: Transaction Processing — Failure', 'error');
      break;

    // 13. Transaction Processing — retry
    case 13:
      window.mi03PaymentAmount = 2500;
      window.mi03PaymentMerchant = 'Airtel Fiber Broadband';
      window.mi03ButtonState = 'processing';
      window.mi03BranchMode = 'error';
      store.setScreen('payment');
      showToast('Figma State 13: Transaction Processing — Retry', 'warning');
      break;

    // 14. Duplicate Expense — default
    case 14:
      window.addExpenseDesc = 'Swiggy';
      window.addExpenseAmount = '500';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 14: Duplicate Expense — Default', 'info');
      break;

    // 15. Duplicate Expense — duplicate warning modal
    case 15:
      window.addExpenseDesc = 'Swiggy';
      window.addExpenseAmount = '500';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      setTimeout(() => openModal('duplicate-modal'), 50);
      showToast('Figma State 15: Duplicate Expense — Warning Modal', 'warning');
      break;

    // 16. Duplicate Expense — cancelled
    case 16:
      window.addExpenseDesc = 'Swiggy';
      window.addExpenseAmount = '500';
      selectedCategoryState = 'Food';
      store.setScreen('add-expense');
      showToast('Cancelled — Duplicate expense not added', 'info');
      break;

    // 17. Duplicate Expense — kept both
    case 17:
      handleKeepBothDuplicate();
      showToast('Figma State 17: Duplicate Expense — Kept Both', 'success');
      break;

    // 18. Delete Transaction — default
    case 18:
      let amazonTx18 = store.data.transactions.find(t => t.merchant.toLowerCase().includes('amazon'));
      if (!amazonTx18) {
        amazonTx18 = {
          id: 'tx-amazon-demo',
          merchant: 'Amazon',
          amount: 850,
          category: 'Shopping',
          date: 'Yesterday, 6:45 PM',
          rawDate: new Date(),
          paymentMethod: 'Credit Card',
          notes: 'Desk organizer'
        };
        store.data.transactions.splice(2, 0, amazonTx18);
      }
      store.setScreen('detail', amazonTx18.id);
      showToast('Figma State 18: Delete Transaction — Default Detail View', 'info');
      break;

    // 19. Delete Transaction — confirmation modal
    case 19:
      let amazonTx19 = store.data.transactions.find(t => t.merchant.toLowerCase().includes('amazon'));
      if (!amazonTx19) {
        amazonTx19 = {
          id: 'tx-amazon-demo',
          merchant: 'Amazon',
          amount: 850,
          category: 'Shopping',
          date: 'Yesterday, 6:45 PM',
          rawDate: new Date(),
          paymentMethod: 'Credit Card',
          notes: 'Desk organizer'
        };
        store.data.transactions.splice(2, 0, amazonTx19);
      }
      store.setScreen('detail', amazonTx19.id);
      setTimeout(() => openModal('delete-tx-modal'), 50);
      showToast('Figma State 19: Delete Transaction — Confirmation Modal', 'warning');
      break;

    // 20. Delete Transaction — deleted with undo toast
    case 20:
      let amazonTx20 = store.data.transactions.find(t => t.merchant.toLowerCase().includes('amazon'));
      if (amazonTx20) {
        store.deleteTransaction(amazonTx20.id);
      }
      store.setScreen('transactions');
      showUndoToast('Transaction deleted', () => {});
      showToast('Figma State 20: Delete Transaction — Deleted with Undo Toast', 'info');
      break;

    // 21. Delete Transaction — restored
    case 21:
      executeUndoAction();
      store.setScreen('transactions');
      showToast('Figma State 21: Delete Transaction — Restored', 'success');
      break;

    // 22. Budget Saved — editing
    case 22:
      store.setMonthlyBudget(10000);
      window.editBudgetInputVal = '12000';
      window.mi07SaveState = 'default';
      store.setScreen('budget');
      showToast('Figma State 22: Budget Saved — Editing (₹12,000)', 'info');
      break;

    // 23. Budget Saved — saving
    case 23:
      store.setMonthlyBudget(10000);
      window.editBudgetInputVal = '12000';
      window.mi07SaveState = 'saving';
      store.setScreen('budget');
      showToast('Figma State 23: Budget Saved — Saving...', 'info');
      break;

    // 24. Budget Saved — saved
    case 24:
      store.setMonthlyBudget(12000);
      window.editBudgetInputVal = '12000';
      window.mi07SaveState = 'saved';
      store.setScreen('budget');
      showToast('Figma State 24: Budget Saved — Saved (✓ Budget saved)', 'success');
      break;

    // 25. Offline Expense — default
    case 25:
      window.isOfflineDemo = true;
      store.data.isOffline = true;
      window.addExpenseDesc = 'Cafe';
      window.addExpenseAmount = '250';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 25: Offline Expense — Default Offline Form', 'info');
      break;

    // 26. Offline Expense — offline warning
    case 26:
      window.isOfflineDemo = true;
      store.data.isOffline = true;
      window.addExpenseDesc = 'Cafe';
      window.addExpenseAmount = '250';
      selectedCategoryState = 'Food';
      window.addExpenseButtonState = 'default';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      setTimeout(() => openModal('offline-modal'), 50);
      showToast('Figma State 26: Offline Expense — Offline Warning Modal', 'warning');
      break;

    // 27. Offline Expense — saved offline
    case 27:
      window.isOfflineDemo = true;
      store.data.isOffline = true;
      window.addExpenseDesc = 'Cafe';
      window.addExpenseAmount = '250';
      selectedCategoryState = 'Food';
      store.setScreen('add-expense');
      showToast('Saved offline', 'warning');
      break;

    // 28. Offline Expense — waiting to sync
    case 28:
      let pendingTx = store.data.transactions.find(t => t.merchant === 'Cafe' && t.amount === 250);
      if (!pendingTx) {
        pendingTx = store.addExpense({
          merchant: 'Cafe',
          amount: 250,
          category: 'Food',
          date: 'Today, 2:30 PM',
          metaDate: 'Just now'
        });
      }
      pendingTx.syncStatus = 'pending';
      window.latestAddedTxId = pendingTx.id;
      store.setScreen('dashboard');
      showToast('Figma State 28: Offline Expense — Waiting to Sync', 'warning');
      break;

    // 29. Offline Expense — synced
    case 29:
      let syncedTx = store.data.transactions.find(t => t.merchant === 'Cafe' && t.amount === 250);
      if (!syncedTx) {
        syncedTx = store.addExpense({
          merchant: 'Cafe',
          amount: 250,
          category: 'Food',
          date: 'Today, 2:30 PM',
          metaDate: 'Just now'
        });
      }
      syncedTx.syncStatus = 'synced';
      window.latestAddedTxId = syncedTx.id;
      store.setScreen('dashboard');
      showToast('Figma State 29: Offline Expense — Synced ✓', 'success');
      break;

    // 30. Category Suggestion — before suggestion
    case 30:
      window.addExpenseDesc = '';
      window.addExpenseAmount = '150';
      selectedCategoryState = 'Food';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 30: Category Suggestion — Before Suggestion', 'info');
      break;

    // 31. Category Suggestion — suggestion visible
    case 31:
      window.addExpenseDesc = 'Uber';
      window.addExpenseAmount = '150';
      selectedCategoryState = 'Food';
      window.mi09SuggestionDismissed = false;
      store.setScreen('add-expense');
      showToast('Figma State 31: Category Suggestion — Suggestion Visible (Transport)', 'info');
      break;

    // 32. Category Suggestion — category confirmed
    case 32:
      window.addExpenseDesc = 'Uber';
      window.addExpenseAmount = '150';
      selectedCategoryState = 'Transport';
      window.mi09SuggestionDismissed = true;
      store.setScreen('add-expense');
      showToast('Figma State 32: Category Suggestion — Category Confirmed (Transport)', 'success');
      break;

    // 33. Daily Spending Limit — normal
    case 33:
      setMI10State('state-1');
      store.setScreen('dashboard');
      showToast('Figma State 33: Daily Spending Limit — Normal (₹850 / 85%)', 'info');
      break;

    // 34. Daily Spending Limit — exceeded
    case 34:
      setMI10State('state-2');
      store.setScreen('dashboard');
      showToast('Figma State 34: Daily Spending Limit — Exceeded (₹1,150 / 115%)', 'error');
      break;

    default:
      store.setScreen('dashboard');
  }
}
