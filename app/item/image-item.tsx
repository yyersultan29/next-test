import { getImage } from "@/utils";
import Image from "next/image"
import { getPlaiceholder } from "plaiceholder";
const sharp = require('sharp');

export const ImageItem = async ({el}: {el:any}) => {
    
  const {img,base64}  = await getImage(el.download_url);


    return (
        <div key={el.id} >
                        <div>{el.author}</div>
                        <div style={{width: "200px",height:"200px"}}>
                            <Image 
                              {...img}
                              placeholder="blur"
                              blurDataURL={base64}
                              alt={el.author}  
                   
                            />
                        </div>
                        
                    </div>
    )   
}




// works 

export async function dynamicBlurDataUrl(url: string) {

    const base64str = await fetch(
      `http://localhost:3000/_next/image?url=${url}&w=16&q=75`
    ).then(async (res) =>
      Buffer.from(await res.arrayBuffer()).toString('base64')
    );
  
    const blurSvg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
        <filter id='b' color-interpolation-filters='sRGB'>
          <feGaussianBlur stdDeviation='1' />
        </filter>
  
        <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
        href='data:image/avif;base64,${base64str}' />
      </svg>
    `;
  
    const toBase64 = (str:string) =>
      typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);
  
    return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
  }


