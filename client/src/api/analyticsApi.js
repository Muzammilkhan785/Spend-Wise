const BASE = '/api/analytics';

// Demo fallback data — used only when the real API is unreachable
// (e.g. on GitHub Pages, where there is no backend to call)
const DEMO_SUMMARY = { total_income: '6550.00', total_expense: '1963.77', net_balance: '4586.23' };

const DEMO_MONTHLY = [
  { month: 'Jan', month_number: 1, income: 5200, expense: 1800 },
  { month: 'Feb', month_number: 2, income: 5400, expense: 2100 },
  { month: 'Mar', month_number: 3, income: 6550, expense: 1963 },
  { month: 'Apr', month_number: 4, income: 5900, expense: 2200 },
  { month: 'May', month_number: 5, income: 6100, expense: 1750 },
];

const DEMO_CATEGORIES = [
  { category: 'Housing', amount: 800, percentage: 40.7, color: '#ef4444' },
  { category: 'Food & Dining', amount: 450, percentage: 22.9, color: '#f59e0b' },
  { category: 'Transport', amount: 320, percentage: 16.3, color: '#3b82f6' },
  { category: 'Entertainment', amount: 200, percentage: 10.2, color: '#8b5cf6' },
  { category: 'Other', amount: 193.77, percentage: 9.9, color: '#10b981' },
];

// A response is only trustworthy JSON if the request actually succeeded.
// On GitHub Pages, /api/* doesn't exist, so the server returns its 404
// HTML page instead — res.ok is false, and we should NOT try to .json() it.
async function safeJsonFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('API unavailable');
  return res.json();
}

// GET /api/analytics/summary?month=5&year=2025
// Returns { total_income, total_expense, net_balance }
export const getSummary = async (month, year) => {
  try {
    const json = await safeJsonFetch(BASE + '/summary?month=' + month + '&year=' + year);
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    return DEMO_SUMMARY;
  }
};

// GET /api/analytics/monthly?year=2025
// Returns array: [{ month:'Jan', month_number:1, income:5000, expense:2000 }]
export const getMonthlyData = async (year) => {
  try {
    const json = await safeJsonFetch(BASE + '/monthly?year=' + year);
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    return DEMO_MONTHLY;
  }
};

// GET /api/analytics/categories?month=5&year=2025
// Returns array: [{ category:'Housing', amount:800, percentage:45.5, color:'#...' }]
export const getCategoryBreakdown = async (month, year) => {
  try {
    const json = await safeJsonFetch(BASE + '/categories?month=' + month + '&year=' + year);
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    return DEMO_CATEGORIES;
  }
};

// GET /api/analytics/breakdown?month=5&year=2025
// Same structure as categories — used in the Transactions page right panel
export const getBreakdown = async (month, year) => {
  try {
    const json = await safeJsonFetch(BASE + '/breakdown?month=' + month + '&year=' + year);
    if (!json.success) throw new Error(json.message);
    return json.data;
  } catch {
    return DEMO_CATEGORIES;
  }
};