import DataTable from "@/components/data-table";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "@/components/column-header";
import { Avatar } from "@/components/ui/avatar";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getAvatar } from "@/lib/utils";
import {
  Edit,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "react-hot-toast";
import ConfirmAlert from "@/components/conform-alert";
import AddUser from "@/components/add-user-sheet";
import EditUser from "@/components/edit-user-sheet";
import axios from "axios";

type Props = {
  users: User[];
};

type AlertType = "delete" | "active" | "block";

const Users = ({ users }: Props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);



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
        id: "status",
        header: ({ column }) => <ColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
          const user = row.original;

          return (
            <div
              className={cn(
                "inline-block px-2 py-0.5 rounded-md",
                user.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              )}
            >
              {user.is_active ? "Active" : "Inactive"}
            </div>
          );
        },
        accessorKey: "is_active",
      },
      {
        id: "actions",
        header: ({ column }) => (
          <ColumnHeader column={column} title="Actions" />
        ),
        enableSorting: false,
        cell: ({ row }) => {
          const user = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-8">
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => {
                    setSelectedUser(user);
                    setOpenEditUser(true);
                  }}
                  >
                  <Edit /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => presentAlert(user, "delete")}>
                  <Trash2 /> Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    presentAlert(user, user.is_active ? "block" : "active")
                  }
                >
                  {user.is_active ? <LockKeyhole /> : <LockKeyholeOpen />}
                  {user.is_active ? "Block" : "Activate"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const presentAlert = (user: User, type: AlertType) => {
    setSelectedUser(user);
    setAlertType(type);
    setOpenAlert(true);
  };

  //const handleDelete = async () => {
  //  let url = route("users.destroy", selectedUser?.id);
  //  try {
  //    await axios.delete(url);
  //    toast.success("User has been deleted successfully");
  //    setSelectedUser(undefined);
  //  } catch (error) {
  //    toast.error("Something went wrong. Please try again later.");
  //    setSelectedUser(undefined);
  //  }
  //}
  const handleDelete = async () => {
    router.delete(route("users.destroy", selectedUser?.id), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        toast.success("User has been deleted successfully");
        setSelectedUser(undefined);
      },
    });
  };

  const handleUpdateStatus = () => {
    router.post(
      route("users.status", selectedUser?.id),
      { status: alertType },
      // add x-csrf
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            if (selectedUser?.is_active) {
                toast.success("User has been blocked successfully");
            } else {
                toast.success("User has been Activated successfully"); }
          setSelectedUser(undefined);
        },
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground font-medium text-sm">
            Users accounts management with File upload
          </p>
        </div>
        <Button onClick={() => setOpenAddUser(true)} >Create New User</Button>
      </div>

      <DataTable columns={columns} data={users} />
      <ConfirmAlert
        title={`Confirm ${alertType}`}
        message={`Are you sure you want to ${alertType} this user?`}
        open={openAlert}
        onOpenChange={setOpenAlert}
        onConfirm={alertType === "delete" ? handleDelete : handleUpdateStatus}
      />
      <Toaster />

      <AddUser open={openAddUser}
      onOpenChange={setOpenAddUser}
      />
      {selectedUser && openEditUser && (
      <EditUser
      selected={selectedUser}
      open={openEditUser}
      onOpenChange={(openState) => {
        setSelectedUser(undefined)
        setOpenEditUser(openState)
      }}
      />
      )}
    </div>
  );
};

export default Users;
