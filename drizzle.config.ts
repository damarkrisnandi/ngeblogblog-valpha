import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/schemas/*",
    out: "./drizzle",
    driver: "d1-http",
    dialect: "sqlite",
    dbCredentials: {
        // for sqlitedb
        // url: "sqlite.db",

        // for tursodb
        url: process.env.TURSO_DB_URL, 
        authToken: process.env.TURSO_DB_AUTH_TOKEN 
    } 
} as Config);