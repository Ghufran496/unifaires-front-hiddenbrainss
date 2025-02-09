"use client";

import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Card,
  Input,
  Modal,
  Form,
  DatePicker,
  Checkbox,
} from "antd";
import mastercard from "@/public/images/mastercard.png";
import visa from "@/public/images/visa.png";
import union from "@/public/images/union.png";
import discover from "@/public/images/discover.png";
import discovercard from "@/public/images/discard.svg";
import unicard from "@/public/images/unicard.png";

import Image from "next/image";
interface ButtonProps {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}
const CheckoutComponent = ({ handleClick }: ButtonProps) => {
  const { Title, Paragraph } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <section className="">
        <Title level={3} className="font-normal">
          Checkout
        </Title>
        <Row gutter={32}>
          <Col xl={17} sm={24} xs={24}>
            <Row>
              <Col xl={24}>
                <Title level={5} className="font-semibold">
                  Select a Payment Method
                </Title>
              </Col>

              <Col xl={24}>
                <hr />
              </Col>

              <Col xl={24}>
                <Row className="pb-10">
                  <Col xl={16}>
                    <Title level={5} className="font-normal pt-5">
                      Credit or Debit Cards
                    </Title>

                    <Paragraph className="pb-5">
                      Unifares accepts major credit and debit cards..
                    </Paragraph>

                    <Button
                      size="large"
                      className="bg-[#F4F5F7]"
                      onClick={showModal}
                    >
                      Add a credit or debit card
                    </Button>
                  </Col>

                  <Col xl={8} className="py-5 flex-1 space-x-2">
                    <Image src={mastercard} alt="mastercard"></Image>
                    <Image src={visa} alt="mastercard"></Image>
                    <Image src={union} alt="mastercard"></Image>
                    <Image src={discover} alt="mastercard"></Image>
                  </Col>
                </Row>
              </Col>

              <Col xl={24}>
                <Row className="pb-10">
                  <Col xl={16}>
                    <Title level={5} className="font-normal pt-5">
                      Gift Cards, Vouchers & Promotional Codes
                    </Title>

                    <Paragraph className="pb-5">
                      Enter a gift card, voucher, or promotional code.
                    </Paragraph>

                    <Col xl={24}>
                      <Row gutter={[16, 16]}>
                        <Col xl={12}>
                          <Input
                            placeholder="Enter Code"
                            size="large"
                            className="mr-20"
                          />
                        </Col>

                        <Col xl={10} sm={24} xs={24}>
                          <Button size="large">Apply</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Col>

                  <Col xl={8} className="py-5 flex-1 space-x-2">
                    <Image src={discovercard} alt="mastercard"></Image>
                    <Image src={unicard} alt="mastercard"></Image>
                  </Col>
                </Row>
              </Col>

              <Col xl={24}>
                <hr />
              </Col>

              <Col xl={24}>
                <Row className="pb-10">
                  <Col xl={20}>
                    <Title level={5} className="font-normal pt-5">
                      Personal Checking Accounts
                    </Title>

                    <Paragraph className="pb-5">
                      Use your personal checking account.
                    </Paragraph>

                    <Button size="large" className="bg-[#F4F5F7]">
                      Add a personal checking account
                    </Button>
                  </Col>

                  <Col xl={4} className="py-5 flex-1 space-x-2">
                    <Image src={discovercard} alt="mastercard"></Image>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col xl={7}>
            <Card>
              <Button type="primary" block size="large" onClick={handleClick}>
                Continue
              </Button>
              <Paragraph className="text-center py-2">
                You can review this order before <br /> it’s final.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      <Modal
        title="Add a credit or debit card"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Row gutter={32}>
            <Col xl={24} className="pt-5">
              <Form.Item
                name="Nameoncard"
                label="Name on card"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name on card!",
                  },
                ]}
              >
                <Input placeholder="Name on card" size="large" />
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item
                name="Cardnumber"
                label="Card number"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  placeholder="Account Manager"
                  className="rounded-md"
                  size="large"
                />
              </Form.Item>
            </Col>

            <Col xl={12}>
              <Form.Item
                name="Securitycode "
                label="Security code"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Security code" size="large" />
              </Form.Item>
            </Col>

            <Col xl={12}>
              <Form.Item
                name="Expirationdate"
                label="Expiration date "
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <DatePicker size="large" />
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Set as default payment method</Checkbox>
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please Choose one Skill",
                  },
                ]}
              >
                <Button type="primary" size="large" block>
                  Add Card
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckoutComponent;
