import prisma from "@/lib/prisma";
import Link from "next/link";
import Header from "@/components/ui/header";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
    const posts = await prisma.post.findMany();

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header />
            <main className="flex flex-row px-2 py-5 items-center w-full flex-wrap -m-3">
                {posts?.map((post) => (
                    <Link key={post.id} href={`/posts/${post.slug}`} className="w-full sm:w-1/2 lg:w-1/3 p-3 py-2 cursor-pointer">
                        <Card className="w-full py-4">
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
