"use client";
import { CloseOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
import {
  applicationFee,
  tuition,
  languageCertificationRequirement,
  subtitleLanguage,
  Language,
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
  Skeleton,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axios-config";
import { useRouter } from "next/navigation";

const SideFilter = ({
  category,
  fetchCourses,
  setIsLoading,
  searchQuery,
  setSearchQuery,
  setCourse,
  applyLoading,
  handleCourseFilters,
  selectedFilters,
  setSelectedFilters,
  skillOption,
  categoryLoading,
}: any) => {
  const { Title, Paragraph } = Typography;
  const screens = Grid.useBreakpoint();
  const { Panel } = Collapse;
  const { RangePicker } = DatePicker;
  const [datePicker, setDatePicker] = useState(false);
  const router = useRouter();

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
            console.log("here is the skill", key);
            return {
              [key]: item[key] || "",
              courseCount: item.courseCount || "0",
            };
          }),
        });
      }
    }

    return transformed;
  }

  const fetchAllFilters = async () => {
    try {
      const res = await axiosInstance.get("/course/filter-attributes");
      if (res.status) {
        const resData = res.data.data;
        const transformedData = transformAttributeFilterData(resData);
        setAllFilters(transformedData);

        console.log(transformedData);
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
    router.push(`/courses?category=${name}&&filterTerms=${queryString}`);
  };

  const handleCountryFilter = async (value: any, searchType: string) => {
    const newSearchQuery = value;
    setSearchQuery(newSearchQuery);
    if (!newSearchQuery) {
      // setJob([]);
      fetchCourses();
      setIsLoading(false);
    } else {
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(
          `/course?${searchType}=${newSearchQuery}`
        );
        const courses = response.data.data;
        setCourse(courses.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
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
    if (filterName == "applicationDeadline") {
      const [start, end] = value;
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);
      const deadline = [formattedStart, formattedEnd];
      // console.log("Formatted Dates:", deadline);
      // console.log(new Date(start));
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
    router.push(`/courses?filterTerms=${queryString}`);
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

  const handleMinMaxValue = (value: number | string | null) => {
    console.log("changed", value);
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

  // Transform the response to eliminate and increase course count for multiple filters
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
      const courseCount = parseInt(item.courseCount) || 0;

      values.forEach((value) => {
        // Find if the value already exists in the accumulator
        const existingEntry = acc.find((entry: any) => entry[field] === value);

        if (existingEntry) {
          // If it exists, increase courseCount
          existingEntry.courseCount = (
            parseInt(existingEntry.courseCount) + courseCount
          ).toString();
        } else {
          // If it doesn't exist, add a new entry
          acc.push({ [field]: value, courseCount: courseCount.toString() });
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
          <Panel
            header={
              <Title level={4} className="text-black">
                Categories
              </Title>
            }
            key="92"
          >
            <Skeleton loading={categoryLoading} active className="p-2">
              <div className="max-h-[500px] overflow-y-scroll custom-scrollbar">
                {/* {category && !Array.isArray(category) ? ( */}
                {category && category.length === 1 ? (
                  <div>
                    <div>
                      <LeftOutlined />
                      <Typography.Link
                        className="text-black hover:font-semibold"
                        onClick={() => {
                          setSelectedFilters([]);
                          updateURL([]);
                          router.push("/courses");
                        }}
                      >
                        All
                      </Typography.Link>
                    </div>
                    <div>
                      {category[0].ancestors &&
                        category[0].ancestors !== null &&
                        category[0].ancestors.map((parent: any) => {
                          // console.log("here is the anscestor", category);
                          return (
                            <div
                              key={parent.id}
                              className="flex flex-row gap-2 "
                            >
                              <LeftOutlined />
                              <Typography.Link
                                className="text-black hover:font-semibold"
                                onClick={() =>
                                  handleCategoryClick(parent.id, parent.name)
                                }
                              >
                                {parent.name} ({parent.courseCount})
                              </Typography.Link>
                            </div>
                          );
                        })}
                    </div>
                    <div className="flex flex-row gap-2 ">
                      <Typography.Paragraph className="font-bold mb-0">
                        {category[0].name} ({category[0].courseCount})
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
                              {child.name} ({child.courseCount})
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
                          router.push("/courses");
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
                              {eachCategory.name} ({eachCategory.courseCount})
                            </Typography.Link>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </Skeleton>
          </Panel>

          {/* Skills and Expertises */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Skills & Expertise
              </Title>
            }
            key="4"
          >
            <div className="py-2">
              <Input
                placeholder="Search Skills & Expertise"
                suffix={<SearchOutlined />}
              />
            </div>
            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-scroll custom-scrollbar">
              <Checkbox.Group
                onChange={(e: any) => handleRadioClick("skills", e)}
                options={skillOption}
              />
            </div>
          </Panel>
          {/* Application DeadLine */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Application Deadline
              </Title>
            }
            key="5"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
              // onChange={(e) =>}
              >
                <Radio
                  value={"Anytime"}
                  onClick={() => {
                    setDatePicker(false);
                    setSelectedFilters([]);
                    router.push("/courses");
                  }}
                >
                  Anytime
                </Radio>
                <Radio value={"Fixed"} onClick={() => setDatePicker(true)}>
                  Fixed
                </Radio>
              </Radio.Group>
              {datePicker && (
                <RangePicker
                  onChange={(e: any) =>
                    handleRadioClick("applicationDeadline", e)
                  }
                  size="middle"
                />
              )}
            </Row>
          </Panel>
          {/* Program Start Date */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Program Start Date
              </Title>
            }
            key="6"
          >
            <RangePicker
              onChange={(e: any) => handleRadioClick("programStartDate", e)}
              size="middle"
            />
          </Panel>

          {/* Tuition & Cost */}
          <Panel
            header={
              <Title level={5} className="text-black">
                Tuition & Cost
              </Title>
            }
            key="14"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("pricing", e.target.value)}
              >
                {generateRadioOptions(applicationFee)}
              </Radio.Group>
            </Row>
            {/* <Space size="large" className="pt-5">
              <InputNumber
                type="number"
                placeholder="Min"
                onChange={handleMinMaxValue}
              />
              <InputNumber
                type="number"
                placeholder="Max"
                onChange={handleMinMaxValue}
              />
              <Button type="primary" shape="round" size="small">
                Go
              </Button>
            </Space> */}
          </Panel>
          {/* All Other Filters  */}
          {allFilters &&
            allFilters.map((eachFilter: any, index: number) => {
              const joinedWord = toCamelCase(eachFilter.title);
              const reformedData = transformData(eachFilter.values, joinedWord);
              const filterOptions = reformedData.map((l: any) => {
                const name = `${l[joinedWord]} (${l?.courseCount})`;
                return {
                  label: name,
                  value: l[joinedWord],
                };
              });

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

          {/* Admission Criteria */}
          {/* <Panel
            header={
              <Title level={5} className="text-black">
                Admission Criteria
              </Title>
            }
            key="15"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("admissionCriteria", e.target.value)
                }
              >
                {generateRadioOptions(admissionCriteria)}
              </Radio.Group>
            </Row>
          </Panel> */}
          {/* Institution Ownership */}
          {/* <Panel
            header={
              <Title level={5} className="text-black">
                Institution Ownership
              </Title>
            }
            key="16"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("institution Ownership", e.target.value)
                }
              >
                {generateRadioOptions(institutionalOwnership)}
              </Radio.Group>
            </Row>
          </Panel> */}
          {/* Course Institution Type */}
          {/* <Panel
            header={
              <Title level={5} className="text-black">
                Course Institutional Type
              </Title>
            }
            key="17"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("courseInstitutionalType", e.target.value)
                }
              >
                {generateRadioOptions(courseInstitutionalType)}
              </Radio.Group>
            </Row>
          </Panel> */}
          {/* Featueres */}
          {/* <Panel
            header={
              <Title level={5} className="text-black">
                Features
              </Title>
            }
            key="18"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) => handleRadioClick("features", e.target.value)}
              >
                {generateRadioOptions(features)}
              </Radio.Group>
            </Row>
          </Panel> */}

          {/* Language certification Requirement */}
          {/* <Panel
            header={
              <Title level={5} className="text-black">
                Langugae Certification Requirement
              </Title>
            }
            key="21"
          >
            <Row gutter={[16, 4]} className="flex md:flex-col">
              <Radio.Group
                onChange={(e) =>
                  handleRadioClick("languageCertification", e.target.value)
                }
              >
                {generateRadioOptions(languageCertificationRequirement)}
              </Radio.Group>
            </Row>
          </Panel> */}
        </Collapse>
        {/*Average Rating */}
        <div className="lg:pl-4 pl-4 mb-4">
          <Typography.Title level={5} className="text-black">
            Average Rating
          </Typography.Title>
          <Row gutter={[16, 4]} className="flex md:flex-col">
            <Radio.Group
              onChange={(e) =>
                handleRadioClick("averageRating", e.target.value)
              }
            >
              <Col xl={24}>
                <Radio value={4}>
                  <Rate allowHalf disabled value={4} /> & Up
                </Radio>
              </Col>
              <Col xl={24}>
                <Radio value={3}>
                  <Rate allowHalf disabled value={3} /> & Up
                </Radio>
              </Col>
              <Col xl={24}>
                <Radio value={2}>
                  <Rate allowHalf disabled value={2} /> & Up
                </Radio>
              </Col>
              <Col xl={24}>
                <Radio value={1}>
                  <Rate allowHalf disabled value={1} /> & Up
                </Radio>
              </Col>
            </Radio.Group>
          </Row>
        </div>
      </Col>
    </Fragment>
  );
};

export default SideFilter;
