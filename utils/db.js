// utils/db.js
const mongoose = require('mongoose');
require('dotenv').config();

class DBClient {
    constructor() {
        const dbHost = process.env.DB_HOST || 'localhost';
        const dbPort = process.env.DB_PORT || 27017;
        const dbName = process.env.DB_DATABASE || 'files_manager';
        
        mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    isAlive() {
        return mongoose.connection.readyState === 1;
    }

    async nbUsers() {
        const User = mongoose.model('User', new mongoose.Schema({ email: String }));
        return User.countDocuments();
    }

    async nbFiles() {
        const File = mongoose.model('File', new mongoose.Schema({ name: String }));
        return File.countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
