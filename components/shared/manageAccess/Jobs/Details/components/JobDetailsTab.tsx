"use client";
import { useContext, useMemo } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import Container from "@/components/shared/container";
import ImageComponent from "@/components/shared/image";
import { Row, Col, Typography } from "antd";
import { jobDetailsContext } from "../JobDetailsContext";

const JobDetailsTab = () => {
  const jobContext = useContext(jobDetailsContext);
  const jobActivePeriod: string = useMemo(() => {
    let lastDate: string = "";
    if (
      typeof jobContext?.jobInfo?.createdAt === "string" &&
      jobContext.jobInfo.createdAt.trim() !== ""
    ) {
      lastDate += formatDate(jobContext.jobInfo.createdAt.trim());
    }

    if (
      typeof jobContext?.jobInfo?.createdAt === "string" &&
      jobContext.jobInfo.createdAt.trim() !== "" &&
      typeof jobContext?.jobInfo?.deadline === "string" &&
      jobContext.jobInfo.deadline.trim() !== ""
    ) {
      lastDate += " - ";
    }

    if (
      typeof jobContext?.jobInfo?.deadline === "string" &&
      jobContext.jobInfo.deadline.trim() !== ""
    ) {
      lastDate += formatDate(jobContext.jobInfo.deadline.trim());
    }

    return lastDate;
  }, [jobContext?.jobInfo]);

  /**
   * Format the input date
   */
  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0 rounded-md aspect-square w-24 h-24 bg-grey-200 overflow-hidden">
                  <ImageComponent
                    layout="fill"
                    objectFit="cover"
                    src={
                      typeof jobContext?.jobInfo?.mediaUrl === "string"
                        ? jobContext.jobInfo.mediaUrl
                        : ""
                    }
                    alt="paris picture"
                  />
                </div>
                <div className="grow">
                  <Typography.Title level={1} className="mb-2 text-3xl">
                    {jobContext?.jobInfo?.title}
                  </Typography.Title>
                  <Typography.Paragraph className="mb-2 max-w-xl text-lg opacity-90">
                    {(typeof jobContext?.jobInfo?.state === "string"
                      ? jobContext.jobInfo.state
                      : "") +
                      (typeof jobContext?.jobInfo?.state === "string" &&
                      jobContext.jobInfo.state.trim() !== "" &&
                      typeof jobContext?.jobInfo?.country === "string" &&
                      jobContext.jobInfo.country.trim() !== ""
                        ? ", "
                        : "") +
                      (typeof jobContext?.jobInfo?.country === "string"
                        ? jobContext.jobInfo.country
                        : "")}
                  </Typography.Paragraph>
                  {jobActivePeriod.trim() !== "" ? (
                    <>
                      <div className="flex gap-3 flex-wrap items-center mb-4">
                        <Typography.Text className="flex items-center gap-1 flex-nowrap">
                          <ClockCircleOutlined className="" />
                          {jobActivePeriod}
                        </Typography.Text>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
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
              <div className="mb-8">
                <Typography.Title level={4}>Job Overview</Typography.Title>
                <Typography.Paragraph className="leading-6">
                  {jobContext?.jobInfo?.details}
                </Typography.Paragraph>
                <div className="mb-8">
                  <Typography.Title level={4}>
                    About Organisation
                  </Typography.Title>
                  <Typography.Paragraph className="leading-6">
                    {jobContext?.jobInfo?.aboutOrganization}
                  </Typography.Paragraph>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default JobDetailsTab;
