"use client";
import {
  Modal,
  Typography,
  Form,
  Col,
  Select,
  Button,
  message,
  Input,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";

import colouredLogo from "@/public/images/logo 224.png";
import axios from "axios";
import config from "@/app/utils/config";
import { UserInt } from "@/app/utils/interface";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";

interface IProp {
  institutionAccess: boolean;
  setInstitutionAccess: any;
  nextStep: boolean;
  setNextStep: any;
}

interface LoginProps {
  email: string;
  token: string;
  institution: number;
}

const InstitutionAccess = ({
  institutionAccess,
  setInstitutionAccess,
  nextStep,
  setNextStep,
}: IProp) => {
  const onSearch = (value: string) => console.log(value);
  const [institutionList, setInstitutionList] = useState<Array<UserInt>>([]);
  const [userId, setUserId] = useState("");
  const [loginDetails, setLoginDetails] = useState<any>();
  const [isPassword, setIsPassword] = useState(false);
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [verifyToken] = Form.useForm();
  const [createPasswordForm] = Form.useForm();
  const router = useRouter();

  const handleCloseModal = () => {
    setInstitutionAccess(!institutionAccess);
    setNextStep(false);
  };

  // useEffect(() => {
  //   axios.get(`${config.API.API_URL}/business`).then((res) => {
  //     setInstitutionList(res.data.data);
  //   });
  // }, []);

  // const institutionOption = institutionList.map((user) => {
  //   return {
  //     label: user.companyName,
  //     value: `${user.id}`,
  //   };
  // });

  const onFinish = async () => {
    await form.validateFields();
    const val = form.getFieldsValue();
    setLoginDetails(val);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/associate-verify", {
        token: val.token,
        email: val.email,
        password: val.password,
      });
      if (!response.status) {
        // Handle specific error from the API response
        toast.error(`${response?.data?.message}`);
      } else {
        setIsPassword(response.data.isPassword);
        console.log("first response", response.data);
        if (!response.data.isPassword) {
          const resetPasswordToken = await axiosInstance.post(
            "/auth/reset-user-token",
            {
              email: val.email,
            }
          );
          if (resetPasswordToken.status) {
            showSuccess("Password Token sent to email");
          }
        }
        setNextStep(true);
      }
    } catch (error) {
      handleAxiosError(error);
      // Handle generic error (e.g., network error)
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInsitutionChange = (value: string) => {
    setUserId(value);
  };

  const handleLogin = async () => {
    await form.validateFields();
    const val = form.getFieldsValue();
    setLoading(true);

    try {
      const response = await signIn("token-login", {
        redirect: false,
        // userId: userId,
        ...loginDetails,
        password: val.password,
        callbackUrl: "/",
      });

      if (response?.error) {
        // Handle specific error from the API response
        toast.error(`${response.error}`);
      } else {
        showSuccess("Login Successful");
        handleCloseModal();
        router.push("/user");
      }
    } catch (error) {
      handleAxiosError(error);
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async () => {
    const verifyData = verifyToken.getFieldsValue();
    setToken(verifyData.token);
    const email = loginDetails.email;

    setLoading(true);
    try {
      const verify = await axiosInstance.post("/auth/verify-user-token", {
        email: email,
        ...verifyData,
      });
      if (verify.status) {
        setVerified(true);
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("Here is the error", error);
    }

    setLoading(false);
  };

  const handlePasswordCreation = async () => {
    const passwordData = createPasswordForm.getFieldsValue();
    const email = loginDetails.email;
    const password = passwordData.Password;

    setLoading(true);
    try {
      const createPassword = await axiosInstance.post(
        "/auth/reset-user-password",
        {
          email: email,
          token: token,
          password: password,
        }
      );
      if (createPassword.status) {
        setIsPassword(true);
        toast.success("Password Created Successfully");
      }
    } catch (error) {
      handleAxiosError(error);
      console.log("Error creating password", error);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Modal
        open={institutionAccess}
        footer={false}
        onCancel={handleCloseModal}
        onOk={handleCloseModal}
        className="text-center"
      >
        <div className="p-[2%]">
          <div className="flex flex-row justify-center items-center my-4">
            <Image
              src={colouredLogo}
              alt="icon"
              width={230}
              height={40}
              objectFit="contain"
            />
          </div>
          <Typography.Paragraph>
            Unifaires is the world’s most comprehensive platform and collection
            of job industry taxonomy, career, subject major, and skills catalogs
          </Typography.Paragraph>
          <Typography.Title level={3} className="mb-4">
            Log in to Unifaires
          </Typography.Title>
          <Form
            layout="vertical"
            form={form}
            initialValues={{ remember: true }}
          >
            {nextStep && isPassword && (
              <Col xl={24} xs={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    className="w-full text-blue-700 text-lg p-2 border-x-transparent border-t-transparent border-b-2 border-purple-600 rounded-none hover:shadow-none"
                    placeholder="Password"
                    size="large"
                  />
                </Form.Item>
              </Col>
            )}

            {!nextStep && (
              <div>
                <Col>
                  <Form.Item
                    label="Access Code"
                    name="token"
                    className="font-semibold"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter access Code",
                      },
                    ]}
                  >
                    <input
                      placeholder="KJFDLKL3KD"
                      style={{}}
                      className="w-full text-blue-700 text-lg p-2 border-x-transparent border-t-transparent border-b-2 border-purple-600 rounded-none focus:outline-none"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    label="Email"
                    name="email"
                    className="font-semibold"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email",
                      },
                    ]}
                  >
                    <input
                      placeholder="example@gmail.com"
                      style={{}}
                      className="w-full text-blue-700 text-lg p-2 border-x-transparent border-t-transparent border-b-2 border-purple-600 rounded-none focus:outline-none"
                    />
                  </Form.Item>
                </Col>
              </div>
            )}

            {nextStep && !isPassword && (
              <div>
                {verified ? (
                  <div>
                    <Form
                      form={createPasswordForm}
                      autoComplete="off"
                      layout="vertical"
                    >
                      <Col>
                        <Form.Item
                          name="Password"
                          label="Create Password"
                          rules={[
                            {
                              required: true,
                              message:
                                "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.",
                              pattern: new RegExp(
                                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
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

                      <Col>
                        <Form.Item
                          name="Confirm"
                          label="Confirm Password"
                          dependencies={["Password"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("Password") === value
                                ) {
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
                      <Button
                        className="text-base font-bold w-full"
                        type="primary"
                        size="large"
                        onClick={handlePasswordCreation}
                        loading={loading}
                      >
                        Create Password
                      </Button>
                    </Form>
                  </div>
                ) : (
                  <div>
                    <Typography.Paragraph className="text-center text-base italic">
                      A token has been sent to your email, enter the token to
                      create a password
                    </Typography.Paragraph>
                    <Form layout="vertical" form={verifyToken} size="large">
                      <Form.Item name="token">
                        <Input placeholder="KIDUTE" />
                      </Form.Item>
                      <div>
                        <Button
                          type="primary"
                          size="large"
                          className="mt-6 rounded-sm w-full"
                          onClick={handleVerifyToken}
                          loading={loading}
                        >
                          Verify Token
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}
              </div>
            )}

            <div>
              <Typography.Paragraph>
                Please contact your instituion’s admin or write us at{" "}
                <span className="text-blue-700 font-semibold">
                  contact@unifaires.com
                </span>{" "}
                explaining your issues - we are glad to help
              </Typography.Paragraph>
            </div>
          </Form>
          {nextStep && isPassword && (
            <Button
              type="primary"
              size="large"
              className="mt-6 rounded-sm w-full"
              onClick={handleLogin}
              loading={loading}
            >
              Login
            </Button>
          )}
          {!nextStep && (
            <Button
              type="primary"
              size="large"
              className="mt-6 rounded-sm w-full"
              onClick={onFinish}
              loading={loading}
            >
              Next
            </Button>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default InstitutionAccess;
