"use client";

import { Users } from "@prisma/client";
import { manageUsersColumns } from "~/components/admin/manage-users/table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import DataTable from "~/components/ui/datatable";

export default function ManageUsers({ users }: { users: Users[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage users</CardTitle>
        <CardDescription>
          <span className="font-semibold">Note:</span>
          {` You cannot edit your own role`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={manageUsersColumns} data={users} />
      </CardContent>
    </Card>
  );
}
