import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Logout from "@/components/log-out";

interface HeaderProps {
    hideLoginBtn?: boolean;
}

export default async function Header({ hideLoginBtn = false }: HeaderProps) {
    const session = await auth();
    
    return (
        <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50">
            <div className="container mx-auto flex justify-between items-center h-14">
                <Link href="/" className="flex flex-row items-center gap-2 font-semibold text-base">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={30}
                        height={30}
                        priority
                    /> Blog
                </Link>
                {(!hideLoginBtn && !session) && (
                    <Button asChild variant="outline">
                        <Link href="/login">
                            Login <LogIn />
                        </Link>
                    </Button>
                )}

                {session && (
                    <div className="flex gap-4 items-center">
                        <Button asChild variant="ghost">
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </Button>
                        <Logout />
                    </div>
                )}
            </div>
        </header>
    );
}