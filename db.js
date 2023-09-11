const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });
    db = client.db();
    console.log('DB connected');
  } catch (err) {
    console.error(err);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
