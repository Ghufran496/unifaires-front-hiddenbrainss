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
import { getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import StripePayment from "@/components/pages/StripePayment";
import NgPayment from "@/components/pages/NgPayment";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { RootState } from "@/redux/store";
import { showError } from "@/app/utils/axiosError";

interface PaymentPlanInt {
  id: number;
  title: string;
  price: string;
  description: string;
  currency: string;
  months: any;
}

interface PaymentInt {
  next: Function;
  prev: Function;
  setTotalPrice: any;
  selectedCard: any;
  setFundingPayment: any;
  setSelectedCard: any;
}

const Payment = ({
  next,
  prev,
  setFundingPayment,
  setTotalPrice,
  selectedCard,
  setSelectedCard,
}: PaymentInt) => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const [radioValue, setRadioValue] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<Array<PaymentPlanInt>>();
  const [fundingPosting, setFundingPosting] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [customerCard, setCustomerCard] = useState<Array<any>>([]);
  const [paymentTypeId, setPaymentTypeId] = useState<any>(null);
  const [isNigeria, setIsNigeria] = useState(false);
  const params = useParams();
  const fundingId = params?.FundingId;
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const paymentBody = {
    fundingId: fundingId,
    country: locationData?.country,
    fundingPaymentTypeId: paymentTypeId,
  };

  useEffect(() => {
    if (userCountry == "Nigeria") {
      setIsNigeria(true);
    }
  }, [locationData]);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const handleNext = () => {
    if (paymentTypeId !== null) {
      setFundingPosting(false);
      setPaymentMethod(true);
    } else {
      showError("Select payment type");
    }
  };

  const fetchPaymentType = async () => {
    try {
      const res = await axiosInstance.get("/funding-payment-type");
      if (res.status) {
        setPaymentPlan(res.data.data);
      }
    } catch (error) {
      console.log("Unable to fetch payment plans", error);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await axiosInstance.get("/payment/customer-card");

      if (res.status) {
        setCustomerCard(res.data.data.data);
        setIsModalCard(false);
      }
    } catch (error) {
      console.log("Unable to fetch user cards", error);
    }
  };
  useEffect(() => {
    dispatch(fetchAllTax());
    fetchCards();
    fetchPaymentType();
  }, []);

  const taxes = useAppSelector((state: RootState) => state.tax.taxes);
  const getTaxForCountry: any = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : "0";
  };

  const handlePlanChange = (e: any) => {
    const price = e.target.value;
    const convertedPrice = price && price * currencyRate;
    setTotalPrice(convertedPrice || price);
  };

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Fragment>
      {fundingPosting && (
        <div className="flex flex-row">
          <div className="pl-4 w-2/3">
            <Typography.Paragraph className="m-0">
              You&apos;re getting a
            </Typography.Paragraph>
            <Radio.Group className="p-4">
              {paymentPlan?.map((plan) => {
                const price: any = plan.price;
                const estimatedTax: any =
                  price * (getTaxForCountry(userCountry) / 100);
                const planPrice = price + estimatedTax;
                const convertedPrice = planPrice && planPrice * currencyRate;

                return (
                  <Space direction="vertical" key={plan.id}>
                    <Radio
                      value={plan.price}
                      onChange={handlePlanChange}
                      onClick={() => {
                        setPaymentTypeId(plan.id);
                        setRadioValue(convertedPrice || planPrice);
                      }}
                    >
                      <div>
                        <Typography.Title level={4} className="mt-2 mb-0">
                          {plan.title} ({plan.months} Months)
                        </Typography.Title>
                        <Typography.Paragraph className="text-gray-400 font-bold text-lg m-0">
                          {formatCurrency(convertedPrice || planPrice)}
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
                  <span className="text-black font-bold">
                    {formatCurrency(radioValue)}
                  </span>
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
      {paymentMethod && !isNigeria && (
        <StripePayment
          next={next}
          prev={prev}
          fetchCards={fetchCards}
          customerCard={customerCard}
          setSelectedCard={setSelectedCard}
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          setPayment={setFundingPayment}
          paymentBody={paymentBody}
        />
      )}
      {paymentMethod && isNigeria && (
        <StripePayment
          next={next}
          prev={prev}
          fetchCards={fetchCards}
          customerCard={customerCard}
          setSelectedCard={setSelectedCard}
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          setPayment={setFundingPayment}
          paymentBody={paymentBody}
        />
        // <NgPayment
        //   next={next}
        //   prev={prev}
        //   paymentType="funding"
        //   setPayment={setFundingPayment}
        //   paymentBody={paymentBody}
        // />
      )}
    </Fragment>
  );
};

export default Payment;
