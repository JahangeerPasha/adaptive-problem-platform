const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const Student = require('../models/Student');
const Attempt = require('../models/Attempt');

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
    const studentId = req.params.studentId;
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const total = student.performanceHistory.length;
    const correct = student.performanceHistory.filter(p => p.correct).length;
    const successRate = total ? correct / total : 0;

    let difficulty = 'easy';
    if (successRate > 0.7) difficulty = 'hard';
    else if (successRate > 0.4) difficulty = 'medium';

    const solvedIds = await Attempt.find({ studentId, correct: true }).distinct('problemId');
    const unsolved = await Problem.find({ difficulty, _id: { $nin: solvedIds } });

    if (unsolved.length === 0) {
      return res.status(200).json({ message: 'All problems solved at this level!' });
    }

    const recommended = unsolved[Math.floor(Math.random() * unsolved.length)];
    await Problem.findByIdAndUpdate(recommended._id, { $inc: { 'metrics.views': 1 } });

    res.json({ recommended });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch adaptive problem' });
  }
});

// POST /api/problems/attempts → Record a solved attempt
router.post('/attempts', async (req, res) => {
  try {
    const { studentId, problemId, correct } = req.body;

    const attempt = new Attempt({
      studentId,
      problemId,
      correct,
      timestamp: new Date()
    });

    await attempt.save();
    res.status(201).json({ message: 'Attempt recorded', attempt });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record attempt' });
  }
});

module.exports = router;