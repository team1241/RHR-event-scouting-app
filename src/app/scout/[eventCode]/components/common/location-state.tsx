"use client";

import { useContext, useMemo } from "react";
import { LOCATION_STATES } from "~/app/scout/[eventCode]/constants";
import { ScoutDataContext } from "~/app/scout/[eventCode]/context";

export default function LocationState() {
  const { locationState } = useContext(ScoutDataContext);

  const locationText = useMemo(() => {
    switch (locationState) {
      case LOCATION_STATES.ALLIANCE_ZONE:
        return "In Alliance Zone";
      case LOCATION_STATES.NEUTRAL_ZONE:
        return "In Neutral Zone";
      case LOCATION_STATES.OPPONENT_ZONE:
        return "In Opponent Zone";
    }
  }, [locationState]);

  return <p className="min-w-fit text-2xl font-semibold">{locationText}</p>;
}
