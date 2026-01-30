"use client";

import { FieldImages } from "@prisma/client";
import { createContext } from "react";
import {
  LOCATION_STATES,
  MATCH_STATES,
} from "~/app/scout/[eventCode]/constants";
import { MatchScheduleType } from "~/server/http/frc-events";

export type ScoutAction = {
  scoutId: string;
  eventCode: string;
  matchNumber: string;
  teamNumber: number;
  isAuto: boolean;
  actionName: string;
  gamePiece: string;
  location: string;
  timestamp: string;
  hasUndo?: boolean;
  wasDefended?: boolean;
};

export type StartingPositionDataType = {
  position: string;
  showedUp: boolean;
  hasPreload: boolean;
};

export type AlternateScoutData = {
  scoring: {
    [key: string]: number;
  };
  setup: {
    [key: string]: string | number | object;
  };
};

interface ScoutDataContextType {
  isAlternateScout: boolean;
  setIsAlternateScout: (isAlternateScout: boolean) => void;
  alternateScoutData?: AlternateScoutData;
  setAlternateScoutData?: (alternateScoutData: AlternateScoutData) => void;
  matchSchedule: MatchScheduleType[];
  setMatchSchedule: (matchSchedule: MatchScheduleType[]) => void;
  currentMatch: MatchScheduleType | undefined;
  setCurrentMatch: (match: MatchScheduleType) => void;
  fieldImages: FieldImages[] | undefined;
  matchNumber: string;
  setMatchNumber: (matchNumber: string) => void;
  teamToScout: number | string | undefined;
  setTeamToScout: (teamToScout: number | string | undefined) => void;
  allianceColour: string;
  setAllianceColour: (allianceColour: string) => void;
  uiOrientation: string;
  setUiOrientation: (uiOrientation: string) => void;
  scouterDetails: {
    name: string;
    clerkId: string;
    id: string;
  };
  setScouterDetails: (scouterName: {
    name: string;
    clerkId: string;
    id: string;
  }) => void;
  startingPosition: StartingPositionDataType;
  setStartingPosition: (startingPosition: StartingPositionDataType) => void;
  gamePieceState: { type: string; count: number }[];
  setGamePieceState: (
    gamePieceState: { type: string; count: number }[],
  ) => void;
  locationState: LOCATION_STATES;
  setLocationState: (location: LOCATION_STATES) => void;
  actions: ScoutAction[];
  setActions: (actions: ScoutAction[]) => void;
  undoOccurred: boolean;
  setUndoOccurred: (undoOccurred: boolean) => void;
  wasDefended: boolean;
  setWasDefended: (wasDefended: boolean) => void;
  isDefending: boolean;
  setIsDefending: (isDefending: boolean) => void;
  matchState: MATCH_STATES;
  setMatchState: (matchState: MATCH_STATES) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (isTimerRunning: boolean) => void;
  eventType: string;
  previousEndgameAction: {
    actionDone: boolean;
    positionSelected: string;
    actionMessage: string;
  };
  setPreviousEndgameAction: (previousEndgameAction: {
    actionDone: boolean;
    positionSelected: string;
    actionMessage: string;
  }) => void;
  setEndGameAction: string;
  eventCode: string;
  isMatchScheduleLoading: boolean;
  hasLeftStartingLine: boolean;
  setHasLeftStartingLine: (hasLeftStartingLine: boolean) => void;
  isAutoStopped: boolean;
  setIsAutoStopped: (isAutoStopped: boolean) => void;
  isBrownedOut: boolean;
  setIsBrownedOut: (isBrownedOut: boolean) => void;
  comment: string;
  setComment: (comment: string) => void;
  flashScoutLayout: boolean;
  setFlashScoutLayout: (flashScoutLayout: boolean) => void;
  isShooting: boolean;
  setIsShooting: (isShooting: boolean) => void;
  isFeeding: boolean;
  setIsFeeding: (isFeeding: boolean) => void;
}
export const ScoutDataContext = createContext<ScoutDataContextType>(
  {} as ScoutDataContextType,
);
