"use client";

import React, { useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "./context";
import { ScoutAction, StartingPositionDataType } from "./context/data-context";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { getUserByClerkId } from "~/db/queries/user";
import {
  fetchMatchScheduleByYearAndEventCode,
  MatchScheduleType,
} from "~/server/http/frc-events";
import { useParams } from "next/navigation";
import ScoutingInfoHeader from "~/app/scout/[eventCode]/components/scouting-info-header";
import { FieldImages } from "@prisma/client";
import { getFieldImagesForActiveSeason } from "~/db/queries/field-images";
import {
  FIELD_ORIENTATIONS,
  MATCH_STATES,
} from "~/app/scout/[eventCode]/constants";
// import FieldImage from "~/app/scout/[eventCode]/components/field-image";
// import { Button } from "~/components/ui/button";
import StartingPositionScreen from "./components/starting-position-screen";
// import ScoutActionButton from "~/app/scout/[eventCode]/components/scout-action-button";
// import {
//   ACTION_NAMES,
//   GAME_PIECES,
//   LOCATIONS,
// } from "~/app/scout/[eventCode]/constants";
// import UndoActionButton from "~/app/scout/[eventCode]/components/undo-action-button";

const ScoutPage = () => {
  const { eventCode } = useParams<{ eventCode: string }>();
  const eventYear = eventCode.substring(0, 4);
  const eventName = eventCode.substring(4);

  const SCREEN_NAMES = {
    MATCH_SELECTION: "match-selection",
    STARTING_POSITIONS: "starting-positions",
    AUTO: "auto",
    TELEOP: "teleop",
    ENDGAME: "endgame",
    FINALIZE: "finalize",
  };

  // TODO: Update the components of each screen to be the actual screen once the dev for it is completed
  const screens = [
    {
      component: <div>Match selection screen</div>,
      name: SCREEN_NAMES.MATCH_SELECTION,
      canGoBack: false,
    },
    {
      component: <div>Starting positions</div>,
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
  ];

  const [matchState, setMatchState] = useState<MATCH_STATES>(MATCH_STATES.AUTO);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAlternateScout, setIsAlternateScout] = useState(false);
  const [undoOccurred, setUndoOccurred] = useState(false);
  const [wasDefended, setWasDefended] = useState(false);
  const [matchSchedule, setMatchSchedule] = useState<MatchScheduleType[]>([]);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [matchNumber, setMatchNumber] = useState("");
  const [teamToScout, setTeamToScout] = useState<number | undefined>();
  const [allianceColour, setAllianceColour] = useState("blue");
  const [uiOrientation, setUiOrientation] = useState(
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

  const nextScreen = () => {
    window.scrollTo(0, 0);
    setCurrentScreenIndex(
      currentScreenIndex < screens.length - 1
        ? currentScreenIndex + 1
        : currentScreenIndex
    );
  };

  const prevScreen = () => {
    window.scrollTo(0, 0);
    if (!screens[currentScreenIndex].canGoBack) return;
    setCurrentScreenIndex(
      currentScreenIndex > 0 ? currentScreenIndex - 1 : currentScreenIndex
    );
  };

  const goToScreen = (screenName: string) => {
    const screenIndex = screens.findIndex(
      (screen) => screen.name === screenName
    );
    window.scrollTo(0, 0);
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
    queryKey: ["matchSchedule", eventCode],
    queryFn: async (): Promise<MatchScheduleType[]> =>
      fetchMatchScheduleByYearAndEventCode(eventYear, eventName),
  });

  const { data: fieldImages } = useQuery({
    queryKey: ["fieldImages"],
    queryFn: async (): Promise<FieldImages[]> =>
      getFieldImagesForActiveSeason(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (userData) {
      setScouterDetails({
        name: `${userData.firstName!} ${userData.lastName!}`,
        clerkId: userData.clerkId,
        id: userData.id.toString(),
      });
    }
  }, [userData]);

  useEffect(() => {
    if (matchScheduleData) {
      setMatchSchedule(matchScheduleData);
    }
  }, [matchScheduleData]);

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
          matchSchedule,
          setMatchSchedule,
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
        }}
      >
        <ScoutingInfoHeader />
        <StartingPositionScreen />
        {/* <FieldImage>
          <div className="flex flex-row justify-start gap-10">
            <Button onClick={() => console.log("clicked 1")}>Test 1</Button>
            <Button onClick={() => console.log("clicked 2")}>Test 2</Button>
            <Button onClick={() => console.log("clicked 3")}>Test 3</Button>
          </div>
        </FieldImage> */}
        {screens[currentScreenIndex].component}
        {/* <ScoutActionButton
          actionName={ACTION_NAMES.INTAKE}
          gamePiece={GAME_PIECES.CORAL}
          location={LOCATIONS.OPPONENT_HALF}
        />
        <UndoActionButton /> */}
      </ScoutDataContext.Provider>
    </ScoutScreenContext.Provider>
  );
};

export default ScoutPage;
