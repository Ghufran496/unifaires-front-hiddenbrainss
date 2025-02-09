"use client";
import React, { Fragment } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Typography } from "antd";

// app components
import TalentList from "./TalentList";
import TalentProgramMenu from "./TalentProgramMenu";
import Container from "@/components/shared/container";
import TalentProgramStatsCard from "./TalentProgramStatsCard";

const ManageAccounts = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            Vetted Talent Program
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
          <TalentProgramMenu activeKey="talent-program" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <TalentList url="talent-program/" />
        </Container>
      </section>
    </Fragment>
  );
};

export default ManageAccounts;
