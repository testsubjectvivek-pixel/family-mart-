const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  legacyMode: false
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err.message);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('Failed to connect to Redis:', error.message);
  }
};

const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    if (!redisClient.isOpen) {
      return next();
    }

    const key = req.originalUrl || req.url;
    
    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      const originalJson = res.json.bind(res);
      
      res.json = (data) => {
        redisClient.setEx(key, duration, JSON.stringify(data)).catch(console.error);
        return originalJson(data);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};

const invalidateCache = async (pattern) => {
  try {
    if (!redisClient.isOpen) return;
    
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error(':', error.messageCache invalidation error);
  }
};

const invalidateProductCache = async () => {
  await invalidateCache('*products*');
  await invalidateCache('*categories*');
  await invalidateCache('*home*');
};

module.exports = {
  redisClient,
  connectRedis,
  cacheMiddleware,
  invalidateCache,
  invalidateProductCache
};
