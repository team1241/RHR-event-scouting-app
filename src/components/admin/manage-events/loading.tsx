import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function ManageEventsLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event selection</CardTitle>
        <CardDescription>
          Set the events to scout in the active season.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap gap-4 justify-center lg:justify-start min-h-fit">
          <Card className="border-dashed border-slate-500 w-full md:w-72 h-24 md:h-52 cursor-pointer">
            <div className="flex flex-col h-full items-center justify-center text-slate-500">
              <div className="flex flex-row w-full gap-1 justify-center items-center">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </Card>
          <Card className="w-full md:w-72">
            <div className="p-6 flex flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-16" />
            </div>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-72">
            <div className="p-6 flex flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-16" />
            </div>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-72">
            <div className="p-6 flex flex-col gap-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-16" />
            </div>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-row justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
