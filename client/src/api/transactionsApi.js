// BASE_URL is relative — the proxy in package.json forwards /api to port 5000
const BASE = '/api/transactions';
 
// GET /api/transactions with optional filters
// params is an object: { type, month, year, category_id, page, limit }
export const getTransactions = async (params = {}) => {
  // Build a query string from the params object
  // URLSearchParams handles encoding: spaces → %20, etc.
  // Object.entries converts { type:'expense', page:1 } → [['type','expense'],['page','1']]
  // filter(([,v]) => v) removes keys whose value is null/undefined/empty string
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ).toString();
 
  const url = query ? BASE + '?' + query : BASE;
  const res = await fetch(url);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json;   // { success, data: [...], meta: { page, total, totalPages } }
};
 
// POST /api/transactions — create a new transaction
export const createTransaction = async (body) => {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;   // The newly created transaction object
};
 
// PUT /api/transactions/:id — update an existing transaction
export const updateTransaction = async (id, body) => {
  const res = await fetch(BASE + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
 
// DELETE /api/transactions/:id
export const deleteTransaction = async (id) => {
  const res = await fetch(BASE + '/' + id, { method: 'DELETE' });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
 
// GET /api/transactions/export — triggers CSV file download
export const exportTransactionsCSV = async (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  ).toString();
  const url = BASE + '/export' + (query ? '?' + query : '');
  // Use fetch to get the CSV data, then create a download link
  const res = await fetch(url);
  if (!res.ok) throw new Error('Export failed');
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
