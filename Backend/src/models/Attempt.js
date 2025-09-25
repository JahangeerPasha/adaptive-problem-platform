const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({
  studentId: String,
  problemId: mongoose.Schema.Types.ObjectId,
  correct: Boolean,
  timestamp: Date
});

module.exports = mongoose.model('Attempt', attemptSchema);