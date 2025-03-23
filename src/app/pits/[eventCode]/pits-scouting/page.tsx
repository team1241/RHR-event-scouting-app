"use client";

import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import PageHeading from "~/components/common/page-heading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/text-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import MatchSelectionForm from "~/app/scout/[eventCode]/components/common/match-selection-form";
export default function PitScoutingForm() {
  const [isTeamSelectedOpen, setIsTeamSelectedOpen] = useState(false);

  const pitScoutingSchema = z.object({
    robotLength: z.string({
      required_error: "Enter robots length",
    }),
    robotWidth: z.string({
      required_error: "Enter robots width",
    }),
    robotWeight: z.string({ required_error: "Enter the robots weight" }),
    driveType: z.string(),
    groundIntake: z.string(),
    reefIntake: z.string(),
    algaeScoringCapability: z.string(),
    coralScoringCapability: z.string(),
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
      robotWeight: "",
      driveType: "",
      groundIntake: "",
      reefIntake: "",
      algaeScoringCapability: "",
      coralScoringCapability: "",
      endGameScoringCapability: "",
      autonomousCapability: "",
      driveTeamCapability: "",
      comments: "",
      robotLength: "",
    },
  });

  return (
    <div className=" bg-slate-900 p-2 rounded-3xl">
      <div className="flex flex-col gap-10 m-5">
        <PageHeading>Pit Scouting Form</PageHeading>
        <div className="flex flex-col gap-2 w-fit">
          <p className="text-2xl font-semibold">Team Number: </p>
          <Popover
            open={isTeamSelectedOpen}
            onOpenChange={setIsTeamSelectedOpen}
          >
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="flex flex-row justify-between h-16 text-xl w-auto"
              >
                Select Team
                <ChevronDownIcon className="!size-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={-64}>
              <h1>
                this command stuff is lowkey complicated and idrk forms so we
                saving this for later
              </h1>
            </PopoverContent>
          </Popover>
        </div>
        {/* Length*/}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Robot&apos;s length
                </FormLabel>
                <FormField
                  name="robotLength"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter length here"
                          className="resize-y w-3/4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </Form>
        </div>
        {/* Width */}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Robot&apos;s width
                </FormLabel>
                <FormField
                  name="robotWidth"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter width here"
                          className="resize-y w-3/4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </Form>
        </div>
        {/* Weight */}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Robot&apos;s weight
                </FormLabel>
                <FormField
                  name="robotWeight"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter weight here"
                          className="resize-y w-3/4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </Form>
        </div>

        {/*Drive radio group */}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Drive base?
                </FormLabel>
                <FormField
                  name="driveType"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <RadioGroup onChange={() => console.log(field.value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Swerve"
                          id="r1"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r1" className="text-xl">
                          Swerve
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Tank"
                          id="r2"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r2" className="text-xl">
                          Tank
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                ></FormField>
              </form>
            </FormProvider>
          </Form>
        </div>

        {/*Ground intake radio group */}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Ground intake?
                </FormLabel>
                <FormField
                  name="groundIntake"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <RadioGroup
                        onChange={() => {
                          console.log(field.value);
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Coral"
                            id="r3"
                            className="size-5"
                            onClick={(event) => {
                              field.onChange(event.target.value);
                            }}
                          />
                          <Label htmlFor="r3" className="text-xl">
                            Coral
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Algae"
                            id="r4"
                            className="size-5"
                            onClick={(event) => {
                              field.onChange(event.target.value);
                            }}
                          />
                          <Label htmlFor="r4" className="text-xl">
                            Algae
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="Both"
                            id="r5"
                            className="size-5"
                            onClick={(event) => {
                              field.onChange(event.target.value);
                            }}
                          />
                          <Label htmlFor="r5" className="text-xl">
                            Both
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="None"
                            id="r6"
                            className="size-5"
                            onClick={(event) => {
                              field.onChange(event.target.value);
                            }}
                          />
                          <Label htmlFor="r6" className="text-xl">
                            None
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                ></FormField>
              </form>
            </FormProvider>
          </Form>
        </div>
        {/*Reef intake radio group */}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Can they intake from the Reef?
                </FormLabel>
                <FormField
                  name="reefIntake"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <RadioGroup onChange={() => console.log(field.value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="L2"
                          id="r7"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r7" className="text-xl">
                          L2
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="L3"
                          id="r8"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r8" className="text-xl">
                          L3
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Both"
                          id="r9"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r9" className="text-xl">
                          Both
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Dislodge"
                          id="r10"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r10" className="text-xl">
                          Dislodge Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="None"
                          id="r11"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r11" className="text-xl">
                          None
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                ></FormField>
              </form>
            </FormProvider>
          </Form>
        </div>
        {/*Algae scoring capability radio group */}
        <div className="flex flex-col gap-2">
          <Form {...pitScoutingForm}>
            <FormProvider {...pitScoutingForm}>
              <form>
                <FormLabel className="text-2xl font-semibold">
                  Algae scoring capability?
                </FormLabel>
                <FormField
                  name="algaeScoringCapability"
                  control={pitScoutingForm.control}
                  render={({ field }) => (
                    <RadioGroup onChange={() => console.log(field.value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Swerve"
                          id="r1"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r1" className="text-xl">
                          Swerve
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Tank"
                          id="r2"
                          className="size-5"
                          onClick={(event) => {
                            field.onChange(event.target.value);
                          }}
                        />
                        <Label htmlFor="r2" className="text-xl">
                          Tank
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                ></FormField>
              </form>
            </FormProvider>
          </Form>

          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Net" id="r12" className="size-5" />
              <Label htmlFor="r12" className="text-xl">
                Net
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Processor" id="r13" className="size-5" />
              <Label htmlFor="r13" className="text-xl">
                Processor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Both" id="r14" className="size-5" />
              <Label htmlFor="r14" className="text-xl">
                Both
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="None" id="r15" className="size-5" />
              <Label htmlFor="r15" className="text-xl">
                None
              </Label>
            </div>
          </RadioGroup>
        </div>
        {/*Coral scoring capability radio group */}
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Coral scoring capability?</p>
          <div className="flex items-center space-x-2">
            <Checkbox id="c1" className="size-5" />
            <Label htmlFor="c1" className="text-xl">
              L1
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c2" className="size-5" />
            <Label htmlFor="c2" className="text-xl">
              L2
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c3" className="size-5" />
            <Label htmlFor="c3" className="text-xl">
              L3
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c4" className="size-5" />
            <Label htmlFor="c4" className="text-xl">
              L4
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c5" className="size-5" />
            <Label htmlFor="c5" className="text-xl">
              All Levels
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="c6" className="size-5" />
            <Label htmlFor="c6" className="text-xl">
              None
            </Label>
          </div>
        </div>
        {/*Endgame scoring capability radio group */}
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Endgame scoring capability?</p>
          <RadioGroup>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Park" id="r16" className="size-5" />
              <Label htmlFor="r16" className="text-xl">
                Park
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="Shallow Hang"
                id="r17"
                className="size-5"
              />
              <Label htmlFor="r17" className="text-xl">
                Shallow Hang
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Deep Hang" id="r17" className="size-5" />
              <Label htmlFor="r17" className="text-xl">
                Deep Hang
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="All" id="r18" className="size-5" />
              <Label htmlFor="r18" className="text-xl">
                Shallow and Deep
              </Label>
            </div>
          </RadioGroup>
        </div>
        {/*Autonomous scoring capability\*/}
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">What can they do in autos?</p>
          <Input
            placeholder="Enter autonomous cycles here"
            className="resize-y w-3/4"
          />
        </div>
        {/*Drive team experience\*/}
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Drive team experience?</p>
          <Input
            placeholder="Enter drive team experience here"
            className="resize-y w-3/4"
          />
        </div>
        {/*Comments*/}
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">
            Anything else notable about the robot?
          </p>
          <Input placeholder="Enter comments here" className="resize-y w-3/4" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">Upload image of robot:</p>
        </div>
      </div>
    </div>
  );
}
