import { callMatchCard } from "~/db/supabase";

export const dynamic = 'force-dynamic'

export async function GET() {

  const data = await callMatchCard()

  return Response.json({ data })
}