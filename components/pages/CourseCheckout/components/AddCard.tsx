"use client";
import React, { Fragment, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  message,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";
// Images
import masterCardLogo from "@/public/images/payment/mastercard.png";
import visaCardLogo from "@/public/images/payment/visa.png";
import unionPayLogo from "@/public/images/payment/unionpay.png";
import discoverLogo from "@/public/images/payment/discover.png";
import giftCard from "@/public/images/payment/gift-cards.png";
import unifairesCard from "@/public/images/payment/unifaires.png";
import groupPrivacy from "@/public/images/payment/group-privacy-setting.png";
import Image from "next/image";

interface ModalInt {
  isModalCard: boolean;
  setIsModalCard: (value: boolean) => void;
  fetchUserCards: Function;
}

const AddCard: React.FC<ModalInt> = ({
  isModalCard,
  setIsModalCard,
  fetchUserCards,
}) => {
  const [loading, setLoading] = useState(false);
  const [cardId, setCardId] = useState();
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const monthFormat = "MM/YYYY";
  const [paymentMethod, setPaymentMethod] = useState(true);
  const [addCard, setAddCard] = useState(false);

  const handleCancel = () => {
    form.resetFields();
    setAddCard(false);
    setPaymentMethod(true);
    setIsModalCard(false);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleAddCard = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();

    const year = formData.expirationDate.$y;
    const exp_year = `${year}`;

    const month = formData.expirationDate.$M + 1;
    const exp_month = month <= 9 ? `0${month}` : `${month}`;

    setLoading(true);
    delete formData.expirationDate;

    await axios
      .post(
        `${config.API.API_URL}/payment/customer-card`,
        {
          ...formData,
          exp_month: exp_month,
          exp_year: exp_year,
        },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        message.success("Card Added Successfully");
        setCardId(res.data.id);
        fetchUserCards();
        setIsModalCard(false);
      })
      .catch((error) => {
        message.error("Unable to add card");
        console.log(error);
      });

    setLoading(false);
  };

  return (
    <Fragment>
      <Modal
        open={isModalCard}
        onCancel={handleCancel}
        // title="Add a debit or Credit Card"
        width={600}
        footer={null}
      >
        {paymentMethod && (
          <div className="pl-4">
            <div>
              {/* <Typography.Title level={2}>CheckOut</Typography.Title> */}
              <Typography.Title level={4}>
                Select Payement Method
              </Typography.Title>
              <Divider />
              <div>
                <div className="flex lg:flex-row flex-col justify-between">
                  <div>
                    <Typography.Paragraph className="text-lg font-semibold">
                      Personal Checking Accounts
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Use your personal checking account.
                    </Typography.Paragraph>
                    <Button size="large" className="bg-gray-200 mt-4">
                      Add a personal checking account
                    </Button>
                  </div>
                  <div className="flex flex-row gap-4 h-full items-center mt-4 ">
                    <div className="flex items-center w-[97px] h-[66px] rounded-md justify-center">
                      <Image alt="masterCard" src={groupPrivacy} />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />

              <div>
                <div className="flex lg:flex-row flex-col justify-between">
                  <div>
                    <Typography.Paragraph className="text-lg font-semibold">
                      Credit or Debit Card
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Unifaires accept credit or debit cards
                    </Typography.Paragraph>
                    <Button
                      size="large"
                      className="bg-gray-200 mt-4"
                      onClick={() => {
                        setAddCard(true);
                        setPaymentMethod(false);
                      }}
                    >
                      Add a Credit or Debit Card
                    </Button>
                  </div>
                  <div className="flex flex-row gap-4 h-full items-center mt-4">
                    <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                      <Image alt="masterCard" src={masterCardLogo} />
                    </div>
                    <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                      <Image alt="visaCard" src={visaCardLogo} />
                    </div>
                    <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                      <Image alt="unionPayLogo" src={unionPayLogo} />
                    </div>
                    <div className="flex items-center border py-[6px] px-[8px] w-[66px] h-[51px] rounded-md justify-center">
                      <Image alt="discoverLogo" src={discoverLogo} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {addCard && (
          <div>
            <Form layout="vertical" size="large" form={form}>
              <Form.Item
                required
                label="Card Number"
                name="number"
                rules={[
                  {
                    required: true,
                    message: "Please enter Card Number",
                  },
                ]}
              >
                <Input placeholder="0000 000" type="number" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col lg={12} md={24}>
                  <Form.Item
                    required
                    label="Security Code(CVC)"
                    name="cvc"
                    rules={[
                      {
                        required: true,
                        message: "Please enter code",
                      },
                    ]}
                  >
                    <Input placeholder="Enter Code" type="number" />
                  </Form.Item>
                </Col>
                <Col lg={12} md={24}>
                  <Form.Item
                    required
                    label="Expiration Date"
                    name="expirationDate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter expieration date",
                      },
                    ]}
                  >
                    <DatePicker format={monthFormat} picker="month" />
                  </Form.Item>
                </Col>
              </Row>
              <Checkbox onChange={onChange}>
                Set as a default payment method
              </Checkbox>
              <Button
                type="primary"
                size="large"
                className="flex items-center justify-center w-full mt-4"
                onClick={handleAddCard}
                loading={loading}
              >
                Add Card
              </Button>
            </Form>
          </div>
        )}
      </Modal>
    </Fragment>
  );
};

export default AddCard;
