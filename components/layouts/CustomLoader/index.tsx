"use client";

import React from "react";
// import styles from "./CustomLoader.module.css"; // We'll define this CSS module next
import Image from "next/image";
import logo from "@/public/images/logo.png";

const CustomLoader = () => {
  return (
    <div className="fixed flex justify-center items-center w-full h-full bg-black top-0 z-[10000] transition ease-in-out">
      <div className="flex justify-center items-center animate-pulse">
        <Image
          src={logo}
          alt="unifairesLogo"
          width={178}
          height={52}
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default CustomLoader;
