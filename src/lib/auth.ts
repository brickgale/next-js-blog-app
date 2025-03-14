import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import { schema } from "@/lib/schema"
import prisma from "@/lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [ 
        Github, 
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const validatedCredentials = schema.parse(credentials);

                const user = await prisma.user.findFirst({
                    where: {
                        email: validatedCredentials.email,
                        password: validatedCredentials.password,
                    },
                });

                if (!user) {
                    throw new Error("Invalid credentials.");
                }

                return user;
            },
        })
    ],
})