"use client"

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddPostDialog from "@/components/admin/addPostDialog";

import { useState } from "react";

export default function AddPostButton() {
    const [openPostDialog, setOpenPostDialog] = useState(false);

    const addPost = () => {
        setOpenPostDialog(!openPostDialog);
    }

    return (
        <div className="flex justify-end">
            <Button onClick={addPost} className="bg-blue-500">
                <Plus /> Add Post
            </Button>
            <AddPostDialog open={openPostDialog} openChangeFn={setOpenPostDialog} />
        </div>
    );
}