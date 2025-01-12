"use client";

import React, { useEffect, useState } from "react";
import { ScoutDataContext, ScoutScreenContext } from "./context";
import { ScoutAction } from "./context/data-context";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { getUserByClerkId } from "~/db/queries/user";
import {
  fetchMatchScheduleByYearAndEventCode,
  MatchScheduleType,
} from "~/server/http/frc-events";
import { useParams } from "next/navigation";

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
      component: <div>Match selection</div>,
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

  const [matchSchedule, setMatchSchedule] = useState<MatchScheduleType[]>([]);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [matchNumber, setMatchNumber] = useState("");
  const [teamToScout, setTeamToScout] = useState<number | undefined>();
  const [allianceColour, setAllianceColour] = useState("");
  const [uiOrientation, setUiOrientation] = useState("default");
  const [scouterDetails, setScouterDetails] = useState({
    name: "",
    clerkId: "",
    id: "",
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

  useEffect(() => {
    if (userData) {
      setScouterDetails({
        name: `${userData.firstName!} ${userData.lastName!}`,
        clerkId: userData.clerkId,
        id: userData.clerkId,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (matchScheduleData) {
      setMatchSchedule(matchScheduleData);
    }
  }, [matchScheduleData]);

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
          gamePieceState,
          setGamePieceState,
          actions,
          setActions,
        }}
      >
        {screens[currentScreenIndex].component}
      </ScoutDataContext.Provider>
    </ScoutScreenContext.Provider>
  );
};

export default ScoutPage;
