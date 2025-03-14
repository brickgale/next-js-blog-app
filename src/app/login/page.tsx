import Header from '@/components/ui/header';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Metadata } from "next";
import { GithubSignIn } from '@/components/github-sign-in';
import { executeAction } from '@/lib/executeAction';
import { auth, signIn } from '@/lib/auth';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Author Login | Simple Blog App",
    description: "Author Login Page",
};

export default async function Login() {
    const session = await auth();
    if (session) redirect("/dashboard");

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header hideLoginBtn />
            <div className="flex flex-col items-center justify-items-center justify-center w-full h-max max-h-full flex-[3]">
                <Card className="w-full max-w-[400px] h-full mb-[100px]">
                    <CardHeader>
                        <CardTitle className="text-center text-xl uppercase">Author Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form 
                            action={async (formData) => {
                                "use server";
                               const signin = await executeAction({
                                    actionFn: async () => {
                                        console.log("formData", formData);
                                        await signIn("credentials", formData);
                                    },
                                });

                                if(signin.success) {
                                    redirect("/dashboard");
                                } else {
                                    redirect("/login?error=invalid_credentials");
                                }
                            }}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Email</Label>
                                    <Input name="email" type="email" placeholder="Enter Email" required />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" type="password" placeholder="Enter Password" required />
                                </div>
                                <Button type="submit" className="w-full">Login</Button>
                            </div>
                        </form>
                        <div className="relative w-full p-3">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-background px-2 text-muted-foreground">
                                    OR 
                                </span>
                            </div>
                        </div>
                        <GithubSignIn />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}