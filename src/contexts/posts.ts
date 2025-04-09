'use client'

import { createContext, useContext, SetStateAction } from "react";
import type { Post } from "@/lib/types/post";

export const PostsContext = createContext<{
    posts: Post[];
    setPosts: React.Dispatch<SetStateAction<Post[]>>;
    callFetchData: () => Promise<void>;
}>({
    posts: [],
    setPosts: () => {},
    callFetchData: async () => Promise.resolve(),
});

export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("usePostsContext must be used within a PostsProvider");
    }
    return context;
};
