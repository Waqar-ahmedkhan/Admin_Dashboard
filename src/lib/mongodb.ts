import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'meetany';
let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (client) return client;
  client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function getDb() {
  const client = await connectToDatabase();
  return client.db(dbName);
}