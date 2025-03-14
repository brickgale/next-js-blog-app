import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Github } from "@/components/icons/github";

const GithubSignIn = () => {
    return (
        <form
            className="flex flex-col w-full"
            action={async () => {
                "use server";
                await signIn("github");
            }}
        >
            <Button className="w-full" variant="outline">
                <Github />
                Continue with GitHub
            </Button>
        </form>
    );
};

export { GithubSignIn };