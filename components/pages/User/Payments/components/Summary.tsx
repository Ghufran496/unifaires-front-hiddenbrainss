"use client";
import { Fragment } from "react";
import { Typography, Divider, Button } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";

interface BillingInt {
  next: Function;
  totalPrice: any;
}

const Summary = ({ next, totalPrice }: BillingInt) => {
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

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

  const estimatedTax: any = totalPrice * (getTaxForCountry(userCountry) / 100);
  const planPrice = totalPrice + estimatedTax;
  const convertedPrice = planPrice && planPrice * currencyRate;

  return (
    <Fragment>
      <div>
        <Typography.Title level={2} className="text-purple-600">
          Summary
        </Typography.Title>
        <Divider className="text-purple-500 border-1 mt-0 border-purple-600" />
        <div className="mt-8">
          <Typography.Paragraph className="mb-0">
            Estimated Cost
          </Typography.Paragraph>
          <Typography.Title level={3} className="m-0 font-bold">
            Total Amount
          </Typography.Title>
          <div className="flex lg:flex-row justify-between md:flex-col sm:flex-col">
            <div>
              <Typography.Paragraph className="font-semibold text-blue-500 text-lg m-0">
                {formatCurrency(convertedPrice || planPrice)}
              </Typography.Paragraph>
            </div>
            <div className="border-2 border-blue-500 px-4 py-8 rounded-md">
              <Typography.Paragraph className="mb-0">
                Your order summary
              </Typography.Paragraph>
              <Typography.Paragraph className="font-bold text-lg m-0 text-blue-700">
                {formatCurrency(convertedPrice || planPrice)}
              </Typography.Paragraph>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-4">
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

export default Summary;
