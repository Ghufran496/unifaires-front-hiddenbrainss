"use client";
import React, { Fragment } from "react";
// next components
import Link from "next/link";
// antd components
import { Alert, Button, Divider, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
// app components
import LearningMenu from "./LearningMenu";
import Container from "@/components/shared/container";

const LearningPage = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            My Learning
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <LearningMenu activeKey="my-learning" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <Alert
            style={{ borderRadius: 8, marginTop: 24 }}
            message={
              <Typography.Title level={5} className="leading-none">
                Schedule learning time
              </Typography.Title>
            }
            showIcon
            icon={<ClockCircleOutlined />}
            closable
            description={
              <>
                <Typography.Paragraph className="max-w-4xl">
                  Learning a little each day adds up. Research shows that
                  students who make learning a habit are more likely to reach
                  their goals. Set time aside to learn and get reminders using
                  your learning scheduler.
                </Typography.Paragraph>
                <Link href="/user/business-access/learning/tools" passHref>
                  <Button className="rounded" type="primary">
                    Get Started
                  </Button>
                </Link>
              </>
            }
          />

          <Divider className="mb-0" />
        </Container>
      </section>
    </Fragment>
  );
};

export default LearningPage;
