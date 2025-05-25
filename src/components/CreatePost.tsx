"use client"

import { defaultContent } from "@/lib/default-content";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from "./Header";
import { PostHeader } from "./PostHeader";
import { formModel } from "@/models/form.model";
import { trpc } from "@/trpc/client";
import { usePostStore } from "@/stores/posts.store";

interface CreatePostProps {
    className?: string;
}


export function CreatePost({ className }: CreatePostProps) {
    // const onPostUpdate = usePostStore((state: any) => state.onPostUpdate)
    const setPosts = usePostStore((state: any) => state.action.setPosts);
    const getPost = trpc.getPosts.useQuery();
    const addPost = trpc.addPost.useMutation({
        onSettled: () => {
            getPost.refetch();

        }
    })
    const form = useForm<z.infer<typeof formModel>>({
        resolver: zodResolver(formModel),
        defaultValues: {
            title: "Add Your Title",
            description: "Add your description",
            category: "tutorial",
            content: defaultContent,
            date: new Date().getTime(),
            author: "damarkrisnandi"
        },
        reValidateMode: "onChange"
    });


    const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'side-by-side'>('editor');
    const [draft, setDraft] = useState(() => form.getValues());

    const onSubmit = async (values: z.infer<typeof formModel>) => {
        await addPost.mutate(values);
        
        // onPostUpdate();
    }
    const onError = (values: any) => {
        console.log(values);
    }


    useEffect(() => {
        if (!getPost.isLoading) {
            setPosts(getPost.data);
        }
    }, [getPost])
    return (
        <div className={cn('w-full', className)}>
            <Form {...form}>
                <div className="md:w-8/12 mb-8 flex">
                    <Button
                        variant="ghost"
                        className={cn(
                        "flex-1 rounded-none border-b-2 border-transparent w-3/12",
                        activeTab === 'editor' && "border-primary text-foreground"
                        )}
                        onClick={() => setActiveTab('editor')}
                    >
                        Editor
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(
                        "flex-1 rounded-none border-b-2 border-transparent w-3/12",
                        activeTab === 'preview' && "border-primary text-foreground"
                        )}
                        onClick={() => setActiveTab('preview')}
                    >
                        Preview
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(
                        "flex-1 rounded-none border-b-2 border-transparent w-3/12",
                        activeTab === 'side-by-side' && "border-primary text-foreground",
                        "hidden md:block"
                        )}
                        onClick={() => setActiveTab('side-by-side')}
                    >
                        Side by Side
                    </Button>

                </div>
                <form onSubmit={form.handleSubmit(onSubmit, onError)} onChange={() => setDraft(form.getValues())} className="space-y-8">
                    <div className={cn(
                        "space-y-3",
                        activeTab === 'side-by-side' ? "flex gap-4" : ""
                    )}>
                        {(activeTab === 'editor' || activeTab === 'side-by-side') && 
                        <div className={cn(
                            "space-y-3",
                            activeTab === 'side-by-side' ? "w-5/12" : ""
                        )}>

                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
    
                            <div className="flex gap-2 w-full">
                                <FormField 
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="w-6/12 md:w-8/12">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField 
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="w-6/12 md:w-4/12">
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                            </div>
    
                            <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                <Textarea
                                className="resize-none"
                                {...field}
                                />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div> 
                        }

                        {(activeTab === 'preview' || activeTab === 'side-by-side') && 
                        <div className={cn(
                            "space-y-3",
                            activeTab === 'side-by-side' ? "w-5/12" : ""
                        )}>
                            <PostHeader post={draft} />
                            <article className="prose !max-w-full">
                                <Markdown remarkPlugins={[remarkGfm]}>{draft.content}</Markdown>
                            </article>
                        </div>
                        }
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
                

            </Form>
        </div>
    )
}