import prisma from "@/lib/prisma";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
    const posts = await prisma.post.findMany();

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts?.map((post) => (
                    <Link key={post.id} href={`/posts/${post.slug}`} className="cursor-pointer">
                        <Card className="h-full hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{post.title}</CardTitle>
                                <CardDescription className="text-sm">{post.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
