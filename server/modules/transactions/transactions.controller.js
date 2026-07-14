const queries = require('./transactions.queries');
const { sendSuccess, sendError } = require('../../utils/apiResponse');
const { generateCSV } = require('../../utils/csvExporter');
const getTestUserId = () => process.env.TEST_USER_ID;
const getAll = async (req, res) => {
    try {
        const userID = getTestUserId();
        const { type, month, year, category_id, page, limit } = req.query;
        const result = await queries.getAll(userID, { type, month, year, category_id, page, limit });
        return sendSuccess(
            res,
            result.rows,
            'Transactions fetched',
            200,
            {
                page: result.page, limit: result.limit, total: result.total, totalPages: result.totalPages
            }
        );
    }
    catch (err) {
        return sendError(res, err.message);
    }
};
const getById = async (req, res) => {
    try {
        const userId = getTestUserId();
        const transaction = await queries.getById(req.params.id, userId);
        if (!transaction) return sendError(res, 'Tranasction not Found', 404);
        return sendSuccess(res, transaction);
    }
    catch (err) {
        return sendError(res, err.message);
    }
};
const create = async (req, res) => {
    try {
        const userId = getTestUserId();
        const { type, amount, description, category_id, transaction_date, notes } = req.body;
        if (!type || !amount || !description || !category_id || !transaction_date) {
            return sendError(res, 'type, amount, description, category_id, and transaction_date are required', 400);
        }
        if (!['income', 'expense'].includes(type)) {
            return sendError(res, 'type must be income or expense', 400);
        }
        if (Number(amount) <= 0) {
            return sendError(res, 'amount must be greater than 0', 400);
        }
        const newTransaction = await queries.create(userId, { type, amount, description, category_id, transaction_date, notes });
        return sendSuccess(res, newTransaction, 'Transaction created', 201);
    } catch (err) {
        return sendError(res, err.message);
    }
};

// PUT /api/transactions/:id
const update = async (req, res) => {
    try {
        const userId = getTestUserId();
        const { type, amount, description, category_id, transaction_date, notes } = req.body;
        const updated = await queries.update(req.params.id, userId, { type, amount, description, category_id, transaction_date, notes });
        if (!updated) return sendError(res, 'Transaction not found', 404);
        return sendSuccess(res, updated, 'Transaction updated');
    } catch (err) {
        return sendError(res, err.message);
    }
};

// DELETE /api/transactions/:id
const remove = async (req, res) => {
    try {
        const userId = getTestUserId();
        const deleted = await queries.remove(req.params.id, userId);
        if (!deleted) return sendError(res, 'Transaction not found', 404);
        return sendSuccess(res, deleted, 'Transaction deleted');
    } catch (err) {
        return sendError(res, err.message);
    }
};

// GET /api/transactions/export
const exportCSV = async (req, res) => {
    try {
        const userId = getTestUserId();
        const { type, month, year } = req.query;
        const rows = await queries.getAllForExport(userId, { type, month, year });
        const csv = generateCSV(rows);
        // Tell the browser this is a file download, not a JSON response
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=spendwise-transactions.csv');
        return res.status(200).send(csv);
    } catch (err) {
        return sendError(res, err.message);
    }
};

module.exports = { getAll, getById, create, update, remove, exportCSV };