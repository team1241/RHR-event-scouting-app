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

export const getZoneCrossingArrowDirection = (
  uiOrientation: string,
  allianceColour: string,
  currentZone: LOCATION_STATES,
  isOpponentCrossing: boolean = false
): ZONE_CROSSING_ARROW_DIRECTION => {
  const getOppositeDirection = (direction: ZONE_CROSSING_ARROW_DIRECTION) =>
    direction === ZONE_CROSSING_ARROW_DIRECTION.LEFT
      ? ZONE_CROSSING_ARROW_DIRECTION.RIGHT
      : ZONE_CROSSING_ARROW_DIRECTION.LEFT;

  let direction: ZONE_CROSSING_ARROW_DIRECTION;

  switch (currentZone) {
    case LOCATION_STATES.ALLIANCE_ZONE:
      if (uiOrientation === FIELD_ORIENTATIONS.DEFAULT) {
        direction = allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.RIGHT : ZONE_CROSSING_ARROW_DIRECTION.LEFT;
        break;
      }
      direction = allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.LEFT : ZONE_CROSSING_ARROW_DIRECTION.RIGHT;
      break;
    case LOCATION_STATES.NEUTRAL_ZONE:
      if (uiOrientation === FIELD_ORIENTATIONS.DEFAULT) {
        direction = allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.RIGHT : ZONE_CROSSING_ARROW_DIRECTION.LEFT;
        break;
      }
      direction = allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.LEFT : ZONE_CROSSING_ARROW_DIRECTION.RIGHT;
      break;
    case LOCATION_STATES.OPPONENT_ZONE:
      if (uiOrientation === FIELD_ORIENTATIONS.DEFAULT) {
        direction = allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.LEFT : ZONE_CROSSING_ARROW_DIRECTION.RIGHT;
        break;
      }
      direction = allianceColour === ALLIANCE_COLOURS.RED ? ZONE_CROSSING_ARROW_DIRECTION.RIGHT : ZONE_CROSSING_ARROW_DIRECTION.LEFT;
      break;
    default:
      direction = ZONE_CROSSING_ARROW_DIRECTION.LEFT;
  }

  if (currentZone === LOCATION_STATES.NEUTRAL_ZONE) {
    // Neutral-zone baseline should point outward from center.
    direction = getOppositeDirection(direction);
  }

  if (currentZone === LOCATION_STATES.NEUTRAL_ZONE && isOpponentCrossing) {
    return getOppositeDirection(direction);
  }

  return direction;
}

export const getZoneCrossingDirection = () => {

}
