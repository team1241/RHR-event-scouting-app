"use client";

import { Loader2Icon, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import PageHeading from "~/components/common/page-heading";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/text-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPitScouting, savePitScouting } from "~/db/queries/pit-scouting";
import { toast } from "sonner";

const PitScoutingTeamPage = ({
  params,
}: {
  params: { eventCode: string; teamNumber: string };
}) => {
  const { teamNumber, eventCode } = params;
  const eventName = eventCode.substring(4);

  const pitScoutingSchema = z.object({
    robotLength: z.string({
      required_error: "Robot length is required",
    }),
    robotWidth: z.string({
      required_error: "Robot width is required",
    }),
    robotWeight: z.string({ required_error: "Robot weight is required" }),
    driveType: z.string(),
    groundIntake: z.string(),
    reefIntake: z.string(),
    algaeScoringCapability: z.string(),
    coralScoringCapability: z
      .array(z.string())
      .min(1, "Please select at least one item"),
    endGameScoringCapability: z.string(),
    autonomousCapability: z.string({ required_error: "Describe their autos" }),
    driveTeamCapability: z.string({
      required_error: "Enter drive team experience",
    }),
    comments: z.string({ required_error: "Please enter a value" }),
  });

  const pitScoutingForm = useForm<z.infer<typeof pitScoutingSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(pitScoutingSchema),
    defaultValues: {
      coralScoringCapability: [],
    },
  });

  const { data: pitScoutingData } = useQuery({
    queryKey: ["getPitScouting", eventName, teamNumber],
    queryFn: async () => await getPitScouting(eventName, parseInt(teamNumber)),
  });

  const pitScoutingMutation = useMutation({
    mutationKey: ["savePitScouting", eventCode, teamNumber],
    mutationFn: async (updateData: z.infer<typeof pitScoutingSchema>) => {
      await savePitScouting({
        eventKey: eventName,
        teamNumber: parseInt(teamNumber),
        pitScoutingData: {
          length: updateData.robotLength,
          width: updateData.robotWidth,
          weight: updateData.robotWeight,
          driveBase: updateData.driveType,
          gamepieceIntake: updateData.groundIntake,
          autonomous: updateData.autonomousCapability,
          teleop: "",
          endgame: updateData.endGameScoringCapability,
          gameSpecificJson: JSON.stringify({
            algaeScoring: updateData.algaeScoringCapability,
            coralScoring: updateData.coralScoringCapability,
            reefIntaking: updateData.reefIntake,
          }),
          driveteamExperience: updateData.driveTeamCapability,
          generalComments: updateData.comments,
        },
      });
    },
  });

  const submitPitScoutingForm = async (
    data: z.infer<typeof pitScoutingSchema>
  ) => {
    toast.promise(pitScoutingMutation.mutateAsync(data), {
      loading: "Saving...",
      success: `Pit scouting data for ${teamNumber} saved successfully!`,
      error: "Error saving data",
    });
  };

  useEffect(() => {
    if (!pitScoutingData) {
      return;
    }

    pitScoutingForm.setValue("robotLength", pitScoutingData.length);
    pitScoutingForm.setValue("robotWidth", pitScoutingData.width);
    pitScoutingForm.setValue("robotWeight", pitScoutingData.weight);
    pitScoutingForm.setValue("driveType", pitScoutingData.driveBase);
    pitScoutingForm.setValue("groundIntake", pitScoutingData.gamepieceIntake);
    pitScoutingForm.setValue(
      "autonomousCapability",
      pitScoutingData.autonomous
    );
    pitScoutingForm.setValue(
      "endGameScoringCapability",
      pitScoutingData.endgame
    );
    pitScoutingForm.setValue(
      "driveTeamCapability",
      pitScoutingData.driveteamExperience
    );
    pitScoutingForm.setValue("comments", pitScoutingData.generalComments);

    const gameSpecific: {
      reefIntaking: string;
      algaeScoring: string;
      coralScoring: string[];
    } = JSON.parse(pitScoutingData.gameSpecificJson);

    pitScoutingForm.setValue("reefIntake", gameSpecific.reefIntaking);
    pitScoutingForm.setValue(
      "algaeScoringCapability",
      gameSpecific.algaeScoring
    );
    pitScoutingForm.setValue(
      "coralScoringCapability",
      gameSpecific.coralScoring
    );
  }, [pitScoutingData]);

  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex flex-row gap-4 align-middle items-center">
        <Link href={`/${eventCode}/pits`}>
          <MoveLeftIcon />
        </Link>
        <PageHeading>
          {teamNumber} Pit Scouting ({eventCode})
        </PageHeading>
      </div>
      <Form {...pitScoutingForm}>
        <form
          onSubmit={pitScoutingForm.handleSubmit(submitPitScoutingForm)}
          className="flex flex-col gap-4 w-full mb-8"
        >
          {/* Length*/}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">Length</FormLabel>
            <FormField
              name="robotLength"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter length here"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Width */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">Width</FormLabel>
            <FormField
              name="robotWidth"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter width here"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">Weight</FormLabel>
            <FormField
              name="robotWeight"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter weight here"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*Drive radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Drive base?
            </FormLabel>
            <FormField
              name="driveType"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Swerve"
                              id="r1"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="r1">Swerve</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Tank"
                              id="r2"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="r2">Tank</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Other"
                              id="r3"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="r3">Other</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Ground intake radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Ground intake?
            </FormLabel>
            <FormField
              name="groundIntake"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Coral"
                              id="groundIntake-1"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="groundIntake-1">Coral</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Algae"
                              id="groundIntake-2"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="groundIntake-2">Algae</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Both"
                              id="groundIntake-3"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="groundIntake-3">Both</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="None"
                              id="groundIntake-4"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="groundIntake-4">None</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Reef intake radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Can they intake from the Reef?
            </FormLabel>
            <FormField
              name="reefIntake"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="L2"
                              id="reefIntake-1"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="reefIntake-1">L2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="L3"
                              id="reefIntake-2"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="reefIntake-2">L3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Both"
                              id="reefIntake-3"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="reefIntake-3">Both</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="Dislodge"
                              id="reefIntake-4"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="reefIntake-4">Dislodge Only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="None"
                              id="reefIntake-5"
                              className="size-5"
                            />
                          </FormControl>
                          <Label htmlFor="reefIntake-5">None</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Algae scoring capability radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Algae scoring capability?
            </FormLabel>
            <FormField
              name="algaeScoringCapability"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2 ">
                          <RadioGroupItem
                            value="Net"
                            id="algae-1"
                            className="size-5"
                          />
                          <Label htmlFor="algae-1">Net</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Processor"
                            id="algae-2"
                            className="size-5"
                          />
                          <Label htmlFor="algae-2">Processor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Both"
                            id="algae-3"
                            className="size-5"
                          />
                          <Label htmlFor="algae-3">Both</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="None"
                            id="algae-4"
                            className="size-5"
                          />
                          <Label htmlFor="algae-4">None</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Coral scoring capability checkbox group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Coral scoring capability?
            </FormLabel>
            <FormField
              name="coralScoringCapability"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="c1"
                            className="size-5 rounded-sm"
                            checked={field.value.includes("L1")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "L1"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "L1"
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <Label htmlFor="c1">L1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="c2"
                            className="size-5 rounded-sm"
                            checked={field.value.includes("L2")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "L2"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "L2"
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <Label htmlFor="c2">L2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="c3"
                            className="size-5 rounded-sm"
                            checked={field.value.includes("L3")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "L3"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "L3"
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <Label htmlFor="c3">L3</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="c4"
                            className="size-5 rounded-sm"
                            checked={field.value.includes("L4")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "L4"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "L4"
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <Label htmlFor="c4">L4</Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="c5"
                            className="size-5 rounded-sm"
                            checked={field.value.includes("All levels")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "All levels"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "All levels"
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <Label htmlFor="c5">All Levels</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            id="c6"
                            className="size-5 rounded-sm"
                            checked={field.value.includes("None")}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, "None"])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== "None"
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <Label htmlFor="c6">None</Label>
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Endgame scoring capability radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Endgame scoring capability?
            </FormLabel>
            <FormField
              name="endGameScoringCapability"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Park"
                            id="endgame-1"
                            className="size-5"
                          />
                          <Label htmlFor="endgame-1">Park</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Shallow Hang"
                            id="endgame-2"
                            className="size-5"
                          />
                          <Label htmlFor="endgame-2">Shallow Hang</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Deep Hang"
                            id="endgame-3"
                            className="size-5"
                          />
                          <Label htmlFor="endgame-3">Deep Hang</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Shallow+Deep"
                            id="endgame-4"
                            className="size-5"
                          />
                          <Label htmlFor="endgame-4">Shallow and Deep</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Autonomous scoring capability\*/}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              What can they do in autos?
            </FormLabel>
            <FormField
              name="autonomousCapability"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter autonomous cycles here"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*Drive team experience\*/}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Drive team experience?
            </FormLabel>
            <FormField
              name="driveTeamCapability"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter drive team experience here"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/*Comments*/}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Anything else notable about the robot? (Enter N/A if none)
            </FormLabel>
            <FormField
              name="comments"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter comments here"
                      className="resize-y dark:border-zinc-800 dark:bg-zinc-950 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="md:w-1/4" disabled={pitScoutingMutation.isPending}>
            {pitScoutingMutation.isPending && (
              <Loader2Icon className="animate-spin" />
            )}
            {pitScoutingMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PitScoutingTeamPage;
