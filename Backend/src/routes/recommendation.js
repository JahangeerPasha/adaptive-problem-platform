const express = require('express');
const router = express.Router();
const { getAdaptiveProblem } = require('../controllers/recommendationController');

router.get('/adaptive/:studentId', getAdaptiveProblem);

module.exports = router;