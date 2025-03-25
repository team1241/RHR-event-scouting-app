import { auth } from "@clerk/nextjs/server";
import { parseISO } from "date-fns";
import Link from "next/link";
import PageHeading from "~/components/common/page-heading";
import CompleteProfileModal from "~/components/modals/complete-signup-modal";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { getSeasons } from "~/db/queries/season";
import { getUserByClerkId } from "~/db/queries/user";

export default async function Dashboard() {
  const { userId }: { userId: string | null } = auth();

  let user;
  if (userId) {
    user = await getUserByClerkId(userId);
  }

  const season = (await getSeasons()).filter((season) => season.isActive)[0];
  const events = season?.events;

  return (
    <div>
      <PageHeading>Events</PageHeading>
      <div className="grid grid-cols-1 min-[600px]:grid-cols-2 grid-flow-row gap-4 mt-2">
        {!events && (
          <h1 className="text-4xl font-bold">
            Check back when events are added!
          </h1>
        )}
        {events?.length > 0 &&
          events.map((event) => (
            <Card className="border-2" key={`dashboard-card-${event.eventKey}`}>
              <CardHeader>
                <CardTitle className="line-clamp-2">{event.name}</CardTitle>
                <CardDescription>
                  {event.eventKey.toUpperCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  {parseISO(event.startDate).toDateString()} -{" "}
                  {parseISO(event.endDate).toDateString()}
                </p>
              </CardContent>
              <CardFooter className="grid min-[1035px]:flex min-[1035px]:justify-end gap-4 min-[1035px]:flex-row min-[1035px]:gap-8">
                <Button variant="outline" asChild>
                  <Link href={`/${season.year}${event.eventKey}/pits`}>
                    Pit Scouting
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href={`/scout/${season.year}${event.eventKey}?type=practice`}
                  >
                    Scout Practice
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/scout/${season.year}${event.eventKey}`}>
                    {" "}
                    Scout Quals
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      {user && !user.isSignupComplete && (
        <CompleteProfileModal clerkId={user.clerkId} />
      )}
    </div>
  );
}
