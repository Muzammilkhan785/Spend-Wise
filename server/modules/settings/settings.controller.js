const queries = require('./settings.queries');
const { sendSuccess, sendError } = require('../../utils/apiResponse');
 
const getTestUserId = () => process.env.TEST_USER_ID;
 
// GET /api/settings
const getSettings = async (req, res) => {
  try {
    const userId  = getTestUserId();
    const settings = await queries.getByUserId(userId);
    if (!settings) return sendError(res, 'Settings not found for this user', 404);
    return sendSuccess(res, settings, 'Settings fetched');
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
// PUT /api/settings
const updateSettings = async (req, res) => {
  try {
    const userId = getTestUserId();
    const {
      currency           = 'USD',
      timezone           = 'UTC',
      theme              = 'dark',
      push_notifications = true,
      email_reports      = false,
      high_contrast      = false,
    } = req.body;
    const updated = await queries.upsert(userId, {
      currency, timezone, theme, push_notifications, email_reports, high_contrast
    });
    return sendSuccess(res, updated, 'Settings updated');
  } catch (err) {
    return sendError(res, err.message);
  }
};
 
module.exports = { getSettings, updateSettings };
