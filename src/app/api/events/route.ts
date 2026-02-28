import { DEV_CORS_HEADERS, isDev, PROD_CORS_HEADERS } from "~/app/api/constants";
import { getActiveSeason } from "~/db/queries/season";

export const dynamic = 'force-dynamic'

export async function GET() {
  const activeSeason = await getActiveSeason()
  const eventsForActiveSeason = activeSeason?.events

  const resHeaders = isDev ? DEV_CORS_HEADERS : PROD_CORS_HEADERS

  return Response.json({ data: { events: eventsForActiveSeason, year: activeSeason?.year } }, { headers: resHeaders });
}