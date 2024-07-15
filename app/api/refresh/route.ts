import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const refreshToken = req.cookies.get('refreshToken') ;

  // Validate refresh token (dummy validation for example)

  const newAccessToken = "new-dummy-access-token";

  const response = NextResponse.json({ accessToken: newAccessToken });

  response.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 3600, // 1 hour
  });
  console.log("HELLO");

  return response;

  // return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
}
