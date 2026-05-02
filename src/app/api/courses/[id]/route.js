import { NextResponse } from "next/server";
import courses from "@/data/courses.json";

export async function GET(request, context) {
  const params = await context.params;
  const id = params.id;
  const course = courses.find((item) => {
    return (
      String(item.id) === String(id) ||
      String(item._id) === String(id) ||
      String(item.slug) === String(id)
    );
  });
  if (!course) {
    return NextResponse.json(
      {
        success: false,
        message: "Course not found",
        requestedId: id,
        availableIds: courses.map((item) => item.id),
      },
      { status: 404 }
    );
  }
  return NextResponse.json(course);
}