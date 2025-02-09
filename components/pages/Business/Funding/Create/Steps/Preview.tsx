"use client";
import React, { Fragment, useContext } from "react";
// next components
// antd components
import { Typography, Col, Row, Button } from "antd";
import {
  ClockCircleOutlined,
  UsergroupAddOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import Container from "@/components/shared/container";
import ImageComponent from "@/components/shared/image";
import DetailsCard from "../../Details/DetailsCard";
import DetailsContent from "../../Details/DetailsContent";
import { FundingContext } from "../FundingContext";

interface PreviewInt {
  next: Function;
  prev: Function;
}

const Preveiw = ({ next, prev }: PreviewInt) => {
  const { fundingData } = useContext<any>(FundingContext);
  function formatDate(dateString: string | number | Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <Fragment>
      <section className="content-hero border-b mb-6">
        <Container fluid className="px-6 pb-6">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16} xxl={18}>
              <div className="flex justify-start items-start gap-4">
                <div className="relative shrink-0 rounded-md aspect-square w-24 h-24 bg-grey-200 overflow-hidden">
                  <ImageComponent
                    layout="fill"
                    objectFit="cover"
                    src={fundingData?.data?.mediaUrl}
                    alt="paris picture"
                  />
                </div>
                <div className="grow">
                  <Typography.Title level={1} className="mb-2 text-3xl">
                    {fundingData?.data?.title}
                  </Typography.Title>
                  <Typography.Paragraph className="mb-2 max-w-xl text-lg opacity-90">
                    {fundingData?.data?.state} - {fundingData?.data?.country}
                  </Typography.Paragraph>
                  <div className="flex gap-3 flex-wrap items-center mb-4">
                    <Typography.Text className="flex items-center gap-1 flex-nowrap">
                      <ClockCircleOutlined className="" />
                      {fundingData &&
                        formatDate(fundingData?.data?.createdAt)} -{" "}
                      {fundingData && formatDate(fundingData?.data?.deadline)}
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
        <Button size="large" onClick={() => prev()}>
          Previous
        </Button>
        {/* <Button
          type="primary"
          className="ml-auto"
          size="large"
          onClick={() => next()}
        >
          Post Funding
        </Button> */}
      </div>
    </Fragment>
  );
};

export default Preveiw;
