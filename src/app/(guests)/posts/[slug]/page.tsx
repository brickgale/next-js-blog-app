import Header from "@/components/ui/header";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { cache } from "react";

interface PostParams {
    params: {
        slug: string;
    };
}

const getPost = cache(
    async (slug: string) => await prisma.post.findUnique({
        where: {
            slug: slug,
        },
    })
);


export async function generateMetadata(
    { params }: PostParams,
    ): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
   
    return {
        title: `${post?.title} | Simple Blog App`,
        description: post?.description
    }
  }

export default async function Post({ params }: PostParams) {
    const { slug } = await params;
    const post = await getPost(slug);

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header />
            <article className="flex flex-col p-20 gap-8 row-start-2 w-full max-w-[1000px]">
                <h1 className="text-3xl">{post?.title}</h1>
                <p>{post?.content}</p>
            </article>
        </div>
    );
}