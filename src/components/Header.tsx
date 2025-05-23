import { cn } from "@/lib/utils";

interface HeaderProps {
    className?: string;
    title: string;
    description?: string;
}

export default function Header({ className, title, description }: HeaderProps) {
    return (
        <div className={cn(
            "mb-8",
            className
        )}>
            <h1 className="text-3xl font-bold md:text-4xl mb-3">{ title }</h1>
            <p className="text-muted-foreground">
            { description } 
            </p>
        </div>
    )
}