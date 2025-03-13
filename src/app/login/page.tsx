import Header from '@/components/ui/header';

export default function Login() {
    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header hideLoginBtn />
            Login Form
        </div>
    );
}