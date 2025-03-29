import { z } from "zod";

const signInSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(1),
});

const postSchema = z.object({
    title: z.string({ required_error: "Title is required" }).min(1),
    slug: z.string({ required_error: "Slug is required" }).min(1)
        .refine((slug) => /^[a-z0-9-]+$/.test(slug), 'Slug must be lowercase, alphanumeric, and hyphenated'),
    description: z.string({ required_error: "Description is required" }).min(1),
    content: z.string({ required_error: "Content is required" }).min(1),
    published: z.enum(['0', '1']).transform(val => val === '1').default('0'),
    authorId: z.string({ required_error: "Author is required" }).min(1),
});

type SiginInSchema = z.infer<typeof signInSchema>;
type PostSchema = z.infer<typeof postSchema>;

export { signInSchema, type SiginInSchema, postSchema, type PostSchema };