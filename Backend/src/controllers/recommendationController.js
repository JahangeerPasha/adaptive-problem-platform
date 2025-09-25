const DailyProblem = require('./models/dailyProblem');
const Attempt = require('./models/attempt');
const Problem = require('./models/problem');
const Student = require('./models/student');

exports.getAdaptiveProblem = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const today = new Date().toISOString().split('T')[0];

    // Check if today's problem is already assigned
    let daily = await DailyProblem.findOne({ studentId, date: today });

    if (daily) {
      const alreadySolved = await Attempt.findOne({
        studentId,
        problemId: daily.problemId,
        correct: true
      });

      if (!alreadySolved) {
        const problem = await Problem.findById(daily.problemId);
        return res.json({ recommended: problem });
      }
    }

    // Fetch student performance
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

    // Save or update today's problem
    await DailyProblem.findOneAndUpdate(
      { studentId, date: today },
      { problemId: recommended._id },
      { upsert: true }
    );

    await Problem.findByIdAndUpdate(recommended._id, { $inc: { 'metrics.views': 1 } });

    res.json({ recommended });
  } catch (err) {
    console.error('Error in adaptive recommendation:', err);
    res.status(500).json({ error: 'Failed to fetch adaptive problem' });
  }
};