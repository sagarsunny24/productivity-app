import client from "../config/redisClient.js";
import type { Task } from "../types/types.js";
const DEFAULT_EXPIRATION = 3600;


export async function getOrSetCache(
  key: string,
  userId:string,
  cb: (userId: string) => Promise<Task[] | null>,
): Promise<Task[] | null> {
  const data = await client.get(`${key}:${userId}`);
  if (data != null) {
    console.log("Cache Hit")
    return JSON.parse(data) as Task[];
  }
  const freshData: Task[] | null = await cb(userId);
  console.log('Cache Miss')
  await client.setEx(`${key}:${userId}`, DEFAULT_EXPIRATION, JSON.stringify(freshData));
  return freshData;
}

export async function deleteCache(key: string,userId:string): Promise<void> {
  await client.del(`${key}:${userId}`);
}
