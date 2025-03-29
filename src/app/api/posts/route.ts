import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { postSchema, type PostSchema } from "@/lib/schema";

const formDataToJson = (formData: FormData) => {
    const jsonObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      jsonObject[key] = formData.get(key)
    });
    return jsonObject;
};

  
// GET: Fetch all posts
export const GET = async (req: NextRequest) => {    
    try {
        const posts = await prisma.post.findMany({
            include: { author: true }, 
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error  }, { status: 500 }
        );
    }
};

// POST: Create a new post
export const POST = async (req: NextRequest) => {
    try {
        const session  = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const id: string = session?.user?.id;
        const body = await req.formData();
        body.append('authorId', id);

        // Validate the request body using postSchema
        const data = formDataToJson(body);
        const validatedData = postSchema.parse(data);

        const post = await prisma.post.create({
            data: validatedData,
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error }, { status: 500 }
        );
    }
};

// PUT: Update an existing post
export const PUT = async (req: NextRequest) => {
    try {
        const session  = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const id: string = session?.user?.id;
        const body = await req.formData();
        body.append('authorId', id);

        // Validate the request body using postSchema
        const data = formDataToJson(body);
        const validatedData = postSchema.parse(data);

        const post = await prisma.post.update({
            where: { id: data.id, authorId: id },
            data: validatedData,
        });

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
};

// DELETE: Delete a post
export const DELETE = async (req: NextRequest) => {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await req.json();

        await prisma.post.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Post deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
};