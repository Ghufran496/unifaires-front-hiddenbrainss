import {
  Modal,
  Button,
  Input,
  Select,
  Typography,
  Divider,
  message,
  Form,
  Row,
  Col,
  Checkbox,
  Card,
} from "antd";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import config from "@/app/utils/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import axios from "axios";
import {
  PaymentStatus,
  TransactionType,
} from "@/components/pages/CourseDetails/dummyTypes";
import {
  fetchCountries,
  fetchCountryStates,
  fetchStateCities,
} from "@/redux/features/CountrySlice";

const { Title, Paragraph } = Typography;

interface BankModalProps {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: (isOpen: boolean) => void;
  ModalContent: any;
}

const BankModal = ({
  isOpenPaymentModal,
  setIsOpenPaymentModal,
  ModalContent,
}: BankModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const { data: session, status } = useSession();
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;
  const [selectedValue, setSelectedValue] = useState("USA");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(false);
  const [addressList, setAddressList] = useState<Array<any>>([]);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);

  const dispatch: any = useAppDispatch();

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

  useEffect(() => {
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
    const billingAddress = {
      streetAddress: formData.address,
      city: formData.city,
      stateProvince: formData.state,
      postalCode: formData.zipcode,
      country: formData.country,
    };

    const transactionDetails = {
      userId: session?.user?.id,
      billingAddress: billingAddress,
      transactionAmount: ModalContent.Price,
      paymentStatus: PaymentStatus.PENDING,
      transactionType: TransactionType.ADDFUNDS,
    };

    if (
      paymentGateways[selectedValue] &&
      paymentGateways[selectedValue][paymentMethod]
    ) {
      const selectedGateway = paymentGateways[selectedValue][paymentMethod];

      const currentPath = window.location.pathname;
      const payload = {
        selectedGateway,
        paymentMethod: paymentMethod,
        amount: ModalContent.Price,
        paymentGatewayswithcurrency: paymentGateways[selectedValue],
        user: session?.user,
        redirectUrl: currentPath,
        courseId: 1,
        paymentSession: "addFunds",
        user_Id: session?.user?.id,
        transactionDetails,
      };
      console.log(payload);
      try {
        const response = await axios.post(
          `${config.API.API_URL}/payment/create-stripe-session`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "x-token": session?.user?.token,
            },
          }
        );
        if (response?.data?.data?.url) {
          window.location.href = response.data.data.url;
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
        message.error("Payment initiation failed. Please try again.");
      }
    } else {
      message.error("Payment gateway not available for this combination.");
    }
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

  const paymentGateways: any = {
    Germany: {
      card: "Stripe Germany",
      bank: "Stripe Germany Bank",
      currency: "EUR",
    },
    France: {
      card: "Stripe France",
      bank: "Stripe France Bank",
      currency: "EUR",
    },
    USA: { card: "Stripe USA", bank: "Stripe USA Bank", currency: "USD" },
    Canada: {
      card: "Stripe Canada",
      bank: "Stripe Canada Bank",
      currency: "CAD",
    },
    Brazil: {
      card: "Stripe Brazil",
      bank: "Stripe Brazil Bank",
      currency: "BRL",
    },
  };

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value || 0);
  };

  const finalAmount = ModalContent.Price;

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  return (
    <Modal
      title={
        <span style={{ fontSize: "24px", fontWeight: "bold" }}>
          Add Funds Through Bank
        </span>
      }
      visible={isOpenPaymentModal}
      onCancel={() => setIsOpenPaymentModal(false)}
      footer={null}
      width={600}
    >
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <Title
              level={2}
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              Choose a Billing Address
            </Title>
            <Paragraph className="text-gray-600 mb-6">
              Please select a billing address from your address book (below) or
              enter a new billing address. Don&apos;t worry, you will only need
              to do this once for each credit card. If you contact us about your
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
                      <div className="flex gap-2 justify-evenly items-center">
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
        <div className="mt-4 bg-slate-50 p-4 rounded-md">
          <div>
            <Divider />
            <div className="w-full">
              <Typography.Title level={4} className=" flex text-red-800">
                Payment Total:{" "}
                <span className="text-lg text-purple-600 ml-auto">
                  {formatCurrency(finalAmount)}
                </span>
              </Typography.Title>
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
            !!form.getFieldsError().filter(({ errors }) => errors.length).length
          }
          onClick={handlePaymentGateway}
        >
          Complete Purchase
        </Button>
      </div>
    </Modal>
  );
};

export default BankModal;
