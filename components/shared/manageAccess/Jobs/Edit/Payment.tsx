/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Button, Typography, Radio, Space, Card } from "antd";
import axiosInstance from "@/app/utils/axios-config";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import StripePayment from "@/components/pages/StripePayment";
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
  setJobPayment: any;
  setSelectedCard: any;
}

const Payment = ({
  next,
  prev,
  setTotalPrice,
  setSelectedCard,
  setJobPayment,
}: PaymentInt) => {
  const dispatch: any = useAppDispatch();
  const router = useRouter();
  const [radioValue, setRadioValue] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<Array<PaymentPlanInt>>();
  const [jobPosting, setJobPosting] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [customerCard, setCustomerCard] = useState<Array<any>>([]);
  const [paymentTypeId, setPaymentTypeId] = useState<any>(null);
  const [isNigeria, setIsNigeria] = useState(false);
  const params = useParams();
  const jobId = params?.JobId;
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info?.data;
  const userCountry = locationData?.country;
  const locationCurrency = info?.data?.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const paymentBody = {
    jobId: jobId,
    country: locationData?.country,
    jobPaymentTypeId: paymentTypeId,
  };

  useEffect(() => {
    if (userCountry == "Nigeria") {
      setIsNigeria(true);
    }
  }, [locationData]);

  const handleNext = () => {
    if (paymentTypeId !== null) {
      setJobPosting(false);
      setPaymentMethod(true);
    } else {
      showError("Select payment type");
    }
  };

  const fetchPaymentType = async () => {
    try {
      const res = await axiosInstance.get("/jobs-payment-type");
      if (res?.data?.data) {
        setPaymentPlan(res.data.data);
      }
    } catch (error) {
      console.log("Unable to fetch payment plans", error);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await axiosInstance.get("/payment/customer-card");

      if (res?.data?.data?.data) {
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
      return 0;
    }
    const country = taxes.find((c) => c.country === countryName);
    return !Number.isNaN(parseFloat(country?.tax))
      ? parseFloat(country.tax)
      : 0;
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
    if (Number.isNaN(parseInt(value))) {
      return "0";
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <>
      {jobPosting && (
        <div className="flex flex-row">
          <div className="pl-4 w-2/3">
            <Typography.Paragraph className="m-0">
              You&apos;re getting a
            </Typography.Paragraph>
            <Radio.Group className="flex flex-col p-4">
              {(Array.isArray(paymentPlan) ? paymentPlan : [])?.map((plan) => {
                const price: any =
                  typeof plan?.price === "number" ? plan.price : 0;
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
                          {plan?.title} ({plan?.months} Months)
                        </Typography.Title>
                        <Typography.Paragraph className="text-gray-400 font-bold text-lg m-0">
                          {formatCurrency(convertedPrice || planPrice)}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          {plan?.description}
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
                  Featured Job Posting
                </Typography.Paragraph>
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
      {jobPosting && (
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
          setPayment={setJobPayment}
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
          setPayment={setJobPayment}
          paymentBody={paymentBody}
        />
      )}
    </>
  );
};

export default Payment;
