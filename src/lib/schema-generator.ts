import { sqliteTable } from "drizzle-orm/sqlite-core";

export const generateSchema = (name: string, schema: any) => sqliteTable(name, schema)