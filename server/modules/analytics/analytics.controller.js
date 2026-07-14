const express    = require('express');
const router     = express.Router();
const controller = require('./analytics.controller');
 
router.get('/summary',    controller.getSummary);
router.get('/monthly',    controller.getMonthly);
router.get('/categories', controller.getCategoryBreakdown);
router.get('/breakdown',  controller.getBreakdown);
 
module.exports = router;
