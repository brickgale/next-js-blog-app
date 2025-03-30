import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// DELETE: Delete a post
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;

        console.log(req, id);

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