"use client";
import React, { Fragment } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Row, Col, Typography } from "antd";

// app components
import TalentProgramMenu from "../TalentProgramMenu";
import Container from "@/components/shared/container";
import TalentProgramStatsCard from "../TalentProgramStatsCard";
import TalentProfileCard from "@/components/shared/cards/TalentProfileCard";

const TalentProfiles = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            Vetted Talent Profile
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <TalentProgramStatsCard />
        </Container>
      </section>
      <nav>
        <Container className="px-6 container-fluid">
          <TalentProgramMenu activeKey="profiles" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 py-6 container-fluid">
          <Row className="" gutter={[16, 16]}>
            {Array.from({ length: 12 }).map((index) => (
              <Col key={`profile-card-${index}`} sm={12} md={8} xl={6}>
                <TalentProfileCard />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default TalentProfiles;
