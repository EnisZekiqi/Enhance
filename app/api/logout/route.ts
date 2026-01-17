import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Remove the auth cookie
  response.cookies.set("auth", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return response;
}
