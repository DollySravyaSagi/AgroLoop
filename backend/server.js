const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../database/config/db');

dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'AgroLoop API Server is running smoothly', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`🌱 AgroLoop Backend Server listening on port ${PORT}`);
});
