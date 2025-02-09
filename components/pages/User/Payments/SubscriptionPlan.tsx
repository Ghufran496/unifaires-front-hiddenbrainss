"use client";
import { CheckOutlined } from "@ant-design/icons";
import Container from "@/components/shared/container";
import {
  Breadcrumb,
  Button,
  Card,
  Steps,
  Tabs,
  TabsProps,
  Typography,
  message,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import Summary from "./components/Summary";
import Checkout from "./components/CheckOut";
import Address from "./components/Address";
import Confirm from "./components/Confirm";
import config from "@/app/utils/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/utils/axios-config";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { getCookie } from "cookies-next";

const SubscriptionPlan = () => {
  const { data: session, update: sessionUpdate } = useSession();
  const isSubscribe = session?.user.isSubscribe;
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const [subscription, setSubscription] = useState(true);
  const [paymentSection, setPaymentSection] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [billingAddress, setBillingAddress] = useState<any>();
  const [subPlan, setSubPlan] = useState<Array<any>>();
  const [totalPrice, setTotalPrice] = useState<any>();
  const [planId, setPlanId] = useState<any>();
  const [userSubPlan, setUserSubPlan] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const paymentEndPoint = "subscription";
  const userSubPlanId = userSubPlan
    .filter((sub) => sub.status)
    .map((plan) => {
      let planIDs = plan.planId;
      return planIDs;
    });
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  const fetchSubscriptions = async () => {
    try {
      const res = await axiosInstance.get("/subscription-plan", {});

      if (res.status) {
        // console.log("this", res.data.data);
        setSubPlan(res.data.data);
      }
    } catch (error) {
      console.log("unable to fetch sub", error);
    }
  };

  const fetchUserSubscriptionPlan = async () => {
    try {
      const res = await axiosInstance.get(
        "/subscription/user-subscription?status=true"
      );

      if (res.status) {
        setUserSubPlan(res.data.data);
      }
    } catch (error) {
      // handleAxiosError(error)
      console.log("error gettiong user subscription", error);
    }
  };

  useEffect(() => {
    fetchUserSubscriptionPlan();
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    dispatch(fetchAllTax());
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

  const handleSubscribe = (plan: any) => {
    const price = parseFloat(plan.price);
    setTotalPrice(price);
    setPlanId(plan.id);
    setSubscription(false);
    setPaymentSection(true);
  };

  const handleUnsubscribe = async (id: string) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(`/subscription/unsubscribe/${id}`, {
        subscriptionId: id,
      });

      if (res.status) {
        showSuccess("Unsubscribed successfully");
        sessionUpdate({ ...session!.user, isSubscribe: true });

        fetchUserSubscriptionPlan();
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStepClick = (value: number) => {
    setCurrent(value);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div className=" flex lg:flex-row md:flex-col flex-col gap-4 m-4 mr-10">
          {userSubPlan &&
            userSubPlan
              .filter((sub: any) => sub.status)
              .map((subscribedPlans) => {
                const price = subscribedPlans?.subscriptionplan?.price || 0;
                const parsedPrice = parseFloat(price);
                const estimattedTax =
                  parsedPrice * (getTaxForCountry(userCountry) / 100);
                const totalPrice = parsedPrice + estimattedTax;
                const convertedPrice = totalPrice * currencyRate;

                return (
                  <div
                    key={subscribedPlans.id}
                    className="relative border border-black p-8 lg:w-[400px] w-full"
                  >
                    <Typography.Title level={3}>Support plan</Typography.Title>
                    <div className="flex lg:flex-row gap-10">
                      <div>
                        <Typography.Paragraph className="mb-0">
                          Current
                        </Typography.Paragraph>
                        <Typography.Paragraph className="mb-0 font-semibold">
                          {subscribedPlans?.subscriptionplan?.title ||
                            "Starter"}
                        </Typography.Paragraph>
                      </div>
                      <div>
                        <Typography.Paragraph className="mb-0">
                          Plan Cost
                        </Typography.Paragraph>
                        <Typography.Paragraph className="font-semibold">
                          {formatCurrency(convertedPrice || totalPrice)}/year
                        </Typography.Paragraph>
                      </div>
                    </div>
                    <Typography.Link>
                      Learn more about Pro access for Organisations
                    </Typography.Link>
                    <div className="mt-4">
                      <Button
                        type="primary"
                        size="large"
                        className="rounded-sm"
                        loading={loading}
                        onClick={() => handleUnsubscribe(subscribedPlans.id)}
                      >
                        Unsubscribe
                      </Button>
                    </div>
                  </div>
                );
              })}
          {userSubPlan && userSubPlan.filter((sub: any) => sub.status) && (
            <div className="relative border border-black p-8 lg:w-[400px] md:w-[400px] w-full">
              <Typography.Title level={3}>Support plan</Typography.Title>
              <div className="flex lg:flex-row gap-10">
                <div>
                  <Typography.Paragraph className="mb-0">
                    Current
                  </Typography.Paragraph>
                  <Typography.Paragraph className="mb-0 font-semibold">
                    Starter
                  </Typography.Paragraph>
                </div>
                <div>
                  <Typography.Paragraph className="mb-0">
                    Plan Cost
                  </Typography.Paragraph>
                  <Typography.Paragraph className="font-semibold">
                    0/year
                  </Typography.Paragraph>
                </div>
              </div>
              <Typography.Link>
                Learn more about Pro access for Organisations
              </Typography.Link>
              <div className="mt-4">
                <Button
                  type="primary"
                  size="large"
                  className="rounded-sm"
                  // loading={loading}
                >
                  {/* Modify Plan */}
                  Current Plan
                </Button>
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Plans",
      children: (
        <div>
          <div>
            <Typography.Paragraph className="font-semibold">
              Choose the right support plan for your need{" "}
            </Typography.Paragraph>
            <div className="flex lg:flex-row md:flex-row flex-col  gap-10 ">
              {!isSubscribe && (
                <Card className=" bg-[#5F38DD] rounded-[20px] p-4 text-white  lg:w-[300px] md:w-[400px]">
                  <div className="relative flex flex-col justify-between min-h-[380px]">
                    <div>
                      <div>
                        <Typography.Title
                          level={4}
                          className="font-bold text-white "
                        >
                          1 Year - Starter
                        </Typography.Title>
                        <Typography.Title
                          level={3}
                          className="text-white mt-2 font-bold"
                        >
                          $0{" "}
                        </Typography.Title>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-6 mt-2 items-center">
                          <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                          <Typography.Paragraph className="text-white font-semibold">
                            68% Off | Save $106.40
                          </Typography.Paragraph>
                        </div>
                        <div className="flex gap-6">
                          <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                          <Typography.Paragraph className="text-white font-semibold">
                            Billed Annually
                          </Typography.Paragraph>
                        </div>
                        <div className="flex gap-6">
                          <CheckOutlined className="text-green-300 -mt-[15px] text-lg" />
                          <Typography.Paragraph className="text-white font-semibold">
                            Renews at $49
                          </Typography.Paragraph>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 text-center mt-4 w-full ">
                      <Button
                        size="large"
                        className="bg-white text-black font-bold rounded-[40px] w-full h-[50px]"
                      >
                        Current Plan
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
              {subPlan &&
                subPlan.map((plan) => {
                  const price: any = parseFloat(plan.price);
                  const estimatedTax: any =
                    price * (getTaxForCountry(userCountry) / 100);
                  const planPrice = price + estimatedTax;

                  const convertedPrice = planPrice && planPrice * currencyRate;
                  return (
                    <Card
                      key={plan.id}
                      className="bg-[#5F38DD] rounded-[20px] p-4 text-white lg:w-[300px] md:w-[400px] "
                    >
                      <div className="relative min-h-[380px]">
                        <div>
                          <Typography.Title
                            level={4}
                            className="font-bold text-white "
                          >
                            {plan.title}
                          </Typography.Title>
                          <Typography.Title
                            level={3}
                            className="text-white mt-2 font-bold"
                          >
                            {formatCurrency(convertedPrice || planPrice)}
                          </Typography.Title>
                        </div>
                        <div className="flex flex-col gap-2">
                          {plan.meta &&
                            JSON.parse(plan.meta).map(
                              (item: { title: string }, index: number) => (
                                <div
                                  key={index}
                                  className="flex gap-6 mt-2 items-center"
                                >
                                  <CheckOutlined className="text-green-300 text-lg" />
                                  <Typography.Paragraph className="text-white font-semibold m-0 ">
                                    {item?.title}
                                  </Typography.Paragraph>
                                </div>
                              )
                            )}
                        </div>
                        {userSubPlan && userSubPlanId.includes(plan.id) ? (
                          <div className="absolute bottom-0 text-center mt-4 w-full">
                            <Button
                              size="large"
                              className="bg-white text-black font-bold rounded-[40px] w-full h-[50px] mt-7"
                              // onClick={() => handleSubscribe(plan)}
                            >
                              Current Plan
                            </Button>
                          </div>
                        ) : (
                          <div className="absolute bottom-0 text-center mt-4 w-full">
                            <Button
                              size="large"
                              className="bg-white text-black font-bold rounded-[40px] w-full h-[50px] mt-7"
                              onClick={() => handleSubscribe(plan)}
                            >
                              Subscribe
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
            </div>

            <div className="mt-4">
              <Typography.Paragraph className="m-0">
                Have questions about about support billing?
              </Typography.Paragraph>
              <Typography.Link href="/tickets" className="font-semibold">
                Create Ticket
              </Typography.Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const requestBody = {
    cardId: selectedCard?.id,
    planId: `${planId}`,
    country: userCountry,
  };

  const steps = [
    {
      title: "Summary",
      content: <Summary totalPrice={totalPrice} next={next} />,
    },
    {
      title: "Checkout",
      content: (
        <Checkout
          current={current}
          next={next}
          prev={prev}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ),
    },
    {
      title: "Billing Address",
      content: (
        <Address
          next={next}
          prev={prev}
          setBillingAddress={setBillingAddress}
        />
      ),
    },
    {
      title: "Confirm",
      content: (
        <Confirm
          billingAddress={billingAddress}
          totalPrice={totalPrice}
          requestBody={requestBody}
          prev={prev}
          paymentEndPoint={paymentEndPoint}
          selectedCard={selectedCard}
          setCurrent={setCurrent}
        />
      ),
    },
  ];
  return (
    <Fragment>
      {subscription && (
        <Container>
          <div className="lg:m-8 md:m-6 m-4">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { title: "Payment", href: "/user/payments" },
                  { title: "Subscription" },
                ]}
              />
            </div>
            <Typography.Title level={2} className="font-bold">
              Subscriptions
            </Typography.Title>

            <Button
              type="primary"
              size="large"
              className="flex ml-auto rounded-sm"
              onClick={() => router.push("/user/help")}
            >
              Create a Ticket{" "}
            </Button>
            <div>
              <Tabs
                defaultActiveKey="1"
                className="relative"
                size="middle"
                items={items}
                // onChange={onChange}
              />
            </div>
          </div>
        </Container>
      )}
      {paymentSection && (
        <div>
          <div className="lg:m-8 md:m-6 m-4">
            <Breadcrumb
              items={[
                {
                  title: "Payment",
                  href: "/user/payments",
                },
                {
                  title: "Subscription",
                  className: "cursor-pointer",
                  onClick: () => {
                    setPaymentSection(false);
                    setSubscription(true);
                  },
                },
                { title: "Pay" },
              ]}
            />
          </div>
          <div className="m-[2em]">
            <Steps
              percent={((current + 1) / 4) * 100}
              onChange={handleStepClick}
              current={current}
              items={steps}
            />
            <div className="mt-10">{steps[current].content}</div>
            <div className="mt-10">
              {current === steps.length - 1 && (
                <div>
                  <Button
                    style={{ margin: "0 8px" }}
                    size="large"
                    // onClick={() => prev()}
                  >
                    Previous
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SubscriptionPlan;
