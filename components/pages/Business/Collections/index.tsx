"use client";
import React, { Fragment } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Divider, Typography } from "antd";
// app components
import CourseList from "./CourseList";
import LearningMenu from "../Courses/LearningMenu";
import Container from "@/components/shared/container";

const CollectionsPage = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Typography.Title level={2} className="mb-0">
            My Collections
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav>
        <Container className="container-fluid px-6">
          <LearningMenu activeKey="my-collections" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <Divider className="mb-0" />
          <CourseList />
        </Container>
      </section>
    </Fragment>
  );
};

export default CollectionsPage;
