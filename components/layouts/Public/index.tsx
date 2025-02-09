"use client";
import Footer from "../Footer";
import Header from "../Header";
import AppHead from "../AppHead";

// props and interface
import { PublicLayoutProps } from "./interfaceType";

const PublicLayout = ({
  title,
  image,
  children,
  description,
}: PublicLayoutProps) => {
  return (
    <>
      <AppHead title={title} image={image} description={description} />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
