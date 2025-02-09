"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Col, Grid, Row, Skeleton, Spin, Typography } from "antd";
import axiosInstance from "@/app/utils/axios-config";
import CourseCard from "../Courses/CourseCard";
import FundingsCard from "../Funding/FundingsCard";
import JobsCard from "../career/JobsCard";
import SideFilter from "./SideFilter";
import { LoadingOutlined } from "@ant-design/icons";

const GeneralSearchPage = () => {
  const [searchData, setSearchData] = useState<any>([]);
  const [fetching, setFetching] = useState(true);
  const [category, setCategory] = useState();
  const router = useRouter();
  const params = useSearchParams();
  const keyword = params.get("keyword");
  const screens = Grid.useBreakpoint();
  const categoryId = params.get("categoryId");
  console.log(keyword, "here");

  const fetchSearchResults = async () => {
    try {
      setFetching(true);
      const res = await axiosInstance.get(`/search?title=${keyword}`);

      if (res.status) {
        const data = res.data.data.results;
        // const resultCategories = data.map(
        //   (d: any) => d.category || d.fundingCategory || d.jobcategory
        // );
        const getCategory = (d: any) =>
          d.category || d.fundingCategory || d.jobcategory;
        const uniqueCategoriesMap = new Map();

        data.forEach((item: any) => {
          const eachCat = getCategory(item);
          if (eachCat && !uniqueCategoriesMap.has(eachCat.id)) {
            uniqueCategoriesMap.set(eachCat.id, eachCat);
          }
        });

        const uniqueCategories: any = Array.from(uniqueCategoriesMap.values());
        setCategory(uniqueCategories);
        setFetching(false);

        setSearchData(data);
      }
    } catch (error) {
      console.log("Unable to find", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      try {
        axiosInstance.get(`/category/${categoryId}`).then((res) => {
          setCategory(res.data.data);
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    } else {
      try {
        axiosInstance.get("/category").then((res) => {
          setCategory(res.data.data);
          console.log("cat res", res);
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  }, [categoryId]);

  useEffect(() => {
    fetchSearchResults();
  }, [keyword]);

  return (
    <div>
      <div className="p-4">
        <Row gutter={16}>
          {(screens.lg || screens.xxl || screens.xl) && (
            <SideFilter
              category={category}
              //   fetchCourses={fetchCourses}
              //   searchQuery={searchQuery}
              //   setSearchQuery={setSearchQuery}
              //   setCourse={setCourse}
              //   setIsLoading={setIsLoading}
              //   applyLoading={applyLoading}
              //   handleCourseFilters={handleCourseFilters}
              //   selectedFilters={selectedFilters}
              //   setSelectedFilters={setSelectedFilters}
            />
          )}
          <Col xl={18} sm={24} xs={24}>
            <Spin
              spinning={fetching}
              indicator={
                <LoadingOutlined className="flex items-center justify-center h-full text-5xl " />
              }
            >
              <div className="flex flex-row lg:justify-center md:justify-start justify-center gap-4 flex-wrap w-full">
                {searchData !== undefined &&
                  searchData.map((result: any) => {
                    const resultModel = result.model;
                    return (
                      <div
                        key={`result-item-${result.id}`}
                        className="lg:w-fit md:w-fit w-full"
                      >
                        {resultModel === "course" ? (
                          <CourseCard {...result} />
                        ) : resultModel === "fundings" ? (
                          <FundingsCard {...result} />
                        ) : (
                          <JobsCard {...result} />
                        )}
                      </div>
                    );
                  })}
              </div>
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GeneralSearchPage;
