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
import { fetchCountries } from "@/redux/features/CountrySlice";
import {
  fetchBusinessDiscount,
  fetchCountryDiscount,
} from "@/redux/features/DiscountSlice";
import { fetchAllTax } from "@/redux/features/TaxSlice";
import axios from "axios";

interface CoursePaymentModalProps {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: (isOpen: boolean) => void;
  ModalContent: any;
}

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

  console.log(session);
  const getTaxForCountry = (countryName: string) => {
    if (!taxes || !Array.isArray(taxes)) {
      return "N/A";
    }
    const country = taxes.find((c) => c.country === countryName);
    return country ? country.tax : 0;
  };
  const getTaxForCountrys = getTaxForCountry(userCountry);
  useEffect(() => {
    dispatch(fetchCountries());
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
    ? ModalContent?.convertedPrice * currencyRate
    : ModalContent?.convertedPrice;

  const estimatedTax =
    convertedTotalPrice * (getTaxForCountry(userCountry) / 100);
  const applicableDiscount =
    businessDiscount && businessDiscount?.discount !== 0
      ? businessDiscount
      : countryDiscount;
  const discountAmount =
    convertedTotalPrice * (applicableDiscount?.discount / 100 || 0);
  const beforeTax = convertedTotalPrice - discountAmount;
  const finalPrice = convertedTotalPrice - discountAmount + estimatedTax;

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
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

  const handlePaymentGateway = async () => {
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
        currency: paymentGateways[selectedValue], // Ensure currency is passed
        user: session?.user,
        redirectUrl: currentPath,
        courseId: ModalContent?.course?.id,
        paymentSession: "payFunds",
      };

      console.log("Payment payload:", payload);
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
      width={600}
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
                  Wallet($25.00)
                </span>
              </div>
            </Radio.Button>
          </Radio.Group>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-6">
            {/* Billing Address Section */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>

              <div className="mb-4">
                <label htmlFor="streetAddress" className="block font-medium">
                  Street Address
                </label>
                <Input id="streetAddress" placeholder="123 Main St" />
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block font-medium">
                    City
                  </label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="stateProvince" className="block font-medium">
                    State/Province
                  </label>
                  <Input id="stateProvince" placeholder="State" />
                </div>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="postalCode" className="block font-medium">
                    Postal Code
                  </label>
                  <Input id="postalCode" placeholder="Postal Code" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="country" className="block font-medium">
                    Country
                  </label>
                  <Select
                    id="country"
                    defaultValue="USA"
                    className="w-full"
                    onChange={handleChange}
                  >
                    <Select.Option value="Nigeria">
                      Flutterwave Nigeria
                    </Select.Option>
                    <Select.Option value="Germany">
                      Stripe Germany
                    </Select.Option>
                    <Select.Option value="France">Stripe France</Select.Option>
                    <Select.Option value="USA">Stripe USA</Select.Option>
                    <Select.Option value="Canada">Stripe Canada</Select.Option>
                    <Select.Option value="Brazil">Stripe Brazil</Select.Option>
                    {/* Add more countries as needed */}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "bank" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Bank Account Details</h3>
            {/* Billing Address Section */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>

              <div className="mb-4">
                <label htmlFor="streetAddress" className="block font-medium">
                  Street Address
                </label>
                <Input id="streetAddress" placeholder="123 Main St" />
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block font-medium">
                    City
                  </label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="stateProvince" className="block font-medium">
                    State/Province
                  </label>
                  <Input id="stateProvince" placeholder="State" />
                </div>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="postalCode" className="block font-medium">
                    Postal Code
                  </label>
                  <Input id="postalCode" placeholder="Postal Code" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="country" className="block font-medium">
                    Country
                  </label>
                  <Select
                    id="country"
                    defaultValue="USA"
                    className="w-full"
                    onChange={handleChange}
                  >
                    <Select.Option value="Nigeria">
                      Flutterwave Nigeria
                    </Select.Option>
                    <Select.Option value="Germany">
                      Stripe Germany
                    </Select.Option>
                    <Select.Option value="France">Stripe France</Select.Option>
                    <Select.Option value="USA">Stripe USA</Select.Option>
                    <Select.Option value="Canada">Stripe Canada</Select.Option>
                    <Select.Option value="Brazil">Stripe Brazil</Select.Option>
                    {/* Add more countries as needed */}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {paymentMethod === "wallet" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-100 p-6 rounded-md">
              <p className="font-semibold">Available Balance</p>
              <p className="font-semibold"> $25.00</p>
            </div>

            {/* Billing Address Section */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Billing Address</h3>

              <div className="mb-4">
                <label htmlFor="streetAddress" className="block font-medium">
                  Street Address
                </label>
                <Input id="streetAddress" placeholder="123 Main St" />
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="city" className="block font-medium">
                    City
                  </label>
                  <Input id="city" placeholder="City" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="stateProvince" className="block font-medium">
                    State/Province
                  </label>
                  <Input id="stateProvince" placeholder="State" />
                </div>
              </div>

              <div className="flex space-x-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="postalCode" className="block font-medium">
                    Postal Code
                  </label>
                  <Input id="postalCode" placeholder="Postal Code" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="country" className="block font-medium">
                    Country
                  </label>
                  <Select
                    id="country"
                    defaultValue="United States"
                    className="w-full"
                  >
                    <Select.Option value="Nigeria">
                      Flutterwave Nigeria
                    </Select.Option>
                    <Select.Option value="Germany">
                      Stripe Germany
                    </Select.Option>
                    <Select.Option value="France">Stripe France</Select.Option>
                    <Select.Option value="United States">
                      Stripe USA
                    </Select.Option>
                    <Select.Option value="Canada">Stripe Canada</Select.Option>
                    <Select.Option value="Brazil">Stripe Brazil</Select.Option>
                    {/* Add more countries as needed */}
                  </Select>
                </div>
              </div>
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
                  ? "Business Discount"
                  : "Country Discount"}
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
              Total before tax:
              <span className="ml-auto text-purple-600 font-bold">
                {formatCurrency(beforeTax) || "0.00"}
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph className="flex justify-between">
              <span>
                Estimated tax to be collected
                <span className="text-purple-600 font-bold">
                  ({getTaxForCountry(userCountry)}%):
                </span>
              </span>
              <span className="ml-auto text-purple-600 font-bold">
                {formatCurrency(estimatedTax) || "0.00"}
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
          className="w-full h-12 mt-4 bg-purple-600 text-white"
          onClick={() => handlePaymentGateway()}
        >
          Complete Purchase
        </Button>
      </div>
    </Modal>
  );
};

export default CoursePaymentModal;
