"use client";
import { Fragment, useEffect } from "react";
import { Typography, Divider, Button } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { getCookie } from "cookies-next";
import { RootState } from "@/redux/store";

interface BillingInt {
  next: Function;
  totalPrice: any;
  currency: any;
}

const { Title, Paragraph } = Typography;

const Summary = ({ next, totalPrice, currency }: BillingInt) => {
  const dispatch: any = useAppDispatch();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;

  useEffect(() => {
    dispatch(fetchAllTax());
  }, []);

  const taxes = useAppSelector((state: any) => state.tax.taxes);
  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  console.log(totalPrice);

  const estimatedTax = totalPrice * (getTaxForCountry(userCountry) / 100);
  const priceWithTax = totalPrice + estimatedTax;
  const finalPrice = priceWithTax && priceWithTax * currencyRate;

  return (
    <Fragment>
      <div>
        <Title level={2} className="text-purple-600">
          Summary
        </Title>
        <Divider className="text-purple-500 border-1 mt-0 border-purple-600" />
        <div className="mt-8">
          <Paragraph className="mb-0">Estimated Cost</Paragraph>
          <Title level={3} className="m-0 font-bold">
            Total Amount
          </Title>
          <div className="flex lg:flex-row justify-between md:flex-col sm:flex-col">
            <div>
              <Paragraph className="font-semibold text-blue-500 text-lg m-0">
                {formatCurrency(finalPrice || priceWithTax)}
              </Paragraph>
            </div>
            <div className="border-2 border-blue-500 px-4 py-8 rounded-md">
              <Paragraph className="mb-0">Your order summary</Paragraph>
              <Paragraph className="font-bold text-lg m-0 text-blue-700">
                TOTAL: {formatCurrency(finalPrice || priceWithTax)}
              </Paragraph>
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
