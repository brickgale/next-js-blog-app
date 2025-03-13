import Image from "next/image";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
    const posts = await prisma.post.findMany();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen sm:p-10 font-[family-name:var(--font-geist-sans)]">
            <div className="row-start-1 flex justify-between w-full gap-4">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={150}
                    height={38}
                    priority
                />
                <Button asChild variant="outline">
                    <Link href="/login">
                        Login <LogIn />
                    </Link>
                </Button>
            </div>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {posts?.map((post) => (
                    <Link key={post.id} href="/login" href={`/post/${post.slug}`}>
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
