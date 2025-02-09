/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DeleteOutlined } from "@ant-design/icons";
import axiosInstance from "@/app/utils/axios-config";
import { Typography, Divider, Button, Radio, Card, Form, Input } from "antd";
import Image from "next/image";
import { toast } from "react-toastify";
import CardModal from "./CardModals";
import masterCardLogo from "@/public/images/payment/mastercard.png";
import visaCardLogo from "@/public/images/payment/visa.png";
import unionPayLogo from "@/public/images/payment/unionpay.png";
import discoverLogo from "@/public/images/payment/discover.png";
import giftCard from "@/public/images/payment/gift-cards.png";
import unifairesCard from "@/public/images/payment/unifaires.png";
import groupPrivacy from "@/public/images/payment/group-privacy-setting.png";
import { useEffect } from "react";

const { Title, Paragraph } = Typography;

const StripePayment = ({
  setPayment,
  paymentBody,
  next,
  prev,
  fetchCards,
  customerCard,
  setSelectedCard,
  isModalCard,
  setIsModalCard,
}: any) => {
  const handleSetPayment = () => {
    const requestBody = { ...paymentBody, currency: "usd" };
    setPayment(requestBody);
  };
  useEffect(() => {
    handleSetPayment();
    // console.log(paymentBody);
  }, []);
  const handleDeleteCard = async (id: any) => {
    await axiosInstance
      .post("/payment/remove-card", {
        cardId: id,
      })
      .then((res) => {
        fetchCards();
        toast.success("Card removed Successfully");
      })
      .catch((error) => {
        toast.error("Unable to remove card");
        console.log(error);
      });
  };

  const handlePrev = () => {
    prev();
  };

  const handleNextStep = () => {
    next();
  };
  return (
    <div>
      <div className="pl-4">
        <div>
          <Title level={4}>Select Payement Method</Title>
          <Divider />
          <div>
            <div className="flex flex-row justify-between">
              <div>
                <Paragraph className="text-lg font-semibold">
                  Credit or Debit Card
                </Paragraph>
                <Paragraph>Unifaires accept credit or debit cards</Paragraph>
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
                customerCard.map((card: any) => {
                  return (
                    <Radio value={card} key={card.id}>
                      <Card
                        className=" mb-2"
                        onClick={() => setSelectedCard(card)}
                      >
                        <div className="flex flex-row justify-between items-center gap-4">
                          <div>
                            <Paragraph className="font-semibold text-blue-700 mb-0">
                              {card?.brand}
                            </Paragraph>
                            <Paragraph>**** **** **** {card?.last4}</Paragraph>
                          </div>
                          <div className="flex ml-auto items-center justify-center my-0">
                            <Button
                              type="text"
                              icon={<DeleteOutlined />}
                              className="ml-auto text-red-700"
                              onClick={() => handleDeleteCard(card?.id)}
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
                <Paragraph className="text-lg font-semibold">
                  Gift Cards, Vourchers & and Promotional Codes
                </Paragraph>
                <Paragraph>
                  Enter a gift card, vourcher or promotional code.
                </Paragraph>
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
                <Paragraph className="text-lg font-semibold">
                  Personal Checking Accounts
                </Paragraph>
                <Paragraph>Use your personal checking account.</Paragraph>
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
      <CardModal
        isModalCard={isModalCard}
        setIsModalCard={setIsModalCard}
        fetchCards={fetchCards}
      />
    </div>
  );
};

export default StripePayment;
