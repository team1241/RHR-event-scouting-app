"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";

export default function TeamScoutedForm() {
  const teamSelectedSchema = z.object({
    blueTeamNameOne: z.string().refine((val) => val.length > 0, {
      message: "PUT IN A TEAM",
    }),
    blueTeamNameTwo: z.string().refine((val) => val.length > 0, {
      message: "PUT IN A TEAM",
    }),
    blueTeamNameThree: z.string().refine((val) => val.length > 0, {
      message: "PUT IN A TEAM",
    }),
    redTeamNameOne: z.string().refine((val) => val.length > 0, {
      message: "PUT IN A TEAM",
    }),
    redTeamNameTwo: z.string().refine((val) => val.length > 0, {
      message: "PUT IN A TEAM",
    }),
    redTeamNameThree: z.string().refine((val) => val.length > 0, {
      message: "PUT IN A TEAM",
    }),
  });

  const teamSelectedForm = useForm<z.infer<typeof teamSelectedSchema>>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(teamSelectedSchema),
    defaultValues: {
      blueTeamNameOne: "",
      blueTeamNameTwo: "",
      blueTeamNameThree: "",
      redTeamNameOne: "",
      redTeamNameTwo: "",
      redTeamNameThree: "",
    },
  });

  const onFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...teamSelectedForm}>
      <form
        onSubmit={teamSelectedForm.handleSubmit(onFormSubmit)}
        className="gap-4 py-4"
      >
        <p className="text-white text-xl font-bold mb-3 flex items-center justify-center ">
          TEAM NUMBER
        </p>
        <FormField
          name="blueTeamNameOne"
          control={teamSelectedForm.control}
          render={({ field }) => (
            <Select>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="B1">5407 Celt-X</SelectItem>
                  <SelectItem value="B2">1241 Theory6</SelectItem>
                  <SelectItem value="B3">2056 OP Robotics</SelectItem>
                  <SelectItem value="R1">987 HIGHROLLERS</SelectItem>
                  <SelectItem value="R2">772 Sabre Bytes</SelectItem>
                  <SelectItem value="R3">1285 The Biggest Birds</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </form>
    </Form>
  );
}
