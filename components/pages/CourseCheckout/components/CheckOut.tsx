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

interface PaymentInt {
  next: Function;
  prev: Function;
  selectedCard: any;
  courseId: any;
  setReqBody: any;
  setSelectedCard: any;
}

const Checkout = ({
  next,
  prev,
  selectedCard,
  courseId,
  setSelectedCard,
  setReqBody,
}: PaymentInt) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalCard, setIsModalCard] = useState(false);
  const [customerCard, setCustomerCard] = useState<Array<any>>([]);
  const [isNigeria, setIsNigeria] = useState(true);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;

  const paymentBody = {
    courseIds: courseId,
    country: locationData?.country,
  };

  useEffect(() => {
    if (locationData?.country !== "Nigeria") {
      setIsNigeria(false);
    }
  }, [locationData]);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const fetchCards = async () => {
    await axiosInstance
      .get("/payment/customer-card")
      .then((res) => {
        // console.log(res);
        setCustomerCard(res.data.data.data);
        setIsModalCard(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Fragment>
      {isNigeria ? (
        // <NgPayment
        //   next={next}
        //   prev={prev}
        //   paymentType="course"
        //   setPayment={setReqBody}
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
          setPayment={setReqBody}
          paymentBody={paymentBody}
        />
      ) : (
        <StripePayment
          next={next}
          prev={prev}
          fetchCards={fetchCards}
          customerCard={customerCard}
          setSelectedCard={setSelectedCard}
          isModalCard={isModalCard}
          setIsModalCard={setIsModalCard}
          setPayment={setReqBody}
          paymentBody={paymentBody}
        />
      )}
    </Fragment>
  );
};

export default Checkout;
