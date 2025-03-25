interface Post {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    published: boolean;
}

interface PostDialogProps {
    open: boolean;
    openChangeFn: (state: boolean) => void;
    post?: Post;
}

export type { Post, PostDialogProps };