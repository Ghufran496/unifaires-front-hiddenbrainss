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

const CourseDetails = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container fluid className="p-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/admin/courses">Published Courses</NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Course details</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <Typography.Title level={1}>
                Complete Python Bootcamp: Go from zero to hero in Python 3
              </Typography.Title>
              <Typography.Paragraph className="mb-6 max-w-xl text-lg opacity-90">
                JavaScript is the popular programming language which powers web
                pages and web applications. This course will get you started
                coding in JavaScript.
              </Typography.Paragraph>
              <div className="flex gap-3 flex-wrap items-center mb-4">
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <ClockCircleOutlined className="" /> Bookmark
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <UsergroupAddOutlined type="secondary" /> 122 Enrolled
                </Typography.Text>
                <Typography.Text className="flex items-center gap-1 flex-nowrap">
                  <GlobalOutlined type="secondary" /> Beginner
                </Typography.Text>
                <div className="flex items-start gap-1 flex-nowrap">
                  <Rate disabled defaultValue={4} className="[&>li]:mr-1" />
                  <Typography.Text type="warning" className="pt-1">
                    4.5
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
                <NextLink href="/admin/users/" passHref>
                  <Typography.Link className="text-base block text-grey-800 opacity-80">
                    Sarah Lewis (Course Author), Munich Unity Of Applied
                    Sciences, Munich
                  </Typography.Link>
                </NextLink>
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
              <DetailsContent />
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
