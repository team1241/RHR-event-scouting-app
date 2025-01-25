"use server";

import axios from "axios";

const authorizationCredential = btoa(
  `${process.env.FRC_EVENTS_USERNAME}:${process.env.FRC_EVENTS_API_TOKEN}`
);

const FrcEventsInstance = axios.create({
  baseURL: "https://frc-api.firstinspires.org/v3.0",
  // timeout: 5000,
  headers: {
    Authorization: `Basic ${authorizationCredential}`,
  },
});

export async function fetchSeasonInfoByYear(year: string) {
  const result = await FrcEventsInstance.get(`/${year}`);
  return result.data;
}

export async function fetchDistrictsByYear(year: string) {
  type DistrictsListType = {
    districts: { code: string; name: string }[];
    districtCount: number;
  };
  const { data: districts } = await FrcEventsInstance.get<DistrictsListType>(
    `/${year}/districts`
  );
  return districts;
}

export async function fetchEventByYearAndCode(year: string, eventCode: string) {
  const { data: eventData } = await FrcEventsInstance.get(
    `/${year}/events?eventCode=${eventCode}`
  );
  return eventData.Events[0];
}

export async function fetchMatchScheduleByYearAndEventCode(
  year: string,
  eventCode: string,
  scheduleType: "Practice" | "Qualification" | "Playoff" = "Qualification"
) {
  const { data: matchScheduleData } = await FrcEventsInstance.get(
    `/${year}/schedule/${eventCode}?tournamentLevel=${scheduleType}`
  );
  return matchScheduleData.Schedule;
}

export type MatchScheduleTeamType = {
  station: string;
  surrogate: boolean;
  teamNumber: number;
};

export type MatchScheduleType = {
  description: string;
  matchNumber: number;
  field: string;
  startTime: string;
  tournamentLevel: string;
  teams: MatchScheduleTeamType[];
};

export default FrcEventsInstance;
