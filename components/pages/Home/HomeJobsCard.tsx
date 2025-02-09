"use client";
import React, { Fragment } from "react";
// ants and icons
import { Card, Typography } from "antd";
import { BankOutlined, EnvironmentOutlined } from "@ant-design/icons";
// app components
import ImageComponent from "@/components/shared/image";
// interface and props
import Link from "next/link";

const HomeJobsCard = (props: any) => {
  return (
    <Fragment>
      <Link href={`/career/${props.slug}`} passHref>
        <Card
          className="h-full lg:w-[230px] md:w-[230px] w-full rounded-xl overflow-hidden [&>div.ant-card-body]:p-0"
          hoverable
        >
          <div className="flex lg:flex-col md:flex-col flex-row">
            <div className="flex lg:justify-center md:justify-center justify-start lg:items-center md:items-center items-start p-2 rounded-t-xl aspect-[4/3] relative lg:bg-grey-200 md:bg-gray-200 bg-none ">
              <ImageComponent
                width={100}
                height={100}
                className="relative lg:w-full md:w-full"
                src={props.mediaUrl || props.organizationLogo}
                alt="job image"
                objectPosition="center"
              />
            </div>
            <div className="relative p-4 bg-white rounded-xl lg:w-full md:w-full w-3/4">
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                {props.position || props.title}
              </Typography.Title>
              <Typography.Paragraph
                ellipsis
                className="flex items-center gap-1 mb-1"
              >
                <BankOutlined className="text-purple-300 pr-2 font-semibold" />{" "}
                {props.company ? props.company : props.organizationName}
              </Typography.Paragraph>
              <Typography.Paragraph ellipsis={{ rows: 2 }}>
                <EnvironmentOutlined className="text-purple-300 pr-2 font-semibold" />
                {`${props.location || `${props.state}, ${props.country}`}`}
              </Typography.Paragraph>
            </div>
          </div>
        </Card>
      </Link>
    </Fragment>
  );
};

export default HomeJobsCard;
