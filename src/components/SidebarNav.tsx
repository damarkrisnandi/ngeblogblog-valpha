"use client"
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronLeft, 
  LayoutList, 
  FileText, 
  Tag,
  Trash 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { getAllBlogPosts, getBlogCategories } from '@/data/blog-posts';
import Link from 'next/link';
import { trpc } from '@/trpc/client';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePostStore } from '@/stores/posts.store';

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const postsFromState = usePostStore((state: any) => state.posts);
  const setPosts = usePostStore((state: any) => state.action.setPosts);
  const postUpdate = usePostStore((state: any) => state.postUpdate)
  const onPostDelete = usePostStore((state: any) => state.onPostDelete)
  const reset = usePostStore((state: any) => state.reset)
  
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'categories'>('posts');
  
  const { data: posts, isLoading: isLoadingPosts, refetch: postRefetch } = trpc.getPosts.useQuery();
  const { data: categories, isLoading: isLoadingCategories } = trpc.getCategories.useQuery();
  const deletePost = trpc.deletePost.useMutation({
    onSettled: () => {
      onPostDelete();
      postRefetch();
    }
  })

  
  useEffect(() => { setCollapsed(isMobile) }, [isMobile])
  useEffect(() => { if (!isLoadingPosts) setPosts(posts) }, [isLoadingPosts, posts])

  return (
    <div
      className={cn(
        'border-r border-border bg-card transition-all duration-300 relative flex flex-col h-full',
        collapsed ? 'w-[60px]' : 'w-[240px] md:w-[280px]',
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <Link  className="text-xl font-semibold" href={'/'}>
            Blog
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-8 w-8",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {!collapsed && (
        <div className="flex border-b">
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-none border-b-2 border-transparent",
              activeTab === 'posts' && "border-primary text-foreground"
            )}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-none border-b-2 border-transparent",
              activeTab === 'categories' && "border-primary text-foreground"
            )}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </Button>
        </div>
      )}

      <ScrollArea className="flex-1">
        {collapsed ? (
          <div className="py-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-full h-10 justify-center"
              asChild
            >
              <Link href={'/'}>
                <LayoutList size={18} />
              </Link>
            </Button>
          </div>
        ) : activeTab === 'posts' ? (
          <div className="py-2">
            <div className="px-2 mb-2 text-xs uppercase text-muted-foreground">
              All Posts
            </div>
            {postsFromState.map((post: any) => (
              <div key={post.id} className="flex items-center justify-start gap-2">
                <Button
                  
                  variant="ghost"
                  size="sm"
                  className="w-10/12 justify-start text-left mb-1 px-2 font-normal"
                  asChild
                >
                  <Link href={`/post/${post.id}`}>
                    <FileText size={16} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{post.title}</span>
                  </Link>
                </Button>

                <Button 
                  variant="ghost"
                  onClick={async () => {
                    console.log('delete:', post.id)
                    await deletePost.mutate(post.id)
                  }}
                >
                  <Trash className="w-3 h-3 text-red-600"/>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-2">
            <div className="px-2 mb-2 text-xs uppercase text-muted-foreground">
              Categories
            </div>
            {!isLoadingCategories && categories.map((category: any) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left mb-1 px-2 font-normal"
                asChild
              >
                <Link href={`/category/${category}`}>
                  <Tag size={16} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{category}</span>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}