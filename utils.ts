import path from "path";
import sharp from "sharp";
import fs from "node:fs/promises";
import fileSystem from "node:fs";

import { getPlaiceholder } from "plaiceholder";

// for local images
export const getBase64 = async (imgPath: string) => {
  try {
    const file = await fs.readFile(`public/${imgPath}`);
    const { base64 } = await getPlaiceholder(file);
    return base64;
  } catch (error: unknown) {
    //error handling
    if (error instanceof Error) return error.message;
    else if (error && typeof error === "object" && "message" in error)
      return error.message as string;
    else if (typeof error === "string") return error;
    else return "Unexpected error!";
  }
};

// for remote images
function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getFileBufferLocal(filepath: string) {
  // filepath is file addess exactly how is used in Image component (/ = public/)
  const realFilepath = path.join(process.cwd(), "public", filepath);
  return fs.readFile(realFilepath);
}

async function getFileBufferRemote(url: string) {
  const response = await fetch(url);
  return Buffer.from(await response.arrayBuffer());
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith("http");
  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src);
}

// calls this function ,in the end
export async function getPlaceholderImage(filepath: string) {
  try {
    const originalBuffer = await getFileBuffer(filepath);
    const resizedBuffer = await sharp(originalBuffer).resize(20).toBuffer();
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer),
    };
  } catch {
    return {
      src: filepath,
      placeholder:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==",
    };
  }
}

// for remote [chatgpt version]
export async function getBase64Image(url: string) {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resize the image to a smaller size and convert it to a base64 string
    const resizedBuffer = await sharp(buffer)
      .resize(10) // Resize to a very small size for blur effect
      .toBuffer();

    const base64String = resizedBuffer.toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  } catch (error) {
    console.error("Error fetching or processing image:", error);
    throw error;
  }
}

//  custom promise all

export function promiseAll<T>(promiseArray: Array<Promise<T>>) {
  const arr: T[] = [];
  let count = 0;
  return new Promise((resolve, rej) => {
    for (let i = 0; i < promiseArray.length; i++) {
      promiseArray[i]
        .then((res) => {
          arr.push(res);
          count = count + 1;
          if (count === promiseArray.length) {
            resolve(arr);
          }
        })
        .catch(() => rej("rejected"));
    }
  });
}

const p1 = new Promise((res) => res("promise 1"));
const p2 = new Promise((res) => res("promise 2"));

export async function getImage(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
}

// static image blurData
export async function staticImgDataUrl(src: string) {
  const buffer = await fs.readFile(`./public${src}`);
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}

// non lib solution

export function clearBase64(filePath: string) {
  const imageBuffer = fileSystem.readFileSync(`./public${filePath}`);
  const base64Image = imageBuffer.toString("base64");
  return `data:image/jpeg;base64,${base64Image}`;
}

export const generateBlurDataURL = async (imagePath: string) => {
  try {
    const image = await sharp(imagePath)
      .resize(10, 10) // Resize to a small thumbnail
      .blur(5) // Apply blur
      .toBuffer();

    const base64Image = image.toString("base64");
    const blurDataURL = `data:image/jpeg;base64,${base64Image}`;
    return blurDataURL;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
  }
};

export const likes = (list: string[]): string => {
  if (!list.length) return "no one likes this";
  if (list.length === 1) return `${list[0]} likes this`;
  if (list.length === 2) return `${list[1]} and ${list[0]} likes this`;

  return `${list[0]}, ${list[1]} and ${
    list.length - 2 > 1 ? `${list.length - 2} others ` : list[3]
  } likes this`;
};
