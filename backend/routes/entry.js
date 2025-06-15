const express = require('express');
const { createEntry, getEntries, getWeeklySummary } = require('../controllers/entryController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, createEntry);
router.get('/', auth, getEntries);
router.get('/summary/weekly', auth, getWeeklySummary);

module.exports = router;
