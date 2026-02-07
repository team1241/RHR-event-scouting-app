import { DEV_CORS_HEADERS, isDev, PROD_CORS_HEADERS } from "~/app/api/constants";
import { getTeamsAtEvent } from "~/db/queries/teams";

export async function GET(request: Request, { params }: { params: { eventCode: string } }) {
  const eventCode = params.eventCode

  const teams = await getTeamsAtEvent(eventCode)

  const resHeaders = isDev ? DEV_CORS_HEADERS : PROD_CORS_HEADERS

  return Response.json({ data: { teams: teams ?? [], eventCode } }, { headers: resHeaders });
}