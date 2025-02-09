"use client";

import { Button, Card, Col, Row, Typography, Checkbox } from "antd";
import React from "react";

const PreviewPage = () => {
  const { Title, Paragraph } = Typography;

  return (
    <div>
      <section className="xl:px-40 px-5 py-10">
        <Row gutter={[16, 16]}>
          <Col xl={24}>
            <Title level={3} className="text-purple-50">
              Preview Application
            </Title>
          </Col>

          <Col xl={24} className="pt-2">
            <Card className="bg-[#F8F9FA] rounded-lg ">
              <Row gutter={[16, 32]}>
                <Col xl={24} sm={24} xs={24}>
                  <Title level={5}> Basic Info</Title>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Organization
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        BASF AG
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Contact Phone
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        +49 152 85712149{" "}
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Work Language
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        German
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Contact Name
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Chigbo Remy Ahamefula
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Work Country
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Germany
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Contact Business Email
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Info@unifares.com
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Postal Code
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        50997
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Name Of Position
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Account Manager
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        City
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Cologne
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Estimated Salary Range
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        £100,000 & Above
                      </Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-2">
            <Card className="bg-[#F8F9FA] rounded-lg ">
              <Row>
                <Col xl={24} sm={24} xs={24}>
                  <Title level={5}> Description </Title>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Paragraph className=" text-sm">
                    . Drive strategic growth through new business and high
                    profile key accounts.
                  </Paragraph>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Paragraph className=" text-sm">
                    . To develope and maintain complex deals both through
                    exhibition and sponsorship sales.
                  </Paragraph>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Paragraph className=" text-sm">
                    . To ensure all business are transacted at optimal margin
                    levels.{" "}
                  </Paragraph>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Paragraph className=" text-sm">
                    . Build client relationships in order to drive client
                    outcomes and ensure overall growth of the exhibition.
                  </Paragraph>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Paragraph className=" text-sm">
                    . Research and understand the market sector in order to
                    drive the events success through sales and market
                    intelligence.
                  </Paragraph>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24} className="py-2">
            <Card className="bg-[#F8F9FA] rounded-lg ">
              <Row gutter={[16, 32]}>
                <Col xl={24} sm={24} xs={24}>
                  <Title level={5}> Experience & Education </Title>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Job Type
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Temporary & Contract
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Years of Experience
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Mid-Senior
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Job Title
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Bill & Account Collector
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Hiring Process
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Recruitment Agency
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Job Role
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        People Manager
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Hightest Education Level
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Bachelor’s Degree
                      </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={12} sm={12} xs={12}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-sm">
                        Work Style
                      </Paragraph>
                    </Col>

                    <Col xl={24} sm={24} xs={24}>
                      <Title level={5} className="text-sm">
                        Remote
                      </Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24}>
            <Card className="bg-[#F8F9FA] rounded-lg ">
              <Row gutter={[16, 32]}>
                <Col xl={24} sm={24} xs={24}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-lg">
                        Skils & Expertise
                      </Paragraph>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Fellow </Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Representative</Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative </Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Resident </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-lg">
                        Occupation Area
                      </Paragraph>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Fellow </Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Representative</Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative </Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Resident </Title>
                    </Col>
                  </Row>
                </Col>

                <Col xl={24} sm={24} xs={24}>
                  <Row>
                    <Col xl={24} sm={24} xs={24}>
                      <Paragraph className="text-[#ADB5BD] text-lg">
                        Industry sector
                      </Paragraph>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Fellow </Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Representative</Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative </Title>
                    </Col>

                    <Col xl={6}>
                      <Title level={5}> Administrative Resident </Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xl={24} sm={24} xs={24}>
            <Checkbox value="A" checked>
              I understand that I will pay $99.99 to process the application
            </Checkbox>
          </Col>

          <Col xl={24} sm={24} xs={24} className="xl:px-40 py-10">
            <Button type="primary" size="large" block className="rounded-md">
              Process Application
            </Button>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default PreviewPage;
