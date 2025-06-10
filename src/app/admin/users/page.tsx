import { Suspense } from "react";
import ManageUsersLoading from "~/components/admin/manage-users/loading";
import ManageUsers from "~/components/admin/manage-users/manage-users";
import { getAllUsers } from "~/db/queries/user";

export default async function AdminUsersPage() {
  const usersPromise = getAllUsers();

  return (
    <Suspense fallback={<ManageUsersLoading />}>
      <ManageUsers usersPromise={usersPromise} />
    </Suspense>
  );
}
