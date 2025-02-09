/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Typography,
  Select,
  Checkbox,
  Divider,
  message,
  Modal,
  Result,
} from "antd";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { businessTypeOption, companySizeOption } from "@/components/Constants";
import { handleAxiosError, showError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { CountryDialCodeOption } from "@/components/shared/CountryList/countryList";

interface RegistrationProps {
  Firstname: string;
  Lastname: string;
  CompanyName: string;
  JobTitle: string;
  BusinessEmail: string;
  BusinessPhone: string;
  Country: string;
  BirthDate: string;
  BusinessType: string;
  CompanySize: string;
  password: string;
  confirm: string;
  checkbox: boolean;
}

const SignupBusinessPage = () => {
  const { Title, Paragraph, Link } = Typography;
  const [checked, setChecked] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [phoneCountryCode, setPhoneCountryCode] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const Countries = useAppSelector((state: any) => state.country.countries);
  const countryOptions = Countries.map((c: any) => {
    return {
      label: c.name,
      value: c.code,
    };
  });

  const onChange = (e: CheckboxChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const router = useRouter();

  const onFinish = async (val: RegistrationProps) => {
    val["BirthDate"] = moment(val.BirthDate).format("YYYY-MM-DD");
    const filteredValue = {
      // fullname: `${val.Firstname} ${val.Lastname}`,
      firstname: val.Firstname,
      lastname: val.Lastname,
      email: val.BusinessEmail,
      password: val.password,
      companyName: val.CompanyName,
      title: val.JobTitle,
      phone: phoneCountryCode + "-" + val.BusinessPhone,
      country: val.Country,
      businessType: val.BusinessType,
      companySize: val.CompanySize,
    };
    const options = {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredValue),
    };
    if (!checked) {
      showError("Please agree to the terms of use");
      // Display an error message or handle it as needed
      return;
    } else {
      try {
        setLoading(true);
        const res = await axiosInstance.post("/business", filteredValue);
        if (res.status) {
          setIsModalOpen(true);
        }
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row>
        <Col xl={8} className="bg-[#F2F0F9] py-32 px-10 xl:block hidden">
          <Title level={2} className=" text-purple-50">
            Give your people the opportunity to reach their potential!
          </Title>
          <Paragraph className="text-purple-50">
            Our platform offers a holistic approach to corporate and individual
            closing of skills and talent gaps. We provide the necessary tools
            for you to amke education and career decisions based on personalized
            labor market intellegence and skills gap analytics insights.
          </Paragraph>

          <Divider />

          <ul className="list-decimal text-purple-50 ">
            <li className="mb-2">
              Business and digital technology career coaching tailored to your
              occupation goals
            </li>

            <li className="mb-2">
              Standardization of job posting to attract the right talent
            </li>

            <li className="mb-2">
              Access to in-demand skills e-learning resources
            </li>

            <li className="mb-2">
              Skills gap analytics and labor market intelligence
            </li>
          </ul>
        </Col>

        <Col xl={16} sm={24} xs={24} className="xl:px-20  px-5 xl:pt-20 pt-5">
          <Image src={logo} alt="logo" width={200} height={58} />
          <Paragraph className="text-purple-50 font-semibold py-5">
            Sign Up to avail exciting Opportunities to your fingertips!
          </Paragraph>

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
                  name="Firstname"
                  label="First name "
                  rules={[
                    {
                      required: true,
                      message: "Please input your First name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="First name"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="Lastname"
                  label="Last name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Last name"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="CompanyName"
                  label="Company Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company Name !",
                    },
                  ]}
                >
                  <Input
                    placeholder="Company Name"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="JobTitle"
                  label="Job Title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Job Title !",
                    },
                  ]}
                >
                  <Input
                    placeholder="Job Title"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="BusinessEmail"
                  label="Business Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Business Email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Business Email"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="BusinessPhone"
                  label="Business Phone"
                  rules={[
                    {
                      validator: (_, value: any) => {
                        const nonDigitRegExp = /[^0-9]/;
                        if (
                          typeof value === "string" &&
                          value.trim() !== "" &&
                          !nonDigitRegExp.test(value) &&
                          typeof phoneCountryCode === "string" &&
                          phoneCountryCode.trim() !== ""
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Please enter correct phone number")
                        );
                      },
                    },
                  ]}
                >
                  <Input
                    addonBefore={
                      <Select
                        allowClear
                        showSearch
                        className="w-[130px] "
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={CountryDialCodeOption}
                        onChange={(value) => {
                          const phoneCode =
                            typeof value === "string" ? value : "";
                          setPhoneCountryCode(phoneCode);
                        }}
                      />
                    }
                    placeholder="Business Phone"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Form.Item
                  name="Country"
                  label="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Country !",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select a  Country"
                    allowClear
                    size="large"
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={countryOptions}
                  />
                </Form.Item>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Form.Item
                  name="BusinessType"
                  label="Business Type "
                  rules={[
                    {
                      required: true,
                      message: "Please input your Business Type  !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Business Type"
                    allowClear
                    size="large"
                    options={businessTypeOption}
                  />
                </Form.Item>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Form.Item
                  name="CompanySize"
                  label="Company Size"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Company Size !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Company Size "
                    allowClear
                    size="large"
                    options={companySizeOption}
                  />
                </Form.Item>
              </Col>

              <Col lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message:
                        "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-30 characters long.",
                      pattern: new RegExp(
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,30}$/
                      ),
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col lg={12} md={24} sm={24} xs={24}>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder=" Confirm Password"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={24} sm={24} xs={24} className="xl:pt-10 xl:pb-5">
                <Form.Item
                  name="checkbox"
                  rules={[
                    {
                      required: false,
                      message: "Please click on this checkbox",
                    },
                  ]}
                >
                  <Checkbox value="checked" onChange={onChange}>
                    I agree to the
                    <span className="pl-2">
                      <Link href="/terms-of-use" className="text-purple-50">
                        Unifaires Terms of use and Privacy Policy
                      </Link>
                    </span>
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col xl={24} className="py-5">
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    htmlType="submit"
                    loading={loading}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </Col>

              <Col xl={24} sm={24} xs={24}>
                <Title
                  level={5}
                  className="xl:text-center text-left text-purple-50"
                >
                  <Link
                    href="/signup-individual"
                    className="text-purple-50 xl:pl-2"
                  >
                    Register as an Individual
                  </Link>
                </Title>
              </Col>

              <Col xl={24} sm={24} xs={24} className="xl:text-center text-left">
                <Paragraph>
                  Already have an account?
                  <span>
                    <Link href="/login" className="text-purple-50 pl-2">
                      Sign in
                    </Link>
                  </span>
                </Paragraph>
              </Col>

              <Col
                xl={24}
                sm={24}
                xs={24}
                className="xl:text-center text-left py-5"
              >
                <Paragraph>
                  By signing up, you agree to our
                  <span>
                    <Link
                      href="/terms-of-use"
                      className="text-purple-50 pl-2 pr-2"
                    >
                      Terms & Conditions
                    </Link>
                  </span>
                  and
                  <span>
                    <Link href="/privacy" className="text-purple-50 pl-2">
                      Privacy & Cookie
                    </Link>
                  </span>
                </Paragraph>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Result
          status="success"
          title="Successfully Sign up"
          subTitle="A verification token has been sent to your email address inbox. If you can't see the link in your inbox. Please check your spam folder"
          extra={[
            <Link key={1} href="/login">
              <Button key="login">Login</Button>
            </Link>,
          ]}
        />
      </Modal>
    </div>
  );
};

export default SignupBusinessPage;
