'use client'

import {
    AlertDialog,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogContent,
    AlertDialogAction,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { PostDialogProps } from "@/lib/types/post";
import { executeAction } from "@/lib/executeAction";

import { deletePost } from "@/lib/actions/post";

export default function DeletePostDialog({ open, openChangeFn, post }: PostDialogProps) {

    const confirmDelete = async () => {
        console.log('confirm delete');

        const result = await executeAction({
            actionFn: async () => {
                await deletePost(post?.id);
            },
        });

        if(result.success) {
            openChangeFn(false);
        } else {
            // show errors
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={openChangeFn}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete this post? SLUG: {post?.slug}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}