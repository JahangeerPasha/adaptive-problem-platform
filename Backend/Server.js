// Backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const problemRoutes = require('./src/routes/problem');


// app.use(cors());
app.use(express.json());
// const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/api/problems', problemRoutes);


// Import and use routes
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));