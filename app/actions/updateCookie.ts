import { cookies } from "next/headers";

export async function createThemeCookie() {
    "use server";
    cookies().set("name","REACT");
  }