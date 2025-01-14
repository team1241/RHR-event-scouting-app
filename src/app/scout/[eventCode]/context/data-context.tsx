"use client";

import { createContext } from "react";
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
  timestamp?: string | undefined;
  hasUndo?: boolean;
  wasDefended?: boolean;
};

export type StartingPositionDataType = {
  position: string;
  showedUp: boolean;
  hasPreload: boolean;
};

interface ScoutDataContextType {
  isAlternateScout: boolean;
  setIsAlternateScout: (isAlternateScout: boolean) => void;
  matchSchedule: MatchScheduleType[];
  setMatchSchedule: (matchSchedule: MatchScheduleType[]) => void;
  matchNumber: string;
  setMatchNumber: (matchNumber: string) => void;
  teamToScout: number | undefined;
  setTeamToScout: (teamToScout: number | undefined) => void;
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
    gamePieceState: { type: string; count: number }[]
  ) => void;
  actions: ScoutAction[];
  setActions: (actions: ScoutAction[]) => void;
  undoOccurred: boolean;
  setUndoOccurred: (undoOccurred: boolean) => void;
  wasDefended: boolean;
  setWasDefended: (wasDefended: boolean) => void;
}

export const ScoutDataContext = createContext<ScoutDataContextType>(
  {} as ScoutDataContextType
);
