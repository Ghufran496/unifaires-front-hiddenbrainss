"use client";
import React from "react";
// next components
// import NextLink from "next/link";
// antd components and icons
import { Card, Progress, Typography } from "antd";
import { RiseOutlined, BookOutlined } from "@ant-design/icons";

const JobStatsCard = () => {
  return (
    <Card className="rounded-lg overflow-hidden p-0 [&>div.ant-card-body]:p-0">
      <Card.Grid className="w-full xl:w-1/4 flex justify-between items-center p-3">
        <div className="">
          <Progress
            type="circle"
            width={80}
            percent={70}
            format={() => <BookOutlined />}
          />
        </div>
        <div className="">
          <Typography.Paragraph className="mb-0">
            Completion Rate
          </Typography.Paragraph>
          <Typography.Title
            level={2}
            className="text-green-500 flex gap-2 items-center my-0"
          >
            <RiseOutlined /> 23%
          </Typography.Title>
        </div>
      </Card.Grid>
      <Card.Grid className="w-2/4 xl:w-[15%] p-3">
        <Typography.Paragraph className="mb-0">
          Quiz Passed
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          450
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={68} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
      <Card.Grid className="w-2/4 xl:w-[15%] p-3">
        <Typography.Paragraph className="mb-0">
          Quiz Failed
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          40
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={4} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
      <Card.Grid className="w-2/4 xl:w-[15%] p-3">
        <Typography.Paragraph className="mb-0">
          Session Failed
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          4
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={28} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
      <Card.Grid className="w-2/4 xl:w-[15%] p-3">
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
      <Card.Grid className="w-full xl:w-[15%] p-3">
        <Typography.Paragraph className="mb-0">
          Assignment Overdue
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          0
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={0} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
    </Card>
  );
};

export default JobStatsCard;
