"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";
import { toast } from "sonner";

export default function CreateApiKeyModal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newApiKeyFormSchema = z.object({
    keyName: z.string(),
  });

  const newApiKeyForm = useForm<z.infer<typeof newApiKeyFormSchema>>({
    reValidateMode: "onChange",
    resolver: zodResolver(newApiKeyFormSchema),
    defaultValues: { keyName: "" },
  });

  const handleFormSubmit = async (
    formValues: z.infer<typeof newApiKeyFormSchema>
  ) => {
    await axios.post("/api/key/create", {
      name: formValues.keyName !== "" ? formValues.keyName : undefined,
    });
  };

  return (
    <Dialog
      onOpenChange={() => {
        newApiKeyForm.setValue("keyName", "");
      }}
    >
      <DialogTrigger asChild>
        <Button className="max-w-fit">
          <PlusIcon />
          Create new key
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...newApiKeyForm}>
          <form
            onSubmit={newApiKeyForm.handleSubmit(handleFormSubmit)}
            className="space-y-2"
          >
            <DialogHeader>
              <DialogTitle>Create a new API key</DialogTitle>
              <DialogDescription>
                NOTE: API keys will expire 1 year after creation.
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="keyName"
              control={newApiKeyForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Key name (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="My API key" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* <div>
          <div className="relative">
            <Input readOnly type="text" />
            <button
              onClick={handleCopy}
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
              aria-label={copied ? "Copied" : "Copy to clipboard"}
              disabled={copied}
            >
              <div
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              >
                <CheckIcon
                  className="stroke-emerald-500"
                  size={16}
                  aria-hidden="true"
                />
              </div>
              <div
                className={cn(
                  "absolute transition-all",
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <CopyIcon size={16} aria-hidden="true" />
              </div>
            </button>
          </div>
        </div> */}
            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" disabled={isSubmitting}>
                  Close
                </Button>
              </DialogClose>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Fragment>
                    <Loader2Icon className="animate-spin" />
                    <span>Creating key...</span>
                  </Fragment>
                ) : (
                  <span>Create key</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
