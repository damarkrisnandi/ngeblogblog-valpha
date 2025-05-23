// main features of trpc
import { publicProcedure, router } from "./trpc";
import db from "./drizzle";
import { post } from "@/schemas/post";
import { category } from "@/schemas/category";
import { formModel } from "@/models/form.model";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const appRouter = router({
    getPosts: publicProcedure.query(async () => await db.select().from(post).all()),
    getPostById: publicProcedure.input(z.string()).query(async ({ input }: any) => db.select().from(post).where(eq(post.id, Number(input))).all()),
    getCategories: publicProcedure.query(async () => db.select().from(category).all()),

    addPost: publicProcedure.input(formModel).mutation(async ({ input }: any) => {
        db.insert(post).values(input).run()
    }),
    deletePost: publicProcedure.input(z.number()).mutation(async ({ input }: any) => {
        db.delete(post).where(eq(post.id, input)).run();
    })
})

export type AppRouter = typeof appRouter;