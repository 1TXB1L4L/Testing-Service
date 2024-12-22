import DataTable from "@/components/data-table";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "@/components/column-header";
import { Avatar } from "@/components/ui/avatar";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getAvatar } from "@/lib/utils";
import { Edit, LockKeyhole, LockKeyholeOpen, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenu, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

type Props = {
    users: User[];
};

const Users = ({ users }: Props) => {
    const columns = useMemo<ColumnDef<User>[]>(
        () => [
            {
                id: "avatar",
                header: ({ column }) => <ColumnHeader column={column} title="Avatar" />,
                enableSorting: false,
                cell: ({ row }) => {
                    const user = row.original;
                    return (
                        <Avatar className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-center text-sm font-medium">
                                {getAvatar(user.name)}
                            </AvatarFallback>
                        </Avatar>
                    );
                },
            },
            {
                header: ({ column }) => <ColumnHeader column={column} title="Name" />,
                accessorKey: "name",
            },
            {
                header: ({ column }) => <ColumnHeader column={column} title="Email" />,
                accessorKey: "email",
            },
            {
                id: 'status',
                header: ({ column }) => <ColumnHeader column={column} title="Status" />,
                cell: ({ row }) => {
                    const user = row.original

                    return (
                        <div className={cn("inline-block px-2 py-0.5 rounded-md", user.is_active ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
                        {user.is_active ? "Active" : "Inactive"}
                        </div>
                    );
                },
                accessorKey: 'is_active',
            },
            {
                id: 'actions',
                header: ({ column }) => <ColumnHeader column={column} title="Actions" />,
                enableSorting: false,
                cell: ({ row }) => {
                    const user = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className="h-8 w-8 p-8">
                                    <span className="sr-only">Open Menu</span>
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <Edit /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Trash2 /> Delete
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    {user.is_active ? <LockKeyhole /> : <LockKeyholeOpen />}
                                    {user.is_active ? "Block" : "Activated"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        );
                },
            },
            
        ],
        []
    );

    return (
        <div className="max-w-7xl mx-auto mt-10">
            <div className="flex jusify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold">Users</h1>
                    <p className="text-muted-foreground font-medium text-sm">
                        Users accounts management with File upload
                    </p>
                </div>
            </div>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default Users;
