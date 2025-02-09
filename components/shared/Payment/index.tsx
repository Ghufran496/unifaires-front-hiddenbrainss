"use client";
import { useState } from "react";
import { Button, Steps } from "antd";
import Summary from "./components/Summary";
import Checkout from "./components/CheckOut";
import Address from "./components/Address";
import Confirm from "./components/Confirm";

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

const HandleAllPayments = ({ requestBody, totalPrice }: any) => {
  const [current, setCurrent] = useState(0);
  const [billingAddress, setBillingAddress] = useState<AddressInt>();
  const [selectedCard, setSelectedCard] = useState<ICard>();

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
      content: <Summary next={next} totalPrice={totalPrice} />,
    },
    {
      title: "Checkout",
      content: (
        <Checkout next={next} prev={prev} setSelectedCard={setSelectedCard} />
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
          prev={prev}
          setCurrent={setCurrent}
          totalPrice={totalPrice}
          selectedCard={selectedCard}
          requestBody={requestBody}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div>
      <Steps
        percent={((current + 1) / 4) * 100}
        onChange={handleStepClick}
        current={current}
        items={items}
      />
      <div className="mt-10">{steps[current].content}</div>
      <div className="mt-10">
        {current === steps.length - 1 && (
          <div>
            <Button
              style={{ margin: "0 8px" }}
              size="large"
              onClick={() => prev()}
            >
              Previous
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HandleAllPayments;
