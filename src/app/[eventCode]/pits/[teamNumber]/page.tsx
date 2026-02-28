"use client";

import { Loader2Icon, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import PageHeading from "~/components/common/page-heading";
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
    approxHopperSize: z.string(),
    fieldCrossing: z.string(),
    feedingAbility: z.string(),
    shooterType: z.string(),
    numberOfBarrels: z.string(),
    endGameScoringCapability: z.string(),
    climbLocation: z.string(),
    canAutoClimb: z.string(),
    autonomousCapability: z.string({ required_error: "Describe their autos" }),
    comments: z.string({ required_error: "Please enter a value" }),
  });

  const pitScoutingForm = useForm<z.infer<typeof pitScoutingSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(pitScoutingSchema),
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
            feedingAbility: updateData.feedingAbility,
            fieldCrossing: updateData.fieldCrossing,
            shooterType: updateData.shooterType,
            numberOfBarrels: updateData.numberOfBarrels,
            approxHopperSize: updateData.approxHopperSize,
            climbLocation: updateData.climbLocation,
            canAutoClimb: updateData.canAutoClimb,
          }),
          driveteamExperience: "N/A",
          generalComments: updateData.comments,
        },
      });
    },
  });

  const submitPitScoutingForm = async (
    data: z.infer<typeof pitScoutingSchema>,
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
      pitScoutingData.autonomous,
    );
    pitScoutingForm.setValue(
      "endGameScoringCapability",
      pitScoutingData.endgame,
    );
    pitScoutingForm.setValue("comments", pitScoutingData.generalComments);

    const gameSpecific: {
      fieldCrossing: string;
      feedingAbility: string;
      shooterType: string;
      numberOfBarrels: string;
      approxHopperSize: string;
      climbLocation: string;
      canAutoClimb: string;
    } = JSON.parse(pitScoutingData.gameSpecificJson);

    pitScoutingForm.setValue("fieldCrossing", gameSpecific.fieldCrossing);
    pitScoutingForm.setValue("feedingAbility", gameSpecific.feedingAbility);
    pitScoutingForm.setValue("shooterType", gameSpecific.shooterType);
    pitScoutingForm.setValue("numberOfBarrels", gameSpecific.numberOfBarrels);
    pitScoutingForm.setValue("approxHopperSize", gameSpecific.approxHopperSize);
    pitScoutingForm.setValue("climbLocation", gameSpecific.climbLocation);
    pitScoutingForm.setValue("canAutoClimb", gameSpecific.canAutoClimb);
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
              Drive base type
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
              Can intake from ground?
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
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Yes"
                            id="groundIntake-1"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="groundIntake-1">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="No"
                            id="groundIntake-2"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="groundIntake-2">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* approxHopperSize input */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Approximate hopper size
            </FormLabel>
            <FormField
              name="approxHopperSize"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter approximate hopper size"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Field crossings */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Field crossing ability
            </FormLabel>
            <FormField
              name="fieldCrossing"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Trench Only"
                            id="field-crossing-1"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="field-crossing-1">Trench Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Bump Only"
                            id="field-crossing-2"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="field-crossing-2">Bump Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Both"
                            id="field-crossing-3"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="field-crossing-3">Both</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* Shooter type radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Shooter type
            </FormLabel>
            <FormField
              name="shooterType"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2 ">
                        <RadioGroupItem
                          value="Turret"
                          id="shooter-type-1"
                          className="size-5"
                        />
                        <Label htmlFor="shooter-type-1">Turret</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Fixed"
                          id="shooter-type-2"
                          className="size-5"
                        />
                        <Label htmlFor="shooter-type-2">Fixed</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* numberOfBarrels input */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Number of shooter barrels
            </FormLabel>
            <FormField
              name="numberOfBarrels"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter number of shooter barrels"
                      className="resize-y "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Feeding ability radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Where can they feed?
            </FormLabel>
            <FormField
              name="feedingAbility"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2 ">
                        <RadioGroupItem
                          value="Neural Zone Only"
                          id="feeding-ability-1"
                          className="size-5"
                        />
                        <Label htmlFor="feeding-ability-1">
                          Neural Zone Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Opponent Zone Only"
                          id="feeding-ability-2"
                          className="size-5"
                        />
                        <Label htmlFor="feeding-ability-2">
                          Opponent Zone Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="All Zones"
                          id="feeding-ability-3"
                          className="size-5"
                        />
                        <Label htmlFor="feeding-ability-3">All Zones</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Unsure/Doesn't Feed"
                          id="feeding-ability-4"
                          className="size-5"
                        />
                        <Label htmlFor="feeding-ability-4">
                          {"Unsure/Doesn't Feed"}
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/*Endgame scoring capability radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Highest Climb Level
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
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="None"
                          id="endgame-1"
                          className="size-5"
                        />
                        <Label htmlFor="endgame-1">No Climb</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="L1"
                          id="endgame-2"
                          className="size-5"
                        />
                        <Label htmlFor="endgame-2">L1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="L2"
                          id="endgame-3"
                          className="size-5"
                        />
                        <Label htmlFor="endgame-3">L2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="L3"
                          id="endgame-4"
                          className="size-5"
                        />
                        <Label htmlFor="endgame-4">L3</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="All Levels"
                          id="endgame-5"
                          className="size-5"
                        />
                        <Label htmlFor="endgame-5">All Levels</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* auto climb radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Can climb in auto?
            </FormLabel>
            <FormField
              name="canAutoClimb"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Yes"
                            id="auto-climb-1"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="auto-climb-1">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="No"
                            id="auto-climb-2"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="auto-climb-2">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          </div>

          {/* Tower climb location radio group */}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Tower climb location
            </FormLabel>
            <FormField
              name="climbLocation"
              control={pitScoutingForm.control}
              render={({ field }) => (
                <>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="None"
                          id="tower-location-4"
                          className="size-5"
                        />
                        <Label htmlFor="tower-location-4">None</Label>
                      </div>
                      <div className="flex items-center space-x-2 ">
                        <RadioGroupItem
                          value="Side Only"
                          id="tower-location-1"
                          className="size-5"
                        />
                        <Label htmlFor="tower-location-1">Side Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Middle Only"
                          id="tower-location-2"
                          className="size-5"
                        />
                        <Label htmlFor="tower-location-2">Middle Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Any"
                          id="tower-location-3"
                          className="size-5"
                        />
                        <Label htmlFor="tower-location-3">Any</Label>
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
