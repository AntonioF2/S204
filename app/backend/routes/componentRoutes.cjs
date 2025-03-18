// backend/routes/componentRoutes.js
const express = require('express');
const { addComponent, borrowComponent, returnComponent, listComponents } = require('../controllers/componentController.cjs');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware.cjs');

const router = express.Router();

router.post('/add', authenticate, isAdmin, addComponent);
router.post('/borrow', authenticate, isAdmin, borrowComponent);
router.post('/return', authenticate, isAdmin, returnComponent);
router.get('/list', listComponents);

module.exports = router;