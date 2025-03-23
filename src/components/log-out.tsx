"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Logout() {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="flex justify-center">
            <Button variant="destructive" onClick={handleSignOut}>
                Logout <LogOut />
            </Button>
        </div>
    );
};
