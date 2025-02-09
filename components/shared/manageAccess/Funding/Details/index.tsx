"use client";
import React, { Fragment, useEffect, useState } from "react";
// next
import NextLink from "next/link";
// ants and icons
import { Typography, Breadcrumb, Avatar } from "antd";
import { BankOutlined } from "@ant-design/icons";

// interface and props
import { useParams, useRouter } from "next/navigation";
import { FundingInt } from "../funding.interface";

import Container from "@/components/shared/container";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import CandidatesList from "./components/CandidatesList";
import FundingDetailsTab from "./components/FundingDetailsTab";
import axiosInstance from "@/app/utils/axios-config";

import UserProfile from "./components/UserProfile";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { handleAxiosError } from "@/app/utils/axiosError";
import { buildQuery } from "@/app/utils/buildQuery";
import FundingApplicantFilterForm from "./FundingApplicantFilterForm";

// icons and images

const FundingDetails = () => {
  const dispatch: any = useAppDispatch();
  const [funding, setFunding] = useState<FundingInt>();
  const [veiwProfile, setViewProfile] = useState(false);
  const [candidateProifle, setCandidateProfile] = useState();
  const [applicantList, setApplicantList] = useState<any>();
  const [interviewingList, setInterviewingList] = useState<any>();
  const [acceptedList, setAcceptedList] = useState<any>();
  const [rejectedList, setRejectedList] = useState<any>();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<any>();
  const router = useRouter();
  const params = useParams();
  const fundingId = params.slug;

  const fetchFundingDetails = async () => {
    try {
      const res = await axiosInstance.get(`/funding/${params.slug}`);

      if (res.status) {
        // console.log(res.data);
        setFunding(res?.data?.data);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const fetchApplicantList = async () => {
    try {
      const query = buildQuery({
        firstname: searchTerms,
        lastname: searchTerms,
        country: country,
        experienceLevel: experienceLevel,
      });
      const res = await axiosInstance.get(
        `/funding/user-funding-applicants/${params.slug}${query}`
      );

      if (res.status) {
        const dataRes = res.data.data;
        const fundingEnrols = dataRes.applicants;
        const pending = fundingEnrols.filter((j: any) => {
          if (j.fundingUserStatus === "pending") {
            return j;
          }
          return null;
        });
        const interview = fundingEnrols.filter((j: any) => {
          if (j.fundingUserStatus === "interviewing") {
            return j;
          }
          return null;
        });
        const accepted = fundingEnrols.filter((j: any) => {
          if (j.fundingUserStatus === "accepted") {
            return j;
          }
          return null;
        });
        const rejected = fundingEnrols.filter((j: any) => {
          if (j.fundingUserStatus === "rejected") {
            return j;
          }
          return null;
        });
        setApplicantList(pending);
        setInterviewingList(interview);
        setAcceptedList(accepted);
        setRejectedList(rejected);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchApplicantList();
    fetchFundingDetails();
  }, [params]);

  const fetchCandidateProfile = async (candidateUsername: any) => {
    try {
      const res = await axiosInstance.get(
        `/users/profile/${candidateUsername}`
      );

      if (res.status) {
        // console.log("userProfile", res);
        setCandidateProfile(res.data.data);
        // toast.success("Username changed Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Unassigned Candidates (${
        applicantList ? applicantList.length : 0
      })`,
      children: (
        <CandidatesList
          listType="pending"
          fetchApplicantList={fetchApplicantList}
          applicantList={applicantList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
    {
      key: "2",
      label: "Funding Details",
      children: <FundingDetailsTab funding={funding} />,
    },
    {
      key: "3",
      label: `Interviewed (${interviewingList ? interviewingList.length : 0})`,
      children: (
        <CandidatesList
          listType="interviewing"
          fetchApplicantList={fetchApplicantList}
          applicantList={interviewingList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
    {
      key: "4",
      label: `Accepted (${acceptedList ? acceptedList.length : 0})`,
      children: (
        <CandidatesList
          listType="accepted"
          fetchApplicantList={fetchApplicantList}
          applicantList={acceptedList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
    {
      key: "5",
      label: `Rejected (${rejectedList ? rejectedList.length : 0})`,
      children: (
        <CandidatesList
          listType="rejected"
          fetchApplicantList={fetchApplicantList}
          applicantList={rejectedList}
          setViewProfile={setViewProfile}
          fetchCandidateProfile={fetchCandidateProfile}
        />
      ),
    },
  ];

  return (
    <Fragment>
      {!veiwProfile ? (
        <div>
          <section className="content-header">
            <Container fluid className="p-6">
              <Typography.Title level={2} className="mb-0">
                Funding
              </Typography.Title>
              <Typography.Paragraph className="font-semibold ">
                Find, edit and delete fundings that you have posted for
                qualified candidates
              </Typography.Paragraph>
              <Breadcrumb
                items={[
                  { title: "Fundings", href: "/dashboard/funding" },
                  { title: "Applicants" },
                ]}
                separator=">"
              />
            </Container>
          </section>
          <div className="m-6 p-4 rounded-md bg-gray-200 border border-purple-600">
            <div className="flex flex-row gap-4">
              <Typography.Title level={4}>{funding?.title}</Typography.Title>
              <span className="text-sm text-purple-700 bg-gray-300 p-2 rounded-lg">
                {funding?.referenceNo}
              </span>
            </div>
            <div className="flex flex-row px-4 gap-4 mt-4">
              <div className="flex flex-row justify-center items-center">
                <Avatar src={funding?.mediaUrl} />
                <Typography.Paragraph className="pt-4 pl-2">
                  {funding?.organizationName}
                </Typography.Paragraph>
              </div>
              <div className="flex flex-row">
                <BankOutlined className="text-2xl text-purple-600" />
                <Typography.Paragraph className="uppercase pt-4 pl-2">
                  {funding?.state}, {funding?.country}
                </Typography.Paragraph>
              </div>
              {/* <div className="flex flex-row">
                <MoneyCollectOutlined className="text-2xl text-purple-600" />
                <Typography.Paragraph className="pt-4 pl-2">
                  Full time
                </Typography.Paragraph>
              </div>
              <div className="flex flex-row">
                <MoneyCollectOutlined className="text-2xl text-purple-600" />
                <Typography.Paragraph className="pt-4 pl-2">
                  Full time
                </Typography.Paragraph>
              </div> */}
            </div>
          </div>
          <div className="mx-6">
            <FundingApplicantFilterForm
              setSearchTerms={setSearchTerms}
              setCountry={setCountry}
              setExperienceLevel={setExperienceLevel}
            />
          </div>
          <div className="m-6">
            <Tabs
              size="large"
              defaultActiveKey="1"
              items={items}
              // onChange={onChange}
              className="bg-white rounded-md px-4 pb-4"
            />
          </div>
        </div>
      ) : (
        <div>
          <section className="content-header">
            <Container fluid className="p-6">
              <Typography.Title level={2} className="mb-0">
                Fundings
              </Typography.Title>
              <Typography.Paragraph className="font-semibold ">
                Find, edit and delete fundings that you have posted for
                qualified candidates
              </Typography.Paragraph>
              <Breadcrumb
                items={[
                  { title: "Fundings", href: "/dashboard/funding" },
                  {
                    title: "Applicants",
                    onClick: () => setViewProfile(false),
                    className: "hover:cursor-pointer",
                  },
                  { title: "Candidate Profile" },
                ]}
                separator=">"
              />
            </Container>
          </section>
          <div className="p-6">
            <UserProfile userInfo={candidateProifle} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FundingDetails;
