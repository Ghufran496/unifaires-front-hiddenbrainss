"use client";
import React, { Fragment } from "react";
// next components
// antd components
import { Breadcrumb, Typography } from "antd";
// app components
import Container from "@/components/shared/container";
import CreateCourseForm from "./CreateCourseForm";
// import { CourseContext } from "../CourseContext";

const CourseCreationDetails = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb
            items={[
              {
                title: "Published Courses",
                href: "/user/business-access/course",
              },
              { title: "Create Course" },
            ]}
          />
        </Container>
      </section>
      <section className="content-hero">
        <Container className="container-fluid p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Add New Course
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Just fill the form and create your courses.
              </Typography.Paragraph>
            </div>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="container-fluid px-6 pb-6">
          {/* <Divider  /> */}
          <CreateCourseForm />
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseCreationDetails;
