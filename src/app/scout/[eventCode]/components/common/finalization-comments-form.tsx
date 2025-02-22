"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

//import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/text-area";
import { ScoutDataContext } from "../../context/data-context";
const FormSchema = z.object({
  comment: z.string(),
});

export function CommentsForm() {
  const context = useContext(ScoutDataContext);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  form.setValue("comment", context.comment);
  return (
    <Form {...form}>
      <form className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments(Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type comments here"
                  className="resize-none w-96 h-28"
                  {...field}
                  onSelect={() => context.setComment(field.value)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
