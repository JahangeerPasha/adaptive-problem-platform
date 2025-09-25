const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Route imports
const problemRoutes = require('./src/routes/problem');
const attemptRoutes = require('./src/routes/attempt');
const studentRoutes = require('./src/routes/student');
// const recommendationRoutes = require('./src/routes/recommendationRoutes');
const authRoutes = require('./src/routes/auth');

// Route usage
app.use('/api/problems', problemRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/students', studentRoutes);
// app.use('/api/recommendation', recommendationRoutes);
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));