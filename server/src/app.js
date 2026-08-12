const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const offerRoutes = require('./routes/offerRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server) or any localhost/127.0.0.1
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'NEUZEN AI HRMS API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes Mount
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/onboarding', offerRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/calendar', calendarRoutes);

// Fallback 404 Route
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Server Running]: NEUZEN AI HRMS API on port ${PORT}`);
  });
}

module.exports = app;
