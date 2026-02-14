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

export enum LOCATION_STATES {
  ALLIANCE_ZONE = 'alliance-zone',
  NEUTRAL_ZONE = 'neutral-zone',
  OPPONENT_ZONE = 'opponent-zone'
}

export enum ZONE_CROSSING_ARROW_DIRECTION {
  RIGHT = 'Right',
  LEFT = "Left"
}

export const ACTION_NAMES = {
  A_STOP: "a-stop",
  MATCH_START: "match-start",
  AUTO_COMPLETE: "auto-complete",
  TELEOP_START: "teleop-start",
  BROWN_OUT: "brown-out",
  BROWN_OUT_END: "brown-out-end",
  UNDO: "undo",
  OUTTAKE: "outtake",
  DISLODGE: "dislodge",
  INTAKE: "intake",
  SCORE: "score",
  DROP: "drop",
  MISS: "miss",
  CLIMB: {
    START: "climb-start",
    ATTEMPT: "climb-attempt",
    SUCCESS: "climb-success",
    FAIL: "climb-fail",
    NOTHING: "endgame-nothing",
  },
  PARK: "park",
  DEFENDING: "defending",
  LEAVE: "left-starting-line",
  ZONE_TRANSITION: "zone-transition",
  FEEDING: "feeding-start",
  FEEDING_END: "feeding-end",
  SHOOTING: "shooting-start",
  SHOOTING_END: "shooting-end",
  SHOOTING_ACCURACY: "shooting-accuracy",
  CROSS_MID_LINE: "cross-mid-line"
};

export const GAME_PIECES_2025 = {
  CORAL: "coral",
  ALGAE: "algae",
  CAGE: {
    DEEP: "deep-cage",
    SHALLOW: "shallow-cage",
  },
  NOGAMEPIECE: "no-game-piece",
};

export const GAME_PIECE = {
  FUEL: "fuel",
  TOWER: "tower",
  NONE: "no-game-piece"
}

export const LOCATIONS_2025 = {
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
    BASE: "reef",
  },
  BARGE: {
    OUTER: "outer-barge",
    MIDDLE: "middle-barge",
    INNER: "inner-barge",
    BASE: "barge",
  },
};

export const STARTING_POSITIONS_2025 = {
  ZONE_1: "opposite-processor",
  ZONE_2: "middle",
  ZONE_3: "near-processor",
};

export const LOCATIONS = {
  ...LOCATION_STATES,
  DEPOT: "depot",
  OUTPOST: "outpost",
  SHOOTING: {
    AUTO: {
      DEPOT_ZONE: "depot-zone",
      TOWER_ZONE: "tower-zone",
      OUTPOST_ZONE: "outpost-zone"
    }
  },
  INTAKING: {
    AUTO: {
      NEUTRAL_ZONE: {
        ZONE_1: "neutral-zone-depot-side",
        ZONE_2: "neutral-zone-middle",
        ZONE_3: "neutral-zone-outpost-side"
      }
    }
  },
  BUMP: {
    DEPOT: "bump-depot-side",
    OUTPOST: "bump-outpost-side"
  },
  TRENCH: {
    DEPOT: "trench-depot-side",
    OUTPOST: "trench-outpost-side"
  },
  TOWER: {
    L1: "tower-L1",
    L2: "tower-L2",
    L3: "tower-L3",
    LEFT: "tower-left",
    CENTER: "tower-center",
    RIGHT: "tower-right",
  },
  MID_LINE: "mid-line"
}

export const STARTING_POSITIONS = {
  ZONE_1: LOCATIONS.TRENCH.DEPOT,
  ZONE_2: 'starting-line-depot',
  ZONE_3: LOCATIONS.BUMP.DEPOT,
  ZONE_4: 'starting-line-hub',
  ZONE_5: LOCATIONS.BUMP.OUTPOST,
  ZONE_6: 'starting-line-outpost',
  ZONE_7: LOCATIONS.TRENCH.OUTPOST
}

export const SHOOTING_ACCURACY = {
  ALL: 1,
  MOST: 0.8,
  HALF: 0.5,
  FEW: 0.2,
  NONE: 0
}


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
