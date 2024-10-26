"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Users } from "@prisma/client";
import { Badge } from "~/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import UsersTableDropdownMenu from "~/components/admin/manage-users/table-dropdown";

export const manageUsersColumns: ColumnDef<Users>[] = [
  {
    id: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isActive") ? "activeUser" : "inactiveUser"}>
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return (
        <div
          className="flex flex-row gap-2 items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Role</span>
          <ArrowUpDown className="size-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <Badge variant={row.getValue("isAdmin") ? "adminBadge" : "scoutBadge"}>
        {row.getValue("isAdmin") ? "Admin" : "Scout"}
      </Badge>
    ),
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <div
          className="flex flex-row gap-2 items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Grade</span>
          <ArrowUpDown className="size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const grade: string = row.getValue("grade") ?? "N/A";
      return <span>{grade.charAt(0).toUpperCase() + grade.slice(1)}</span>;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "team",
    header: ({ column }) => {
      return (
        <div
          className="flex flex-row gap-2 items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Team</span>
          <ArrowUpDown className="size-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const grade: string = row.getValue("team") ?? "N/A";
      return <span>{grade.charAt(0).toUpperCase() + grade.slice(1)}</span>;
    },
    sortingFn: "text",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <UsersTableDropdownMenu user={row.original} />
      </div>
    ),
  },
];
