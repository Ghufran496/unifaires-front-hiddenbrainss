"use client";
import React, { Fragment } from "react";
// next
// import NextLink from "next/link";
// antd and Icon components
import { Row, Col, Typography } from "antd";
import ImageComponent from "@/components/shared/image";
import avater from "@/public/images/bg.png";
import { TbStarFilled } from "react-icons/tb";
import { BsAwardFill, BsPeopleFill, BsPlayCircleFill } from "react-icons/bs";

const AuthorCard = () => {
  return (
    <Fragment>
      <Typography.Title
        level={4}
        className="text-2xl font-bold leading-[28.8px]  "
      >
        About the instructor:
      </Typography.Title>
      <Row>
        <Col lg={30}>
          <div className="flex gap-[24px]">
            <div className="mb-4">
              <Typography.Title
                level={5}
                className="mb-[15px] text-[24px] font-bold leading-[28.8px] underline text-[#5832DA] "
              >
                Antalya Gaga
              </Typography.Title>
              <ImageComponent
                src={avater}
                width={166}
                height={182}
                alt={"profilePicture"}
                className="rounded-[100%]"
              />
            </div>
            <div className="mt-[84px] font-medium text-base leading-[30.56px]">
              <Typography.Paragraph className="flex items-center gap-[25px] flex-nowrap mb-1">
                <TbStarFilled /> <span className="text-[#5832DA]">(4.87)</span>{" "}
                Instructor rating
              </Typography.Paragraph>
              <Typography.Paragraph className="flex items-center gap-[25px] flex-nowrap mb-1">
                <BsAwardFill />
                <span className="text-[#5832DA]">(11)</span> reviews
              </Typography.Paragraph>
              <Typography.Paragraph className="flex items-center gap-[25px] flex-nowrap mb-1">
                <BsPeopleFill /> <span className="text-[#5832DA]">(420)</span>
                students
              </Typography.Paragraph>
              <Typography.Paragraph className="flex items-center gap-[25px] flex-nowrap mb-1">
                <BsPlayCircleFill /> <span className="text-[#5832DA]">(2)</span>{" "}
                courses
              </Typography.Paragraph>
            </div>
          </div>
        </Col>
        <Col lg={16}></Col>
      </Row>
      <Typography.Paragraph className="leading-6">
        I am a Software Engineer and have been coding for 9 years. I have built
        many 2D and 3D games using most powerful game engines like Unity3D,
        SDL2, Libgdx. I am a master of coding in Android, C++, Java, Javascript,
        Phyton and scripting languages which are used for designing Webpages
        like HTML5, Javascript and PHP. I love to teach newbies and also the
        professionals. I always try to teach something new and in-demand topics
        to my students. I teach with passion and purpose! Every course is
        delivered with my students in mind. I found that Unifares is helping
        those who want to learn so that’s why am here.
      </Typography.Paragraph>
    </Fragment>
  );
};

export default AuthorCard;
