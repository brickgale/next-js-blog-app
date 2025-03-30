"use client"

import { useEffect, useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
   
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Delete, Pencil, Trash } from "lucide-react";
 
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/lib/types/post";

import EditPostDialog from "@/components/admin/editPostDialog";
import DeletePostDialog from "@/components/admin/deletePostDialog";

const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "slug",
        header: "Slug"
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => {
            return (
                row.original.published ? 
                (<Badge className="bg-green-500">Published</Badge>) : (<Badge variant="secondary">Draft</Badge>)
            );
        }
    },
    {
        accessorKey: "id",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            const [openPostDialog, setOpenPostDialog] = useState(false);
            const [openDeletePostDialog, setOpenDeletePostDialog] = useState(false);

            const editPost = () => {
                setOpenPostDialog(!openPostDialog);
            };
            
            const deletePost = () => {
                setOpenDeletePostDialog(!openDeletePostDialog);
            };

            return (
                <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={editPost}>
                        <Pencil /> Edit
                    </Button>
                    <EditPostDialog open={openPostDialog} openChangeFn={setOpenPostDialog} post={row.original} />
                    <Button variant="destructive" onClick={deletePost}>
                        <Trash /> Delete
                    </Button>
                    <DeletePostDialog open={openDeletePostDialog} openChangeFn={setOpenDeletePostDialog} post={row.original} />
                </div>
            );
        }
    }
];

export default function PostsTable() {
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

    const table = useReactTable({
        data: posts,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full">
            <div className="flex flex-col gap-6">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="px-3">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="min-w-[200px] px-4">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                            <TableRow>
                                {columns.map((column, key) => (
                                    <TableCell className="min-w-[200px] px-4" key={key}>
                                        {key == columns.length-1 ? (
                                            <div className="flex items-center justify-center">
                                                <Skeleton className="w-[150px] h-7 my-1 text-center" />
                                            </div>
                                        ): (
                                            <Skeleton className="w-[150px] h-7 my-1" />
                                        )} 
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}