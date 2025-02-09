"use client";
import React, { Fragment, useEffect, useState } from "react";
// app layout
import UserDashboardLayout from "@/components/layouts/UserDashboard";
// app components
import { List, Pagination, Skeleton, Typography } from "antd";
import JobsMenu from "./components/JobsMenu";

import JobSearchForm from "./components/JobSearchForm";
import Container from "@/components/shared/container";

import DashboardHeader from "@/components/shared/dashboardHeader";

import JobCard from "./components/JobCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchJobWithStatus,
  fetchMyJob,
  fetchSavedJobs,
} from "@/redux/features/JobSlice";
import { handleAxiosError } from "@/app/utils/axiosError";

import axiosInstance from "@/app/utils/axios-config";

interface JobDataProps {
  id?: number;
  title?: string;
  referenceNo?: string;
  country?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  salary?: string;
  organizationName?: string;
  aboutOrganization?: string;
  mediaUrl?: string;
  details?: string;
  isUnifaires?: Boolean;
  contact?: string;
  isUnifairesUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
  jobpaymenttypeId?: string;
  isExternal: Boolean;
  organizationLogo: string;
  position: string;
  company: string;
  location: string;
  date: string;
  jobUrl: string;
}
const JobsPage = () => {
  const dispatch: any = useAppDispatch();
  const [fetchingJobs, setFetchingJobs] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [jobList, setJobList] = useState();
  // const router = useRouter();
  // console.log(router.query);

  const fetchJob = async (page: any) => {
    try {
      setFetchingJobs(true);
      const query = buildQuery({ title: searchTerms, page, limit: pageSize });
      const res = await axiosInstance.get(`/enrol-job/user-enrol${query}`);

      if (res.status) {
        const resData = res.data.data;
        setJobList(resData.enrols);
        setTotalJobs(resData.count);
        setCurrentPage(resData.currentPage);
        // console.log(res.data);
        setFetchingJobs(false);
      }
    } catch (error) {
      // handleAxiosError(error);
      return null;
    } finally {
      setFetchingJobs(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };

  useEffect(() => {
    fetchJob(currentPage);
  }, [searchTerms, currentPage]);

  useEffect(() => {
    dispatch(fetchMyJob());
    dispatch(fetchSavedJobs());
    dispatch(fetchJobWithStatus("pending"));
    dispatch(fetchJobWithStatus("accepted"));
    dispatch(fetchJobWithStatus("interviewing"));
    dispatch(fetchJobWithStatus("rejected"));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-6 my-8">
      <DashboardHeader
        title="My Jobs"
        para="Check out Organisations that are making the most impact on Funding, Grants, & Scholarships"
      />

      <section className="mt-[71px] mb-6">
        <JobsMenu activeKey="my-jobs" />
      </section>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <JobSearchForm setSearchTerms={setSearchTerms} />

          <Skeleton active loading={fetchingJobs} className="mt-2">
            {jobList && (
              <List
                size="large"
                itemLayout="vertical"
                className="cursor-default mt-6 [&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
                dataSource={Array.isArray(jobList) ? jobList : []}
                renderItem={(job: any) => (
                  <JobCard fetchJob={fetchJob} job={job} listType="applied" />
                )}
              />
            )}
            {!jobList && (
              <div className="w-full flex flex-col items-center justify-center mt-10">
                <div className=" flex flex-col justify-center items-center bg-white p-10">
                  <Typography.Paragraph className="m-0 text-2xl font-bold">
                    You Don&apos;t have any Jobs
                  </Typography.Paragraph>
                  <Typography.Paragraph className="italic font-semibold m-0">
                    Explore{" "}
                    <Typography.Link href="/career">jobs</Typography.Link>
                  </Typography.Paragraph>
                </div>
              </div>
            )}
          </Skeleton>
          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalJobs}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default JobsPage;
