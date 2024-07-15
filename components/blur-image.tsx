"use client";

import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";

export interface BlurImageProps extends ImageProps {
  zoomIn?: boolean;
}

export const BlurImage: FC<BlurImageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const { zoomIn, ...restProps } = props;
  return (
    <Image
      {...restProps}
      className={`w-full h-full object-cover ${
        zoomIn && "hover:scale-110"
      } transition-all duration-300 
            ${
              isLoading
                ? "scale-100.5 blur-xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            }
            `}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};
