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

import { useSession } from "next-auth/react";
import { UserInt } from "@/app/utils/interface";
import AddressModal from "./AddressModal";
import ComingSoonModal from "@/components/shared/Soon/ComingSoonModal";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllAddress } from "@/redux/features/AddressSlice";
import { getCookie } from "cookies-next";
import { fetchAllTax } from "@/redux/features/TaxSlice";

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

const AddressSettings = () => {
  const { data: session } = useSession();
  const [transactionList, setTransactionList] = useState<Array<DataType>>([]);
  const [customerCard, setCustomerCard] = useState<Array<ICard>>([]);
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

  return (
    <Fragment>
      <div className="font-Montserrat lg:m-10 m-6">
        <Container className="mt-8">
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
                    {defaultAddress?.city} - {defaultAddress?.zipcode},{" "}
                    {defaultAddress?.state}
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
                {userCountry && (
                  <Typography.Paragraph className="m-0">
                    {userCountry} - {countryTax}% VAT
                  </Typography.Paragraph>
                )}
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
export default AddressSettings;
