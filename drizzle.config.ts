import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/schemas/*",
    out: "./drizzle",
    driver: "d1-http",
    dialect: "sqlite",
    dbCredentials: {
        url: "sqlite.db"
    } 
} as Config);