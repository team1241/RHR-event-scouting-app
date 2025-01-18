export const ALLIANCE_COLOURS = {
  BLUE: "blue",
  RED: "red",
};

export enum MATCH_STATES {
  PRE_START = "prestart",
  TELEOP = "teleop",
  AUTO = "auto",
  FINISHED = "finished",
}

export const ACTION_NAMES = {
  A_STOP: "a-stop",
  UNDO: "undo",
  OUTTAKE: "outtake",
  DISLODGE: "dislodge",
  INTAKE: "intake",
  SCORE: "score",
  DROP: "drop",
  MISS: "miss",
  CLIMB: {
    ATTEMPT: "climb-attempt",
    SUCCESS: "climb-success",
    FAIL: "climb-fail",
  },
  PARK: "park",
  DEFENDING: "defending",
};

export const GAME_PIECES = {
  CORAL: "coral",
  ALGAE: "algae",
  CAGE: {
    DEEP: "deep-cage",
    SHALLOW: "shallow-cage",
  },
};

export const LOCATIONS = {
  OPPONENT_HALF: "opponent-half",
  ALLIANCE_HALF: "alliance-half",
  GROUND: "ground",
  // Game specific
  CORAL_STATION: "coral-station",
  PROCESSOR: "processor",
  NET: "net",
  REEF: {
    L1: "reef-L1",
    L2: "reef-L2",
    L3: "reef-L3",
    L4: "reef-L4",
  },
  BARGE: {
    OUTER: "outer-barge",
    MIDDLE: "middle-barge",
    INNER: "inner-barge",
  },
};

export const STARTING_POSITIONS = {};
