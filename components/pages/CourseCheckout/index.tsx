"use client";

import { Button, Steps, Typography } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import Summary from "./components/Summary";
import Checkout from "./components/CheckOut";
import Address from "./components/Address";
import Confirm from "./components/Confirm";
import { useState, useEffect } from "react";
// import { AddressInt, ICard } from "@/app/utils/interface";

import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { fetchSingleCourse } from "@/redux/features/CoursesSlice";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";

const { Title, Paragraph } = Typography;

const CourseCheckout = () => {
  const { data: session } = useSession();
  const [selectedCard, setSelectedCard] = useState<any>();
  const [billingAddress, setBillingAddress] = useState<any>();
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const params = useSearchParams();
  let decodedParams:any = params.get('d');
  decodedParams = Buffer.from(decodedParams, 'base64').toString('utf8');
  console.log("decodedParams ===>", decodedParams)
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationCurrency = info && info.data.currency;
  const userCountry = info && info.data.country;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;
  // const parsedPrice: any = params.get("totalPrice");
  const parsedPrice: any = JSON.parse(decodedParams)?.totalPrice;
  const price: any = parseFloat(parsedPrice);
  const stringId: any = JSON.parse(decodedParams)?.courseId;
  // const stringId: any = params.get("courseId");
  const courseId = stringId && JSON.parse(stringId);
  const [reqBody, setReqBody] = useState<any>();
  const courseSlug: any = params.get("courseSlug");
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTax());
  }, []);

  useEffect(() => {
    setTotalPrice(price);

    try {
      dispatch(fetchSingleCourse(courseSlug)).then((res: any) => {
        // console.log("here is the res", res);
        if (res.type === "course/fetchSingleCourse/fulfilled") {
          const data = res.payload;
          const price =
            data.pricing &&
            data.pricing.amount -
              data.pricing.amount * (data.pricing.discount / 100);

          setTotalPrice(price);
        }
      });
    } catch (error) {
      console.log("Here is the error", error);
    }
  }, [price]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleStepClick = (value: number) => {
    setCurrent(value);
  };

  const steps = [
    {
      title: "Summary",
      content: (
        <Summary totalPrice={totalPrice} next={next} currency={currency} />
      ),
    },
    {
      title: "Checkout",
      content: (
        <Checkout
          next={next}
          prev={prev}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          courseId={courseId}
          setReqBody={setReqBody}
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
          courseId={courseId}
          prev={prev}
          selectedCard={selectedCard}
          setCurrent={setCurrent}
          reqBody={reqBody}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="mx-[-2.5rem]">
        <div className="m-[5em]">
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
    </div>
  );
};

export default CourseCheckout;
