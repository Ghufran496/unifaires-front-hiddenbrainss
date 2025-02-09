"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Button,
  Form,
  Input,
  Radio,
  Card,
  RadioChangeEvent,
  message,
} from "antd";
// Images
import Image from "next/image";
import masterCardLogo from "@/public/images/payment/mastercard.png";
import visaCardLogo from "@/public/images/payment/visa.png";
import unionPayLogo from "@/public/images/payment/unionpay.png";
import discoverLogo from "@/public/images/payment/discover.png";
import giftCard from "@/public/images/payment/gift-cards.png";
import unifairesCard from "@/public/images/payment/unifaires.png";
import groupPrivacy from "@/public/images/payment/group-privacy-setting.png";
import axios from "axios";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import { DeleteOutlined } from "@ant-design/icons";
import UserCards from "./Card";

interface BillingInt {
  next: Function;
  prev: Function;
  setSelectedCard: any;
}

interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

const Checkout = ({ next, prev, setSelectedCard }: BillingInt) => {
  const [isModalCard, setIsModalCard] = useState(false);
  const { data: session } = useSession();
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);

  const fetchUserCards = async () => {
    await axios
      .get(`${config.API.API_URL}/payment/customer-card`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        console.log(res.data.data.data);
        setCustomerCard(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserCards();
  }, []);

  const handleSelectCard = (e: RadioChangeEvent) => {
    // console.log("this is the value", e.target.value);
    setSelectedCard(e.target.value);
  };

  const handleDeleteCard = async (id: any) => {
    await axios
      .post(
        `${config.API.API_URL}/payment/remove-card`,
        {
          cardId: id,
        },
        {
          headers: {
            "x-token": session?.user.token,
          },
        }
      )
      .then((res) => {
        fetchUserCards();
        message.success("Card removed Successfully");
        console.log(res.data);
      })
      .catch((error) => {
        message.error("Unable to remove card");
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div>
        <Typography.Title level={4}>Select Payement Method</Typography.Title>
        <Divider className="text-purple-500 border-1 mt-0 border-purple-600" />
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
          <Radio.Group onChange={handleSelectCard}>
            {customerCard?.length > 0 &&
              customerCard.map((card) => {
                return (
                  <Radio value={card} key={card.id}>
                    <Card
                      className=" mb-2"
                      // onClick={() => setSelectedCard(card)}
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
        <UserCards
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          fetchUserCards={fetchUserCards}
        />
        <div className="flex flex-row gap-4 mt-4">
          <Button size="large" onClick={() => prev()}>
            Previous
          </Button>
          <Button
            size="large"
            type="primary"
            className="ml-auto"
            onClick={() => next()}
            // loading={loading}
          >
            Proceed
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Checkout;
