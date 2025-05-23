import { generateSchema } from "@/lib/schema-generator";
import { integer, text } from "drizzle-orm/sqlite-core";

export const category = generateSchema("category", {
    id: integer("id").primaryKey(),
    name: text("name") 
});