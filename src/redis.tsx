import type { RedisClient} from '@devvit/public-api'

export async function getPostNum(redis: RedisClient): Promise<number>{
  await redis.set('postNum', '1', {nx: true});
  
  return await redis.incrBy('postNum', 1);
  
}