/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components and icons
import { Card, Progress, Typography } from "antd";
import { RiseOutlined, BookOutlined, DollarOutlined } from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";

const StatCard = () => {
  const router = useRouter();
  const params = useParams();
  const [courseStat, setCourseStat] = useState<any>();
  const courseId = params.courseId;

  const fetchCourseStat = async () => {
    try {
      const res = await axiosAccessInstance.get(
        `/stats/business-course/${courseId}`
      );
      if (res.status) {
        setCourseStat(res.data.data);
      }
    } catch (error) {
      console.log("unable to fetch single course stat", error);
      // handleAxiosError(error);
    }
  };

  useEffect(() => {
    fetchCourseStat();
  }, [courseId]);

  const formatCurrency = (value: any) => {
    if (!(!Number.isNaN(parseFloat(value)) && parseFloat(value) > 0)) {
      return "0";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  return (
    <Card className="rounded-lg overflow-hidden p-0 [&>div.ant-card-body]:p-0">
      <Card.Grid className="w-full xl:w-1/4 flex justify-between items-center p-3">
        <div className="">
          <Progress
            type="circle"
            width={80}
            percent={100}
            format={() => <DollarOutlined />}
          />
        </div>
        <div className="">
          <Typography.Paragraph className="mb-0">
            Total Revenue
          </Typography.Paragraph>
          <Typography.Title
            level={2}
            className="text-green-500 flex gap-2 items-center my-0"
          >
            {formatCurrency(courseStat?.totalRevenue) || 0}
          </Typography.Title>
        </div>
      </Card.Grid>
      <Card.Grid className="w-full xl:w-[25%] p-3">
        <Typography.Paragraph className="mb-0">
          Total Enrolled
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          {courseStat?.totalStudents || 0}
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress percent={100} steps={3} />
        </Typography.Paragraph>
      </Card.Grid>
      <Card.Grid className="w-full xl:w-[25%] p-3">
        <Typography.Paragraph className="mb-0">
          Total In Progress
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          {courseStat?.totalStudents - courseStat?.totalCompleted || 0}
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress
            percent={
              (courseStat?.totalStudents -
                courseStat?.totalCompleted / courseStat?.totalStudents) *
              100
            }
            steps={3}
          />
        </Typography.Paragraph>
      </Card.Grid>
      <Card.Grid className="w-full xl:w-[25%] p-3">
        <Typography.Paragraph className="mb-0">
          Total Completed
        </Typography.Paragraph>
        <Typography.Title level={2} className="my-0">
          {courseStat?.totalCompleted}
        </Typography.Title>
        <Typography.Paragraph className="mb-0 mt-auto">
          <Progress
            percent={
              (courseStat?.totalCompleted / courseStat?.totalStudents) * 100
            }
            steps={3}
          />
        </Typography.Paragraph>
      </Card.Grid>
    </Card>
  );
};

export default StatCard;
