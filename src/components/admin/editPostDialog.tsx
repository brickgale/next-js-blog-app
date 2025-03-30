'use client'

import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from "@/components/ui/button";
import { FilePen } from "lucide-react";

import { PostDialogProps } from "@/lib/types/post";
import { executeAction } from "@/lib/executeAction";

import { updatePost } from "@/lib/actions/post";

import { useEffect, useState } from "react";

export default function EditPostDialog({ open, openChangeFn, post }: PostDialogProps) {
    const [ publish, setPublish ] = useState(false);

    useEffect(() => {
        setPublish(post?.published);
    }, [post]);

    const formAction = async (formData: FormData) => {
        const result = await executeAction({
            actionFn: async () => {
                await updatePost(formData);
            },
        });

        if(result.success) {
            openChangeFn(false);
        } else {
            // show errors
        }
    };

    return (
        <Dialog open={open} onOpenChange={openChangeFn}>
            <DialogContent className="max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl flex flex-row items-center gap-2"><FilePen />Edit Post</DialogTitle>
                    <DialogDescription>Update existing blog post</DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Title</Label>
                            <Input name="title" placeholder="Enter Title" defaultValue={post?.title} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Slug</Label>
                            <Input name="slug" placeholder="Enter Slug" defaultValue={post?.slug} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Description (Preview for Content)</Label>
                            <Input name="description" placeholder="Enter Description" defaultValue={post?.description} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Content</Label>
                            <Input name="content" placeholder="Enter Content" defaultValue={post?.content} required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Publish</Label>
                            <Switch checked={publish} onCheckedChange={setPublish} />
                            <input type="hidden" name="published" defaultValue={publish ? 1 : 0} />
                            <input type="hidden" name="id" defaultValue={post?.id} />
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}