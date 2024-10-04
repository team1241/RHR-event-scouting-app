"use server";

import axios from "axios";

const authorizationCredential = btoa(
  `${process.env.FRC_EVENTS_USERNAME}:${process.env.FRC_EVENTS_API_TOKEN}`
);

const FrcEventsInstance = axios.create({
  baseURL: "https://frc-api.firstinspires.org/v3.0",
  timeout: 5000,
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

export default FrcEventsInstance;
