import Header from "@/components/ui/header";
import prisma from "@/lib/prisma";

interface Params {
    params: {
        slug: string;
    };
}

export default async function Post({ params }: Params) {
    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
        },
    });

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header />
            <div>{post?.title}</div>
            <div>{post?.content}</div>
        </div>
    );
}