"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { List, Skeleton, Typography } from "antd";
// app components
import Container from "@/components/shared/container";
import JobsMenu from "../components/JobsMenu";
import JobSearchForm from "../components/JobSearchForm";
import JobCard from "../components/JobCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import { fetchJobWithStatus } from "@/redux/features/JobSlice";

const MyJobArchives = () => {
  const dispatch: any = useAppDispatch();
  const [fetchingJobs, setFetchingJobs] = useState(true);
  const fetchJob = async () => {
    try {
      const res = await dispatch(fetchJobWithStatus("archive"));

      if (res.type === "job/fetchJobWithStatus/fulfilled") {
        setFetchingJobs(false);
      }
    } catch (error) {
      handleAxiosError(error);
      toast.error("Unable to fetch Jobs");
    }
  };

  const jobList = useAppSelector((state: any) => state.job.savedJobs);

  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            Archived Jobs
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <JobsMenu activeKey="archive" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <JobSearchForm />
          <Skeleton active loading={fetchingJobs}>
            <List
              size="large"
              itemLayout="vertical"
              className="cursor-default mt-6 [&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
              pagination={{
                pageSize: 5,
              }}
              dataSource={Array.isArray(jobList) ? jobList : []}
              renderItem={(job: any) => (
                <JobCard fetchJob={fetchJob} job={job} listType="saved" />
              )}
            />
          </Skeleton>
        </Container>
      </section>
    </Fragment>
  );
};

export default MyJobArchives;
