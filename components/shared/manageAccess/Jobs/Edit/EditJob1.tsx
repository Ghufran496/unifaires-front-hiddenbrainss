"use client";
import { useContext } from "react";
import { Divider, Breadcrumb, Typography } from "antd";
import Container from "@/components/shared/container";
import EditJobForm from "./EditJobForm";
import { editJobContext } from "./editContext";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const EditJob1 = () => {
  const jobContext = useContext(editJobContext);

  return (
    <>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb items={jobContext?.breadCombs?.items} />
        </Container>
      </section>
      <section className="content-hero">
        <Container className="container-fluid p-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                Update Job
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Just fill the form and update your Job.
              </Typography.Paragraph>
            </div>
          </div>
        </Container>
      </section>
      <section className="content-header">
        <Container className="container-fluid px-6 pb-6">
          <Divider className="mb-6 mt-2" />
          <Spin
            spinning={jobContext?.pageLoading}
            indicator={
              <LoadingOutlined className="flex items-center justify-center text-2xl" />
            }
          >
            <EditJobForm />
          </Spin>
        </Container>
      </section>
    </>
  );
};

export default EditJob1;
