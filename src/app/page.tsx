import { HomePage } from "@/components/HomePage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-end w-full">
        <Button
          variant={'default'}

          asChild
        >
          <Link href={'create'}>
            <Plus className="w-3 h-3" />
            Create Post
          </Link>
        </Button>

      </div>
      <main className="w-full">
        <HomePage />
      </main>
      
    </div>
  );
}
