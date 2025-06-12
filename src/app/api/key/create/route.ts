import { auth } from "@clerk/nextjs/server";
import { Unkey } from "@unkey/api";
import { getUnixTime, addYears } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  const { name } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "User is not signed in" },
      { status: 403 }
    );
  }

  const unkeyToken = process.env.UNKEY_ROOT_KEY;

  if (!unkeyToken) {
    return NextResponse.json(
      { error: "UNKEY_ROOT_KEY is undefined" },
      { status: 500 }
    );
  }

  const unkeyApiId = process.env.UNKEY_API_ID;

  if (!unkeyApiId) {
    return NextResponse.json(
      { error: "UNKEY_API_ID is undefined" },
      { status: 500 }
    );
  }

  const unkey = new Unkey({ token: unkeyToken });

  const keyCreation = await unkey.keys.create({
    apiId: unkeyApiId,
    externalId: userId,
    name,
    prefix: "rhr_scouting",
    enabled: true,
    expires: getUnixTime(addYears(new Date(), 1)),
  });

  if (keyCreation.error) {
    return NextResponse.json({ error: keyCreation.error }, { status: 500 });
  }

  return NextResponse.json({ key: keyCreation.result.key }, { status: 200 });
}
