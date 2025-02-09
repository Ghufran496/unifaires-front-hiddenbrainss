"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// import NextLink from "next/link";
// antd components

import { useSession } from "next-auth/react";
import axiosInstance from "@/app/utils/axios-config";
import NgPayment from "@/components/pages/NgPayment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import StripePayment from "@/components/pages/StripePayment";
import { useAppDispatch } from "@/redux/hooks";

interface PaymentInt {
  next: Function;
  prev: Function;
  selectedCard: any;
  paymentTypeId: any;
  inviteList: {
    invites: Array<any>;
  };
  setInviteList: any;
  setSelectedCard: any;
}

const Checkout = ({
  next,
  prev,
  selectedCard,
  inviteList,
  setSelectedCard,
  paymentTypeId,
  setInviteList,
}: PaymentInt) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalCard, setIsModalCard] = useState(false);
  const [customerCard, setCustomerCard] = useState<Array<any>>([]);
  const [isNigeria, setIsNigeria] = useState(true);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;

  const paymentBody = {
    ...inviteList,
    country: locationData?.country,
    invitePaymentTypeId: paymentTypeId,
  };

  useEffect(() => {
    if (locationData?.country !== "Nigeria") {
      setIsNigeria(false);
    }
  }, [locationData]);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

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
    fetchCards();
  }, []);

  return (
    <Fragment>
      {isNigeria ? (
        <StripePayment
          next={next}
          prev={prev}
          fetchCards={fetchCards}
          customerCard={customerCard}
          setSelectedCard={setSelectedCard}
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          setPayment={setInviteList}
          paymentBody={paymentBody}
        />
      ) : (
        // <NgPayment
        //   next={next}
        //   prev={prev}
        //   paymentType="invite"
        //   setPayment={setInviteList}
        //   paymentBody={paymentBody}
        // />
        <StripePayment
          next={next}
          prev={prev}
          fetchCards={fetchCards}
          customerCard={customerCard}
          setSelectedCard={setSelectedCard}
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          setPayment={setInviteList}
          paymentBody={paymentBody}
        />
      )}
    </Fragment>
  );
};

export default Checkout;
