"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Seasons } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AddSeason from "~/components/admin/add-season";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { setActiveSeason } from "~/db/queries/season";

export default function SeasonSelector({ seasons }: { seasons: Seasons[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const activeSeason = seasons.find((season) => season.isActive);

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

  return (
    <Card>
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
                  {/* ADD SEASON CTA */}
                  <AddSeason />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
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
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
