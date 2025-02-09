"use client";
import React, { Fragment } from "react";
// antd components
import { Divider, Typography } from "antd";
// app components
import CourseList from "./CourseList";
import Container from "@/components/shared/container";
import LearningMenu from "../Learning/LearningMenu";

const ToolsPage = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            My Wishlist
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <LearningMenu activeKey="wishlist" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <Divider className="mb-0" />
          <CourseList />
        </Container>
      </section>
    </Fragment>
  );
};

export default ToolsPage;
