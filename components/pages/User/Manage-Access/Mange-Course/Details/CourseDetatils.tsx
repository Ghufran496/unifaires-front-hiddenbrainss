"use client";
import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import { Col, Row, Rate, Avatar, Typography, Breadcrumb } from "antd";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
// app components
import DetailsCard from "./DetailsCard";
import DetailsContent from "./DetailsContent";
import Container from "@/components/shared/container";
import { CourseInt } from "@/app/utils/interface";

interface PropsInt {
  course: CourseInt | undefined;
  courseProps: any;
}

const CourseDetails = ({ course, courseProps }: PropsInt) => {
  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };
  return (
    <Fragment>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <Typography.Title level={1} className="mt-4">
                {course?.title || courseProps?.name}
              </Typography.Title>
              <Typography.Paragraph className="mb-6 max-w-xl text-lg opacity-90">
                <CourseDescription
                  content={course?.description || courseProps?.description}
                />
              </Typography.Paragraph>
              <div className="flex gap-3 flex-wrap items-center mb-4">
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <ClockCircleOutlined className="" /> Bookmark
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <UsergroupAddOutlined type="secondary" />{" "}
                  {courseProps?.enrolled || 0} Enrolled
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <GlobalOutlined type="secondary" /> {course?.level}
                </Typography.Text>
                <div className="flex items-start gap-1 flex-nowrap">
                  <Rate
                    disabled
                    defaultValue={courseProps?.rating || 0}
                    className="[&>li]:mr-1"
                  />
                  <Typography.Text type="warning" className="pt-1">
                    {courseProps?.rating || 0}
                  </Typography.Text>
                  <Typography.Text className="pt-1">
                    ( 344 Reviews )
                  </Typography.Text>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <Avatar size={40} className="bg-purple-400">
                  SL
                </Avatar>
                {/* <NextLink href="/admin/users/" passHref> */}
                <Typography.Link className="text-base block text-grey-800 opacity-80">
                  {course?.organizationName || courseProps?.organizationName}{" "}
                </Typography.Link>
                {/* </NextLink> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="content-body">
        <Container fluid className="px-6">
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xxl={{ span: 18, order: 1 }}
            >
              <DetailsContent course={course} courseProps={courseProps} />
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              lg={{ span: 8, order: 2 }}
              xxl={{ span: 6, order: 2 }}
            >
              <DetailsCard />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseDetails;
