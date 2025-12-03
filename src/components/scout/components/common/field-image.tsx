"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { ScoutDataContext } from "~/components/scout/context";
import { cn } from "~/lib/utils";

const FieldImage = ({
  imageSize = "100%",
  fieldSize = "full",
  children,
}: {
  imageSize?: "25%" | "50%" | "75%" | "100%";
  fieldSize?: "full" | "half";
  children?: React.ReactNode;
}) => {
  const { uiOrientation, allianceColour, fieldImages, flashScoutLayout } =
    useContext(ScoutDataContext);

  const normalImages = fieldImages?.filter(
    (image) => !image.type.includes("FLIPPED")
  );

  const flippedImages = fieldImages?.filter((image) =>
    image.type.includes("FLIPPED")
  );

  const getImageSize = () => {
    if (imageSize === "100%") return "w-full";
    if (imageSize === "50%") return "w-1/2";
    if (imageSize === "75%") return "w-3/4";
    if (imageSize === "25%") return "w-1/4";
  };

  const getImageUrl = () => {
    const imageList =
      uiOrientation === "flipped" ? flippedImages : normalImages;

    if (fieldSize === "full") {
      return imageList!.find((image) => image.type.includes("FULL"))!.imageUrl;
    }
    // Here we know we are in half field
    return imageList!.find(
      (image) =>
        image.type.includes("HALF") &&
        image.type.toLowerCase().includes(allianceColour)
    )!.imageUrl;
  };

  const height = "h-[26rem]";

  return (
    <div
      className={cn(
        "relative grid [grid-template-areas:'stack'] place-content-stretch my-3",
        height,
        getImageSize()
      )}
    >
      <div className="[grid-area:stack]">
        {fieldImages && <Image src={getImageUrl()} alt="Field Image" fill />}
      </div>
      <div className={cn("z-40 [grid-area:stack]", getImageSize())}>
        {children}
      </div>
      <div
        className={cn(
          "z-60 [grid-area:stack] h-full",
          getImageSize(),
          flashScoutLayout ? "animate-pulse bg-red-700" : ""
        )}
      />
    </div>
  );
};

export default FieldImage;
