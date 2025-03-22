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

import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash } from "lucide-react";
 
import { Button } from "@/components/ui/button";

interface Post {
    id: string;
    slug: string;
    title: string;
    description: string;
}

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
        accessorKey: "id",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
            return (
                <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={()=> editPost(row.original)}>
                        <Pencil /> Edit
                    </Button>
                    <Button variant="destructive" onClick={() => deletePost(row.original)}>
                        <Trash /> Delete
                    </Button>
                </div>
            );
        }
    }
];

const editPost = (post: Post) => {
    console.log(post);
}

const deletePost = (post: Post) => {
    console.log(post);
}

export default function PostsTable() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('/api/posts', {
            cache: "no-cache",
        });
            const data = await res.json();
            setPosts(data);
        }
        
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
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
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
                                <TableCell key={cell.id}>
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
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}