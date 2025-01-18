import { FIELD_ORIENTATIONS, ALLIANCE_COLOURS } from "./constants";

export const getFlexDirection = (uiOrientation: string, allianceColour: string) => {
    if (
      uiOrientation === FIELD_ORIENTATIONS.DEFAULT &&
      allianceColour === ALLIANCE_COLOURS.BLUE
    ) {
      return { row: "flex-row", col: "flex-col" };
    }

    if (
      uiOrientation === FIELD_ORIENTATIONS.DEFAULT &&
      allianceColour === ALLIANCE_COLOURS.RED
    ) {
      return { row: "flex-row-reverse", col: "flex-col-reverse" };
    }

    if (
      uiOrientation === FIELD_ORIENTATIONS.FLIPPED &&
      allianceColour === ALLIANCE_COLOURS.BLUE
    ) {
      return { row: "flex-row-reverse", col: "flex-col-reverse" };
    }

    return { row: "flex-row", col: "flex-col" };
  };