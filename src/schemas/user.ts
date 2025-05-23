import { generateSchema } from "@/lib/schema-generator";
import { integer, text } from "drizzle-orm/sqlite-core";

export const user = generateSchema("user", {
    id: integer("id").primaryKey(),
    name: text("name"),
    username: integer("username")  
});