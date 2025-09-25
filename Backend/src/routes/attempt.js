const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST /api/attempts → Record a student's attempt
router.post('/', async (req, res) => {
  const { studentId, problemId, correct, timestamp } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Push to performanceHistory
    student.performanceHistory.push({ problemId, correct, timestamp });

    // Optionally update recentAttempts in progress
    if (!student.progress) student.progress = { masteredTopics: [], recentAttempts: [] };
    student.progress.recentAttempts.push({
      problemId,
      status: correct ? 'Solved' : 'Failed',
      timestamp
    });

    await student.save();
    res.status(200).json({ message: 'Attempt recorded successfully' });
  } catch (err) {
    console.error('Error recording attempt:', err);
    res.status(500).json({ error: 'Failed to record attempt' });
  }
});

module.exports = router;