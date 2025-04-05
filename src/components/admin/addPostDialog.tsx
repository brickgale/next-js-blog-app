'use client'

import { 
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";

import { PostDialogProps } from "@/lib/types/post";
import { executeAction } from "@/lib/executeAction";

import { createPost } from "@/lib/actions/post";

import { useState } from "react";

export default function AddPostDialog({ open, openChangeFn }: PostDialogProps) {
    const [ publish, setPublish ] = useState(false);

    const formAction = async (formData: FormData) => {
        const result = await executeAction({
            actionFn: async () => {
                await createPost(formData);
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
                    <DialogTitle className="text-xl flex flex-row items-center gap-2"><FilePlus2 />Add Post</DialogTitle>
                    <DialogDescription>Create a new blog post</DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Title</Label>
                            <Input name="title" placeholder="Enter Title" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Slug</Label>
                            <Input name="slug" placeholder="Enter Slug" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Description (Preview for Content)</Label>
                            <Input name="description" placeholder="Enter Description" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Content</Label>
                            <Input name="content" placeholder="Enter Content" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="slug">Publish</Label>
                            <Switch checked={publish} onCheckedChange={setPublish}  />
                            <input type="hidden" name="published" value={publish ? 1 : 0} />
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}