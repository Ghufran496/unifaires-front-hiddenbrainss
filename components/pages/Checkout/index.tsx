"use client";

import { Steps, Button } from "antd";
import React, { useState } from "react";
import AddressComponent from "./Address";
import CheckoutComponent from "./Checkout";
import ConfirmComponent from "./Confirm";

const CheckoutPage = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Checkout",
      content: <CheckoutComponent handleClick={next} />,
    },
    {
      title: "Address",
      content: <AddressComponent />,
    },
    {
      title: "Confirm",
      content: <ConfirmComponent />,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div>
      <section className="xl:px-96 p-5 xl:py-10">
        <Steps current={current} items={items} responsive={false} />
      </section>

      <section className="xl:px-20 p-5 xl:py-10">
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action flex justify-between items-center py-10">
          {current < steps.length - 1 && current !== 0 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}

          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
