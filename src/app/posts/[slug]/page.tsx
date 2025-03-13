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
        <div className="flex">
            <div>{post?.title}</div>
            <div>{post?.content}</div>
        </div>
    );
}