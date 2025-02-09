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
  DatePicker,
  Alert,
  Modal,
  Result,
} from "antd";
import logo from "@/public/images/logo 224.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import moment from "moment";
import config from "@/app/utils/config";
import { toast } from "react-toastify";
import axios from "axios";
// next components
import NextLink from "next/link";
import { handleAxiosError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/features/CountrySlice";
import { RootState } from "@/redux/store";

interface RegistrationProps {
  Firstname: string;
  Lastname: string;
  Email: string;
  BirthDate: string;
  Gender: string;
  Country: string;
  password: string;
  confirm: string;
  checkbox: boolean;
}

const SignupIndividualPage = () => {
  const { Title, Paragraph, Link } = Typography;
  const { Option } = Select;
  const dispatch: any = useAppDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  const Countries = useAppSelector(
    (state: RootState) => state.country.countries
  );
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

  const handleSaveCouhandlrse = () => {
    setIsModalOpen(true);
    setTimeout(function () {
      router.push("/business/courses");
    }, 3000);
  };

  const onFinish = async (val: RegistrationProps) => {
    // console.log("here is the val", val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.Email)) {
      throw new Error("Invalid email address");
    }
    val["BirthDate"] = moment(val.BirthDate).format("YYYY-MM-DD");
    const filteredValue = {
      // fullname: `${val.Firstname} ${val.Lastname}`,
      firstname: val.Firstname,
      lastname: val.Lastname,
      email: val.Email,
      gender: val.Gender,
      country: val.Country,
      password: val.password,
      dateOfBirth: val.BirthDate,
    };

    console.log(checked);
    if (!checked) {
      toast.error("Please agree to the terms of use");
      // Display an error message or handle it as needed
      return;
    } else {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          `${config.API.API_URL}/auth/register`,
          filteredValue
        );

        if (response.status) {
          setIsModalOpen(true);
        }
      } catch (error) {
        handleAxiosError(error);
      } finally {
        setLoading(false);
      }
    }

    console.log(filteredValue);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function onClose() {
    setLoginError(false);
  }

  return (
    <div>
      <Row>
        <Col xl={8} className="bg-[#F2F0F9]  py-96 xl:block hidden">
          <Title level={2} className=" xl:px-10 text-purple-50">
            Let’s get started! Help us give you a more personalized experience.
          </Title>

          <Paragraph className="xl:px-10">Easy, free & non-binding</Paragraph>
        </Col>

        <Col xl={16} sm={24} xs={24} className="px-5 pt-5 xl:px-20 xl:pt-20">
          <Image src={logo} alt="logo" width={200} height={58} />
          <Paragraph className="py-5 font-semibold text-purple-50">
            Sign Up to avail exciting Opportunities to your fingertips!
          </Paragraph>

          {loginError === true ? (
            <Col xl={24} xs={24} style={{ marginBottom: 10 }}>
              <Alert
                message={errorMessage}
                type="error"
                closable
                className="mt-4 capitalize"
                onClose={onClose}
              />
            </Col>
          ) : null}

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

              <Col xl={24} sm={24} xs={24}>
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="rounded-md"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="BirthDate"
                  label="Birth Date"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Birth Date!",
                    },
                  ]}
                >
                  <DatePicker
                    className="w-full"
                    size="large"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} sm={24} xs={24}>
                <Form.Item
                  name="Gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Gender !",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    size="large"
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Others</Option>
                  </Select>
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
                    placeholder=" Confrim Password"
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
                  <Checkbox onChange={onChange}>
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
                  className="text-left xl:text-center text-purple-50"
                >
                  <Link
                    href="/signup-business"
                    className="text-purple-50 xl:pl-2"
                  >
                    Register to become our business partner
                  </Link>
                </Title>
              </Col>

              <Col xl={24} xs={24} className="text-left xl:text-center">
                <Paragraph>
                  Already have an account?
                  <span>
                    <Link href="/login" className="pl-2 text-purple-50">
                      Sign in
                    </Link>
                  </span>
                </Paragraph>
              </Col>

              <Col xl={24} xs={24} className="py-5 text-left xl:text-center">
                <Paragraph>
                  By signing up, you agree to our
                  <span>
                    <Link
                      href="/terms-of-use"
                      className="pl-2 pr-2 text-purple-50"
                    >
                      Terms & Conditions
                    </Link>
                  </span>
                  and
                  <span>
                    <Link href="/privacy" className="pl-2 text-purple-50">
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
            <NextLink key={1} href="/login">
              <Button key="login">Login</Button>
            </NextLink>,
          ]}
        />
      </Modal>
    </div>
  );
};

export default SignupIndividualPage;
