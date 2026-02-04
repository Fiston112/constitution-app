const mongoose = require("mongoose");

async function connectTestDb() {
  const uri = process.env.MONGODB_URI_TEST;
  if (!uri) throw new Error("MONGODB_URI_TEST is missing in apps/api/.env");

  await mongoose.connect(uri);
}

async function clearTestDb() {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

async function disconnectTestDb() {
  await mongoose.disconnect();
}

module.exports = { connectTestDb, clearTestDb, disconnectTestDb };
