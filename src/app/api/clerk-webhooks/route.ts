import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "~/db";
import { formatISO } from "date-fns";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;

  if (eventType === "user.created") {
    let newUser;
    try {
      newUser = await prisma.users.create({
        data: {
          clerkId: evt.data.id,
          firstName: evt.data.first_name,
          lastName: evt.data.last_name,
          createdAt: formatISO(new Date(evt.data.created_at)),
          updatedAt: formatISO(new Date(evt.data.created_at)),
        },
      });

      console.log("Created new user: ", newUser);
      revalidatePath("/");
      return Response.json({ data: { user: newUser }, status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Error occured", {
        status: 400,
      });
    }
  } else if (eventType === "user.updated") {
    return new Response("", { status: 200 });
  } else if (eventType === "user.deleted") {
    return new Response("", { status: 200 });
  } else {
    return new Response("", { status: 500 });
  }
}
