"use client";
import React from "react";
// next
import Image from "next/image";
// ants and icons
import { Row, Col, Carousel } from "antd";
import polygon from "@/public/images/Polygon2.svg";
import HeaderPic from "@/public/images/header_pic.png";
import HeaderPic2 from "@/public/images/header_pic2.png";
import Container from "@/components/shared/container";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <Carousel autoplay draggable={true}>
        <section className="lg:px-12 px-4 lg:pt-2 bg-purple-50 hero-section">
          <Container>
            <div className="flex gap-4">
              <div className="flex items-center lg:w-2/3 py-10 lg:py-0 ">
                <div className="flex flex-col gap-3">
                  <p className="text-base font-semibold text-left text-white uppercase">
                    A broad selection of solutions at your fingertips.
                  </p>

                  <h2 className="text-left md:text-5xl text-3xl font-bold md:leading-[3.5rem] leading-[2.5rem] text-white  ">
                    Educational and Career Resources all for you
                  </h2>

                  <p className="text-base font-light text-left text-white ">
                    Unifaires is an interesting platform that will teach more an
                    interactive way
                  </p>
                  <div className="flex flex-col lg:flex-row md:flex-row gap-2">
                    <Link href="/signup-individual">
                      <button className="btn-yellow">Join for free</button>
                    </Link>
                    <div className="flex gap-2 items-center">
                      <button className="flex items-center justify-center p-4 bg-white border-0 rounded-full">
                        <Image src={polygon} alt="icon" width={20} />
                      </button>
                      <p className="text-base font-light text-left text-white ">
                        Watch how it works
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <Image src={HeaderPic} alt="hero image" />
              </div>
            </div>
          </Container>
        </section>
        <section className="lg:px-12 px-4 lg:pt-2 bg-purple-50 hero-section">
          <Container>
            <div className="flex justify-between gap-4">
              <div className="flex items-center lg:w-2/3 py-10 lg:py-0 ">
                <div className="flex flex-col gap-3">
                  <p className="text-base font-semibold text-left text-white uppercase">
                    PATHWAY TO A DYNAMIC CAREER
                  </p>

                  <h2 className="text-left md:text-5xl text-3xl font-bold md:leading-[3.5rem] leading-[2.5rem] text-white  ">
                    With dynamic career paths, you can stay ahead of industry
                    shifts.
                  </h2>

                  <p className="text-base font-light text-left text-white ">
                    When your industry is continually changing, your response
                    time is the single most significant factor in staying ahead
                    of the competition.
                  </p>
                  <div className="flex flex-col lg:flex-row md:flex-row gap-2">
                    <Link href="/signup-individual">
                      <button className="btn-yellow">Join for free</button>
                    </Link>
                    <div className="flex gap-2 items-center">
                      <button className="flex items-center justify-center p-4 bg-white border-0 rounded-full">
                        <Image src={polygon} alt="icon" width={20} />
                      </button>
                      <p className="text-base font-light text-left text-white ">
                        Watch how it works
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex py-10 ">
                <div className="flex items-center justify-center w-[80%] relative">
                  <Image
                    src={HeaderPic2}
                    alt="hero image"
                    // width={470}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </Carousel>
    </div>
  );
};

export default HeroSection;
