"use client";
import { fetchUserCard, fetchWalletBalance } from "@/redux/features/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CopyOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Typography,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { BsPhone, BsPin, BsTv } from "react-icons/bs";
import { GiAerialSignal, GiElectric } from "react-icons/gi";
import { toast } from "react-toastify";
import unifairesReload from "@/public/images/unifairesReload.png";
import AddCard from "../AddCard";
import { fetchAirtimeBillers } from "@/redux/features/BillsSlice";
import axiosInstance from "@/app/utils/axios-config";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { handleAxiosError, showSuccess } from "@/app/utils/axiosError";
import { RootState } from "@/redux/store";
import { getCookie } from "cookies-next";
import BankModal from "./bankModel";
import CardModal from "./cardModel";
import SendMoneyModal from "./sendMoneyModel";
import axios from "axios";
import config from "@/app/utils/config";
import { TransactionResponse } from "@/components/pages/CourseDetails/dummyTypes";
import WithdrawToPaypal from "./WithdrawToPaypalModel";

const UserWallet = () => {
  const [form] = Form.useForm();
  const [fundAmount] = Form.useForm();
  const { data: session, update: sessionUpdate } = useSession();
  const sessionWalletBalance: any = session && session?.user.balance;
  const virtualAccount = session && session?.user.virtualAccount;
  const accountNumberRef: any = useRef();
  const [authorizeLoading, setAuthorizeLoading] = useState(false);
  const dispatch: any = useAppDispatch();
  const [selectCountry, setSelectCountry] = useState(false);
  const [fundWallet, setFundWallet] = useState(false);
  const [fundingMethod, setFundingMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankTransfer, setBankTransfer] = useState(false);
  const [cardPayment, setCardPayment] = useState(false);
  const [isModalCard, setIsModalCard] = useState(false);
  const [airtime, setAirtime] = useState(false);
  const [buyData, setBuyData] = useState(false);
  const [buyElectricity, setBuyElectricity] = useState(false);
  const [examPin, setExamPin] = useState(false);
  const [cable, setCable] = useState(false);

  const [bvn, setBvn] = useState<any>();
  const myProfile = useAppSelector((state: any) => state.user.myProfile);
  const customerCard = useAppSelector((state: any) => state.user.myCards);
  const cookies = getCookie("ipInfo");
  const info = typeof cookies === "string" && JSON.parse(cookies);
  const locationCurrency = info && info.data.currency;
  const selectedCurrency = getCookie("currency");
  const currency = selectedCurrency ? selectedCurrency : locationCurrency;
  const [activeSection, setActiveSection] = useState("transactionHistory");
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [email, setEmail] = useState<String | null>(null);
  const [sendAmount, setSendAmount] = useState<number | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
  const [SendButtonDisable, setSendButtonDisable] = useState(false);

  const [transactionDetails, setTransactionDetails] = useState<
    TransactionResponse[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userBalance, setUserBalance] = useState();
  const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);

  const filteredTransactions = transactionDetails.filter((transaction) =>
    transaction.transactionType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleOpenSendMoneyModal = () => {
    setIsSendMoneyModalOpen(true);
  };

  const handleCloseSendMoneyModal = () => {
    setIsSendMoneyModalOpen(false);
  };

  const handleOpenBankModal = () => {
    setIsBankModalOpen(true);
  };

  const handleOpenCardModal = () => {
    setIsCardModalOpen(true);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(e.target.value));
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleCloseBankModal = () => {
    setIsBankModalOpen(false);
  };

  const handleCloseCardModal = () => {
    setIsCardModalOpen(false);
  };

  const fethAirtimeB = async () => {
    try {
      const res = await axiosInstance.get("/ng-payment/airtime-billers");

      if (res.status) {
        console.log("Airtime billers", res);
      }
    } catch (error) {
      console.log("here is the anser", error);
    }
  };

  useEffect(() => {
    fethAirtimeB();
    dispatch(fetchAirtimeBillers());
    dispatch(fetchWalletBalance());
  }, []);

  const myBalance = useAppSelector(
    (state: RootState) => state.user.walletBalance
  );

  const ModalData = {
    Price: price,
  };
  const sendModelData = {
    amount: sendAmount,
    email: email,
  };

  const handleSendAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSendAmount(isNaN(value) ? null : value);
  };
  useEffect(() => {
    if (
      sessionWalletBalance < (sendAmount ?? 0) ||
      !email ||
      email.length === 0 ||
      (sendAmount ?? 0) <= 0
    ) {
      setSendButtonDisable(true);
    } else {
      setSendButtonDisable(false);
    }
  }, [sendAmount, sessionWalletBalance, email]);

  const currencyRate = useAppSelector(
    (state: RootState) => state.currency.currencyRate
  );

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${currencyRate ? currency : "USD"}`,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  function getGreeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greeting;

    if (currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  }

  const quickActionList = [
    { name: "Airtime", icon: <BsPhone /> },
    { name: "Data", icon: <GiAerialSignal /> },
    { name: "Electricity", icon: <GiElectric /> },
    { name: "Exam Pin", icon: <BsPin /> },
    { name: "TV Cables", icon: <BsTv /> },
  ];

  const walletFundingMethods = [
    { name: "Bank Transfer" },
    // { name: "Debit or Credit Card" },
  ];

  const handleFundWallet = () => {
    setFundWallet(true);
    setPaymentMethod("");
    setBankTransfer(false);
    setCardPayment(false);
    setAirtime(false);
    setBuyData(false);
    setBuyElectricity(false);
    setFundingMethod(false);
  };

  const MakeFunding = () => {
    setFundWallet(true);
    setPaymentMethod("");
    setBankTransfer(false);
    setCardPayment(false);
    setAirtime(false);
    setBuyData(false);
    setBuyElectricity(false);
    setFundingMethod(true);
  };

  const handlePaymentMethod = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const paymentMethodProceed = () => {
    if (paymentMethod === "Bank Transfer") {
      setBankTransfer(true);
    } else {
      setCardPayment(true);
    }
  };

  useEffect(() => {
    fetchTranscationDetails();
    fetchUserById();
  }, []);

  const fetchTranscationDetails = async () => {
    try {
      const response = await axios.get(
        `${config.API.API_URL}/payment/user/${session?.user?.id}/transaction-details`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        }
      );

      if (response.status === 200) {
        const sortedTransactions = response.data.data.transactionDetails.sort(
          (a: TransactionResponse, b: TransactionResponse) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setTransactionDetails(sortedTransactions);
        fetchUserById();
        console.log(
          "Transaction Details fetched",
          response.data.data.transactionDetails
        );
      } else {
        console.error("Failed to Transaction Details", response.data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching Transaction Details", error);
      return [];
    }
  };

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `${config.API.API_URL}/users/${session?.user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": session?.user?.token,
          },
        }
      );

      if (response.status === 200) {
        setUserBalance(
          response?.data?.data?.balance >= 0 ? response?.data?.data?.balance : 0
        );
        console.log("user balance fetched", response.data.data.balance);
      } else {
        console.error("Failed to Transaction Details", response.data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching Transaction Details", error);
      return [];
    }
  };

  const handleCopy = () => {
    // Text you want to copy
    const textToCopy = accountNumberRef.current.innerHTML;
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Text copied to clipboard");
  };

  const handleSelectedCard = () => {
    console.log("card selected");
  };

  const handleQuickAction = (name: any) => {
    if (name === "Airtime") {
      setAirtime(true);
      setSelectCountry(false);
    } else if (name === "Data") {
      setBuyData(true);
      setSelectCountry(false);
    } else if (name === "Electricity") {
      setBuyElectricity(true);
      setSelectCountry(false);
    } else if (name === "Exam Pin") {
      setExamPin(true);
      setSelectCountry(false);
    } else {
      setCable(true);
      setSelectCountry(false);
    }
  };

  const onCountrySelected = () => {
    setSelectCountry(true);
  };

  async function createWallet() {
    try {
      setAuthorizeLoading(true);
      const res = await axiosInstance.post(
        "/ng-payment/user-virtual-bank-account",
        {
          bvn: bvn,
        }
      );
      if (res.status) {
        const resData = res.data.data;

        sessionUpdate({
          ...session!.user,
          virtualAccount: resData.accountNumber,
        }).then(() => {
          showSuccess("Account Created Successfully");
          handleFundWallet();
        });
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setAuthorizeLoading(false);
    }
  }

  const transactionStatusColors = {
    pending: "bg-yellow-100 text-yellow-600",
    success: "bg-green-100 text-green-600",
    failed: "bg-red-100 text-red-600",
    expired: "bg-gray-200 text-gray-600",
  };

  const transactionTypeIcons = {
    payfunds: "lucide-arrow-up-right text-green-600",
    addfunds: "lucide-plus text-blue-600",
    sendfunds: "lucide-arrow-up-right text-purple-600",
    withdrawfunds: "lucide-minus text-red-600",
    transferfunds: "lucide-repeat text-orange-600",
  };

  return (
    <div>
      {/* <div className="flex lg:flex-row md:flex-row flex-col gap-6 justify-between bg-gradient-to-t from-purple-400 to-purple-200 p-6 rounded-lg mb-8">
        <div className="flex flex-col justify-center">
          <Typography.Paragraph className="font-medium text-white italic text-lg m-0">
            {getGreeting()},
          </Typography.Paragraph>
          <Typography.Title className="text-white m-0 font-bold" level={2}>
            {myProfile.firstname}
          </Typography.Title>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center bg-purple-300 p-4 px-10 rounded-lg">
          <Typography.Paragraph className="m-0 text-white font-semibold">
            Wallet Balance
          </Typography.Paragraph>
          <Typography.Title level={2} className="text-white font-bold m-0">
            {formatCurrency(walletBalance || 0)}
          </Typography.Title>
          <Button
            type="default"
            icon={<PlusCircleOutlined />}
            className="border-none text-white bg-purple-200  rounded-full font-semibold"
            onClick={handleFundWallet}
          >
            Fund Wallet
          </Button>
        </div>
      </div> */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-white/80 mb-1">Available Balance</p>
            <p className="text-3xl font-bold">${userBalance}</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 mb-1">Wallet ID</p>
            <p className="font-mono">****-****-4589</p>
          </div>
        </div>
      </div>

      {/* Add the grid layout after the Fund Wallet button */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 text-green-700 rounded-lg p-4">
          <p className="text-sm opacity-75">Total Earnings</p>
          <p className="text-xl font-bold">$2,450.80</p>
        </div>
        <div className="bg-[rgb(239,246,255)] text-blue-700 rounded-lg p-4">
          <p className="text-sm opacity-75">Active Time</p>
          <p className="text-xl font-bold">45.2 hrs</p>
        </div>

        <div className="bg-[rgb(250,245,255)] text-purple-700 rounded-lg p-4">
          <p className="text-sm opacity-75">Engagement Score</p>
          <p className="text-xl font-bold">92</p>
        </div>
      </div>

      {/* Add button group below */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === "transactionHistory"
              ? "bg-[rgb(147,57,234)] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveSection("transactionHistory")}
        >
          Transaction History
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === "sendMoney"
              ? "bg-[rgb(147,57,234)] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveSection("sendMoney")}
        >
          Send Money
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === "addFunds"
              ? "bg-[rgb(147,57,234)] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveSection("addFunds")}
        >
          Add Funds
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            activeSection === "withdrawFunds"
              ? "bg-[rgb(147,57,234)] text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveSection("withdrawFunds")}
        >
          Withdraw Funds
        </button>
      </div>
      {/* Transaction History Button */}

      {activeSection === "transactionHistory" && (
        <div>
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Time Range Filter */}
            {/* <div className="relative">
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none pr-10">
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="custom">Custom Range</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-calendar w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </div> */}

            {/* Export Button */}
            {/* <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-download w-4 h-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              <span>Export</span>
            </button> */}
          </div>
          <div className="space-y-4 h-96 overflow-scroll">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transactionStatusColors[transaction.paymentStatus]
                    }`}
                  >
                    {transaction.transactionType === "addfunds" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`lucide ${
                          transactionTypeIcons[transaction.transactionType]
                        } w-5 h-5`}
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    )}
                    {transaction.transactionType !== "addfunds" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className={`lucide ${
                          transactionTypeIcons[transaction.transactionType]
                        } w-5 h-5`}
                      >
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {transaction.transactionType
                        .replace(/([A-Z])/g, " $1")
                        .toUpperCase()}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-clock w-4 h-4"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </span>
                      {/* <span className="px-2 py-0.5 bg-gray-200 rounded-full text-xs">
                        {transaction.billingAddress.country}
                      </span> */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs flex items-center space-x-1 ${
                          transactionStatusColors[transaction.paymentStatus]
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide w-4 h-4"
                        >
                          {transaction.paymentStatus === "success" ? (
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          ) : transaction.paymentStatus === "failed" ? (
                            <path d="M15 9l-6 6"></path>
                          ) : (
                            <circle cx="12" cy="12" r="10"></circle>
                          )}
                        </svg>
                        <span>{transaction.paymentStatus}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={
                      transaction.transactionType === "withdrawfunds" ||
                      transaction.transactionType === "payfunds" ||
                      transaction.transactionType === "sendfunds"
                        ? "font-medium text-red-600"
                        : "font-medium text-green-600"
                    }
                  >
                    {transaction.transactionType === "withdrawfunds" ||
                    transaction.transactionType === "payfunds" ||
                    transaction.transactionType === "sendfunds"
                      ? "-"
                      : "+"}
                    ${transaction.transactionAmount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/*send money Button */}
      {activeSection === "sendMoney" && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Send
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-dollar-sign w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                min="1"
                step="0.01"
                onChange={handleSendAmountChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-mail w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <input
                type="email"
                placeholder="Enter recipient's email"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent border-gray-300"
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              placeholder="Add a message for the recipient"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={3}
            ></textarea>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Transfer Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount to Send</span>
                <span>${sendAmount ?? 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>UniFairs Fee (0.5%)</span>
                <span>${((sendAmount ?? 0) * 0.005).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Recipient will receive</span>
                <span>${((sendAmount ?? 0) * 0.995).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                <span>Total Amount to be Deducted</span>
                <span>${sendAmount ?? 0}</span>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-white">
                Note: A 0.5% UniFairs fee will be deducted from the transfer amount. The recipient will receive <b>${((sendAmount ?? 0) * 0.995).toFixed(2)}</b> while <b>${((sendAmount ?? 0) * 0.005).toFixed(2)}</b> will be deducted as the UniFairs fee.
              </p>
            </div>
          </div>

          <button
            className={`w-full h-12 mt-4 rounded-lg transition-colors ${
              SendButtonDisable
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            onClick={handleOpenSendMoneyModal}
            disabled={SendButtonDisable}
          >
            Send Money
          </button>
        </div>
      )}

      {isSendMoneyModalOpen && (
        <SendMoneyModal
          isSendMoneyModalOpen={isSendMoneyModalOpen}
          handleCloseSendMoneyModal={handleCloseSendMoneyModal}
          ModalContent={sendModelData}
        />
      )}

      {isPaypalModalOpen && (
        <WithdrawToPaypal setIsModalOpen={setIsPaypalModalOpen} />
      )}

      {/* Add Funds Button */}
      {activeSection === "addFunds" && (
        <div className="space-y-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Add
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-dollar-sign w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              >
                <line x1="12" x2="12" y1="2" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                min="1"
                step="0.01"
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           
            {/* Card Payment */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-credit-card w-5 h-5 text-gray-600"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                <h3 className="font-medium">Card Payment</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                $0.5% fee
              </p>
              <button
                className={`w-full h-12 mt-4 ${
                  price && price > 0
                    ? "w-full h-12 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    : "w-full h-12 bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg"
                }`}
                onClick={handleOpenCardModal}
                disabled={price && price > 0 ? false : true}
              >
                Add with Card
              </button>
            </div>
             {/* Bank Transfer */}
             <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-ban w-5 h-5 text-gray-600"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m4.9 4.9 14.2 14.2"></path>
                </svg>
                <h3 className="font-medium">Bank Transfer</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                $0.5% fee
              </p>
              <button
                className={`w-full h-12 mt-4 ${
                  price && price > 0
                    ? "w-full h-12 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    : "w-full h-12 bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg"
                }`}
                onClick={handleOpenBankModal}
                disabled={price && price > 0 ? false : true}
              >
                Add from Bank
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Bank Modal */}
      {isBankModalOpen && (
        <BankModal
          isOpenPaymentModal={isBankModalOpen}
          setIsOpenPaymentModal={handleCloseBankModal}
          ModalContent={ModalData}
        />
      )}
      {isCardModalOpen && (
        <CardModal
          isOpenPaymentModal={isCardModalOpen}
          setIsOpenPaymentModal={handleCloseCardModal}
          ModalContent={ModalData}
        />
      )}

      {/* Withdraw Funds Button */}
      {activeSection === "withdrawFunds" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bank Transfer */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-ban w-5 h-5 text-gray-600"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m4.9 4.9 14.2 14.2"></path>
                </svg>
                <h3 className="font-medium">Paypal Transfer</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                1-2 hours • $0.25 fee
              </p>
              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => setIsPaypalModalOpen(true)}
              >
                Withdraw to Paypal
              </button>
            </div>

            {/* Instant to Card */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-credit-card w-5 h-5 text-gray-600"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                <h3 className="font-medium">Instant to Card</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Instant • 1.5% fee</p>
              <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Withdraw to Card
              </button>
            </div>
          </div>

          {/* Minimum Withdrawal Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              Minimum withdrawal amount is $50. Withdrawals are processed
              according to our payment schedule.
            </p>
          </div>
        </div>
      )}
      <div className="mt-6">
        {!fundWallet &&
        !fundingMethod &&
        !airtime &&
        !buyData &&
        !buyElectricity &&
        !examPin &&
        !cable ? (
          <div>
            <div>
              <Typography.Paragraph className="font-bold text-base">
                Quick Services
              </Typography.Paragraph>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-col lg:justify-start justify-center items-center flex-wrap gap-6">
              {quickActionList.map((action, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white rounded-full hover:shadow-xl hover:border-2 hover:border-purple-300 cursor-pointer"
                    onClick={() => handleQuickAction(action.name)}
                  >
                    <div className="flex flex-col gap-1 items-center justify-center w-[100px] h-[100px]">
                      <span className="text-lg text-purple-400">
                        {action.icon}
                      </span>
                      <Typography.Paragraph className="m-0 font-semibold">
                        {action.name}
                      </Typography.Paragraph>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : fundWallet && bankTransfer ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setBankTransfer(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                BankTransfer
              </Typography.Paragraph>
            </div>
            <div className="lg:ml-8">
              <Typography.Paragraph>
                These is your genuine Unifaires Pay Wallet account, always
                transfer to it anytime to fund your wallet. It will reflects
                instantly and automatically
              </Typography.Paragraph>
              <div className="bg-white w-[300px] p-6 rounded-lg">
                <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Account Name
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-gray-500 italic">
                      {myProfile.firstname} {myProfile.lastname}
                    </Typography.Paragraph>
                  </div>

                  <Button
                    type="default"
                    className="border-none"
                    icon={<CopyOutlined />}
                    size="small"
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Account Number
                    </Typography.Paragraph>
                    <Typography.Paragraph
                      ref={accountNumberRef}
                      className="text-gray-500 italic"
                    >
                      {virtualAccount.accountNumber}
                    </Typography.Paragraph>
                  </div>

                  <Button
                    type="default"
                    className="border-none"
                    icon={<CopyOutlined />}
                    size="small"
                    onClick={handleCopy}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Bank Name
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-gray-500 italic">
                      {virtualAccount.bankName}
                    </Typography.Paragraph>
                  </div>
                </div>
                {/* <div className="flex justify-between ">
                  <div>
                    <Typography.Paragraph className="text-base font-bold m-0">
                      Payment Processor Fee
                    </Typography.Paragraph>
                    <Typography.Paragraph className="text-gray-500 italic">
                      $1
                    </Typography.Paragraph>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ) : fundWallet && cardPayment ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setCardPayment(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Card Payment Method
              </Typography.Paragraph>
            </div>
            <div className="p-4 border rounded-md">
              <div>
                <AddCard
                  isModalCard={isModalCard}
                  setIsModalCard={setIsModalCard}
                  fetchUserCards={fetchUserCard}
                />
                <Button
                  type="primary"
                  size="large"
                  className="flex items-center ml-auto rounded-md"
                  onClick={() => setIsModalCard(true)}
                >
                  Add a Card
                </Button>
              </div>
              <div className="mt-4">
                <Radio.Group onChange={handleSelectedCard}>
                  {customerCard?.length > 0 &&
                    customerCard.map((card: any) => {
                      return (
                        <Radio value={card} key={card.id}>
                          <Card
                            className=" mb-2"
                            // onClick={() => setSelectedCard(card)}
                          >
                            <div className="flex flex-row justify-between items-center gap-4">
                              <div>
                                <Typography.Paragraph className="font-semibold text-blue-700 mb-0">
                                  {card.brand}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                  **** **** **** {card.last4}
                                </Typography.Paragraph>
                              </div>
                            </div>
                          </Card>
                        </Radio>
                      );
                    })}
                </Radio.Group>
              </div>
            </div>
          </div>
        ) : airtime ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setAirtime(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy Airtime
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
                {selectCountry && (
                  <div>
                    <Form.Item
                      name="networkProvider"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select network provider",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a network provider"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "mtn",
                            label: "MTN",
                          },
                          {
                            value: "glo",
                            label: "Glo",
                          },
                          {
                            value: "airtel",
                            label: "Airtel",
                          },
                          {
                            value: "9mobile",
                            label: "9Mobile",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="amount"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter amount",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Amount"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item name="beneficiary">
                      <Checkbox>Save beneficiary</Checkbox>
                    </Form.Item>
                  </div>
                )}
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : buyData ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setBuyData(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy Data
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
                {selectCountry && (
                  <div>
                    <Form.Item
                      name="networkProvider"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select network provider",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a network provider"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "mtn",
                            label: "MTN",
                          },
                          {
                            value: "glo",
                            label: "Glo",
                          },
                          {
                            value: "airtel",
                            label: "Airtel",
                          },
                          {
                            value: "9mobile",
                            label: "9Mobile",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="dataPlan"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select data plan",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a data plan"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "",
                            label: "200MB (50) - 1 Day",
                          },
                          {
                            value: "glo",
                            label: "1GB (350) - 1 Day",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}
                <Form.Item name="beneficiary">
                  <Checkbox>Save beneficiary</Checkbox>
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : buyElectricity ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setBuyElectricity(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy Electricity
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>

                {selectCountry && (
                  <div>
                    <Form.Item
                      name="electricityCompany"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select Electricity Distribution",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Select a electricity distribution company"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "kaduna",
                            label: "Kaduna Electricity",
                          },
                          {
                            value: "abuja",
                            label: "Abuja Distribution",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="meterNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter meter number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Meter number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="amount"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter amount",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Amount"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}
                <Form.Item name="beneficiary">
                  <Checkbox>Save beneficiary</Checkbox>
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : examPin ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setExamPin(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Exam Pin
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>

                {selectCountry && (
                  <div>
                    <Form.Item
                      name="examType"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select exam type",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Choose Exam Type"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "waec",
                            label: "WAEC",
                          },
                          {
                            value: "neco",
                            label: "WAEC",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>

                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}

                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : cable ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setCable(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Buy TV Subscriptions
              </Typography.Paragraph>
            </div>
            <div className="w-[300px] lg:ml-8 md:ml-8">
              <Form layout="vertical" form={form}>
                <Form.Item
                  name="country"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Select country",
                    },
                  ]}
                >
                  <Select
                    className="border-2  rounded-full hover:border-purple-400"
                    bordered={false}
                    size="large"
                    allowClear
                    showSearch
                    placeholder="Select a country"
                    optionFilterProp="children"
                    onChange={onCountrySelected}
                    filterOption={(
                      input: string,
                      option?: { label: string; value: string }
                    ) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "nigeria",
                        label: "Nigeria",
                      },
                      {
                        value: "germany",
                        label: "Germany",
                      },
                    ]}
                  />
                </Form.Item>
                {selectCountry && (
                  <div>
                    <Form.Item
                      name="tvProvider"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select provider",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Choose Provider"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "dstv",
                            label: "DSTV Subscription",
                          },
                          {
                            value: "startime",
                            label: "Star Time",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="subscriptionPlan"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Select subscription plan",
                        },
                      ]}
                    >
                      <Select
                        className="border-2  rounded-full hover:border-purple-400"
                        bordered={false}
                        size="large"
                        allowClear
                        showSearch
                        placeholder="Choose Plan"
                        optionFilterProp="children"
                        //   onChange={onChange}
                        filterOption={(
                          input: string,
                          option?: { label: string; value: string }
                        ) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={[
                          {
                            value: "basic",
                            label: "Basic - 2,000 ",
                          },
                          {
                            value: "premium",
                            label: "DSTV Premium -Asia 33,000",
                          },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      name="cardNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter card Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Card Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phoneNumber"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter beneficiary Number",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Beneficiary Number"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>

                    <Form.Item
                      name="transactionPin"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter transaction pin",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        // bordered={false}
                        placeholder="Transaction Pin"
                        className="border-2 bg-inherit rounded-full hover:border-purple-400"
                      />
                    </Form.Item>
                  </div>
                )}

                <Button
                  type="primary"
                  size="large"
                  className="w-full rounded-full bg-purple-400 hover:bg-purple-300"
                >
                  Continue
                </Button>
              </Form>
            </div>
          </div>
        ) : fundWallet && !virtualAccount ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setFundWallet(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Create a Wallet
              </Typography.Paragraph>
            </div>
            <Form layout="vertical" className="max-w-[400px]">
              <label className="font-bold">
                Enter your BVN to create a wallet{" "}
              </label>
              <Form.Item name="otp">
                <Input
                  size="large"
                  type="number"
                  placeholder="BVN"
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value)}
                  maxLength={11}
                  required
                />
              </Form.Item>

              <div>
                <Button
                  type="primary"
                  onClick={createWallet}
                  className="w-full h-[50px]"
                  loading={authorizeLoading}
                >
                  Authorize
                </Button>
              </div>
            </Form>
          </div>
        ) : fundWallet && fundingMethod ? (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setFundingMethod(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Funding Wallet
              </Typography.Paragraph>
            </div>
            <div className="lg:ml-8">
              <Radio.Group
                className="flex flex-col gap-4"
                onChange={handlePaymentMethod}
              >
                {walletFundingMethods.map((method) => {
                  return (
                    <Radio
                      key={method.name}
                      className="p-4 bg-white rounded-lg w-[300px]"
                      value={method.name}
                    >
                      <Typography.Paragraph className="m-0 text-base font-semibold">
                        {method.name}
                      </Typography.Paragraph>
                    </Radio>
                  );
                })}
              </Radio.Group>
              <div className="mt-4 ">
                <Button
                  type="primary"
                  size="large"
                  className="w-[300px]
                     rounded-sm"
                  onClick={paymentMethodProceed}
                >
                  Proceed
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Typography.Paragraph
                onClick={() => setFundWallet(false)}
                className="flex gap-1 text-base font-bold hover:text-purple-500 cursor-pointer"
              >
                <LeftOutlined />
                Unifaires Reload
              </Typography.Paragraph>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col gap-4 justify-between flex-wrap">
              <div className="relative items-center justify-center">
                <Image
                  src={unifairesReload}
                  alt="reloadIcon"
                  width={150}
                  height={150}
                  className="lg:w-full md:w-full"
                />
              </div>
              <div className="flex justify-center lg:w-3/5 md:w-3/5 w-full">
                <div>
                  <Typography.Paragraph className="font-bold text-base">
                    Add funds directly to your Unifaires Wallet balance
                  </Typography.Paragraph>
                  <ul className="list-disc">
                    <li>
                      Add funds to your Unifaires Wallet balance, then use your
                      balance to manage how much you spend while shopping.
                    </li>
                    <li>
                      Save up for a purchase by adding funds to your Wallet
                      balance.
                    </li>
                    <li>
                      Checkout faster when you reload to your Wallet balance in
                      advance
                    </li>
                    <li>Reloaded funds never expire and have no fees.</li>
                    <li>
                      Unifaires Reload purchases are not refundable or
                      redeemable for cash, except as required by law.
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <Typography.Paragraph className="font-bold text-base">
                    Amount
                  </Typography.Paragraph>
                  {/* <div className="flex gap-4">
                    <Typography.Paragraph className="p-2 border-2 rounded-md cursor-pointer hover:border-purple-500 ">
                      $25
                    </Typography.Paragraph>
                    <Typography.Paragraph className="p-2 border-2 rounded-md cursor-pointer hover:border-purple-500 ">
                      $50
                    </Typography.Paragraph>
                    <Typography.Paragraph className="p-2 border-2 rounded-md cursor-pointer hover:border-purple-500 ">
                      $100
                    </Typography.Paragraph>
                  </div> */}
                  <Form form={fundAmount}>
                    <Form.Item
                      name="amountToFound"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Enter Amount to fund wallet",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter amount"
                        className="rounded-sm"
                      />
                    </Form.Item>
                    <div className="flex justify-center">
                      <AddCard
                        isModalCard={isModalCard}
                        setIsModalCard={setIsModalCard}
                        fetchUserCards={fetchUserCard}
                      />

                      <Button onClick={MakeFunding} className="rounded-sm">
                        Fund Wallet
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWallet;
