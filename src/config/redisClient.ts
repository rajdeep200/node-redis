import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL
});

client.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
    await client.connect()
    console.log("✅ Connected to Redis in Docker");
})()

export default client