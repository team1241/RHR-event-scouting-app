import { manageUsersColumns } from "~/components/admin/manage-users/table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import DataTable from "~/components/ui/datatable";
import { getAllUsers } from "~/db/queries/user";

export default async function ManageUsers() {
  const users = await getAllUsers();

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
