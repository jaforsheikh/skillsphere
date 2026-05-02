import instructors from "@/data/instructors.json";

export async function GET() {
  return Response.json(instructors);
}