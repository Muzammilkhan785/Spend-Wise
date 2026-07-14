const pool = require('../../config/db');
const { sendSuccess, sendError } = require('../../utils/apiResponse');
 
// GET /api/categories
// Returns all categories — no user filter needed (shared data)
const getAll = async (req, res) => {
  try {
    const { type } = req.query;   // optional: ?type=expense or ?type=income
    let sql    = 'SELECT * FROM categories';
    const vals = [];
    if (type) {
      // 'both' type categories show in both income and expense dropdowns
      sql += " WHERE type = $1 OR type = 'both'";
      vals.push(type);
    }
    sql += ' ORDER BY name ASC';
    const result = await pool.query(sql, vals);
    return sendSuccess(res, result.rows, 'Categories fetched');
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
// GET /api/categories/:id
const getById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    if (!result.rows[0]) return sendError(res, 'Category not found', 404);
    return sendSuccess(res, result.rows[0]);
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
module.exports = { getAll, getById };
