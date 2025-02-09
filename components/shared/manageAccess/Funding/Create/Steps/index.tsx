"use client";
import React, { Fragment } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { Divider, Breadcrumb, Typography } from "antd";
// app components
import Container from "@/components/shared/container";
import CreateFundingForm from "./CreateFundingForm";

const CreateFunding = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb
            items={[
              { title: "Fundings", href: "/dashboard/funding" },
              { title: "Create Funding" },
            ]}
          />
        </Container>
      </section>
      <section className="content-hero">
        <Container className="container-fluid p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Add New Funding
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Just fill the form and create your Job.
              </Typography.Paragraph>
            </div>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="container-fluid px-6 pb-6">
          <Divider className="mb-6 mt-2" />
          <CreateFundingForm />
        </Container>
      </section>
    </Fragment>
  );
};

export default CreateFunding;
