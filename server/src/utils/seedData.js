const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const runSeedInline = require('./seedInline');

const seedData = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/neuzenai_hrms';
    await mongoose.connect(connStr);
    console.log('[Seed CLI] Connected to MongoDB...');

    await runSeedInline();

    process.exit(0);
  } catch (error) {
    console.error('[Seed CLI Error]:', error);
    process.exit(1);
  }
};

seedData();
