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
import { course } from "@/redux/features/CoursesSlice";
import { user } from "@/redux/features/UserSlice";

interface CardModalProps {
  isOpenPaymentModal: boolean;
  setIsOpenPaymentModal: (isOpen: boolean) => void;
  ModalContent: any;
}

const CardModal = ({
  isOpenPaymentModal,
  setIsOpenPaymentModal,
  ModalContent,
}: CardModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { data: session, status, update: sessionUpdate } = useSession();
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
  console.log(ModalContent);
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

  const handlePaymentChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };
  const userid = session?.user.id;
  console.log("userid", userid);
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
        amount: finalAmount,
        currency: paymentGateways[selectedValue], // Ensure currency is passed
        user: session?.user,
        redirectUrl: currentPath,
        courseId: 1,
        paymentSession: "addFunds",
        user_Id: userid,
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
        console.log(response);
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
  useEffect(() => {
    if (!isOpenPaymentModal) {
      sessionUpdate(); // Refresh session data when modal is closed
    }
  }, [isOpenPaymentModal, sessionUpdate]);
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
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-2">Bank Account Details</h3>
          {/* Billing Address Section */}
        </div>
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
                <Select.Option value="Germany">Stripe Germany</Select.Option>
                <Select.Option value="France">Stripe France</Select.Option>
                <Select.Option value="USA">Stripe USA</Select.Option>
                <Select.Option value="Canada">Stripe Canada</Select.Option>
                <Select.Option value="Brazil">Stripe Brazil</Select.Option>
                {/* Add more countries as needed */}
              </Select>
            </div>
          </div>
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
          className="w-full h-12 mt-4 bg-purple-600 text-white"
          onClick={() => handlePaymentGateway()}
        >
          Complete Purchase
        </Button>
      </div>
    </Modal>
  );
};

export default CardModal;
