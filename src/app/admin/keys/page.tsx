import { auth } from "@clerk/nextjs/server";
import CreateApiKeyModal from "~/components/modals/create-api-key";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import unkey from "~/lib/unkey";

export default async function AdminKeysPage() {
  const { userId } = auth();

  let userAPIKeysPromise;

  if (userId) {
    userAPIKeysPromise = await unkey.apis.listKeys({
      apiId: process.env.UNKEY_API_ID!,
      externalId: userId,
    });
  }

  console.log(userAPIKeysPromise);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">List</h2>
            <CreateApiKeyModal />
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
