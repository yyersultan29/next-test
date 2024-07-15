// for local images
export const getBase64 = async (imgPath: string) => {
  try {
    return "Hello ";
  } catch (error: unknown) {
    //error handling
    return "ssdd";
  }
};

// for remote images
function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function getFileBufferLocal(filepath: string) {
  // filepath is file addess exactly how is used in Image component (/ = public/)
  return "sd";
}

async function getFileBufferRemote(url: string) {
  return "";
}

function getFileBuffer(src: string) {
  return "";
}

// calls this function ,in the end
export async function getPlaceholderImage(filepath: string) {
  try {
    return "";
  } catch {
    return "";
  }
}

// for remote [chatgpt version]
export async function getBase64Image(url: string) {
  try {
    // Fetch the image from the URL
    return "";
  } catch (error) {
    return "";
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
  return "";
}

// static image blurData
export async function staticImgDataUrl(src: string) {
  return "";
}

// non lib solution

export function clearBase64(filePath: string) {
  return "";
}

export const generateBlurDataURL = async (imagePath: string) => {
  try {
    return "";
  } catch (error) {
    return "";
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
