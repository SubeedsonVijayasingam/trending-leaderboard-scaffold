import { redis } from "./leaderboard.js";

async function seed() {
  await redis.del("trending:posts");

  const pipeline = redis.pipeline();

  for (let i = 1; i <= 100; i++) {
    const postId = `post:${i}`;
    const title = `Post number ${i}`;
    const author = `@user${i}`;
    const score = Math.floor(Math.random() * 50);

    pipeline.hset(`${postId}:meta`, "title", title, "author", author);
    pipeline.zadd("trending:posts", score, postId);
  }

  await pipeline.exec();

  console.log("Seeded 100 posts.");
  redis.disconnect();
}

seed();