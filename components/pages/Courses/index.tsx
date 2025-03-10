"use client";
import {
  Grid,
  Row,
  Col,
  Spin,
  Pagination,
  DatePicker,
  Skeleton,
  Drawer,
  Button,
  List,
} from "antd";

import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import config from "@/app/utils/config";
import { useRouter, useSearchParams } from "next/navigation";
import SideFilter from "./SideFilter";
import {
  CloseOutlined,
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";
import { ICourse } from "../Business/Courses/course.interface";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { fetchSkills } from "@/redux/features/UserSlice";
import { useAppDispatch } from "@/redux/hooks";

const CoursesPage = () => {
  const screens = Grid.useBreakpoint();
  // console.log(screens);
  const dispatch: any = useAppDispatch();
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingCourse, setFetchingCourse] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [courseList, setCourseList] = useState<Array<ICourse>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<any>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterTerms: any = searchParams?.get("filterTerms");
  const categoryName = searchParams?.get("category");
  const [applyLoading, setApplyLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const [skillOption, setSkillOption] = useState();

  // Categories functions
  useEffect(() => {
    if (categoryName) {
      try {
        setCategoryLoading(true);
        axios
          .get(
            `${config.API.API_URL}/category/course-category?name=${categoryName}`
          )
          .then((res) => {
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setCategoryLoading(false);
      }
    } else {
      try {
        setCategoryLoading(true);
        axios
          .get(`${config.API.API_URL}/category/course-category`)
          .then((res) => {
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setCategoryLoading(false);
      }
    }
  }, [categoryName]);

  const fetchCourses = async (page: any) => {
    try {
      // setFetchingCourse(true);
      setIsLoading(true);
      const parsedFilter = filterTerms
        ? JSON.parse(decodeURIComponent(filterTerms))
        : {};

      const queryString = buildQuery(parsedFilter);

      const response = await axiosInstance.get(
        `/course?page=${page}&limit=${pageSize}&${queryString}`
      );
      if (response.status) {
        const resData = response.data.data;
        const filteredCourses = Array.isArray(resData?.courses)
          ? resData.courses
          : [];
        setCourseList(filteredCourses);
        setTotalCourses(resData.count);
        setCurrentPage(resData.currentPage);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      // setFetchingCourse(false);
      setIsLoading(false);
    }
  };

  const buildQuery = (params: { [key: string]: any }) => {
    const query = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .flatMap(([key, value]) =>
        Array.isArray(value)
          ? value.map(
              (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            )
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    // return query ? `?${query}` : "";
    return query ? `${query}` : "";
  };

  const fetchCourseSkills = async () => {
    try {
      const response = await axiosInstance.get("/skills/course-skills");
      if (response.status) {
        const skills = response.data.data;
        // console.log("here is the", skills);
        const optionsForSkills = skills.map((s: any) => {
          const name = `${s.name} (${s.courseCount})`;
          return {
            label: name,
            value: s.name,
          };
        });
        setSkillOption(optionsForSkills);
      }
    } catch (error) {
      console.error("Error fetching skills", error);
    }
  };

  useEffect(() => {
    fetchCourseSkills();
    fetchCourses(currentPage);
  }, [currentPage, filterTerms]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFilter = () => {
    setFilterCollapsed(true);
  };

  const closeFilter = () => {
    setFilterCollapsed(false);
  };

  return (
    <div>
      <Spin
        className="flex justify-center item-center h-full"
        spinning={isLoading}
        indicator={<LoadingOutlined className="text-6xl" />}
      >
        <section className="xl:px-6 xl:py-10 p-2">
          <div className="mb-4">
            {(screens.xs || screens.sm || screens.md) && !screens.lg && (
              <div>
                <div className="flex  ">
                  <Button
                    size="large"
                    type="default"
                    className="flex items-center justify-center ml-auto rounded-[6px]"
                    onClick={toggleFilter}
                    icon={
                      !filterCollapsed ? <FilterOutlined /> : <CloseOutlined />
                    }
                  >
                    Filter{" "}
                  </Button>
                </div>
                <Drawer
                  // closable={false}
                  placement="right"
                  open={filterCollapsed}
                  onClose={closeFilter}
                  width={320}
                  extra={
                    <Button
                      size="large"
                      type="text"
                      className="flex justify-center items-center text-blue-600"
                      onClick={() => {
                        setSelectedFilters([]);
                        router.push("/courses");
                      }}
                    >
                      Clear Filter
                    </Button>
                  }
                  // footer={
                  //   <div className="flex items-center justify-center w-full">
                  //     <Button
                  //       size="large"
                  //       type="primary"
                  //       className="flex justify-center items-center w-full bg-blue-600 rounded-[6px]"
                  //       onClick={handleCourseFilters}
                  //       loading={applyLoading}
                  //     >
                  //       Apply
                  //     </Button>
                  //   </div>
                  // }
                >
                  <SideFilter
                    category={category}
                    fetchCourses={fetchCourses}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setCourseList={setCourseList}
                    setIsLoading={setIsLoading}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    skillOption={skillOption}
                    categoryLoading={categoryLoading}
                  />
                </Drawer>
              </div>
            )}
          </div>
          <Row gutter={16}>
            {(screens.lg || screens.xxl || screens.xl) && (
              <SideFilter
                category={category}
                fetchCourses={fetchCourses}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setCourseList={setCourseList}
                setIsLoading={setIsLoading}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                skillOption={skillOption}
                categoryLoading={categoryLoading}
              />
            )}
            <Col xl={18} sm={24} xs={24}>
              {/* <Spin spinning={isLoading} size="large"> */}
              <Skeleton
                active
                loading={fetchingCourse}
                className="min-h-[400px]"
              >
                <div className="flex flex-col gap-1 w-full">
                  <List
                    size="large"
                    itemLayout="vertical"
                    dataSource={courseList ? courseList : []}
                    // dataSource={coursesList}
                    renderItem={(eachCourse) => <CourseCard {...eachCourse} />}
                  />
                </div>
              </Skeleton>
              {/* </Spin> */}
              <Col className="flex justify-center pt-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalCourses}
                  onChange={handlePageChange}
                  className="flex ml-auto pt-4"
                />
              </Col>
            </Col>
          </Row>
        </section>
      </Spin>
    </div>
  );
};

export default CoursesPage;
