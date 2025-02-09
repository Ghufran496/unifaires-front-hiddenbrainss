"use client";
import { Fragment, useEffect, useState } from "react";
import Container from "@/components/shared/container";
import {
  Button,
  Card,
  Divider,
  Radio,
  RadioChangeEvent,
  Tabs,
  TabsProps,
  Typography,
  message,
} from "antd";
import PaymentStatCard from "./PaymentStatCard";
import MyTransactionsList from "./TransactionList";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import Image from "next/image";
import WalletImage from "@/public/images/wallet.png";
import SendMoney from "@/public/images/sendMoney.png";
import AddCard from "./components/AddCard";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import AddressModal from "./components/AddressModal";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import { getCookie } from "cookies-next";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import PaymentMethods from "./components/PaymentMethods";
import AddressSettings from "./components/AddressSettings";

interface DataType extends UserInt {
  completed: string;
  paymentType: string;
  date: string;
  amount: any;
  item: string;
  user: UserInt;
}

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
  const { data: session } = useSession();
  const [transactionList, setTransactionList] = useState<Array<DataType>>([]);
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);
  const [isModalCard, setIsModalCard] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressInt | null>(
    null
  );
  const [userSubPlan, setUserSubPlan] = useState<IPlan>();
  const userId = session?.user?.id;
  const dispatch: any = useAppDispatch();

  const [comingSoon, setComingSoon] = useState(false);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;

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
    return country ? country.tax : "0";
  };

  const countryTax = getTaxForCountry(userCountry);
  const fetchUserCards = async () => {
    await axiosInstance
      .get("/payment/customer-card")
      .then((res) => {
        setCustomerCard(res.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserSubscriptionPlan = async () => {
    await axiosInstance
      .get("/subscription/user-subscription")
      .then((res) => {
        setUserSubPlan(res.data.data.subscriptionplan);
        // setSubPlan(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserSubscriptionPlan();
    fetchUserCards();
    dispatch(fetchAllAddress(userId));
    axiosInstance.get("/associate-transactions/business").then((res) => {
      setTransactionList(res.data.data);
    });
  }, []);

  const addressList: Array<AddressInt> = useAppSelector(
    (state: any) => state.address.addresses
  );

  const defaultAddress: any = useAppSelector(
    (state: any) => state.address.defaultAddress
  );

  const handleSelectCard = (e: RadioChangeEvent) => {
    console.log("this is the value", e.target.value);
  };

  const handleDeleteCard = async (id: any) => {
    await axiosInstance
      .post("/payment/remove-card", {
        cardId: id,
      })
      .then((res) => {
        fetchUserCards();
        message.success("Card removed Successfully");
      })
      .catch((error) => {
        message.error("Unable to remove card");
        console.log(error);
      });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Overview",
      children: <MyTransactionsList />,
    },
    {
      key: "2",
      label: "Payment Methods",
      children: <PaymentMethods />,
    },
    {
      key: "3",
      label: "Address Settings",
      children: <AddressSettings />,
    },
  ];

  return (
    <Fragment>
      <div className="font-Montserrat lg:m-10 m-6">
        <div>
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
                // href="/business/payments/make-payments"
              >
                Make Payments
              </Button>
            </div>
          </div>
        </div>
        <div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
      <ComingSoonModal comingSoon={comingSoon} setComingSoon={setComingSoon} />
    </Fragment>
  );
};
export default Payments;
