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

  const data = await getRobotImagesForTeams(teamNumbers);

  return Response.json({ data })
}
