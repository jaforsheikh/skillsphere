import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
export const runtime = "nodejs";
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image file found" },
        { status: 400 }
      );
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPG, PNG, and WEBP images are allowed",
        },
        { status: 400 }
      );
    }
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image size must be less than 2MB",
        },
        { status: 400 }
      );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const extension = file.name.split(".").pop();
    const fileName = `${randomUUID()}.${extension}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
      },
      { status: 500 }
    );
  }
}