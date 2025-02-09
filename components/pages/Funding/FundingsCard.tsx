"use client";

import React, { Fragment } from "react";
// ants and icons
import { Card, Typography } from "antd";
import { BankOutlined, EnvironmentOutlined } from "@ant-design/icons";
// app components
import ImageComponent from "@/components/shared/image";
// interface and props
import Link from "next/link";

const FundingsCard = (props: any) => {
  return (
    <Fragment>
      <Link href={`/funding/${props.slug}`} passHref rel="noopener noreferrer">
        <Card
          className="h-full w-full rounded-md overflow-hidden mb-1 [&>div.ant-card-body]:p-0"
          hoverable
        >
          <div className="flex flex-row w-full gap-2 p-2 ">
            <div className="flex justify-start items-start p-2 rounded-xl">
              <ImageComponent
                width={100}
                height={100}
                // layout="fill"
                src={props.mediaUrl || props.organizationLogo}
                alt="job image"
                objectPosition="center"
              />
            </div>
            <div className="p-2 lg:w-2/3 md:2/3 w-3/4 bg-white">
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                className="capitalize text-[14px] m-0 font-bold"
              >
                {props.position || props.title}
              </Typography.Paragraph>
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

export default FundingsCard;
