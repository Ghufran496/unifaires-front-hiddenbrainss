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
  BankOutlined,
} from "@ant-design/icons";
// app components
import DetailsCard from "./DetailsCard";
import DetailsContent from "./DetailsContent";
import Container from "@/components/shared/container";
import { CourseInt } from "@/app/utils/interface";

interface PropsInt {
  course: CourseInt | undefined;
  courseProps: any;
  userType: any;
}

const CourseDetails = ({ course, courseProps, userType }: PropsInt) => {
  const CourseDescription = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  // console.log("here is the rating", course);
  return (
    <Fragment>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6 bg-blue-100">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <Typography.Title level={1} className="mt-4">
                {course?.title || courseProps?.name}
              </Typography.Title>
              <Typography.Paragraph className="mb-6  text-lg opacity-90">
                <CourseDescription
                  content={course?.description || courseProps?.description}
                />
              </Typography.Paragraph>
              <div className="flex gap-3 flex-wrap items-center mb-4">
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <UsergroupAddOutlined type="secondary" />{" "}
                  {course?.students || 0} Enrolled
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap capitalize">
                  <GlobalOutlined type="secondary" /> {course?.level}
                </Typography.Text>
                <div className="flex items-center gap-1 flex-nowrap">
                  <Rate
                    disabled
                    value={course?.averageRating || 0}
                    className="[&>li]:mr-1"
                  />
                  {/* <Typography.Text type="warning" className="pt-1">
                    {course?.ratings || courseProps?.rating || 0}
                  </Typography.Text> */}
                  {course && (
                    <Typography.Text className="pt-1">
                      ( {course?.coursesreviews.length || 0} Reviews )
                    </Typography.Text>
                  )}
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                <BankOutlined className="text-xl text-blue-600 font-bold" />
                <Typography.Link className="text-base block text-grey-800 opacity-80">
                  {course?.organizationName}
                </Typography.Link>
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
              <DetailsCard userType={userType} course={course} />
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseDetails;
