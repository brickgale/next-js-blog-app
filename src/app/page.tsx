import prisma from "@/lib/prisma";
import Link from "next/link";
import Header from "@/components/ui/header";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
    const posts = await prisma.post.findMany();

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header />
            <main className="flex flex-col p-5 gap-8 row-start-2 items-center justify-center">
                {posts?.map((post) => (
                    <Link key={post.id} href={`/posts/${post.slug}`}>
                        <Card className="w-[350px] py-4">
                            <CardHeader className="px-4">
                                <CardTitle>{post.title}</CardTitle>
                                <CardDescription>{post.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </main>
        </div>
    );
}
