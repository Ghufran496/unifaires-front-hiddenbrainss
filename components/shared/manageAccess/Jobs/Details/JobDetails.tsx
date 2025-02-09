/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useContext } from "react";
import { Typography, Breadcrumb, Avatar, Spin, Skeleton } from "antd";
import { BankOutlined } from "@ant-design/icons";
import Container from "@/components/shared/container";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CandidatesList from "./components/CandidatesList";
import JobDetailsTab from "./components/JobDetailsTab";
import axiosInstance from "@/app/utils/axios-config";
import UserProfile from "./components/UserProfile";
import JobApplicantFilterForm from "./ApplicantFilterForm";
import { jobDetailsContext } from "./JobDetailsContext";

const JobDetail = () => {
  const jobContext = useContext(jobDetailsContext);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Unassigned Candidates (${
        (Array.isArray(jobContext?.applicantList)
          ? jobContext.applicantList
          : []
        ).length
      })`,
      children: (
        <CandidatesList
          listType="pending"
          applicantList={jobContext?.applicantList}
        />
      ),
    },
    {
      key: "2",
      label: "Job Details",
      children: <JobDetailsTab />,
    },
    {
      key: "3",
      label: `Interviewed (${
        (Array.isArray(jobContext?.interviewingList)
          ? jobContext.interviewingList
          : []
        ).length
      })`,
      children: (
        <CandidatesList
          listType="interviewing"
          applicantList={jobContext?.interviewingList}
        />
      ),
    },
    {
      key: "4",
      label: `Accepted (${
        (Array.isArray(jobContext?.acceptedList) ? jobContext.acceptedList : [])
          .length
      })`,
      children: (
        <CandidatesList
          listType="accepted"
          applicantList={jobContext?.acceptedList}
        />
      ),
    },
    {
      key: "5",
      label: `Rejected (${
        (Array.isArray(jobContext?.rejectedList) ? jobContext.rejectedList : [])
          .length
      })`,
      children: (
        <CandidatesList
          listType="rejected"
          applicantList={jobContext?.rejectedList}
        />
      ),
    },
  ];

  return (
    <>
      {!jobContext?.isShowProfile ? (
        <div>
          <section className="content-header">
            <Container fluid className="p-6">
              <Typography.Title level={2} className="mb-0">
                Jobs
              </Typography.Title>
              <Typography.Paragraph className="font-semibold ">
                Find, edit and delete jobs that you have posted for qualified
                candidates
              </Typography.Paragraph>
              <Breadcrumb
                items={jobContext?.breadCombs?.items?.applicants}
                separator=">"
              />
            </Container>
          </section>
          <Skeleton
            active
            loading={jobContext?.pageLoading?.pageDetails}
            className="p-4"
          >
            <div className="m-6 p-4 rounded-md bg-gray-200 border border-purple-600">
              <div className="flex flex-row gap-4">
                <Typography.Title level={4}>
                  {jobContext?.jobInfo?.title}
                </Typography.Title>
                <Typography.Paragraph className="text-sm text-purple-700 bg-gray-300 p-2 rounded-lg">
                  {jobContext?.jobInfo?.referenceNo}
                </Typography.Paragraph>
              </div>
              <div className="flex flex-row px-4 gap-4 mt-4">
                <div className="flex flex-row justify-center items-center">
                  {typeof jobContext?.jobInfo?.mediaUrl === "string" &&
                  jobContext.jobInfo.mediaUrl.trim() !== "" ? (
                    <>
                      <Avatar src={jobContext.jobInfo.mediaUrl} />
                    </>
                  ) : (
                    <></>
                  )}

                  <Typography.Paragraph className="pt-4 pl-2">
                    {jobContext?.jobInfo?.organizationName}
                  </Typography.Paragraph>
                </div>
                <div className="flex flex-row">
                  <BankOutlined className="text-2xl text-purple-600" />
                  <Typography.Paragraph className="uppercase pt-4 pl-2">
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
                </div>
              </div>
            </div>
            <div className="mx-6">
              <JobApplicantFilterForm />
            </div>
            <div className="m-6 mt-1">
              <Spin spinning={jobContext?.pageLoading?.tableContent}>
                <Tabs
                  size="large"
                  defaultActiveKey="1"
                  items={items}
                  className="bg-white rounded-md px-4 pb-4"
                />
              </Spin>
            </div>
          </Skeleton>
        </div>
      ) : (
        <div>
          <section className="content-header">
            <Container fluid className="p-6">
              <Typography.Title level={2} className="mb-0">
                Jobs
              </Typography.Title>
              <Typography.Paragraph className="font-semibold ">
                Find, edit and delete jobs that you have posted for qualified
                candidates
              </Typography.Paragraph>
              <Breadcrumb
                items={jobContext?.breadCombs?.items?.candidateProfile}
                separator=">"
              />
            </Container>
          </section>
          <div className="p-6">
            <UserProfile />
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetail;
