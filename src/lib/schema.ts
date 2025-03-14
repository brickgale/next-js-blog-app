import { z } from "zod";

const signInSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(1),
});

type Schema = z.infer<typeof signInSchema>;

export { signInSchema, type Schema };