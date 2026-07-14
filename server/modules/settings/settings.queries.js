const pool = require('../../config/db');
 
// GET one settings row for a user
const getByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM settings WHERE user_id = $1', [userId]);
  return result.rows[0] || null;
};
 
// UPDATE settings (upsert pattern — insert if not exists, update if exists)
const upsert = async (userId, { currency, timezone, theme, push_notifications, email_reports, high_contrast }) => {
  const sql = `
    INSERT INTO settings (user_id, currency, timezone, theme, push_notifications, email_reports, high_contrast)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (user_id)
    DO UPDATE SET
      currency           = EXCLUDED.currency,
      timezone           = EXCLUDED.timezone,
      theme              = EXCLUDED.theme,
      push_notifications = EXCLUDED.push_notifications,
      email_reports      = EXCLUDED.email_reports,
      high_contrast      = EXCLUDED.high_contrast,
      updated_at         = NOW()
    RETURNING *
  `;
  const result = await pool.query(sql, [
    userId, currency, timezone, theme,
    push_notifications, email_reports, high_contrast
  ]);
  return result.rows[0];
};
 
module.exports = { getByUserId, upsert };
