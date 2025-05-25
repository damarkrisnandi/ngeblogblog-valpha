"use client"
import { trpc } from "@/trpc/client";
import { PostHeader } from "./PostHeader";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader2 } from "lucide-react";

interface PostViewProps {
    className?: string;
    id: string
}


export function PostView({ className, id }: PostViewProps) {
    const { data, isLoading } = trpc.getPostById.useQuery(id);

    return (
        <div>
            { !isLoading ? (
                <div>
                    {
                        data && data.length > 0 ? (
                            <div>
                                <PostHeader post={data[0]}/>
                                <article className="prose !max-w-full">
                                    <Markdown remarkPlugins={[remarkGfm]}>{data[0].content}</Markdown>
                                </article>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <h1>Not Found</h1>
                                <p className="text-sm">Post id: { id } not found!</p>
                            </div>
                        )
                    }
                    
                </div>
            ) : 
            (
                <div className="w-full h-screen flex justify-center items-center">
                    <Loader2 className="animate-spin" /> 
                </div>
            )
            }

        </div>
    )
}