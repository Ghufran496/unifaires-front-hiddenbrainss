"use client";
import React, { Fragment } from "react";
// ants and icons
import { Card, Rate, Progress, Typography } from "antd";
import {
  BankOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
// app components
import ImageComponent from "@/components/shared/image";
import LinkedIn from "@/public/linkedin.png";

import Image from "next/image";
import Link from "next/link";

const CourseCard = (props: any) => {
  return (
    <Fragment>
      <Link
        href={props.courseUrl || props.jobUrl || `/career/${props.id}`}
        passHref
        target={props.jobUrl ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        <Card
          className="h-full rounded-xl overflow-hidden [&>div.ant-card-body]:p-0"
          hoverable
        >
          <div className="rounded-xl aspect-[4/3] relative bg-grey-200">
            <ImageComponent
              layout="fill"
              src={
                props.organizationName == "LinkedIn"
                  ? LinkedIn
                  : props.mediaUrl ||
                    props.courseImgUrl ||
                    props.organizationLogo ||
                    JSON.parse(props.meta).image
              }
              // src={
              //   props.organizationLogo
              //     ? LinkedIn
              //     : props.mediaUrl || props.image_url
              // }
              alt="paris picture"
              objectFit="cover"
            />
          </div>
          <div className="relative p-4 -mt-5 bg-white rounded-xl">
            <Typography.Title ellipsis={{ rows: 2 }} level={5}>
              {props.name || props.position || props.title}
            </Typography.Title>
            <Typography.Paragraph
              ellipsis
              className="flex items-center gap-1 mb-1"
            >
              <BankOutlined className="text-purple-300 pr-2 font-semibold" />{" "}
              {props.company ? props.company : props.organizationName}
            </Typography.Paragraph>
            {props.location && (
              <Typography.Paragraph ellipsis={{ rows: 2 }}>
                <EnvironmentOutlined className="text-purple-300 pr-2 font-semibold" />
                {props.location}
              </Typography.Paragraph>
            )}
            {props.progress && (
              <>
                <div className="flex items-center gap-2">
                  <Typography.Text className="">Leave a rating</Typography.Text>
                  <Rate allowHalf className="[&>li]:mr-1" />
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    percent={40}
                    className="w-9/12"
                    format={(percent: any) => `${percent} Complete`}
                  />
                </div>
              </>
            )}

            {props.welcomeMessage !== undefined && (
              <div>
                <div className="flex flex-col items-start gap-1 mb-1">
                  <div>
                    <Rate
                      disabled
                      defaultValue={props.rating || 0}
                      className="[&>li]:mr-1"
                    />
                    <Typography.Text type="warning" className="pt-1">
                      {props.rating || "0"}
                    </Typography.Text>
                  </div>
                  <Typography.Text className="pt-1">
                    <span className="text-purple-600 font-semibold">
                      Enrolled:
                    </span>{" "}
                    ({props.enrolled || "0"})
                  </Typography.Text>
                </div>

                <div className="flex gap-2 mb-1">
                  <Typography.Text className="flex items-center gap-1">
                    <ClockCircleOutlined className="text-grey-400" />{" "}
                    {props.avgDuration || 0}
                  </Typography.Text>
                  <Typography.Text className="flex items-center gap-1">
                    <GlobalOutlined className="text-grey-400" /> Beginner
                  </Typography.Text>
                </div>

                {/* <Typography.Title level={5}>$500.00</Typography.Title> */}
                {/* <div className="flex items-center justify-between gap-2">
                        <div className="flex-grow">
                          <Tag className="rounded-full " color="processing">
                            Bestseller
                          </Tag>
                          <Tag className="rounded-full " color="processing">
                            Part-Time
                          </Tag>
                        </div>
                        <Button
                          type="text"
                          size="large"
                          shape="circle"
                          icon={<TagOutlined />}
                          className="flex-shrink-0"
                        />
                      </div> */}
              </div>
            )}
          </div>
        </Card>
      </Link>
    </Fragment>
  );
};

export default CourseCard;
