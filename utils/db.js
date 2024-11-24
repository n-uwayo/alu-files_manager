// db.js
const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.db = null; // Initialize db to null
    this.connect(); // Call connect when the object is created
  }

  // Use async function to handle MongoDB connection
  async connect() {
    try {
      const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      this.db = client.db(database); // Set the db property after successful connection
      console.log('Connected to database');
    } catch (err) {
      console.error('Failed to connect to database:', err);
      this.db = null;
    }
  }

  isAlive() {
    return this.db !== null; // Return true if db is initialized
  }

  async nbUsers() {
    if (!this.isAlive()) {
      throw new Error('Database not connected');
    }
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) {
      throw new Error('Database not connected');
    }
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
