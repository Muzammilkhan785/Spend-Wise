const pool = require('../../config/db');

const getSummary = async (userID, month, year) => {
    const sql = `
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0)
        - COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS net_balance
    FROM transactions
    WHERE user_id = $1
      AND EXTRACT(MONTH FROM transaction_date) = $2
      AND EXTRACT(YEAR FROM transaction_date) = $3
    `;
    const result = await pool.query(sql, [userID, month, year]);
    return result.rows[0];
};

const getMonth = async (userID, year) => {
    const sql = `
    SELECT
      EXTRACT(MONTH FROM transaction_date)::INT AS month_number,
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS expense
    FROM transactions
    WHERE user_id = $1
      AND EXTRACT(YEAR FROM transaction_date) = $2
    GROUP BY EXTRACT(MONTH FROM transaction_date)
    ORDER BY month_number
    `;
    const result = await pool.query(sql, [userID, year]);
    return result.rows;
};

const getCategoryBreakdown = async (userId, month, year) => {
  const sql = `
    SELECT
      c.name    AS category,
      c.color   AS color,
      c.icon_name    AS icon,
      SUM(t.amount) AS amount,
      ROUND(
        SUM(t.amount) * 100.0 /
        NULLIF(SUM(SUM(t.amount)) OVER (), 0),
        1
      ) AS percentage
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
      AND t.type = 'expense'
      AND EXTRACT(MONTH FROM t.transaction_date) = $2
      AND EXTRACT(YEAR  FROM t.transaction_date) = $3
    GROUP BY c.id, c.name, c.color, c.icon_name
    ORDER BY amount DESC
  `;
  const result = await pool.query(sql, [userId, month, year]);
  return result.rows;
};
 
// ── SPEND BREAKDOWN (transaction history panel) ─────────
// Same as category breakdown but for the right-side panel.
// Called by: GET /api/analytics/breakdown?month=5&year=2025
const getBreakdown = async (userId, month, year) => {
  return getCategoryBreakdown(userId, month, year);
};
 
module.exports = { getSummary, getMonth, getCategoryBreakdown, getBreakdown };
