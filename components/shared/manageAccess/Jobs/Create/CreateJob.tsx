"use client";
import { useContext } from "react";
import { Divider, Breadcrumb, Typography } from "antd";
import Container from "@/components/shared/container";
import CreateJobForm from "./CreateJobForm";
import { createJobContext } from "./createJobContext";

const CreateJob = () => {
  const addJobContext = useContext(createJobContext);

  return (
    <>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb
            items={
              Array.isArray(addJobContext?.breadCombs?.items)
                ? addJobContext.breadCombs.items
                : []
            }
          />
        </Container>
      </section>
      <section className="content-hero">
        <Container className="container-fluid p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Add New Job
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
          <CreateJobForm />
        </Container>
      </section>
    </>
  );
};

export default CreateJob;
