// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

class DbClient {
  constructor() {
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'error in connection:'));
    this.db.once('open', function () {
      console.log('Database well connected');
    });
  }

  // Check if the database connection is alive
  isAlive() {
    return this.db.readyState === 1;
  }

  // Get the number of users in the database
  async nbUsers() {
    try {
      const users = await mongoose.model('User').countDocuments();
      return users;
    } catch (err) {
      console.error('Error getting user count:', err);
    }
  }

  // Get the number of files in the database
  async nbFiles() {
    try {
      const files = await mongoose.model('File').countDocuments();
      return files;
    } catch (err) {
      console.error('Error getting file count:', err);
    }
  }
}

const dbClient = new DbClient();
module.exports = dbClient;
