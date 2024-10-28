import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export default function ManageSeasonsLoading() {
  return (
    <Card className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <CardHeader>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
        <CardFooter className="justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-28" />
        </CardFooter>
      </div>
      <div className="min-h-full flex flex-row md:flex-col justify-center">
        <Separator
          orientation="vertical"
          className="h-[1px] w-11/12 md:w-[1px] md:h-5/6"
        />
      </div>
      {/* SEASON FIELD IMAGES */}
      <div className="w-full md:w-1/2">
        <CardHeader>
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-80" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex flex-col min-[425px]:flex-row gap-2">
                <Skeleton className="h-10 w-full" />
                <div className="flex flex-row gap-2 justify-end">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex flex-col min-[425px]:flex-row gap-2">
                <Skeleton className="h-10 w-full" />
                <div className="flex flex-row gap-2 justify-end">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <Skeleton className="h-4 w-40" />
              </div>

              <div className="flex flex-col min-[425px]:flex-row gap-2">
                <Skeleton className="h-10 w-full" />
                <div className="flex flex-row gap-2 justify-end">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
