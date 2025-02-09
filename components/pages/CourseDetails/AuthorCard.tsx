"use client ";
import React, { Fragment } from "react";
// next
// import NextLink from "next/link";
// antd and Icon components
import { Row, Col, Avatar, Typography, Divider } from "antd";
import {
  StarOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { InstructorsInt } from "../Business/Courses/course.interface";

const AuthorCard = ({ course }: any) => {
  return (
    <Fragment>
      <Typography.Title level={4} className="">
        About the instructor:
      </Typography.Title>
      {course?.instructors &&
        course?.instructors.length > 0 &&
        course?.instructors.map((instructor: InstructorsInt, index: number) => (
          <Row key={index} gutter={[16, 16]}>
            <Col lg={8}>
              <div className="mb-4">
                <Avatar size={70} src={instructor.image || <UserOutlined />} />
              </div>
              {/* <div className="mb-6">
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
                         </div> */}
            </Col>
            <Col lg={16}>
              <Typography.Title level={4} className="mb-1">
                {instructor.name}
              </Typography.Title>

              <Typography.Paragraph className="leading-6">
                {instructor.bio}
              </Typography.Paragraph>
            </Col>
            <Divider />
          </Row>
        ))}
    </Fragment>
  );
};

export default AuthorCard;
