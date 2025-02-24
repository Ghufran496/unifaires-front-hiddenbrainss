import {
  Modal,
  Button,
  Radio,
  Input,
  Select,
  Typography,
  Divider,
  Collapse,
  message,
  Form,
  Row,
  Col,
  Checkbox,
  Card,
} from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import {
  BankOutlined,
  CreditCardOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import VideoJs from "@/components/shared/video/VideoJs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";
import {
  fetchBusinessDiscount,
  fetchCountryDiscount,
} from "@/redux/features/DiscountSlice";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import axios from "axios";
import { paymentGateways, TransactionType, PaymentStatus } from "./dummyTypes";

interface CoursePaymentModalProps {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: (isOpen: boolean) => void;
  ModalContent: any;
}
const { Title, Paragraph } = Typography;

const CoursePaymentModal = ({
  isOpenPaymentModal,
  setIsOpenPaymentModal,
  ModalContent,
}: CoursePaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { data: session, status } = useSession();
  const dispatch: any = useAppDispatch();
  const businessId: any = session?.user.id;
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationData = info && info.data;
  const userCountry = locationData && locationData?.country;
  const taxes = useAppSelector((state: RootState) => state.tax.taxes);
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;
  const [selectedValue, setSelectedValue] = useState("USA");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressList, setAddressList] = useState<Array<any>>([]);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
  const [dbUser, setDbUser] = useState<any>();

  const countries = useAppSelector(
    (state: RootState) => state.country.countries
  );
  const states = useAppSelector((state: RootState) => state.country.states);
  const cities = useAppSelector((state: RootState) => state.country.cities);

  const countryListOption = countries.map((c: any) => ({
    label: c.name,
    value: c.code,
  }));

  const statesOption = states.map((s: any) => ({
    label: s.name,
    value: s.state_code,
  }));

  const citiesOption = cities.map((s: any) => ({
    label: s.name,
    value: s.name,
  }));

  const fetchUserAddress = async () => {
    await axios
      .get(`${config.API.API_URL}/address/user/${session?.user?.id}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        if (res.status) {
          setAddressList(res.data.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const fetchUserById = async () => {
    await axios
      .get(`${config.API.API_URL}/users/${session?.user?.id}`, {
        headers: {
          "x-token": session?.user?.token,
        },
      })
      .then((res) => {
        if (res.status) {
          setDbUser(res.data.data);
          console.log(res.data.data, "Userdata");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUserById();
    dispatch(fetchCountries());
    fetchUserAddress();
  }, []);

  const handleSelectedCountry = (countryCode: any) => {
    dispatch(fetchCountryStates(countryCode));
  };

  const handleSelectedState = (stateCode: any) => {
    dispatch(fetchStateCities(stateCode));
  };

  const handleUseAddress = (addressInfo: any) => {
    setSelectedAddress(addressInfo);
    form.setFieldsValue({
      country: addressInfo.country,
      fullname: addressInfo.fullname,
      phoneNumber: addressInfo.phoneNumber,
      address: addressInfo.address,
      state: addressInfo.state,
      city: addressInfo.city,
      zipcode: addressInfo.zipcode,
    });
  };

  const handleAddress = async () => {
    await form.validateFields();
    const formData = form.getFieldsValue();
    formData["default"] = defaultAddress;
    setLoading(true);
    await axios
      .post(
        `${config.API.API_URL}/address`,
        { ...formData },
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      )
      .then((res) => {
        if (res.status) {
          fetchUserAddress();
          message.success("Address added successfully");
        }
      })
      .catch((e) => {
        message.error("Unable to Add Address");
        console.log(e);
      });
    setLoading(false);
  };

  const handlePaymentGateway = async () => {
    const formData = form.getFieldsValue();
    const biilingaddress = {
      streetAddress: formData.address,
      city: formData.city,
      stateProvince: formData.state,
      postalCode: formData.zipcode,
      country: formData.country,
    };

    const transactionDetails = {
      userId: session?.user?.id,
      billingAddress: biilingaddress,
      transactionAmount: finalPrice,
      paymentStatus: PaymentStatus.PENDING,
      transactionType: TransactionType.PAYFUNDS,
    };

    if (paymentMethod === "wallet") {
      HandlePaymentByWallet();
    } else {
      if (
        paymentGateways[selectedValue] &&
        paymentGateways[selectedValue][paymentMethod]
      ) {
        const selectedGateway = paymentGateways[selectedValue][paymentMethod];

        const currentPath = window.location.pathname;
        const payload = {
          selectedGateway,
          paymentMethod: paymentMethod,
          amount: finalPrice,
          paymentGatewayswithcurrency: paymentGateways[selectedValue],
          user: session?.user,
          redirectUrl: currentPath,
          courseId: ModalContent?.course?.id,
          paymentSession: "payFunds",
          transactionDetails,
        };

        try {
          const response = await axios.post(
            `${config.API.API_URL}/payment/create-stripe-session`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                "x-token": session?.user?.token, // Send auth token if needed
              },
            }
          );
          if (response?.data?.data?.url) {
            window.location.href = response.data.data.url; // Redirect user to Stripe checkout
          }
        } catch (error) {
          console.error("Error initiating payment:", error);
          message.error("Payment initiation failed. Please try again.");
        }
      } else {
        message.error("Payment gateway not available for this combination.");
      }
    }
  };

  const HandlePaymentByWallet = async () => {
    const userBalance = session?.user?.balance ?? 0;
    const updatedAmount = userBalance - finalPrice;

    if (updatedAmount >= 0) {
      const payload = {
        userId: session?.user?.id,
        balance: updatedAmount,
        courseId: ModalContent?.course?.id,
      };
      try {
        const response = await axios.put(
          `${config.API.API_URL}/users/update-balance-by-id`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "x-token": session?.user?.token,
            },
          }
        );
        if (response.status === 200) {
          message.success("Transaction success from Wallet.");
          location.reload();
        }
      } catch (error) {
        console.error("Error updating payment:", error);
        message.error("Transaction failed. Please try again.");
      }
    }
  };

  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };

  const dbuserCountry = dbUser?.country;
  const matchedCountry = countries.find(
    (country: any) => country.code === dbuserCountry
  );
  const VatTaxpercentage = getTaxForCountry(matchedCountry?.name);

  useEffect(() => {
    dispatch(fetchAllTax());
    if (userCountry) {
      dispatch(
        fetchCountryDiscount({ type: "associate", country: userCountry })
      );
    }
    if (businessId) {
      dispatch(fetchBusinessDiscount({ type: "associate", businessId }));
    }
  }, []);

  const countryDiscount = useAppSelector(
    (state: RootState) => state.discounts.countryDiscount
  );
  const businessDiscount = useAppSelector(
    (state: RootState) => state.discounts.businessDiscount
  );

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const convertedTotalPrice = currencyRate
    ? ModalContent?.course?.pricing?.amount * currencyRate
    : ModalContent?.course?.pricing?.amount;
  const estimatedTax =
    convertedTotalPrice * (getTaxForCountry(userCountry) / 100);
  const applicableDiscount =
    businessDiscount && businessDiscount?.discount !== 0
      ? businessDiscount
      : countryDiscount;
  const discountAmount =
    convertedTotalPrice * (applicableDiscount?.discount / 100 || 0);
  const beforeTax = convertedTotalPrice - discountAmount;
  const vatTaxFinal = beforeTax * (VatTaxpercentage / 100);
  const finalPrice =
    convertedTotalPrice - discountAmount + estimatedTax + vatTaxFinal;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyRate ? currency : "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handlePaymentChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  const handleRemove = async (id: any) => {
    try {
      const response = await axios.delete(
        `${config.API.API_URL}/payment/user/${session?.user.id}/address/${id}`,
        {
          headers: {
            "x-token": session?.user?.token,
          },
        }
      );
      if (response.status === 200) {
        fetchUserAddress();
        message.success("Address removed successfully");
      }
    } catch (error) {}
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          Purchase Content
        </span>
      }
      visible={isOpenPaymentModal}
      onCancel={() => setIsOpenPaymentModal(false)}
      footer={null}
      width={800}
    >
      <div className="space-y-4">
        <div className="flex space-x-2 p-4 bg-slate-50 rounded-md">
          {ModalContent?.videoUrl ? (
            <div className="flex justify-center items-center w-1/3">
              <VideoJs options={ModalContent?.videoJsOptions} />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              {ModalContent?.course && ModalContent?.course.image && (
                <Image
                  src={ModalContent?.courseImage}
                  alt="courseImage"
                  width={100}
                  height={100}
                  className="object-cover rounded-md mr-4"
                  objectPosition="center"
                />
              )}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-xl">
              {ModalContent?.course?.title || "Course Title"}
            </h3>
            <p className="text-slate-500 font-normal">
              {ModalContent?.course?.organizationName || "Organization Name"}{" "}
            </p>
            <p className="text-lg text-purple-500 font-medium">
              {" "}
              {ModalContent?.convertedPrice
                ? `$${ModalContent?.convertedPrice}`
                : `$${ModalContent?.salesPrice}`}
              <Typography.Text type="secondary" delete>
                {ModalContent?.convertedAmount
                  ? `$${ModalContent?.convertedAmount}`
                  : `$${ModalContent?.amount}`}
              </Typography.Text>
            </p>
          </div>
        </div>
        <div className="flex space-x-4 mb-4">
          <Radio.Group
            value={paymentMethod}
            onChange={handlePaymentChange}
            buttonStyle="solid"
            className="flex w-full space-x-4"
          >
            <Radio.Button
              value="card"
              className={`w-1/3 flex items-center justify-center p-8 border-2 rounded-md ${
                paymentMethod === "card"
                  ? "bg-slate-100 text-white border-purple-300"
                  : "bg-none text-gray-600 border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <CreditCardOutlined
                  className={`${
                    paymentMethod === "card"
                      ? "text-purple-50"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`${
                    paymentMethod === "card" ? "text-black" : "text-gray-600"
                  }`}
                >
                  Card
                </span>
              </div>
            </Radio.Button>
            <Radio.Button
              value="bank"
              className={`w-1/3 flex items-center justify-center p-8 border-2 rounded-md ${
                paymentMethod === "bank"
                  ? "bg-slate-100 text-white border-purple-300"
                  : "bg-none text-gray-600 border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <BankOutlined
                  className={`${
                    paymentMethod === "bank"
                      ? "text-purple-50"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`${
                    paymentMethod === "bank" ? "text-black" : "text-gray-600"
                  }`}
                >
                  Bank
                </span>
              </div>
            </Radio.Button>
            <Radio.Button
              value="wallet"
              className={`w-1/3 flex items-center justify-center p-8 border-2 rounded-md ${
                paymentMethod === "wallet"
                  ? "bg-slate-100 text-white border-purple-300"
                  : "bg-none text-gray-600 border-gray-300"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <WalletOutlined
                  className={`${
                    paymentMethod === "wallet"
                      ? "text-purple-50"
                      : "text-gray-600"
                  }`}
                />
                <span
                  className={`${
                    paymentMethod === "wallet" ? "text-black" : "text-gray-600"
                  }`}
                >
                  Wallet({ModalContent.userBalance ?? "0"})
                </span>
              </div>
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <Paragraph className="text-gray-600 mb-6">
            Please select a billing address from your address book (below) or
            enter a new billing address. Don&apos;t worry, you will only need to
            do this once for each credit card. If you contact us about your
            order, we will reference your account only by the name you provide
            below.
          </Paragraph>
          <Divider className="my-6" />
          <div className="flex flex-col gap-6">
            {(addressList?.length ?? 0) > 0 &&
              addressList.map((addressInfo) => (
                <Card
                  hoverable
                  key={addressInfo.id}
                  className={`w-full transition-all duration-300 ease-in-out ${
                    selectedAddress && selectedAddress.id === addressInfo.id
                      ? "border-2 border-blue-500 shadow-lg"
                      : "border border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex justify-evenly items-center gap-2">
                      <Paragraph className="m-0 text-gray-700 font-medium">
                        {addressInfo.fullname}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-600">
                        {addressInfo.address}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-600">
                        {addressInfo.city} - {addressInfo.zipcode}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-600">
                        {addressInfo.country}
                      </Paragraph>
                      <Paragraph className="m-0 text-gray-600">
                        {addressInfo.phoneNumber}
                      </Paragraph>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <Button
                        type="primary"
                        size="large"
                        className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => handleUseAddress(addressInfo)}
                      >
                        Use this Address
                      </Button>
                      <Button
                        type="text"
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                        onClick={() => handleRemove(addressInfo.id)}
                        loading={loading}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
          <Divider className="my-6" />
        </div>
        {paymentMethod === "card" && (
          <div className="space-y-6">
            {/* Billing Address Section */}

            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
              <Form layout="vertical" form={form} size="large">
                <Col>
                  <Form.Item
                    name="country"
                    label="Country/Region"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a Country",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select Country"
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={countryListOption}
                      onChange={handleSelectedCountry}
                    />
                  </Form.Item>
                </Col>
                <Form.Item
                  name="fullname"
                  label="Full Name(First and Last Name)"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <Input placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a phone Number",
                    },
                  ]}
                >
                  <Input type="number" placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter an Address",
                    },
                  ]}
                >
                  <Input placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col lg={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a State",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select State"
                        optionFilterProp="children"
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={statesOption}
                        onChange={handleSelectedState}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a City",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select City"
                        optionFilterProp="children"
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={citiesOption}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="zipcode"
                      label="Zip Code"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select the Zip Code",
                        },
                      ]}
                    >
                      <Input placeholder="9394" />
                    </Form.Item>
                  </Col>
                </Row>
                <Checkbox
                  onChange={(e) => {
                    setDefaultAddress(e.target.checked);
                    handleAddress();
                  }}
                >
                  Make this my default address
                </Checkbox>
              </Form>
            </div>
          </div>
        )}

        {paymentMethod === "bank" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Bank Account Details</h3>
            {/* Billing Address Section */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
              <Form layout="vertical" form={form} size="large">
                <Col>
                  <Form.Item
                    name="country"
                    label="Country/Region"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a Country",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select Country"
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={countryListOption}
                      onChange={handleSelectedCountry}
                    />
                  </Form.Item>
                </Col>
                <Form.Item
                  name="fullname"
                  label="Full Name(First and Last Name)"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <Input placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a phone Number",
                    },
                  ]}
                >
                  <Input type="number" placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter an Address",
                    },
                  ]}
                >
                  <Input placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col lg={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a State",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select State"
                        optionFilterProp="children"
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={statesOption}
                        onChange={handleSelectedState}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a City",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select City"
                        optionFilterProp="children"
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={citiesOption}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="zipcode"
                      label="Zip Code"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select the Zip Code",
                        },
                      ]}
                    >
                      <Input placeholder="9394" />
                    </Form.Item>
                  </Col>
                </Row>
                <Checkbox
                  onChange={(e) => {
                    setDefaultAddress(e.target.checked);
                    handleAddress();
                  }}
                >
                  Make this my default address
                </Checkbox>
              </Form>
            </div>
          </div>
        )}

        {paymentMethod === "wallet" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-100 p-6 rounded-md">
              <p className="font-semibold">Available Balance</p>
              <p className="font-semibold">
                {" "}
                ${ModalContent?.userBalance ?? "0"}
              </p>
            </div>

            {/* Billing Address Section */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
              <Form layout="vertical" form={form} size="large">
                <Col>
                  <Form.Item
                    name="country"
                    label="Country/Region"
                    style={{ fontStyle: "italic", fontWeight: 600 }}
                    rules={[
                      {
                        required: true,
                        message: "Please select a Country",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder="Select Country"
                      optionFilterProp="children"
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={countryListOption}
                      onChange={handleSelectedCountry}
                    />
                  </Form.Item>
                </Col>
                <Form.Item
                  name="fullname"
                  label="Full Name(First and Last Name)"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter name",
                    },
                  ]}
                >
                  <Input placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a phone Number",
                    },
                  ]}
                >
                  <Input type="number" placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  style={{ fontStyle: "italic", fontWeight: 600 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter an Address",
                    },
                  ]}
                >
                  <Input placeholder="BASF AG" className="p-4" />
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col lg={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a State",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        allowClear
                        placeholder="Select State"
                        optionFilterProp="children"
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={statesOption}
                        onChange={handleSelectedState}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select a City",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select City"
                        optionFilterProp="children"
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={citiesOption}
                      />
                    </Form.Item>
                  </Col>

                  <Col lg={8}>
                    <Form.Item
                      name="zipcode"
                      label="Zip Code"
                      style={{ fontStyle: "italic", fontWeight: 600 }}
                      rules={[
                        {
                          required: true,
                          message: "Please select the Zip Code",
                        },
                      ]}
                    >
                      <Input placeholder="9394" />
                    </Form.Item>
                  </Col>
                </Row>
                <Checkbox
                  onChange={(e) => {
                    setDefaultAddress(e.target.checked);
                    handleAddress();
                  }}
                >
                  Make this my default address
                </Checkbox>
              </Form>
            </div>
          </div>
        )}

        <div className="mt-4 bg-slate-50 p-4 rounded-md">
          <div>
            <Typography.Paragraph className="font-semibold">
              ORDER SUMMARY
            </Typography.Paragraph>
            <Typography.Paragraph className="flex justify-between">
              Items:
              <span className="ml-auto text-purple-600 font-bold">
                {formatCurrency(convertedTotalPrice) || "0.00"}
              </span>
            </Typography.Paragraph>

            <Typography.Paragraph className="flex justify-between">
              <span>
                {businessDiscount && businessDiscount?.discount !== 0
                  ? "Discount"
                  : "Discount"}
                <span className="text-purple-600 font-bold">
                  ({applicableDiscount?.discount}%):
                </span>
              </span>
              <span className="ml-auto text-purple-600 font-bold">
                - {formatCurrency(discountAmount) || "0.00"}
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="flex justify-between">
              Shopping & Handling:
              <span className="ml-auto text-purple-600 font-bold">$0.00</span>
            </Typography.Paragraph>
            <Typography.Paragraph className="flex justify-between">
              Total before VAT:
              <span className="ml-auto text-purple-600 font-bold">
                {formatCurrency(beforeTax) || "0.00"}
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="flex justify-between">
              <span>
                VAT
                <span className="text-purple-600 font-bold">
                  ({VatTaxpercentage}%):
                </span>
              </span>
              <span className="ml-auto text-purple-600 font-bold">
                {formatCurrency(vatTaxFinal) || "0.00"}
              </span>
            </Typography.Paragraph>

            <Divider />
            <div className="w-full">
              <Typography.Title level={4} className=" flex text-red-800">
                Payment Total:{" "}
                <span className="text-lg text-purple-600 ml-auto">
                  {formatCurrency(finalPrice)}
                </span>
              </Typography.Title>
              <Collapse ghost size="small">
                <Collapse.Panel
                  key={"Exchange-Rate"}
                  header={
                    <Typography.Paragraph className="m-0">
                      Applicable Exchange Rate
                    </Typography.Paragraph>
                  }
                >
                  {currencyRate && (
                    <Typography.Paragraph className="m-0  text-base font-semibold italic">
                      1 USD = {formatCurrency(currencyRate)}
                    </Typography.Paragraph>
                  )}
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          className={`w-full h-12 mt-4 ${
            form.isFieldsTouched(true) &&
            !form.getFieldsError().filter(({ errors }) => errors.length).length
              ? "bg-purple-600 text-white"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
          disabled={
            !form.isFieldsTouched(true) ||
            !form.getFieldsError().filter(({ errors }) => errors.length).length
          }
          onClick={handlePaymentGateway}
        >
          Complete Purchase
        </Button>
      </div>
    </Modal>
  );
};

export default CoursePaymentModal;
