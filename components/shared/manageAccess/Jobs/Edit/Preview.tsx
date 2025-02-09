"use client";
import { useContext } from "react";
import { Typography, Col, Row, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Container from "@/components/shared/container";
import ImageComponent from "@/components/shared/image";
import DetailsCard from "./DetailsCard";
import DetailsContent from "./DetailsContent";
import { editJobContext } from "./editContext";

const Preveiw = () => {
  const jobContext = useContext(editJobContext);
  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0 rounded-md aspect-square w-24 h-24 bg-grey-200 overflow-hidden">
                  <ImageComponent
                    layout="fill"
                    objectFit="cover"
                    src={jobContext?.jobInfo?.mediaUrl}
                    alt="paris picture"
                  />
                </div>
                <div className="grow">
                  <Typography.Title level={1} className="mb-2 text-3xl">
                    {jobContext?.jobInfo?.title}
                  </Typography.Title>
                  <Typography.Paragraph className="mb-2 max-w-xl text-lg opacity-90">
                    {jobContext?.jobInfo?.state} -{" "}
                    {jobContext?.jobInfo?.country}
                  </Typography.Paragraph>
                  <div className="flex gap-3 flex-wrap items-center mb-4">
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <ClockCircleOutlined className="" />
                      {formatDate(jobContext?.jobInfo?.createdAt)} -{" "}
                      {formatDate(jobContext?.jobInfo?.deadline)}
                    </Typography.Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="content-body">
        <Container fluid className="px-6">
          <Row gutter={[16, 16]}>
            <Col
              xs={{ span: 24, order: 2 }}
              lg={{ span: 16, order: 1 }}
              xxl={{ span: 18, order: 1 }}
            >
              <DetailsContent />
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              lg={{ span: 8, order: 2 }}
              xxl={{ span: 6, order: 2 }}
            >
              <DetailsCard />
            </Col>
          </Row>
        </Container>
      </section>
      <div className="flex flex-row gap-4 mt-4">
        <Button
          size="large"
          onClick={(event) => {
            event.preventDefault();
            const stepNo: number =
              typeof jobContext?.steps?.current === "number"
                ? jobContext.steps.current
                : 1;
            jobContext?.steps?.setCurrent(stepNo - 1);
          }}
        >
          Previous
        </Button>
        <Button
          type="primary"
          className="ml-auto"
          size="large"
          onClick={(event) => {
            event.preventDefault();
            const stepNo: number =
              typeof jobContext?.steps?.current === "number"
                ? jobContext.steps.current
                : 1;
            jobContext?.steps?.setCurrent(stepNo + 1);
          }}
        >
          Post Job
        </Button>
      </div>
    </>
  );
};

export default Preveiw;
