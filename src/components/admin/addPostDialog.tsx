import { 
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PostDialogProps } from "@/lib/types/post";

export default function AddPostDialog({ open, openChangeFn }: PostDialogProps) {
    return (
        <Dialog open={open} onOpenChange={openChangeFn}>
            <DialogContent className="max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle>Add Post</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}