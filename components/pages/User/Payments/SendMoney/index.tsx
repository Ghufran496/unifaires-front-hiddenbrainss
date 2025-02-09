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

const SendingMoney = () => {
  const [sendMoney, setSendMoney] = useState(true);
  const [paymentSection, setPaymentSection] = useState(false);
  const [selectedBeneficiary, setSelecteBeneficiary] = useState("");
  const [selectedCard, setSelectedCard] = useState<ICard>();
  const [billingAddress, setBillingAddress] = useState<AddressInt>();
  const [totalPrice, setTotalPrice] = useState<any>();

  const [current, setCurrent] = useState(0);
  const onChange = (key: string) => {
    console.log(key);
  };

  const handleSendMoney = () => {
    setSendMoney(false);
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
          paymentEndPoint="/send-mondey"
          prev={prev}
          selectedCard={selectedCard}
          setCurrent={setCurrent}
          billingAddress={billingAddress}
        />
      ),
    },
  ];

  const handleRadioChange = (e: any) => {
    const value = e.target.value;
    setSelecteBeneficiary(value);
    console.log(e.target.value);
  };
  return (
    <Fragment>
      {sendMoney && (
        <Container>
          <div className="lg:m-8 md:m-6 m-4">
            <div className="mb-4">
              <Breadcrumb
                items={[
                  { title: "Payment", href: "/user/payments" },
                  { title: "Send-money" },
                ]}
              />
            </div>
            <Typography.Title level={2} className="font-bold">
              Send Money
            </Typography.Title>
            <div className="mt-4 border border-black p-4">
              <Typography.Paragraph className="font-semibold text-xl">
                Who are you sending money to?
              </Typography.Paragraph>
              <Radio.Group
                onChange={handleRadioChange}
                className="flex flex-col"
              >
                <Radio value={"new"}>Add New Reciver</Radio>
                {selectedBeneficiary === "new" && (
                  <div>
                    <Form layout="horizontal" size="middle">
                      {/* Names */}
                      <div className="mt-4">
                        <Typography.Title level={4}>
                          Recipients Name
                        </Typography.Title>
                        <Form.Item label="First Name" name="firstname" required>
                          <Input
                            placeholder="Enter First Name"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                        <Form.Item label="Last Name" name="lastname" required>
                          <Input
                            placeholder="Enter Last Name"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                      </div>
                      {/* Account Details */}
                      <div className="mt-4">
                        <Typography.Title level={4}>
                          Recipients Bank Account Details
                        </Typography.Title>
                        <Form.Item label="Bank Name" name="bankName" required>
                          <Input
                            placeholder="Enter Bank Name"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Account Number"
                          name="accountNumber"
                          required
                        >
                          <Input
                            placeholder="0003873078"
                            className="w-1/2 bg-inherit"
                            type="number"
                          />
                        </Form.Item>
                      </div>
                      {/* Recipients Address */}
                      <div className="mt-4">
                        <Typography.Title level={4}>
                          Recipients Address
                        </Typography.Title>
                        <Form.Item label="Country" name="country" required>
                          <Input
                            placeholder="Germany"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                        <Form.Item label="City/Town" name="city" required>
                          <Input
                            placeholder="Stockhom"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                      </div>
                      {/* Recipients Email */}
                      <div className="mt-4">
                        <Typography.Title level={4}>
                          Recipients Email Address
                        </Typography.Title>
                        <Form.Item label="Email Address" name="email" required>
                          <Input
                            placeholder="example@gmail.com"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                      </div>
                      {/* Reason for sending */}
                      <div className="mt-4">
                        <Typography.Title level={4}>
                          Reason for sending
                        </Typography.Title>
                        <Form.Item label="Reason" name="reason" required>
                          <Input.TextArea
                            rows={4}
                            placeholder="reason for sending money"
                            className="w-1/2 bg-inherit"
                          />
                        </Form.Item>
                      </div>

                      <div className="w-1/2 flex ml-auto">
                        <Button
                          type="primary"
                          size="large"
                          onClick={handleSendMoney}
                        >
                          Next
                        </Button>
                      </div>
                    </Form>
                  </div>
                )}
                <Radio value={"saved"}>Saved Beneficiary</Radio>
                {selectedBeneficiary === "saved" && (
                  <div>
                    <Typography.Paragraph>I am saved</Typography.Paragraph>
                  </div>
                )}
              </Radio.Group>
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
                  title: "Payment/",
                  href: "/user/payments",
                },
                {
                  title: "Send-Money",
                  href: "/user/payments/send-money",
                },
                { title: "Pay" },
              ]}
            />
          </div>
          <div className="m-[5em]">
            {/* <Steps
              percent={((current + 1) / 4) * 100}
              onChange={handleStepClick}
              current={current}
              items={steps}
            /> */}
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

export default SendingMoney;
