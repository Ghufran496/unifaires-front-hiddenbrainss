"use client";
import React, { Fragment, useEffect, useState } from "react";
// app layout
import UserDashboardLayout from "@/components/layouts/UserDashboard";
// app components
import { List, Pagination, Skeleton, Typography } from "antd";
import FundingMenu from "./components/FundingsMenu";
import FundingSearchForm from "./components/FundingSearchForm";
import Container from "@/components/shared/container";
import DashboardHeader from "@/components/shared/dashboardHeader";
import FundingCard from "./components/FundingCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFundingWithStatus,
  fetchMyFunding,
  fetchSavedFundings,
} from "@/redux/features/FundingSlice";
import { handleAxiosError } from "@/app/utils/axiosError";
import { toast } from "react-toastify";
import axiosInstance from "@/app/utils/axios-config";

interface FundingDataProps {
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
  fundingpaymenttypeId?: string;
  isExternal: Boolean;
  organizationLogo: string;
  position: string;
  company: string;
  location: string;
  date: string;
  fundingUrl: string;
}
const FundingsPage = () => {
  const dispatch: any = useAppDispatch();
  const [fetchingFunding, setFetchingFunding] = useState(true);
  const [fundingList, setFundingList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFundings, setTotalFundings] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [searchTerms, setSearchTerms] = useState<string>("");

  const fetchFunding = async (page: any) => {
    try {
      setFetchingFunding(true);
      const query = buildQuery({
        title: searchTerms,
        //  page, limit: pageSize
      });
      const res = await axiosInstance.get(`/enrol-funding/user-enrol${query}`);
      if (res.status) {
        const resData = res.data.data;
        setFundingList(resData.enrols);
        setTotalFundings(resData.count);
        setCurrentPage(resData.currentPage);
        // console.log(res.data);
        setFetchingFunding(false);
      }
    } catch (error) {
      handleAxiosError(error);
      // toast.error("Unable to fetch fundings");
    } finally {
      setFetchingFunding(false);
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
    fetchFunding(currentPage);
  }, [searchTerms, currentPage]);

  useEffect(() => {
    dispatch(fetchMyFunding());
    dispatch(fetchSavedFundings());
    dispatch(fetchFundingWithStatus("pending"));
    dispatch(fetchFundingWithStatus("accepted"));
    dispatch(fetchFundingWithStatus("interviewing"));
    dispatch(fetchFundingWithStatus("rejected"));
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="mx-6 my-8">
      <DashboardHeader
        title="My Fundings"
        para="Check out Organisations that are making the most impact on Funding, Grants, & Scholarships"
      />

      <section className="mt-[71px] mb-6">
        <FundingMenu activeKey="my-funding" />
      </section>
      <section className="content-body">
        <Container className="lg:px-6 md:px-6 px-2 pb-6 container-fluid">
          <FundingSearchForm setSearchTerms={setSearchTerms} />
          <Skeleton active loading={fetchingFunding}>
            {fundingList && (
              <List
                size="large"
                itemLayout="vertical"
                dataSource={Array.isArray(fundingList) ? fundingList : []}
                renderItem={(funding: any) => (
                  <FundingCard
                    fetchFunding={fetchFunding}
                    funding={funding}
                    listType="applied"
                  />
                )}
              />
            )}
            {!fundingList && (
              <div className="w-full flex flex-col items-center justify-center mt-10">
                <div className=" flex flex-col justify-center items-center bg-white p-10">
                  <Typography.Paragraph className="m-0 text-2xl font-bold">
                    You Don&apos;t have any Fundings
                  </Typography.Paragraph>
                  <Typography.Paragraph className="italic font-semibold m-0">
                    Explore{" "}
                    <Typography.Link href="/funding">fundings</Typography.Link>
                  </Typography.Paragraph>
                </div>
              </div>
            )}
          </Skeleton>

          <div className="flex justify-center items-center mt-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalFundings}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default FundingsPage;
