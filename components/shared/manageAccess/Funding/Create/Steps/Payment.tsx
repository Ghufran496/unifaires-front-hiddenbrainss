"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import {
  Form,
  Input,
  Button,
  Typography,
  Radio,
  RadioChangeEvent,
  Space,
  Card,
  Divider,
  message,
} from "antd";
import Image from "next/image";
import masterCardLogo from "@/public/images/payment/mastercard.png";
import visaCardLogo from "@/public/images/payment/visa.png";
import unionPayLogo from "@/public/images/payment/unionpay.png";
import discoverLogo from "@/public/images/payment/discover.png";
import giftCard from "@/public/images/payment/gift-cards.png";
import unifairesCard from "@/public/images/payment/unifaires.png";
import groupPrivacy from "@/public/images/payment/group-privacy-setting.png";
import CardModal from "./CardModal";
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import { DeleteOutlined } from "@ant-design/icons";

interface PaymentPlanInt {
  id: number;
  title: string;
  price: string;
  description: string;
  currency: string;
}

interface PaymentInt {
  next: Function;
  prev: Function;
  setTotalPrice: any;
  selectedCard: any;
  setSelectedCard: any;
}

const Payment = ({
  next,
  prev,
  setTotalPrice,
  selectedCard,
  setSelectedCard,
}: PaymentInt) => {
  const { data: session } = useSession();
  const [radioValue, setRadioValue] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<Array<PaymentPlanInt>>();
  const [fundingPosting, setFundingPosting] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [customerCard, setCustomerCard] = useState<Array<any>>([]);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const onChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setRadioValue((prevRadioValue) => newValue);
  };

  const handleNext = () => {
    setFundingPosting(false);
    setPaymentMethod(true);
  };

  const handlePrev = () => {
    setFundingPosting(true);
    setPaymentMethod(false);
  };

  const handleNextStep = () => {
    next();
  };

  const fetchPaymentType = async () => {
    await axios
      .get(`${config.API.API_URL}/funding-payment-type`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        setPaymentPlan(res.data.data);
      });
  };

  const fetchCards = async () => {
    await axiosInstance
      .get("/payment/customer-card")
      .then((res) => {
        console.log(res);
        setCustomerCard(res.data.data.data);
        setIsModalCard(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCards();
    fetchPaymentType();
  }, []);

  const handleDeleteCard = async (id: any) => {
    await axiosInstance
      .post("/payment/remove-card", {
        cardId: id,
      })
      .then((res) => {
        fetchCards();
        message.success("Card removed Successfully");
      })
      .catch((error) => {
        message.error("Unable to remove card");
        console.log(error);
      });
  };

  const handlePlanChange = (e: any) => {
    setTotalPrice(e.target.value);
  };

  return (
    <Fragment>
      {fundingPosting && (
        <div className="flex flex-row">
          <div className="pl-4 w-2/3">
            <Typography.Paragraph className="m-0">
              You&apos;re getting a
            </Typography.Paragraph>
            <Radio.Group onChange={onChange} className="p-4">
              {paymentPlan?.map((plan) => {
                return (
                  <Space direction="vertical" key={plan.id}>
                    <Radio value={plan.price} onChange={handlePlanChange}>
                      <div>
                        <Typography.Title level={4} className="mt-2">
                          {plan.title}
                        </Typography.Title>
                        <Typography.Paragraph className="text-gray-400 font-bold text-lg mb-0">
                          {plan.price} {plan.currency}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          {plan.description}
                        </Typography.Paragraph>
                      </div>
                    </Radio>
                  </Space>
                );
              })}
            </Radio.Group>
          </div>
          <div className="flex items-center pl-4">
            <div>
              <Card className="text-center p-2 bg-gray-50 border-blue-500">
                <Typography.Paragraph className="font-semibold">
                  YOUR ORDER SUMMARY
                </Typography.Paragraph>
                <Typography.Paragraph className="font-bold">
                  Featured Funding Posting
                </Typography.Paragraph>
                {/* <Typography.Paragraph>
                  from{" "}
                  <span className="text-purple-500 font-semibold">
                    {today.toDateString()}
                  </span>{" "}
                  to{" "}
                  <span className="text-purple-500 font-semibold">
                    {today.toDateString()}
                  </span>
                </Typography.Paragraph> */}
                <Typography.Paragraph className="text-gray-500 text-lg">
                  Total:{" "}
                  <span className="text-black font-bold">{radioValue}.00</span>{" "}
                  USD
                </Typography.Paragraph>
              </Card>
            </div>
          </div>
        </div>
      )}
      {fundingPosting && (
        <div className="flex flex-row gap-4 mt-4">
          <Button size="large" onClick={() => prev()}>
            Previous
          </Button>
          <Button
            size="large"
            type="primary"
            className="ml-auto"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      )}
      {paymentMethod && (
        <div className="pl-4">
          <div>
            {/* <Typography.Title level={2}>CheckOut</Typography.Title> */}
            <Typography.Title level={4}>
              Select Payement Method
            </Typography.Title>
            <Divider />
            <div>
              <div className="flex flex-row justify-between">
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
                    onClick={() => setIsModalCard(true)}
                  >
                    Add a Credit or Debit Card
                  </Button>
                </div>
                <div className="flex flex-row gap-4 h-full items-center">
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
            <div className="mt-4">
              <Radio.Group>
                {customerCard?.length > 0 &&
                  customerCard.map((card) => {
                    return (
                      <Radio value={card} key={card.id}>
                        <Card
                          className=" mb-2"
                          onClick={() => setSelectedCard(card)}
                        >
                          <div className="flex flex-row justify-between items-center gap-4">
                            <div>
                              <Typography.Paragraph className="font-semibold text-blue-700 mb-0">
                                {card.brand}
                              </Typography.Paragraph>
                              <Typography.Paragraph>
                                **** **** **** {card.last4}
                              </Typography.Paragraph>
                            </div>
                            <div className="flex ml-auto items-center justify-center my-0">
                              <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                className="ml-auto text-red-700"
                                onClick={() => handleDeleteCard(card.id)}
                              />
                            </div>
                          </div>
                        </Card>
                      </Radio>
                    );
                  })}
              </Radio.Group>
            </div>
            <Divider />
            <div>
              <div className="flex flex-row justify-between">
                <div>
                  <Typography.Paragraph className="text-lg font-semibold">
                    Gift Cards, Vourchers & and Promotional Codes
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Enter a gift card, vourcher or promotional code.
                  </Typography.Paragraph>
                  <Form.Item name="cupon">
                    <div className="flex flex-row gap-6">
                      <Input placeholder="Enter a Code" />
                      <Button
                        size="large"
                        className="flex flex-row ml-auto bg-gray-200"
                      >
                        Apply
                      </Button>
                    </div>
                  </Form.Item>
                </div>
                <div className="flex flex-row gap-4 h-full items-center">
                  <div className="flex items-center border py-[6px] px-[8px] w-[103px] h-[64px] rounded-md justify-center">
                    <Image alt="masterCard" src={giftCard} />
                  </div>
                  <div className="flex items-center bg-blue-700 border py-[6px] px-[8px] w-[103px] h-[64px] rounded-md justify-center">
                    <Image alt="visaCard" src={unifairesCard} />
                  </div>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex flex-row justify-between">
                <div>
                  <Typography.Paragraph className="text-lg font-semibold">
                    Personal Checking Accounts
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    Use your personal checking account.
                  </Typography.Paragraph>
                  <Button size="large" className="bg-gray-200 mt-4">
                    Add a personal checking account
                  </Button>
                </div>
                <div className="flex flex-row gap-4 h-full items-center">
                  <div className="flex items-center w-[97px] h-[66px] rounded-md justify-center">
                    <Image alt="masterCard" src={groupPrivacy} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-row gap-4 mt-6">
            <Button size="large" onClick={handlePrev}>
              Previous
            </Button>
            <Button
              size="large"
              type="primary"
              className="ml-auto"
              onClick={handleNextStep}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <CardModal
        isModalCard={isModalCard}
        setIsModalCard={setIsModalCard}
        fetchCards={fetchCards}
      />
    </Fragment>
  );
};

export default Payment;
