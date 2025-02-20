import { FIELD_ORIENTATIONS, ALLIANCE_COLOURS } from "./constants";

export const getFlexDirection = (
  uiOrientation: string,
  allianceColour: string
) => {
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

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getHasCoralOrAlgae = (
  hasCoral: boolean,
  hasAlgae: boolean,
  isDefending: boolean
) => {
  const defending = isDefending ? " - Defending" : "";
  if (hasCoral && hasAlgae == false) {
    return `Has coral${defending}`;
  } else if (hasAlgae && hasCoral == false) {
    return `Has algae${defending}`;
  } else if (hasCoral && hasAlgae) {
    return `Has coral and algae${defending}`;
  }
  return `Has no game piece${defending}`;
};
