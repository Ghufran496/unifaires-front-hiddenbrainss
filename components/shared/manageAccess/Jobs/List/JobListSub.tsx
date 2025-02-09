/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext } from "react";
import NextLink from "next/link";
import { Button, Typography, List, Pagination, Skeleton } from "antd";
import JobsMenu from "./JobsMenu";
import JobSearchForm from "./JobSearchForm";
import Container from "@/components/shared/container";
import JobCard from "./JobCard";
import { JobListContext } from "./JobListContext";
import JobStatistics from "@/components/shared/manageAccess/Jobs/Statistics";

const JobListSub = () => {
  const contextValue = useContext(JobListContext);

  /**
   * Handle page change
   */
  const handlePageChange = (page: number): void => {
    let status1 = "opened";
    if (contextValue?.menu?.activeKey === "archived") {
      status1 = "archived";
    } else if (contextValue?.menu?.activeKey === "pending") {
      status1 = "pending";
    }
    if (contextValue?.pagination?.setCurrentPage) {
      contextValue.pagination.setCurrentPage(page);
    }
    if (contextValue?.fetchJobs) {
      contextValue.fetchJobs({
        page,
        searchTxt: contextValue?.searchTerms,
        status: status1,
      });
    }
  };

  return (
    <>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
              <Typography.Title level={2} className="mb-0">
                {typeof contextValue?.menuTitle === "string"
                  ? contextValue.menuTitle
                  : ""}
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Find, edit and delete jobs you have posted for qualified
                candidates
              </Typography.Paragraph>
            </div>
            {contextValue?.permissions?.job_create ? (
              <>
                <NextLink
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    if (contextValue?.handleCreateJobUrl) {
                      contextValue.handleCreateJobUrl();
                    }
                  }}
                  passHref
                >
                  <Button type="primary" size="large" className="rounded-md">
                    + Create job
                  </Button>
                </NextLink>
              </>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </section>
      {contextValue?.permissions?.job_analytics ? (
        <>
          <section className="content-header">
            <Container className="p-6 container-fluid">
              <JobStatistics />
            </Container>
          </section>
        </>
      ) : (
        <></>
      )}
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <JobsMenu />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <JobSearchForm />
          <Skeleton active loading={contextValue?.pageLoading}>
            <List
              size="large"
              itemLayout="vertical"
              className="cursor-default [&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
              dataSource={
                Array.isArray(contextValue?.jobList) ? contextValue.jobList : []
              }
              renderItem={(job) => <JobCard job={job} />}
            />
          </Skeleton>
          {contextValue?.pagination?.total &&
          contextValue.pagination.total > 0 ? (
            <>
              <div className="flex justify-end mt-4 ">
                <Pagination
                  current={contextValue?.pagination?.currentPage}
                  pageSize={contextValue?.pagination?.pageSize}
                  total={contextValue?.pagination?.total}
                  onChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </Container>
      </section>
    </>
  );
};

export default JobListSub;
