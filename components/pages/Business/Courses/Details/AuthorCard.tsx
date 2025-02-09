"use client";
import React, { Fragment } from "react";
// next
// import NextLink from "next/link";
// antd and Icon components
import { Row, Col, Avatar, Typography } from "antd";
import {
  StarOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const AuthorCard = () => {
  return (
    <Fragment>
      <Typography.Title level={4} className="">
        About the instructor:
      </Typography.Title>
      <Row>
        <Col lg={8}>
          <div className="mb-4">
            <Avatar size={48} className="bg-purple-400">
              JB
            </Avatar>
          </div>
          <div className="mb-6">
            <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
              <StarOutlined /> 4.87 Instructor rating
            </Typography.Paragraph>
            <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
              <CommentOutlined /> 1,533 reviews
            </Typography.Paragraph>
            <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
              <UsergroupAddOutlined /> 23,912 students
            </Typography.Paragraph>
            <Typography.Paragraph className="flex items-center gap-2 flex-nowrap mb-1">
              <PlayCircleOutlined /> 29 courses
            </Typography.Paragraph>
          </div>
        </Col>
        <Col lg={16}>
          <Typography.Title level={4} className="mb-1">
            Antalya Gaga
          </Typography.Title>
          <Typography.Title level={5} type="secondary" className="mt-0">
            Head of Data Science, Pierian Data Inc.
          </Typography.Title>
          <Typography.Paragraph className="leading-6">
            Antalya Gaga has a BS and MS in Mechanical Engineering from Santa
            Clara University and years of experience as a professional
            instructor and trainer for Data Science and programming. She has
            publications and patents in various fields such as micro-fluidics,
            materials science, and data science technologies.
          </Typography.Paragraph>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AuthorCard;
