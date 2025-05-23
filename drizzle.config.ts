import { Config } from "drizzle-kit";

export default {
    schema: "./src/schemas/*",
    out: "./drizzle",
    driver: "d1-http",
    dialect: "sqlite",
    dbCredentials: {
        url: "sqlite.db"
    }
    
} satisfies Config