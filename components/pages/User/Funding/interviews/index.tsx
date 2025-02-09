"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import { List, Skeleton, Typography } from "antd";
// app components
import Container from "@/components/shared/container";
import FundingsMenu from "../components/FundingsMenu";
import FundingSearchForm from "../components/FundingSearchForm";
import FundingCard from "../components/FundingCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import {
  fetchFundingWithStatus,
  fetchMyFunding,
  fetchSavedFundings,
} from "@/redux/features/FundingSlice";

const MyInterviews = () => {
  const dispatch: any = useAppDispatch();
  const [fetchingFundings, setFetchingFundings] = useState(false);
  const fetchFunding = async () => {
    try {
      setFetchingFundings(true);
      const res = await dispatch(fetchFundingWithStatus("interviewed"));

      if (res.type === "funding/fetchFundingWithStatus/fulfilled") {
        setFetchingFundings(false);
      }
    } catch (error) {
      handleAxiosError(error);
      toast.error("Unable to fetch Funding");
    } finally {
      setFetchingFundings(false);
    }
  };

  const fundingList = useAppSelector(
    (state: any) => state.funding.interviewedFundings
  );

  useEffect(() => {
    fetchFunding();
  }, []);

  useEffect(() => {
    dispatch(fetchMyFunding());
    dispatch(fetchSavedFundings());
    dispatch(fetchFundingWithStatus("pending"));
    dispatch(fetchFundingWithStatus("accepted"));
    dispatch(fetchFundingWithStatus("interviewing"));
    dispatch(fetchFundingWithStatus("rejected"));
  }, []);
  return (
    <Fragment>
      <section className="content-header">
        <Container className="p-6 container-fluid">
          <Typography.Title level={2} className="mb-0">
            Interviewed Fundings
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            Check out Organisations that are making the most impact on Funding,
            Grants, & Scholarships
          </Typography.Paragraph>
        </Container>
      </section>
      <nav className="mb-6">
        <Container className="px-6 container-fluid">
          <FundingsMenu activeKey="interviews" />
        </Container>
      </nav>
      <section className="content-body">
        <Container className="px-6 pb-6 container-fluid">
          <FundingSearchForm />
          <Skeleton active loading={fetchingFundings} className="mt-2">
            <List
              size="large"
              itemLayout="vertical"
              className="cursor-default mt-6 [&>div.ant-list-pagination]:px-6 [&>div.ant-list-pagination]:pb-4"
              pagination={{
                pageSize: 5,
              }}
              dataSource={Array.isArray(fundingList) ? fundingList : []}
              renderItem={(funding: any) => (
                <FundingCard
                  fetchFunding={fetchFunding}
                  funding={funding}
                  listType="interview"
                />
              )}
            />
          </Skeleton>
        </Container>
      </section>
    </Fragment>
  );
};

export default MyInterviews;
