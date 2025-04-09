import Header from '@/components/ui/header';
import PostsSection from '@/components/admin/postsSection';

export default function Dashboard() {

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header hideLoginBtn />
            <div className="flex flex-col gap-6 w-full p-5">
                <PostsSection />
            </div>
        </div>
    );
}