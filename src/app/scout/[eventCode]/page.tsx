"use client";

import React, { useEffect, useState } from "react";
import {
  ScoutDataContext,
  ScoutScreenContext,
} from "~/components/scout/context";
import {
  AlternateScoutData,
  ScoutAction,
  StartingPositionDataType,
} from "~/components/scout/context/data-context";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { getUserByClerkId } from "~/db/queries/user";
import { MatchScheduleType } from "~/server/http/frc-events";
import ScoutingInfoHeader from "~/components/scout/components/common/scouting-info-header";
import { FieldImages } from "@prisma/client";
import { getFieldImagesForActiveSeason } from "~/db/queries/field-images";
import {
  FIELD_ORIENTATIONS,
  GAME_PIECES,
  LOCAL_STORAGE_KEYS,
  MATCH_STATES,
  SCREENS,
} from "~/app/scout/[eventCode]/constants";
import { useParams, useSearchParams } from "next/navigation";

const ScoutPage = () => {
  const { eventCode } = useParams<{ eventCode: string }>();
  const eventType = useSearchParams().get("type");
  const [matchState, setMatchState] = useState<MATCH_STATES>(
    MATCH_STATES.PRE_START
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

  const localStorageKey = `${LOCAL_STORAGE_KEYS.MATCH_SCHEDULE}:${eventCode}:${
    eventType === "practice" ? "P" : "Q"
  }`;
  const [matchSchedule, setMatchSchedule] = useState<MatchScheduleType[]>(
    typeof window !== "undefined"
      ? (JSON.parse(
          localStorage.getItem(localStorageKey) ?? "[]"
        ) as MatchScheduleType[])
      : []
  );
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
    { type: GAME_PIECES.CORAL, count: 0 },
    { type: GAME_PIECES.ALGAE, count: 0 },
  ]);
  const [actions, setActions] = useState<ScoutAction[]>([]);
  const [alternateScoutData, setAlternateScoutData] =
    useState<AlternateScoutData>({
      scoring: { redMiss: 0, blueMiss: 0, redScore: 0, blueScore: 0 },
      setup: { redTeamNumber: 0, blueTeamNumber: 0 },
    });

  const nextScreen = () => {
    typeof window !== "undefined" && window.scrollTo(0, 0);
    setCurrentScreenIndex(
      currentScreenIndex < SCREENS.length - 1
        ? currentScreenIndex + 1
        : currentScreenIndex
    );
  };

  const prevScreen = () => {
    typeof window !== "undefined" && window.scrollTo(0, 0);
    if (!SCREENS[currentScreenIndex].canGoBack) return;
    setCurrentScreenIndex(
      currentScreenIndex > 0 ? currentScreenIndex - 1 : currentScreenIndex
    );
  };

  const goToScreen = (screenName: string) => {
    const screenIndex = SCREENS.findIndex(
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
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_SCREEN,
      JSON.stringify({
        currentScreenIndex,
        name: SCREENS[currentScreenIndex].name,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScreenIndex]);

  if (!userData) return <div>Loading...</div>;

  return (
    <ScoutScreenContext.Provider
      value={{
        screens: SCREENS,
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
        }}
      >
        <ScoutingInfoHeader />
        {SCREENS[currentScreenIndex].component}
      </ScoutDataContext.Provider>
    </ScoutScreenContext.Provider>
  );
};

export default ScoutPage;
