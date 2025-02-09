"use client";
import React, { useContext } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import { Avatar, Card, Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FundingContext } from "../Create/FundingContext";
// app components

const DetailsCard = () => {
  const { fundingData, fetchFundingData } = useContext(FundingContext);

  const contactInfo = JSON.parse(fundingData.data.contact);

  return (
    <Card className="lg:-mt-40 shadow-sm sticky mb-6 top-0">
      <Typography.Title level={5} className="mb-3">
        Contact the Jobs Poster
      </Typography.Title>
      <div className="mb-4 flex gap-4">
        <Avatar size={48} className="bg-purple-400">
          <UserOutlined />
        </Avatar>
        <div className="">
          <Typography.Title level={5} className="mb-0">
            {contactInfo[0].firstname} {contactInfo[0].lastname}
          </Typography.Title>
          <NextLink href={"mailto:sarah.lewis@gmail.com"} passHref>
            <Typography.Link className="">
              {contactInfo[0].email}
            </Typography.Link>
          </NextLink>
        </div>
      </div>
      {/* <div className="mb-6">
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
          <StarOutlined />
          Munich University of Applied Sciences
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
          <CommentOutlined /> +23 56794 54694
        </Typography.Paragraph>
        <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
          <UsergroupAddOutlined /> Stormstreet 17 Munich, Germany
        </Typography.Paragraph>
      </div> */}

      <div className="flex flex-col gap-4 mt-6">
        <Button block type="primary" size="large">
          Apply Now
        </Button>
        <Button block type="default" size="large">
          Save for later
        </Button>
      </div>
    </Card>
  );
};

export default DetailsCard;
