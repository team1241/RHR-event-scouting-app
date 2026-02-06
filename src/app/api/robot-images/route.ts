import { NextResponse } from "next/server";
import { DEV_CORS_HEADERS, isDev, PROD_CORS_HEADERS } from "~/app/api/constants";
import { getRobotImagesForTeams } from "~/db/queries/robot-images";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const teamNumbersRaw = url.searchParams.getAll("teamNumbers");
  const teamNumbers = teamNumbersRaw
    .flatMap((value) => value.split(","))
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isFinite(value));

  if (teamNumbers.length === 0) {
    return Response.json(
      { error: "teamNumbers query parameter is required." },
      { status: 400 }
    );
  }

  const resHeaders = isDev ? DEV_CORS_HEADERS : PROD_CORS_HEADERS


  const data = await getRobotImagesForTeams(teamNumbers);

  return Response.json({ data }, { headers: resHeaders })
}

export async function OPTIONS() {
  const headers = {
    'Access-Control-Allow-Origin': isDev ? "http://localhost:5173" : "https://rebuilt.rhrscouting.ca",
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  return new NextResponse(null, { status: 204, headers });
}