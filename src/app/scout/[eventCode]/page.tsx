"use client";

import React, { useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "./context";
import {
  AlternateScoutData,
  ScoutAction,
  StartingPositionDataType,
} from "./context/data-context";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { getUserByClerkId } from "~/db/queries/user";
import {
  fetchMatchScheduleByYearAndEventCode,
  MatchScheduleType,
} from "~/server/http/frc-events";
import { useParams, useSearchParams } from "next/navigation";
import ScoutingInfoHeader from "~/app/scout/[eventCode]/components/common/scouting-info-header";
import { FieldImages } from "@prisma/client";
import { getFieldImagesForActiveSeason } from "~/db/queries/field-images";
import {
  FIELD_ORIENTATIONS,
  LOCAL_STORAGE_KEYS,
  MATCH_STATES,
} from "~/app/scout/[eventCode]/constants";
import BallScoutSetup from "./components/ball-scout-setup";
import StartingPositionScreen from "./components/starting-position-screen";
import ScoutActionButton from "~/app/scout/[eventCode]/components/common/scout-action-button";
import {
  ACTION_NAMES,
  GAME_PIECES,
  LOCATIONS,
} from "~/app/scout/[eventCode]/constants";
import BallScoringScreen from "./components/ball-scoring-page";
import MatchSelectionScreen from "./components/match-selection-screen";

const ScoutPage = () => {
  const { eventCode } = useParams<{ eventCode: string }>();
  const eventType = useSearchParams().get("type");
  const eventYear = eventCode.substring(0, 4);
  const eventName = eventCode.substring(4);

  const SCREEN_NAMES = {
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

  // TODO: Update the components of each screen to be the actual screen once the dev for it is completed
  const screens = [
    {
      component: <MatchSelectionScreen />,
      name: SCREEN_NAMES.MATCH_SELECTION,
      canGoBack: false,
    },
    {
      component: <StartingPositionScreen />,
      name: SCREEN_NAMES.STARTING_POSITIONS,
      canGoBack: true,
    },
    {
      component: <div>Auto</div>,
      name: SCREEN_NAMES.AUTO,
      canGoBack: false,
    },
    {
      component: <div>Teleop</div>,
      name: SCREEN_NAMES.TELEOP,
      canGoBack: false,
    },
    {
      component: <div>Endgame</div>,
      name: SCREEN_NAMES.ENDGAME,
      canGoBack: true,
    },
    {
      component: <div>Finalize</div>,
      name: SCREEN_NAMES.FINALIZE,
      canGoBack: true,
    },
    {
      component: <BallScoutSetup />,
      name: SCREEN_NAMES.ALTERNATE_SCOUT.SETUP,
      canGoBack: true,
    },
    {
      component: <div>Alternate scout scoring</div>,
      name: SCREEN_NAMES.ALTERNATE_SCOUT.SCORING,
      canGoBack: true,
    },
  ];

  const [matchState, setMatchState] = useState<MATCH_STATES>(
    MATCH_STATES.PRE_START
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAlternateScout, setIsAlternateScout] = useState(false);
  const [undoOccurred, setUndoOccurred] = useState(false);
  const [wasDefended, setWasDefended] = useState(false);
  const [matchSchedule, setMatchSchedule] = useState<MatchScheduleType[]>([]);
  const [currentMatch, setCurrentMatch] = useState<MatchScheduleType>();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [matchNumber, setMatchNumber] = useState("");
  const [teamToScout, setTeamToScout] = useState<number | string | undefined>();
  const [allianceColour, setAllianceColour] = useState("");
  const [uiOrientation, setUiOrientation] = useState(
    (typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.UI_ORIENTATION)) ||
      FIELD_ORIENTATIONS.DEFAULT
  );
  const [scouterDetails, setScouterDetails] = useState({
    name: "",
    clerkId: "",
    id: "",
  });
  const [startingPosition, setStartingPosition] =
    useState<StartingPositionDataType>({
      position: "",
      showedUp: true,
      hasPreload: false,
    });
  const [gamePieceState, setGamePieceState] = useState<
    { type: string; count: number }[]
  >([]);
  const [actions, setActions] = useState<ScoutAction[]>([]);
  const [alternateScoutData, setAlternateScoutData] =
    useState<AlternateScoutData>({
      scoring: { redMiss: 0, blueMiss: 0, redScore: 0, blueScore: 0 },
      setup: { redTeamNumber: 0, blueTeamNumber: 0 },
    });

  const nextScreen = () => {
    typeof window !== "undefined" && window.scrollTo(0, 0);
    setCurrentScreenIndex(
      currentScreenIndex < screens.length - 1
        ? currentScreenIndex + 1
        : currentScreenIndex
    );
  };

  const prevScreen = () => {
    typeof window !== "undefined" && window.scrollTo(0, 0);
    if (!screens[currentScreenIndex].canGoBack) return;
    setCurrentScreenIndex(
      currentScreenIndex > 0 ? currentScreenIndex - 1 : currentScreenIndex
    );
  };

  const goToScreen = (screenName: string) => {
    const screenIndex = screens.findIndex(
      (screen) => screen.name === screenName
    );
    typeof window !== "undefined" && window.scrollTo(0, 0);
    setCurrentScreenIndex(screenIndex);
  };

  const { isLoaded, isSignedIn, user } = useUser();

  const { data: userData } = useQuery({
    enabled: isLoaded && !!isSignedIn && !!user,
    queryKey: ["user"],
    queryFn: async () => getUserByClerkId(user!.id),
  });

  const { data: matchScheduleData } = useQuery({
    enabled: !!eventCode,
    // enabled: false,
    queryKey: [
      "matchSchedule",
      eventCode,
      eventType === "practice" ? "P" : "Q",
    ],
    queryFn: async (): Promise<MatchScheduleType[]> =>
      fetchMatchScheduleByYearAndEventCode(
        eventYear,
        eventName,
        !!eventType ? "Practice" : "Qualification"
      ),
  });

  const { data: fieldImages } = useQuery({
    queryKey: ["fieldImages"],
    queryFn: async (): Promise<FieldImages[]> =>
      getFieldImagesForActiveSeason(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (userData) {
      const scouterDetails = {
        name: `${userData.firstName!} ${userData.lastName!}`,
        clerkId: userData.clerkId,
        id: userData.id.toString(),
      };
      setScouterDetails(scouterDetails);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SCOUTER_DETAILS,
        JSON.stringify(scouterDetails)
      );
    }
  }, [userData]);

  useEffect(() => {
    if (matchScheduleData) {
      setMatchSchedule(matchScheduleData);
    }
  }, [matchScheduleData]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_SCREEN,
      JSON.stringify({
        currentScreenIndex,
        name: screens[currentScreenIndex].name,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreenIndex]);

  if (!userData) return <div>Loading...</div>;

  return (
    <ScoutScreenContext.Provider
      value={{
        screens,
        nextScreen,
        prevScreen,
        goToScreen,
        currentScreenIndex,
      }}
    >
      <ScoutDataContext.Provider
        value={{
          isAlternateScout,
          setIsAlternateScout,
          alternateScoutData,
          setAlternateScoutData,
          matchSchedule,
          setMatchSchedule,
          currentMatch,
          setCurrentMatch,
          matchNumber,
          setMatchNumber,
          teamToScout,
          setTeamToScout,
          allianceColour,
          setAllianceColour,
          uiOrientation,
          setUiOrientation,
          scouterDetails,
          setScouterDetails,
          startingPosition,
          setStartingPosition,
          gamePieceState,
          setGamePieceState,
          actions,
          setActions,
          undoOccurred,
          setUndoOccurred,
          wasDefended,
          setWasDefended,
          fieldImages,
          matchState,
          setMatchState,
          isTimerRunning,
          setIsTimerRunning,
          eventType: eventType || "Qualification",
        }}
      >
        <ScoutingInfoHeader />
        <BallScoringScreen />
        {screens[currentScreenIndex].component}
        <ScoutActionButton
          actionName={ACTION_NAMES.INTAKE}
          gamePiece={GAME_PIECES.CORAL}
          location={LOCATIONS.OPPONENT_HALF}
          label="Scout Action"
        />
      </ScoutDataContext.Provider>
    </ScoutScreenContext.Provider>
  );
};

export default ScoutPage;
