import { CreatePost } from "@/components/CreatePost";
import Header from "@/components/Header";

export default function CreatePostPage() {
    return (
    <div className="">
        <Header title="Create Post" description="Create / Edit your post" />

        <div className="w-full">
            <CreatePost />
        </div>

    </div>
    //   <div className="flex flex-col gap-4">
    //     <h1 className="text-3xl font-bold">Create Post</h1>
    //     <CreatePost />
    //   </div>
    );
  }