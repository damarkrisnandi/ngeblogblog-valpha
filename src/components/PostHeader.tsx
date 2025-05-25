import { cn } from "@/lib/utils";

interface Post {
    title: string;
    author: string;
    category: string;
    date: Date;
    description: string;
}

interface PostHeaderProps {
    className?: string;
    post: Post
}

export function PostHeader({ post, className }: PostHeaderProps) {
    return (
        <div className={cn(
            "mb-8",
            className
        )}>
            <h1 className="text-3xl font-bold md:text-4xl mb-3">{post.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(Number(post.date)).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
            </div>
            <p className="text-muted-foreground">{post.description}</p>
        </div>
    )
}