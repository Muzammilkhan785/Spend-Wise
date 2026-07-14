const express    = require('express');
const router     = express.Router();
const controller = require('./categories.controller');
 
router.get('/',    controller.getAll);
router.get('/:id', controller.getById);
 
module.exports = router;
