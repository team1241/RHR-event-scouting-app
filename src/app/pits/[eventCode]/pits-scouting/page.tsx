"use client";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import PageHeading from "~/components/common/page-heading";
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

export default function PitScoutingForm() {
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
    coralScoringCapability: z.array(z.string()),
    endGameScoringCapability: z.string(),
    autonomousCapability: z.string({ required_error: "Describe their autos" }),
    driveTeamCapability: z.string({
      required_error: "Enter drive team experience",
    }),
    comments: z.string({ required_error: "optional comments" }),
  });

  const pitScoutingForm = useForm<z.infer<typeof pitScoutingSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(pitScoutingSchema),
    defaultValues: {
      driveType: "",
      groundIntake: "",
      reefIntake: "",
      algaeScoringCapability: "",
      coralScoringCapability: [],
      endGameScoringCapability: "",
      autonomousCapability: "",
      driveTeamCapability: "",
      comments: "",
    },
  });

  const submitPitScoutingForm = async (
    data: z.infer<typeof pitScoutingSchema>
  ) => {
    console.log(data);
  };

  return (
    <>
      {/* <PageHeading>Pit Scouting Form</PageHeading> */}
      <Form {...pitScoutingForm}>
        <form
          onSubmit={
            (pitScoutingForm.handleSubmit(submitPitScoutingForm),
            () => console.log(pitScoutingForm.getValues()))
          }
          className="flex flex-col gap-4 w-full mt-4 mb-8"
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
                <FormControl>
                  <RadioGroup onValueChange={field.onChange}>
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
                            id="r2"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r2">Other</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
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
                <FormControl>
                  <RadioGroup onValueChange={field.onChange}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Coral"
                            id="r3"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r3">Coral</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Algae"
                            id="r4"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r4">Algae</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Both"
                            id="r5"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r5">Both</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="None"
                            id="r6"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r6">None</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
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
                <FormControl>
                  <RadioGroup onValueChange={field.onChange}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="L2"
                            id="r7"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r7">L2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="L3"
                            id="r8"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r8">L3</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Both"
                            id="r9"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r9">Both</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Dislodge"
                            id="r10"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r10">Dislodge Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem
                            value="None"
                            id="r11"
                            className="size-5"
                          />
                        </FormControl>
                        <Label htmlFor="r11">None</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
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
                <FormControl>
                  <RadioGroup onValueChange={field.onChange}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 ">
                        <RadioGroupItem
                          value="Net"
                          id="r12"
                          className="size-5"
                        />
                        <Label htmlFor="r12">Net</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Processor"
                          id="r13"
                          className="size-5"
                        />
                        <Label htmlFor="r13">Processor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Both"
                          id="r14"
                          className="size-5"
                        />
                        <Label htmlFor="r14">Both</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="None"
                          id="r15"
                          className="size-5"
                        />
                        <Label htmlFor="r15">None</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
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
                                  field.value?.filter((value) => value !== "L1")
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
                                  field.value?.filter((value) => value !== "L2")
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
                                  field.value?.filter((value) => value !== "L3")
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
                                  field.value?.filter((value) => value !== "L4")
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
                <FormControl>
                  <RadioGroup onValueChange={field.onChange}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Park"
                          id="r16"
                          className="size-5"
                        />
                        <Label htmlFor="r16">Park</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Shallow Hang"
                          id="r17"
                          className="size-5"
                        />
                        <Label htmlFor="r17">Shallow Hang</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Deep Hang"
                          id="r17"
                          className="size-5"
                        />
                        <Label htmlFor="r17">Deep Hang</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Shallow+Deep"
                          id="r18"
                          className="size-5"
                        />
                        <Label htmlFor="r18">Shallow and Deep</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
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
                </FormItem>
              )}
            />
          </div>
          {/*Comments*/}
          <div className="flex flex-col gap-2">
            <FormLabel className="text-2xl font-semibold">
              Anything else notable about the robot?
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
                </FormItem>
              )}
            />
          </div>
          <Button className="md:w-1/4 mt-2">Submit</Button>
        </form>
      </Form>
    </>
  );
}
