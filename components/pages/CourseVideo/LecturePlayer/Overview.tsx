"use client";
import React from "react";
// ant components
import { Row, Col, Avatar, Typography, Divider } from "antd";
import {
  StarOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
// app components
import Container from "@/components/shared/container";

const Overview = ({ course }: any) => {
  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };
  return (
    <div className="p-4">
      <div>
        <Typography.Title level={2}>Overview</Typography.Title>
        <Typography.Paragraph>
          <CourseDescription content={course?.description} />
        </Typography.Paragraph>

        <div className="mt-8">
          <Typography.Title level={4} className="">
            About the instructor:
          </Typography.Title>
          {course?.instructors &&
            course?.instructors.length > 0 &&
            course?.instructors.map((instructor: any, index: number) => (
              <Row key={index} gutter={[16, 16]}>
                <Col lg={8}>
                  <div className="mb-4">
                    <Avatar
                      size={70}
                      src={instructor.image || <UserOutlined />}
                    />
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
        </div>
      </div>
    </div>
  );
};

export default Overview;
