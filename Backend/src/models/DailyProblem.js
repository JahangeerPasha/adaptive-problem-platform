const mongoose = require('mongoose');

const dailyProblemSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true }
});

module.exports = mongoose.model('DailyProblem', dailyProblemSchema);