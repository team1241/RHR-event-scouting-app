"use client";

import axios from "axios";
import { Check, Images, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { deleteFieldImage, upsertFieldImage } from "~/db/queries/field-images";
import { useUploadThing } from "~/lib/uploadthing";
import { cn } from "~/lib/utils";
import utDeleteFilesByUrl from "~/server/actions/uploadthing";

import { FieldImageType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function FieldImageUploader({
  label,
  successMessage,
  filePrefix,
  fieldImageType,
  className,
  seasonId,
  imageUrl,
}: {
  label: string;
  seasonId: number;
  fieldImageType: FieldImageType;
  successMessage?: string;
  filePrefix?: string;
  className?: string;
  imageUrl?: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Prefetch the image if we have one
  useQuery({
    queryKey: ["images", imageUrl],
    queryFn: async () => await axios.get(imageUrl!),
    enabled: () => !!imageUrl,
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: async (res) => {
      await upsertFieldImage({
        fieldImageType,
        imageUrl: res[0].url,
        seasonId,
      });
      toast.dismiss();
      toast.success(successMessage ?? "File uploaded successfully!");
    },
    onUploadError: () => {
      toast.dismiss();
      toast.error(
        "There was an error while uploading the file. Please try again."
      );
    },
    onBeforeUploadBegin: (files) => {
      if (!filePrefix) return files;
      // This adds a prefix to the image
      return files.map((f) => {
        return new File([f], `${filePrefix}_${f.name}`, {
          type: f.type,
        });
      });
    },
  });

  const handleUploadClick = async () => {
    if (files.length !== 1) return;
    toast.loading("Uploading field image...");
    setIsLoading(true);

    if (imageUrl) {
      const oldImageUrl = imageUrl;
      // First delete the image from the DB
      await deleteFieldImage({ seasonId, fieldImageType });

      // Then delete it from uploadthing
      await utDeleteFilesByUrl({ fileUrls: [oldImageUrl] });
    }

    // Upload files
    await startUpload(files);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2 items-center">
        <Label className="text-base leading-none tracking-tight font-semibold">
          {label}
        </Label>
        {imageUrl && (
          <div className="flex gap-2 items-center">
            <Check className="size-6 dark:text-green-500" />
            <p className="dark:text-zinc-400 text-sm text-center">
              Image uploaded
            </p>
          </div>
        )}
      </div>

      <div
        className={cn("flex flex-col min-[425px]:flex-row gap-2", className)}
      >
        <Input
          type="file"
          accept="image/*"
          max={1}
          className={cn("cursor-pointer", imageUrl ? "md:w-3/4" : "")}
          onChange={(e) => {
            if (!e.target.files || !e.target.files.length) {
              setFiles([]);
            } else {
              setFiles([e.target.files.item(0)!]);
            }
          }}
        />
        <div className="flex flex-row gap-2 justify-end">
          <Button
            disabled={files.length !== 1 || isUploading || isLoading}
            onClick={handleUploadClick}
            className="size-10 lg:w-auto transition-all"
          >
            {isUploading || isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Upload />
            )}
            <span className="hidden lg:inline">Upload</span>
          </Button>
          {imageUrl && (
            <a
              className={cn(
                buttonVariants({ variant: "link" }),
                "size-10 lg:w-auto transition-all"
              )}
              href={imageUrl}
              target="_blank"
            >
              <span className="hidden lg:inline">View image</span>
              <Images />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
