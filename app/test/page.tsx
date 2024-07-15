"use client";

import { likes } from "@/utils";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    console.log(likes([]));
  }, []);
  return <div>tae ipsum!</div>;
}
