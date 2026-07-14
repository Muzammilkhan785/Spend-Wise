const pool = require('../../config/db');

const getAll = async (userID, { type, month, year, category_id, page, limit }) => {
    const conditions = ['t.user_id = $1'];
    const values = [userID];
    let paramIndex = 2;

    if (type) {
        conditions.push('t.type = $' + paramIndex);
        values.push(type);
        paramIndex++;
    }
    if (month && year) {
        conditions.push('EXTRACT(MONTH FROM t.transaction_date) = $' + paramIndex);
        values.push(Number(month));
        paramIndex++;
        conditions.push('EXTRACT(YEAR FROM t.transaction_date) = $' + paramIndex);
        values.push(Number(year));
        paramIndex++;
    }
    if (category_id) {
        conditions.push('t.category_id = $' + paramIndex);
        values.push(category_id);
        paramIndex++;
    }

    const whereClause = ' WHERE ' + conditions.join(' AND ');

    const countSQL = 'SELECT COUNT(*) FROM transactions t' + whereClause;
    const countResult = await pool.query(countSQL, values);
    const total = parseInt(countResult.rows[0].count, 10);

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, parseInt(limit, 10) || 10);
    const offset = (pageNum - 1) * limitNum;
    const totalPages = Math.ceil(total / limitNum);

    const sql = `SELECT t.id, t.type, t.amount, t.description, t.notes, t.transaction_date, t.created_at,
       c.id AS category_id, c.name AS category_name, c.icon_name AS category_icon, c.color AS category_color
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       ${whereClause}
       ORDER BY t.transaction_date DESC, t.created_at DESC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;

    values.push(limitNum, offset);
    const result = await pool.query(sql, values);
    return { rows: result.rows, total, page: pageNum, limit: limitNum, totalPages };
};

const getById = async (id, userID) => {
    const sql = `SELECT t.*, c.name AS category_name, c.icon_name AS category_icon, c.color AS category_color
       FROM transactions t
       JOIN categories c ON t.category_id = c.id
       WHERE t.id = $1 AND t.user_id = $2`;
    const result = await pool.query(sql, [id, userID]);
    return result.rows[0] || null;
};

const create = async (userId, { type, amount, description, category_id, transaction_date, notes }) => {
    const sql = `
    INSERT INTO transactions (user_id, category_id, type, amount, description, notes, transaction_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
    const result = await pool.query(sql, [userId, category_id, type, amount, description, notes || null, transaction_date]);
    return result.rows[0];
};

const update = async (id, userId, { type, amount, description, category_id, transaction_date, notes }) => {
    const sql = `
    UPDATE transactions
    SET type = $1, amount = $2, description = $3,
        category_id = $4, transaction_date = $5, notes = $6,
        updated_at = NOW()
    WHERE id = $7 AND user_id = $8
    RETURNING *
  `;
    const result = await pool.query(sql, [type, amount, description, category_id, transaction_date, notes || null, id, userId]);
    return result.rows[0] || null;
};

const remove = async (id, userId) => {
    const sql = 'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(sql, [id, userId]);
    return result.rows[0] || null;
};

const getAllForExport = async (userId, { type, month, year }) => {
    const conditions = ['t.user_id = $1'];
    const values = [userId];
    let paramIndex = 2;
    if (type) { conditions.push('t.type = $' + paramIndex); values.push(type); paramIndex++; }
    if (month) { conditions.push('EXTRACT(MONTH FROM t.transaction_date) = $' + paramIndex); values.push(Number(month)); paramIndex++; }
    if (year) { conditions.push('EXTRACT(YEAR FROM t.transaction_date) = $' + paramIndex); values.push(Number(year)); paramIndex++; }
    const sql = `
    SELECT t.*, c.name AS category_name
    FROM transactions t JOIN categories c ON t.category_id = c.id
    WHERE ${conditions.join(' AND ')}
    ORDER BY t.transaction_date DESC
  `;
    const result = await pool.query(sql, values);
    return result.rows;
};

module.exports = {
    getAll, getById, create, update, remove, getAllForExport
};