const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('../database/config/db');

dotenv.config();

// Connect Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'AgroLoop API Server is running smoothly', time: new Date() });
});

// Serve Frontend Static Build for Unified Deployment
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// Catch-all route to serve React index.html for client-side routing
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🌱 AgroLoop Unified Server listening on port ${PORT}`);
});

