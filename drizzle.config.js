/** @type {import("drizzle-kit").Config} */

export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_bQo7yUrt9DNs@ep-shy-art-a5x2vv2j-pooler.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
};
