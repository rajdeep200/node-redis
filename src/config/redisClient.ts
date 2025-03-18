import { createClient } from "redis";

const client = createClient({
    url: "redis://localhost:6379"
});

client.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
    await client.connect()
    console.log("✅ Connected to Redis in Docker");
})()

export default client