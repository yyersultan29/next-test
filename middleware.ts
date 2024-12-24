// middleware.ts
import { NextRequest, NextResponse } from "next/server";

let isRequestSending = false;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!isRequestSending) {
    const resp = await fetch("https://picsum.photos/v2/list");
    isRequestSending = true;
    console.log("[ GET IMG LIST ]", resp.status);

    const data = await resp.json();
  }
  response.cookies.set("timer", "middleware", { maxAge: 5 * 24 * 60 * 60 });
  response.cookies.set("MAX-AGE-COOKIE", "some value", { maxAge: 5 });

  if(!response.cookies.has("lang")) {
    response.cookies.set("lang",'ru');
  }
  return response;
}

export const config = {
  matcher: ["/"],
};
