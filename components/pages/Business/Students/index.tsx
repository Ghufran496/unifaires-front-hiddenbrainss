"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
import NextLink from "next/link";
// antd components
import { Breadcrumb, Pagination, Spin, Typography } from "antd";
// app components
import StatCard from "./StatCard";
import StudentList from "./StudentList";
import Container from "@/components/shared/container";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";

const Students = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId;
  const [loading, setLoading] = useState(false);
  const [allStudent, setAllStudent] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);
  const [searchTerms, setSearchTerms] = useState<any>();

  const fetchAllStudents = async (page: any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(
        `/enrol-course/students/${courseId}?page=${page}&&limit=${pageSize} + ${
          searchTerms
            ? `&&firstname=${searchTerms}&&lastname=${searchTerms}`
            : ""
        }`
      );
      if (res.status) {
        const resData = res.data.data;
        setCurrentPage(resData.currentPage);
        setTotalStudents(resData.count);
        setAllStudent(resData.students);
      }
    } catch (error) {
      console.log("Unable to fetch all Students", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents(currentPage);
  }, [currentPage, courseId, searchTerms]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <Fragment>
      <section className="content-header">
        <Container className="container-fluid p-6">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NextLink href="/business/courses">Published Courses</NextLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Student Progress</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </section>
      <section className="content-header">
        <Container className="container-fluid px-6 pb-6">
          <Typography.Title level={2} className="">
            Student Progress
          </Typography.Title>
          <StatCard />
        </Container>
      </section>
      <section className="content-body">
        <Container className="container-fluid px-6 pb-6">
          <StudentList
            allStudent={allStudent}
            loading={loading}
            setSearchTerms={setSearchTerms}
          />

          <div className="flex justify-end mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalStudents}
              onChange={handlePageChange}
            />
          </div>
        </Container>
      </section>
    </Fragment>
  );
};

export default Students;
