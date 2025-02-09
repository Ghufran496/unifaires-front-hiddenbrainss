/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useContext } from "react";
import NextLink from "next/link";
import { Button, Typography, List, Pagination, Spin } from "antd";
import FundingMenu from "./FundingMenu";
import FundingStatsCard from "../Statistics";
import FundingSearchForm from "./FundingSearchForm";
import Container from "@/components/shared/container";
import FundingCard from "./FundingCard";
import { LoadingOutlined } from "@ant-design/icons";
import { fundingListContext } from "./FundingListContext";

const ListSub = () => {
  const fundingContext = useContext(fundingListContext);

  /**
   * Handle page change
   */
  const handlePageChange = (page: any) => {
    if (fundingContext?.pagination?.setCurrentPage) {
      fundingContext.pagination.setCurrentPage(page);
    }
    if (fundingContext?.fetchList) {
      const status1 =
        fundingContext?.menu?.activeKey === "myFunding" ? "active" : "archive";
      fundingContext.fetchList({
        page,
        searchTxt: fundingContext?.searchTxt,
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
                {fundingContext?.listPageTitle}
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                Check out Organisations that are making the most impact on
                Funding, Grants, & Scholarships
              </Typography.Paragraph>
            </div>
            {fundingContext?.permission?.funding_create ? (
              <>
                <NextLink
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    if (fundingContext?.handleCreateUrl) {
                      fundingContext.handleCreateUrl();
                    }
                  }}
                  passHref
                >
                  <Button type="primary" size="large" className="rounded-md">
                    + Create funding
                  </Button>
                </NextLink>
              </>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </section>
      {fundingContext?.permission?.funding_analytics ? (
        <>
          <section className="content-header">
            <Container className="p-6 container-fluid">
              <FundingStatsCard />
            </Container>
          </section>
        </>
      ) : (
        <></>
      )}
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <FundingMenu />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <FundingSearchForm />
          <Spin
            indicator={
              <LoadingOutlined className="flex items-center justify-center text-5xl" />
            }
            spinning={fundingContext?.pageLoading}
          >
            <List
              size="large"
              itemLayout="vertical"
              dataSource={
                Array.isArray(fundingContext?.listDatas)
                  ? fundingContext.listDatas
                  : []
              }
              renderItem={(funding) => <FundingCard fundingData={funding} />}
            />
          </Spin>
          {fundingContext?.pagination?.total &&
          fundingContext.pagination.total > 0 ? (
            <>
              <div className="flex justify-center items-center">
                <Pagination
                  current={fundingContext?.pagination?.currentPage}
                  pageSize={fundingContext?.pagination?.pageSize}
                  total={fundingContext?.pagination?.total}
                  onChange={handlePageChange}
                  className="flex ml-auto pt-4"
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

export default ListSub;
