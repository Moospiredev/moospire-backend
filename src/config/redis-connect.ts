import { createClient, RedisClientType } from "redis";
import { env, appLogger } from "@/config/index.js";

const redisUrl = process.env.REDIS_URL || `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`;

// Create a typed Redis client
const redisClient: RedisClientType = createClient({
  url: redisUrl,
});

// Function to connect to Redis database
const redisConnect = async (): Promise<void> => {
  try {
    await redisClient.connect();
    appLogger.info("Connected to RedisDB");
  } catch (err) {
    appLogger.error(`RedisDB connection error => ${err}`);
  }
};

export { redisConnect, redisClient };
