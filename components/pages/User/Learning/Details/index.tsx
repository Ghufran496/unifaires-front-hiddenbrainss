"use client";
import React, { Fragment } from "react";
// next
import NextLink from "next/link";
// antd and Icon components
import { Rate, Typography, Breadcrumb, Button } from "antd";
import {
  GlobalOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
// app components
import DetailsCard from "./DetailsCard";
import DetailsContent from "./DetailsContent";
import Container from "@/components/shared/container";

const CourseDetails = () => {
  return (
    <Fragment>
      <section className="content-header">
        <Container fluid className="p-6 text-4 font-bold leading-[28.4px]">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/admin/courses">My learning</NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Preview</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
      <section className="content-hero flex ">
        <div>
          <Container className="px-6 ">
            <Typography.Title className=" font-bold text-[28px] " level={1}>
              MBA in Project & Program Management
            </Typography.Title>
            <Typography.Paragraph className="mb-6 leading-[27px] font-medium text-[18px] opacity-90">
              Learn A-Z everything about Project & Program Management, from the
              basics to advanced topics!
            </Typography.Paragraph>
            <div className=" gap-3 flex-wrap items-center mb-4">
              <div className="flex items-start gap-1 flex-nowrap">
                <Typography.Text type="warning" className="pt-1">
                  4.0
                </Typography.Text>
                <Rate disabled defaultValue={4} className="[&>li]:mr-1" />
                <Typography.Text className="pt-1 text-[18px] font-medium leading-[27px]">
                  <span className="text-[#5832DA]">(2,410 ratings)</span> 15,197
                  students
                </Typography.Text>
              </div>
              <div>
                <Typography.Text className="font-semibold text-[18px] leading-[27px] pt-8 ">
                  Posted By Sarah Lewis, Munich Unity Of Applied Sciences,Munich
                </Typography.Text>
              </div>
              <Typography.Text className="flex items-center gap-1 mt-10 flex-nowrap">
                <GlobalOutlined type="secondary" rev={undefined} /> Language -
                English
              </Typography.Text>
              <Typography.Text className="flex items-center gap-1 mt-4 flex-nowrap">
                <ClockCircleOutlined className="" rev={undefined} /> Subtitles -
                Portuguese
              </Typography.Text>
              <Typography.Text className="flex items-center gap-1 mt-4 flex-nowrap">
                <UsergroupAddOutlined type="secondary" rev={undefined} /> Last
                Updated - 09/06/2022
              </Typography.Text>
              <DetailsContent />
            </div>
          </Container>
        </div>
        <div>
          <DetailsCard />
        </div>
      </section>
      <div className="flex pb-[193px]">
        <section className="content-body">
          <Container fluid className="px-6"></Container>
        </section>
        <div className="gap-[40px] float-left justify-end flex">
          <Button
            type="text"
            className="w-[184px] bg-[#EEEAFB] h-[58px] text-[#5832DA] font-bold text-base rounded-[10px] "
          >
            Back to Editor
          </Button>
          <Button
            type="text"
            className="w-[184px] bg-[#5832DA] h-[58px] text-white font-bold text-base rounded-[10px] "
          >
            Publish course
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default CourseDetails;
