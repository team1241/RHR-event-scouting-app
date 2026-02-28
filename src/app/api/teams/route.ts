import { DEV_CORS_HEADERS, isDev, PROD_CORS_HEADERS } from "~/app/api/constants";
import { getTeamsForMatchInEvent } from "~/db/queries/match-schedule";

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const eventId = url.searchParams.get("eventId");
  const matchNumber = url.searchParams.get("matchNumber");

  if (!eventId) {
    return Response.json(
      { error: "eventId query parameter is required." },
      { status: 400 }
    );
  }

  if (!matchNumber) {
    return Response.json(
      { error: "matchNumber query parameter is required." },
      { status: 400 }
    );
  }

  const teams = await getTeamsForMatchInEvent({ eventId, matchNumber })

  const resHeaders = isDev ? DEV_CORS_HEADERS : PROD_CORS_HEADERS

  return Response.json({ data: { redAlliance: teams.filter(team => team.colour === 'red'), blueAlliance: teams.filter(team => team.colour === 'blue'), eventId: Number(eventId), matchNumber: `Q${matchNumber}` } }, { headers: resHeaders });
}