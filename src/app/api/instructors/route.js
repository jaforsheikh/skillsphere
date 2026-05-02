import { NextResponse } from "next/server";
import instructors from "@/data/instructors.json";

export async function GET() {
  return NextResponse.json(instructors);
}