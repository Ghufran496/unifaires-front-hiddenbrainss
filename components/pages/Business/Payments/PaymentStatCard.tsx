"use client";
import React from "react";
// next components
// import NextLink from "next/link";
// antd components and icons
import { Card, Progress, Typography } from "antd";
import { RiseOutlined, BookOutlined } from "@ant-design/icons";

const PaymentStatCard = () => {
  return (
    <Card className="rounded-lg overflow-hidden p-0 [&>div.ant-card-body]:p-0">
      <Card.Grid className="text-center w-2/4 xl:w-[20%] p-3">
        <div className="">
          <Progress
            type="circle"
            width={80}
            percent={100}
            format={() => <BookOutlined />}
          />
        </div>
        <div className="">
          <Typography.Paragraph className="mb-0">
            Total Invoices
          </Typography.Paragraph>
          <Typography.Title
            level={2}
            className="flex gap-2 items-center justify-center my-0"
          >
            582
          </Typography.Title>
        </div>
      </Card.Grid>
      <Card.Grid className="w-full xl:w-1/4 flex justify-between items-center p-3">
        <div className="">
          <Progress
            type="circle"
            width={80}
            percent={80}
            format={() => <BookOutlined />}
          />
        </div>
        <div className="">
          <Typography.Paragraph className="mb-0">
            Total Revenue
          </Typography.Paragraph>
          <Typography.Title
            level={2}
            className="text-green-500 flex gap-2 items-center my-0"
          >
            <RiseOutlined /> 80%
          </Typography.Title>
        </div>
      </Card.Grid>
      <Card.Grid className="w-2/4 xl:w-[20%] p-3">
        <Typography.Paragraph className="mb-0">
          Failed Transactions
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          4
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={28} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
      <Card.Grid className="w-2/4 xl:w-[20%] p-3">
        <Typography.Paragraph className="mb-0">
          Session Not Started
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          5
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={50} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
    </Card>
  );
};

export default PaymentStatCard;
