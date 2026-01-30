"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  GAME_PIECES_2025,
  LOCAL_STORAGE_KEYS,
  LOCATION_STATES,
  MATCH_STATES,
  SCREEN_NAMES,
} from "~/app/scout/[eventCode]/constants";
import StartingPositionScreen from "./components/starting-position-screen";
import MatchSelectionScreen from "./components/match-selection-screen";
import EndgameScreen from "./components/endgame-screen";
import AutonomousScreen from "./components/autonomous-screen";
import TeleopScoringScreen from "./components/teleop-scoring-screen";
import FinalizationScreen from "~/app/scout/[eventCode]/components/common/finalization-screen";

const ScoutPage = () => {
  const { eventCode } = useParams<{ eventCode: string }>();
  const eventType = useSearchParams().get("type");
  const eventYear = eventCode.substring(0, 4);
  const eventName = eventCode.substring(4);

  const screens = useMemo(
    () => [
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
        component: <AutonomousScreen />,
        name: SCREEN_NAMES.AUTO,
        canGoBack: false,
      },
      {
        component: <TeleopScoringScreen />,
        name: SCREEN_NAMES.TELEOP,
        canGoBack: false,
      },
      {
        component: <EndgameScreen />,
        name: SCREEN_NAMES.ENDGAME,
        canGoBack: true,
      },
      {
        component: <FinalizationScreen />,
        name: SCREEN_NAMES.FINALIZE,
        canGoBack: true,
      },
    ],
    [],
  );

  const [matchState, setMatchState] = useState<MATCH_STATES>(
    MATCH_STATES.PRE_START,
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAlternateScout, setIsAlternateScout] = useState(false);
  const [undoOccurred, setUndoOccurred] = useState(false);
  const [wasDefended, setWasDefended] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [flashScoutLayout, setFlashScoutLayout] = useState(false);
  const [hasLeftStartingLine, setHasLeftStartingLine] = useState(false);
  const [isAutoStopped, setIsAutoStopped] = useState(false);
  const [isBrownedOut, setIsBrownedOut] = useState(false);
  const [isShooting, setIsShooting] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [matchSchedule, setMatchSchedule] = useState<MatchScheduleType[]>([]);
  const [currentMatch, setCurrentMatch] = useState<MatchScheduleType>();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [matchNumber, setMatchNumber] = useState("");
  const [teamToScout, setTeamToScout] = useState<number | string | undefined>();
  // TODO: REVERT THIS CHANGE
  const [allianceColour, setAllianceColour] = useState("red");
  const [uiOrientation, setUiOrientation] = useState(
    (typeof window !== "undefined" &&
      localStorage.getItem(LOCAL_STORAGE_KEYS.UI_ORIENTATION)) ||
      FIELD_ORIENTATIONS.DEFAULT,
  );

  const [previousEndgameAction, setPreviousEndgameAction] = useState({
    actionDone: false,
    positionSelected: "",
    actionMessage: "",
  });
  const [comment, setComment] = useState("");
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
  >([
    { type: GAME_PIECES_2025.CORAL, count: 0 },
    { type: GAME_PIECES_2025.ALGAE, count: 0 },
  ]);
  const [locationState, setLocationState] = useState<LOCATION_STATES>(
    LOCATION_STATES.ALLIANCE_ZONE,
  );
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
        : currentScreenIndex,
    );
  };

  const prevScreen = () => {
    typeof window !== "undefined" && window.scrollTo(0, 0);
    if (!screens[currentScreenIndex].canGoBack) return;
    setCurrentScreenIndex(
      currentScreenIndex > 0 ? currentScreenIndex - 1 : currentScreenIndex,
    );
  };

  const goToScreen = (screenName: string) => {
    const screenIndex = screens.findIndex(
      (screen) => screen.name === screenName,
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

  const { data: matchScheduleData, isLoading: isMatchScheduleLoading } =
    useQuery({
      enabled: !!eventCode,
      queryKey: [
        "matchSchedule",
        eventCode,
        eventType === "practice" ? "P" : "Q",
      ],
      queryFn: async (): Promise<MatchScheduleType[]> =>
        fetchMatchScheduleByYearAndEventCode(
          eventYear,
          eventName,
          !!eventType ? "Practice" : "Qualification",
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
        JSON.stringify(scouterDetails),
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
      }),
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
          locationState,
          setLocationState,
          actions,
          setActions,
          undoOccurred,
          setUndoOccurred,
          wasDefended,
          setWasDefended,
          isDefending,
          setIsDefending,
          fieldImages,
          matchState,
          setMatchState,
          isTimerRunning,
          setIsTimerRunning,
          setPreviousEndgameAction,
          previousEndgameAction,
          setEndGameAction: "", // Add this line
          eventType: eventType || "Qualification",
          eventCode,
          isMatchScheduleLoading,
          hasLeftStartingLine,
          setHasLeftStartingLine,
          isAutoStopped,
          setIsAutoStopped,
          isBrownedOut,
          setIsBrownedOut,
          comment,
          setComment,
          flashScoutLayout,
          setFlashScoutLayout,
          isShooting,
          setIsShooting,
          isFeeding,
          setIsFeeding,
        }}
      >
        <ScoutingInfoHeader />
        {/* {screens[currentScreenIndex].component} */}
        {screens[2].component}
      </ScoutDataContext.Provider>
    </ScoutScreenContext.Provider>
  );
};

export default ScoutPage;
