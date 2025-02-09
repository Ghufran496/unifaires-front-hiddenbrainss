"use client";
import {
  Row,
  Col,
  Typography,
  Tabs,
  Form,
  Input,
  Select,
  Divider,
  Checkbox,
  Button,
} from "antd";
import Image from "next/image";
import hire from "@/public/images/hireframe.png";
import React from "react";

const HirePage = () => {
  const { Title, Paragraph } = Typography;
  const { Option } = Select;

  const onChange = (key: string) => {
    console.log(key);
  };
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <section className="bg-purple-50 xl:px-20 px-5 py-10">
        <Row>
          <Col xl={12} className="xl:pt-32 pt-5">
            <Row>
              <Col xl={24}>
                <Title className="text-white"> Hire a vetted talent</Title>
              </Col>

              <Col xl={14}>
                <Paragraph className="text-white">
                  With flexible recruitment hire on-demand expert on a contract
                  and permanent basis, faster. Get matched to IT professionals,
                  business consultants, finance experts & more across different
                  occupational areas.
                </Paragraph>
              </Col>
            </Row>
          </Col>

          <Col xl={12} sm={24} xs={24}>
            <Image src={hire} alt="hire" />
          </Col>
        </Row>
      </section>

      <section className="bg-white xl:px-80 px-5 pt-10">
        <Row>
          <Col xl={24} sm={24} xs={24}>
            <Tabs
              defaultActiveKey="1"
              onChange={onChange}
              centered
              items={[
                {
                  label: "Hire Vetted Talent",
                  key: "1",
                  children: (
                    <Row>
                      <Col xl={24}>
                        <Title level={3} className="text-purple-50">
                          Account Manager
                        </Title>
                      </Col>

                      <Col xl={24} sm={24} xs={24}>
                        <Form
                          name="normal_login"
                          initialValues={{ remember: true }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                          layout="vertical"
                        >
                          <Row gutter={32}>
                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="email"
                                label="Organization "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="BASF AG"
                                  className="rounded-md"
                                  size="large"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="Work-Language"
                                label="Work Language"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  // onChange={onGenderChange}
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="WorkCountry "
                                label="Work Country "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="BASF AG"
                                  className="rounded-md"
                                  size="large"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={6} sm={24} xs={24}>
                              <Form.Item
                                name="Postal Code "
                                label="Postal Code "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={6} sm={24} xs={24}>
                              <Form.Item
                                name="City"
                                label="City "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="ContactPhone  "
                                label="Contact Phone  "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="BASF AG"
                                  className="rounded-md"
                                  size="large"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="ContactPhone  "
                                label="Contact Name   "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="BASF AG"
                                  className="rounded-md"
                                  size="large"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="ContactBusinessEmail *  "
                                label="Contact Business Email "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Divider />

                            <Col xl={24} sm={24} xs={24}>
                              <Form.Item
                                name="NameOfPosition "
                                label="Name Of Position "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Account Manager"
                                  className="rounded-md"
                                  size="large"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={24} sm={24} xs={24}>
                              <Form.Item
                                name="Postal Code "
                                label="Postal Code "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={24} sm={24} xs={24}>
                              <Form.Item
                                name="Description  "
                                label="Description "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  placeholder="Account Manager"
                                  className="rounded-md py-10"
                                  size="large"
                                />
                              </Form.Item>
                            </Col>

                            <Col xl={24} sm={24} xs={24}>
                              <Form.Item
                                name="HightestEducationLevel "
                                label="Hightest Education Level  "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={24} sm={24} xs={24}>
                              <Form.Item
                                name="Industry  "
                                label="Industry "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="JobTitle  "
                                label="Job Title "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your Job Title !",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="WorkStyle "
                                label="Work Style "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="Job Role  "
                                label="Job Role  "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="YearsofExperience "
                                label="Years of Experience "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="Job Type "
                                label="Job Type  "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={12} sm={24} xs={24}>
                              <Form.Item
                                name="Hiring Process"
                                label="Hiring Process "
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your email!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select a option and change input text above"
                                  allowClear
                                  size="large"
                                >
                                  <Option value="male">male</Option>
                                  <Option value="female">female</Option>
                                  <Option value="other">other</Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col xl={24} sm={24} xs={24}>
                              <Title level={4}>
                                Skils & Expertise
                                <span className="text-red-600">*</span>
                              </Title>
                            </Col>

                            <Col xl={24} sm={24} xs={24}>
                              <Form.Item
                                name="checkgroup"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Choose one Skill",
                                  },
                                ]}
                              >
                                <Checkbox.Group>
                                  <Row gutter={[16, 32]}>
                                    <Col span={8}>
                                      <Checkbox value="A">
                                        3D Animation,Graphic Design &
                                        Illustration{" "}
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="B">Accountant</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="C">
                                        Accounting & Finance
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="D">
                                        Architectural Design
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="E">Big Data</Checkbox>
                                    </Col>

                                    <Col span={8}>
                                      <Checkbox value="f">
                                        Book Keeping
                                      </Checkbox>
                                    </Col>
                                  </Row>
                                </Checkbox.Group>
                              </Form.Item>
                            </Col>

                            <Col xl={24}>
                              <Title level={4}>
                                Occupation Area
                                <span className="text-red-600">*</span>
                              </Title>
                            </Col>

                            <Col xl={24}>
                              <Form.Item
                                name="checkgroup"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Choose one Skill",
                                  },
                                ]}
                              >
                                <Checkbox.Group>
                                  <Row gutter={[16, 32]}>
                                    <Col span={8}>
                                      <Checkbox value="A">
                                        3D Animation,Graphic Design &
                                        Illustration{" "}
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="B">Accountant</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="C">
                                        Accounting & Finance
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="D">
                                        Architectural Design
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="E">Big Data</Checkbox>
                                    </Col>

                                    <Col span={8}>
                                      <Checkbox value="f">
                                        Book Keeping
                                      </Checkbox>
                                    </Col>
                                  </Row>
                                </Checkbox.Group>
                              </Form.Item>
                            </Col>

                            <Col xl={24}>
                              <Title level={4}>
                                Industry Sector
                                <span className="text-red-600">*</span>
                              </Title>
                            </Col>

                            <Col xl={24}>
                              <Form.Item
                                name="checkgroup"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Choose one Skill",
                                  },
                                ]}
                              >
                                <Checkbox.Group>
                                  <Row gutter={[16, 32]}>
                                    <Col span={8}>
                                      <Checkbox value="A">
                                        3D Animation,Graphic Design &
                                        Illustration{" "}
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="B">Accountant</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="C">
                                        Accounting & Finance
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="D">
                                        Architectural Design
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="E">Big Data</Checkbox>
                                    </Col>

                                    <Col span={8}>
                                      <Checkbox value="f">
                                        Book Keeping
                                      </Checkbox>
                                    </Col>
                                  </Row>
                                </Checkbox.Group>
                              </Form.Item>
                            </Col>

                            <Col xl={24}>
                              <Title level={4}>
                                Career Major Program
                                <span className="text-red-600">*</span>
                              </Title>
                            </Col>

                            <Col xl={24}>
                              <Form.Item
                                name="checkgroup"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Choose one Skill",
                                  },
                                ]}
                              >
                                <Checkbox.Group>
                                  <Row gutter={[16, 32]}>
                                    <Col span={8}>
                                      <Checkbox value="A">
                                        3D Animation,Graphic Design &
                                        Illustration{" "}
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="B">Accountant</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="C">
                                        Accounting & Finance
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="D">
                                        Architectural Design
                                      </Checkbox>
                                    </Col>
                                    <Col span={8}>
                                      <Checkbox value="E">Big Data</Checkbox>
                                    </Col>

                                    <Col span={8}>
                                      <Checkbox value="f">
                                        Book Keeping
                                      </Checkbox>
                                    </Col>
                                  </Row>
                                </Checkbox.Group>
                              </Form.Item>
                            </Col>

                            <Col xl={24} className="py-10">
                              <Form.Item
                                name="checkgroup"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Choose one Skill",
                                  },
                                ]}
                              >
                                <Button type="primary" size="large" block>
                                  Preview
                                </Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </Col>
                    </Row>
                  ),
                },
                {
                  label: "Vet My Talent",
                  key: "2",
                  children: <p>vet talent</p>,
                },
              ]}
            />
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HirePage;
