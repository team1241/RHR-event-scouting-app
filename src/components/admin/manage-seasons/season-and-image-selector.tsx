"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldImageType } from "@prisma/client";
import { Loader2, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AddSeason from "~/components/admin/manage-seasons/add-season";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import FieldImageUploader from "~/components/admin/manage-seasons/field-image-uploader";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import {
  SeasonWithEventsAndImages,
  setActiveSeason,
} from "~/db/queries/season";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export default function SeasonAndImageSelector({
  seasons,
}: {
  seasons: SeasonWithEventsAndImages[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const activeSeason = seasons.find((season) => season.isActive)!;

  const formSchema = z.object({
    seasonId: z.string(),
  });

  const seasonSelectionForm = useForm({
    mode: "all",
    resolver: zodResolver(formSchema),
    values: {
      ...(activeSeason && { seasonId: activeSeason.id.toString() }),
    },
  });

  const handleActiveSeasonSave = async () => {
    setIsSubmitting(true);
    try {
      await setActiveSeason(seasonSelectionForm.getValues("seasonId"));
      toast.success("Active season was successfully updated!");
    } catch {
      toast.error("There was an error updating the active season.");
    }
    setIsSubmitting(false);
  };

  const fieldImages = useMemo(() => {
    return {
      fullField: activeSeason.fieldImages.find(
        (image) => image.type === FieldImageType.FULL_FIELD
      )?.imageUrl,
      blueHalf: activeSeason.fieldImages.find(
        (image) => image.type === FieldImageType.BLUE_HALF
      )?.imageUrl,
      redHalf: activeSeason.fieldImages.find(
        (image) => image.type === FieldImageType.RED_HALF
      )?.imageUrl,
    };
  }, [activeSeason]);

  return (
    <Card className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Season selection</CardTitle>
          <CardDescription>
            Season not listed in the dropdown? Click the button to add one!
          </CardDescription>
        </CardHeader>
        <Form {...seasonSelectionForm}>
          <form
            onSubmit={seasonSelectionForm.handleSubmit(handleActiveSeasonSave)}
          >
            <CardContent>
              <FormField
                name="seasonId"
                control={seasonSelectionForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current season</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <SelectTrigger disabled={seasons.length === 0}>
                          <SelectValue
                            placeholder={
                              seasons.length > 0
                                ? "Select a season"
                                : "No seasons"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {seasons.map((season) => (
                            <SelectItem
                              key={season.id}
                              value={season.id.toString()}
                            >
                              {`${season.year}: ${season.gameName}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-between">
              <AlertDialog
                open={isConfirmationModalOpen}
                onOpenChange={setIsConfirmationModalOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsConfirmationModalOpen(true);
                    }}
                  >
                    Save
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Changing seasons might cause unwanted behaviour. Please
                      proceed with caution.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleActiveSeasonSave}>
                      {isSubmitting && (
                        <Loader2 className="animate-spin size-4 mr-2 " />
                      )}
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* ADD SEASON CTA */}
              <AddSeason />
            </CardFooter>
          </form>
        </Form>
        {(!fieldImages.fullField ||
          !fieldImages.blueHalf ||
          !fieldImages.redHalf) && (
          <Alert variant="warning" className="m-4 w-auto">
            <TriangleAlert className="size-6" />
            <AlertTitle className="font-semibold">Warning!</AlertTitle>
            <AlertDescription>
              {`Looks like have all of the field images have not been uploaded for this season. Not doing so might cause the app to function poorly.`}
            </AlertDescription>
          </Alert>
        )}
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
          <CardTitle>Field images</CardTitle>
          <CardDescription>
            Upload field images to be used throughout the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Label className="text-lg font-semibold leading-none tracking-tight">
            {`Images for ${activeSeason?.gameName}:`}
          </Label>
          <div className="flex flex-col gap-4">
            {/* FULL FIELD */}
            <FieldImageUploader
              label="Full field"
              className="mt-2"
              seasonId={activeSeason?.id}
              fieldImageType={FieldImageType.FULL_FIELD}
              filePrefix={`${activeSeason?.year}_FULL_FIELD`}
              successMessage={`${activeSeason?.year} FULL FIELD image successfully uploaded!`}
              imageUrl={fieldImages.fullField}
            />
            {/* BLUE HALF FIELD */}
            <FieldImageUploader
              label="Blue half field"
              className="mt-2"
              seasonId={activeSeason?.id}
              fieldImageType={FieldImageType.BLUE_HALF}
              filePrefix={`${activeSeason?.year}_BLUE_HALF_FIELD`}
              successMessage={`${activeSeason?.year} BLUE HALF FIELD image successfully uploaded!`}
              imageUrl={fieldImages.blueHalf}
            />
            {/* RED HALF FIELD */}
            <FieldImageUploader
              label="Red half field"
              className="mt-2"
              seasonId={activeSeason?.id}
              fieldImageType={FieldImageType.RED_HALF}
              filePrefix={`${activeSeason?.year}_RED_HALF_FIELD`}
              successMessage={`${activeSeason?.year} RED HALF FIELD image successfully uploaded!`}
              imageUrl={fieldImages.redHalf}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
