// Formats an ISO date string or Date object for display.
// formatDate('2025-05-17')    → 'May 17, 2025'
// formatDate('2025-05-17', 'short')  → 'May 17'
// formatDate('2025-05-17', 'month')  → 'May 2025'
export const formatDate = (dateStr, style = 'long') => {
  if (!dateStr) return '';
 
  // PostgreSQL DATE columns return '2025-05-17' (no time zone)
  // Parsing '2025-05-17' as a Date in JavaScript gives UTC midnight
  // which can display as May 16 in UTC-X time zones
  // Fix: append T00:00:00 to treat it as local time
  const date = new Date(dateStr + 'T00:00:00');
 
  const options = {
    long:  { year: 'numeric', month: 'long',  day: 'numeric' },
    short: { month: 'short',  day: 'numeric' },
    month: { year: 'numeric', month: 'long'  },
  };
 
  return date.toLocaleDateString('en-US', options[style] || options.long);
};
 
// Returns today's date as YYYY-MM-DD — used as default value for date inputs
export const todayISO = () => {
  return new Date().toISOString().split('T')[0];
};
 
// Returns current month and year as numbers
export const currentMonthYear = () => ({
  month: new Date().getMonth() + 1,  // getMonth() returns 0-11, add 1 for 1-12
  year:  new Date().getFullYear(),
});
