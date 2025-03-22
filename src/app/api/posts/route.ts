import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {    
    try {
        const posts = await prisma.post.findMany({
            include: { author: true }, 
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong!' }, { status: 500 }
        );
    }
}