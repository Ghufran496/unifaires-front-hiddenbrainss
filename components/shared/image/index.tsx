"use client";
import React from "react";
import Image, { ImageProps } from "next/image";

interface ImageComponentProps extends ImageProps {
  fallback?: string;
  debug?: string;
  alt: string;
}

const ImageComponent = (props: ImageComponentProps) => {
  const [loading, setLoading] = React.useState(true);
  const [onErrorSrc, setOnErrorSrc] = React.useState<string | undefined>(
    undefined
  );

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallback = "/images/state/failed.svg"
  ) => {
    console.error("Image Error:", e);
    e?.currentTarget?.src !== fallback && setOnErrorSrc(fallback);
  };

  console.log("Resolved Image Source:", props.src);

  return (
    <Image
      {...props}
      alt={props.alt}
      src={
        !props.src
          ? "/images/state/failed.svg"
          : loading
          ? "/images/state/double-ring.svg"
          : onErrorSrc || props.src
      }
      onError={(e) => handleImageError(e, props.fallback)}
      onLoadingComplete={() => {
        console.log("Image Loaded");
        !props.debug && setLoading(false);
      }}
    />
  );
};

export default ImageComponent;
