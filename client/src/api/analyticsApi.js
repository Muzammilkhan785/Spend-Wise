const BASE = '/api/analytics';
 
// GET /api/analytics/summary?month=5&year=2025
// Returns { total_income, total_expense, net_balance }
export const getSummary = async (month, year) => {
  const res  = await fetch(BASE + '/summary?month=' + month + '&year=' + year);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
 
// GET /api/analytics/monthly?year=2025
// Returns array: [{ month:'Jan', month_number:1, income:5000, expense:2000 }]
export const getMonthlyData = async (year) => {
  const res  = await fetch(BASE + '/monthly?year=' + year);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
 
// GET /api/analytics/categories?month=5&year=2025
// Returns array: [{ category:'Housing', amount:800, percentage:45.5, color:'#...' }]
export const getCategoryBreakdown = async (month, year) => {
  const res  = await fetch(BASE + '/categories?month=' + month + '&year=' + year);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
 
// GET /api/analytics/breakdown?month=5&year=2025
// Same structure as categories — used in the Transactions page right panel
export const getBreakdown = async (month, year) => {
  const res  = await fetch(BASE + '/breakdown?month=' + month + '&year=' + year);
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
};
