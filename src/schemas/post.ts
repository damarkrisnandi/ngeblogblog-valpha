import { integer, numeric, text } from "drizzle-orm/sqlite-core";


import { generateSchema } from "@/lib/schema-generator"

export const post = generateSchema("post", {
    id: integer('id').primaryKey(),
    url: text("url"),
    title: text("title"),
    description: text("description"),
    date: numeric("date"),
    author: text("author"),
    category: text("category"),
    content: text("content")
})
