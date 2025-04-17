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

const fetchFrcEvents = async (
  url: string,
  method: string,
  cache?:
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached"
) =>
  fetch(`https://frc-api.firstinspires.org/v3.0${url}`, {
    method,
    headers: {
      Authorization: `Basic ${authorizationCredential}`,
    },
    cache,
    next: {
      revalidate: 60 * 10, // 10 minutes
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
  // const { data: eventData } = await FrcEventsInstance.get(
  //   `/${year}/events?eventCode=${eventCode}`
  // );

  const response = await fetchFrcEvents(
    `/${year}/events?eventCode=${eventCode}`,
    "GET"
  );

  const eventData = await response.json();
  return eventData.Events[0];
}

export async function fetchMatchScheduleByYearAndEventCode(
  year: string,
  eventCode: string,
  scheduleType: "Practice" | "Qualification" | "Playoff" = "Qualification"
) {
  const response = await fetchFrcEvents(
    `/${year}/schedule/${eventCode}?tournamentLevel=${scheduleType}`,
    "GET"
  );

  const matchScheduleData = await response.json();
  return matchScheduleData.Schedule;
}

export async function fetchTeamsForEvent(
  year: string,
  eventCode: string
): Promise<TeamType[]> {
  const response = await fetchFrcEvents(
    `/${year}/teams/?eventCode=${eventCode}`,
    "GET"
  );

  const teamData = await response.json();
  const allTeams = [...teamData.teams];

  const hasMultiplePages = teamData.pageTotal > 1;

  if (hasMultiplePages) {
    const totalPages = teamData.pageTotal;
    for (let i = 2; i <= totalPages; i++) {
      const response = await fetchFrcEvents(
        `/${year}/teams/?eventCode=${eventCode}&page=${i}`,
        "GET"
      );
      const teamData = await response.json();
      teamData.teams.forEach((team) => {
        allTeams.push(team);
      });
    }
  }

  return allTeams;
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

export type TeamType = {
  schoolName: string;
  website: string;
  homeCMP: string;
  teamNumber: number;
  nameFull: string;
  nameShort: string;
  city: string;
  stateProv: string;
  country: string;
  rookieYear: number;
  robotName: string;
  districtCode: string;
};

export type TeamTypeWithImages = {
  schoolName: string;
  website: string;
  homeCMP: string;
  teamNumber: number;
  nameFull: string;
  nameShort: string;
  city: string;
  stateProv: string;
  country: string;
  rookieYear: number;
  robotName: string;
  districtCode: string;
  fieldImages?: string[];
};

export default FrcEventsInstance;
