import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Post, PostDialogProps } from "@/lib/types/post";

export default function EditPostDialog({ open, openChangeFn, post }: PostDialogProps) {
    return (
        <Dialog open={open} onOpenChange={openChangeFn}>
            <DialogContent className="max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    

                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}