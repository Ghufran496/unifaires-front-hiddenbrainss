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
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import { DeleteOutlined } from "@ant-design/icons";
import NgPayment from "@/components/pages/NgPayment";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import StripePayment from "@/components/pages/StripePayment";
import StripeCoursePayment from "./Stripe";
import BillingAddress from "./BillingAddress";
import ReviewPost from "./ReviewPost";
import NgCoursePayment from "./Ng";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
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

const FreeCoursePayment = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const dispatch: any = useAppDispatch();
  const [radioValue, setRadioValue] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<Array<PaymentPlanInt>>();
  const [coursePosting, setCoursePosting] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [customerCard, setCustomerCard] = useState<Array<any>>([]);
  const [paymentTypeId, setPaymentTypeId] = useState<any>(null);
  const [isNigeria, setIsNigeria] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [selectedCard, setSelectedCard] = useState();
  const [coursePaymentBody, setCoursePaymentBody] = useState();
  const [billingAddress, setBillingAddress] = useState();
  const [placeOrder, setPlaceOrder] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(false);
  const courseId = params?.CourseId;
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const paymentBody = {
    courseId: courseId,
    country: locationData?.country,
    coursePaymentTypeId: paymentTypeId,
  };

  useEffect(() => {
    if (locationData?.country == "Nigeria") {
      setIsNigeria(true);
    }
  }, [locationData]);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const onChange = (e: RadioChangeEvent) => {
    const newValue = e.target.value;
    setRadioValue((prevRadioValue) => newValue);
  };

  const fetchPaymentType = async () => {
    try {
      const res = await axiosInstance.get("/course-payment-type");
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

  const handleNextStep = () => {
    if (paymentTypeId) {
      if (coursePosting && !paymentMethod && !isBillingAddress) {
        setCoursePosting(false);
        setIsBillingAddress(false);
        setPlaceOrder(false);
        setPaymentMethod(true);
      } else if (!isBillingAddress && !coursePosting && paymentMethod) {
        setCoursePosting(false);
        setPaymentMethod(false);
        setPlaceOrder(false);
        setIsBillingAddress(true);
      } else {
        setPlaceOrder(true);
        setIsBillingAddress(false);
      }
    } else {
      showError("Select a Payment Plan");
    }
  };
  return (
    <Fragment>
      {coursePosting && (
        <div className="flex flex-row">
          <div className="pl-4 w-2/3">
            <Typography.Paragraph className="m-0">
              You&apos;re getting a
            </Typography.Paragraph>
            <Radio.Group className="flex flex-col p-4">
              {paymentPlan?.map((plan) => {
                const price: any = plan.price;
                const estimatedTax: any =
                  price * (getTaxForCountry(userCountry) / 100);
                const planPrice = price + estimatedTax;
                const convertedPrice = planPrice && planPrice * currencyRate;

                return (
                  <Space direction="vertical" key={plan.price}>
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
                  Featured Course Posting
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

      {paymentMethod && !isNigeria && (
        <StripeCoursePayment
          fetchCards={fetchCards}
          customerCard={customerCard}
          setSelectedCard={setSelectedCard}
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          setPayment={setCoursePaymentBody}
          paymentBody={paymentBody}
        />
      )}
      {paymentMethod && isNigeria && (
        <NgCoursePayment
          next={handleNextStep}
          paymentType="free-course"
          setPayment={setCoursePaymentBody}
          paymentBody={paymentBody}
        />
      )}
      {isBillingAddress && (
        <BillingAddress
          next={handleNextStep}
          setBillingAddress={setBillingAddress}
        />
      )}
      {placeOrder && (
        <ReviewPost
          billingAddress={billingAddress}
          totalPrice={totalPrice}
          coursePaymentBody={coursePaymentBody}
          selectedCard={selectedCard}
        />
      )}
      <div className="mt-4">
        <Button
          size="large"
          type="primary"
          className="flex ml-auto"
          onClick={handleNextStep}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};

export default FreeCoursePayment;
