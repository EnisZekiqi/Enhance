import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "user_auth_db",
  user: "postgres",
  password: "5432",
});

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const result = await pool.query(
    "SELECT id, email FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );

  if (result.rows.length === 0) {
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
