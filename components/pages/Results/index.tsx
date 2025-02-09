"use client";

import {
  Row,
  Col,
  Typography,
  Select,
  Button,
  Input,
  Checkbox,
  Collapse,
  Space,
} from "antd";

import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import CourseCard from "@/components/shared/cards/CourseCard";

const ResultPage = () => {
  const { Title, Paragraph } = Typography;

  const { Panel } = Collapse;

  return (
    <div>
      <section className="p-10">
        <Row>
          <Col xl={20} sm={24} xs={24} className="pt-5">
            <Paragraph>
              1-24 of over 20,000 results for “Sales, Finance, Business &
              Management”
            </Paragraph>
          </Col>
          <Col xl={4} sm={24} xs={24} className="xl:pt-5">
            <Select
              defaultValue="Sort by: Featured"
              allowClear
              options={[
                {
                  value: "job",
                  label: "job",
                },
              ]}
            />
          </Col>
        </Row>
      </section>

      <section className="xl:px-10 p-5 xl:py-20">
        <Row gutter={16}>
          <Col xl={6} className="pr-10">
            <Collapse
              defaultActiveKey={[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
              ]}
              ghost
              expandIconPosition="end"
            >
              <Panel
                header={
                  <Title level={5} className="text-black">
                    Job Function
                  </Title>
                }
                key="1"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Job Function"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Product Design</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Human Resource Management</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Engineering</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Partner Relations</Checkbox>
                  </Col>
                </Row>
              </Panel>
              <Panel
                header={
                  <Title level={5} className="text-black">
                    Job Title
                  </Title>
                }
                key="2"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Job Title"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Product Designer</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Electrical Engineer</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Fullstack Developer</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Art Director</Checkbox>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Estimated Yearly Salary Range
                  </Title>
                }
                key="3"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24}>
                    <Checkbox>Not Stated</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Under $15,000</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>$15,000 - $20,000</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>$25,000 - $30,000</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>$30,000 - $75,000</Checkbox>
                  </Col>
                </Row>

                <Space size="large" className="pt-5">
                  <Button size="small" className="bg-[#E9ECEF]">
                    $min
                  </Button>
                  <Button className="bg-[#E9ECEF]" size="small">
                    $max
                  </Button>
                  <Button type="primary" shape="round" size="small">
                    Go
                  </Button>
                </Space>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Job Sector
                  </Title>
                }
                key="4"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Job Sector"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Financial Services</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Colleges,Universities & Research</Checkbox>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Levels of Education
                  </Title>
                }
                key="5"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Educational level"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Less than high school</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>High school diploma</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Professional Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Associate Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Higher national diploma</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Foundation Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>MBA & Executive Education</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Bachelor’s Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Master’s Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Doctoral Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>All</Checkbox>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Majors & Discipline
                  </Title>
                }
                key="6"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search majors & discipline"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Law Firms & Legal Services</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>manufacturing</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Professional Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    {/* <Checkbox>Media & Internet</Checkbox> */}
                    <Collapse
                      defaultActiveKey={["2"]}
                      ghost
                      expandIconPosition="end"
                      className="-ml-4"
                    >
                      <Panel
                        header={<Checkbox>Media & Internet</Checkbox>}
                        key="444"
                      >
                        <Row>
                          <Col xl={24}>
                            <Checkbox>Media</Checkbox>
                          </Col>

                          <Col xl={24}>
                            <Checkbox>Data collection & internet</Checkbox>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Skills & Expertise
                  </Title>
                }
                key="7"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Skills & Expertise"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Law Firms & Legal Services</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>manufacturing</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Professional Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    {/* <Checkbox>Media & Internet</Checkbox> */}
                    <Collapse
                      defaultActiveKey={["2"]}
                      ghost
                      expandIconPosition="end"
                      className="-ml-4"
                    >
                      <Panel
                        header={<Checkbox>Media & Internet</Checkbox>}
                        key="444"
                      >
                        <Row>
                          <Col xl={24}>
                            <Checkbox>Media</Checkbox>
                          </Col>

                          <Col xl={24}>
                            <Checkbox>Data collection & internet</Checkbox>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    State or Province
                  </Title>
                }
                key="8"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="State or Province"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Washington</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Georgia</Checkbox>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Country & City
                  </Title>
                }
                key="9"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Country & City"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>All</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>United States</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Collapse
                      defaultActiveKey={["3"]}
                      ghost
                      expandIconPosition="end"
                      className="-ml-4"
                    >
                      <Panel header={<Checkbox>Nigeria</Checkbox>} key="445">
                        <Row>
                          <Col xl={24}>
                            <Checkbox>Lagos </Checkbox>
                          </Col>

                          <Col xl={24}>
                            <Checkbox>Abuja</Checkbox>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Language{" "}
                  </Title>
                }
                key="10"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Language"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>English </Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>German</Checkbox>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Search Job Type
                  </Title>
                }
                key="10"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder="Search Language"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Individual contributor </Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>People manager</Checkbox>
                  </Col>
                </Row>
              </Panel>

              <Panel
                header={
                  <Title level={5} className="text-black">
                    Experience Level
                  </Title>
                }
                key="11"
              >
                <Row gutter={[16, 4]}>
                  <Col xl={24} className="py-2">
                    <Input
                      placeholder=" Search Experience Level"
                      suffix={<SearchOutlined />}
                    />
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Junior & Associate </Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Mid senior </Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Apprenticeship</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Senior </Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Working Student</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Manager & Team Lead</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Executive & C Level</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Entry</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Master’s Degree</Checkbox>
                  </Col>

                  <Col xl={24}>
                    <Checkbox>Product Owner</Checkbox>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>

          <Col xl={18}>
            <Row gutter={[16, 16]}>
              <Col xl={24} sm={24} xs={24}>
                <Title
                  level={3}
                  className="text-black md:text-left text-center  pt-5"
                >
                  RESULTS
                </Title>
              </Col>

              {/* {courses.slice(0, 16).map((course) => {
                return (
                  <Col key={`course-item-${course.id}`} md={12} lg={8} xl={6}>
                    <CourseCard {...course} />
                  </Col>
                );
              })} */}
            </Row>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default ResultPage;
