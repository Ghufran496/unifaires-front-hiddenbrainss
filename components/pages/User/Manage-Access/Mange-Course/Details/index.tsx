"use client";
import React, { Fragment, useEffect, useState } from "react";
// next
// antd and Icon components
import { Table, Typography, Breadcrumb } from "antd";
import { CourseInt } from "@/app/utils/interface";
import Container from "@/components/shared/container";
import { useParams, useRouter } from "next/navigation";
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ColumnsType } from "antd/es/table";

const CourseDetails = () => {
  const { data: session, status } = useSession();
  const [course, setCourse] = useState<CourseInt>();
  const router = useRouter();
  const params = useParams();

  const fetchCourseDetails = async () => {
    await axios
      .get(`${config.API.API_URL}/course/${params?.courseId}`, {
        headers: { "x-token": session?.user?.token },
      })
      .then((res) => {
        setCourse(res?.data?.data);
      });
  };
  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const columns: ColumnsType<object> = [
    {
      dataIndex: "title",
      key: "title",
    },
    {
      dataIndex: "value",
      align: "right",
      key: "value",
    },
  ];

  const data = [
    {
      title: "Course:",
      key: "1",
      value: `${course?.title}`,
    },
    {
      title: "Course Description",
      key: "2",
      value: `${course?.description}`,
    },
    {
      title: "Created:",
      key: "3",
      value: new Date(`${course?.createdAt}`).toDateString(),
    },
    {
      title: "Last Updated:",
      key: "4",
      value: new Date(`${course?.updatedAt}`).toDateString(),
    },
    {
      title: "Instructor/Contact Person",
      key: "5",
      value: `${
        course?.instructors[0]?.name === undefined
          ? "No instructor"
          : course?.instructors[0]?.name
      }`,
    },
    {
      title: "Total View:",
      key: "6",
      value: 300,
    },
    {
      title: "Ratings:",
      key: "7",
      value: 4.7,
    },
    {
      title: "Total Students:",
      key: "8",
      value: 700,
    },
    {
      title: "Organization:",
      key: "9",
      value: `${course?.organizationName}`,
    },
    {
      title: "Tuition & Cost:",
      key: "10",
      value: `${
        course?.pricing?.type === "free" ||
        course?.pricing?.amount === undefined
          ? "free"
          : course?.pricing?.amount
      }`.toLocaleString(),
    },
    {
      title: "Total Revenue:",
      key: "11",
      value: 500,
    },
    {
      title: "Currency:",
      key: "12",
      value: `${
        course?.pricing?.currency === undefined
          ? "USD"
          : course?.pricing?.currency
      }`.toUpperCase(),
    },
  ];

  return (
    <Fragment>
      <section className="content-header border-b">
        <Container fluid className="p-6">
          <Typography.Title level={2}>My learning</Typography.Title>
          <Typography.Paragraph>
            Check out Organizations that are making the most impact on Funding,
            Grants, and Scholarship
          </Typography.Paragraph>
          <Breadcrumb
            items={[
              {
                title: "Published Courses",
                href: "/user/business-access/learning/courses",
              },
              { title: "Course Detail" },
            ]}
          />
        </Container>
      </section>
      <section className="content-hero mt-6">
        <Container fluid className="px-6 pb-2">
          <Typography.Title level={3}>Course Details</Typography.Title>
          <div className="p-6 mb-3 rounded-lg bg-grey-200">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              showHeader={false}
              className="p-4"
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default CourseDetails;
