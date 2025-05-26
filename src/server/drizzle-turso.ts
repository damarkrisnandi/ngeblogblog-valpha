import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import Database from "better-sqlite3"

const db = drizzle({ connection: {
    url: process.env.TURSO_DB_URL || '', 
    authToken: process.env.TURSO_DB_AUTH_TOKEN || '' 
}});;

migrate(db, { migrationsFolder: "drizzle" })

export default db;