//redis.js
const redis = require('redis');
const client = redis.createClient();

class RedisClient {
    constructor() {
        client.on('error', (err) => console.log('Redis Client Error', err));
    }

    isAlive() {
        return client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            client.setex(key, duration, value, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            client.del(key, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
