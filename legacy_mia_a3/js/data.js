/**
 * MoneyWise State Management & Data Provider
 */

// Initial Data Spec
const initialAppData = {
  monthlyBudget: 10000,
  dailyLimit: 1000,
  isOffline: false,
  selectedTransactionId: null,
  currentScreen: 'dashboard', // 'dashboard', 'add-expense', 'transactions', 'budget', 'detail', 'settings', 'component-showcase'
  transactions: [
    {
      id: 'tx-1',
      merchant: 'Swiggy',
      amount: 450,
      category: 'Food',
      date: 'Today, 1:20 PM',
      rawDate: new Date(),
      paymentMethod: 'UPI (GPay)',
      notes: 'Lunch with team'
    },
    {
      id: 'tx-2',
      merchant: 'Uber',
      amount: 150,
      category: 'Transport',
      date: 'Today, 9:15 AM',
      rawDate: new Date(Date.now() - 3600000 * 4),
      paymentMethod: 'Paytm Wallet',
      notes: 'Commute to office'
    },
    {
      id: 'tx-3',
      merchant: 'Amazon',
      amount: 850,
      category: 'Shopping',
      date: 'Yesterday, 6:45 PM',
      rawDate: new Date(Date.now() - 86400000),
      paymentMethod: 'Credit Card',
      notes: 'Desk organizer'
    },
    {
      id: 'tx-4',
      merchant: 'Starbucks',
      amount: 280,
      category: 'Food',
      date: 'Yesterday, 11:30 AM',
      rawDate: new Date(Date.now() - 86400000 * 1.2),
      paymentMethod: 'UPI (PhonePe)',
      notes: 'Iced Latte'
    },
    {
      id: 'tx-5',
      merchant: 'Airtel Broadband',
      amount: 999,
      category: 'Bills',
      date: '20 Sep, 10:00 AM',
      rawDate: new Date(Date.now() - 86400000 * 5),
      paymentMethod: 'Auto-Debit',
      notes: 'Monthly fiber bill'
    },
    {
      id: 'tx-6',
      merchant: 'BookMyShow',
      amount: 540,
      category: 'Entertainment',
      date: '18 Sep, 8:00 PM',
      rawDate: new Date(Date.now() - 86400000 * 7),
      paymentMethod: 'Credit Card',
      notes: 'Movie tickets'
    },
    {
      id: 'tx-7',
      merchant: 'Myntra',
      amount: 1490,
      category: 'Shopping',
      date: '15 Sep, 3:30 PM',
      rawDate: new Date(Date.now() - 86400000 * 10),
      paymentMethod: 'UPI (GPay)',
      notes: 'Cotton shirt'
    },
    {
      id: 'tx-8',
      merchant: 'Zomato',
      amount: 3450,
      category: 'Food',
      date: '12 Sep, 9:00 PM',
      rawDate: new Date(Date.now() - 86400000 * 13),
      paymentMethod: 'UPI (GPay)',
      notes: 'Weekend dinner'
    }
  ]
};

// Application State Store
class AppState {
  constructor() {
    this.data = JSON.parse(JSON.stringify(initialAppData));
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.data));
  }

  // Getters & Derived Financial Calculations
  getMonthlySpent() {
    return this.data.transactions.reduce((acc, tx) => acc + tx.amount, 0);
  }

  getRemainingBudget() {
    return Math.max(0, this.data.monthlyBudget - this.getMonthlySpent());
  }

  getTodaySpent() {
    // Sum transactions from today
    return this.data.transactions
      .filter(tx => tx.date.toLowerCase().includes('today'))
      .reduce((acc, tx) => acc + tx.amount, 0);
  }

  getBudgetUsagePercentage() {
    const spent = this.getMonthlySpent();
    return Math.min(100, Math.round((spent / this.data.monthlyBudget) * 100));
  }

  getDailyUsagePercentage() {
    const today = this.getTodaySpent();
    return Math.min(100, Math.round((today / this.data.dailyLimit) * 100));
  }

  // Actions
  addExpense(expense) {
    const newTx = {
      id: 'tx-' + Date.now(),
      merchant: expense.merchant,
      amount: parseFloat(expense.amount),
      category: expense.category || 'Other',
      date: expense.date || 'Today, Just now',
      rawDate: new Date(),
      paymentMethod: expense.paymentMethod || 'UPI (GPay)',
      notes: expense.notes || ''
    };
    this.data.transactions.unshift(newTx);
    this.notify();
    return newTx;
  }

  deleteTransaction(id) {
    this.data.transactions = this.data.transactions.filter(tx => tx.id !== id);
    if (this.data.selectedTransactionId === id) {
      this.data.selectedTransactionId = null;
    }
    this.notify();
  }

  setMonthlyBudget(amount) {
    this.data.monthlyBudget = Math.max(0, parseFloat(amount));
    this.notify();
  }

  setDailyLimit(amount) {
    this.data.dailyLimit = Math.max(0, parseFloat(amount));
    this.notify();
  }

  toggleOffline() {
    this.data.isOffline = !this.data.isOffline;
    this.notify();
  }

  setScreen(screenName, txId = null) {
    this.data.currentScreen = screenName;
    if (txId) {
      this.data.selectedTransactionId = txId;
    }
    this.notify();
  }

  resetDemoData() {
    this.data = JSON.parse(JSON.stringify(initialAppData));
    this.notify();
  }
}

// Global Store Instance
window.store = new AppState();

// Helper Utilities
function formatINR(amount) {
  if (isNaN(amount)) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

// Smart Category Auto-Suggestion Lookup
const categoryKeywords = {
  'Food': ['swiggy', 'zomato', 'starbucks', 'dominos', 'mcdonalds', 'kfc', 'blinkit', 'zepto', 'dosa', 'restaurant', 'cafe', 'tea', 'coffee', 'chai', 'burger', 'pizza', 'subway'],
  'Transport': ['uber', 'ola', 'rapido', 'metro', 'petrol', 'fuel', 'cab', 'auto', 'bus', 'irctc', 'train', 'flight', 'indigo', 'shell', 'parking'],
  'Shopping': ['amazon', 'flipkart', 'myntra', 'zara', 'nike', 'apple', 'uniqlo', 'h&m', 'meesho', 'nykaa', 'clothes', 'shoes', 'electronics'],
  'Bills': ['airtel', 'jio', 'electricity', 'wifi', 'rent', 'water', 'gas', 'recharge', 'bescom', 'tata play', 'maintenance'],
  'Entertainment': ['bookmyshow', 'netflix', 'spotify', 'movies', 'cinema', 'steam', 'playstation', 'prime', 'pvr', 'hotstar']
};

function suggestCategory(description) {
  if (!description) return null;
  const lower = description.toLowerCase().trim();
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return category;
    }
  }
  return null;
}
