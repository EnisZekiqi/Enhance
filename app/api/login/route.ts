import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("http://localhost:3002/inventory/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("auth", "true", {
    httpOnly: true,
    path: "/",
  });

  return response;
}
