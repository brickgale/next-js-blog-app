import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import { signInSchema } from "@/lib/schema"
import prisma from "@/lib/prisma"

import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

const adapter = PrismaAdapter(prisma)
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers: [ 
        Github, 
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    console.log('authorizing credentials');
                    const { email, password } = await signInSchema.parseAsync(credentials);
                    console.log({email, password});

                    const user = await prisma.user.findFirst({
                        where: { email, password },
                    });

                    if (!user) {
                        throw new Error("Invalid credentials.");
                    }

                    return user;
                } catch (error) {        
                    throw new Error("Invalid credentials.");
                }
            },
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        }
    },
    jwt: {
        encode: async function (params) {
            if (params.token?.credentials) {
                const sessionToken = uuid();
        
                if (!params.token.sub) {
                throw new Error("No user ID found in token");
                }
        
                const createdSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                });
        
                if (!createdSession) {
                    throw new Error("Failed to create session");
                }
        
                return sessionToken;
            }
            return defaultEncode(params);
        },
    },
})