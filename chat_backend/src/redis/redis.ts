import { Redis } from "ioredis";

const redisInstance = new Redis({

  port: 12305, // Redis port
  host: "redis-12305.c14.us-east-1-3.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "DV17gwfQHIyzrAym7B8XtL4GFh995JcQ",
  db: 0, // Defaults to 0

})
export { redisInstance }
