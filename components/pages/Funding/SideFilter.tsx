"use client";

import { CloseOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
import {
  countriesAndCities,
  companiesAndInstitutions,
} from "@/components/Constants";
import {
  Col,
  Typography,
  Divider,
  Collapse,
  Row,
  Input,
  Radio,
  Checkbox,
  Space,
  InputNumber,
  Button,
  Rate,
  DatePicker,
  Grid,
  Select,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios-config";

import { useRouter } from "next/navigation";

import { handleAxiosError } from "@/app/utils/axiosError";
import { CountryListOption } from "@/components/shared/CountryList/countryList";

const SideFilter = ({
  category,
  fetchFundings,
  setIsLoading,
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
  setFunding,
}: any) => {
  const { Title, Paragraph } = Typography;
  const screens = Grid.useBreakpoint();
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
  const [datePicker, setDatePicker] = useState(false);
  const router = useRouter();
  const [minSalary, setMinSalary] = useState<any>();
  const [maxSalary, setMaxSalary] = useState<any>();
  const [allFilters, setAllFilters] = useState<any>();

  // transforms the response of allFilters into an array of title and values for easy mapping and modifications
  function transformAttributeFilterData(originalData: any) {
    const transformed = [];

    function splitCamelCase(str: any) {
      return str.replace(/([a-z])([A-Z])/g, "$1 $2");
    }

    for (const key in originalData) {
      if (originalData.hasOwnProperty(key)) {
        transformed.push({
          title: splitCamelCase(key),
          values: originalData[key].map((item: any) => {
            // Assuming that if there are no values, we return an empty object
            console.log;
            return {
              [key]: item[key] || "",
              fundingCount: item.fundingCount || "0",
            };
          }),
        });
      }
    }

    return transformed;
  }

  const fetchAllFilters = async () => {
    try {
      const res = await axiosInstance.get("/funding/filter-attributes");
      if (res.status) {
        const resData = res.data.data;
        const transformedData = transformAttributeFilterData(resData);
        setAllFilters(transformedData);
      }
    } catch (error) {
      // console.log("Here is the error", error);
      return null;
    }
  };

  useEffect(() => {
    fetchAllFilters();
  }, []);

  const handleCategoryClick = (id: any, name: string) => {
    const newFilters = {
      ...selectedFilters,
      category: name,
    };
    setSelectedFilters(newFilters);
    const queryString = encodeURIComponent(JSON.stringify(newFilters));
    router.push(`/funding?category=${name}&&filterTerms=${queryString}`);
  };

  const handleCountryFilter = async (value: any, searchType: string) => {
    const newSearchQuery = value;
    setSearchQuery(newSearchQuery);
    if (!newSearchQuery) {
      // setJob([]);
      fetchFundings();
      setIsLoading(false);
    } else {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          `/funding?${searchType}=${newSearchQuery}`
        );
        const funding = response.data.data;
        setFunding(funding.funding);
      } catch (error) {
        console.error("Error fetching funding:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (date: any) => {
    const d = new Date(date);
    const month = d.getMonth() + 1; // Months are zero indexed
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleRadioClick = (filterName: string, value: any) => {
    if (filterName == "deadline") {
      const [start, end] = value;
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
      const deadline = [formattedStart, formattedEnd];

      const newFilters = {
        ...selectedFilters,
        [filterName]: deadline,
      };
      setSelectedFilters(newFilters);
      updateURL(newFilters);
    } else {
      const newFilters = {
        ...selectedFilters,
        [filterName]: value,
      };
      setSelectedFilters(newFilters);
      updateURL(newFilters);
    }
  };

  const updateURL = (filters: any) => {
    const queryString = encodeURIComponent(JSON.stringify(filters));
    router.push(`/funding?filterTerms=${queryString}`, undefined);
  };

  function generateRadioOptions(options: any[]) {
    return options.map((option, index) => (
      <Col xl={24} key={index}>
        {option.value ? (
          <Radio value={option.value}>{option.label}</Radio>
        ) : (
          <Radio value={option}>{option}</Radio>
        )}
      </Col>
    ));
  }

  const handleSalaryFilter = () => {
    const newFilters = {
      ...selectedFilters,
      minSalary,
      maxSalary,
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  function toCamelCase(str: string) {
    return str
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  }

  // Transform the response to eliminate and increase job count for multiple filters
  function transformData(data: any[], field: any) {
    // Helper function to safely parse JSON or return original string if invalid
    function safeJsonParse(str: string) {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [str];
      } catch {
        return [str];
      }
    }

    // Reduce the data to aggregate job counts and parse field values
    const transformed = data.reduce((acc, item) => {
      const values = safeJsonParse(item[field]);
      const fundingCount = parseInt(item.fundingCount) || 0;

      values.forEach((value) => {
        // Find if the value already exists in the accumulator
        const existingEntry = acc.find((entry: any) => entry[field] === value);

        if (existingEntry) {
          // If it exists, increase fundingCount
          existingEntry.fundingCount = (
            parseInt(existingEntry.fundingCount) + fundingCount
          ).toString();
        } else {
          // If it doesn't exist, add a new entry
          acc.push({ [field]: value, fundingCount: fundingCount.toString() });
        }
      });

      return acc;
    }, []);

    return transformed;
  }

  return (
    <Fragment>
      <Col xl={6} sm={24} xs={24} className="lg:pr-10 md:pr-6 pr-4">
        {/* <Divider /> */}
        <Collapse defaultActiveKey={["1"]} ghost expandIconPosition="end">
          {/* Categories */}
          <Panel
            header={
              <Title level={4} className="text-black">
                Categories
              </Title>
            }
            key="32"
          >
            <div className="max-h-[500px] overflow-y-scroll custom-scrollbar">
              {category && !Array.isArray(category) ? (
                <div>
                  <div>
                    <LeftOutlined />
                    <Typography.Link
                      className="text-black hover:font-semibold"
                      onClick={() => {
                        setSelectedFilters([]);
                        updateURL([]);
                        router.push("/funding");
                      }}
                    >
                      All
                    </Typography.Link>
                  </div>
                  <div>
                    {category[0].ancestors &&
                      category[0].ancestors !== null &&
                      category[0].ancestors.map((parent: any) => {
                        return (
                          <div key={parent.id} className="flex flex-row gap-2 ">
                            <LeftOutlined />
                            <Typography.Link
                              className="text-black hover:font-semibold"
                              onClick={() =>
                                handleCategoryClick(parent.id, parent.name)
                              }
                            >
                              {parent.name} ({parent.fundingCount})
                            </Typography.Link>
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex flex-row gap-2 ">
                    <Typography.Paragraph className="font-bold mb-0">
                      {category[0].name} ({category[0].fundingCount})
                    </Typography.Paragraph>
                  </div>
                  {category[0].children &&
                    category[0].children.map((child: any) => {
                      return (
                        <div key={child.id} className="ml-4">
                          <Typography.Link
                            className="text-black hover:font-semibold"
                            onClick={() =>
                              handleCategoryClick(child.id, child.name)
                            }
                          >
                            {child.name} ({child.fundingCount})
                          </Typography.Link>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div>
                  <div className="ml-4">
                    {/* <LeftOutlined /> */}
                    <Typography.Link
                      className="text-black font-bold hover:text-blue-600"
                      onClick={() => {
                        setSelectedFilters([]);
                        updateURL([]);
                        router.push("/funding");
                      }}
                    >
                      All
                    </Typography.Link>
                  </div>
                  {category &&
                    category.map((eachCategory: any) => {
                      return (
                        <div key={eachCategory.id} className="ml-4">
                          <Typography.Link
                            className="text-black hover:font-semibold"
                            onClick={() =>
                              handleCategoryClick(
                                eachCategory.id,
                                eachCategory.name
                              )
                            }
                          >
                            {eachCategory.name} ({eachCategory.fundingCount})
                          </Typography.Link>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </Panel>
          {/* Application DeadLine */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Application Deadline
              </Title>
            }
            key="1"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
              // onChange={(e) =>}
              >
                <Radio
                  value={"Anytime"}
                  onChange={(e: any) =>
                    handleRadioClick("deadline", e.target.value)
                  }
                  onClick={() => setDatePicker(false)}
                >
                  Anytime
                </Radio>
                <Radio value={"Fixed"} onClick={() => setDatePicker(true)}>
                  Fixed
                </Radio>
              </Radio.Group>
              {datePicker && (
                <RangePicker
                  onChange={(e: any) => handleRadioClick("deadline", e)}
                  size="middle"
                />
              )}
            </Row>
          </Panel>
          {/* Estimated yearly salary */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Estimated Funding Size
              </Title>
            }
            key="3"
          >
            <Space size="large" className="pt-5">
              <InputNumber
                type="number"
                placeholder="Min"
                onChange={(value) => setMinSalary(value)}
              />
              <InputNumber
                type="number"
                placeholder="Max"
                onChange={(value) => setMaxSalary(value)}
              />
              <Button
                type="primary"
                shape="round"
                size="small"
                onClick={handleSalaryFilter}
              >
                Go
              </Button>
            </Space>
          </Panel>
          {/* Country and City */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Country & City
              </Title>
            }
            key="6"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Col xl={24} className="py-2">
                <Select
                  allowClear
                  mode="tags"
                  showSearch
                  placeholder="Select a Country"
                  optionFilterProp="children"
                  bordered={false}
                  className="w-full border rounded-md hover:border-blue-700 "
                  size="large"
                  filterOption={(
                    input: string,
                    option?: { label: string; value: string }
                  ) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={CountryListOption}
                  onChange={(value) => handleCountryFilter(value, "country")}
                />
                {/* <Input
                  placeholder="Search Country & City"
                  suffix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleCountryFilter(event, "country")
                  }
                /> */}
              </Col>
            </Row>
          </Panel>
          {/* All Other Filters */}
          {allFilters &&
            allFilters.map((eachFilter: any, index: number) => {
              const joinedWord = toCamelCase(eachFilter.title);
              const reformedData = transformData(eachFilter.values, joinedWord);

              const filterOptions = reformedData.map((l: any) => {
                const name = `${l[joinedWord]} (${l?.fundingCount})`;
                return {
                  label: name,
                  value: l[joinedWord],
                };
              });

              // console.log(allFilters);
              if (eachFilter && eachFilter.values.length > 0) {
                return (
                  <Panel
                    header={
                      <Title level={5} className="text-black capitalize">
                        {eachFilter.title}
                      </Title>
                    }
                    key={`${index}+${eachFilter.title}`}
                  >
                    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-scroll custom-scrollbar">
                      <Radio.Group
                        onChange={(e) =>
                          handleRadioClick(joinedWord, e.target.value)
                        }
                      >
                        {generateRadioOptions(filterOptions)}
                      </Radio.Group>
                    </div>
                  </Panel>
                );
              }
            })}
        </Collapse>
        {/*Average Rating */}
      </Col>
    </Fragment>
  );
};

export default SideFilter;
