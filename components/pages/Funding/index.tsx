"use client";
import {
  Row,
  Col,
  Typography,
  Spin,
  Collapse,
  Pagination,
  RadioChangeEvent,
  Button,
  Grid,
  Drawer,
  Skeleton,
  List,
} from "antd";

import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import config from "@/app/utils/config";
import { useSearchParams, useRouter } from "next/navigation";
import FundingsCard from "./FundingsCard";

import SideFilter from "./SideFilter";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError } from "@/app/utils/axiosError";

const FundingsPage = () => {
  const { Title, Paragraph } = Typography;
  const { Panel } = Collapse;
  const screens = Grid.useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);
  const [funding, setFunding] = useState<Array<any>>([]);
  // const [fetchingFunding, setFetchingFunding] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFundings, setTotalFundings] = useState(0);
  const [pageSize, setPageSize] = useState(30);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const [category, setCategory] = useState<any>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterTerms: any = searchParams?.get("filterTerms");
  const categoryName = searchParams?.get("category");
  const [selectedFilters, setSelectedFilters] = useState<any>();
  const [skillOption, setSkillOption] = useState();

  useEffect(() => {
    if (categoryName) {
      try {
        axios
          .get(
            `${config.API.API_URL}/funding-category/funding-category?name=${categoryName}`
          )
          .then((res) => {
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    } else {
      try {
        axios
          .get(`${config.API.API_URL}/funding-category/funding-category`)
          .then((res) => {
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  }, [categoryName]);

  const fetchFundings = async (page: any) => {
    try {
      setIsLoading(true);
      const parsedFilter = filterTerms
        ? JSON.parse(decodeURIComponent(filterTerms))
        : {};

      const queryString = buildQuery(parsedFilter);

      const response = await axiosInstance.get(
        `/funding?page=${page}&limit=${pageSize}&${queryString}`
      );
      if (response.status) {
        const resData = response.data.data;
        setTotalFundings(resData.count);
        setCurrentPage(resData.currentPage);
        setFunding(resData.fundings);
        // console.log("this is the ", response);
      }
    } catch (error) {
      console.error("Error fetching funding:", error);
    } finally {
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
    return query ? `${query}` : "";
  };

  useEffect(() => {
    fetchFundings(currentPage);
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
        className="flex justify-center item-center"
        spinning={isLoading}
        indicator={<LoadingOutlined className="text-6xl" />}
      >
        <section className="xl:px-4 xl:py-10 p-5">
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
                        router.push("/funding");
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
                  //     >
                  //       Apply
                  //     </Button>
                  //   </div>
                  // }
                >
                  <SideFilter
                    category={category}
                    fetchFundings={fetchFundings}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    setFunding={setFunding}
                    setIsLoading={setIsLoading}
                  />
                </Drawer>
              </div>
            )}
          </div>
          <Row gutter={16}>
            {(screens.lg || screens.xxl || screens.xl) && (
              <SideFilter
                category={category}
                fetchFundings={fetchFundings}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                setFunding={setFunding}
                setIsLoading={setIsLoading}
              />
            )}
            <Col xl={18} sm={24} xs={24}>
              <Skeleton active loading={isLoading} className="mt-2 ">
                <div className="flex flex-col gap-1 w-full">
                  <List
                    size="large"
                    itemLayout="vertical"
                    dataSource={funding ? funding : []}
                    // dataSource={coursesList}
                    renderItem={(eachfunding) => (
                      <FundingsCard {...eachfunding} />
                    )}
                  />
                </div>
              </Skeleton>
              <Col className="flex justify-center pt-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalFundings}
                  onChange={handlePageChange}
                />
              </Col>
            </Col>
          </Row>
        </section>
      </Spin>
    </div>
  );
};

export default FundingsPage;
