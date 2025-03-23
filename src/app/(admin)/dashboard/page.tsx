import Header from '@/components/ui/header';
import PostsTable from '@/components/admin/postsTable';
import { Newspaper } from 'lucide-react';
import AddPostButton from '@/components/admin/addPostButton';

export default function Dashboard() {

    return (
        <div className="flex flex-col gap-8 items-center justify-items-center max-w-[1300px] w-full min-h-screen">
            <Header hideLoginBtn />
            <div className="flex flex-col gap-6 w-full p-5">
                <div className="flex justify-between items-center">
                    <h1 className="flex flex-row items-center gap-2"><Newspaper /> Posts</h1>
                    <AddPostButton />
                </div>
                <div className="rounded-md border">
                    <PostsTable />
                </div>
            </div>
        </div>
    );
}