const mongoose = require('mongoose');

const connectDB = async () => {
  const connStr = process.env.MONGO_URI;

  if (!connStr) {
    console.error('[MongoDB Error]: MONGO_URI is not configured.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(connStr);

    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
    console.log('[MongoDB]: NEUZEN AI HRMS database connected successfully.');
  } catch (error) {
    console.error(`[MongoDB Error]: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;