import { cookies } from "next/headers";
import Image from "next/image";


export default async function Page() {

    const cookiesStore = cookies();

    console.log(cookiesStore.get("menu-cook")?.value);
    
    const response = await fetch("https://dummyjson.com/products");

    if(!response.ok) {
        return <div>Something went wrong</div>
    }
    const data = await response.json();

    return (
        <div>
           <h1>MENU PAGE welcome</h1>
            <pre>
                {JSON.stringify(data,null,2)}
            </pre>
        </div>
    )
}