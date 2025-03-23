import Header from '@/components/ui/header';
import PostsTable from '@/components/admin/postsTable';
import { Newspaper } from 'lucide-react';

export default function Dashboard() {

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header hideLoginBtn />
            <div className="flex flex-col gap-6 w-full p-5">
                <h1 className="flex flex-row items-center gap-2"><Newspaper /> Posts</h1>
                <div className="rounded-md border">
                    <PostsTable />
                </div>
            </div>
        </div>
    );
}