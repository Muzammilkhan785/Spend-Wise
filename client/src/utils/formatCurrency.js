// Formats a number as a currency string.
// formatCurrency(1234.5)           → '$1,234.50'
// formatCurrency(1234.5, 'PKR')    → 'PKR 1,234.50'
// formatCurrency(-45.99)           → '-$45.99'
export const formatCurrency = (amount, currency = 'USD') => {
  // Intl.NumberFormat is a built-in JavaScript object for number formatting
  // It knows the rules for thousands separators and decimal places for each currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',         // Format as money
    currency: currency,        // Which currency symbol to use
    minimumFractionDigits: 2,  // Always show 2 decimal places: $5.00 not $5
    maximumFractionDigits: 2,  // Never show more than 2 decimals
  }).format(Number(amount));
};
 
// Formats just the number with commas — no currency symbol
// formatNumber(12450) → '12,450.00'
export const formatNumber = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
};
