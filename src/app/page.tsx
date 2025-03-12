import Image from "next/image";
import prisma from "@/lib/prisma";

export default async function Home() {
    const posts = await prisma.post.findMany();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                className="dark:invert"
                src="/next.svg"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
                />
                <ul className="flex flex-col gap-4">
                    {posts?.map((post) => (
                        <li key={post.id}>
                            <a href={`/post/${post.id}`}>
                                {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
