const express = require('express');
const router = express.Router();
const queries = require('./analytics.queries');
const { sendSuccess, sendError } = require('../../utils/apiResponse');
 
const getTestUserId = () => process.env.TEST_USER_ID;
 
// GET /api/analytics/summary?month=5&year=2025
const getSummary = async (req, res) => {
  try {
    const userId = getTestUserId();
    const month  = req.query.month || new Date().getMonth() + 1;
    const year   = req.query.year  || new Date().getFullYear();
    const data   = await queries.getSummary(userId, month, year);
    return sendSuccess(res, data, 'Summary fetched');
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
// GET /api/analytics/monthly?year=2025
const getMonthly = async (req, res) => {
  try {
    const userId = getTestUserId();
    const year   = req.query.year || new Date().getFullYear();
    const data   = await queries.getMonth(userId, year);
    return sendSuccess(res, data, 'Monthly data fetched');
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
// GET /api/analytics/categories?month=5&year=2025
const getCategoryBreakdown = async (req, res) => {
  try {
    const userId = getTestUserId();
    const month  = req.query.month || new Date().getMonth() + 1;
    const year   = req.query.year  || new Date().getFullYear();
    const data   = await queries.getCategoryBreakdown(userId, month, year);
    return sendSuccess(res, data, 'Category breakdown fetched');
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
// GET /api/analytics/breakdown?month=5&year=2025
const getBreakdown = async (req, res) => {
  try {
    const userId = getTestUserId();
    const month  = req.query.month || new Date().getMonth() + 1;
    const year   = req.query.year  || new Date().getFullYear();
    const data   = await queries.getBreakdown(userId, month, year);
    return sendSuccess(res, data, 'Breakdown fetched');
  } catch (err) {
    return sendError(res, err.message);
  }
};

router.get('/summary', getSummary);
router.get('/monthly', getMonthly);
router.get('/categories', getCategoryBreakdown);
router.get('/breakdown', getBreakdown);

module.exports = router;
