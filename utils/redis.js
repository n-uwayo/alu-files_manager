// redis.js
const redis = require('redis');

const client = redis.createClient();

class RedisClient {
  constructor() {
    this.client = client;
    this.client.on('error', (err) => console.log('Redis Client Error', err));
  }

  // check if Redis client is alive
  isAlive() {
    return this.client.connected;
  }

  // get a value from Redis
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // set a value in Redis with an expiration time
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  // delete a key in Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
