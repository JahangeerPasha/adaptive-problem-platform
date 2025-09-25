const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePic: String,
  progress: {
    masteredTopics: [String], // e.g., ['Stack', 'Queue']
    recentAttempts: [
      {
        problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
        status: String, // 'Solved', 'Failed', etc.
        timestamp: Date,
      },
    ],
  },
  performanceHistory: [
    {
      problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
      correct: Boolean,
      timestamp: Date,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);