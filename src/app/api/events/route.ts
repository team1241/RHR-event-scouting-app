import { NextResponse } from "next/server";
import { DEV_CORS_HEADERS, isDev, PROD_CORS_HEADERS } from "~/app/api/constants";
import { getActiveSeason } from "~/db/queries/season";

export async function GET() {
  const activeSeason = await getActiveSeason()
  const eventsForActiveSeason = activeSeason?.events

  const resHeaders = isDev ? DEV_CORS_HEADERS : PROD_CORS_HEADERS

  return Response.json({ data: { events: eventsForActiveSeason, year: activeSeason?.year } }, { headers: resHeaders });
}
export async function OPTIONS() {
  const headers = {
    'Access-Control-Allow-Origin': isDev ? "http://localhost:5173" : "https://rebuilt.rhrscouting.ca",
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
  return new NextResponse(null, { status: 204, headers });
}