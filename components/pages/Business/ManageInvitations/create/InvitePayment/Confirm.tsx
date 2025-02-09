"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components
import {
  Button,
  Card,
  Collapse,
  Divider,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/app/utils/axios-config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import courseId from "../../../Courses/Create/WithVideos/courseId";
import { getCookie } from "cookies-next";
import { RootState } from "@/redux/store";
import {
  fetchBusinessDiscount,
  fetchCountryDiscount,
} from "@/redux/features/DiscountSlice";

interface ReviewInt {
  next: Function;
  prev: Function;
  totalPrice: any;
  billingAddress: any;
  selectedCard: any;
  inviteList: any;
  setCurrent: any;
}

const ReviewPost = ({
  next,
  inviteList,
  prev,
  totalPrice,
  billingAddress,
  selectedCard,
  setCurrent,
}: ReviewInt) => {
  const { data: session } = useSession();
  const businessId: any = session?.user.id;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const handleMakePayment = async () => {
    const paymentEndpoint =
      inviteList && userCountry == "Nigeria"
        ? // ? "/ng-payment/invite-card-otp"
          "/payment/invite-payment"
        : "/payment/invite-payment";
    setLoading(true);
    try {
      const payFor = await axiosInstance.post(`${paymentEndpoint}`, {
        ...inviteList,
      });
      if (payFor) {
        // message.success("Payment made Successfully");
        toast.success("Payment made Sucessfully");
        setIsModalOpen(true);
        setTimeout(function () {
          router.push("/business/manage-accounts");
        }, 2000);
      }
    } catch (error: any) {
      message.error(`${error?.response?.data?.message}`);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(fetchAllTax());
    if (userCountry) {
      dispatch(fetchCountryDiscount({ type: "invite", country: userCountry }));
    }
    if (businessId) {
      dispatch(fetchBusinessDiscount({ type: "invite", businessId }));
    }
  }, []);

  const taxes = useAppSelector((state: RootState) => state.tax.taxes);
  const countryDiscount = useAppSelector(
    (state: RootState) => state.discounts.countryDiscount
  );
  const businessDiscount = useAppSelector(
    (state: RootState) => state.discounts.businessDiscount
  );

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

  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const estimatedTax = totalPrice * (getTaxForCountry(userCountry) / 100);
  const applicableDiscount =
    businessDiscount && businessDiscount?.discount !== 0
      ? businessDiscount
      : countryDiscount;
  const discountAmount = totalPrice * (applicableDiscount?.discount / 100 || 0);
  const beforeTax = totalPrice - discountAmount;
  const finalPrice = totalPrice - discountAmount + estimatedTax;
  return (
    <Fragment>
      <div className="flex flex-row gap-8 p-4">
        <div className="flex-initial w-full">
          <Typography.Title level={3}>Review Your order</Typography.Title>
          <Divider className="mt-0" />
          <div>
            <Typography.Paragraph className="text-lg font-bold">
              Billing Address{" "}
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => prev()}
              >
                Change
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.fullname}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.city}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.address}
            </Typography.Paragraph>
            <Typography.Paragraph className="m-0">
              {billingAddress?.country}
            </Typography.Paragraph>
          </div>
          <Divider />
          <div>
            <Typography.Paragraph className="text-lg font-bold">
              Payment method
              <span
                className="text-blue-600 font-normal text-sm cursor-pointer pl-2"
                onClick={() => {
                  setCurrent(3);
                }}
              >
                Change
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph>
              Ending in {selectedCard?.last4}
            </Typography.Paragraph>
          </div>

          <Divider />
          <div>
            <Typography.Paragraph>
              Add a gift card, vourcher or promotional code.
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
        </div>
        <div className="flex flex-initial items-center px-10 w-[45%]">
          <Card className="w-max bg-gray-50">
            <Button
              type="primary"
              size="large"
              className="flex justify-center items-center w-full mb-4"
              onClick={handleMakePayment}
              loading={loading}
            >
              Place your order
            </Button>
            <Typography.Paragraph className="text-gray-400">
              By clicking to place your order, you agree to unifaires terms of
              use and privacy policy.
            </Typography.Paragraph>
            <Divider />
            <div>
              <Typography.Paragraph className="font-semibold">
                ORDER SUMMARY
              </Typography.Paragraph>
              <Typography.Paragraph className="flex justify-between">
                Items:
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(totalPrice) || "0.00"}
                </span>
              </Typography.Paragraph>

              <Typography.Paragraph className="flex justify-between">
                <span>
                  {businessDiscount && businessDiscount?.discount !== 0
                    ? "Business Discount"
                    : "Country Discount"}
                  <span className="text-purple-600 font-bold">
                    ({applicableDiscount?.discount}%):
                  </span>
                </span>
                <span className="ml-auto text-purple-600 font-bold">
                  - {formatCurrency(discountAmount) || "0.00"}
                </span>
              </Typography.Paragraph>
              {/* <Typography.Paragraph className="flex justify-between">
                Shopping & Handling:
                <span className="ml-auto text-purple-600 font-bold">$0.00</span>
              </Typography.Paragraph> */}
              <Typography.Paragraph className="flex justify-between">
                Total before tax:
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(beforeTax) || "0.00"}
                </span>
              </Typography.Paragraph>
              <Typography.Paragraph className="flex justify-between">
                <span>
                  Estimated tax to be collected
                  <span className="text-purple-600 font-bold">
                    ({getTaxForCountry(userCountry)}%):
                  </span>
                </span>
                <span className="ml-auto text-purple-600 font-bold">
                  {formatCurrency(estimatedTax) || "0.00"}
                </span>
              </Typography.Paragraph>

              <Divider />
              <div className="w-full">
                <Typography.Title level={4} className=" flex text-red-800">
                  Payment Total:{" "}
                  <span className="text-lg text-purple-600 ml-auto">
                    {formatCurrency(finalPrice)}
                  </span>
                </Typography.Title>
                <Collapse ghost size="small">
                  {/* <Collapse.Panel
                    key={"Payment-Currency"}
                    header={
                      <Typography.Paragraph className="mb-0">
                        Selected Payment Currency
                      </Typography.Paragraph>
                    }
                  >
                    <div className="flex ">
                      <Select
                        placeholder="USD"
                        style={{ width: 150 }}
                        className="flex ml-auto"
                        options={[
                          { value: "USD", label: "USD" },
                          {
                            value: "NGN",
                            label: "NGN",
                          },
                          {
                            value: "EUR",
                            label: "EUR",
                          },
                        ]}
                      />
                    </div>
                  </Collapse.Panel> */}
                  <Collapse.Panel
                    key={"Exchange-Rate"}
                    header={
                      <Typography.Paragraph className="m-0">
                        Applicable Exchange Rate
                      </Typography.Paragraph>
                    }
                  >
                    {currencyRate && (
                      <Typography.Paragraph className="m-0  text-base font-semibold italic">
                        1 USD = {formatCurrency(currencyRate)}
                      </Typography.Paragraph>
                    )}
                  </Collapse.Panel>
                </Collapse>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default ReviewPost;
