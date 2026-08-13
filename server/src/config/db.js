const mongoose = require('mongoose');
const runSeedInline = require('../utils/seedInline');

const connectDB = async () => {
  const connStr = process.env.MONGO_URI;

  if (connStr && !connStr.includes('123.mongodb.net')) {
    try {
      const conn = await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 8000,
      });

      console.log(`[MongoDB Atlas Connected]: ${conn.connection.host}`);
      console.log('[MongoDB]: NEUZEN AI HRMS database connected successfully.');

      // Seed database
      await runSeedInline();
      return;
    } catch (error) {
      console.warn(`[MongoDB Atlas Warning]: ${error.message}. Switching to In-Memory Database...`);
    }
  }

  // Fallback to In-Memory MongoDB Server for 100% Uptime
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
    console.log(`[In-Memory MongoDB Connected]: ${mongoUri}`);

    // Seed In-Memory database
    await runSeedInline();
  } catch (fallbackError) {
    console.error('[Database Notice]: Operating in standalone mode without active database instance.', fallbackError.message);
    // DO NOT call process.exit(1) so Render web service stays alive 24/7!
  }
};

module.exports = connectDB;