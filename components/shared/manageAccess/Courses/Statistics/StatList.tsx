/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Row, Col, Card, Space, Avatar, Progress, Typography } from "antd";
import {
  GlobalOutlined,
  WalletOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { RootState } from "@/redux/store";

const StatList = () => {
  const [courseStat, setCourseStat] = useState<any>();
  const dispatch: any = useAppDispatch();
  const fetchBusinessStats = async () => {
    try {
      const res = await axiosInstance.get("/stats/business-course");
      if (res?.data?.data) {
        setCourseStat(res.data.data);
      }
    } catch (error) {
      console.log("Unable to fetch business stats", error);
    }
  };

  useEffect(() => {
    fetchBusinessStats();
  }, []);

  const formatCurrency = (value: any) => {
    if (typeof value !== "number") {
      return "$0";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const Countries = useAppSelector(
    (state: RootState) => state.country.countries
  );

  const getCountry = (countryCode: string) => {
    if (!Countries || !Array.isArray(Countries)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = Countries.find((c) => c.code === countryCode);
    return typeof country?.name === "string" ? country.name : 0;
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} xl={5}>
        <Card hoverable className="rounded-lg h-full">
          <Space className="justify-between w-full">
            <Typography.Title level={5} className="mb-0">
              Total Revenue
            </Typography.Title>
            <Avatar
              size={48}
              icon={<WalletOutlined />}
              className="flex justify-center items-center bg-accent-50 text-accent-500"
            />
          </Space>
          <Typography.Title level={1} className="">
            {formatCurrency(courseStat?.totalRevenue || 0)}
          </Typography.Title>
          <Space className="gap-2 w-full">
            <Typography.Paragraph className="font-semibold italic">
              Your total revenue performance
            </Typography.Paragraph>
            {/* <Typography.Title
              level={5}
              type="success"
              className="mb-0 flex gap-1 items-center"
            >
              <RiseOutlined />
              147%
            </Typography.Title>
            <Typography.Paragraph className="mb-0">
              VS PREV. 28 DAYS
            </Typography.Paragraph> */}
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={5}>
        {/* <NextLink href="/business/learning/students"> */}
        <Card hoverable className="rounded-lg text-center h-full">
          <Space className="justify-between w-full">
            <Typography.Title level={5} className="mb-0">
              Total students
            </Typography.Title>
            <Avatar
              size={48}
              icon={<UsergroupAddOutlined />}
              className="flex justify-center items-center bg-purple-60 text-purple-500"
            />
          </Space>
          <Typography.Title level={1} className="my-2">
            {/* 31.3K */}
            {courseStat?.students || 0}
          </Typography.Title>
          <Space className="gap-2 w-full">
            <Typography.Paragraph className="font-semibold italic">
              Total number of students for all your courses
            </Typography.Paragraph>
            {/* <Typography.Title
                level={5}
                type="danger"
                className="mb-0 flex gap-1 items-center"
              >
                <FallOutlined />
                17%
              </Typography.Title>
              <Typography.Paragraph className="mb-0">
                VS PREV. 28 DAYS
              </Typography.Paragraph> */}
          </Space>
        </Card>
        {/* </NextLink> */}
      </Col>
      <Col xs={24} sm={12} xl={6}>
        <Card hoverable className="rounded-lg h-full">
          <Space className="justify-between w-full">
            <Typography.Title level={5} className="mb-0">
              Countries with student
            </Typography.Title>
            <Avatar
              size={48}
              icon={<GlobalOutlined />}
              className="flex justify-center items-center bg-orange-50 text-orange-500"
            />
          </Space>
          <Typography.Title level={1} className="">
            {courseStat?.countries.length || 0}
          </Typography.Title>
          <Space className="gap-2 w-full">
            <Typography.Paragraph className="mb-0">
              {/* 80% in the United States */}
              Total number of Countries that you have a student from
            </Typography.Paragraph>
          </Space>
        </Card>
      </Col>
      <Col xs={24} sm={12} xl={8}>
        <Card hoverable className="rounded-lg h-full">
          <Typography.Paragraph>Top student locations</Typography.Paragraph>
          <div className=" [&>div>div>div>div>div]:bg-purple-500 h-full">
            {(Array.isArray(courseStat?.countries) ? courseStat.countries : [])
              .length > 0 ? (
              courseStat.countries
                .sort(
                  (a: any, b: any) => b?.enrollmentCount - a?.enrollmentCount
                ) // Sort in descending order
                .slice(0, 4) // Get the top 4 countries
                .map((country: any) => {
                  const progressPercent: any = (
                    (country?.enrollmentCount / courseStat?.students) *
                    100
                  ).toFixed(2);
                  return (
                    <div
                      key={country?.country}
                      className="flex justify-between gap-1 w-full"
                    >
                      <Typography.Title level={5} className="mb-0">
                        {getCountry(country?.country)}
                      </Typography.Title>
                      <Progress percent={progressPercent} className="w-3/5" />
                    </div>
                  );
                })
            ) : (
              <div className="flex justify-center items-center h-[120px]">
                <Typography.Paragraph className="font-bold text-base">
                  No Countries
                </Typography.Paragraph>
              </div>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default StatList;
