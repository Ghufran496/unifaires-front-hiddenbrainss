"use client";
import {
  Modal,
  Typography,
  Divider,
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Checkbox,
} from "antd";
import React, { useState } from "react";
import Image from "next/image";
import masterCardLogo from "@/public/images/payment/mastercard.png";
import visaCardLogo from "@/public/images/payment/visa.png";
import unionPayLogo from "@/public/images/payment/unionpay.png";
import discoverLogo from "@/public/images/payment/discover.png";
import groupPrivacy from "@/public/images/payment/group-privacy-setting.png";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useRouter } from "next/navigation";
import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { handleAxiosError, handleError } from "@/app/utils/axiosError";
import axiosInstance from "@/app/utils/axios-config";
import { toast } from "react-toastify";
import axiosAccessInstance from "@/app/utils/businessAccess-axios-config";

const NgCoursePayment = ({
  setPayment,
  paymentBody,
  paymentType,
  next,
}: any) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const monthFormat = "MM/YYYY";
  const [isModalCard, setIsModalCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const [pin, setPin] = useState<any>(null);
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState<any>(null);
  const [txRef, setTxRef] = useState<any>(null);
  const [requestData, setRequesData] = useState<any>();

  const handleFundWallet = () => {
    router.push("/business/payments");
  };

  const handleCancel = () => {
    setIsModalCard(false);
    form.resetFields();
    setIsPin(false);
    setIsOtp(false);
  };

  const handleCardPayment = async (postData: any, endpoint: any) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(endpoint, postData);
      const { data } = res.data;

      if (res.status) {
        toast.success(`${res.data.message}`);
        // handleCancel();
      }

      // console.log("here is the ", data);

      if (data.mode === "redirect") {
        handleError(
          "This card can't be used. <br> Use another card or transfer option"
        );
      } else if (data.mode === "pin") {
        setIsPin(true);
      } else if (data.mode === "otp") {
        setIsOtp(true);
        setTxRef(data.tx_ref);
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUseCard = async () => {
    await form.validateFields();
    const requestBody = form.getFieldsValue();
    const year = requestBody.expirationDate.$y;
    const exp_year = `${year % 100}`;
    const month = requestBody.expirationDate.$M + 1;
    const exp_month = month <= 9 ? `0${month}` : `${month}`;
    const formData = {
      ...requestBody,
      ...paymentBody,
      expiryMonth: exp_month,
      expiryYear: exp_year,
    };
    delete formData.expirationDate;
    setRequesData(formData);

    handleCardPayment(formData, `/ng-payment/${paymentType}-card-business`);
  };

  const pinCard = (e: any) => {
    e.preventDefault();
    const postData = {
      ...requestData,
      authorization: {
        mode: "pin",
        pin: pin,
      },
    };

    handleCardPayment(
      postData,
      `/ng-payment/${paymentType}-card-authorize-business`
    );
  };

  const otpCard = (e: any) => {
    e.preventDefault();

    const postData = {
      otp: otp,
      txRef: txRef,
    };

    handleCancel();
    next();

    setPayment(postData);

    // handleCardPayment(postData, "/payment/card-otp");
  };

  return (
    <div>
      <div className="pl-4">
        <div>
          {/* <Typography.Title level={2}>CheckOut</Typography.Title> */}
          <Typography.Title level={4}>Select Payement Method</Typography.Title>
          <Divider />
          <div>
            <div className="flex gap-6 lg:flex-row flex-col justify-between">
              <div>
                <Typography.Paragraph className="text-lg font-semibold">
                  Unfaires Wallet Account
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Use your wallet account.
                </Typography.Paragraph>
                <Button size="large" className="bg-gray-200 mt-4">
                  Charge Wallet
                </Button>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center bg-purple-300 p-4 px-10 rounded-lg">
                <Typography.Paragraph className="m-0 text-white font-semibold">
                  Wallet Balance
                </Typography.Paragraph>
                <Typography.Title
                  level={2}
                  className="text-white font-bold m-0"
                >
                  $0.00
                </Typography.Title>
                <Button
                  type="default"
                  icon={<PlusCircleOutlined />}
                  className="border-none text-white bg-purple-200  rounded-full font-semibold"
                  onClick={handleFundWallet}
                >
                  Fund Wallet
                </Button>
              </div>
            </div>
          </div>
          <Divider />

          <div>
            <div className="flex lg:flex-row flex-col justify-between">
              <div>
                <Typography.Paragraph className="text-lg font-semibold">
                  Credit or Debit Card
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Unifaires accept credit or debit cards
                </Typography.Paragraph>
                <Button
                  size="large"
                  className="bg-gray-200 mt-4"
                  onClick={() => {
                    setIsModalCard(true);
                    // setPaymentMethod(false);
                  }}
                >
                  Use a Credit or Debit Card
                </Button>
              </div>
              <div className="flex flex-row gap-4 h-full items-center mt-4">
                <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                  <Image alt="masterCard" src={masterCardLogo} />
                </div>
                <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                  <Image alt="visaCard" src={visaCardLogo} />
                </div>
                <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                  <Image alt="unionPayLogo" src={unionPayLogo} />
                </div>
                <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                  <Image alt="discoverLogo" src={discoverLogo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalCard}
        onCancel={handleCancel}
        // title="Add a debit or Credit Card"
        width={450}
        footer={null}
      >
        {isOtp ? (
          <div className="m-8">
            <Form layout="vertical">
              <label className="font-bold"> Enter OTP sent to </label>
              <Form.Item name="otp">
                <Input
                  size="large"
                  type="number"
                  placeholder="OTP "
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Item>

              <div>
                <Button
                  type="primary"
                  onClick={(e) => otpCard(e)}
                  className="w-full h-[50px]"
                  loading={loading}
                >
                  Authorize
                </Button>
              </div>
            </Form>
          </div>
        ) : isPin ? (
          <div className="m-8">
            <Form layout="vertical">
              <label className="font-bold"> Enter Card Pin </label>
              <Form.Item name="pin">
                <Input
                  size="large"
                  type="number"
                  placeholder="Card Pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </Form.Item>

              <div>
                <Button
                  type="primary"
                  onClick={(e) => pinCard(e)}
                  className="w-full h-[50px]"
                  loading={loading}
                >
                  Authorize
                </Button>
              </div>
            </Form>
          </div>
        ) : (
          <div>
            <Form layout="vertical" size="large" form={form}>
              <Form.Item
                required
                label="Card Number"
                name="cardNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter Card Number",
                  },
                ]}
              >
                <Input placeholder="0000 000" type="number" />
              </Form.Item>
              <div className="flex justify-between">
                <div>
                  <Form.Item
                    required
                    label="Security Code(CVV)"
                    name="cvv"
                    rules={[
                      {
                        required: true,
                        message: "Please enter code",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Code" type="number" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    required
                    label="Expiration Date"
                    name="expirationDate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter expieration date",
                      },
                    ]}
                  >
                    <DatePicker format={monthFormat} picker="month" />
                  </Form.Item>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="flex items-center justify-center w-full mt-4"
                onClick={handleUseCard}
                loading={loading}
              >
                Use Card
              </Button>
            </Form>
          </div>
        )}{" "}
      </Modal>
    </div>
  );
};

export default NgCoursePayment;
