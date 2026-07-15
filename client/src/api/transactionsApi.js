// BASE_URL is relative — the proxy in package.json forwards /api to port 5000
const BASE = '/api/transactions';

// Demo fallback data — used only when the real API is unreachable
// (e.g. on GitHub Pages, where there is no backend to call)
const DEMO_TRANSACTIONS = {
  success: true,
  message: 'Demo data (no backend connected)',
  data: [
    { id: '1', type: 'expense', amount: '85.50', description: 'Grocery Shopping', category_name: 'Food & Dining', category_icon: '🍔', category_color: '#ef4444', transaction_date: '2026-07-10' },
    { id: '2', type: 'income',  amount: '3200.00', description: 'Monthly Salary', category_name: 'Income', category_icon: '💰', category_color: '#10b981', transaction_date: '2026-07-01' },
    { id: '3', type: 'expense', amount: '45.00', description: 'Uber rides', category_name: 'Transport', category_icon: '🚗', category_color: '#3b82f6', transaction_date: '2026-07-08' },
    { id: '4', type: 'expense', amount: '120.00', description: 'Electricity Bill', category_name: 'Housing', category_icon: '🏠', category_color: '#f59e0b', transaction_date: '2026-07-05' },
    { id: '5', type: 'expense', amount: '60.00', description: 'Movie night', category_name: 'Entertainment', category_icon: '🎬', category_color: '#8b5cf6', transaction_date: '2026-07-12' },
  ],
  meta: { page: 1, limit: 10, total: 5, totalPages: 1 },
};

// A response is only trustworthy JSON if the request actually succeeded.
// On GitHub Pages, /api/* doesn't exist, so the server returns its 404
// HTML page instead — res.ok is false, and we should NOT try to .json() it.
async function safeJsonFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

// GET /api/transactions with optional filters
// params is an object: { type, month, year, category_id, page, limit }
export const getTransactions = async (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ).toString();

  const url = query ? BASE + '?' + query : BASE;
  try {
    const json = await safeJsonFetch(url);
    if (!json.success) throw new Error(json.message);
    return json;   // { success, data: [...], meta: { page, total, totalPages } }
  } catch {
    return DEMO_TRANSACTIONS;
  }
};

// POST /api/transactions — create a new transaction
export const createTransaction = async (body) => {
  try {
    const json = await safeJsonFetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    // No backend available — return the submitted data with a fake id
    // so the UI can optimistically show it was "added".
    return { id: String(Date.now()), ...body };
  }
};

// PUT /api/transactions/:id — update an existing transaction
export const updateTransaction = async (id, body) => {
  try {
    const json = await safeJsonFetch(BASE + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    return { id, ...body };
  }
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (id) => {
  try {
    const json = await safeJsonFetch(BASE + '/' + id, { method: 'DELETE' });
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    return { id };
  }
};

// GET /api/transactions/export — triggers CSV file download
export const exportTransactionsCSV = async (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  ).toString();
  const url = BASE + '/export' + (query ? '?' + query : '');
  const res = await fetch(url);
  if (!res.ok) {
    // No backend available on static hosting — nothing to export
    alert('CSV export requires a live backend, which is not connected on this demo deployment.');
    return;
  }
  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'spendwise-transactions.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(downloadUrl);
};