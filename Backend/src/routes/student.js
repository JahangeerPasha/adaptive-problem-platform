const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students/:id → Fetch student data
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;