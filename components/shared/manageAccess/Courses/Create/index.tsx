"use client";
import React, { Fragment } from "react";
// next component
// antd components
import { Row, Col, Typography, Breadcrumb } from "antd";
import {
  PlayCircleOutlined,
  BookOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
// app component
import Container from "@/components/shared/container";
import DashboardMenuCard, {
  DashboardMenuCardPops,
} from "@/components/pages/Business/Dashboard/DashboardMenuCard";
const CreateCourse = () => {
  const businessDashboardMenuItems: DashboardMenuCardPops[] = [
    {
      link: "/business/courses/withvideos",
      title: "Courses with Video Lectures",
      icon: <PlayCircleOutlined />,
      description: (
        <Typography.Paragraph>
          Create rich learning experiences with the help of video lectures,
          quizzes, coding, exercises, etc.
        </Typography.Paragraph>
      ),
    },
    // {
    //   // link: "/business/courses/mentorship",
    //   link: "#",
    //   title: "Mentorship with Internship",
    //   icon: <BookOutlined />,
    //   description: (
    //     <Typography.Paragraph>
    //       Post your Organization&apos;s courses and programs and showcase your
    //       brand and the external link.
    //     </Typography.Paragraph>
    //   ),
    // },
    {
      link: "#",
      title: "Practice Test",
      icon: <QuestionCircleOutlined />,
      description: (
        <Typography.Paragraph>
          Help Students prepare for certification exams by providing practice
          questions.
        </Typography.Paragraph>
      ),
    },
  ];
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb
            items={[
              {
                title: "Published Courses",
                href: "/business/learning/courses",
              },
              { title: "Course Type" },
            ]}
          />
        </Container>
      </section>
      <section>
        <Container className="p-6 container-fluid">
          <Row gutter={16} className="w-full">
            <Col xs={24} lg={18}>
              <Typography.Title level={4} className="mb-0">
                First, Let&apos;s Find out What course you are making
              </Typography.Title>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className="p-6 container-fluid">
          <Row gutter={16}>
            <Col xs={24} lg={18}>
              <Row gutter={[16, 16]}>
                {businessDashboardMenuItems.map((items, index) => (
                  <Col key={`menu-items-${index}`} xs={24} sm={12} lg={8}>
                    <DashboardMenuCard {...items} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CreateCourse;
