const mongoose = require('mongoose');

const connectDB = async () => {
  const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/neuzenai_hrms';
  try {
    const conn = await mongoose.connect(connStr, { serverSelectionTimeoutMS: 3000 });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Local MongoDB connection failed (${error.message}). Attempting In-Memory MongoDB Fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[In-Memory MongoDB Connected]: ${memoryUri}`);

      // Auto-run database seed for zero-config demonstration
      const runSeedInline = require('../utils/seedInline');
      await runSeedInline();
    } catch (memErr) {
      console.error(`[MongoDB Critical Error]: In-Memory Fallback failed: ${memErr.message}`);
    }
  }
};

module.exports = connectDB;
