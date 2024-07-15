import { BlurImage } from "@/components/blur-image";
import { fetchInterceptors } from "../interceptors/interceptors";
import { setCookie } from "nookies";

export default async function ItemPage() {
  let data = [];
  try {
    const resp = await fetch("https://picsum.photos/v2/list");
    data = await resp.json();
  } catch (e) {
    return <div>Error</div>;
  }

  console.log("[ ITEM PAGE RENDERS ]Item page ");

  setCookie(null, "fromServer", "value");

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {data.map((el: any, index: number) => (
          <BlurImage
            key={index}
            width={500}
            height={200}
            src={el.download_url}
            alt={index.toString()}
          />
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
