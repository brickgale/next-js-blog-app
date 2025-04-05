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
        <header className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full p-5">
            <div className="flex justify-between w-full gap-4">
                <Link href="/" className="flex flex-row items-center gap-2 font-bold text-2xl">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={40}
                        height={40}
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
                    <div className="flex gap-4">
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