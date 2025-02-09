"use client";
import React, { Fragment, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";
import config from "@/app/utils/config";
import { useSession } from "next-auth/react";

interface ModalInt {
  isModalCard: boolean;
  setIsModalCard: (value: boolean) => void;
  fetchUserCards: Function;
}

const UserCards: React.FC<ModalInt> = ({
  isModalCard,
  setIsModalCard,
  fetchUserCards,
}) => {
  const [loading, setLoading] = useState(false);
  const [cardId, setCardId] = useState();
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const monthFormat = "MM/YYYY";

  const handleCancel = () => {
    form.resetFields();
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
        fetchUserCards();
        setCardId(res.data.id);
        setIsModalCard(false);
      })
      .catch((error) => {
        message.error("Unable to add card. Please try again.");
        console.log(error);
      });

    setLoading(false);
  };

  return (
    <Fragment>
      <Modal
        open={isModalCard}
        onCancel={handleCancel}
        title="Add a debit or Credit Card"
        footer={null}
      >
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
      </Modal>
    </Fragment>
  );
};

export default UserCards;
