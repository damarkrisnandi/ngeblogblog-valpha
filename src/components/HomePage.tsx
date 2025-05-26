"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { BlogPostCard } from "./BlogPostCard";
import { useEffect, useState } from "react";
import { usePostStore } from "@/stores/posts.store";
import { trpc } from "@/trpc/client";
import { IPost } from "@/models/post.interface";

export function HomePage() {
    const posts = usePostStore((state: any) => state.posts);
    const setPosts = usePostStore((state: any) => state.action.setPosts);
    
    const { data: postsQuery, isLoading: isLoadingPosts, refetch: postsRefetch } = trpc.getPosts.useQuery();
    const { data: categories, isLoading: isLoadingCategories } = trpc.getCategories.useQuery();
    const deletePost = trpc.deletePost.useMutation({
        onSettled: () => {
        postsRefetch();
        }
    })

    useEffect(() => { if (!isLoadingPosts) setPosts(postsQuery) }, [isLoadingPosts, postsQuery])

    return (
        <div className="">
            <div className="mb-8">
                <h1 className="text-3xl font-bold md:text-4xl mb-3">Ngeblogblog v-alpha</h1>
                <p className="text-muted-foreground">
                Explore a collection of articles covering various topics and insights
                </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post: IPost) => (
                <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}