"use client";
import { CheckOutlined } from "@ant-design/icons";
import Container from "@/components/shared/container";
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Radio,
  Steps,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import { Fragment, useState } from "react";
import Summary from "../components/Summary";
import Checkout from "../components/CheckOut";
import Address from "../components/Address";
import Confirm from "../components/Confirm";

interface AddressInt {
  id: number;
  address: string;
  country: string;
  city: string;
  fullname: string;
  phoneNumber: string;
  state: string;
}

interface ICard {
  id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
}

const MakePayments = () => {
  const [makePayment, setMakePayment] = useState(true);
  const [paymentSection, setPaymentSection] = useState(true);
  const [selectedCard, setSelectedCard] = useState<ICard>();
  const [billingAddress, setBillingAddress] = useState<AddressInt>();
  const [totalPrice, setTotalPrice] = useState<any>();

  const [current, setCurrent] = useState(0);
  const onChange = (key: string) => {
    console.log(key);
  };

  const handleMakePayment = () => {
    setMakePayment(false);
    setPaymentSection(true);
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

  const requestBody = {
    send: true,
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
          totalPrice={totalPrice}
          requestBody={requestBody}
          paymentEndPoint="/make-payment"
          prev={prev}
          selectedCard={selectedCard}
          setCurrent={setCurrent}
          billingAddress={billingAddress}
        />
      ),
    },
  ];

  return (
    <Fragment>
      {makePayment && (
        <Container>
          <div className="lg:m-8 md:m-6 m-4">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { title: "Payment", href: "/user/payments" },
                  { title: "Make Payments" },
                ]}
              />
            </div>
            <Typography.Title level={2} className="font-bold">
              Make Payments
            </Typography.Title>
          </div>
        </Container>
      )}
      {paymentSection && (
        <div>
          <div className="lg:m-8 md:m-6 m-4">
            <Breadcrumb
              items={[
                {
                  title: "Payment/",
                  href: "/user/payments",
                },
                {
                  title: "Make Payments",
                  href: "/user/payments/make-payments",
                },
                { title: "Pay" },
              ]}
            />
          </div>
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
      )}
    </Fragment>
  );
};

export default MakePayments;
