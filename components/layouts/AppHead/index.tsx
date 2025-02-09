"use client";
// next components
import Head from "next/head";
// interfaces and configs
import config from "@/app/utils/config";
import { HeadFunc } from "./interfaceType";

const AppHead: HeadFunc = ({
  title = config.SEO.title,
  image = config.SEO.image,
  description = config.SEO.description,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link
        sizes="180x180"
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        sizes="32x32"
        type="image/png"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        sizes="16x16"
        type="image/png"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      {/* <!-- Primary Meta Tags --> */}
      <meta name="title" content={title} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.URL.WEB} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={config.URL.WEB} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default AppHead;
