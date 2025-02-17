export const ALLIANCE_COLOURS = {
  BLUE: "blue",
  RED: "red",
};

export const FIELD_ORIENTATIONS = {
  DEFAULT: "default",
  FLIPPED: "flipped",
};

export enum MATCH_STATES {
  PRE_START = "prestart",
  TELEOP = "teleop",
  AUTO = "auto",
  FINISHED = "finished",
}

export const ACTION_NAMES = {
  A_STOP: "a-stop",
  MATCH_START: "match-start",
  AUTO_COMPLETE: "auto-complete",
  TELEOP_START: "teleop-start",
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
    NOTHING: "endgame-nothing",
  },
  PARK: "park",
  DEFENDING: "defending",
  LEAVE: "left-starting-line",
};

export const GAME_PIECES = {
  CORAL: "coral",
  ALGAE: "algae",
  CAGE: {
    DEEP: "deep-cage",
    SHALLOW: "shallow-cage",
  },
  NOGAMEPIECE: "no-game-piece",
};

export const LOCATIONS = {
  OPPONENT_HALF: "opponent-half",
  ALLIANCE_HALF: "alliance-half",
  GROUND: "ground",
  // Game specific
  CORAL_STATION: {
    LEFT: "coral-station-left",
    RIGHT: "coral-station-right",
  },
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

export const STARTING_POSITIONS = {
  ZONE_1: "opposite-processor",
  ZONE_2: "middle",
  ZONE_3: "near-processor",
};

export const LOCAL_STORAGE_KEYS = {
  UI_ORIENTATION: "rhr_scouting:ui_orientation",
  STARTING_POSITION: "rhr_scouting:starting_position",
  SCOUTER_DETAILS: "rhr_scouting:scouter_details",
  ACTIONS: "rhr_scouting:scouted_actions",
  CURRENT_SCREEN: "rhr_scouting:current_screen",
};

export const SCREEN_NAMES = {
  MATCH_SELECTION: "match-selection",
  STARTING_POSITIONS: "starting-positions",
  AUTO: "auto",
  TELEOP: "teleop",
  ENDGAME: "endgame",
  FINALIZE: "finalize",
  ALTERNATE_SCOUT: {
    SETUP: "alternate-scout-setup",
    SCORING: "alternate-scout-scoring",
  },
};
