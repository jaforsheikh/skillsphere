import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, user: null },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectDB();

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return Response.json(
        { success: false, user: null },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    return Response.json(
      { success: false, user: null },
      { status: 401 }
    );
  }
}