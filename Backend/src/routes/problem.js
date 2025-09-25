const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const Student = require('../models/Student');

// POST /api/problems → Add new problem
router.post('/', async (req, res) => {
  try {
    const problem = new Problem(req.body);
    await problem.save();
    res.status(201).json({ message: 'Problem created', problem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create problem' });
  }
});

// GET /api/problems → Fetch all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

// GET /api/problems/adaptive/:studentId → Recommend based on performance
router.get('/adaptive/:studentId', async (req, res) => {
  try {
    console.log("Received request for studentId:", req.params.studentId);

    const student = await Student.findById(req.params.studentId);
    console.log("Fetched student:", student);

    if (!student) return res.status(404).json({ error: 'Student not found' });

    const total = student.performanceHistory.length;
    const correct = student.performanceHistory.filter(p => p.correct).length;
    const successRate = total ? correct / total : 0;

    console.log("Success rate:", successRate);

    let difficulty = 'easy';
    if (successRate > 0.7) difficulty = 'hard';
    else if (successRate > 0.4) difficulty = 'medium';

    const problem = await Problem.findOne({ difficulty });
    console.log("Recommended problem:", problem);

    if (!problem) return res.status(404).json({ error: 'No matching problem found' });

    res.json({ recommended: problem });
  } catch (err) {
    console.error("Error in adaptive route:", err);
    res.status(500).json({ error: 'Failed to fetch adaptive problem' });
  }
});

module.exports = router;