import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    const xs = hasWindow ? window.innerWidth < 640 : false;
    const sm = hasWindow
      ? window.innerWidth >= 640 && window.innerWidth < 768
      : false;
    const md = hasWindow
      ? window.innerWidth >= 768 && window.innerWidth < 1024
      : false;
    const lg = hasWindow
      ? window.innerWidth >= 1024 && window.innerWidth < 1280
      : false;
    const xl = hasWindow
      ? window.innerWidth >= 1280 && window.innerWidth < 1536
      : false;
    const xxl = hasWindow ? window.innerWidth >= 1536 : false;

    return {
      xs,
      sm,
      md,
      lg,
      xl,
      xxl,
      width,
      height,
    } as const;
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export default useWindowDimensions;
