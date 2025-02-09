"use client";
import React, { Fragment, useEffect, useState } from "react";
// next components
// antd components
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Typography,
  Breadcrumb,
  message,
  DatePicker,
  Steps,
} from "antd";

// app components
import Container from "@/components/shared/container";
import { useSession } from "next-auth/react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Address from "./Address";
import Summary from "./Summary";
import Checkout from "./CheckOut";
import Confirm from "./Confirm";
import dayjs from "dayjs";
import axiosInstance from "@/app/utils/axios-config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCookie } from "cookies-next";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import { RootState } from "@/redux/store";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

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

const AddAssociatedUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const dispatch: any = useAppDispatch();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const startDate = new Date();
  const oneYearFromNow = dayjs(startDate).add(1, "year");
  const [inviteForm, setInviteForm] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      endDate: "",
      price: 0,
      startDate: startDate,
    },
  ]);
  const [inviteSection, setInviteSection] = useState(true);
  const [paymentSection, setPaymentSection] = useState(false);
  const [current, setCurrent] = useState(0);
  const [billingAddress, setBillingAddress] = useState<AddressInt>();
  const [pricing, setPricing] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<ICard>();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const userCountry = info && info.data.country;
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;

  useEffect(() => {
    dispatch(fetchAllTax());
  }, []);

  const taxes = useAppSelector((state: any) => state.tax.taxes);
  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      // Handle the case when currentPricingIndex is not defined or not an array
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Getting the Total Cost
  const priceArray = inviteForm.map((invite) => {
    let priceArray = invite.price;
    return priceArray;
  });

  let totalPrice = 0;
  for (let i = 0; i < priceArray.length; i++) {
    totalPrice += priceArray[i];
  }

  const addInviteForm = () => {
    const newInviteForm = {
      firstname: "",
      lastname: "",
      email: "",
      endDate: "",
      price: 0,
      startDate: startDate,
    };
    setInviteForm([...inviteForm, newInviteForm]);
  };

  const handleSendInvite = async () => {
    try {
      await form.validateFields();
      setPaymentSection(true);
      setInviteSection(!inviteSection);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
      // Handle validation errors, if needed
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
          inviteForm={inviteForm}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const fetchPrice = async () => {
    try {
      const res = await axiosInstance.get("/associate-pricing");
      if (res.status) {
        const price = res.data.data;
        setPricing(price[0].price);
      }
    } catch (error) {
      console.log("unable to fetch price", error);
    }
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetchPrice();
  }, []);

  const inviteClick = () => {
    setInviteSection(true);
    setPaymentSection(false);
  };

  const handleStepClick = (value: number) => {
    setCurrent(value);
  };
  return (
    <Fragment>
      {inviteSection && (
        <div>
          <section className="content-header">
            <Container className="px-6 pt-6 container-fluid">
              <div className="mt-8">
                <Typography.Title level={2} className="mb-0">
                  Add Associated User
                </Typography.Title>
                <Typography.Paragraph className="mb-0 ">
                  Associated users can access licensed content by logging into
                  Unifaires with their Unifaires organization Account
                </Typography.Paragraph>
              </div>
            </Container>
          </section>
          <Divider />
          <section className="content-body">
            <Container className="px-6 pb-6 container-fluid">
              <Form form={form} layout="vertical" className="mb-8">
                <Row gutter={20}>
                  {inviteForm.map((invite, index) => {
                    const estimatedTax =
                      invite.price * (getTaxForCountry(userCountry) / 100);
                    const priceWithTax = invite.price + estimatedTax;
                    const convertedPrice =
                      priceWithTax && priceWithTax * currencyRate;
                    return (
                      <Row gutter={20} key={index} className="pl-2">
                        <Col lg={4}>
                          <Form.Item
                            name={`firstname${index}`}
                            label="First Name"
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message: "Please enter first name",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="First Name"
                              value={inviteForm[index].firstname}
                              onChange={(e) => {
                                const updatedForms = [...inviteForm];
                                updatedForms[index] = {
                                  ...updatedForms[index],
                                  firstname: e.target.value,
                                };
                                setInviteForm(updatedForms);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={4}>
                          <Form.Item
                            name={`lastname${index}`}
                            label="Last Name"
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message: "Please enter full name",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Last Name"
                              value={inviteForm[index].lastname}
                              onChange={(e) => {
                                const updatedForms = [...inviteForm];
                                updatedForms[index] = {
                                  ...updatedForms[index],
                                  lastname: e.target.value,
                                };
                                setInviteForm(updatedForms);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={6}>
                          <Form.Item
                            name={`email${index}`}
                            label="Email"
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message: "Please enter an email",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Email"
                              value={inviteForm[index].email}
                              onChange={(e) => {
                                const updatedForms = [...inviteForm];
                                updatedForms[index] = {
                                  ...updatedForms[index],
                                  email: e.target.value,
                                };
                                setInviteForm(updatedForms);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={5}>
                          <Form.Item
                            name={`endDate${index}`}
                            label="End date "
                            required
                            tooltip="This is a required field"
                            rules={[
                              {
                                required: true,
                                message: "Please pick a date",
                              },
                            ]}
                          >
                            <DatePicker
                              size="large"
                              // minDate={dayjs("2025-01-01")}
                              minDate={dayjs(oneYearFromNow)}
                              onChange={(date, dateString: any) => {
                                const year = parseInt(dateString, 10);
                                setSelectedYear(year);
                                const updatedForms = [...inviteForm];
                                updatedForms[index] = {
                                  ...updatedForms[index],
                                  endDate: dateString,
                                  price: (year - currentYear) * pricing || 0,
                                };
                                setInviteForm(updatedForms);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col lg={3}>
                          <Form.Item name={`price${index}`} label="Price">
                            <Button
                              type="default"
                              className="cursor-none font-semibold"
                              size="large"
                            >
                              {formatCurrency(convertedPrice || priceWithTax)}
                            </Button>
                          </Form.Item>
                        </Col>
                        <Col lg={3}>
                          {index > 0 && (
                            <Button
                              size="middle"
                              type="text"
                              icon={<MinusCircleOutlined />}
                              className="flex justify-center items-center mt-8"
                              onClick={() => {
                                const updatedForms = [...inviteForm];
                                updatedForms.splice(index, 1);
                                setInviteForm(updatedForms);
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    );
                  })}

                  {/* Button for Addition */}
                  <Col lg={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="flex ml-auto justify-center items-center"
                        onClick={addInviteForm}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={24} sm={20}>
                    <Form.Item name="text" label="Add a Message (Optional) ">
                      <Input.TextArea
                        rows={6}
                        size="large"
                        placeholder="Personal invitation message"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      onClick={handleSendInvite}
                    >
                      Send Invite
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </section>
        </div>
      )}
      {paymentSection && (
        <div>
          <div className="px-[2em] mt-8">
            <Breadcrumb
              items={[
                {
                  title: "Associate User",
                  href: "/business/associated-users",
                },
                {
                  title: "Invite",
                  onClick: inviteClick,
                },
                { title: "Summary" },
              ]}
            />
          </div>
          <div className="m-[2em]">
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
        </div>
      )}
    </Fragment>
  );
};

export default AddAssociatedUser;
