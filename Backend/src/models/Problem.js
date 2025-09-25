const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  tags: [String],
  solution: String,
  metrics: {
    views: { type: Number, default: 0 },
    attempts: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Problem', problemSchema);