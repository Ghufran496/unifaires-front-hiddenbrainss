/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Row,
  Col,
  Typography,
  Spin,
  Pagination,
  Button,
  Grid,
  Drawer,
  Skeleton,
  Flex,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import {
  CloseOutlined,
  FilterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import config from "@/app/utils/config";
import { useSearchParams, useRouter } from "next/navigation";
import JobsCard from "./JobsCard";
import SideFilter from "./SideFilter";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/app/utils/axios-config";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { Breadcrumb } from "antd/lib";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";

const CareerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobList, setJobList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [category, setCategory] = useState<any>();
  const [applyLoading, setApplyLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>();
  const [skillOption, setSkillOption] = useState();
  const [catBreadcrumbs, setCatBreadcrumbs] = useState<any>([]);
  const [categoryId, setCategoryId] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [allCategories, setAllCategories] = useState<[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [currency, setCurrency] = useState<string>("USD");
  const [currencyRate, setCurrencyRate] = useState<any>(1);
  const [hideFilter, setHideFilter] = useState<boolean>(false);

  // Functions
  const { Title, Link } = Typography;
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch: any = useAppDispatch();
  const filterTerms: any = searchParams?.get("filterTerms");
  const categoryName = searchParams?.get("category");
  const jobcatId = searchParams?.get("categoryId");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleFilter = () => {
    setFilterCollapsed(true);
  };

  const closeFilter = () => {
    setFilterCollapsed(false);
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getCurrencySymbol = () => {
    return (0)
      .toLocaleString(undefined, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();
  };

  const convertCurrency = (value: any) => {
    return Math.floor(value * currencyRate);
  };
  const serverCurrency = (value: any) => {
    return Math.floor(value / currencyRate);
  };

  const filterCategoryByJobCount = (optionArr: []) => {
    return optionArr.filter(
      (c: { totalJobCount: number }) => c.totalJobCount > 0
    );
  };

  const fetchAllJobCategories = () => {
    try {
      axios.get(`${config.API.API_URL}/job-category`).then((res) => {
        setAllCategories(res.data.data);
        setCategoryOptions(filterCategoryByJobCount(res.data.data));
      });
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async (page: any, catId: string = "") => {
    try {
      !catId && setCatBreadcrumbs([]);
      setIsLoading(true);
      const jobUrlEndpoint = catId
        ? `/jobs?page=${page}&limit=${pageSize}&jobcategoryId=${catId}`
        : `/jobs?page=${page}&limit=${pageSize}`;
      const response = await axiosInstance.get(jobUrlEndpoint);
      if (response.status) {
        const resData = response.data.data;
        const catInfo = resData.category;

        setCategoryId(catInfo.id || null);
        setSelectedCategory(catInfo);
        createBreadcrumbsData(catInfo);
        catId && router.push(`/career?categoryId=${catId}`);
        setSelectedFilters({});
        setJobList(resData.jobs);
        setTotalJobs(resData.count);
        setCurrentPage(resData.currentPage);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
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
    return query ? `&${query}` : ``;
  };

  const getFilteredJobs = async () => {
    try {
      setIsLoading(true);
      const queryString = buildQuery(selectedFilters);
      const res = await axiosInstance.get(
        `/jobs?jobcategoryId=${categoryId}${queryString}`
      );
      if (res.status) {
        const resData = res.data.data;
        const jobs = resData.jobs;
        const catInfo = resData.category;
        if (catInfo.hasOwnProperty("status") && catInfo.status === false) {
          setJobList([]);
          setHideFilter(true);
        } else {
          setHideFilter(false);
          setCategoryId(catInfo.id);
          setSelectedCategory(catInfo);
          createBreadcrumbsData(catInfo);
          searchParams?.get("categoryId") !== catInfo.id &&
            router.push(`/career?categoryId=${catInfo.id}`);
          closeFilter();
          setJobList(jobs);
        }
      }
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function createBreadcrumbsData(cat: any) {
    let breadcrumbs = [];
    while (cat) {
      breadcrumbs.unshift(cat); // Add each category at the beginning
      if (
        typeof cat.ancestors === "object" &&
        cat.ancestors !== null &&
        Object.keys(cat.ancestors).length > 0
      ) {
        cat = cat.ancestors;
      } else {
        cat = null;
      }
    }
    setCatBreadcrumbs(breadcrumbs);
  }

  const PageBreadcrumb = () => {
    const items:
      | Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
      | { title: string | React.JSX.Element }[]
      | undefined = [];
    catBreadcrumbs.forEach((bc: { id: string; name: string }, i: number) => {
      if (i === 0 && categoryId) {
        const item = {
          title: (
            <Link onClick={() => handleAllCategoriesClick()}>
              All Categories
            </Link>
          ),
        };
        items.push(item);
      }
      if (i === catBreadcrumbs.length - 1) {
        const item = {
          title: bc?.name,
        };
        items.push(item);
      } else {
        const item = {
          title: (
            <Link onClick={() => fetchJobs(currentPage, bc?.id)}>
              {bc?.name}
            </Link>
          ),
        };
        items.push(item);
      }
    });

    return <Breadcrumb items={items} />;
  };

  const handleAllCategoriesClick = () => {
    setSelectedCategory({});
    setCategoryId(null);
    router.push("/career");
    fetchJobs(currentPage);
  };

  // Hooks
  useEffect(() => {
    if (allCategories.length === 0) {
      fetchAllJobCategories();
    }
    dispatch(fetchCountries());

    const paramCategoryId = searchParams?.get("categoryId") ?? "";
    if (paramCategoryId || categoryId) {
      fetchJobs(currentPage, paramCategoryId);
    } else {
      fetchJobs(currentPage);
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      getFilteredJobs();
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (categoryName) {
      try {
        axios
          .get(
            `${config.API.API_URL}/job-category/job-category?name=${categoryName}`
          )
          .then((res) => {
            // console.log(res);
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        axios
          .get(`${config.API.API_URL}/job-category/job-category`)
          .then((res) => {
            setCategory(res.data.data);
          });
      } catch (error) {
        console.error("Error fetching category:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [categoryName]);

  const reduxCurrencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );
  useEffect(() => {
    const currencyValue = getCookie("currency");
    if (currencyValue) {
      setCurrency(currencyValue);
    }

    if (reduxCurrencyRate) {
      setCurrencyRate(reduxCurrencyRate);
    }
  }, [reduxCurrencyRate]);

  useEffect(() => {
    if (typeof jobcatId === "string" && jobcatId.trim() !== "") {
      setCategoryId(jobcatId);
      fetchJobs(currentPage, jobcatId);
    }
  }, [jobcatId]);

  // Props
  const sideFilterProps = {
    categoryId,
    hideFilter,
    selectedFilters,
    setSelectedFilters,
    categoryOptions,
    selectedCategory,
    catBreadcrumbs,
    currentPage,
    fetchJobs,
    handleAllCategoriesClick,
    getCurrencySymbol,
    currencyRate,
    convertCurrency,
    serverCurrency,
    formatCurrency,
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
                        router.push("/career");
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
                  //       onClick={handleJobFilters}
                  //       loading={applyLoading}
                  //     >
                  //       Apply
                  //     </Button>
                  //   </div>
                  // }
                >
                  <SideFilter {...sideFilterProps} />
                </Drawer>
              </div>
            )}
          </div>
          <Row gutter={16}>
            {(screens.lg || screens.xxl || screens.xl) && (
              <SideFilter {...sideFilterProps} />
            )}
            <Col xl={12} sm={24} xs={24} className="mt-4">
              {catBreadcrumbs.length > 0 && <PageBreadcrumb />}

              {Object.keys(selectedCategory).length > 0 &&
                selectedCategory.children.length > 0 && (
                  <div className="mb-4">
                    <Title level={4} className="mt-4">
                      Featured Category
                    </Title>
                    <Flex gap="4px 0" wrap>
                      {selectedCategory.children.map((cat: any) => (
                        <Tag
                          key={cat.id}
                          className="hover:font-semibold"
                          color="default"
                          onClick={() => fetchJobs(currentPage, cat.id)}
                          style={{ cursor: "pointer" }}
                        >
                          {cat.name}
                        </Tag>
                      ))}
                    </Flex>
                  </div>
                )}

              <Skeleton active loading={isLoading}>
                {jobList.length === 0 && !isLoading && (
                  <center>
                    <Title level={4} className="mt-4">
                      No Jobs Found
                    </Title>
                  </center>
                )}
                {jobList.length > 0 && (
                  <div className="flex flex-col gap-1 w-full">
                    <Title level={4} className="mt-4">
                      Explore Curated Jobs
                    </Title>
                    {jobList.map((eachJob, index) => (
                      <div key={`job-item-${index}`}>
                        <JobsCard {...eachJob} />
                      </div>
                    ))}
                  </div>
                )}
                {/* <div className="flex flex-col gap-2 w-full">
                  <List
                    size="large"
                    itemLayout="vertical"
                    dataSource={jobList ? jobList : []}
                    // dataSource={coursesList}
                    renderItem={(eachJob) => <JobsCard {...eachJob} />}
                  />
                </div> */}
              </Skeleton>
              <Col className="flex justify-center pt-4">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalJobs}
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

export default CareerPage;
