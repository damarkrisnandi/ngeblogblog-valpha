import { z } from "zod";

export const formModel = z.object({
    title: z.string().max(20),
    description: z.string(),
    category: z.string(),
    content: z.string(),
    date: z.number(),
    author: z.string()

})