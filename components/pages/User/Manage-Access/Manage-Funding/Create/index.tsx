"use client";
import NextLink from "next/link";
import { Divider, Breadcrumb, Typography } from "antd";
import Container from "@/components/shared/container";
import CreateFundingForm from "./CreateFundingForm";

const CreateFunding = () => {
  return (
    <>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/user/business-access/funding">Funding</NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Funding</Breadcrumb.Item>
          </Breadcrumb>
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
                Just fill the form and create your funding.
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
    </>
  );
};

export default CreateFunding;
