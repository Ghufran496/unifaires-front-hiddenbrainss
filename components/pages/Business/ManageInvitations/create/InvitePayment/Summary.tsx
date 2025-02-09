"use client";
import { Fragment, useEffect, useState } from "react";
import { Typography, Divider, Button, Radio, Card, Space } from "antd";
import axiosInstance from "@/app/utils/axios-config";
import { RadioChangeEvent } from "antd/lib";
import { toast } from "react-toastify";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";

interface BillingInt {
  next: Function;
  inviteList: any;
  paymentTypeId: any;
  setTotalPrice: any;
  totalPrice: any;
  setPaymentTypeId: any;
}

const Summary = ({
  next,
  inviteList,
  paymentTypeId,
  setTotalPrice,
  totalPrice,
  setPaymentTypeId,
}: BillingInt) => {
  const dispatch: any = useAppDispatch();
  const [radioValue, setRadioValue] = useState(0);
  const [paymentPlan, setPaymentPlan] = useState<Array<any>>();
  const numberOfInvites = inviteList.invites.length;
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const fetchPaymentType = async () => {
    await axiosInstance.get("/invite-payment-type").then((res) => {
      setPaymentPlan(res.data.data);
    });
  };

  const handleNext = () => {
    if (paymentTypeId !== null) {
      next();
    } else {
      toast.error("Select payment type");
    }
  };
  useEffect(() => {
    dispatch(fetchAllTax());

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
  const handlePlanChange = (e: any) => {
    const price = e.target.value;
    const convertedPrice = price && price * currencyRate;
    setTotalPrice(convertedPrice || price);
  };

  return (
    <Fragment>
      <div>
        <Typography.Title level={2} className="text-purple-600">
          Summary
        </Typography.Title>
        <Divider className="text-purple-500 border-1 mt-0 border-purple-600" />
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
                <Typography.Paragraph className="italic font-semibold">
                  No of Invites:{" "}
                  <span className="text-blue-500 font-bold text-base">
                    {numberOfInvites}
                  </span>
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
        <div className="flex flex-row gap-4 mt-4">
          <Button
            size="large"
            type="primary"
            className="ml-auto"
            onClick={handleNext}
            // loading={loading}
          >
            Proceed
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Summary;
