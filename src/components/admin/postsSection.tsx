'use client'

import { useState, useEffect } from 'react';
import { PostsContext } from '@/contexts/posts';
import PostsTable from '@/components/admin/postsTable';
import AddPostButton from '@/components/admin/addPostButton';

import { Newspaper } from 'lucide-react';

import type { Post } from '@/lib/types/post';

export default function PostsSection() {
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchData = async () => {
        const res = await fetch('/api/posts', {
            cache: "no-cache",
        });

        const data = await res.json();
        setPosts(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <PostsContext.Provider value={{ posts, setPosts, callFetchData: fetchData }}>
            <div className="flex flex-col gap-6 w-full p-5">
                <div className="flex justify-between items-center">
                    <h1 className="flex flex-row items-center gap-2"><Newspaper /> Posts</h1>
                    <AddPostButton />
                </div>
                <div className="rounded-md border">
                    <PostsTable />
                </div>
            </div>
        </PostsContext.Provider>
    );
};