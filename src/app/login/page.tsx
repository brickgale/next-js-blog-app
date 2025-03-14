import Header from '@/components/ui/header';
import { Card, CardTitle, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Author Login | Simple Blog App",
    description: "Author Login Page",
};

export default function Login() {
    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header hideLoginBtn />
            <div className="flex flex-col items-center justify-items-center justify-center w-full h-max max-h-full flex-[3]">
                <Card className="w-full max-w-[400px] h-full mb-[100px]">
                    <CardHeader>
                        <CardTitle className="text-center text-xl uppercase">Author Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Email</Label>
                                    <Input type="email" placeholder="Enter Email" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input type="password" placeholder="Enter Password" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Login</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}