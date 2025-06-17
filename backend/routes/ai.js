const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { analyzeJournal } = require('../controllers/aiController');

router.post('/analyze', auth, analyzeJournal);

module.exports = router;
