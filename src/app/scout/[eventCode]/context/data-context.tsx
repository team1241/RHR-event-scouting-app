"use client";

import { createContext } from "react";
import { MatchScheduleType } from "~/server/http/frc-events";

export type ScoutAction = {
  isAuto: boolean;
  eventCode: string;
  actionName: string;
  gamePiece: string;
  location: string;
  timestamp: string;
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
  startingPositions: StartingPositionDataType;
  setStartingPositions: (startingPositions: StartingPositionDataType) => void;
  gamePieceState: { type: string; count: number }[];
  setGamePieceState: (
    gamePieceState: { type: string; count: number }[]
  ) => void;
  actions: ScoutAction[];
  setActions: (actions: ScoutAction[]) => void;
}

export const ScoutDataContext = createContext<ScoutDataContextType>(
  {} as ScoutDataContextType
);
