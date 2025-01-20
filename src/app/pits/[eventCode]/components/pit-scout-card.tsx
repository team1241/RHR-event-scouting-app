"use client";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Carousel as CarouselV2,
  CarouselMainContainer,
  SliderMainItem,
  CarouselThumbsContainer,
  CarouselIndicator,
} from "~/components/ui/carousel-v2";
import { upsertRobotImage } from "~/db/queries/robot-images";
import { UploadButton } from "~/lib/uploadthing";
import { TeamTypeWithImages } from "~/server/http/frc-events";

const PitScoutCard = ({
  team,
  eventCode,
}: {
  team: TeamTypeWithImages;
  eventCode: string;
}) => {
  const uploadRobotImageMutation = useMutation({
    mutationKey: ["uploadRobotImage", team?.teamNumber],
    mutationFn: async (updateData: { imageUrl: string; teamNumber: number }) =>
      upsertRobotImage({ ...updateData, revalidateUrl: `/pits` }),
  });

  return (
    <Card>
      {!team.fieldImages ? (
        <div className="flex flex-col items-center justify-center h-[256px]">
          <p>No images</p>
        </div>
      ) : (
        <div className="relative w-full">
          <CarouselV2 carouselOptions={{ loop: true }}>
            <div className="relative ">
              <CarouselMainContainer className="h-[250]">
                {team.fieldImages &&
                  team.fieldImages.map((imageUrl, index) => (
                    <SliderMainItem key={index} className="bg-transparent">
                      <div className="size-full flex items-center justify-center rounded-xl bg-background">
                        <Image
                          src={imageUrl}
                          width={200}
                          height={300}
                          className="w-full h-36 md:h-64 object-cover rounded-t-lg"
                          alt={`picture of ${team.teamNumber}`}
                        />
                      </div>
                    </SliderMainItem>
                  ))}
              </CarouselMainContainer>
              {team.fieldImages && team.fieldImages?.length > 1 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <CarouselThumbsContainer className="gap-x-1 -bottom-5">
                    {team.fieldImages.map((_, index) => (
                      <CarouselIndicator
                        key={index}
                        index={index}
                        className="h-2 w-8"
                      />
                    ))}
                  </CarouselThumbsContainer>
                </div>
              )}
            </div>
          </CarouselV2>
        </div>
      )}

      <CardHeader className="pt-4 pb-2">
        <CardTitle className="font-bold text-2xl">{team?.teamNumber}</CardTitle>
        <CardDescription className="font-semibold text-xl line-clamp-1">
          {team?.nameShort}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UploadButton
          endpoint="imageUploader"
          className="w-full"
          content={{
            button({ ready, isUploading }) {
              if (ready) return "Add Image";
              if (isUploading) return "Uploading...";
              return "Loading...";
            },
          }}
          onBeforeUploadBegin={(files) => {
            // This adds a prefix of the restaurant name to the image
            return files.map((f) => {
              return new File(
                [f],
                `${team.teamNumber}_${eventCode}_${f.name}`,
                {
                  type: f.type,
                }
              );
            });
          }}
          onClientUploadComplete={async (result) => {
            await uploadRobotImageMutation.mutateAsync({
              imageUrl: result[0].url,
              teamNumber: team.teamNumber,
            });
            toast.success(
              `Image for ${team.teamNumber} uploaded successfully!`
            );
          }}
        />
      </CardContent>
    </Card>
  );
};

export default PitScoutCard;
