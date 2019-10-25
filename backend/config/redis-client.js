const redis = require('redis');

const redisPort = process.env.REDIS_PORT;
const client = redis.createClient(redisPort);

module.exports = client;