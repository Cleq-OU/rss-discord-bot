import dotenv from "dotenv";
dotenv.config();

if (!process.env.DISCORD_BOT_TOKEN) {
  throw new Error("DISCORD_BOT_TOKEN is not set");
}

if (!process.env.DISCORD_CHANNEL_ID) {
  throw new Error("DISCORD_CHANNEL_ID is not set");
}

if (!process.env.RSS_FEED_URL) {
  throw new Error("RSS_FEED_URL is not set");
}

export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;
export const TARGET_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID as string;
export const RSS_FEED_URL = process.env.RSS_FEED_URL as string;
export const RSS_CHECK_INTERVAL_MS = 3600000; // 1 hour
export const GUID_FILE = "data/last_processed_guid.json";
export const RSS_POST_MODE = process.env.RSS_POST_MODE ?? "embed"; // "embed" | "link"
