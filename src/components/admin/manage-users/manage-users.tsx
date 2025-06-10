import { Users } from "@prisma/client";
import { use } from "react";
import { manageUsersColumns } from "~/components/admin/manage-users/table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import DataTable from "~/components/ui/datatable";

export default function ManageUsers({
  usersPromise,
}: {
  usersPromise: Promise<Users[]>;
}) {
  const users = use(usersPromise);

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
