"use client";
import React, { Fragment } from "react";
//
import NextLink from "next/link";
// ants and icons
import { Tag, Card, Rate, Button, Progress, Typography } from "antd";
import {
  TagOutlined,
  BankOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
// app components
import ImageComponent from "@/components/shared/image";
// interface and props
import { UserInt } from "@/app/utils/interface";
// icons and images
import UserImage from "@/public/images/avatar/user-1.png";

export interface TalentProfileCardProps extends UserInt {}

const TalentProfileCard = () => {
  return (
    <Fragment>
      <Card
        className="rounded-xl relative overflow-hidden [&>div.ant-card-body]:p-0"
        hoverable
      >
        <div className="rounded-xl aspect-[4/3] relative bg-grey-200">
          <ImageComponent
            layout="fill"
            src={UserImage}
            alt="paris picture"
            objectFit="cover"
          />
        </div>
        <NextLink href="/admin/talent-program/profiles/1" passHref>
          <Typography.Link className="stretched-link">
            <div className="relative p-4 -mt-5 bg-white rounded-xl">
              <Typography.Title ellipsis={{ rows: 2 }} level={5}>
                Corporate Counsel, Intellectual Property gilead Sciences
              </Typography.Title>
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                className="flex items-center gap-1 mb-1"
              >
                Corporate Counsel, Intellectual Property gilead Sciences
              </Typography.Paragraph>
            </div>
          </Typography.Link>
        </NextLink>
      </Card>
    </Fragment>
  );
};

export default TalentProfileCard;
