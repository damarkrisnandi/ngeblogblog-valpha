"use client"
import { trpc } from "@/trpc/client";
import { PostHeader } from "./PostHeader";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostViewProps {
    className?: string;
    id: string
}


export function PostView({ className, id }: PostViewProps) {
    const { data, isLoading } = trpc.getPostById.useQuery(id);

    return (
        <div>
            { !isLoading && data && (
                <div>
                    <PostHeader post={data[0]}/>
                    <article className="prose !max-w-full">
                        <Markdown remarkPlugins={[remarkGfm]}>{data[0].content}</Markdown>
                    </article>

                </div>
            ) }
        </div>
    )
}