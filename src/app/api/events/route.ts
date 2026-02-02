import { DEV_CORS_HEADERS, isDev } from "~/app/api/constants";
import { getActiveSeason } from "~/db/queries/season";

export async function GET() {
  const activeSeason = await getActiveSeason()
  const eventsForActiveSeason = activeSeason?.events

  const resHeaders = isDev ? DEV_CORS_HEADERS : undefined

  return Response.json({ data: { events: eventsForActiveSeason, year: activeSeason?.year } }, { headers: resHeaders });
}