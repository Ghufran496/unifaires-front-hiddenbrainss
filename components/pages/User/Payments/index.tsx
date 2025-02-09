"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import {
  Button,
  Card,
  Divider,
  Radio,
  RadioChangeEvent,
  Typography,
  message,
} from "antd";
import PaymentStatCard from "./PaymentStatCard";
import TransactionList from "./TransactionList";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import Image from "next/image";
import WalletImage from "@/public/images/wallet.png";
import SendMoney from "@/public/images/sendMoney.png";
import AddCard from "./AddCard";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import AddressModal from "./components/AddressModal";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import UserWallet from "./Wallet";
import { getCookie } from "cookies-next";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import axiosInstance from "@/app/utils/axios-config";
import { RootState } from "@/redux/store";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

interface AddressInt {
  zipcode: string;
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}

interface IPlan {
  id: number;
  title: string;
  price: string;
  meta: string;
}

const Payments = () => {
  const { data: session, status } = useSession();
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);
  const [isModalCard, setIsModalCard] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  // const [addressList, setAddressList] = useState<Array<AddressInt>>([]);
  const [selectedAddress, setSelectedAddress] = useState<AddressInt | null>(
    null
  );
  const [userSubPlan, setUserSubPlan] = useState<any>();
  const userId = session?.user?.id;
  const [comingSoon, setComingSoon] = useState(false);
  const dispatch: any = useAppDispatch();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  useEffect(() => {
    dispatch(fetchAllTax());
  }, []);

  const taxes = useAppSelector((state: any) => state.tax.taxes);
  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country == countryName);
    return country ? country.tax : 0;
  };
  const countryTax = getTaxForCountry(userCountry);

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const parsedPlanPrice =
    userSubPlan && parseFloat(userSubPlan?.subscriptionplan.price);

  const estimatedTax = parsedPlanPrice * (countryTax / 100);
  const planPrice = parsedPlanPrice + estimatedTax || 0;
  const convertedPrice = planPrice && planPrice * currencyRate;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const fetchUserCards = async () => {
    try {
      const res = await axiosInstance.get("/payment/customer-card");

      if (res.status) {
        // console.log(res.data.data.data);
        setCustomerCard(res.data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserSubscriptionPlan = async () => {
    try {
      const res = await axiosInstance.get("/subscription/user-subscription");

      if (res.status) {
        const resData = res.data.data;
        const userSubscription = resData.find((sub: any) => sub.status);
        setUserSubPlan(userSubscription);
      }
    } catch (error) {
      // handleAxiosError(error)
      console.log("error gettiong user subscription", error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllAddress(userId));
    fetchUserSubscriptionPlan();
    fetchUserCards();
  }, [status]);

  const addressList: Array<AddressInt> = useAppSelector(
    (state: any) => state.address.addresses
  );

  const defaultAddress: any = useAppSelector(
    (state: any) => state.address.defaultAddress
  );

  // console.log(addressList);

  const handleSelectCard = (e: RadioChangeEvent) => {
    console.log("this is the value", e.target.value);
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
        showSuccess("Card removed Successfully");
        console.log(res.data);
      })
      .catch((error) => {
        handleAxiosError(error);
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="font-Montserrat lg:m-10 m-6">
        <Container>
          <Typography.Paragraph className="mb-0 text-gray-400 font-bold">
            Note: Information on this page is updated daily
          </Typography.Paragraph>
          <div className="flex lg:flex-row md:flex-row flex-col justify-between">
            <Typography.Title className="mt-6">
              Bills & Payments
            </Typography.Title>
            <div className="flex flex-row mt-2 gap-4 items-center">
              <Typography.Link>How Billing Work</Typography.Link>
              <Button
                type="primary"
                size="large"
                className="font-semibold rounded-md"
                onClick={() => {
                  setComingSoon(true);
                }}
                // href="/user/payments/make-payments"
              >
                Make Payments
              </Button>
            </div>
          </div>
        </Container>
        <section className="content-header">
          <Container className="lg:p-6 md:p-4 p-2 container-fluid">
            <UserWallet />
          </Container>
        </section>

        {/* <section className="content-header">
        <Container className="p-6 container-fluid">
          <PaymentStatCard />
        </Container>
      </section> */}

        <Container className="mt-8">
          <div>
            <Typography.Paragraph className="text-lg font-semibold">
              View all{" "}
              <Typography.Link
                href="/user/payments/transactions"
                className="hover:underline"
              >
                {" "}
                Transactions
              </Typography.Link>
            </Typography.Paragraph>
          </div>

          {/* Subscription Plan */}
          <div className="border-2 p-8 mb-10">
            <div className="flex lg:flex-row md:flex-row flex-col lg:justify-between">
              <Typography.Title level={3} className="font-bold">
                Subscription Plan
              </Typography.Title>
              <Link href={"/user/payments/subscription"}>
                <Button
                  size="middle"
                  className="bg-gray-200 text-black font-semibold rounded-sm"
                >
                  Edit Plan
                </Button>
              </Link>
            </div>
            <div className="flex lg:flex-row gap-10">
              <div>
                <Typography.Paragraph className="mb-0">
                  Current
                </Typography.Paragraph>
                <Typography.Paragraph className="mb-0 font-semibold">
                  {userSubPlan?.subscriptionplan.title || "Starter"}
                </Typography.Paragraph>
              </div>
              <div>
                <Typography.Paragraph className="mb-0">
                  Plan Cost
                </Typography.Paragraph>
                <Typography.Paragraph className="font-semibold">
                  {planPrice && formatCurrency(convertedPrice || planPrice)}
                  /year
                </Typography.Paragraph>
              </div>
            </div>
            <div>
              <Typography.Paragraph className="font-semibold">
                Have a questions around subscription plan and billing?
              </Typography.Paragraph>
              <Typography.Link href="/tickets" className="font-bold">
                Create a Ticket
              </Typography.Link>
            </div>
          </div>
          {/* Send Money to Unifaires */}
          <div className="mb-10">
            <div className="flex lg:flex-row md:flex-col-reverse flex-scol-reverse bg-purple-300 lg:p-6 p-4 rounded-md">
              <div className="lg:w-3/5 w-full">
                <Typography.Paragraph className="font-semibold text-white mt-2 lg:text-left md:text-left text-center text-[24px]">
                  Send Money to Unifaires Accounts
                </Typography.Paragraph>
                <Typography.Paragraph className="text-white lg:text-left md:text-left text-center">
                  Send Money to Unifaires Accounts and others
                </Typography.Paragraph>
                <div className="flex justify-center md:justify-start lg:justify-start">
                  <Button
                    // href="/user/payments/send-money"
                    type="primary"
                    size="large"
                    onClick={() => {
                      setComingSoon(true);
                    }}
                    className="bg-white text-purple-300 rounded-md font-bold "
                  >
                    Send Money
                  </Button>
                </div>
              </div>
              <div className="lg:block md:hidden relative lg:w-2/5">
                <div className="lg:absolute md:relative sm:flex lg:-top-[2.8rem] md:top-0 sm:top-0 right-0">
                  <Image
                    src={SendMoney}
                    alt="wallet"
                    // width={300}
                    // height={200}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Payment Method */}
          <div className="border-2 p-8 mb-10">
            <Typography.Title level={3} className="font-bold">
              Payment Methods
            </Typography.Title>
            <div className="flex lg:flex-row md:flex-col-reverse flex-col-reverse bg-purple-300 lg:p-6 p-4 rounded-md">
              <div className="lg:w-3/5 w-full">
                <Typography.Paragraph className="font-semibold text-white">
                  Discover Effortless Transactions: Your Gateway to Secure
                  Payment Solutions!
                </Typography.Paragraph>
                <Typography.Paragraph className="text-white">
                  Experience seamless transactions with our diverse payment
                  methods, tailored for your convenience. With our hassle-free
                  payment solutions, enjoy swift, reliable, and worry-free
                  transactions every time.
                </Typography.Paragraph>
              </div>
              <div className="lg:block md:hidden relative lg:w-2/5">
                <div className="lg:absolute md:relative sm:relative lg:-top-[6rem] md:top-0 sm:top-0 right-0">
                  <Image
                    src={WalletImage}
                    alt="wallet"
                    // width={1500}
                    // height={1400}
                  />
                </div>
              </div>
            </div>
            <div className="my-10">
              <Typography.Paragraph className="text-lg font-bold mb-0">
                Cards
              </Typography.Paragraph>
              <div className="p-4 border rounded-md">
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
              </div>
            </div>
            <AddCard
              isModalCard={isModalCard}
              setIsModalCard={setIsModalCard}
              fetchUserCards={fetchUserCards}
            />
            <Button
              type="primary"
              size="large"
              className="w-full rounded-md"
              onClick={() => setIsModalCard(true)}
            >
              Add a Payment Method
            </Button>
          </div>
          {/* Billing Settings */}
          <div className="border-2 p-8 mb-10">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
              <Typography.Title level={3} className="font-bold">
                Billing Settings
              </Typography.Title>
              <Button
                className="bg-gray-200  rounded-sm"
                size="large"
                onClick={() => setAddressModal(true)}
              >
                Edit Address
              </Button>
            </div>
            {addressModal && (
              <AddressModal
                addressModal={addressModal}
                setAddressModal={setAddressModal}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                addressList={addressList}
              />
            )}
            <div>
              <Typography.Paragraph className="mb-0 font-semibold text-lg">
                Address
              </Typography.Paragraph>
              <Typography.Paragraph className="mt-0">
                This address appears on your monthly invoice and should be the
                legal address of your home or business
              </Typography.Paragraph>
              {defaultAddress !== undefined && !selectedAddress ? (
                <div>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {defaultAddress?.fullname}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {defaultAddress?.address}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {defaultAddress?.city} - {defaultAddress?.zipcode},
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {defaultAddress?.country}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {defaultAddress?.phoneNumber}
                  </Typography.Paragraph>
                </div>
              ) : (
                <div>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {selectedAddress?.fullname}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {selectedAddress?.address}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {selectedAddress?.city} - {selectedAddress?.zipcode},
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {selectedAddress?.country}
                  </Typography.Paragraph>
                  <Typography.Paragraph className="m-0 text-gray-500">
                    {selectedAddress?.phoneNumber}
                  </Typography.Paragraph>
                </div>
              )}
            </div>
            <div>
              <Typography.Paragraph className="mb-0 font-semibold text-lg">
                Tax Location
              </Typography.Paragraph>
              <div className="mb-2">
                <Typography.Paragraph className="m-0">
                  {userCountry} - {countryTax}% VAT
                </Typography.Paragraph>
                <Typography.Link className="font-semibold">
                  More info
                </Typography.Link>
              </div>
              <div>
                <Typography.Paragraph className="m-0">
                  Your tax location determines the taxes that are applied to
                  your bill.
                </Typography.Paragraph>
                <Typography.Link className="font-semibold">
                  How do i correct my Tax location?
                </Typography.Link>
              </div>
            </div>
            <div className="mt-4">
              <Typography.Paragraph className="mb-0 font-semibold text-lg">
                Tax ID
              </Typography.Paragraph>
              <Typography>
                Registered businesses can enter their tax identification number
                to remove tax charges from future bills
              </Typography>
              <Button
                type="primary"
                size="large"
                className="mt-4 bg-gray-300 border-none text-black rounded-md"
              >
                Add Tax ID
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <ComingSoonModal comingSoon={comingSoon} setComingSoon={setComingSoon} />
    </Fragment>
  );
};
export default Payments;
