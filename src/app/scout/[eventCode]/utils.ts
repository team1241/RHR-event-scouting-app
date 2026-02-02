import { FIELD_ORIENTATIONS, ALLIANCE_COLOURS, ZONE_CROSSING_ARROW_DIRECTION, LOCATION_STATES } from "./constants";

export const getFlexDirection = (
  uiOrientation: string,
  allianceColour: string
) => {
  if (
    uiOrientation === FIELD_ORIENTATIONS.DEFAULT &&
    allianceColour === ALLIANCE_COLOURS.BLUE
  ) {
    return { row: "flex-row-reverse", col: "flex-col-reverse" };
  }

  if (
    uiOrientation === FIELD_ORIENTATIONS.DEFAULT &&
    allianceColour === ALLIANCE_COLOURS.RED
  ) {
    return { row: "flex-row", col: "flex-col" };
  }

  if (
    uiOrientation === FIELD_ORIENTATIONS.FLIPPED &&
    allianceColour === ALLIANCE_COLOURS.BLUE
  ) {
    return { row: "flex-row", col: "flex-col" };
  }

  return { row: "flex-row-reverse", col: "flex-col-reverse" };
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

export const getZoneCrossingArrowDirection = (uiOrientation: string, allianceColour: string, currentZone: LOCATION_STATES): ZONE_CROSSING_ARROW_DIRECTION => {
  switch (currentZone) {
    case LOCATION_STATES.ALLIANCE_ZONE:
      if (uiOrientation === FIELD_ORIENTATIONS.DEFAULT) {
        return allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.RIGHT : ZONE_CROSSING_ARROW_DIRECTION.LEFT
      }
      return allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.LEFT : ZONE_CROSSING_ARROW_DIRECTION.RIGHT
    case LOCATION_STATES.NEUTRAL_ZONE:
    case LOCATION_STATES.OPPONENT_ZONE:
      if (uiOrientation === FIELD_ORIENTATIONS.DEFAULT) {
        return allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.LEFT : ZONE_CROSSING_ARROW_DIRECTION.RIGHT
      }
      return allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.RIGHT : ZONE_CROSSING_ARROW_DIRECTION.LEFT
  }
  // This should never happen
  return ZONE_CROSSING_ARROW_DIRECTION.LEFT
}

export const getZoneCrossingDirection = () => {

}