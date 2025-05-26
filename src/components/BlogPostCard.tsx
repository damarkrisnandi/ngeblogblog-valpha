import { IPost } from "@/models/post.interface";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface BlogPostCardProps {
    post: IPost;
  }
  
  export function BlogPostCard({ post }: BlogPostCardProps) {
    return (
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
        <CardContent className="flex-1 pt-6">
          <Badge variant="secondary" className="mb-3">
            {post.category}
          </Badge>
          <Link href={`/post/${post.id}`}>
            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          <div className="flex justify-between w-full">
            <span>{post.author}</span>
            <span>{new Date(Number(post.date)).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </CardFooter>
      </Card>
    );
  }