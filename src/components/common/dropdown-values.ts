import { Team } from "@prisma/client";

export const GRADE_OPTIONS = [
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "Mentor", value: "mentor" },
];

export const ROLE_OPTIONS = [
  { label: "Admin", value: "Admin" },
  { label: "Scout", value: "Scout" },
];

export const TEAM_OPTIONS = [
  { label: "781 - KINETIC KNIGHTS", value: Team.KNIGHTS },
  { label: "1241 - THEORY6", value: Team.THEORY },
  { label: "1285 - THE BIGGEST BIRDS", value: Team.BIRDS },
  { label: "2200 - BCR BLACKOUT", value: Team.BLACKOUT },
  { label: "2706 - MERGE ROBOTICS", value: Team.MERGE },
  { label: "4907 - THUNDERSTAMPS", value: Team.THUNDERSTAMPS },
  { label: "7902 - FIREBIRDS", value: Team.FIREBIRDS },
];
